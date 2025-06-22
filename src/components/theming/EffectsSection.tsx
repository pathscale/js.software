import { For } from "solid-js";
import { Icon } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface EffectsSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const EFFECTS = [
  {
    key: "--depth",
    label: "Depth Effect",
    description: "3D depth on fields & selectors",
  },
  {
    key: "--noise",
    label: "Noise Effect", 
    description: "Noise pattern on fields & selectors",
  },
];

export default function EffectsSection(props: EffectsSectionProps) {
  return (
    <div class="w-full">
      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--auto-fix]" width={16} height={16} class="opacity-40" />
          Effects
        </span>
      </h3>
      
      <div class="flex flex-col gap-1">
        <For each={EFFECTS}>
          {(effect) => (
            <label class="flex cursor-pointer items-center justify-between gap-2">
              <span class="flex flex-col">
                <span class="text-base-content/70 text-xs">{effect.label}</span>
                <span class="text-base-content/40 text-xs italic">{effect.description}</span>
              </span>
              <input 
                type="checkbox" 
                class="toggle toggle-xs"
                checked={props.theme[effect.key] === "1"}
                onChange={(e) => 
                  props.onThemeUpdate(effect.key, e.currentTarget.checked ? "1" : "0")
                }
              />
            </label>
          )}
        </For>
      </div>
    </div>
  );
}