import { createSignal, createEffect, For } from "solid-js";
import { Button, Dialog } from "@pathscale/ui";
import { MATERIAL_COLORS } from "../../utils/themeUtils";

interface ColorPickerPopoverProps {
  open: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  initialColor: string;
  position: { x: number; y: number };
}

export default function ColorPickerPopover(props: ColorPickerPopoverProps) {
  const [color, setColor] = createSignal(props.initialColor);

  // Solid 2 splits an effect in two: the first function tracks and returns,
  // the second acts on that value. The one-argument form throws
  // MISSING_EFFECT_FN.
  createEffect(
    () => props.initialColor,
    (initial) => {
      setColor(initial);
    },
  );

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    props.onColorSelect(selectedColor);
  };

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => {
        if (!open) props.onClose();
      }}
      backdrop="opaque"
      placement="center"
      shouldCloseOnEsc
      shouldCloseOnBackdropClick
    >
      <Dialog.Content>
        <Dialog.Body>
          <div class="grid grid-cols-10 w-full" role="group" aria-label="Material colors">
            <For each={Object.entries(MATERIAL_COLORS)}>
              {([colorName, colorValue]) => (
                <Button
                  id={`theme-material-${colorName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  variant="plain"
                  flavor="neutral"
                  size="xs"
                  width="full"
                  radius="none"
                  class="appearance-none cursor-pointer w-full !min-h-4 !p-0"
                  aria-label={colorName}
                  aria-pressed={color() === colorValue ? "true" : "false"}
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
                </Button>
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
        </Dialog.Body>
        <Dialog.Footer class="bg-base-100">
          <Button id="theme-color-picker-done" onClick={props.onClose} flavor="primary">
            Done
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
