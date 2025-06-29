import chroma from "chroma-js";
import { ColorPalette, ShadeLevel } from "../../types/theme";
import { createOklchColor } from "./colorConversion";
import {
  calculateContrastRatio,
  calculateAPCAContrast,
} from "./contrastCalculation";

function getChromaForLightness(
  lightness: number,
  hue: number,
  baseChroma: number
): number {
  const distanceFromBlack = lightness / 100;
  const distanceFromWhite = (100 - lightness) / 100;
  const extremeFactor = Math.min(distanceFromBlack, distanceFromWhite) * 2;

  let hueAdjustment = 1.0;
  if (hue >= 60 && hue <= 120) {
    hueAdjustment = 0.8;
  } else if (hue >= 200 && hue <= 280) {
    hueAdjustment = 1.1;
  }

  const adjustedChroma =
    baseChroma * Math.min(extremeFactor, 1) * hueAdjustment;
  return Math.max(adjustedChroma, 3);
}

export const applyHueCompensation = (
  baseHue: number,
  lightness: number,
  compensationAmount: number = 0
): number => {
  const lightnessNormalized = lightness / 100;
  const compensationFactor = 1 - lightnessNormalized;
  const adjustedHue = baseHue + compensationAmount * compensationFactor;
  return ((adjustedHue % 360) + 360) % 360;
};

export const MATERIAL_COLORS = {
  pink: "#D81B60",
  red: "#E53935",
  deepOrange: "#F4511E",
  orange: "#FB8C00",
  amber: "#FFB300",
  yellow: "#FDD835",
  lime: "#C0CA33",
  lightGreen: "#7CB342",
  green: "#43A047",
  teal: "#00897B",
  cyan: "#00ACC1",
  lightBlue: "#039BE5",
  blue: "#1E88E5",
  indigo: "#3949AB",
  deepPurple: "#5E35B1",
  purple: "#8E24AA",
  grey: "#FAFAFA",
};

export function generateLightnessScale(
  baseHue: number,
  chromaLevel: number,
  isDarkTheme: boolean,
  customLightnessLevels?: number[],
  hueShift?: number
): { base100: string; base200: string; base300: string } {
  let lightnessPalette: number[];

  if (customLightnessLevels && customLightnessLevels.length >= 3) {
    lightnessPalette = customLightnessLevels.slice(0, 3);
  } else {
    const accessiblePaletteScale = [98.2, 96.5, 94, 89.5, 77, 65, 49.5, 41, 28, 20];
    lightnessPalette = isDarkTheme
      ? [accessiblePaletteScale[8], accessiblePaletteScale[7], accessiblePaletteScale[6]]
      : [accessiblePaletteScale[0], accessiblePaletteScale[1], accessiblePaletteScale[2]];
  }

  const hueShiftAmount = hueShift || 0;

  const hues = lightnessPalette.map((lightness) =>
    applyHueCompensation(baseHue, lightness, hueShiftAmount)
  );

  const chromas = lightnessPalette.map((lightness, i) =>
    getChromaForLightness(lightness, hues[i], chromaLevel)
  );

  const colors = lightnessPalette.map((lightness, i) => {
    try {
      const lchColor = chroma.lch(lightness, chromas[i], hues[i]);
      const [l, c, h] = lchColor.oklch();
      return createOklchColor(Math.round(l * 100), c, h || baseHue);
    } catch (error) {
      return createOklchColor(lightness, 0.02, baseHue);
    }
  });

  return {
    base100: colors[0],
    base200: colors[1],
    base300: colors[2],
  };
}

export function generateSemanticHues(
  primaryHue: number
): Record<string, number> {
  const adjustHue = (baseHue: number, adjustment: number): number => {
    const newHue = baseHue + adjustment;
    return ((newHue % 360) + 360) % 360;
  };

  return {
    primary: primaryHue,
    secondary: adjustHue(primaryHue, 90),
    accent: adjustHue(primaryHue, 180),
    info: adjustHue(primaryHue, 270),
    success: adjustHue(primaryHue, 90),
    warning: adjustHue(primaryHue, 0),
    error: adjustHue(primaryHue, 180),
  };
}

export const selectSemanticColor = (
  semanticType: "info" | "success" | "warning" | "error",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  try {
    const semanticHues = generateSemanticHues(primaryHue);
    const targetHue = semanticHues[semanticType];

    const accessiblePaletteScale = [98.2, 96.5, 94, 89.5, 77, 65, 49.5, 41, 28, 20];
    
    const semanticLightness = isDarkTheme ? accessiblePaletteScale[7] : accessiblePaletteScale[5];
    const semanticChroma = 40;

    const adjustedChroma = getChromaForLightness(semanticLightness, targetHue, semanticChroma);
    const semanticColor = chroma.lch(semanticLightness, adjustedChroma, targetHue);
    const [l, c, h] = semanticColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || targetHue);
  } catch (error) {
    console.warn("Error in selectSemanticColor:", error);
    const fallbackHues = generateSemanticHues(primaryHue);
    const fallbackLightness = isDarkTheme ? 48 : 70;
    return createOklchColor(fallbackLightness, 0.15, fallbackHues[semanticType]);
  }
};

export const generateBaseColors = (
  isDarkTheme: boolean,
  customLightnessLevels?: number[]
): { base100: string; base200: string; base300: string } => {
  const materialColorKeys = Object.keys(MATERIAL_COLORS);
  const randomKey =
    materialColorKeys[Math.floor(Math.random() * materialColorKeys.length)];
  const selectedColor =
    MATERIAL_COLORS[randomKey as keyof typeof MATERIAL_COLORS];

  const baseColor = chroma(selectedColor);
  const [, , baseHue] = baseColor.lch();

  const baseChroma = 15;
  return generateLightnessScale(
    baseHue || 0,
    baseChroma,
    isDarkTheme,
    customLightnessLevels,
    0
  );
};

export const selectBrandColor = (
  semanticType: "primary" | "secondary" | "accent",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  try {
    const semanticHues = generateSemanticHues(primaryHue);
    const targetHue = semanticHues[semanticType];
    
    const accessiblePaletteScale = [98.2, 96.5, 94, 89.5, 77, 65, 49.5, 41, 28, 20];
    
    let brandLightness: number;
    let brandChroma: number;
    
    if (semanticType === "primary") {
      brandLightness = isDarkTheme ? accessiblePaletteScale[6] : accessiblePaletteScale[4];
      brandChroma = 50;
    } else if (semanticType === "secondary") {
      brandLightness = isDarkTheme ? accessiblePaletteScale[7] : accessiblePaletteScale[3];
      brandChroma = 40;
    } else {
      brandLightness = isDarkTheme ? accessiblePaletteScale[8] : accessiblePaletteScale[5];
      brandChroma = 30;
    }

    const adjustedChroma = getChromaForLightness(brandLightness, targetHue, brandChroma);
    const brandColor = chroma.lch(brandLightness, adjustedChroma, targetHue);
    
    const [l, c, h] = brandColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || targetHue);
  } catch (error) {
    console.warn("Error in selectBrandColor:", error);
    const fallbackLightness = isDarkTheme ? 55 : 60;
    return createOklchColor(fallbackLightness, 0.2, primaryHue);
  }
};

export const selectColorFromFamily = (
  palette: ColorPalette,
  colorNames: string[],
  shades: ShadeLevel[]
): string => {
  const validColors = Object.entries(palette).filter(([name, _]) => {
    const parts = name.split("-");
    const shade = parts[parts.length - 1] as ShadeLevel;
    const colorName = parts.slice(0, -1).join("-");

    return (
      (colorNames.includes(colorName) && shades.includes(shade)) ||
      colorNames.includes(name)
    );
  });

  if (validColors.length === 0) {
    const fallbackColor = chroma.oklch(0.5, 0.1, 180);
    const [l, c, h] = fallbackColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h);
  }
  return validColors[Math.floor(Math.random() * validColors.length)][1];
};

export const validateColorPairAccessibility = (
  foreground: string,
  background: string
): {
  wcag: number;
  apca: number;
  passesWCAG: boolean;
  passesAPCA: boolean;
  recommendation: string;
} => {
  const wcagRatio = calculateContrastRatio(foreground, background);
  const apcaScore = Math.abs(calculateAPCAContrast(foreground, background));

  const passesWCAG_AA = wcagRatio >= 4.5;
  const passesWCAG_AAA = wcagRatio >= 7;

  const passesAPCA = apcaScore >= 60;

  let recommendation = "";
  if (passesWCAG_AAA && passesAPCA) {
    recommendation = "Excellent accessibility";
  } else if (passesWCAG_AA && passesAPCA) {
    recommendation = "Good accessibility";
  } else if (passesWCAG_AA || passesAPCA) {
    recommendation = "Acceptable, but could be improved";
  } else {
    recommendation = "Poor accessibility, consider adjusting colors";
  }

  return {
    wcag: wcagRatio,
    apca: apcaScore,
    passesWCAG: passesWCAG_AA,
    passesAPCA,
    recommendation,
  };
};

export const createAccessiblePaletteSystem = (
  baseHue: number,
  options: {
    isDarkTheme?: boolean;
    customLightnessLevels?: number[];
    maintainBrandColor?: boolean;
    hueShiftAmount?: number;
    validateContrast?: boolean;
  } = {}
): {
  baseColors: { base100: string; base200: string; base300: string };
  semanticColors: Record<string, string>;
  brandColors: Record<string, string>;
  fullPalette: Record<string, string>;
  contrastValidation?: Record<
    string,
    { wcag: number; apca: number; passes: boolean }
  >;
} => {
  const {
    isDarkTheme = false,
    customLightnessLevels,
    hueShiftAmount = 0,
    validateContrast = true,
  } = options;

  const baseColors = generateLightnessScale(
    baseHue,
    15,
    isDarkTheme,
    customLightnessLevels,
    hueShiftAmount
  );

  const semanticColors = {
    info: selectSemanticColor("info", baseHue, isDarkTheme),
    success: selectSemanticColor("success", baseHue, isDarkTheme),
    warning: selectSemanticColor("warning", baseHue, isDarkTheme),
    error: selectSemanticColor("error", baseHue, isDarkTheme),
  };

  const brandColors = {
    primary: selectBrandColor("primary", baseHue, isDarkTheme),
    secondary: selectBrandColor("secondary", baseHue, isDarkTheme),
    accent: selectBrandColor("accent", baseHue, isDarkTheme),
  };

  const materialScale = [98.2, 96.5, 94, 89.5, 77, 65, 49.5, 41, 28, 20];
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const fullPalette: Record<string, string> = {};

  materialScale.forEach((lightness, index) => {
    const adjustedChroma = getChromaForLightness(lightness, baseHue, 40);
    const adjustedHue = applyHueCompensation(
      baseHue,
      lightness,
      hueShiftAmount
    );

    try {
      const color = chroma.lch(lightness, adjustedChroma, adjustedHue);
      const [l, c, h] = color.oklch();
      fullPalette[`shade-${shades[index]}`] = createOklchColor(
        Math.round(l * 100),
        c,
        h || adjustedHue
      );
    } catch (error) {
      console.warn(`Failed to generate shade ${shades[index]}:`, error);
      fullPalette[`shade-${shades[index]}`] = createOklchColor(
        lightness,
        0.05,
        baseHue
      );
    }
  });

  let contrastValidation: Record<
    string,
    { wcag: number; apca: number; passes: boolean }
  > = {};

  if (validateContrast) {
    const backgroundColor = isDarkTheme ? "#000000" : "#FFFFFF";
    const allColors = {
      ...baseColors,
      ...semanticColors,
      ...brandColors,
      ...fullPalette,
    };

    Object.entries(allColors).forEach(([name, color]) => {
      const validation = validateColorPairAccessibility(color, backgroundColor);
      contrastValidation[name] = {
        wcag: validation.wcag,
        apca: validation.apca,
        passes: validation.passesWCAG && validation.passesAPCA,
      };
    });
  }

  return {
    baseColors,
    semanticColors,
    brandColors,
    fullPalette,
    ...(validateContrast && { contrastValidation }),
  };
};

export const generateRandomMaterialTheme = (
  isDarkTheme: boolean = false
): {
  baseColors: { base100: string; base200: string; base300: string };
  semanticColors: Record<string, string>;
  brandColors: Record<string, string>;
  primaryHue: number;
  selectedMaterialColor: string;
} => {
  const materialColorKeys = Object.keys(MATERIAL_COLORS);
  const randomKey =
    materialColorKeys[Math.floor(Math.random() * materialColorKeys.length)];
  const selectedMaterialColor =
    MATERIAL_COLORS[randomKey as keyof typeof MATERIAL_COLORS];

  const baseColor = chroma(selectedMaterialColor);
  const [, , primaryHue] = baseColor.lch();

  const baseColors = generateBaseColors(isDarkTheme);

  const semanticColors = {
    info: selectSemanticColor("info", primaryHue || 0, isDarkTheme),
    success: selectSemanticColor("success", primaryHue || 0, isDarkTheme),
    warning: selectSemanticColor("warning", primaryHue || 0, isDarkTheme),
    error: selectSemanticColor("error", primaryHue || 0, isDarkTheme),
  };

  const brandColors = {
    primary: selectBrandColor("primary", primaryHue || 0, isDarkTheme),
    secondary: selectBrandColor("secondary", primaryHue || 0, isDarkTheme),
    accent: selectBrandColor("accent", primaryHue || 0, isDarkTheme),
  };

  return {
    baseColors,
    semanticColors,
    brandColors,
    primaryHue: primaryHue || 0,
    selectedMaterialColor,
  };
};
