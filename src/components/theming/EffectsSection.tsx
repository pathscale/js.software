import { For } from "solid-js";
import { Icon, Separator, Switch } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface EffectsSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const EFFECTS = [
  {
    key: "--depth",
    label: "Depth Effect",
    description: "Depth on fields and selectors",
  },
  {
    key: "--noise",
    label: "Noise Effect",
    description: "Texture on fields and selectors",
  },
] as const;

export default function EffectsSection(props: EffectsSectionProps) {
  return (
    <div class="w-full">
      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--auto-fix" width={16} height={16} class="opacity-40" />
          Effects
      </span></span><Separator class="flex-1" /></h3>

      <div class="flex flex-col gap-1">
        <For each={EFFECTS}>
          {(effect) => (
            <Switch
              id={`theme-effect-${effect.key.slice(2)}`}
              class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
              size="sm"
              checked={props.theme[effect.key] === "1"}
              onChange={(checked) =>
                props.onThemeUpdate(effect.key, checked ? "1" : "0")
              }
              description={effect.description}
            >
              {effect.label}
            </Switch>
          )}
        </For>
      </div>
    </div>
  );
}
