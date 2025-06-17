import { createSignal, For, Show } from "solid-js";
import Preview from "../components/Preview";
import { randomizeThemeColors } from "../lib/themeGeneratorRandomizer.js";

const TAILWIND_COLORS = {
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

// Exact copy of DaisyUI's color pairs
const colorPairs = [
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

const COLOR_GROUPS = [
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

export default function Theming() {
  // Using DaisyUI's exact randomizeThemeColors function
  const generateRandomTheme = () =>
    randomizeThemeColors(TAILWIND_COLORS, colorPairs);

  const [currentTheme, setCurrentTheme] = createSignal(generateRandomTheme());
  const [customThemes, setCustomThemes] = createSignal([generateRandomTheme()]);
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
  const [dockActiveItem] = createSignal("editor");

  const randomizeTheme = () => {
    const newTheme = generateRandomTheme();
    setCurrentTheme(newTheme);

    // Update the theme in the custom themes list too
    setCustomThemes((prev) =>
      prev.map((theme) =>
        theme.name === currentTheme().name ? newTheme : theme
      )
    );
  };

  const createNewTheme = () => {
    const newTheme = generateRandomTheme();
    setCustomThemes((prev) => [newTheme, ...prev]);
    setCurrentTheme(newTheme);
  };

  const loadTheme = (theme: any) => {
    setCurrentTheme(theme);
  };

  const removeTheme = (themeToRemove: any) => {
    setCustomThemes((prev) =>
      prev.filter((t) => t.name !== themeToRemove.name)
    );
    if (currentTheme().name === themeToRemove.name) {
      const remaining = customThemes().filter(
        (t) => t.name !== themeToRemove.name
      );
      setCurrentTheme(
        remaining.length > 0 ? remaining[0] : generateRandomTheme()
      );
    }
  };

  const openColorPicker = (colorKey: string) => {
    setSelectedColorKey(colorKey);
    setShowColorPicker(true);
  };

  const selectColor = (colorValue: string) => {
    const key = selectedColorKey();
    if (key) {
      setCurrentTheme((prev) => {
        const newTheme = { ...prev, [key]: colorValue };

        // If we're setting a main color, automatically update its content color
        if (!key.includes("-content")) {
          const contentKey = key + "-content";
          // Use DaisyUI's exact contrast generation
          const {
            generateContrastColor,
          } = require("../lib/themeGeneratorRandomizer.js");
          newTheme[contentKey] = generateContrastColor(colorValue);
        }

        return newTheme;
      });

      // Also update the custom themes list
      setCustomThemes((prev) =>
        prev.map((theme) =>
          theme.name === currentTheme().name
            ? {
                ...theme,
                [key]: colorValue,
                ...(key.includes("-content")
                  ? {}
                  : {
                      [key + "-content"]:
                        require("../lib/themeGeneratorRandomizer.js").generateContrastColor(
                          colorValue
                        ),
                    }),
              }
            : theme
        )
      );
    }
    setShowColorPicker(false);
  };

  return (
    <div class="relative grid md:grid-cols-[14rem_17rem_1fr]">
      {/* Themes List - Left Column */}
      <div
        class="border-base-200 bg-base-100 w-full shrink-0 overflow-x-hidden border-e border-dashed p-4 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-scroll"
        classList={{ "max-md:hidden": dockActiveItem() !== "themes" }}
      >
        <div class="mb-4 flex items-center justify-between gap-2">
          <h2 class="font-title ms-2 font-semibold">Themes</h2>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-square btn-sm m-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 border-base-300 rounded-box z-1 w-48 border p-2 shadow-xl"
            >
              <li class="menu-title">Options</li>
              <li>
                <button class="text-xs" onClick={() => setCustomThemes([])}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="text-error size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Remove my themes
                </button>
              </li>
            </ul>
          </div>
        </div>

        <ul class="menu w-full min-w-40 p-0">
          <li>
            <button
              class="btn group theme-generator-btn bg-auto px-2"
              onClick={createNewTheme}
            >
              <svg
                class="size-5 origin-[40%_60%] [transition:rotate_.2s_ease] group-hover:-rotate-12"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1005 8.1005L24.3431 12.3431M30 4V10V4ZM39.8995 8.1005L35.6569 12.3431L39.8995 8.1005ZM44 18H38H44ZM39.8995 27.8995L35.6569 23.6569L39.8995 27.8995ZM30 32V26V32ZM20.1005 27.8995L24.3431 23.6569L20.1005 27.8995ZM16 18H22H16Z"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="butt"
                  stroke-linejoin="bevel"
                ></path>
                <path
                  d="M29.5856 18.4143L5.54395 42.4559"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="butt"
                  stroke-linejoin="bevel"
                ></path>
              </svg>
              <span class="font-normal">Add new theme</span>
            </button>
          </li>
          <li class="menu-title mt-6">My themes</li>
          <For each={customThemes()}>
            {(themeItem) => (
              <li>
                <div
                  class="flex items-center justify-between cursor-pointer hover:bg-base-200 rounded p-2"
                  classList={{
                    "bg-base-200": currentTheme().name === themeItem.name,
                  }}
                  onClick={() => loadTheme(themeItem)}
                >
                  <span class="flex-1 text-left truncate">
                    {themeItem.name}
                  </span>
                  <button
                    class="btn btn-ghost btn-xs text-error"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTheme(themeItem);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>

      {/* Editor - Middle Column */}
      <div
        class="bg-base-100 flex w-full shrink-0 flex-col items-center gap-4 p-6 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:items-start md:overflow-y-scroll lg:items-stretch"
        classList={{ "max-md:hidden": dockActiveItem() !== "editor" }}
      >
        {/* Theme Name Input */}
        <label class="input input-ghost input-sm flex w-full shrink-0 items-center gap-2 font-semibold">
          <span class="shrink-0 text-xs opacity-60 select-none">Name</span>
          <input
            class="w-full shrink"
            type="text"
            value={currentTheme().name}
            onInput={(e) => {
              const newName = e.currentTarget.value;
              const oldName = currentTheme().name;
              setCurrentTheme((prev) => ({ ...prev, name: newName }));
              setCustomThemes((prev) =>
                prev.map((theme) =>
                  theme.name === oldName ? { ...theme, name: newName } : theme
                )
              );
            }}
            placeholder="mytheme"
          />
          <svg
            class="justify-self-end opacity-40"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>

        {/* Action Buttons */}
        <div class="grid w-full grid-cols-2 gap-2">
          <button class="btn group" onClick={randomizeTheme}>
            <svg
              class="shrink-0 group-active:scale-95"
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M192,28H64A36.04061,36.04061,0,0,0,28,64V192a36.04061,36.04061,0,0,0,36,36H192a36.04061,36.04061,0,0,0,36-36V64A36.04061,36.04061,0,0,0,192,28Zm12,164a12.01312,12.01312,0,0,1-12,12H64a12.01312,12.01312,0,0,1-12-12V64A12.01312,12.01312,0,0,1,64,52H192a12.01312,12.01312,0,0,1,12,12ZM104,88A16,16,0,1,1,88,72,16.01833,16.01833,0,0,1,104,88Zm80,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,184,88Zm-80,80a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,104,168Zm80,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,184,168Zm-40-40a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,144,128Z" />
            </svg>
            Random
          </button>
          <button class="btn btn-neutral">
            <svg
              class="shrink-0"
              fill="currentColor"
              width="16px"
              height="16px"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M54.79785,119.48535A34.95033,34.95033,0,0,1,49.05078,128a34.95033,34.95033,0,0,1,5.74707,8.51465C60,147.24414,60,159.8291,60,172c0,25.93652,1.84424,32,20,32a12,12,0,0,1,0,24c-19.14453,0-32.19775-6.90234-38.79785-20.51465C36,196.75586,36,184.1709,36,172c0-25.93652-1.84424-32-20-32a12,12,0,0,1,0-24c18.15576,0,20-6.06348,20-32,0-12.1709,0-24.75586,5.20215-35.48535C47.80225,34.90234,60.85547,28,80,28a12,12,0,0,1,0,24c-18.15576,0-20,6.06348-20,32C60,96.1709,60,108.75586,54.79785,119.48535ZM240,116c-18.15576,0-20-6.06348-20-32,0-12.1709,0-24.75586-5.20215-35.48535C208.19775,34.90234,195.14453,28,176,28a12,12,0,0,0,0,24c18.15576,0,20,6.06348,20,32,0,12.1709,0,24.75586,5.20215,35.48535A34.95033,34.95033,0,0,0,206.94922,128a34.95033,34.95033,0,0,0-5.74707,8.51465C196,147.24414,196,159.8291,196,172c0,25.93652-1.84424,32-20,32a12,12,0,0,0,0,24c19.14453,0,32.19775-6.90234,38.79785-20.51465C220,196.75586,220,184.1709,220,172c0-25.93652,1.84424-32,20-32a12,12,0,0,0,0-24Z" />
            </svg>
            CSS
          </button>
        </div>

        {/* Change Colors Section */}
        <h3 class="divider divider-start text-xs">
          <span class="flex gap-1.5">
            <svg
              class="opacity-40"
              width="16"
              height="16"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M37 37C39.2091 37 41 35.2091 41 33C41 31.5272 39.6667 29.5272 37 27C34.3333 29.5272 33 31.5272 33 33C33 35.2091 34.7909 37 37 37Z"
                fill="currentColor"
              />
              <path
                d="M20.8535 5.50439L24.389 9.03993"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
              />
              <path
                d="M23.6818 8.33281L8.12549 23.8892L19.4392 35.2029L34.9955 19.6465L23.6818 8.33281Z"
                stroke="currentColor"
                stroke-width="4"
                stroke-linejoin="round"
              />
              <path
                d="M12 20.0732L28.961 25.6496"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
            Change Colors
          </span>
        </h3>
        <div class="grid w-fit grid-cols-4 gap-4">
          <For each={COLOR_GROUPS}>
            {(group) => (
              <div
                class="flex flex-col gap-1"
                classList={{
                  "col-span-4": group.name === "base",
                  "col-span-2": group.name !== "base",
                }}
              >
                <div class="flex gap-4">
                  <For each={group.colors}>
                    {(colorKey) => {
                      const isContentColor = colorKey.endsWith("-content");

                      // FUNCIONES REACTIVAS - se recalculan cuando currentTheme() cambia
                      const backgroundColor = () => {
                        if (group.name === "base") {
                          if (isContentColor) {
                            // base-content box: fondo base-100
                            return (
                              currentTheme()["--color-base-100"] ||
                              "oklch(100% 0 0)"
                            );
                          } else {
                            // base-100, base-200, base-300: fondo propio
                            return (
                              currentTheme()[colorKey] || "oklch(50% 0.1 180)"
                            );
                          }
                        } else {
                          // Para otros colores (primary, secondary, etc.)
                          const mainColorKey = isContentColor
                            ? colorKey.replace("-content", "")
                            : colorKey;
                          return (
                            currentTheme()[mainColorKey] || "oklch(50% 0.1 180)"
                          );
                        }
                      };

                      const textColor = () => {
                        if (group.name === "base") {
                          return (
                            currentTheme()["--color-base-content"] ||
                            "oklch(0% 0 0)"
                          );
                        } else {
                          const mainColorKey = isContentColor
                            ? colorKey.replace("-content", "")
                            : colorKey;
                          const contentColorKey = mainColorKey + "-content";
                          return (
                            currentTheme()[contentColorKey] || "oklch(100% 0 0)"
                          );
                        }
                      };

                      const getLabel = (key: string) => {
                        if (key.endsWith("-content")) {
                          return "A";
                        }
                        if (/\d/.test(key)) {
                          return key.replace(`--color-${group.name}-`, "");
                        }
                        return "";
                      };
                      const label = getLabel(colorKey);

                      return (
                        <button
                          onClick={() => openColorPicker(colorKey)}
                          class="w-8 h-8 rounded border border-gray-300 hover:border-gray-400 transition-colors relative group flex items-center justify-center"
                          style={{ background: backgroundColor() }}
                          title={colorKey}
                        >
                          <div
                            class="absolute inset-0 opacity-0 group-hover:opacity-10 rounded transition-opacity"
                            style="background-color: rgba(0,0,0,0.1)"
                          />
                          <span
                            class="text-xs font-semibold relative z-10"
                            style={{ color: textColor() }}
                          >
                            {label}
                          </span>
                        </button>
                      );
                    }}
                  </For>
                </div>
                <div class="text-base-content/60 text-xs">{group.name}</div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Preview - Right Column */}
      <div class="overflow-x-hidden">
        <div class="border-base-300 overflow-hidden border-s border-t md:rounded-ss-xl">
          <div
            style={`${Object.entries(currentTheme())
              .filter(([key]) => key.startsWith("--color-"))
              .map(([key, value]) => `${key}:${value}`)
              .join(";")}`}
          >
            <Preview currentTheme={currentTheme()} />
          </div>
        </div>
      </div>

      <Show when={showColorPicker()}>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowColorPicker(false)}
        >
          <div
            class="bg-base-100 border rounded-lg p-6 max-w-lg w-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">Select Color</h3>
              <button
                onClick={() => setShowColorPicker(false)}
                class="btn btn-ghost btn-sm"
              >
                ✕
              </button>
            </div>
            <div class="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
              <For each={Object.entries(TAILWIND_COLORS)}>
                {([colorName, colorValue]) => (
                  <button
                    onClick={() => selectColor(colorValue)}
                    class="w-8 h-8 rounded border border-gray-300 hover:border-gray-500 transition-colors relative group"
                    style={{ background: colorValue }}
                    title={`${colorName}: ${colorValue}`}
                  >
                    <div
                      class="absolute inset-0 opacity-0 group-hover:opacity-10 rounded transition-opacity"
                      style="background-color: rgba(0,0,0,0.1)"
                    />
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
