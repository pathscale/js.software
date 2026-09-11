import { For } from "solid-js";
import { Icon, Radio, RadioGroup, Separator } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface RadiusSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const RADIUS_VALUES = ["0rem", "0.25rem", "0.5rem", "1rem", "2rem"];

const radiusLabel = (value: string) =>
  value === "0rem" ? "square" : `${Number.parseFloat(value) * 16} pixels`;

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
      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--border-radius" width={16} height={16} class="opacity-40" />
          Radius
        </span></span><Separator class="flex-1" /></h3>
      
      <div class="flex flex-col gap-1.5">
        <For each={RADIUS_TYPES}>
          {(radiusType) => (
            <RadioGroup
              class="w-full gap-1.5 [&_[data-slot=radio-group-items]]:gap-1"
              name={radiusType.key}
              label={radiusType.label}
              description={radiusType.description}
              orientation="horizontal"
              value={props.theme[radiusType.key]}
              onChange={(value) => props.onThemeUpdate(radiusType.key, value)}
            >
                <For each={RADIUS_VALUES}>
                  {(value) => (
                    <Radio
                      value={value}
                      aria-label={`${radiusType.label} radius ${radiusLabel(value)}`}
                      class="h-8 w-10 [&_[data-slot=radio-control]]:mt-0 [&_[data-slot=radio-control]]:h-8 [&_[data-slot=radio-control]]:w-10 [&_[data-slot=radio-control]]:rounded-lg [&_[data-slot=radio-control]]:border-base-content/20 [&_[data-slot=radio-control]]:bg-base-200"
                      indicator={
                        <div
                          class={`h-6 w-8 border-e-2 border-t-2 ${props.theme[radiusType.key] === value ? "border-primary bg-base-300" : "border-base-content/20 bg-base-200"}`}
                          style={{
                            "border-start-end-radius": value,
                            "border-top-right-radius": value,
                          }}
                        />
                      }
                    />
                  )}
                </For>
            </RadioGroup>
          )}
        </For>
      </div>
    </div>
  );
}
