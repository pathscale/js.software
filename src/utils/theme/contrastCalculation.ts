/**
 * Advanced contrast calculation using chroma.js with WCAG 2.1 and APCA (WCAG 3) support
 * Implements recommendations from Wildbit's accessible palette research
 */

import chroma from "chroma-js";
import { convertOklchToHex, createOklchColor } from "./colorConversion";
import { AccessibilityOptions } from "../../types/theme";

/**
 * Default accessibility options
 */
const DEFAULT_ACCESSIBILITY_OPTIONS: Required<AccessibilityOptions> = {
  minContrastRatio: 4.5, // WCAG AA standard
  maxAttempts: 10,
};

/**
 * Calculate WCAG 2.1 contrast ratio between two colors using chroma.js
 */
export const calculateContrastRatio = (
  color1: string,
  color2: string
): number => {
  try {
    // Convert OKLCH to hex for chroma.js
    const hex1 = color1.startsWith("#") ? color1 : convertOklchToHex(color1);
    const hex2 = color2.startsWith("#") ? color2 : convertOklchToHex(color2);

    return chroma.contrast(hex1, hex2);
  } catch (error) {
    return 1;
  }
};

/**
 * Advanced Perceptual Contrast Algorithm (APCA) - WCAG 3 Working Draft
 * Based on research by Andrew Somers for more perceptually accurate contrast
 */
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

    // Convert to linear RGB
    const toLinear = (val: number) => {
      val = val / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    };

    const textLinear = textRGB.map(toLinear);
    const bgLinear = bgRGB.map(toLinear);

    // Calculate luminance using APCA coefficients
    const textLum =
      0.2126 * textLinear[0] + 0.7152 * textLinear[1] + 0.0722 * textLinear[2];
    const bgLum =
      0.2126 * bgLinear[0] + 0.7152 * bgLinear[1] + 0.0722 * bgLinear[2];

    // APCA contrast calculation (simplified version)
    const deltaLum = Math.abs(textLum - bgLum);
    const meanLum = (textLum + bgLum) / 2;

    // Perceptual contrast with APCA weighting
    const contrast = deltaLum * (1 + Math.log10(meanLum + 0.05));

    // Convert to APCA score (0-100+ scale)
    return Math.abs(contrast * 100);
  } catch (error) {
    return 0;
  }
};

/**
 * Check if color combination meets accessibility standards
 * Supports both WCAG 2.1 and APCA (WCAG 3) standards
 */
export const isAccessible = (
  backgroundColor: string,
  textColor: string,
  standard: "WCAG21-AA" | "WCAG21-AAA" | "APCA" = "WCAG21-AA"
): boolean => {
  if (standard === "APCA") {
    const apcaScore = calculateAPCAContrast(textColor, backgroundColor);
    return apcaScore >= 60; // APCA minimum for readable text
  } else {
    const contrast = calculateContrastRatio(backgroundColor, textColor);
    return standard === "WCAG21-AAA" ? contrast >= 7 : contrast >= 4.5;
  }
};

/**
 * Generate contrast color using LCH color space for perceptual uniformity
 * Follows Wildbit's scientific approach using chroma.js LCH
 */
export const generateContrastColor = (backgroundOKLCH: string): string => {
  try {
    // Convert to chroma.js for LCH processing
    const bgHex = convertOklchToHex(backgroundOKLCH);
    const bgColor = chroma(bgHex);
    const [bgL, bgC, bgH] = bgColor.lch();

    // Use LCH lightness for perceptually accurate contrast
    // Following Wildbit recommendations for consistent lightness perception
    const textLightness = bgL > 50 ? 15 : 85; // High contrast approach
    const textChroma = Math.min(bgC * 0.1, 5); // Low chroma for text readability

    const textColor = chroma.lch(textLightness, textChroma, bgH || 0);

    // Convert back to OKLCH format
    const [l, c, h] = textColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    // Simple fallback
    const match = backgroundOKLCH.match(/oklch\((\d+)%/);
    const bgLightness = match ? parseInt(match[1]) : 50;

    return bgLightness > 60
      ? createOklchColor(15, 0, 0) // Dark text
      : createOklchColor(95, 0, 0); // Light text
  }
};

/**
 * Generate accessible text color with advanced retry logic
 * Uses both WCAG 2.1 and APCA for maximum compatibility
 */
export const generateAccessibleTextColor = (
  backgroundColor: string,
  options: AccessibilityOptions = {}
): string => {
  const { minContrastRatio, maxAttempts } = {
    ...DEFAULT_ACCESSIBILITY_OPTIONS,
    ...options,
  };

  // Try the main LCH-based algorithm first
  let textColor = generateContrastColor(backgroundColor);
  let wcagContrast = calculateContrastRatio(backgroundColor, textColor);
  let apcaScore = calculateAPCAContrast(textColor, backgroundColor);

  // Check if it meets both standards
  if (wcagContrast >= 7 && apcaScore >= 60) {
    return textColor;
  }

  // If not, try progressive lightness adjustments
  const bgHex = convertOklchToHex(backgroundColor);
  const bgColor = chroma(bgHex);
  const [bgL] = bgColor.lch();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const targetLightness =
      bgL > 50
        ? Math.max(5, 15 - attempt * 2) // Darker text
        : Math.min(95, 85 + attempt * 2); // Lighter text

    const adjustedColor = chroma.lch(targetLightness, 0, 0);
    const [l, c, h] = adjustedColor.oklch();
    textColor = createOklchColor(Math.round(l * 100), c, h || 0);

    wcagContrast = calculateContrastRatio(backgroundColor, textColor);
    apcaScore = calculateAPCAContrast(textColor, backgroundColor);

    // Accept if meets either standard well
    if (wcagContrast >= minContrastRatio || apcaScore >= 60) {
      return textColor;
    }
  }

  // Final fallback: pure black or white
  const fallbackLightness = bgL > 50 ? 0 : 100;
  return createOklchColor(fallbackLightness, 0, 0);
};

/**
 * Comprehensive theme accessibility validation
 * Checks both WCAG 2.1 and APCA standards
 */
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

  // Check base content against base backgrounds
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

  // Check color pairs
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
