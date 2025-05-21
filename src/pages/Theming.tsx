import { createSignal, onCleanup } from "solid-js";

export default function ThemingPage() {
  const [h, setH] = createSignal(210);
  const [s, setS] = createSignal(60);
  const [l, setL] = createSignal(90);

  const color = () => `hsl(${h()}, ${s()}%, ${l()}%)`;

  const applyThemeColor = () => {
    document.documentElement.style.setProperty("--theme-bg", color());
  };

  applyThemeColor();
  onCleanup(() => {
    document.documentElement.style.removeProperty("--theme-bg");
  });

  return (
    <div
      class="min-h-screen p-6"
      style={{ "background-color": "var(--theme-bg)" }}
    >
      <h1 class="text-2xl font-bold mb-6 text-white">Theming Playground</h1>
      <div class="space-y-4 max-w-lg">
        <div>
          <label class="block text-white">Hue ({h()})</label>
          <input
            type="range"
            min="0"
            max="360"
            value={h()}
            onInput={(e) => {
              setH(+e.currentTarget.value);
              applyThemeColor();
            }}
          />
        </div>
        <div>
          <label class="block text-white">Saturation ({s()}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={s()}
            onInput={(e) => {
              setS(+e.currentTarget.value);
              applyThemeColor();
            }}
          />
        </div>
        <div>
          <label class="block text-white">Lightness ({l()}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={l()}
            onInput={(e) => {
              setL(+e.currentTarget.value);
              applyThemeColor();
            }}
          />
        </div>
      </div>
    </div>
  );
}
