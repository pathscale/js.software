import { MATERIAL_COLORS_HEX } from "../colors/material";
import { convertHexPaletteToOklch } from "../utils/theme/colorConversion";
import { generateRandomTheme } from "./themeGenerator";

export const MATERIAL_COLORS = convertHexPaletteToOklch(MATERIAL_COLORS_HEX);

export const generateRandomMaterialTheme = () =>
  generateRandomTheme(MATERIAL_COLORS);
export * from "../types/theme";
export * from "../colors/material";
export * from "../colors/palettes";
export * from "../utils/theme/colorConversion";
export * from "../utils/theme/contrastCalculation";
export * from "../utils/theme/colorSelection";
export * from "../utils/theme/themeUtils";
export * from "./themeGenerator";

export { generateRandomTheme as randomizeThemeColors } from "./themeGenerator";
export {
  updateThemeColor,
  generateThemeStyleString,
} from "../utils/theme/themeUtils";
export {
  convertOklchToHex as oklchToHex,
  convertHexToOklch as hexToOklch,
} from "../utils/theme/colorConversion";
