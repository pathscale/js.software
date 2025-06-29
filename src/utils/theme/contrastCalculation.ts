import chroma from "chroma-js";
import { convertOklchToHex, createOklchColor } from "./colorConversion";
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
    const hex1 = color1.startsWith("#") ? color1 : convertOklchToHex(color1);
    const hex2 = color2.startsWith("#") ? color2 : convertOklchToHex(color2);

    return chroma.contrast(hex1, hex2);
  } catch (error) {
    return 1;
  }
};

export const calculateAPCAContrast = (
  textColor: string,
  backgroundColor: string
): number => {
  try {
    const textHex = textColor.startsWith("#")
      ? textColor
      : convertOklchToHex(textColor);
    const bgHex = backgroundColor.startsWith("#")
      ? backgroundColor
      : convertOklchToHex(backgroundColor);

    const textRGB = chroma(textHex).rgb();
    const bgRGB = chroma(bgHex).rgb();

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
  const { minContrastRatio, maxAttempts } = {
    ...DEFAULT_ACCESSIBILITY_OPTIONS,
    ...options,
  };

  const bgHex = convertOklchToHex(backgroundColor);
  const bgColor = chroma(bgHex);
  const [bgL] = bgColor.lch();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const targetLightness =
      bgL > 50 ? Math.max(5, 15 - attempt * 2) : Math.min(95, 85 + attempt * 2);

    const adjustedColor = chroma.lch(targetLightness, 0, 0);
    const [l, c, h] = adjustedColor.oklch();
    const textColor = createOklchColor(Math.round(l * 100), c, h || 0);

    const wcagContrast = calculateContrastRatio(backgroundColor, textColor);
    const apcaScore = calculateAPCAContrast(textColor, backgroundColor);

    if (wcagContrast >= minContrastRatio || apcaScore >= 60) {
      return textColor;
    }
  }

  const fallbackLightness = bgL > 50 ? 0 : 100;
  return createOklchColor(fallbackLightness, 0, 0);
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
