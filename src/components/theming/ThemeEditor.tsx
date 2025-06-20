import { For } from "solid-js";
import { Button, Input, Grid, Icon } from "@pathscale/ui";
import { Theme, COLOR_GROUPS } from "../../utils/themeUtils";
import ColorGroup from "./ColorGroup";
import RadiusSection from "./RadiusSection";
import EffectsSection from "./EffectsSection";
import SizesSection from "./SizesSection";

interface ThemeEditorProps {
  theme: Theme;
  onThemeNameChange: (name: string) => void;
  onRandomizeTheme: () => void;
  onExportCSS: () => void;
  onColorClick: (colorKey: string, event: MouseEvent) => void;
  onThemePropertyUpdate: (key: string, value: string) => void;
  dockActiveItem: string;
}

export default function ThemeEditor(props: ThemeEditorProps) {
  return (
    <div
      class="bg-base-100 flex w-full shrink-0 flex-col items-center gap-6 p-6 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:items-start md:overflow-y-scroll lg:items-stretch"
      classList={{ "max-md:hidden": props.dockActiveItem !== "editor" }}
    >
      <Input
        placeholder="mytheme"
        value={props.theme.name}
        onInput={(e: any) => {
          props.onThemeNameChange(e.currentTarget.value);
        }}
        leftIcon={
          <span class="shrink-0 text-xs opacity-60 select-none">Name</span>
        }
        rightIcon={
          <Icon name="icon-[mdi-light--pencil]" width={16} height={16} class="opacity-40" />
        }
      />

      <Grid cols="2" gap="sm" class="w-full">
        <Button onClick={props.onRandomizeTheme}>
          <Icon name="icon-[mdi--dice]" width={16} height={16} class="group-active:scale-95" />
          Random
        </Button>
        <Button color="neutral" onClick={props.onExportCSS}>
          <Icon name="icon-[mdi--code-braces]" width={16} height={16} />
          CSS
        </Button>
      </Grid>

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
    </div>
  );
}