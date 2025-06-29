/**
 * Theme manipulation utilities
 */

import { Theme, ColorType, ColorGroup } from "../../types/theme";
import { convertHexToOklch, convertOklchToHex } from "./colorConversion";
import {
  generateAccessibleTextColor,
  validateThemeAccessibility,
} from "./contrastCalculation";
import { COLOR_GROUPS } from "../../colors/palettes";

/**
 * Update a specific color in the theme
 */
export const updateThemeColor = (
  theme: Theme,
  colorKey: string,
  colorValue: string
): Theme => {
  // Convert HEX to OKLCH if needed
  const oklchColor = colorValue.startsWith("#")
    ? convertHexToOklch(colorValue)
    : colorValue;

  const newTheme = { ...theme, [colorKey]: oklchColor };

  // Auto-generate content color if updating a background color
  if (!colorKey.includes("-content")) {
    const contentKey = colorKey + "-content";
    newTheme[contentKey] = generateAccessibleTextColor(oklchColor);
  }

  return newTheme;
};

/**
 * Update a theme property (non-color)
 */
export const updateThemeProperty = (
  theme: Theme,
  key: string,
  value: string
): Theme => {
  return { ...theme, [key]: value };
};

/**
 * Get background color for color picker display
 */
export const getColorBackgroundStyle = (
  theme: Theme,
  colorKey: string,
  groupName: string
): string => {
  const isContentColor = colorKey.endsWith("-content");

  if (groupName === "base") {
    if (isContentColor) {
      return theme["--color-base-100"] || "oklch(100% 0 0)";
    } else {
      return theme[colorKey] || "oklch(50% 0.1 180)";
    }
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    return theme[mainColorKey] || "oklch(50% 0.1 180)";
  }
};

/**
 * Get text color for color picker display
 */
export const getColorTextStyle = (
  theme: Theme,
  colorKey: string,
  groupName: string
): string => {
  const isContentColor = colorKey.endsWith("-content");

  if (groupName === "base") {
    return theme["--color-base-content"] || "oklch(0% 0 0)";
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    const contentColorKey = mainColorKey + "-content";
    return theme[contentColorKey] || "oklch(100% 0 0)";
  }
};

/**
 * Get display label for color
 */
export const getColorLabel = (colorKey: string, groupName: string): string => {
  if (colorKey.endsWith("-content")) {
    return "A";
  }
  if (/\d/.test(colorKey)) {
    return colorKey.replace(`--color-${groupName}-`, "");
  }
  return "";
};

/**
 * Generate CSS style string from theme
 */
export const generateThemeStyleString = (theme: Theme): string => {
  return Object.entries(theme)
    .filter(([key]) => key.startsWith("--") && key !== "name")
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
};

/**
 * Apply theme to DOM
 */
export const applyThemeToDOM = (
  theme: Theme,
  targetElement?: HTMLElement
): void => {
  const element = targetElement || document.documentElement;
  const styleString = generateThemeStyleString(theme);

  // Parse and apply individual CSS variables
  styleString.split(";").forEach((declaration) => {
    const [property, value] = declaration.split(":");
    if (property && value) {
      element.style.setProperty(property.trim(), value.trim());
    }
  });
};

/**
 * Extract theme from DOM
 */
export const extractThemeFromDOM = (
  targetElement?: HTMLElement
): Partial<Theme> => {
  const element = targetElement || document.documentElement;
  const computedStyle = getComputedStyle(element);
  const theme: Partial<Theme> = {};

  // Extract all CSS custom properties that match our theme structure
  const colorKeys = COLOR_GROUPS.flatMap((group) => group.colors);

  colorKeys.forEach((key) => {
    const value = computedStyle.getPropertyValue(key).trim();
    if (value) {
      theme[key] = value;
    }
  });

  return theme;
};

/**
 * Validate theme completeness
 */
export const validateThemeCompleteness = (
  theme: Theme
): {
  isComplete: boolean;
  missingKeys: string[];
} => {
  const requiredKeys = COLOR_GROUPS.flatMap((group) => group.colors);
  const missingKeys = requiredKeys.filter((key) => !(key in theme));

  return {
    isComplete: missingKeys.length === 0,
    missingKeys,
  };
};

/**
 * Convert theme colors to HEX format
 */
export const convertThemeToHex = (theme: Theme): Record<string, string> => {
  const hexTheme: Record<string, string> = {};

  Object.entries(theme).forEach(([key, value]) => {
    if (key.startsWith("--color-")) {
      hexTheme[key] = convertOklchToHex(value);
    } else {
      hexTheme[key] = value;
    }
  });

  return hexTheme;
};

/**
 * Get color groups for theme editor UI
 */
export const getColorGroups = (): ColorGroup[] => {
  return COLOR_GROUPS;
};

/**
 * Analyze theme for accessibility issues
 */
export const analyzeTheme = (theme: Theme) => {
  const accessibility = validateThemeAccessibility(theme);
  const completeness = validateThemeCompleteness(theme);

  return {
    accessibility,
    completeness,
    summary: {
      isValid: accessibility.isValid && completeness.isComplete,
      totalIssues:
        accessibility.violations.length + completeness.missingKeys.length,
    },
  };
};
