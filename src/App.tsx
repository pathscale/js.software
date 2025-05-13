import { Button } from "@pathscale/ui";
import type { ButtonVariantProps } from "@pathscale/ui/button";
import { createSignal, For } from "solid-js";

export default function App() {
  const [color, setColor] =
    createSignal<ButtonVariantProps["color"]>("primary");

  return (
    <div>
      <select
        name="color"
        id="color"
        value={color() ?? ""}
        onChange={(e) =>
          setColor(e.currentTarget.value as ButtonVariantProps["color"])
        }
      >
        <For
          each={[
            "inverse",
            "primary",
            "secondary",
            "tertiary",
            "accent",
            "positive",
            "destructive",
          ]}
        >
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
      <Button color={color()}>Button</Button>
    </div>
  );
}
