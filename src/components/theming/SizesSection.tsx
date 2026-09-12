import { For } from "solid-js";
import { Icon, Separator, Slider } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface SizesSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const SIZE_VALUES = ["0.1875rem", "0.21875rem", "0.25rem", "0.28125rem", "0.3125rem"];
const FIELD_SCALE = [6, 8, 10, 12, 14];
const SELECTOR_SCALE = [4, 5, 6, 7, 8];
const SIZE_LABELS = ["xs", "sm", "md", "lg", "xl"];
const BORDER_VALUES = ["0.5px", "1px", "1.5px", "2px"];

const SIZE_TYPES = [
  {
    key: "--size-field",
    label: "Fields",
    description: "button, input, select, tab",
    scale: FIELD_SCALE,
  },
  {
    key: "--size-selector", 
    label: "Selectors",
    description: "checkbox, toggle, badge",
    scale: SELECTOR_SCALE,
  },
];

export default function SizesSection(props: SizesSectionProps) {
  const getCurrentSizeIndex = (sizeKey: string) => {
    const currentValue = props.theme[sizeKey] || "0.25rem";
    const index = SIZE_VALUES.indexOf(currentValue);
    return index >= 0 ? index : 2;
  };

  const getCurrentBorderIndex = () => {
    const currentValue = props.theme["--border"] || "1px";
    const index = BORDER_VALUES.indexOf(currentValue);
    return index >= 0 ? index : 1;
  };

  const updateSize = (key: string, index: number) => {
    props.onThemeUpdate(key, SIZE_VALUES[index]);
  };

  const updateBorder = (index: number) => {
    props.onThemeUpdate("--border", BORDER_VALUES[index]);
  };

  const getPixelValue = (remValue: string, multiplier: number) => {
    return (parseFloat(remValue) * 16 * multiplier).toFixed(0);
  };

  /*
   * Per axis, not shared.
   *
   * This used `Math.max(...FIELD_SCALE)` for both, so the Selector bars were
   * normalised against Fields' largest step - fourteen against their own eight
   * - and collapsed into five identical dots. Each axis is drawn against its
   * own largest step now, so both fill the same box and both show their shape.
   */
  const maxHeightFor = (scale: number[]) =>
    parseFloat(SIZE_VALUES[SIZE_VALUES.length - 1]) * 16 * Math.max(...scale);

  return (
    <div class="w-full">
      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex gap-1.5">
          <Icon src="mdi--resize" width={16} height={16} class="opacity-40" />
          Sizes
        </span></span><Separator class="flex-1" /></h3>
      
      <div class="flex flex-col gap-2">
        <For each={SIZE_TYPES}>
          {(sizeType) => (
            <div class="w-full">
              <div class="mb-0.5">
                <div class="text-base-content/70 text-xs">{sizeType.label}</div>
                <div class="text-base-content/60 text-xs italic">{sizeType.description}</div>
              </div>
              
              <div class="bg-base-200 rounded-lg flex items-end justify-center gap-2 p-2">
                <div class="flex gap-1">
                  <For each={sizeType.scale}>
                    {(size, index) => {
                      const currentValue = props.theme[sizeType.key] || "0.25rem";
                      const pixelValue = getPixelValue(currentValue, size);
                      const heightPercent = (parseFloat(currentValue) * 16 * size / maxHeightFor(sizeType.scale)) * 100;
                      
                      return (
                        <div class="flex flex-col items-center gap-1">
                          <div 
                            class="flex items-end" 
                            style={{ height: `${maxHeightFor(sizeType.scale) / 4}px` }}
                          >
                            <div 
                              class="bg-base-content w-1 rounded-full" 
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <div class="text-base-content/60 flex flex-col font-mono uppercase tabular-nums">
                            <span class="text-[0.5rem] font-semibold">{SIZE_LABELS[index()]}</span>
                            <span class="text-[0.5625rem]">{pixelValue}</span>
                          </div>
                        </div>
                      );
                    }}
                  </For>
                </div>
                
                <Slider
                  id={`theme-size-${sizeType.key.replace(/^--/, "")}`}
                  label={`${sizeType.label} base size`}
                  size="sm"
                  min={0}
                  max={SIZE_VALUES.length - 1}
                  step={1}
                  value={getCurrentSizeIndex(sizeType.key)}
                  formatValue={(index) =>
                    `${getPixelValue(SIZE_VALUES[index], sizeType.scale[0])} pixels`
                  }
                  onChange={(index) => updateSize(sizeType.key, index)}
                />
              </div>
              
            </div>
          )}
        </For>

        <div class="w-full">
          <div class="mb-2">
            <div class="text-base-content/70 text-xs">Border Width</div>
            <div class="text-base-content/60 text-xs italic">All components</div>
          </div>
          
          <div class="bg-base-200 rounded-lg p-2">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-xs text-base-content/60">
                <span>0.5px</span>
                <span>2px</span>
              </div>
              
              <Slider
                id="theme-border-width"
                label="Border width"
                size="sm"
                min={0}
                max={BORDER_VALUES.length - 1}
                step={1}
                value={getCurrentBorderIndex()}
                formatValue={(index) => BORDER_VALUES[index]}
                onChange={updateBorder}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
