import { createSignal, createEffect, onCleanup, onMount } from "solid-js";
import ShowcaseLayout from "../components/ShowcaseLayout";
import { theme, setTheme } from "../lib/theme";

export default function Theming() {
  const [hue, setHue] = createSignal(210);
  const [saturation, setSaturation] = createSignal(60);
  const lightness = () => (theme() === "dark" ? 10 : 90);

  const hsl = function (h: number, s: number, l: number) {
    return `${h} ${s}% ${l}%`;
  };

  const baseHSL = () => hsl(hue(), saturation(), lightness());

  const bgBody = () => hsl(hue(), saturation(), theme() === "dark" ? 10 : 98);
  const fgBody = () => hsl(hue(), saturation(), theme() === "dark" ? 90 : 10);
  const primary = () => baseHSL();
  const primaryFg = () => hsl(hue(), saturation(), theme() === "dark" ? 95 : 5);
  const bgSecondary = () =>
    hsl(hue(), saturation(), theme() === "dark" ? 15 : 95);
  const fgSecondary = () =>
    hsl(hue(), saturation(), theme() === "dark" ? 80 : 30);
  const bgCode = () => hsl(hue(), saturation(), theme() === "dark" ? 8 : 96);

  createEffect(() => {
    document.documentElement.style.setProperty("--tw-color-primary", primary());
    document.documentElement.style.setProperty(
      "--tw-color-primary-foreground",
      primaryFg()
    );
    document.documentElement.style.setProperty("--color-bg-body", bgBody());
    document.documentElement.style.setProperty("--color-fg-body", fgBody());
    document.documentElement.style.setProperty(
      "--color-bg-secondary",
      bgSecondary()
    );
    document.documentElement.style.setProperty(
      "--color-fg-secondary",
      fgSecondary()
    );
    document.documentElement.style.setProperty("--color-bg-code", bgCode());
  });

  onCleanup(() => {
    const vars = [
      "--tw-color-primary",
      "--tw-color-primary-foreground",
      "--color-bg-body",
      "--color-fg-body",
    ];
    vars.forEach((v) => document.documentElement.style.removeProperty(v));
  });

  return (
    <ShowcaseLayout>
      <div class="grid gap-6 md:grid-cols-3 mt-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-800">
            Hue
          </label>
          <div class="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              value={hue()}
              onInput={(e) => setHue(+e.currentTarget.value)}
              class="w-full"
            />
            <div class="text-sm mt-1 text-gray-600">{hue()}</div>
          </div>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-800">
            Saturation
          </label>
          <div class="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={saturation()}
              onInput={(e) => setSaturation(+e.currentTarget.value)}
              class="w-full"
            />
            <div class="text-sm mt-1 text-gray-600">{saturation()}%</div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setTheme(theme() === "light" ? "dark" : "light")}
            class="inline-flex items-center px-4 py-2 rounded border font-medium text-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            {theme() === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </ShowcaseLayout>
  );
}
