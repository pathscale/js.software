import { createSignal } from "solid-js";
import ShowcaseLayout from "../components/ShowcaseLayout";

export default function Theming() {
  const [hue, setHue] = createSignal(200);
  const [saturation, setSaturation] = createSignal(50);
  const [lightness, setLightness] = createSignal(50);

  const backgroundColor = () =>
    `hsl(${hue()}, ${saturation()}%, ${lightness()}%)`;

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <label class="block mb-1 text-sm font-medium">Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue()}
              onInput={(e) => setHue(Number(e.currentTarget.value))}
              class="w-full"
            />
            <div class="text-sm mt-1 text-gray-600 dark:text-gray-400">
              {hue()}
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium">Saturation</label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation()}
              onInput={(e) => setSaturation(Number(e.currentTarget.value))}
              class="w-full"
            />
            <div class="text-sm mt-1 text-gray-600 dark:text-gray-400">
              {saturation()}%
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium">Lightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness()}
              onInput={(e) => setLightness(Number(e.currentTarget.value))}
              class="w-full"
            />
            <div class="text-sm mt-1 text-gray-600 dark:text-gray-400">
              {lightness()}%
            </div>
          </div>
        </div>

        <div
          class="rounded-lg h-32 transition-all duration-300 border"
          style={{ "background-color": backgroundColor() }}
        />
      </div>
    </ShowcaseLayout>
  );
}
