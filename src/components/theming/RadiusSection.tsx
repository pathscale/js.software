import { For } from "solid-js";
import { Icon } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface RadiusSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const RADIUS_VALUES = ["0rem", "0.25rem", "0.5rem", "1rem", "2rem"];

const RADIUS_TYPES = [
  {
    key: "--radius-box",
    label: "Boxes",
    description: "card, modal, alert",
  },
  {
    key: "--radius-field", 
    label: "Fields",
    description: "button, input, select, tab",
  },
  {
    key: "--radius-selector",
    label: "Selectors", 
    description: "checkbox, toggle, badge",
  },
];

export default function RadiusSection(props: RadiusSectionProps) {
  return (
    <div class="w-full">
      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--border-radius]" width={16} height={16} class="opacity-40" />
          Radius
        </span>
      </h3>
      
      <div class="flex flex-col gap-1.5">
        <For each={RADIUS_TYPES}>
          {(radiusType) => (
            <div class="w-full">
              <div class="mb-0.5">
                <div class="text-base-content/70 text-xs">{radiusType.label}</div>
                <div class="text-base-content/40 text-xs italic">{radiusType.description}</div>
              </div>
              
              <div class="flex gap-1">
                <For each={RADIUS_VALUES}>
                  {(value) => (
                    <label class="bg-base-200 hover:bg-base-300 focus-within:outline-base-content relative cursor-pointer overflow-hidden transition-colors focus-within:outline-2 focus-within:outline-offset-2 rounded-lg">
                      <input 
                        type="radio" 
                        class="sr-only"
                        name={radiusType.key}
                        checked={props.theme[radiusType.key] === value}
                        onChange={() => props.onThemeUpdate(radiusType.key, value)}
                      />
                      <div class="px-1.5 py-1">
                        <div 
                          class="border-base-content/20 bg-base-200 h-6 w-8 border-e-2 border-t-2"
                          classList={{
                            "border-primary bg-base-300": props.theme[radiusType.key] === value,
                            "bg-base-200": props.theme[radiusType.key] !== value
                          }}
                          style={{ 
                            "border-start-end-radius": value,
                            "border-top-right-radius": value
                          }}
                        />
                      </div>
                    </label>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}