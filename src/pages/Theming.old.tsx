import { createSignal } from "solid-js";
import Preview from "../components/Preview";
import { 
  generateRandomTheme, 
  updateThemeColor, 
  generateThemeStyleString,
  Theme 
} from "../utils/themeUtils";
import ThemeList from "../components/theming/ThemeList";
import ThemeEditor from "../components/theming/ThemeEditor";
import ColorPickerModal from "../components/theming/ColorPickerModal";

export default function Theming() {
  const [currentTheme, setCurrentTheme] = createSignal<Theme>(generateRandomTheme());
  const [customThemes, setCustomThemes] = createSignal<Theme[]>([generateRandomTheme()]);
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
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

  const openColorPicker = (colorKey: string) => {
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
    setShowColorPicker(false);
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
    const cssText = generateThemeStyleString(currentTheme());
    navigator.clipboard.writeText(cssText);
    console.log("CSS copied to clipboard:", cssText);
  };

  const convertColorToOklch = (hexColor: string): string => {
    return hexColor;
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
        dockActiveItem={dockActiveItem()}
      />

      <div class="overflow-x-hidden">
        <div class="border-base-300 overflow-hidden border-s border-t md:rounded-ss-xl">
          <div
            style={generateThemeStyleString(currentTheme())}
          >
            <Preview currentTheme={currentTheme()} />
          </div>
        </div>
      </div>

      <ColorPickerModal
        open={showColorPicker()}
        onClose={() => setShowColorPicker(false)}
        onColorSelect={(color) => selectColor(convertColorToOklch(color))}
        initialColor={currentTheme()[selectedColorKey()] || "#ffffff"}
      />
    </div>
  );
}