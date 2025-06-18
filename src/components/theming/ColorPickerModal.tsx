import { createSignal, createEffect } from "solid-js";
import { Modal, Button } from "@pathscale/ui";
import { DefaultColorPicker } from "@thednp/solid-color-picker";
import "@thednp/solid-color-picker/style.css";

interface ColorPickerModalProps {
  open: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  initialColor?: string;
}

export default function ColorPickerModal(props: ColorPickerModalProps) {
  const [currentColor, setCurrentColor] = createSignal(props.initialColor || "#ffffff");

  createEffect(() => {
    if (props.initialColor) {
      setCurrentColor(props.initialColor);
    }
  });

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleConfirm = () => {
    props.onColorSelect(currentColor());
    props.onClose();
  };

  return (
    <Modal 
      open={props.open} 
      onClose={props.onClose}
      backdrop
      position="middle"
      closeOnEsc
      closeOnOutsideClick
    >
      <Modal.Header>
        <h3 class="text-lg font-medium">Select Color</h3>
      </Modal.Header>
      <Modal.Body>
        <div class="flex flex-col gap-4">
          <DefaultColorPicker 
            value={currentColor()} 
            onChange={handleColorChange}
            class="mx-auto"
          />
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Selected:</span>
            <div 
              class="w-8 h-8 rounded border border-gray-300"
              style={{ "background-color": currentColor() }}
            />
            <span class="text-sm font-mono">{currentColor()}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions>
        <Button
          onClick={props.onClose}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
        >
          Select Color
        </Button>
      </Modal.Actions>
    </Modal>
  );
}