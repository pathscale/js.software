import chroma from "chroma-js";
import { ColorPalette } from "../../types/theme";

export const convertHexToOklch = (hex: string): string => {
  try {
    const color = chroma(hex);
    const [l, c, h] = color.oklch();
    return createOklchColor(Math.round(l * 100), c, h || 0);
  } catch (error) {
    return "oklch(50% 0.1 0)";
  }
};

export const convertOklchToHex = (oklchString: string): string => {
  try {
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

export const createOklchColor = (l: number, c: number, h: number): string => {
  const lightness = Math.max(0, Math.min(100, l));
  const chroma = Math.max(0, c);
  const hue = h % 360;

  return `oklch(${lightness}% ${chroma.toFixed(3)} ${Math.round(hue)})`;
};
