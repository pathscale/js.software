import chroma from "chroma-js";
import { Theme, ColorGroup } from "../../types/theme";
import { convertHexToOklch, convertOklchToHex, createOklchColor } from "./colorConversion";
import { generateAccessibleTextColor } from "./contrastCalculation";

export const updateThemeColor = (
  theme: Theme,
  colorKey: string,
  colorValue: string
): Theme => {
  const oklchColor = colorValue.startsWith("#")
    ? convertHexToOklch(colorValue)
    : colorValue;

  const newTheme = { ...theme, [colorKey]: oklchColor };

  if (!colorKey.includes("-content")) {
    const contentKey = colorKey + "-content";
    newTheme[contentKey] = generateAccessibleTextColor(oklchColor);
  }

  return newTheme;
};

export const updateThemeProperty = (
  theme: Theme,
  key: string,
  value: string
): Theme => {
  return { ...theme, [key]: value };
};

export const getColorBackgroundStyle = (
  theme: Theme,
  colorKey: string,
  groupName: string
): string => {
  const isContentColor = colorKey.endsWith("-content");

  if (groupName === "base") {
    if (isContentColor) {
      const fallback = chroma.oklch(1, 0, 0);
      const [l, c, h] = fallback.oklch();
      return theme["--color-base-100"] || createOklchColor(Math.round(l * 100), c, h);
    } else {
      const fallback = chroma.oklch(0.5, 0.1, 180);
      const [l, c, h] = fallback.oklch();
      return theme[colorKey] || createOklchColor(Math.round(l * 100), c, h);
    }
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    const fallback = chroma.oklch(0.5, 0.1, 180);
    const [l, c, h] = fallback.oklch();
    return theme[mainColorKey] || createOklchColor(Math.round(l * 100), c, h);
  }
};

export const getColorTextStyle = (
  theme: Theme,
  colorKey: string,
  groupName: string
): string => {
  const isContentColor = colorKey.endsWith("-content");

  if (groupName === "base") {
    const fallback = chroma.oklch(0, 0, 0);
    const [l, c, h] = fallback.oklch();
    return theme["--color-base-content"] || createOklchColor(Math.round(l * 100), c, h);
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    const contentColorKey = mainColorKey + "-content";
    const fallback = chroma.oklch(1, 0, 0);
    const [l, c, h] = fallback.oklch();
    return theme[contentColorKey] || createOklchColor(Math.round(l * 100), c, h);
  }
};

export const getColorLabel = (colorKey: string, groupName: string): string => {
  if (colorKey.endsWith("-content")) {
    return "A";
  }
  if (/\d/.test(colorKey)) {
    return colorKey.replace(`--color-${groupName}-`, "");
  }
  return "";
};

export const generateThemeStyleString = (theme: Theme): string => {
  return Object.entries(theme)
    .filter(([key]) => key.startsWith("--") && key !== "name")
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
};
