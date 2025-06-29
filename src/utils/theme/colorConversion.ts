/**
 * Color conversion utilities using chroma-js
 */

import chroma from "chroma-js";
import { ColorPalette } from "../../types/theme";

/**
 * Convert HEX color to OKLCH string format
 */
export const convertHexToOklch = (hex: string): string => {
  try {
    const color = chroma(hex);
    const [l, c, h] = color.oklch();
    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    return "oklch(50% 0.1 0)";
  }
};

/**
 * Convert OKLCH string to HEX
 */
export const convertOklchToHex = (oklchString: string): string => {
  try {
    // Parse OKLCH string to get components
    const match = oklchString.match(
      /oklch\((\d+(?:\.\d+)?)%\s+(\d*\.?\d+)\s+(\d+(?:\.\d+)?)\)/
    );
    if (!match) return "#ffffff";

    const [, l, c, h] = match;
    const color = chroma.oklch(
      parseFloat(l) / 100,
      parseFloat(c),
      parseFloat(h)
    );
    return color.hex();
  } catch (error) {
    return "#ffffff";
  }
};

/**
 * Convert HEX to OKLCH for color palette
 */
export const convertHexPaletteToOklch = (
  hexPalette: Record<string, string>
): ColorPalette => {
  return Object.fromEntries(
    Object.entries(hexPalette).map(([key, hex]) => [
      key,
      convertHexToOklch(hex),
    ])
  );
};

/**
 * Parse OKLCH components from string
 */
export const parseOklchComponents = (oklchString: string) => {
  try {
    // Parse OKLCH string to get components
    const match = oklchString.match(
      /oklch\((\d+(?:\.\d+)?)%\s+(\d*\.?\d+)\s+(\d+(?:\.\d+)?)\)/
    );
    if (!match) return null;

    const [, l, c, h] = match;
    return {
      l: parseFloat(l) / 100, // Convert percentage to 0-1
      c: parseFloat(c), // Chroma
      h: parseFloat(h), // Hue
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
export const adjustLightness = (
  oklchString: string,
  newLightness: number
): string => {
  try {
    const components = parseOklchComponents(oklchString);
    if (!components) return oklchString;

    const color = chroma.oklch(components.l, components.c, components.h);
    const adjusted = color.set("oklch.l", newLightness / 100);
    const [l, c, h] = adjusted.oklch();

    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    return oklchString;
  }
};

/**
 * Adjust chroma (saturation) of an OKLCH color
 */
export const adjustChroma = (
  oklchString: string,
  newChroma: number
): string => {
  try {
    const components = parseOklchComponents(oklchString);
    if (!components) return oklchString;

    const color = chroma.oklch(components.l, components.c, components.h);
    const adjusted = color.set("oklch.c", newChroma);
    const [l, c, h] = adjusted.oklch();

    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    return oklchString;
  }
};

/**
 * Adjust hue of an OKLCH color
 */
export const adjustHue = (oklchString: string, newHue: number): string => {
  try {
    const components = parseOklchComponents(oklchString);
    if (!components) return oklchString;

    const color = chroma.oklch(components.l, components.c, components.h);
    const adjusted = color.set("oklch.h", newHue);
    const [l, c, h] = adjusted.oklch();

    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    return oklchString;
  }
};
