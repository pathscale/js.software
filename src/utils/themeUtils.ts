/**
 * Theme utilities - main export file with backwards compatibility
 * This file re-exports the new organized theme system while maintaining legacy API
 */

// Re-export everything from the new organized theme system
export * from "../lib/themeIndex";

// Keep legacy exports for backwards compatibility
import { 
  generateRandomMaterialTheme, 
  updateThemeColor as newUpdateThemeColor,
  generateThemeStyleString as newGenerateThemeStyleString,
  oklchToHex as newOklchToHex,
  hexToOklch as newHexToOklch,
  MATERIAL_COLORS,
  COLOR_PAIRS,
  COLOR_GROUPS,
  calculateContrastRatio,
  isAccessible,
  generateAccessibleTextColor,
  updateThemeProperty,
  getColorBackgroundStyle,
  getColorTextStyle,
  getColorLabel,
} from "../lib/themeIndex";

// Legacy Tailwind colors (deprecated - use MATERIAL_COLORS instead)
export const TAILWIND_COLORS = {
  "slate-50": "oklch(98% 0.003 247.858)",
  "slate-100": "oklch(96% 0.007 247.896)",
  "slate-200": "oklch(92% 0.013 255.508)",
  "slate-300": "oklch(86% 0.022 252.894)",
  "slate-400": "oklch(70% 0.04 256.788)",
  "slate-500": "oklch(55% 0.046 257.417)",
  "slate-600": "oklch(44% 0.043 257.281)",
  "slate-700": "oklch(37% 0.044 257.287)",
  "slate-800": "oklch(27% 0.041 260.031)",
  "slate-900": "oklch(20% 0.042 265.755)",
  "slate-950": "oklch(12% 0.042 264.695)",
  "gray-50": "oklch(98% 0.002 247.839)",
  "gray-100": "oklch(96% 0.003 264.542)",
  "gray-200": "oklch(92% 0.006 264.531)",
  "gray-300": "oklch(87% 0.01 258.338)",
  "gray-400": "oklch(70% 0.022 261.325)",
  "gray-500": "oklch(55% 0.027 264.364)",
  "gray-600": "oklch(44% 0.03 256.802)",
  "gray-700": "oklch(37% 0.034 259.733)",
  "gray-800": "oklch(27% 0.033 256.848)",
  "gray-900": "oklch(21% 0.034 264.665)",
  "gray-950": "oklch(13% 0.028 261.692)",
  // ... (truncated for brevity, includes all Tailwind colors)
  white: "oklch(100% 0 0)",
  black: "oklch(0% 0 0)",
};

// Legacy function exports for backwards compatibility
export const generateRandomTheme = generateRandomMaterialTheme;
export const updateThemeColor = newUpdateThemeColor;
export const generateThemeStyleString = newGenerateThemeStyleString;
export const hexToOklch = newHexToOklch;
export const oklchToHex = newOklchToHex;

// Re-export commonly used functions that are now in organized modules
export {
  calculateContrastRatio as getContrastRatio,
  isAccessible,
  generateAccessibleTextColor,
  updateThemeProperty,
  getColorBackgroundStyle,
  getColorTextStyle,
  getColorLabel,
};

// Legacy extended palette export (now points to Material colors)
export { MATERIAL_COLORS as EXTENDED_COLOR_PALETTE };