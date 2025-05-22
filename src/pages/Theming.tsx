import { createSignal, createEffect, onCleanup, onMount } from "solid-js";
import ShowcaseLayout from "../components/ShowcaseLayout";
import { theme, setTheme } from "../lib/theme";

export default function Theming() {
  const [hue, setHue] = createSignal(200);
  const [saturation, setSaturation] = createSignal(50);

  const lightness = () => (theme() === "light" ? 90 : 10);
  const labelClass = () => (theme() === "dark" ? "text-white" : "text-black");
  const valueClass = () =>
    theme() === "dark" ? "text-gray-300" : "text-gray-700";

  onMount(() => {
    const saved = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial =
      saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  });

  createEffect(() => {
    const hsl = `${hue()} ${saturation()}% ${lightness()}%`;
    document.documentElement.style.setProperty("--color-bg", hsl);
    document.documentElement.dataset.theme = theme();
    localStorage.setItem("theme", theme());
  });

  onCleanup(() => {
    document.documentElement.style.removeProperty("--color-bg");
  });

  return (
    <ShowcaseLayout>
      <div class="min-h-screen space-y-6 bg-[hsl(var(--color-bg)/1)] transition-colors">
        <div class="mt-4">
          <button
            onClick={() => setTheme(theme() === "light" ? "dark" : "light")}
            class="inline-flex items-center px-4 py-2 rounded border font-medium text-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            {theme() === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div class="grid gap-6 md:grid-cols-3 mt-4">
          <div>
            <label class={`block mb-1 text-sm font-medium ${labelClass()}`}>
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
              <span class={`text-sm w-10 ${valueClass()}`}>{hue()}</span>
            </div>
          </div>

          <div>
            <label class={`block mb-1 text-sm font-medium ${labelClass()}`}>
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
              <span class={`text-sm w-10 ${valueClass()}`}>
                {saturation()}%
              </span>
            </div>
          </div>

          <div>
            <label class={`block mb-1 text-sm font-medium ${labelClass()}`}>
              Lightness
            </label>
            <div class={`text-sm ${valueClass()}`}>{lightness()}%</div>
          </div>
        </div>
      </div>
    </ShowcaseLayout>
  );
}
