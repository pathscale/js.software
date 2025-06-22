import { createSignal } from "solid-js";
import Preview from "../components/Preview";
import {
  generateRandomTheme,
  updateThemeColor,
  updateThemeProperty,
  oklchToHex,
  Theme,
} from "../utils/themeUtils";
import ThemeEditor from "../components/theming/ThemeEditor";
import ColorPickerPopover from "../components/theming/ColorPickerPopover";
import ThemeCSSModal from "../components/theming/ThemeCSSModal";

export default function Theming() {
  const [currentTheme, setCurrentTheme] = createSignal<Theme>(
    generateRandomTheme()
  );
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
  const [pickerPosition, setPickerPosition] = createSignal({ x: 0, y: 0 });
  const [showCSSModal, setShowCSSModal] = createSignal(false);
  const [themeOptions, setThemeOptions] = createSignal({ isDefault: false, isPrefersDark: false, colorScheme: "light" as "light" | "dark" });
  const [dockActiveItem] = createSignal("editor");

  const randomizeTheme = () => {
    const newTheme = generateRandomTheme();
    setCurrentTheme(newTheme);
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
    }
  };

  const updateThemePropertyValue = (key: string, value: string) => {
    const newTheme = updateThemeProperty(currentTheme(), key, value);
    setCurrentTheme(newTheme);
  };

  const exportCSS = (isDefault: boolean, isPrefersDark: boolean, colorScheme: "light" | "dark") => {
    setThemeOptions({ isDefault, isPrefersDark, colorScheme });
    setShowCSSModal(true);
  };

  return (
    <div class="relative grid md:grid-cols-[20rem_1fr]">
      <ThemeEditor
        theme={currentTheme()}
        onColorClick={openColorPicker}
        onThemePropertyUpdate={updateThemePropertyValue}
        onRandomizeTheme={randomizeTheme}
        onExportCSS={exportCSS}
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
        isDefault={themeOptions().isDefault}
        isPrefersDark={themeOptions().isPrefersDark}
        colorScheme={themeOptions().colorScheme}
      />
    </div>
  );
}
