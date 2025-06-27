/**
 * Accessibility and contrast calculation utilities
 */

import { converter, wcagContrast, oklch } from "culori";
import { AccessibilityOptions } from "../../types/theme";

/**
 * Default accessibility options
 */
const DEFAULT_ACCESSIBILITY_OPTIONS: Required<AccessibilityOptions> = {
  minContrastRatio: 4.5, // WCAG AA standard
  maxAttempts: 10,
};

/**
 * Calculate WCAG contrast ratio between two colors
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  try {
    const c1 = converter("oklch")(color1);
    const c2 = converter("oklch")(color2);
    if (!c1 || !c2) return 1;
    
    return wcagContrast(c1, c2);
  } catch (error) {
    return 1;
  }
};

/**
 * Check if color combination meets accessibility standards
 */
export const isAccessible = (
  backgroundColor: string,
  textColor: string,
  level: "AA" | "AAA" = "AA"
): boolean => {
  const contrast = calculateContrastRatio(backgroundColor, textColor);
  return level === "AAA" ? contrast >= 7 : contrast >= 4.5;
};

/**
 * Generate contrast color for given background
 */
export const generateContrastColor = (backgroundOKLCH: string): string => {
  try {
    const bgColor = converter("oklch")(backgroundOKLCH);
    if (!bgColor) return "oklch(0% 0 0)";

    const { l, c, h } = bgColor;
    const preservedHue = h || 0;
    const preservedChroma = Math.min(c || 0, 0.02); // Keep low chroma for readability

    // Special handling for yellow/amber hues (problematic colors)
    const isYellowish = preservedHue >= 60 && preservedHue <= 120;
    
    if (isYellowish && l > 0.7) {
      // For light yellowish backgrounds, use much darker text
      return `oklch(10% ${preservedChroma.toFixed(3)} ${Math.round(preservedHue)})`;
    }
    
    if (isYellowish && l < 0.3) {
      // For dark yellowish backgrounds, use much lighter text  
      return `oklch(95% ${preservedChroma.toFixed(3)} ${Math.round(preservedHue)})`;
    }

    // Use proper luminance calculation for better contrast
    const isLight = l > 0.5;
    const contrastL = isLight ? 0.15 : 0.98;
    
    return `oklch(${Math.round(contrastL * 100)}% ${preservedChroma.toFixed(3)} ${Math.round(preservedHue)})`;
  } catch (error) {
    return "oklch(0% 0 0)";
  }
};

/**
 * Generate accessible text color for background
 */
export const generateAccessibleTextColor = (
  backgroundColor: string,
  options: AccessibilityOptions = {}
): string => {
  const { minContrastRatio, maxAttempts } = { ...DEFAULT_ACCESSIBILITY_OPTIONS, ...options };
  
  try {
    const bgColor = converter("oklch")(backgroundColor);
    if (!bgColor) return "oklch(0% 0 0)";

    const { l, h } = bgColor;
    const hue = h || 0;
    
    // Try light text first
    const lightText = { mode: "oklch" as const, l: 0.98, c: 0.02, h: hue };
    if (wcagContrast(bgColor, lightText) >= minContrastRatio) {
      return `oklch(98% 0.02 ${Math.round(hue)})`;
    }

    // Try dark text
    const darkText = { mode: "oklch" as const, l: 0.15, c: 0.02, h: hue };
    if (wcagContrast(bgColor, darkText) >= minContrastRatio) {
      return `oklch(15% 0.02 ${Math.round(hue)})`;
    }

    // Fallback based on background lightness
    const contrastL = l > 0.5 ? 0.1 : 0.95;
    return `oklch(${Math.round(contrastL * 100)}% 0.02 ${Math.round(hue)})`;
  } catch (error) {
    return "oklch(0% 0 0)";
  }
};

/**
 * Check if a color is problematic for accessibility (e.g., light yellows)
 */
export const isProblematicColor = (colorOKLCH: string): boolean => {
  try {
    const color = converter("oklch")(colorOKLCH);
    if (!color) return false;
    
    const { l, h } = color;
    const hue = h || 0;
    
    // Light yellows and ambers are problematic on light backgrounds
    const isYellowish = hue >= 60 && hue <= 120;
    const isVeryLight = l > 0.8;
    
    return isYellowish && isVeryLight;
  } catch (error) {
    return false;
  }
};

/**
 * Find accessible color pair from palette
 */
export const findAccessibleColorPair = (
  colors: string[],
  options: AccessibilityOptions = {}
): { background: string; text: string } | null => {
  const { minContrastRatio, maxAttempts } = { ...DEFAULT_ACCESSIBILITY_OPTIONS, ...options };
  
  for (let i = 0; i < Math.min(maxAttempts, colors.length); i++) {
    const backgroundColor = colors[i];
    
    // Skip problematic colors entirely
    if (isProblematicColor(backgroundColor)) {
      continue;
    }
    
    const textColor = generateContrastColor(backgroundColor);
    
    if (calculateContrastRatio(backgroundColor, textColor) >= minContrastRatio) {
      return { background: backgroundColor, text: textColor };
    }
  }
  
  return null;
};

/**
 * Validate theme accessibility
 */
export const validateThemeAccessibility = (
  theme: Record<string, string>,
  options: AccessibilityOptions = {}
): { isValid: boolean; violations: string[] } => {
  const { minContrastRatio } = { ...DEFAULT_ACCESSIBILITY_OPTIONS, ...options };
  const violations: string[] = [];
  
  // Check base content against base backgrounds
  const baseContent = theme["--color-base-content"];
  if (baseContent) {
    ["--color-base-100", "--color-base-200", "--color-base-300"].forEach(bgKey => {
      const bgColor = theme[bgKey];
      if (bgColor) {
        const contrast = calculateContrastRatio(bgColor, baseContent);
        if (contrast < minContrastRatio) {
          violations.push(`${bgKey} and --color-base-content: ${contrast.toFixed(2)} (< ${minContrastRatio})`);
        }
      }
    });
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
      const contrast = calculateContrastRatio(bgColor, contentColor);
      if (contrast < minContrastRatio) {
        violations.push(`${bgKey} and ${contentKey}: ${contrast.toFixed(2)} (< ${minContrastRatio})`);
      }
    }
  });
  
  return {
    isValid: violations.length === 0,
    violations,
  };
};