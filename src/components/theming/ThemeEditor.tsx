import { For, createSignal } from "solid-js";
import { Grid, Icon, Button, Dropdown, Toggle } from "@pathscale/ui";
import { Theme, COLOR_GROUPS } from "../../utils/themeUtils";
import ColorGroup from "./ColorGroup";
import RadiusSection from "./RadiusSection";
import EffectsSection from "./EffectsSection";
import SizesSection from "./SizesSection";

interface ThemeEditorProps {
  theme: Theme;
  onColorClick: (colorKey: string, event: MouseEvent) => void;
  onThemePropertyUpdate: (key: string, value: string) => void;
  onRandomizeTheme: () => void;
  onExportCSS: (isDefault: boolean, isPrefersDark: boolean, colorScheme: "light" | "dark") => void;
  dockActiveItem: string;
}

export default function ThemeEditor(props: ThemeEditorProps) {
  const [isDefault, setIsDefault] = createSignal(false);
  const [isPrefersDark, setIsPrefersDark] = createSignal(false);
  const [colorScheme, setColorScheme] = createSignal<"light" | "dark">("light");
  const [applyToWholeSite, setApplyToWholeSite] = createSignal(false);
  const [rememberTheme, setRememberTheme] = createSignal(false);

  return (
    <div
      class="bg-base-100 flex w-full shrink-0 flex-col items-center gap-2 p-2 pb-20 md:sticky md:top-16 md:items-start lg:items-stretch"
      classList={{ "max-md:hidden": props.dockActiveItem !== "editor" }}
    >
      <Grid cols="2" gap="sm" class="w-full">
        <Button onClick={props.onRandomizeTheme}>
          <Icon name="icon-[mdi--dice]" width={16} height={16} class="group-active:scale-95" />
          Random
        </Button>
        <Button color="neutral" onClick={() => props.onExportCSS(isDefault(), isPrefersDark(), colorScheme())}>
          <Icon name="icon-[mdi--code-braces]" width={16} height={16} />
          CSS
        </Button>
      </Grid>

      <div class="flex flex-col gap-2 w-full">
        <div class="flex items-center justify-between gap-2">
          <span class="text-base-content/60 text-xs">Apply to whole site</span>
          <Toggle 
            size="xs"
            checked={applyToWholeSite()}
            onChange={(e: any) => setApplyToWholeSite(e.currentTarget.checked)}
          />
        </div>
        
        <div class="flex items-center justify-between gap-2">
          <span class="text-base-content/60 text-xs">Remember this theme</span>
          <Toggle 
            size="xs"
            checked={rememberTheme()}
            onChange={(e: any) => setRememberTheme(e.currentTarget.checked)}
          />
        </div>
      </div>

      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--palette-outline]" width={16} height={16} class="opacity-40" />
          Change Colors
        </span>
      </h3>

      <Grid cols="4" gap="md" class="w-fit">
        <For each={COLOR_GROUPS}>
          {(group) => (
            <ColorGroup 
              group={group}
              theme={props.theme}
              onColorClick={props.onColorClick}
            />
          )}
        </For>
      </Grid>

      <RadiusSection
        theme={props.theme}
        onThemeUpdate={props.onThemePropertyUpdate}
      />

      <EffectsSection
        theme={props.theme}
        onThemeUpdate={props.onThemePropertyUpdate}
      />

      <SizesSection
        theme={props.theme}
        onThemeUpdate={props.onThemePropertyUpdate}
      />
      
      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--cog]" width={16} height={16} class="opacity-40" />
          Options
        </span>
      </h3>
      
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <span class="text-base-content/60 text-xs">Default theme</span>
          <Toggle 
            size="xs"
            checked={isDefault()}
            onChange={(e: any) => setIsDefault(e.currentTarget.checked)}
          />
        </div>
        
        <div class="flex items-center justify-between gap-2">
          <span class="text-base-content/60 text-xs">Default dark theme</span>
          <Toggle 
            size="xs"
            checked={isPrefersDark()}
            onChange={(e: any) => setIsPrefersDark(e.currentTarget.checked)}
          />
        </div>
        
        <div class="flex items-center justify-between gap-2">
          <span class="text-base-content/60 text-xs">Dark color scheme</span>
          <Toggle 
            size="xs"
            checked={colorScheme() === "dark"}
            onChange={(e: any) => setColorScheme(e.currentTarget.checked ? "dark" : "light")}
          />
        </div>
      </div>
    </div>
  );
}