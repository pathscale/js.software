/**
 * Main theme generation logic
 */

import {
  Theme,
  ThemeGenerationOptions,
  ThemeType,
  ColorPalette,
} from "../types/theme";
import {
  COLOR_PAIRS,
  DEFAULT_BRAND_COLOR_WEIGHTS,
  SHADE_PREFERENCES,
  BASE_COLOR_FAMILIES,
  RADIUS_VALUES,
  BORDER_VALUES,
  THEME_PROPERTY_VALUES,
} from "../colors/palettes";
import { generateContrastColor } from "../utils/theme/contrastCalculation";
import {
  selectRandomColor,
  getRandomWeightedArray,
  selectColorFromFamily,
  selectAccessibleColorPair,
  findExistingColorFamily,
  selectBrandColor,
  selectSemanticColor,
  generateBaseColors,
  extractColorFamily,
} from "../utils/theme/colorSelection";

/**
 * Generate a random theme with Material Design colors
 */
export function generateRandomTheme(
  palette: ColorPalette,
  options: ThemeGenerationOptions = {}
): Theme {
  const randomFrom = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  // Initialize theme colors object
  const newColors: Record<string, string> = {
    name: `theme-${Date.now()}`,
  };

  // Determine theme type (light/dark)
  let isDarkTheme: boolean;
  if (options.forceDarkTheme) {
    isDarkTheme = true;
  } else if (options.forceLightTheme) {
    isDarkTheme = false;
  } else {
    isDarkTheme = Math.random() > 0.5;
  }

  const themeType: ThemeType = isDarkTheme ? "dark" : "light";
  const shadePrefs = SHADE_PREFERENCES[themeType];

  // Generate colors using the color pairs approach
  for (const {
    background: backgroundColorKey,
    content: contentColorKey,
  } of COLOR_PAIRS) {
    if (!newColors[backgroundColorKey]) {
      let selectedColor: string;

      // Handle base colors specially - they should be from the same family
      if (
        backgroundColorKey.startsWith("--color-base") &&
        !backgroundColorKey.endsWith("-content")
      ) {
        // Get or create the base color family
        let baseColorName =
          options.baseColorFamily ||
          findExistingColorFamily(newColors, palette);

        // If no base color family found, select one
        if (!baseColorName) {
          const baseColorNames = getRandomWeightedArray(
            BASE_COLOR_FAMILIES as string[][],
            0.3
          ); // 70% chance of neutral colors
          baseColorName =
            baseColorNames[Math.floor(Math.random() * baseColorNames.length)];
        }

        // Generate the appropriate base color based on theme and position
        const baseColors = generateBaseColors(
          palette,
          baseColorName,
          isDarkTheme
        );

        if (backgroundColorKey === "--color-base-100") {
          selectedColor = baseColors.base100;
        } else if (backgroundColorKey === "--color-base-200") {
          selectedColor = baseColors.base200;
        } else if (backgroundColorKey === "--color-base-300") {
          selectedColor = baseColors.base300;
        } else {
          selectedColor = baseColors.base100; // fallback
        }
      }
      // Handle semantic colors
      else if (backgroundColorKey === "--color-info") {
        selectedColor =
          selectAccessibleColorPair(palette, [...shadePrefs.semantic]) ||
          selectSemanticColor(palette, "info", [...shadePrefs.semantic]);
      } else if (backgroundColorKey === "--color-success") {
        selectedColor =
          selectAccessibleColorPair(palette, [...shadePrefs.semantic]) ||
          selectSemanticColor(palette, "success", [...shadePrefs.semantic]);
      } else if (backgroundColorKey === "--color-warning") {
        // Always use semantic color selection for warning (it has stricter logic)
        selectedColor = selectSemanticColor(
          palette,
          "warning",
          [...shadePrefs.semantic]
        );
      } else if (backgroundColorKey === "--color-error") {
        selectedColor =
          selectAccessibleColorPair(palette, [...shadePrefs.semantic]) ||
          selectSemanticColor(palette, "error", [...shadePrefs.semantic]);
      }
      // Handle brand colors (primary, secondary, accent, neutral)
      else if (
        backgroundColorKey.match(/^--color-(primary|secondary|accent|neutral)$/)
      ) {
        const brandShades = shadePrefs.brand;
        const brandColorWeights =
          options.brandColorWeights || DEFAULT_BRAND_COLOR_WEIGHTS;

        if (backgroundColorKey === "--color-neutral") {
          // Neutral should match base color family but in middle range
          const baseColorName =
            findExistingColorFamily(newColors, palette) || "gray";
          selectedColor = selectColorFromFamily(
            palette,
            [baseColorName],
            [...shadePrefs.neutral]
          );
        } else {
          selectedColor =
            selectAccessibleColorPair(palette, [...brandShades]) ||
            selectBrandColor(palette, brandColorWeights, [...brandShades]);
        }
      } else {
        // Fallback: select any random color
        selectedColor = selectRandomColor(palette);
      }

      newColors[backgroundColorKey] = selectedColor;
    }

    // Generate content color only if not already set
    if (!newColors[contentColorKey]) {
      // Special handling for base-content: it should contrast with base-100 (primary background)
      if (contentColorKey === "--color-base-content") {
        const base100Color =
          newColors["--color-base-100"] || newColors[backgroundColorKey];
        newColors[contentColorKey] = generateContrastColor(base100Color);
      } else {
        newColors[contentColorKey] = generateContrastColor(
          newColors[backgroundColorKey]
        );
      }
    }
  }

  // Add additional theme properties
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

/**
 * Generate multiple theme variations
 */
export function generateThemeVariations(
  palette: ColorPalette,
  count = 5,
  options: ThemeGenerationOptions = {}
): Theme[] {
  const themes: Theme[] = [];

  for (let i = 0; i < count; i++) {
    themes.push(generateRandomTheme(palette, options));
  }

  return themes;
}

/**
 * Generate light/dark theme pair
 */
export function generateThemePair(
  palette: ColorPalette,
  baseColorFamily?: string
): { light: Theme; dark: Theme } {
  const sharedOptions = { baseColorFamily };

  return {
    light: generateRandomTheme(palette, {
      ...sharedOptions,
      forceLightTheme: true,
    }),
    dark: generateRandomTheme(palette, {
      ...sharedOptions,
      forceDarkTheme: true,
    }),
  };
}
