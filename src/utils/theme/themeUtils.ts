import { Theme, ColorGroup } from "../../types/theme";
import { convertHexToOklch, convertOklchToHex } from "./colorConversion";
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
      return theme["--color-base-100"] || "oklch(100% 0 0)";
    } else {
      return theme[colorKey] || "oklch(50% 0.1 180)";
    }
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    return theme[mainColorKey] || "oklch(50% 0.1 180)";
  }
};

export const getColorTextStyle = (
  theme: Theme,
  colorKey: string,
  groupName: string
): string => {
  const isContentColor = colorKey.endsWith("-content");

  if (groupName === "base") {
    return theme["--color-base-content"] || "oklch(0% 0 0)";
  } else {
    const mainColorKey = isContentColor
      ? colorKey.replace("-content", "")
      : colorKey;
    const contentColorKey = mainColorKey + "-content";
    return theme[contentColorKey] || "oklch(100% 0 0)";
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
