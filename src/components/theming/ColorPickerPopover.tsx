import { createSignal, Show, onCleanup, createEffect, For } from "solid-js";
import { Button } from "@pathscale/ui";
import { TAILWIND_COLORS } from "../../utils/themeUtils";

interface ColorPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  initialColor: string;
  position: { x: number; y: number };
}

export default function ColorPickerPopover(props: ColorPickerPopoverProps) {
  const [color, setColor] = createSignal(props.initialColor);

  createEffect(() => {
    setColor(props.initialColor);
  });
  
  let popoverRef: HTMLDivElement | undefined;

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef && !popoverRef.contains(event.target as Node)) {
      props.onClose();
    }
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    props.onColorSelect(selectedColor);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      props.onClose();
    }
  };

  if (props.isOpen) {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    });
  }

  return (
    <Show when={props.isOpen}>
      <div
        ref={popoverRef}
        class="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-4"
        style={{
          left: `${Math.min(props.position.x, window.innerWidth - 320)}px`,
          top: `${Math.min(props.position.y, window.innerHeight - 400)}px`,
          width: "300px",
        }}
      >
        <div class="flex flex-col gap-4">
          <div class="text-sm font-medium text-gray-700">Select Color</div>

          {/* DaisyUI exact color grid - 11 columns like DaisyUI */}
          <div 
            class="grid grid-cols-11 gap-1 max-h-80 overflow-y-auto p-2"
            role="listbox"
          >
            <For each={Object.entries(TAILWIND_COLORS)}>
              {([colorName, colorValue]) => (
                <button
                  class="appearance-none p-px cursor-pointer"
                  aria-label={colorName}
                  aria-selected={color() === colorValue}
                  onClick={() => handleColorSelect(colorValue)}
                >
                  <div
                    class="relative grid aspect-square w-5 place-items-center border border-gray-200 bg-transparent select-none sm:w-6 cursor-pointer"
                    style={{
                      "background-color": colorValue,
                      "box-shadow": color() === colorValue ? "0 0 0 2px white, 0 0 0 4px black" : "none"
                    }}
                    title={colorName}
                  />
                </button>
              )}
            </For>
          </div>

          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded border border-gray-300 shrink-0"
                style={{ "background-color": color() }}
              />
              <span class="text-xs font-mono text-gray-600 truncate max-w-32">
                {color()}
              </span>
            </div>
            <Button size="sm" onClick={props.onClose} variant="ghost">
              Done
            </Button>
          </div>
        </div>
      </div>
    </Show>
  );
}
