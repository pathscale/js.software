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
 * 1. LCh COLOR SPACE (Wildbit + Chroma.js)
 *    - chroma.lch(lightness, chroma, hue) for perceptually uniform generation
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
 * 5. DUAL ACCESSIBILITY VALIDATION
 *    - WCAG 2.1: 4.5:1 minimum contrast ratio
 *    - APCA (WCAG 3): 60+ score minimum per Wildbit recommendation
 *    - Automatic text color generation meeting both standards
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
import Preview from "../components/Preview";
import {
  generateRandomTheme,
  updateThemeColor,
  updateThemeProperty,
  oklchToHex,
  Theme,
  withGlassThemeDefaults,
} from "../utils/themeUtils";
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
import { createActionStatus } from "../components/showcase/ActionStatus";

const withIdentity = (theme: Theme): Theme => ({
  ...theme,
  _id: theme._id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
});

const restoreThemeLibrary = (
  persisted: ReturnType<typeof readThemeEditorState>,
): { currentTheme: Theme; themes: Theme[] } => {
  if (!persisted) {
    const currentTheme = withIdentity(
      withGlassThemeDefaults({ ...generateRandomTheme(), name: "Theme 1" }),
    );
    return { currentTheme, themes: [currentTheme] };
  }

  const currentTheme = withIdentity(
    withGlassThemeDefaults(persisted.currentTheme),
  );
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
    return withIdentity(withGlassThemeDefaults(theme));
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
  const [dockActiveItem] = createSignal("editor");

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
    const next = withIdentity(withGlassThemeDefaults(theme));
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
   * 2. LCh HUE EXTRACTION: Uses chroma.js to extract scientific hue value
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
   * 6. ACCESSIBILITY VALIDATION: All colors automatically meet WCAG 2.1 (4.5:1)
   *    and APCA (60+) contrast requirements through scientific lightness control
   *
   * Result: Scientifically balanced theme with consistent perceived lightness,
   * mathematical color harmony, and guaranteed accessibility.
   */
  const randomizeTheme = () => {
    const newTheme = withGlassThemeDefaults(generateRandomTheme());
    const replacement = {
      ...newTheme,
      name: currentTheme().name,
      _id: currentTheme()._id,
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
    const theme = withIdentity(
      withGlassThemeDefaults({
        ...generateRandomTheme(),
        name: `Theme ${nextThemeNumber}`,
      }),
    );
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

    const next = remaining[0] || withIdentity(withGlassThemeDefaults(generateRandomTheme()));
    setCurrentTheme(next);
    setCustomThemes(remaining);
    if (applyToWholeSite()) applyThemeToDocument(next);
    persist(next, remaining);
    actionStatus.announce(`Theme deleted: ${theme.name}`);
  };

  const clearAllThemes = () => {
    const next = withIdentity(withGlassThemeDefaults(generateRandomTheme()));
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

      <div class="relative grid md:grid-cols-[14rem_20rem_minmax(0,1fr)]">
        <ThemeList
          themes={customThemes()}
          currentTheme={currentTheme()}
          onThemeSelect={loadTheme}
          onThemeRemove={removeTheme}
          onCreateNewTheme={createNewTheme}
          onClearAllThemes={clearAllThemes}
        />
        <ThemeEditor
          theme={currentTheme()}
          onThemeNameChange={updateThemeName}
          onColorClick={openColorPicker}
          onThemePropertyUpdate={updateThemePropertyValue}
          onGlassThemeUpdate={updateGlassThemeValues}
          onRandomizeTheme={randomizeTheme}
          onExportCSS={exportCSS}
          dockActiveItem={dockActiveItem()}
          applyToWholeSite={applyToWholeSite()}
          rememberTheme={rememberTheme()}
          onApplyToWholeSiteChange={changeApplyToWholeSite}
          onRememberThemeChange={changeRememberTheme}
          status={actionStatus.message()}
        />

        <div class="overflow-x-hidden">
          <div class="border-base-300 overflow-hidden border-s border-t md:rounded-ss-xl">
            <div
              style={Object.fromEntries(
                Object.entries(currentTheme())
                  .filter(([key]) => key.startsWith("--"))
                  .map(([key, value]) => [key, value])
              )}
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
