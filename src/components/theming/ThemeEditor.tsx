import { For, createEffect, createSignal } from "solid-js";
import { Button, Grid, Icon, Input, Separator, Switch } from "@pathscale/ui";
import { Theme, COLOR_GROUPS } from "../../utils/themeUtils";
import ColorGroup from "./ColorGroup";
import RadiusSection from "./RadiusSection";
import EffectsSection from "./EffectsSection";
import GlassSection from "./GlassSection";
import SizesSection from "./SizesSection";
import ThemeComposer from "./ThemeComposer";
import { applyCompositionWithAccentHarmony } from "../../lib/themeComposer";
import { ActionStatus } from "../showcase/ActionStatus";

interface ThemeEditorProps {
  theme: Theme;
  onThemeNameChange: (name: string) => void;
  onColorClick: (colorKey: string, event: MouseEvent) => void;
  onThemeChange: (theme: Theme, message: string) => void;
  onThemePropertyUpdate: (key: string, value: string) => void;
  onGlassThemeUpdate: (values: Record<string, string>) => void;
  onRandomizeTheme: () => void;
  onResetTheme: () => void;
  onExportCSS: (isDefault: boolean, isPrefersDark: boolean, colorScheme: "light" | "dark") => void;
  dockActiveItem: string;
  applyToWholeSite: boolean;
  rememberTheme: boolean;
  onApplyToWholeSiteChange: (checked: boolean) => void;
  onRememberThemeChange: (checked: boolean) => void;
  status: string;
}

export default function ThemeEditor(props: ThemeEditorProps) {
  const [isDefault, setIsDefault] = createSignal(false);
  const [isPrefersDark, setIsPrefersDark] = createSignal(false);
  const [colorScheme, setColorScheme] = createSignal<"light" | "dark">(
    props.theme._themeType === "dark" ? "dark" : "light",
  );

  createEffect(
    () => props.theme._themeType,
    (themeType) => {
      setColorScheme(themeType === "dark" ? "dark" : "light");
    },
  );

  return (
    <div
      class={`bg-base-100 flex w-full shrink-0 flex-col items-center gap-2 p-2 pb-20 xl:sticky xl:top-16 xl:items-stretch ${props.dockActiveItem !== "editor" ? "max-xl:hidden" : ""}`}
    >
      <Input
        id="theme-name"
        aria-label="Theme name"
        value={props.theme.name}
        onInput={(event) => props.onThemeNameChange(event.currentTarget.value)}
      />
      <ActionStatus message={props.status} />

      <Grid cols="2" gap="sm" class="w-full">
        <Button id="theme-randomize" onClick={props.onRandomizeTheme}>
          <Icon src="mdi--dice" width={16} height={16} class="group-active:scale-95" />
          Random
        </Button>
        <Button id="theme-export-css" flavor="secondary" onClick={() => props.onExportCSS(isDefault(), isPrefersDark(), colorScheme())}>
          <Icon src="mdi--code-braces" width={16} height={16} />
          CSS
        </Button>
      </Grid>

      <div class="flex flex-col gap-2 w-full">
        <Switch
          id="theme-apply-whole-site"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={props.applyToWholeSite}
          onChange={props.onApplyToWholeSiteChange}
        >
          Apply to whole site
        </Switch>

        <Switch
          id="theme-remember"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={props.rememberTheme}
          onChange={props.onRememberThemeChange}
        >
          Remember this theme
        </Switch>
      </div>

      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--palette-outline" width={16} height={16} class="opacity-40" />
          Compose Theme
        </span></span><Separator class="flex-1" /></h3>

      <Grid cols="2" gap="sm" class="w-full">
        <Button
          id="theme-mode-light"
          type="button"
          variant={props.theme._themeType === "light" ? "solid" : "outline"}
          flavor={props.theme._themeType === "light" ? "primary" : "neutral"}
          aria-label="Light mode"
          aria-pressed={props.theme._themeType === "light" ? "true" : "false"}
          onClick={() =>
            props.onThemeChange(
              applyCompositionWithAccentHarmony(
                { ...props.theme, _themeType: "light" },
                {},
              ),
              "Light theme selected",
            )
          }
        >
          Light
        </Button>
        <Button
          id="theme-mode-dark"
          type="button"
          variant={props.theme._themeType === "dark" ? "solid" : "outline"}
          flavor={props.theme._themeType === "dark" ? "primary" : "neutral"}
          aria-label="Dark mode"
          aria-pressed={props.theme._themeType === "dark" ? "true" : "false"}
          onClick={() =>
            props.onThemeChange(
              applyCompositionWithAccentHarmony(
                { ...props.theme, _themeType: "dark" },
                {},
              ),
              "Dark theme selected",
            )
          }
        >
          Dark
        </Button>
      </Grid>

      <ThemeComposer
        theme={props.theme}
        onThemeChange={props.onThemeChange}
        onReset={props.onResetTheme}
      />

      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--eyedropper-variant" width={16} height={16} class="opacity-40" />
          Individual Tokens
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
        onThemeUpdate={props.onGlassThemeUpdate}
        enabled={props.theme._glassEnabled !== "0"}
        onEnabledChange={(enabled) =>
          props.onThemeChange(
            { ...props.theme, _glassEnabled: enabled ? "1" : "0" },
            enabled ? "Glass preview enabled" : "Glass preview disabled",
          )
        }
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
          id="theme-default"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={isDefault()}
          onChange={setIsDefault}
        >
          Default theme
        </Switch>

        <Switch
          id="theme-default-dark"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={isPrefersDark()}
          onChange={setIsPrefersDark}
        >
          Default dark theme
        </Switch>

        <Switch
          id="theme-color-scheme-dark"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={colorScheme() === "dark"}
          onChange={(checked) => setColorScheme(checked ? "dark" : "light")}
        >
          Export dark color scheme
        </Switch>
      </div>
    </div>
  );
}
