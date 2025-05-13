import { Button } from "@pathscale/ui";
import type { ButtonVariantProps } from "@pathscale/ui/button";
import { createSignal, For } from "solid-js";

export default function App() {
  const [color, setColor] =
    createSignal<ButtonVariantProps["color"]>("primary");

  const colors: ButtonVariantProps["color"][] = [
    "inverse",
    "primary",
    "secondary",
    "tertiary",
    "accent",
    "positive",
    "destructive",
  ];

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 class="text-2xl font-bold">Button Color Showcase</h1>

      <div class="flex flex-col items-center gap-2">
        <label for="color" class="text-sm font-medium text-gray-700">
          Select Button Color
        </label>
        <select
          id="color"
          name="color"
          value={color()}
          onChange={(e) =>
            setColor(e.currentTarget.value as ButtonVariantProps["color"])
          }
          class="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <For each={colors}>
            {(c) => (
              <option value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            )}
          </For>
        </select>
      </div>

      <Button color={color()}>Button</Button>
    </div>
  );
}
