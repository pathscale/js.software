import { createSignal, createEffect, For } from "solid-js";
import { Button, Modal } from "@pathscale/ui";
import { MATERIAL_COLORS } from "../../utils/themeUtils";

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

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    props.onColorSelect(selectedColor);
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      backdrop
      position="middle"
      closeOnEsc
      closeOnOutsideClick
    >
      <Modal.Body>
        <div class="grid grid-cols-10 w-full" role="listbox">
          <For each={Object.entries(MATERIAL_COLORS)}>
            {([colorName, colorValue]) => (
              <button
                class="appearance-none cursor-pointer w-full"
                aria-label={colorName}
                aria-selected={color() === colorValue}
                onClick={() => handleColorSelect(colorValue)}
              >
                <div
                  class="relative grid h-4 place-items-center bg-transparent select-none cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    "background-color": colorValue,
                    "box-shadow":
                      color() === colorValue
                        ? "0 0 0 2px white, 0 0 0 4px black"
                        : "none",
                  }}
                  title={colorName}
                />
              </button>
            )}
          </For>
        </div>

        <div class="flex items-center gap-2 mt-4 mb-6">
          <div
            class="w-6 h-6 rounded border border-gray-300 shrink-0"
            style={{ "background-color": color() }}
          />
          <span class="text-xs font-mono text-gray-600 truncate max-w-32">
            {color()}
          </span>
        </div>
      </Modal.Body>
      <Modal.Actions class="bg-base-100">
        <Button onClick={props.onClose} color="primary">
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
