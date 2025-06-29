/**
 * Main theme generation logic - improved with LCH color science
 * Maintains same API but uses chroma.js and scientific color harmony
 */

import {
  Theme,
  ThemeGenerationOptions,
  ThemeType,
  ColorPalette,
} from "../types/theme";
import {
  COLOR_PAIRS,
  RADIUS_VALUES,
  BORDER_VALUES,
  THEME_PROPERTY_VALUES,
} from "../colors/palettes";
import { generateContrastColor } from "../utils/theme/contrastCalculation";
import { createOklchColor } from "../utils/theme/colorConversion";
import {
  generateSemanticHues,
  generateBaseColors,
  selectSemanticColor,
  selectBrandColor,
  generateLCHColor,
  // Keep legacy functions for compatibility
  selectRandomColor,
  findExistingColorFamily,
} from "../utils/theme/colorSelection";

/**
 * Generate a random theme using LCH color science instead of palette selection
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

  // Add theme type information after determining it
  newColors._themeType = isDarkTheme ? "dark" : "light";

  // SCIENTIFIC COLOR GENERATION (new approach based on articles)

  // 1. Generate primary hue - this drives all color harmony
  const primaryHue = (options as any)._primaryHue || Math.random() * 360;

  // 2. Generate semantic hues using proper color theory
  const semanticHues = generateSemanticHues(primaryHue);

  // 3. Generate base colors using perceptually uniform lightness
  const baseColors = generateBaseColors(primaryHue, isDarkTheme);

  // 4. Apply scientific color generation to theme structure
  for (const {
    background: backgroundColorKey,
    content: contentColorKey,
  } of COLOR_PAIRS) {
    if (!newColors[backgroundColorKey]) {
      let selectedColor: string;

      // Handle base colors with perceptually uniform scales
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
          selectedColor = baseColors.base100; // fallback
        }
      }
      // Handle semantic colors using color harmony
      else if (backgroundColorKey === "--color-info") {
        selectedColor = selectSemanticColor("info", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-success") {
        selectedColor = selectSemanticColor("success", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-warning") {
        selectedColor = selectSemanticColor("warning", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-error") {
        selectedColor = selectSemanticColor("error", primaryHue, isDarkTheme);
      }
      // Handle brand colors using color harmony
      else if (backgroundColorKey === "--color-primary") {
        selectedColor = selectBrandColor("primary", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-secondary") {
        selectedColor = selectBrandColor("secondary", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-accent") {
        selectedColor = selectBrandColor("accent", primaryHue, isDarkTheme);
      } else if (backgroundColorKey === "--color-neutral") {
        // FIXED: Neutral color with proper lightness
        const neutralLightness = isDarkTheme ? 50 : 60;
        selectedColor = createOklchColor(neutralLightness, 0.01, primaryHue);
      } else {
        // Fallback: select from palette (legacy compatibility)
        selectedColor = selectRandomColor(palette);
      }

      newColors[backgroundColorKey] = selectedColor;
    }

    // Generate content color using improved contrast logic
    if (!newColors[contentColorKey]) {
      // Special handling for base-content: it should contrast with base-100
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

  // Add additional theme properties (unchanged)
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
 * Generate multiple theme variations (improved with color harmony)
 */
export function generateThemeVariations(
  palette: ColorPalette,
  count = 5,
  options: ThemeGenerationOptions = {}
): Theme[] {
  const themes: Theme[] = [];

  // Generate a base hue and create harmonious variations
  const baseHue = Math.random() * 360;

  for (let i = 0; i < count; i++) {
    // Create harmonious hue shifts
    const hueShift = (360 / count) * i;
    const variantHue = (baseHue + hueShift) % 360;

    // Force the same theme type for variations if specified
    const variantOptions = {
      ...options,
      _primaryHue: variantHue, // Internal parameter for hue control
    };

    themes.push(generateRandomTheme(palette, variantOptions));
  }

  return themes;
}

/**
 * Generate light/dark theme pair with shared color harmony
 */
export function generateThemePair(
  palette: ColorPalette,
  baseColorFamily?: string
): { light: Theme; dark: Theme } {
  // Generate a primary hue for both themes
  const primaryHue = Math.random() * 360;

  return {
    light: generateRandomTheme(palette, {
      forceLightTheme: true,
      _primaryHue: primaryHue,
    }),
    dark: generateRandomTheme(palette, {
      forceDarkTheme: true,
      _primaryHue: primaryHue,
    }),
  };
}
