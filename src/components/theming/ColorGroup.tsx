import { For } from "solid-js";
import { Button, Flex } from "@pathscale/ui";
import { Theme, getColorBackgroundStyle, getColorTextStyle, getColorLabel } from "../../utils/themeUtils";

interface ColorGroupProps {
  group: {
    name: string;
    colors: string[];
  };
  theme: Theme;
  onColorClick: (colorKey: string, event: MouseEvent) => void;
}

export default function ColorGroup(props: ColorGroupProps) {
  return (
    <Flex
      direction="col"
      gap="sm"
      class={
        props.group.name === "base" ? "col-span-4" : "col-span-2"
      }
    >
      <Flex gap="md">
        <For each={props.group.colors}>
          {(colorKey) => {
            const backgroundColor = () => getColorBackgroundStyle(props.theme, colorKey, props.group.name);
            const textColor = () => getColorTextStyle(props.theme, colorKey, props.group.name);
            const label = getColorLabel(colorKey, props.group.name);

            return (
              <Button
                onClick={(e: any) => props.onColorClick(colorKey, e)}
                class="w-8 h-8 rounded border border-gray-300 hover:border-gray-400 transition-colors relative group flex items-center justify-center"
                style={{ background: backgroundColor() }}
                title={colorKey}
              >
                <div
                  class="absolute inset-0 opacity-0 group-hover:opacity-10 rounded transition-opacity"
                  style="background-color: rgba(0,0,0,0.1)"
                />
                <span
                  class="text-xs font-semibold relative z-10"
                  style={{ color: textColor() }}
                >
                  {label}
                </span>
              </Button>
            );
          }}
        </For>
      </Flex>
      <div class="text-base-content/60 text-xs">{props.group.name}</div>
    </Flex>
  );
}