import { createSignal, Show, onCleanup, createEffect } from "solid-js";
import { HexColorPicker } from "solid-colorful";
import { Button } from "@pathscale/ui";

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

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    props.onColorSelect(newColor);
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
          left: `${Math.min(props.position.x, window.innerWidth - 250)}px`,
          top: `${Math.min(props.position.y, window.innerHeight - 300)}px`,
          width: "240px",
        }}
      >
        <div class="flex flex-col gap-3">
          <div class="text-sm font-medium text-gray-700">Select Color</div>

          <HexColorPicker
            color={color()}
            onChange={handleColorChange}
            style={{ width: "200px", height: "200px" }}
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded border border-gray-300"
                style={{ "background-color": color() }}
              />
              <input
                type="text"
                value={color()}
                onInput={(e) => handleColorChange(e.currentTarget.value)}
                class="text-xs font-mono bg-gray-50 border border-gray-200 rounded px-2 py-1 w-20"
              />
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
