/**
 * ACCESSIBLE THEME GENERATION SYSTEM
 *
 * Implementation strictly following three key sources:
 * 1. Wildbit: "Accessible Palette: stop using HSL for color systems"
 *    https://www.wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems
 * 2. Chroma.js documentation: https://gka.github.io/chroma.js/
 * 3. AccessiblePalette.com tool methodology
 *
 * CORE IMPLEMENTATION PRINCIPLES:
 *
 * 1. OKLCH COLOR SPACE (Wildbit + Chroma.js)
 *    - chroma.oklch(lightness, chroma, hue) for perceptually uniform generation
 *    - OKLCH conversion for CSS compatibility
 *    - Abandons HSL completely per Wildbit recommendations
 *
 * 2. EXACT ACCESSIBLE PALETTE LIGHTNESS SCALE
 *    - Fixed scale: [98.2, 96.5, 94, 89.5, 77, 65, 49.5, 41, 28, 20]
 *    - Light themes: positions [0,1,2] = [98.2, 96.5, 94]
 *    - Dark themes: positions [8,7,6] = [28, 41, 49.5]
 *    - Semantic colors: position 7 (dark) / 5 (light) = [41, 65]
 *    - Brand colors: fixed positions per hierarchy (primary: 49.5/77, secondary: 41/89.5, accent: 28/65)
 *
 * 3. CONTROLLED CHROMA SYSTEM
 *    - getChromaForLightness() reduces chroma at extremes per Wildbit methodology
 *    - Base colors: chroma 15
 *    - Semantic colors: chroma 40
 *    - Brand colors: chroma 30-50 based on hierarchy
 *    - Hue-specific adjustments (yellows 0.8x, blues 1.1x)
 *
 * 4. MATHEMATICAL HUE RELATIONSHIPS
 *    - Semantic colors: precise 90°, 180°, 270° offsets from primary hue
 *    - Hue compensation prevents unnatural color shifts across lightness
 *    - No random variation - fixed mathematical relationships
 *
 * 5. ACCESSIBILITY VALIDATION
 *    - WCAG: 4.5:1 minimum contrast ratio
 *    - Automatic black/white content selection using the stronger contrast
 *
 * 6. MATERIAL DESIGN COLOR FOUNDATION
 *    - Random selection from 17 Material Design colors only
 *    - No warm/cool/neutral variations (not mentioned in sources)
 *    - LCh hue extraction preserves color relationships
 *
 * This system generates themes with consistent perceived lightness, mathematical
 * color harmony, and guaranteed accessibility compliance using scientific color
 * theory rather than HSL's perceptual limitations.
 */

import { createSignal } from "solid-js";
import { Button } from "@pathscale/ui";
import chroma from "chroma-js";
import Preview from "../components/Preview";
import {
  updateThemeColor,
  updateThemeProperty,
  oklchToHex,
  Theme,
  withGlassThemeDefaults,
  resetGlassTheme,
} from "../utils/themeUtils";
import { MATERIAL_COLORS } from "../lib/themeIndex";
import { generateRandomTheme as generateRandomThemeWithOptions } from "../lib/themeGenerator";
import ThemeEditor from "../components/theming/ThemeEditor";
import ThemeList from "../components/theming/ThemeList";
import ColorPickerPopover from "../components/theming/ColorPickerPopover";
import ThemeCSSModal from "../components/theming/ThemeCSSModal";
import { ContentContainer } from "../components/content/ContentContainer";
import {
  applyThemeToDocument,
  clearThemeEditorState,
  readThemeEditorState,
  writeThemeEditorState,
} from "../lib/themeEditorPersistence";
import { withThemeAliases } from "../lib/themeAliases";
import { createActionStatus } from "../components/showcase/ActionStatus";
import {
  accentOptions,
  artworkAccentOptions,
  applyThemeComposition,
  DEFAULT_SOFTNESS,
  DEFAULT_STRENGTH,
  DEFAULT_SURFACE,
  DEFAULT_TEXT_BRIGHTNESS,
  SOFTNESS_STOPS,
  STRENGTH_STOPS,
  surfaceColors,
  TEXT_BRIGHTNESS_STOPS,
} from "../lib/themeComposer";
import {
  selectBrandColor,
  selectSemanticColor,
} from "../utils/theme/colorSelection";

const withIdentity = (theme: Theme): Theme => ({
  ...theme,
  _id: theme._id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
});

const normalizeTheme = (theme: Theme): Theme =>
  withIdentity(withThemeAliases(withGlassThemeDefaults(theme)));

const randomItem = <T,>(values: readonly T[]): T =>
  values[Math.floor(Math.random() * values.length)];

const createComposedTheme = (): Theme => {
  const mode = Math.random() > 0.5 ? "dark" : "light";
  const seed = generateRandomThemeWithOptions(MATERIAL_COLORS, {
    forceDarkTheme: mode === "dark",
    forceLightTheme: mode === "light",
  });
  const composition = {
    surface: randomItem(surfaceColors(mode)),
    strength: randomItem(STRENGTH_STOPS),
    softness: randomItem(SOFTNESS_STOPS),
    textBrightness: randomItem(TEXT_BRIGHTNESS_STOPS),
  };
  let theme = applyThemeComposition(seed, composition);
  const primaryHue = chroma(composition.surface).oklch()[2] || 0;
  theme = updateThemeColor(
    theme,
    "--color-secondary",
    selectBrandColor("secondary", primaryHue, mode === "dark"),
  );
  for (const semantic of ["info", "success", "warning", "error"] as const) {
    theme = updateThemeColor(
      theme,
      `--color-${semantic}`,
      selectSemanticColor(semantic, primaryHue, mode === "dark"),
    );
  }
  const controlFriends = accentOptions(
    composition.surface,
    mode,
    composition.strength,
    composition.softness,
  );
  const artworkFriends = artworkAccentOptions(
    composition.surface,
    mode,
    composition.strength,
    composition.softness,
  );
  const primaryIndex = Math.floor(Math.random() * controlFriends.length);
  const accentIndex = (primaryIndex + 1 + Math.floor(Math.random() * (controlFriends.length - 1))) % controlFriends.length;
  theme = updateThemeColor(theme, "--color-primary", controlFriends[primaryIndex]);
  theme = updateThemeColor(theme, "--color-accent", artworkFriends[accentIndex]);
  theme._controlAccentIndex = `${primaryIndex}`;
  theme._artAccentIndex = `${accentIndex}`;
  return resetGlassTheme(theme);
};

const restoreThemeLibrary = (
  persisted: ReturnType<typeof readThemeEditorState>,
): { currentTheme: Theme; themes: Theme[] } => {
  if (!persisted) {
    const currentTheme = normalizeTheme({ ...createComposedTheme(), name: "Theme 1" });
    return { currentTheme, themes: [currentTheme] };
  }

  const currentTheme = normalizeTheme(persisted.currentTheme);
  let linkedCurrentTheme = false;
  const themes = persisted.themes.map((theme) => {
    const isCurrentTheme =
      !linkedCurrentTheme &&
      (theme._id === currentTheme._id ||
        (!persisted.currentTheme._id && theme.name === currentTheme.name));
    if (isCurrentTheme) {
      linkedCurrentTheme = true;
      return currentTheme;
    }
    return normalizeTheme(theme);
  });

  return { currentTheme, themes };
};

export default function Theming() {
  const persisted = readThemeEditorState();
  const restored = restoreThemeLibrary(persisted);
  const initialTheme = restored.currentTheme;
  const [currentTheme, setCurrentTheme] = createSignal<Theme>(initialTheme);
  const [customThemes, setCustomThemes] = createSignal<Theme[]>(restored.themes);
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
  const [pickerPosition, setPickerPosition] = createSignal({ x: 0, y: 0 });
  const [showCSSModal, setShowCSSModal] = createSignal(false);
  const [applyToWholeSite, setApplyToWholeSite] = createSignal(
    persisted?.applyToWholeSite || false,
  );
  const [rememberTheme, setRememberTheme] = createSignal(Boolean(persisted));
  const actionStatus = createActionStatus(
    persisted ? "Remembered theme restored" : "Theme editor ready",
  );

  // Detect initial theme type automatically
  const initialIsDark = (initialTheme as any)._themeType === "dark";
  const [themeOptions, setThemeOptions] = createSignal({
    isDefault: false,
    isPrefersDark: false,
    colorScheme: initialIsDark ? "dark" : ("light" as "light" | "dark"),
  });
  const [dockActiveItem, setDockActiveItem] = createSignal<"editor" | "preview">(
    "editor",
  );

  const identity = (theme: Theme) => theme._id || theme.name;

  const persist = (
    theme = currentTheme(),
    themes = customThemes(),
    apply = applyToWholeSite(),
  ) => {
    if (rememberTheme()) {
      writeThemeEditorState({ currentTheme: theme, themes, applyToWholeSite: apply });
    }
  };

  const commitTheme = (theme: Theme) => {
    const next = normalizeTheme(theme);
    setCurrentTheme(next);
    const themes = customThemes().map((saved) =>
      identity(saved) === identity(next) ? next : saved,
    );
    setCustomThemes(themes);
    if (applyToWholeSite()) applyThemeToDocument(next);
    persist(next, themes);
  };

  /**
   * RANDOM THEME GENERATION PROCESS
   *
   * Following Wildbit, Chroma.js, and AccessiblePalette.com principles:
   *
   * 1. MATERIAL COLOR SELECTION: Randomly picks 1 of 17 Material Design colors
   *    (pink, red, orange, yellow, green, blue, purple, etc.)
   *
   * 2. OKLCH HUE EXTRACTION: Uses chroma.js to extract perceptual hue
   *    from selected Material color (abandoning HSL per Wildbit)
   *
   * 3. LIGHTNESS ASSIGNMENT: Uses exact AccessiblePalette.com scale positions:
   *    - Base colors: Light [98.2, 96.5, 94] | Dark [28, 41, 49.5]
   *    - Semantic colors: Light [65] | Dark [41]
   *    - Brand colors: Light [77, 89.5, 65] | Dark [49.5, 41, 28]
   *
   * 4. MATHEMATICAL HUE HARMONY: Generates semantic colors using precise
   *    90°, 180°, 270° offsets from primary hue for color theory compliance
   *
   * 5. SCIENTIFIC CHROMA: Applies getChromaForLightness() to reduce chroma
   *    at extremes and adjust per hue (yellows -20%, blues +10%)
   *
   * 6. ACCESSIBILITY VALIDATION: Content colours choose the stronger black or
   *    white WCAG contrast, including the weakest base-surface tier.
   *
   * Result: Scientifically balanced theme with consistent perceived lightness,
   * mathematical color harmony, and WCAG-readable content pairs.
   */
  const randomizeTheme = () => {
    const previous = currentTheme();
    const signature = (theme: Theme) =>
      [
        "--color-base-100",
        "--color-primary",
        "--color-secondary",
        "--color-accent",
      ]
        .map((key) => theme[key])
        .join("|");
    let newTheme = createComposedTheme();
    for (let attempt = 0; attempt < 7 && signature(newTheme) === signature(previous); attempt += 1) {
      newTheme = createComposedTheme();
    }
    if (signature(newTheme) === signature(previous)) {
      newTheme = createComposedTheme();
    }
    const replacement = {
      ...newTheme,
      name: previous.name,
      _id: previous._id,
    };
    commitTheme(replacement);
    actionStatus.announce("Theme randomized");

    const isDark = (newTheme as any)._themeType === "dark";
    setThemeOptions((prev) => ({
      ...prev,
      colorScheme: isDark ? "dark" : "light",
    }));
  };

  const createNewTheme = () => {
    const usedNames = new Set(customThemes().map((theme) => theme.name));
    let nextThemeNumber = 1;
    while (usedNames.has(`Theme ${nextThemeNumber}`)) nextThemeNumber += 1;
    const theme = normalizeTheme({
      ...createComposedTheme(),
      name: `Theme ${nextThemeNumber}`,
    });
    const themes = [theme, ...customThemes()];
    setCurrentTheme(theme);
    setCustomThemes(themes);
    if (applyToWholeSite()) applyThemeToDocument(theme);
    persist(theme, themes);
    actionStatus.announce(`Theme added: ${theme.name}`);
  };

  const loadTheme = (theme: Theme) => {
    commitTheme(theme);
    actionStatus.announce(`Theme selected: ${theme.name}`);
  };

  const removeTheme = (theme: Theme) => {
    const remaining = customThemes().filter(
      (saved) => identity(saved) !== identity(theme),
    );
    if (identity(currentTheme()) !== identity(theme)) {
      setCustomThemes(remaining);
      persist(currentTheme(), remaining);
      actionStatus.announce(`Theme deleted: ${theme.name}`);
      return;
    }

    const next = remaining[0] || normalizeTheme(createComposedTheme());
    setCurrentTheme(next);
    setCustomThemes(remaining);
    if (applyToWholeSite()) applyThemeToDocument(next);
    persist(next, remaining);
    actionStatus.announce(`Theme deleted: ${theme.name}`);
  };

  const clearAllThemes = () => {
    const next = normalizeTheme(createComposedTheme());
    setCurrentTheme(next);
    setCustomThemes([]);
    if (applyToWholeSite()) applyThemeToDocument(next);
    persist(next, []);
    actionStatus.announce("Saved themes cleared");
  };

  const updateThemeName = (name: string) => {
    commitTheme({ ...currentTheme(), name });
    actionStatus.announce(`Theme renamed: ${name}`);
  };

  const changeApplyToWholeSite = (checked: boolean) => {
    setApplyToWholeSite(checked);
    applyThemeToDocument(checked ? currentTheme() : null);
    persist(currentTheme(), customThemes(), checked);
    actionStatus.announce(
      checked ? "Theme applied to whole site" : "Theme scoped to preview",
    );
  };

  const changeRememberTheme = (checked: boolean) => {
    setRememberTheme(checked);
    if (checked) {
      writeThemeEditorState({
        currentTheme: currentTheme(),
        themes: customThemes(),
        applyToWholeSite: applyToWholeSite(),
      });
    } else {
      clearThemeEditorState();
    }
    actionStatus.announce(
      checked ? "Theme will be remembered" : "Theme will not be remembered",
    );
  };

  const openColorPicker = (colorKey: string, event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setPickerPosition({
      x: rect.left + rect.width + 10,
      y: rect.top,
    });
    setSelectedColorKey(colorKey);
    setShowColorPicker(true);
  };

  const selectColor = (colorValue: string) => {
    const key = selectedColorKey();

    if (key) {
      const newTheme = updateThemeColor(currentTheme(), key, colorValue);
      // A direct token edit leaves the friend palette and becomes authoritative
      // until the person explicitly picks another harmony.
      if (key === "--color-primary") delete newTheme._controlAccentIndex;
      if (key === "--color-accent") delete newTheme._artAccentIndex;
      commitTheme(newTheme);
      actionStatus.announce(`Color updated: ${key}`);
    }
  };

  const updateThemePropertyValue = (key: string, value: string) => {
    const newTheme = updateThemeProperty(currentTheme(), key, value);
    commitTheme(newTheme);
    actionStatus.announce(`Theme token updated: ${key}`);
  };

  const updateGlassThemeValues = (values: Record<string, string>) => {
    commitTheme({ ...currentTheme(), ...values });
    actionStatus.announce("Glass settings updated");
  };

  const replaceTheme = (theme: Theme, message: string) => {
    commitTheme(theme);
    actionStatus.announce(message);
  };

  const resetTheme = () => {
    const previous = currentTheme();
    const mode = previous._themeType === "dark" ? "dark" : "light";
    let next = applyThemeComposition(previous, {
      surface: DEFAULT_SURFACE,
      strength: DEFAULT_STRENGTH,
      softness: DEFAULT_SOFTNESS,
      textBrightness: DEFAULT_TEXT_BRIGHTNESS,
    });
    const controlFriends = accentOptions(
      DEFAULT_SURFACE,
      mode,
      DEFAULT_STRENGTH,
      DEFAULT_SOFTNESS,
    );
    const artworkFriends = artworkAccentOptions(
      DEFAULT_SURFACE,
      mode,
      DEFAULT_STRENGTH,
      DEFAULT_SOFTNESS,
    );
    next = updateThemeColor(next, "--color-primary", controlFriends[0]);
    next = updateThemeColor(next, "--color-accent", artworkFriends[0]);
    next._controlAccentIndex = "0";
    next._artAccentIndex = "0";
    commitTheme(resetGlassTheme(next));
    actionStatus.announce("Theme builder reset");
  };

  const exportCSS = (
    isDefault: boolean,
    isPrefersDark: boolean,
    colorScheme: "light" | "dark"
  ) => {
    setThemeOptions({ isDefault, isPrefersDark, colorScheme });
    setShowCSSModal(true);
  };

  return (
    <ContentContainer maxWidth="full" prose={false}>
      {/* Header */}
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Theme Editor</h1>
        <p class="text-xl text-base-content/70 leading-relaxed max-w-3xl">
          Customize your application's look and feel with our powerful theme
          editor. Modify colors, spacing, and other design tokens to create a
          unique and consistent visual identity.
        </p>
      </div>

      <div class="mb-3 grid grid-cols-2 gap-2 xl:hidden" aria-label="Theme editor view">
        <Button
          id="theme-view-editor"
          aria-pressed={dockActiveItem() === "editor" ? "true" : "false"}
          flavor={dockActiveItem() === "editor" ? "primary" : "secondary"}
          onClick={() => setDockActiveItem("editor")}
        >
          Editor
        </Button>
        <Button
          id="theme-view-preview"
          aria-pressed={dockActiveItem() === "preview" ? "true" : "false"}
          flavor={dockActiveItem() === "preview" ? "primary" : "secondary"}
          onClick={() => setDockActiveItem("preview")}
        >
          Preview
        </Button>
      </div>

      <div class="relative grid xl:grid-cols-[14rem_26rem_minmax(0,1fr)]">
        <div class={dockActiveItem() === "preview" ? "max-xl:hidden" : ""}>
          <ThemeList
            themes={customThemes()}
            currentTheme={currentTheme()}
            onThemeSelect={loadTheme}
            onThemeRemove={removeTheme}
            onCreateNewTheme={createNewTheme}
            onClearAllThemes={clearAllThemes}
          />
        </div>
        <ThemeEditor
          theme={currentTheme()}
          onThemeNameChange={updateThemeName}
          onColorClick={openColorPicker}
          onThemeChange={replaceTheme}
          onThemePropertyUpdate={updateThemePropertyValue}
          onGlassThemeUpdate={updateGlassThemeValues}
          onRandomizeTheme={randomizeTheme}
          onResetTheme={resetTheme}
          onExportCSS={exportCSS}
          dockActiveItem={dockActiveItem()}
          applyToWholeSite={applyToWholeSite()}
          rememberTheme={rememberTheme()}
          onApplyToWholeSiteChange={changeApplyToWholeSite}
          onRememberThemeChange={changeRememberTheme}
          status={actionStatus.message()}
        />

        <div class={`min-w-0 overflow-x-hidden ${dockActiveItem() === "editor" ? "max-xl:hidden" : ""}`}>
          <div class="border-base-300 min-w-0 overflow-hidden border-s border-t xl:rounded-ss-xl">
            <div
              id="theme-preview-scope"
              style={Object.fromEntries(
                Object.entries(currentTheme())
                  .filter(([key]) => key.startsWith("--"))
                  .map(([key, value]) => [key, value])
                  .concat(
                    currentTheme()._glassEnabled === "0"
                      ? [
                          ["--glass-background-opacity", "100%"],
                          ["--glass-control-opacity", "100%"],
                          ["--glass-blur", "0px"],
                        ]
                      : [],
                  )
              )}
              class={currentTheme()._glassEnabled === "0" ? "theme-glass-disabled" : ""}
            >
              <Preview currentTheme={currentTheme()} />
            </div>
          </div>
        </div>

        <ColorPickerPopover
          open={showColorPicker()}
          onClose={() => setShowColorPicker(false)}
          onColorSelect={selectColor}
          initialColor={
            selectedColorKey()
              ? oklchToHex(
                  currentTheme()[selectedColorKey()] || "oklch(100% 0 0)"
                )
              : "#ffffff"
          }
          position={pickerPosition()}
        />

        <ThemeCSSModal
          open={showCSSModal()}
          onClose={() => setShowCSSModal(false)}
          theme={currentTheme()}
          isDefault={themeOptions().isDefault}
          isPrefersDark={themeOptions().isPrefersDark}
          colorScheme={themeOptions().colorScheme}
        />
      </div>
    </ContentContainer>
  );
}
