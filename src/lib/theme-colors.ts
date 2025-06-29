import chroma from "chroma-js";
import { theme } from "./theme";
import { createOklchColor } from "../utils/theme/colorConversion";

export const hue = () => Number(localStorage.getItem("hue") || "210");
export const saturation = () =>
  Number(localStorage.getItem("saturation") || "60");

const generateOklchColor = (
  lightness: number,
  chromaLevel: number,
  hueValue: number
): string => {
  try {
    const lchColor = chroma.lch(lightness, chromaLevel, hueValue);
    const [l, c, h] = lchColor.oklch();
    return createOklchColor(Math.round(l * 100), c, h || hueValue);
  } catch (error) {
    return createOklchColor(lightness, chromaLevel * 0.01, hueValue);
  }
};

const baseLightness = () => (theme() === "dark" ? 15 : 85);
const baseChroma = () => saturation() * 0.6;

export const bgBody = () =>
  generateOklchColor(theme() === "dark" ? 12 : 98, baseChroma() * 0.1, hue());

export const fgBody = () =>
  generateOklchColor(theme() === "dark" ? 90 : 10, baseChroma() * 0.2, hue());

export const primary = () =>
  generateOklchColor(baseLightness(), baseChroma(), hue());

export const primaryFg = () =>
  generateOklchColor(theme() === "dark" ? 95 : 5, baseChroma() * 0.1, hue());

export const bgSecondary = () =>
  generateOklchColor(theme() === "dark" ? 18 : 95, baseChroma() * 0.15, hue());

export const fgSecondary = () =>
  generateOklchColor(theme() === "dark" ? 75 : 35, baseChroma() * 0.3, hue());

export const bgCode = () =>
  generateOklchColor(theme() === "dark" ? 8 : 96, baseChroma() * 0.05, hue());
