/**
 * Scientific color selection using chroma-js and LCH color harmony
 * Implements color theory principles from Wildbit research
 */

import chroma from "chroma-js";
import { ColorPalette, ShadeLevel } from "../../types/theme";
import { createOklchColor, convertOklchToHex } from "./colorConversion";
import { calculateContrastRatio } from "./contrastCalculation";

/**
 * Generate perceptually uniform lightness scales using LCH (Wildbit solution)
 */
export function generateLightnessScale(
  baseHue: number,
  chromaLevel: number,
  isDarkTheme: boolean
): { base100: string; base200: string; base300: string } {
  // Scientific approach using chroma.js scale (following Wildbit principles)
  const startColor = isDarkTheme
    ? chroma.lch(15, chromaLevel, baseHue) // Dark theme: dark backgrounds
    : chroma.lch(98, chromaLevel, baseHue); // Light theme: light backgrounds

  const endColor = isDarkTheme
    ? chroma.lch(8, chromaLevel, baseHue)
    : chroma.lch(92, chromaLevel, baseHue);

  // Use chroma.scale for perceptually uniform interpolation
  const scale = chroma
    .scale([startColor, endColor])
    .mode("lch") // Use LCH for perceptual uniformity
    .colors(3);

  // Convert to OKLCH format
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

/**
 * Generate semantic colors using scientific color harmony rules (chroma.js principles)
 */
export function generateSemanticHues(
  primaryHue: number
): Record<string, number> {
  // Scientific color harmony based on chroma.js and color theory
  return {
    primary: primaryHue,
    secondary: adjustHue(primaryHue, 60), // Analogous harmony (60° offset)
    accent: adjustHue(primaryHue, 180), // Complementary harmony
    info: adjustHue(primaryHue, 240), // Triadic cool (blue family)
    success: adjustHue(primaryHue, 120), // Triadic harmony (green family)
    warning: adjustHue(primaryHue, 45), // Split complementary warm (yellow/orange)
    error: adjustHue(primaryHue, 15), // Near complement (red family)
  };
}

/**
 * Adjust hue while keeping it in valid range
 */
function adjustHue(baseHue: number, adjustment: number): number {
  const newHue = baseHue + adjustment;
  return ((newHue % 360) + 360) % 360;
}

/**
 * Generate color using LCH color space - Scientific approach (chroma.js + Wildbit principles)
 */
export function generateLCHColor(
  hue: number,
  lightness: number,
  chromaLevel: number
): string {
  try {
    // Use chroma.js LCH constructor for perceptually uniform colors
    const lchColor = chroma.lch(lightness, chromaLevel, hue);

    // Convert to OKLCH format for system compatibility
    const [l, c, h] = lchColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || hue);
  } catch (error) {
    // Fallback: create direct OKLCH color
    return createOklchColor(lightness, chromaLevel * 0.01, hue);
  }
}

/**
 * Select semantic color using color harmony (replaces manual family selection)
 */
export const selectSemanticColor = (
  semanticType: "info" | "success" | "warning" | "error",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  const semanticHues = generateSemanticHues(primaryHue);
  const hue = semanticHues[semanticType];

  // Scientific approach: Use chroma.js to generate perceptually uniform semantic colors
  const baseColor = chroma.lch(
    isDarkTheme ? 65 : 55, // Appropriate lightness for theme
    50, // Medium chroma for semantic colors
    hue
  );

  // Convert to OKLCH format
  const [l, c, h] = baseColor.oklch();
  return createOklchColor(Math.round(l * 100), c, h || hue);
};

/**
 * Generate cohesive base colors using perceptually uniform scales
 */
export const generateBaseColors = (
  primaryHue: number,
  isDarkTheme: boolean
): { base100: string; base200: string; base300: string } => {
  // Use very low chroma for neutral base colors (following Wildbit recommendations)
  const baseChromaLevel = 1; // Almost neutral for base colors
  return generateLightnessScale(primaryHue, baseChromaLevel, isDarkTheme);
};

/**
 * Select brand color using color harmony instead of weighted random
 */
export const selectBrandColor = (
  semanticType: "primary" | "secondary" | "accent",
  primaryHue: number,
  isDarkTheme: boolean
): string => {
  const semanticHues = generateSemanticHues(primaryHue);
  const hue = semanticHues[semanticType];

  // Scientific approach: Brand colors should be vibrant and consistent
  const baseColor = chroma.lch(
    isDarkTheme ? 70 : 50, // Brand-appropriate lightness
    60, // Higher chroma for brand colors (more vibrant)
    hue
  );

  // Convert to OKLCH format
  const [l, c, h] = baseColor.oklch();
  return createOklchColor(Math.round(l * 100), c, h || hue);
};

/**
 * Generate accessible color pair using scientific principles (Wildbit + chroma.js approach)
 */
export const generateAccessibleColorPair = (
  backgroundColor: string,
  targetContrast: number = 7 // WCAG AAA standard
): string => {
  try {
    // Convert background to chroma.js for scientific processing
    const bgHex = convertOklchToHex(backgroundColor);
    const bgColor = chroma(bgHex);
    const [bgL, , bgH] = bgColor.lch();

    // Scientific text color generation using LCH perceptual uniformity
    // High contrast approach: use opposite end of lightness spectrum
    const textLightness = bgL > 50 ? 15 : 85;
    const textChroma = 5; // Low chroma for text readability

    const textColor = chroma.lch(textLightness, textChroma, bgH || 0);

    // Verify contrast meets scientific standards
    const contrast = chroma.contrast(bgHex, textColor.hex());

    if (contrast >= targetContrast) {
      // Convert to OKLCH format
      const [l, c, h] = textColor.oklch();
      return createOklchColor(Math.round(l * 100), c, h || bgH);
    }

    // If contrast is insufficient, try adjusting lightness
    const adjustedTextColor = textColor.set(
      "lch.l",
      textLightness > 50 ? 95 : 5
    );
    const [l, c, h] = adjustedTextColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || bgH);
  } catch (error) {
    // Fallback: return black or white based on background lightness
    return backgroundColor.includes("oklch(") &&
      parseFloat(backgroundColor.split("(")[1]) > 50
      ? "oklch(0% 0 0)"
      : "oklch(100% 0 0)";
  }
};

// Legacy compatibility functions (maintaining existing API)

export const selectRandomColor = (palette: ColorPalette): string => {
  const colors = Object.values(palette);
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomWeightedArray = <T>(
  arrays: T[][],
  probability = 0.3
): T[] => {
  const randomNumber = Math.random();
  if (randomNumber < probability) {
    return arrays[1];
  }
  return arrays[0];
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

export const extractColorFamily = (colorName: string): string => {
  const parts = colorName.split("-");
  if (/^\d+$/.test(parts[parts.length - 1])) {
    return parts.slice(0, -1).join("-");
  }
  return colorName;
};

export const findExistingColorFamily = (
  theme: Record<string, string>,
  palette: ColorPalette
): string | null => {
  const primaryColor = theme["--color-primary"];
  if (!primaryColor) return null;

  // Convert primary color to chroma.js for comparison
  const primaryChroma = chroma(convertOklchToHex(primaryColor));

  // Find closest matching color family
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

export const generateWeightedArray = (
  weights: Record<string, number>
): string[] => {
  return Object.entries(weights).reduce((arr, [color, weight]) => {
    for (let i = 0; i < weight; i++) {
      arr.push(color);
    }
    return arr;
  }, [] as string[]);
};
