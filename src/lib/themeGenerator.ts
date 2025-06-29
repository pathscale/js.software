import {
  Theme,
  ThemeGenerationOptions,
  ColorPalette,
  ShadeLevel,
} from "../types/theme";
import {
  COLOR_PAIRS,
  RADIUS_VALUES,
  BORDER_VALUES,
  THEME_PROPERTY_VALUES,
} from "../colors/palettes";
import { generateAccessibleTextColor } from "../utils/theme/contrastCalculation";
import { createOklchColor } from "../utils/theme/colorConversion";
import {
  generateSemanticHues,
  generateBaseColors,
  selectSemanticColor,
  selectBrandColor,
  selectColorFromFamily,
} from "../utils/theme/colorSelection";

export function generateRandomTheme(
  palette: ColorPalette,
  options: ThemeGenerationOptions = {}
): Theme {
  const randomFrom = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const newColors: Record<string, string> = {
    name: `theme-${Date.now()}`,
  };
  let isDarkTheme: boolean;
  if (options.forceDarkTheme) {
    isDarkTheme = true;
  } else if (options.forceLightTheme) {
    isDarkTheme = false;
  } else {
    isDarkTheme = Math.random() > 0.5;
  }

  newColors._themeType = isDarkTheme ? "dark" : "light";

  const primaryHue = (options as any)._primaryHue || Math.random() * 360;
  const semanticHues = generateSemanticHues(primaryHue);
  const baseColors = generateBaseColors(primaryHue, isDarkTheme);
  for (const {
    background: backgroundColorKey,
    content: contentColorKey,
  } of COLOR_PAIRS) {
    if (!newColors[backgroundColorKey]) {
      let selectedColor: string;

      if (
        backgroundColorKey.startsWith("--color-base") &&
        !backgroundColorKey.endsWith("-content")
      ) {
        if (backgroundColorKey === "--color-base-100") {
          selectedColor = baseColors.base100;
        } else if (backgroundColorKey === "--color-base-200") {
          selectedColor = baseColors.base200;
        } else if (backgroundColorKey === "--color-base-300") {
          selectedColor = baseColors.base300;
        } else {
          selectedColor = baseColors.base100;
        }
      } else if (backgroundColorKey === "--color-info") {
        selectedColor = selectSemanticColor("info", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-success") {
        selectedColor = selectSemanticColor("success", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-warning") {
        selectedColor = selectSemanticColor("warning", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-error") {
        selectedColor = selectSemanticColor("error", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-primary") {
        selectedColor = selectBrandColor("primary", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-secondary") {
        selectedColor = selectBrandColor("secondary", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-accent") {
        selectedColor = selectBrandColor("accent", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-neutral") {
        const neutralLightness = isDarkTheme ? 50 : 60;
        selectedColor = createOklchColor(neutralLightness, 0.01, primaryHue);
      } else {
        const colorFamilies = new Set(
          Object.keys(palette).map(key => {
            const parts = key.split("-");
            return parts.length > 1 ? parts[0] : key;
          })
        );
        const colorNames = Array.from(colorFamilies);
        const shades: ShadeLevel[] = [
          "50",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ];
        selectedColor = selectColorFromFamily(palette, colorNames, shades);
      }

      newColors[backgroundColorKey] = selectedColor;
    }

    if (!newColors[contentColorKey]) {
      if (contentColorKey === "--color-base-content") {
        const base100Color =
          newColors["--color-base-100"] || newColors[backgroundColorKey];
        newColors[contentColorKey] = generateAccessibleTextColor(base100Color);
      } else {
        newColors[contentColorKey] = generateAccessibleTextColor(
          newColors[backgroundColorKey]
        );
      }
    }
  }

  newColors["--radius-selector"] = randomFrom([...RADIUS_VALUES]);
  newColors["--radius-field"] = randomFrom([...RADIUS_VALUES]);
  newColors["--radius-box"] = randomFrom([...RADIUS_VALUES]);
  newColors["--size-selector"] = randomFrom([...THEME_PROPERTY_VALUES.size]);
  newColors["--size-field"] = randomFrom([...THEME_PROPERTY_VALUES.size]);
  newColors["--border"] = randomFrom([...BORDER_VALUES]);
  newColors["--depth"] = randomFrom([...THEME_PROPERTY_VALUES.depth]);
  newColors["--noise"] = randomFrom([...THEME_PROPERTY_VALUES.noise]);

  return newColors as Theme;
}
