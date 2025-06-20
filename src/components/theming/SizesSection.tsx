import { createMemo, For } from "solid-js";
import { Icon } from "@pathscale/ui";
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
    return SIZE_VALUES.indexOf(currentValue);
  };

  const getCurrentBorderIndex = () => {
    const currentValue = props.theme["--border"] || "1px";
    return BORDER_VALUES.indexOf(currentValue);
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

  const maxHeight = createMemo(() => {
    const maxRem = parseFloat(SIZE_VALUES[SIZE_VALUES.length - 1]);
    const maxScale = Math.max(...FIELD_SCALE);
    return maxRem * 16 * maxScale;
  });

  return (
    <div class="w-full">
      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--resize]" width={16} height={16} class="opacity-40" />
          Sizes
        </span>
      </h3>
      
      <div class="flex flex-col gap-6">
        <For each={SIZE_TYPES}>
          {(sizeType) => (
            <div class="w-full">
              <div class="mb-2">
                <div class="text-base-content/70 text-xs">{sizeType.label}</div>
                <div class="text-base-content/40 text-xs italic">{sizeType.description}</div>
              </div>
              
              <div class="bg-base-200 rounded-box flex items-end justify-center gap-4 p-4 px-6">
                <div class="flex gap-1">
                  <For each={sizeType.scale}>
                    {(size, index) => {
                      const currentValue = props.theme[sizeType.key] || "0.25rem";
                      const pixelValue = getPixelValue(currentValue, size);
                      const heightPercent = (parseFloat(currentValue) * 16 * size / maxHeight()) * 100;
                      
                      return (
                        <div class="flex flex-col items-center gap-1">
                          <div 
                            class="flex items-end" 
                            style={{ height: `${maxHeight() / 4}px` }}
                          >
                            <div 
                              class="bg-base-content w-1 rounded-full" 
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <div class="text-base-content/50 flex flex-col font-mono uppercase tabular-nums">
                            <span class="text-[0.5rem] font-semibold">{SIZE_LABELS[index()]}</span>
                            <span class="text-[0.5625rem]">{pixelValue}</span>
                          </div>
                        </div>
                      );
                    }}
                  </For>
                </div>
                
                <input 
                  type="range" 
                  class="range range-xs" 
                  min={0} 
                  max={SIZE_VALUES.length - 1} 
                  step={1}
                  value={getCurrentSizeIndex(sizeType.key)}
                  onInput={(e) => updateSize(sizeType.key, parseInt(e.currentTarget.value))}
                />
              </div>
              
              <div class="mt-2 text-center">
                <span class="text-base-content/50 text-xs font-mono">
                  {sizeType.label} base size: {(parseFloat(props.theme[sizeType.key] || "0.25rem") * 16 * 4).toFixed(1)} Pixels
                </span>
              </div>
            </div>
          )}
        </For>

        <div class="w-full">
          <div class="mb-2">
            <div class="text-base-content/70 text-xs">Border Width</div>
            <div class="text-base-content/40 text-xs italic">All components</div>
          </div>
          
          <div class="bg-base-200 rounded-box p-4 px-6">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-xs text-base-content/50">
                <span>0.5px</span>
                <span>2px</span>
              </div>
              
              <input 
                type="range" 
                class="range range-xs" 
                min={0} 
                max={BORDER_VALUES.length - 1} 
                step={1}
                value={getCurrentBorderIndex()}
                onInput={(e) => updateBorder(parseInt(e.currentTarget.value))}
              />
              
              <div class="text-center mt-2">
                <span class="text-base-content/50 text-xs font-mono">
                  Current: {props.theme["--border"] || "1px"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}