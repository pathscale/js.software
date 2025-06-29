import chroma from "chroma-js";
import { ColorPalette, ShadeLevel } from "../../types/theme";
import { createOklchColor, convertOklchToHex } from "./colorConversion";

export function generateLightnessScale(
  baseHue: number,
  chromaLevel: number,
  isDarkTheme: boolean
): { base100: string; base200: string; base300: string } {
  const startColor = isDarkTheme
    ? chroma.lch(15, chromaLevel, baseHue)
    : chroma.lch(98, chromaLevel, baseHue);

  const endColor = isDarkTheme
    ? chroma.lch(8, chromaLevel, baseHue)
    : chroma.lch(92, chromaLevel, baseHue);

  const scale = chroma.scale([startColor, endColor]).mode("lch").colors(3);

  const convertToOklch = (chromaColor: chroma.Color) => {
    const [l, c, h] = chromaColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || baseHue);
  };

  return {
    base100: convertToOklch(chroma(scale[0])),
    base200: convertToOklch(chroma(scale[1])),
    base300: convertToOklch(chroma(scale[2])),
  };
}

export function generateSemanticHues(
  primaryHue: number
): Record<string, number> {
  return {
    primary: primaryHue,
    secondary: adjustHue(primaryHue, 60),
    accent: adjustHue(primaryHue, 180),
    info: adjustHue(primaryHue, 240),
    success: adjustHue(primaryHue, 120),
    warning: adjustHue(primaryHue, 45),
    error: adjustHue(primaryHue, 15),
  };
}

function adjustHue(baseHue: number, adjustment: number): number {
  const newHue = baseHue + adjustment;
  return ((newHue % 360) + 360) % 360;
}

export function generateLCHColor(
  hue: number,
  lightness: number,
  chromaLevel: number
): string {
  try {
    const lchColor = chroma.lch(lightness, chromaLevel, hue);
    const [l, c, h] = lchColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || hue);
  } catch (error) {
    return createOklchColor(lightness, chromaLevel * 0.01, hue);
  }
}

export const selectSemanticColor = (
  semanticType: "info" | "success" | "warning" | "error",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  const semanticHues = generateSemanticHues(primaryHue);
  const hue = semanticHues[semanticType];

  const baseColor = chroma.lch(isDarkTheme ? 65 : 55, 50, hue);

  const [l, c, h] = baseColor.oklch();
  return createOklchColor(Math.round(l * 100), c, h || hue);
};

export const generateBaseColors = (
  primaryHue: number,
  isDarkTheme: boolean
): { base100: string; base200: string; base300: string } => {
  const baseChromaLevel = 1;
  return generateLightnessScale(primaryHue, baseChromaLevel, isDarkTheme);
};

export const selectBrandColor = (
  semanticType: "primary" | "secondary" | "accent",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  const semanticHues = generateSemanticHues(primaryHue);
  const hue = semanticHues[semanticType];

  const baseColor = chroma.lch(isDarkTheme ? 70 : 50, 60, hue);

  const [l, c, h] = baseColor.oklch();
  return createOklchColor(Math.round(l * 100), c, h || hue);
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

  if (validColors.length === 0) return "oklch(50% 0.1 180)";
  return validColors[Math.floor(Math.random() * validColors.length)][1];
};

export const findExistingColorFamily = (
  theme: Record<string, string>,
  palette: ColorPalette
): string | null => {
  const primaryColor = theme["--color-primary"];
  if (!primaryColor) return null;

  const primaryChroma = chroma(convertOklchToHex(primaryColor));

  let closestFamily = null;
  let minDistance = Infinity;

  Object.entries(palette).forEach(([family, color]) => {
    const colorChroma = chroma(convertOklchToHex(color));
    const distance = chroma.distance(primaryChroma, colorChroma);

    if (distance < minDistance) {
      minDistance = distance;
      closestFamily = family;
    }
  });

  return closestFamily;
};
