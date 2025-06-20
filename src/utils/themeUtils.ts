import { randomizeThemeColors } from "../lib/themeGeneratorRandomizer.js";
import { formatHex, formatOklch, converter } from "culori";

const generateContrastColor = (backgroundOKLCH: string): string => {
  const match = backgroundOKLCH.match(
    /oklch\((\d+(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\)/
  );
  if (!match) return "oklch(0% 0 0)";

  const l = parseFloat(match[1]);
  const h = parseFloat(match[3]) || 0;

  if (l > 50) {
    return `oklch(20% 0.02 ${h})`;
  } else {
    return `oklch(95% 0.02 ${h})`;
  }
};

export const TAILWIND_COLORS = {
  "slate-50": "oklch(98% 0.003 247.858)",
  "slate-100": "oklch(96% 0.007 247.896)",
  "slate-200": "oklch(92% 0.013 255.508)",
  "slate-300": "oklch(86% 0.022 252.894)",
  "slate-400": "oklch(70% 0.04 256.788)",
  "slate-500": "oklch(55% 0.046 257.417)",
  "slate-600": "oklch(44% 0.043 257.281)",
  "slate-700": "oklch(37% 0.044 257.287)",
  "slate-800": "oklch(27% 0.041 260.031)",
  "slate-900": "oklch(20% 0.042 265.755)",
  "slate-950": "oklch(12% 0.042 264.695)",
  "gray-50": "oklch(98% 0.002 247.839)",
  "gray-100": "oklch(96% 0.003 264.542)",
  "gray-200": "oklch(92% 0.006 264.531)",
  "gray-300": "oklch(87% 0.01 258.338)",
  "gray-400": "oklch(70% 0.022 261.325)",
  "gray-500": "oklch(55% 0.027 264.364)",
  "gray-600": "oklch(44% 0.03 256.802)",
  "gray-700": "oklch(37% 0.034 259.733)",
  "gray-800": "oklch(27% 0.033 256.848)",
  "gray-900": "oklch(21% 0.034 264.665)",
  "gray-950": "oklch(13% 0.028 261.692)",
  "zinc-50": "oklch(98% 0 0)",
  "zinc-100": "oklch(96% 0.001 286.375)",
  "zinc-200": "oklch(92% 0.004 286.32)",
  "zinc-300": "oklch(87% 0.006 286.286)",
  "zinc-400": "oklch(70% 0.015 286.067)",
  "zinc-500": "oklch(55% 0.016 285.938)",
  "zinc-600": "oklch(44% 0.017 285.786)",
  "zinc-700": "oklch(37% 0.013 285.805)",
  "zinc-800": "oklch(27% 0.006 286.033)",
  "zinc-900": "oklch(21% 0.006 285.885)",
  "zinc-950": "oklch(14% 0.005 285.823)",
  "neutral-50": "oklch(98% 0 0)",
  "neutral-100": "oklch(97% 0 0)",
  "neutral-200": "oklch(92% 0 0)",
  "neutral-300": "oklch(87% 0 0)",
  "neutral-400": "oklch(70% 0 0)",
  "neutral-500": "oklch(55% 0 0)",
  "neutral-600": "oklch(43% 0 0)",
  "neutral-700": "oklch(37% 0 0)",
  "neutral-800": "oklch(26% 0 0)",
  "neutral-900": "oklch(20% 0 0)",
  "neutral-950": "oklch(14% 0 0)",
  "stone-50": "oklch(98% 0.001 106.423)",
  "stone-100": "oklch(97% 0.001 106.424)",
  "stone-200": "oklch(92% 0.003 48.717)",
  "stone-300": "oklch(86% 0.005 56.366)",
  "stone-400": "oklch(70% 0.01 56.259)",
  "stone-500": "oklch(55% 0.013 58.071)",
  "stone-600": "oklch(44% 0.011 73.639)",
  "stone-700": "oklch(37% 0.01 67.558)",
  "stone-800": "oklch(26% 0.007 34.298)",
  "stone-900": "oklch(21% 0.006 56.043)",
  "stone-950": "oklch(14% 0.004 49.25)",
  "blue-50": "oklch(97% 0.014 254.604)",
  "blue-100": "oklch(93% 0.032 255.585)",
  "blue-200": "oklch(88% 0.059 254.128)",
  "blue-300": "oklch(80% 0.105 251.813)",
  "blue-400": "oklch(70% 0.165 254.624)",
  "blue-500": "oklch(62% 0.214 259.815)",
  "blue-600": "oklch(54% 0.245 262.881)",
  "blue-700": "oklch(48% 0.243 264.376)",
  "blue-800": "oklch(42% 0.199 265.638)",
  "blue-900": "oklch(37% 0.146 265.522)",
  "blue-950": "oklch(28% 0.091 267.935)",
  "indigo-50": "oklch(96% 0.018 272.314)",
  "indigo-100": "oklch(93% 0.034 272.788)",
  "indigo-200": "oklch(87% 0.065 274.039)",
  "indigo-300": "oklch(78% 0.115 274.713)",
  "indigo-400": "oklch(67% 0.182 276.935)",
  "indigo-500": "oklch(58% 0.233 277.117)",
  "indigo-600": "oklch(51% 0.262 276.966)",
  "indigo-700": "oklch(45% 0.24 277.023)",
  "indigo-800": "oklch(39% 0.195 277.366)",
  "indigo-900": "oklch(35% 0.144 278.697)",
  "indigo-950": "oklch(25% 0.09 281.288)",
  "violet-50": "oklch(96% 0.016 293.756)",
  "violet-100": "oklch(94% 0.029 294.588)",
  "violet-200": "oklch(89% 0.057 293.283)",
  "violet-300": "oklch(81% 0.111 293.571)",
  "violet-400": "oklch(70% 0.183 293.541)",
  "violet-500": "oklch(60% 0.25 292.717)",
  "violet-600": "oklch(54% 0.281 293.009)",
  "violet-700": "oklch(49% 0.27 292.581)",
  "violet-800": "oklch(43% 0.232 292.759)",
  "violet-900": "oklch(38% 0.189 293.745)",
  "violet-950": "oklch(28% 0.141 291.089)",
  "emerald-50": "oklch(97% 0.021 166.113)",
  "emerald-100": "oklch(95% 0.052 163.051)",
  "emerald-200": "oklch(90% 0.093 164.15)",
  "emerald-300": "oklch(84% 0.143 164.978)",
  "emerald-400": "oklch(76% 0.177 163.223)",
  "emerald-500": "oklch(69% 0.17 162.48)",
  "emerald-600": "oklch(59% 0.145 163.225)",
  "emerald-700": "oklch(50% 0.118 165.612)",
  "emerald-800": "oklch(43% 0.095 166.913)",
  "emerald-900": "oklch(37% 0.077 168.94)",
  "emerald-950": "oklch(26% 0.051 172.552)",
  "teal-50": "oklch(98% 0.014 180.72)",
  "teal-100": "oklch(95% 0.051 180.801)",
  "teal-200": "oklch(91% 0.096 180.426)",
  "teal-300": "oklch(85% 0.138 181.071)",
  "teal-400": "oklch(77% 0.152 181.912)",
  "teal-500": "oklch(70% 0.14 182.503)",
  "teal-600": "oklch(60% 0.118 184.704)",
  "teal-700": "oklch(51% 0.096 186.391)",
  "teal-800": "oklch(43% 0.078 188.216)",
  "teal-900": "oklch(38% 0.063 188.416)",
  "teal-950": "oklch(27% 0.046 192.524)",
  "cyan-50": "oklch(98% 0.019 200.873)",
  "cyan-100": "oklch(95% 0.045 203.388)",
  "cyan-200": "oklch(91% 0.08 205.041)",
  "cyan-300": "oklch(86% 0.127 207.078)",
  "cyan-400": "oklch(78% 0.154 211.53)",
  "cyan-500": "oklch(71% 0.143 215.221)",
  "cyan-600": "oklch(60% 0.126 221.723)",
  "cyan-700": "oklch(52% 0.105 223.128)",
  "cyan-800": "oklch(45% 0.085 224.283)",
  "cyan-900": "oklch(39% 0.07 227.392)",
  "cyan-950": "oklch(30% 0.056 229.695)",
  "sky-50": "oklch(97% 0.013 236.62)",
  "sky-100": "oklch(95% 0.026 236.824)",
  "sky-200": "oklch(90% 0.058 230.902)",
  "sky-300": "oklch(82% 0.111 230.318)",
  "sky-400": "oklch(74% 0.16 232.661)",
  "sky-500": "oklch(68% 0.169 237.323)",
  "sky-600": "oklch(58% 0.158 241.966)",
  "sky-700": "oklch(50% 0.134 242.749)",
  "sky-800": "oklch(44% 0.11 240.79)",
  "sky-900": "oklch(39% 0.09 240.876)",
  "sky-950": "oklch(29% 0.066 243.157)",
  "red-50": "oklch(97% 0.013 17.38)",
  "red-100": "oklch(93% 0.032 17.717)",
  "red-200": "oklch(88% 0.062 18.334)",
  "red-300": "oklch(80% 0.114 19.571)",
  "red-400": "oklch(70% 0.191 22.216)",
  "red-500": "oklch(63% 0.237 25.331)",
  "red-600": "oklch(57% 0.245 27.325)",
  "red-700": "oklch(50% 0.213 27.518)",
  "red-800": "oklch(44% 0.177 26.899)",
  "red-900": "oklch(39% 0.141 25.723)",
  "red-950": "oklch(25% 0.092 26.042)",
  "orange-50": "oklch(98% 0.016 73.684)",
  "orange-100": "oklch(95% 0.038 75.164)",
  "orange-200": "oklch(90% 0.076 70.697)",
  "orange-300": "oklch(83% 0.128 66.29)",
  "orange-400": "oklch(75% 0.183 55.934)",
  "orange-500": "oklch(70% 0.213 47.604)",
  "orange-600": "oklch(64% 0.222 41.116)",
  "orange-700": "oklch(55% 0.195 38.402)",
  "orange-800": "oklch(47% 0.157 37.304)",
  "orange-900": "oklch(40% 0.123 38.172)",
  "orange-950": "oklch(26% 0.079 36.259)",
  "amber-50": "oklch(98% 0.022 95.277)",
  "amber-100": "oklch(96% 0.059 95.617)",
  "amber-200": "oklch(92% 0.12 95.746)",
  "amber-300": "oklch(87% 0.169 91.605)",
  "amber-400": "oklch(82% 0.189 84.429)",
  "amber-500": "oklch(76% 0.188 70.08)",
  "amber-600": "oklch(66% 0.179 58.318)",
  "amber-700": "oklch(55% 0.163 48.998)",
  "amber-800": "oklch(47% 0.137 46.201)",
  "amber-900": "oklch(41% 0.112 45.904)",
  "amber-950": "oklch(27% 0.077 45.635)",
  "yellow-50": "oklch(98% 0.026 102.212)",
  "yellow-100": "oklch(97% 0.071 103.193)",
  "yellow-200": "oklch(94% 0.129 101.54)",
  "yellow-300": "oklch(90% 0.182 98.111)",
  "yellow-400": "oklch(85% 0.199 91.936)",
  "yellow-500": "oklch(79% 0.184 86.047)",
  "yellow-600": "oklch(68% 0.162 75.834)",
  "yellow-700": "oklch(55% 0.135 66.442)",
  "yellow-800": "oklch(47% 0.114 61.907)",
  "yellow-900": "oklch(42% 0.095 57.708)",
  "yellow-950": "oklch(28% 0.066 53.813)",
  "lime-50": "oklch(98% 0.031 120.757)",
  "lime-100": "oklch(96% 0.067 122.328)",
  "lime-200": "oklch(93% 0.127 124.321)",
  "lime-300": "oklch(89% 0.196 126.665)",
  "lime-400": "oklch(84% 0.238 128.85)",
  "lime-500": "oklch(76% 0.233 130.85)",
  "lime-600": "oklch(64% 0.2 131.684)",
  "lime-700": "oklch(53% 0.157 131.589)",
  "lime-800": "oklch(45% 0.124 130.933)",
  "lime-900": "oklch(40% 0.101 131.063)",
  "lime-950": "oklch(27% 0.072 132.109)",
  "green-50": "oklch(98% 0.018 155.826)",
  "green-100": "oklch(96% 0.044 156.743)",
  "green-200": "oklch(92% 0.084 155.995)",
  "green-300": "oklch(87% 0.15 154.449)",
  "green-400": "oklch(79% 0.209 151.711)",
  "green-500": "oklch(72% 0.219 149.579)",
  "green-600": "oklch(62% 0.194 149.214)",
  "green-700": "oklch(52% 0.154 150.069)",
  "green-800": "oklch(44% 0.119 151.328)",
  "green-900": "oklch(39% 0.095 152.535)",
  "green-950": "oklch(26% 0.065 152.934)",
  "purple-50": "oklch(97% 0.014 308.299)",
  "purple-100": "oklch(94% 0.033 307.174)",
  "purple-200": "oklch(90% 0.063 306.703)",
  "purple-300": "oklch(82% 0.119 306.383)",
  "purple-400": "oklch(71% 0.203 305.504)",
  "purple-500": "oklch(62% 0.265 303.9)",
  "purple-600": "oklch(55% 0.288 302.321)",
  "purple-700": "oklch(49% 0.265 301.924)",
  "purple-800": "oklch(43% 0.218 303.724)",
  "purple-900": "oklch(38% 0.176 304.987)",
  "purple-950": "oklch(29% 0.149 302.717)",
  "fuchsia-50": "oklch(97% 0.017 320.058)",
  "fuchsia-100": "oklch(95% 0.037 318.852)",
  "fuchsia-200": "oklch(90% 0.076 319.62)",
  "fuchsia-300": "oklch(83% 0.145 321.434)",
  "fuchsia-400": "oklch(74% 0.238 322.16)",
  "fuchsia-500": "oklch(66% 0.295 322.15)",
  "fuchsia-600": "oklch(59% 0.293 322.896)",
  "fuchsia-700": "oklch(51% 0.253 323.949)",
  "fuchsia-800": "oklch(45% 0.211 324.591)",
  "fuchsia-900": "oklch(40% 0.17 325.612)",
  "fuchsia-950": "oklch(29% 0.136 325.661)",
  "pink-50": "oklch(97% 0.014 343.198)",
  "pink-100": "oklch(94% 0.028 342.258)",
  "pink-200": "oklch(89% 0.061 343.231)",
  "pink-300": "oklch(82% 0.12 346.018)",
  "pink-400": "oklch(71% 0.202 349.761)",
  "pink-500": "oklch(65% 0.241 354.308)",
  "pink-600": "oklch(59% 0.249 0.584)",
  "pink-700": "oklch(52% 0.223 3.958)",
  "pink-800": "oklch(45% 0.187 3.815)",
  "pink-900": "oklch(40% 0.153 2.432)",
  "pink-950": "oklch(28% 0.109 3.907)",
  "rose-50": "oklch(96% 0.015 12.422)",
  "rose-100": "oklch(94% 0.03 12.58)",
  "rose-200": "oklch(89% 0.058 10.001)",
  "rose-300": "oklch(81% 0.117 11.638)",
  "rose-400": "oklch(71% 0.194 13.428)",
  "rose-500": "oklch(64% 0.246 16.439)",
  "rose-600": "oklch(58% 0.253 17.585)",
  "rose-700": "oklch(51% 0.222 16.935)",
  "rose-800": "oklch(45% 0.188 13.697)",
  "rose-900": "oklch(41% 0.159 10.272)",
  "rose-950": "oklch(27% 0.105 12.094)",
  white: "oklch(100% 0 0)",
  black: "oklch(0% 0 0)",
};

export const COLOR_PAIRS = [
  ["--color-base-100", "--color-base-content"],
  ["--color-base-200", "--color-base-content"],
  ["--color-base-300", "--color-base-content"],
  ["--color-primary", "--color-primary-content"],
  ["--color-secondary", "--color-secondary-content"],
  ["--color-accent", "--color-accent-content"],
  ["--color-neutral", "--color-neutral-content"],
  ["--color-info", "--color-info-content"],
  ["--color-success", "--color-success-content"],
  ["--color-warning", "--color-warning-content"],
  ["--color-error", "--color-error-content"],
];

export const COLOR_GROUPS = [
  {
    name: "base",
    colors: [
      "--color-base-100",
      "--color-base-200",
      "--color-base-300",
      "--color-base-content",
    ],
  },
  { name: "primary", colors: ["--color-primary", "--color-primary-content"] },
  {
    name: "secondary",
    colors: ["--color-secondary", "--color-secondary-content"],
  },
  { name: "accent", colors: ["--color-accent", "--color-accent-content"] },
  { name: "neutral", colors: ["--color-neutral", "--color-neutral-content"] },
  { name: "info", colors: ["--color-info", "--color-info-content"] },
  { name: "success", colors: ["--color-success", "--color-success-content"] },
  { name: "warning", colors: ["--color-warning", "--color-warning-content"] },
  { name: "error", colors: ["--color-error", "--color-error-content"] },
];

export interface Theme {
  name: string;
  [key: string]: string;
}

export const generateRandomTheme = (): Theme =>
  randomizeThemeColors(TAILWIND_COLORS, COLOR_PAIRS);

export const updateThemeColor = (
  theme: Theme,
  colorKey: string,
  colorValue: string
): Theme => {
  // Convert HEX to OKLCH if needed
  const oklchColor = colorValue.startsWith("#")
    ? hexToOklch(colorValue)
    : colorValue;
  const newTheme = { ...theme, [colorKey]: oklchColor };

  if (!colorKey.includes("-content")) {
    const contentKey = colorKey + "-content";
    newTheme[contentKey] = generateContrastColor(oklchColor);
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

export const hexToOklch = (hex: string): string => {
  try {
    const oklchColor = converter("oklch")(hex);
    if (!oklchColor) return "oklch(50% 0.1 0)";

    const l = Math.round(oklchColor.l * 100);
    const c = parseFloat(oklchColor.c?.toFixed(3) || "0");
    const h = Math.round(oklchColor.h || 0);

    return `oklch(${l}% ${c} ${h})`;
  } catch (error) {
    return "oklch(50% 0.1 0)";
  }
};

export const oklchToHex = (oklch: string): string => {
  try {
    const match = oklch.match(/oklch\(([^%]+)%?\s+([^\s]+)\s+([^)]+)\)/);
    if (!match) return "#ffffff";

    const oklchColor = {
      mode: "oklch" as const,
      l: parseFloat(match[1]) / 100,
      c: parseFloat(match[2]),
      h: parseFloat(match[3]),
    };

    const hexColor = formatHex(oklchColor);
    return hexColor || "#ffffff";
  } catch (error) {
    return "#ffffff";
  }
};

export const MATERIAL_COLORS = {
  "red-50": "#FFEBEE",
  "red-100": "#FFCDD2",
  "red-200": "#EF9A9A",
  "red-300": "#E57373",
  "red-400": "#EF5350",
  "red-500": "#F44336",
  "red-600": "#E53935",
  "red-700": "#D32F2F",
  "red-800": "#C62828",
  "red-900": "#B71C1C",
  "pink-50": "#FCE4EC",
  "pink-100": "#F8BBD0",
  "pink-200": "#F48FB1",
  "pink-300": "#F06292",
  "pink-400": "#EC407A",
  "pink-500": "#E91E63",
  "pink-600": "#D81B60",
  "pink-700": "#C2185B",
  "pink-800": "#AD1457",
  "pink-900": "#880E4F",
  "purple-50": "#F3E5F5",
  "purple-100": "#E1BEE7",
  "purple-200": "#CE93D8",
  "purple-300": "#BA68C8",
  "purple-400": "#AB47BC",
  "purple-500": "#9C27B0",
  "purple-600": "#8E24AA",
  "purple-700": "#7B1FA2",
  "purple-800": "#6A1B9A",
  "purple-900": "#4A148C",
  "deep-purple-50": "#EDE7F6",
  "deep-purple-100": "#D1C4E9",
  "deep-purple-200": "#B39DDB",
  "deep-purple-300": "#9575CD",
  "deep-purple-400": "#7E57C2",
  "deep-purple-500": "#673AB7",
  "deep-purple-600": "#5E35B1",
  "deep-purple-700": "#512DA8",
  "deep-purple-800": "#4527A0",
  "deep-purple-900": "#311B92",
  "indigo-50": "#E8EAF6",
  "indigo-100": "#C5CAE9",
  "indigo-200": "#9FA8DA",
  "indigo-300": "#7986CB",
  "indigo-400": "#5C6BC0",
  "indigo-500": "#3F51B5",
  "indigo-600": "#3949AB",
  "indigo-700": "#303F9F",
  "indigo-800": "#283593",
  "indigo-900": "#1A237E",
  "blue-50": "#E3F2FD",
  "blue-100": "#BBDEFB",
  "blue-200": "#90CAF9",
  "blue-300": "#64B5F6",
  "blue-400": "#42A5F5",
  "blue-500": "#2196F3",
  "blue-600": "#1E88E5",
  "blue-700": "#1976D2",
  "blue-800": "#1565C0",
  "blue-900": "#0D47A1",
  "light-blue-50": "#E1F5FE",
  "light-blue-100": "#B3E5FC",
  "light-blue-200": "#81D4FA",
  "light-blue-300": "#4FC3F7",
  "light-blue-400": "#29B6F6",
  "light-blue-500": "#03A9F4",
  "light-blue-600": "#039BE5",
  "light-blue-700": "#0288D1",
  "light-blue-800": "#0277BD",
  "light-blue-900": "#01579B",
  "cyan-50": "#E0F7FA",
  "cyan-100": "#B2EBF2",
  "cyan-200": "#80DEEA",
  "cyan-300": "#4DD0E1",
  "cyan-400": "#26C6DA",
  "cyan-500": "#00BCD4",
  "cyan-600": "#00ACC1",
  "cyan-700": "#0097A7",
  "cyan-800": "#00838F",
  "cyan-900": "#006064",
  "teal-50": "#E0F2F1",
  "teal-100": "#B2DFDB",
  "teal-200": "#80CBC4",
  "teal-300": "#4DB6AC",
  "teal-400": "#26A69A",
  "teal-500": "#009688",
  "teal-600": "#00897B",
  "teal-700": "#00796B",
  "teal-800": "#00695C",
  "teal-900": "#004D40",
  "green-50": "#E8F5E9",
  "green-100": "#C8E6C9",
  "green-200": "#A5D6A7",
  "green-300": "#81C784",
  "green-400": "#66BB6A",
  "green-500": "#4CAF50",
  "green-600": "#43A047",
  "green-700": "#388E3C",
  "green-800": "#2E7D32",
  "green-900": "#1B5E20",
  "light-green-50": "#F1F8E9",
  "light-green-100": "#DCEDC8",
  "light-green-200": "#C5E1A5",
  "light-green-300": "#AED581",
  "light-green-400": "#9CCC65",
  "light-green-500": "#8BC34A",
  "light-green-600": "#7CB342",
  "light-green-700": "#689F38",
  "light-green-800": "#558B2F",
  "light-green-900": "#33691E",
  "lime-50": "#F9FBE7",
  "lime-100": "#F0F4C3",
  "lime-200": "#E6EE9C",
  "lime-300": "#DCE775",
  "lime-400": "#D4E157",
  "lime-500": "#CDDC39",
  "lime-600": "#C0CA33",
  "lime-700": "#AFB42B",
  "lime-800": "#9E9D24",
  "lime-900": "#827717",
  "yellow-50": "#FFFDE7",
  "yellow-100": "#FFF9C4",
  "yellow-200": "#FFF59D",
  "yellow-300": "#FFF176",
  "yellow-400": "#FFEE58",
  "yellow-500": "#FFEB3B",
  "yellow-600": "#FDD835",
  "yellow-700": "#FBC02D",
  "yellow-800": "#F9A825",
  "yellow-900": "#F57F17",
  "amber-50": "#FFF8E1",
  "amber-100": "#FFECB3",
  "amber-200": "#FFE082",
  "amber-300": "#FFD54F",
  "amber-400": "#FFCA28",
  "amber-500": "#FFC107",
  "amber-600": "#FFB300",
  "amber-700": "#FFA000",
  "amber-800": "#FF8F00",
  "amber-900": "#FF6F00",
  "orange-50": "#FFF3E0",
  "orange-100": "#FFE0B2",
  "orange-200": "#FFCC80",
  "orange-300": "#FFB74D",
  "orange-400": "#FFA726",
  "orange-500": "#FF9800",
  "orange-600": "#FB8C00",
  "orange-700": "#F57C00",
  "orange-800": "#EF6C00",
  "orange-900": "#E65100",
  "deep-orange-50": "#FBE9E7",
  "deep-orange-100": "#FFCCBC",
  "deep-orange-200": "#FFAB91",
  "deep-orange-300": "#FF8A65",
  "deep-orange-400": "#FF7043",
  "deep-orange-500": "#FF5722",
  "deep-orange-600": "#F4511E",
  "deep-orange-700": "#E64A19",
  "deep-orange-800": "#D84315",
  "deep-orange-900": "#BF360C",
  "brown-50": "#EFEBE9",
  "brown-100": "#D7CCC8",
  "brown-200": "#BCAAA4",
  "brown-300": "#A1887F",
  "brown-400": "#8D6E63",
  "brown-500": "#795548",
  "brown-600": "#6D4C41",
  "brown-700": "#5D4037",
  "brown-800": "#4E342E",
  "brown-900": "#3E2723",
  "gray-50": "#FAFAFA",
  "gray-100": "#F5F5F5",
  "gray-200": "#EEEEEE",
  "gray-300": "#E0E0E0",
  "gray-400": "#BDBDBD",
  "gray-500": "#9E9E9E",
  "gray-600": "#757575",
  "gray-700": "#616161",
  "gray-800": "#424242",
  "gray-900": "#212121",
  "blue-gray-50": "#ECEFF1",
  "blue-gray-100": "#CFD8DC",
  "blue-gray-200": "#B0BEC5",
  "blue-gray-300": "#90A4AE",
  "blue-gray-400": "#78909C",
  "blue-gray-500": "#607D8B",
  "blue-gray-600": "#546E7A",
  "blue-gray-700": "#455A64",
  "blue-gray-800": "#37474F",
  "blue-gray-900": "#263238",
};
