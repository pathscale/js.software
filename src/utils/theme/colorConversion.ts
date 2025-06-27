/**
 * Color conversion utilities using culori
 */

import { formatHex, converter } from "culori";
import { ColorPalette } from "../../types/theme";

/**
 * Convert HEX color to OKLCH string format
 */
export const convertHexToOklch = (hex: string): string => {
  try {
    const color = converter("oklch")(hex);
    if (!color) return "oklch(50% 0.1 0)";
    
    const l = Math.round(color.l * 100);
    const c = parseFloat((color.c || 0).toFixed(3));
    const h = Math.round(color.h || 0);
    
    return `oklch(${l}% ${c} ${h})`;
  } catch (error) {
    return "oklch(50% 0.1 0)";
  }
};

/**
 * Convert OKLCH string to HEX
 */
export const convertOklchToHex = (oklchString: string): string => {
  try {
    const color = converter("oklch")(oklchString);
    if (!color) return "#ffffff";
    
    return formatHex(color) || "#ffffff";
  } catch (error) {
    return "#ffffff";
  }
};

/**
 * Convert HEX to OKLCH for color palette  
 */
export const convertHexPaletteToOklch = (hexPalette: Record<string, string>): ColorPalette => {
  return Object.fromEntries(
    Object.entries(hexPalette).map(([key, hex]) => [key, convertHexToOklch(hex)])
  );
};

/**
 * Parse OKLCH components from string
 */
export const parseOklchComponents = (oklchString: string) => {
  try {
    const color = converter("oklch")(oklchString);
    if (!color) return null;
    
    return {
      l: color.l,        // Lightness (0-1)
      c: color.c || 0,   // Chroma (0+)
      h: color.h || 0,   // Hue (0-360)
    };
  } catch (error) {
    return null;
  }
};

/**
 * Create OKLCH color from components
 */
export const createOklchColor = (l: number, c: number, h: number): string => {
  // Ensure values are in valid ranges
  const lightness = Math.max(0, Math.min(100, l));
  const chroma = Math.max(0, c);
  const hue = h % 360;
  
  return `oklch(${lightness}% ${chroma.toFixed(3)} ${Math.round(hue)})`;
};

/**
 * Adjust lightness of an OKLCH color
 */
export const adjustLightness = (oklchString: string, newLightness: number): string => {
  const components = parseOklchComponents(oklchString);
  if (!components) return oklchString;
  
  return createOklchColor(newLightness, components.c, components.h);
};

/**
 * Adjust chroma (saturation) of an OKLCH color
 */
export const adjustChroma = (oklchString: string, newChroma: number): string => {
  const components = parseOklchComponents(oklchString);
  if (!components) return oklchString;
  
  return createOklchColor(components.l * 100, newChroma, components.h);
};

/**
 * Adjust hue of an OKLCH color
 */
export const adjustHue = (oklchString: string, newHue: number): string => {
  const components = parseOklchComponents(oklchString);
  if (!components) return oklchString;
  
  return createOklchColor(components.l * 100, components.c, newHue);
};