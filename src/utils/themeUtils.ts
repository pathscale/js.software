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

import chroma from "chroma-js";
import { createOklchColor } from "./theme/colorConversion";

const generateTailwindColorScale = (baseHue: number, baseChroma: number = 0.04) => {
  const postmarkScale = [98, 93.3, 88.6, 79.9, 71.2, 60.5, 49.8, 38.4, 27, 15.6, 12];
  const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
  
  const colors: Record<string, string> = {};
  postmarkScale.forEach((lightness, index) => {
    const adjustedChroma = lightness > 85 || lightness < 20 ? baseChroma * 0.6 : baseChroma;
    const color = chroma.lch(lightness, adjustedChroma, baseHue);
    const [l, c, h] = color.oklch();
    colors[shades[index]] = createOklchColor(Math.round(l * 100), c, h || baseHue);
  });
  
  return colors;
};

const slateColors = generateTailwindColorScale(250, 0.02);
const grayColors = generateTailwindColorScale(260, 0.015);

export const TAILWIND_COLORS = {
  ...Object.fromEntries(Object.entries(slateColors).map(([shade, color]) => [`slate-${shade}`, color])),
  ...Object.fromEntries(Object.entries(grayColors).map(([shade, color]) => [`gray-${shade}`, color])),
  white: createOklchColor(100, 0, 0),
  black: createOklchColor(0, 0, 0),
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