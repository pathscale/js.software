import { For, createSignal } from "solid-js";
import { Button, Dropdown, Grid, Icon, Separator, Switch } from "@pathscale/ui";
import { Theme, COLOR_GROUPS } from "../../utils/themeUtils";
import ColorGroup from "./ColorGroup";
import RadiusSection from "./RadiusSection";
import EffectsSection from "./EffectsSection";
import GlassSection from "./GlassSection";
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
      class={`bg-base-100 flex w-full shrink-0 flex-col items-center gap-2 p-2 pb-20 md:sticky md:top-16 md:items-start lg:items-stretch ${props.dockActiveItem !== "editor" ? "max-md:hidden" : ""}`}
    >
      <Grid cols="2" gap="sm" class="w-full">
        <Button onClick={props.onRandomizeTheme}>
          <Icon src="mdi--dice" width={16} height={16} class="group-active:scale-95" />
          Random
        </Button>
        <Button flavor="secondary" onClick={() => props.onExportCSS(isDefault(), isPrefersDark(), colorScheme())}>
          <Icon src="mdi--code-braces" width={16} height={16} />
          CSS
        </Button>
      </Grid>

      <div class="flex flex-col gap-2 w-full">
        <Switch
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={applyToWholeSite()}
          onChange={setApplyToWholeSite}
        >
          Apply to whole site
        </Switch>

        <Switch
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={rememberTheme()}
          onChange={setRememberTheme}
        >
          Remember this theme
        </Switch>
      </div>

      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--palette-outline" width={16} height={16} class="opacity-40" />
          Change Colors
        </span></span><Separator class="flex-1" /></h3>

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

      <GlassSection
        theme={props.theme}
        onThemeUpdate={props.onThemePropertyUpdate}
      />

      <SizesSection
        theme={props.theme}
        onThemeUpdate={props.onThemePropertyUpdate}
      />
      
      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--cog" width={16} height={16} class="opacity-40" />
          Options
        </span></span><Separator class="flex-1" /></h3>
      
      <div class="flex flex-col gap-3 w-full">
        <Switch
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={isDefault()}
          onChange={setIsDefault}
        >
          Default theme
        </Switch>

        <Switch
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={isPrefersDark()}
          onChange={setIsPrefersDark}
        >
          Default dark theme
        </Switch>

        <Switch
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={colorScheme() === "dark"}
          onChange={(checked) => setColorScheme(checked ? "dark" : "light")}
        >
          Dark color scheme
        </Switch>
      </div>
    </div>
  );
}
