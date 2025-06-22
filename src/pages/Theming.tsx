import { createSignal } from "solid-js";
import Preview from "../components/Preview";
import {
  generateRandomTheme,
  updateThemeColor,
  updateThemeProperty,
  oklchToHex,
  Theme,
} from "../utils/themeUtils";
import ThemeList from "../components/theming/ThemeList";
import ThemeEditor from "../components/theming/ThemeEditor";
import ColorPickerPopover from "../components/theming/ColorPickerPopover";
import ThemeCSSModal from "../components/theming/ThemeCSSModal";

export default function Theming() {
  const [currentTheme, setCurrentTheme] = createSignal<Theme>(
    generateRandomTheme()
  );
  const [customThemes, setCustomThemes] = createSignal<Theme[]>([
    generateRandomTheme(),
  ]);
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
  const [pickerPosition, setPickerPosition] = createSignal({ x: 0, y: 0 });
  const [showCSSModal, setShowCSSModal] = createSignal(false);
  const [dockActiveItem] = createSignal("editor");

  const randomizeTheme = () => {
    const newTheme = generateRandomTheme();
    setCurrentTheme(newTheme);
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

  const loadTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const removeTheme = (themeToRemove: Theme) => {
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

  const clearAllThemes = () => {
    setCustomThemes([]);
    setCurrentTheme(generateRandomTheme());
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
      setCurrentTheme(newTheme);

      setCustomThemes((prev) =>
        prev.map((theme) =>
          theme.name === currentTheme().name
            ? updateThemeColor(theme, key, colorValue)
            : theme
        )
      );
    }
  };

  const updateThemePropertyValue = (key: string, value: string) => {
    const newTheme = updateThemeProperty(currentTheme(), key, value);
    setCurrentTheme(newTheme);

    setCustomThemes((prev) =>
      prev.map((theme) =>
        theme.name === currentTheme().name
          ? updateThemeProperty(theme, key, value)
          : theme
      )
    );
  };

  const updateThemeName = (newName: string) => {
    const oldName = currentTheme().name;
    setCurrentTheme((prev) => ({ ...prev, name: newName }));
    setCustomThemes((prev) =>
      prev.map((theme) =>
        theme.name === oldName ? { ...theme, name: newName } : theme
      )
    );
  };

  const exportCSS = () => {
    setShowCSSModal(true);
  };

  return (
    <div class="relative grid md:grid-cols-[14rem_17rem_1fr]">
      <ThemeList
        themes={customThemes()}
        currentTheme={currentTheme()}
        onThemeSelect={loadTheme}
        onThemeRemove={removeTheme}
        onCreateNewTheme={createNewTheme}
        onClearAllThemes={clearAllThemes}
        dockActiveItem={dockActiveItem()}
      />

      <ThemeEditor
        theme={currentTheme()}
        onThemeNameChange={updateThemeName}
        onRandomizeTheme={randomizeTheme}
        onExportCSS={exportCSS}
        onColorClick={openColorPicker}
        onThemePropertyUpdate={updateThemePropertyValue}
        dockActiveItem={dockActiveItem()}
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
        isOpen={showColorPicker()}
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
        isOpen={showCSSModal()}
        onClose={() => setShowCSSModal(false)}
        theme={currentTheme()}
      />
    </div>
  );
}
