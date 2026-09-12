import chroma from "chroma-js";
import { createOklchColor } from "./colorConversion";
import { AccessibilityOptions } from "../../types/theme";

const DEFAULT_ACCESSIBILITY_OPTIONS: Required<AccessibilityOptions> = {
  minContrastRatio: 4.5,
  maxAttempts: 10,
};

export const calculateContrastRatio = (
  color1: string,
  color2: string
): number => {
  try {
    const chromaColor1 = chroma(color1);
    const chromaColor2 = chroma(color2);
    
    return chroma.contrast(chromaColor1, chromaColor2);
  } catch (error) {
    return 1;
  }
};

export const calculateAPCAContrast = (
  textColor: string,
  backgroundColor: string
): number => {
  try {
    const textChroma = chroma(textColor);
    const bgChroma = chroma(backgroundColor);

    const textRGB = textChroma.rgb();
    const bgRGB = bgChroma.rgb();

    const toLinear = (val: number) => {
      val = val / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    };

    const textLinear = textRGB.map(toLinear);
    const bgLinear = bgRGB.map(toLinear);

    const textLum =
      0.2126 * textLinear[0] + 0.7152 * textLinear[1] + 0.0722 * textLinear[2];
    const bgLum =
      0.2126 * bgLinear[0] + 0.7152 * bgLinear[1] + 0.0722 * bgLinear[2];

    const deltaLum = Math.abs(textLum - bgLum);
    const meanLum = (textLum + bgLum) / 2;

    const contrast = deltaLum * (1 + Math.log10(meanLum + 0.05));

    return Math.abs(contrast * 100);
  } catch (error) {
    return 0;
  }
};

export const isAccessible = (
  backgroundColor: string,
  textColor: string,
  standard: "WCAG21-AA" | "WCAG21-AAA" | "APCA" = "WCAG21-AA"
): boolean => {
  if (standard === "APCA") {
    const apcaScore = calculateAPCAContrast(textColor, backgroundColor);
    return apcaScore >= 60;
  } else {
    const contrast = calculateContrastRatio(backgroundColor, textColor);
    return standard === "WCAG21-AAA" ? contrast >= 7 : contrast >= 4.5;
  }
};

export const generateAccessibleTextColor = (
  backgroundColor: string,
  options: AccessibilityOptions = {}
): string => {
  const { minContrastRatio } = {
    ...DEFAULT_ACCESSIBILITY_OPTIONS,
    ...options,
  };
  const black = createOklchColor(0, 0, 0);
  const white = createOklchColor(100, 0, 0);
  const blackContrast = calculateContrastRatio(backgroundColor, black);
  const whiteContrast = calculateContrastRatio(backgroundColor, white);

  // One of pure black or white always provides the stronger WCAG contrast.
  // Selecting the stronger pole avoids the old LCh loop's two failure modes:
  // accepting a low-WCAG result because an approximate APCA score passed, and
  // emitting `oklch(... NaN)` for achromatic colours whose hue is undefined.
  const strongest = blackContrast >= whiteContrast ? black : white;
  if (Math.max(blackContrast, whiteContrast) >= minContrastRatio) return strongest;

  // Invalid colour input reaches here with both ratios reported as 1. Keep the
  // output valid and deterministic so callers never receive an unparsable token.
  return black;
};

export const validateThemeAccessibility = (
  theme: Record<string, string>,
  options: AccessibilityOptions = {}
): {
  isValid: boolean;
  violations: string[];
  wcag21Results: Record<string, number>;
  apcaResults: Record<string, number>;
} => {
  const { minContrastRatio } = { ...DEFAULT_ACCESSIBILITY_OPTIONS, ...options };
  const violations: string[] = [];
  const wcag21Results: Record<string, number> = {};
  const apcaResults: Record<string, number> = {};

  const baseContent = theme["--color-base-content"];
  if (baseContent) {
    ["--color-base-100", "--color-base-200", "--color-base-300"].forEach(
      (bgKey) => {
        const bgColor = theme[bgKey];
        if (bgColor) {
          const wcagContrast = calculateContrastRatio(bgColor, baseContent);
          const apcaScore = calculateAPCAContrast(baseContent, bgColor);

          wcag21Results[`${bgKey}-content`] = wcagContrast;
          apcaResults[`${bgKey}-content`] = apcaScore;

          if (wcagContrast < minContrastRatio && apcaScore < 60) {
            violations.push(
              `${bgKey} and --color-base-content: WCAG ${wcagContrast.toFixed(
                2
              )} (< ${minContrastRatio}), APCA ${apcaScore.toFixed(1)} (< 60)`
            );
          }
        }
      }
    );
  }

  const colorPairs = [
    ["--color-primary", "--color-primary-content"],
    ["--color-secondary", "--color-secondary-content"],
    ["--color-accent", "--color-accent-content"],
    ["--color-info", "--color-info-content"],
    ["--color-success", "--color-success-content"],
    ["--color-warning", "--color-warning-content"],
    ["--color-error", "--color-error-content"],
  ];

  colorPairs.forEach(([bgKey, contentKey]) => {
    const bgColor = theme[bgKey];
    const contentColor = theme[contentKey];

    if (bgColor && contentColor) {
      const wcagContrast = calculateContrastRatio(bgColor, contentColor);
      const apcaScore = calculateAPCAContrast(contentColor, bgColor);

      wcag21Results[`${bgKey}-${contentKey}`] = wcagContrast;
      apcaResults[`${bgKey}-${contentKey}`] = apcaScore;

      if (wcagContrast < minContrastRatio && apcaScore < 60) {
        violations.push(
          `${bgKey} and ${contentKey}: WCAG ${wcagContrast.toFixed(
            2
          )} (< ${minContrastRatio}), APCA ${apcaScore.toFixed(1)} (< 60)`
        );
      }
    }
  });

  return {
    isValid: violations.length === 0,
    violations,
    wcag21Results,
    apcaResults,
  };
};
