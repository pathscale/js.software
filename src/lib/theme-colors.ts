import { theme } from "./theme";

export const hue = () => Number(localStorage.getItem("hue") || "210");
export const saturation = () =>
  Number(localStorage.getItem("saturation") || "60");

const hsl = (h: number, s: number, l: number) => `${h} ${s}% ${l}%`;
const lightness = () => (theme() === "dark" ? 10 : 90);
const baseHSL = () => hsl(hue(), saturation(), lightness());

export const bgBody = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 10 : 98);
export const fgBody = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 90 : 10);
export const primary = () => baseHSL();
export const primaryFg = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 95 : 5);
export const bgSecondary = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 15 : 95);
export const fgSecondary = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 80 : 30);
export const bgCode = () =>
  hsl(hue(), saturation(), theme() === "dark" ? 8 : 96);
