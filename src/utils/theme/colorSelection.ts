/**
 * Color selection algorithms for theme generation
 */

import { converter, wcagContrast } from "culori";
import { ColorPalette, BrandColorWeights, ShadeLevel } from "../../types/theme";
import { generateContrastColor, isProblematicColor } from "./contrastCalculation";

/**
 * Utility functions
 */
const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Select random color from palette
 */
export const selectRandomColor = (palette: ColorPalette): string => {
  const colorKeys = Object.keys(palette);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return palette[randomKey];
};

/**
 * Get random item from weighted arrays
 */
export const getRandomWeightedArray = <T>(arrays: T[][], probability = 0.3): T[] => {
  const randomNumber = Math.random();
  if (randomNumber < probability) {
    return arrays[1];
  }
  return arrays[0];
};

/**
 * Generate weighted array from weights object
 */
export const generateWeightedArray = (weights: BrandColorWeights): string[] => {
  return Object.entries(weights).reduce((arr, [color, weight]) => {
    for (let i = 0; i < weight; i++) {
      arr.push(color);
    }
    return arr;
  }, [] as string[]);
};

/**
 * Select color from specific family and shades
 */
export const selectColorFromFamily = (
  palette: ColorPalette,
  colorNames: string[],
  shades: ShadeLevel[]
): string => {
  const validColors = Object.entries(palette).filter(([name, _]) => {
    // Handle Material Design color names (e.g., "deep-purple-500", "light-blue-400")
    const parts = name.split("-");
    const shade = parts[parts.length - 1] as ShadeLevel;
    const colorName = parts.slice(0, -1).join("-");
    
    return (
      (colorNames.includes(colorName) && shades.includes(shade)) ||
      colorNames.includes(name)
    );
  });
  
  if (validColors.length === 0) return "oklch(50% 0.1 180)"; // fallback
  return validColors[Math.floor(Math.random() * validColors.length)][1];
};

/**
 * Select accessible color pair with retry logic
 */
export const selectAccessibleColorPair = (
  palette: ColorPalette,
  preferredShades: ShadeLevel[],
  maxAttempts = 10
): string | null => {
  for (let i = 0; i < maxAttempts; i++) {
    const shade = preferredShades[Math.floor(Math.random() * preferredShades.length)];
    const colorKeys = Object.keys(palette).filter(key => key.endsWith(`-${shade}`));
    
    if (colorKeys.length > 0) {
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const backgroundColor = palette[randomKey];
      
      // Skip problematic colors entirely
      if (isProblematicColor(backgroundColor)) {
        continue;
      }
      
      const textColor = generateContrastColor(backgroundColor);
      
      try {
        const bgColor = converter("oklch")(backgroundColor);
        const txtColor = converter("oklch")(textColor);
        if (bgColor && txtColor) {
          const contrast = wcagContrast(bgColor, txtColor);
          if (contrast >= 4.5) {
            return backgroundColor;
          }
        }
      } catch (error) {
        // Continue to next attempt
      }
    }
  }
  
  // Fallback: return any non-problematic color from preferred shades
  const shade = preferredShades[Math.floor(Math.random() * preferredShades.length)];
  const colorKeys = Object.keys(palette).filter(key => key.endsWith(`-${shade}`));
  
  for (const key of colorKeys) {
    const color = palette[key];
    if (!isProblematicColor(color)) {
      return color;
    }
  }
  
  return selectRandomColor(palette);
};

/**
 * Extract color family from a color name
 * e.g., "deep-purple-500" -> "deep-purple"
 */
export const extractColorFamily = (colorName: string): string => {
  const parts = colorName.split("-");
  // Remove the last part if it's a number (shade)
  if (/^\d+$/.test(parts[parts.length - 1])) {
    return parts.slice(0, -1).join("-");
  }
  return colorName;
};

/**
 * Find existing color family from theme
 */
export const findExistingColorFamily = (
  theme: Record<string, string>,
  palette: ColorPalette
): string | null => {
  for (const [key, value] of Object.entries(theme)) {
    if (key.startsWith("--color-base-") && !key.endsWith("-content")) {
      const foundEntry = Object.entries(palette).find(([_, v]) => v === value);
      if (foundEntry) {
        return extractColorFamily(foundEntry[0]);
      }
    }
  }
  return null;
};

/**
 * Select brand colors using weights
 */
export const selectBrandColor = (
  palette: ColorPalette,
  weights: BrandColorWeights,
  shades: ShadeLevel[]
): string => {
  const availableColors = generateWeightedArray(weights);
  const shuffledColors = shuffle(availableColors);
  const colorName = shuffledColors[0];
  
  return selectColorFromFamily(palette, [colorName], shades);
};

/**
 * Select semantic colors based on type
 */
export const selectSemanticColor = (
  palette: ColorPalette,
  semanticType: 'info' | 'success' | 'warning' | 'error',
  shades: ShadeLevel[]
): string => {
  const semanticColorFamilies = {
    info: ["blue", "light-blue", "cyan"],
    success: ["green", "light-green", "teal"],
    warning: ["orange", "deep-orange", "amber"], // Removed yellow first, use darker alternatives
    error: ["red", "pink"]
  };
  
  const colorFamilies = semanticColorFamilies[semanticType];
  
  // For warning colors, be extra strict about accessibility
  if (semanticType === 'warning') {
    // Try darker shades first for better contrast
    const darkerShades: ShadeLevel[] = ["600", "700", "800"];
    
    // First try orange family with darker shades (better contrast than yellow)
    let selectedColor = selectAccessibleColorPair(palette, darkerShades);
    if (selectedColor) {
      const colorFamily = extractColorFamily(
        Object.entries(palette).find(([_, value]) => value === selectedColor)?.[0] || ""
      );
      if (["orange", "deep-orange"].includes(colorFamily)) {
        return selectedColor;
      }
    }
    
    // If that fails, try amber with darker shades
    selectedColor = selectColorFromFamily(palette, ["amber"], darkerShades);
    if (selectedColor) return selectedColor;
    
    // Last resort: use orange with any available shade
    return selectColorFromFamily(palette, ["orange", "deep-orange"], shades);
  }
  
  // For other semantic types, use normal logic
  const accessibleColor = selectAccessibleColorPair(palette, shades);
  if (accessibleColor) {
    const colorFamily = extractColorFamily(
      Object.entries(palette).find(([_, value]) => value === accessibleColor)?.[0] || ""
    );
    if (colorFamilies.includes(colorFamily)) {
      return accessibleColor;
    }
  }
  
  // Fallback to family selection
  return selectColorFromFamily(palette, colorFamilies, shades);
};

/**
 * Generate cohesive base colors from same family
 */
export const generateBaseColors = (
  palette: ColorPalette,
  colorFamily: string,
  isDarkTheme: boolean
): { base100: string; base200: string; base300: string } => {
  if (isDarkTheme) {
    // Dark theme: darker base colors
    return {
      base100: selectColorFromFamily(palette, [colorFamily], ["900"]),
      base200: selectColorFromFamily(palette, [colorFamily], ["800"]),
      base300: selectColorFromFamily(palette, [colorFamily], ["700"]),
    };
  } else {
    // Light theme: lighter base colors
    return {
      base100: selectColorFromFamily(palette, [colorFamily], ["50"]),
      base200: selectColorFromFamily(palette, [colorFamily], ["100"]),
      base300: selectColorFromFamily(palette, [colorFamily], ["200"]),
    };
  }
};