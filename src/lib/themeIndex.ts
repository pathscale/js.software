/**
 * Main theme system exports
 */

import { MATERIAL_COLORS_HEX } from "../colors/material";
import { convertHexPaletteToOklch } from "../utils/theme/colorConversion";
import { generateRandomTheme, generateThemeVariations, generateThemePair } from "./themeGenerator";
import { COLOR_PAIRS } from "../colors/palettes";

// Convert Material Design colors to OKLCH
export const MATERIAL_COLORS = convertHexPaletteToOklch(MATERIAL_COLORS_HEX);

// Main theme generation function using Material Design colors
export const generateRandomMaterialTheme = () => 
  generateRandomTheme(MATERIAL_COLORS);

// Re-export everything for easy access
export * from "../types/theme";
export * from "../colors/material";
export * from "../colors/palettes";
export * from "../utils/theme/colorConversion";
export * from "../utils/theme/contrastCalculation";
export * from "../utils/theme/colorSelection";
export * from "../utils/theme/themeUtils";
export * from "./themeGenerator";

// Legacy compatibility exports
export { generateRandomTheme as randomizeThemeColors } from "./themeGenerator";
export { updateThemeColor, generateThemeStyleString } from "../utils/theme/themeUtils";
export { convertOklchToHex as oklchToHex, convertHexToOklch as hexToOklch } from "../utils/theme/colorConversion";