import { createEffect, createSignal, onMount } from "solid-js";
import ShowcaseLayout from "../components/ShowcaseLayout";
import { setTheme, theme } from "../lib/theme";
import {
  bgBody,
  bgCode,
  bgSecondary,
  fgBody,
  fgSecondary,
  primary,
  primaryFg,
} from "../lib/theme-colors";

export default function Theming() {
  const [hue, setHue] = createSignal(
    Number(localStorage.getItem("hue") || "210")
  );
  const [saturation, setSaturation] = createSignal(
    Number(localStorage.getItem("saturation") || "60")
  );

  const applyThemeVars = () => {
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
    document.documentElement.style.setProperty("--tw-color-primary", primary());
    document.documentElement.style.setProperty(
      "--tw-color-primary-foreground",
      primaryFg()
    );
  };

  createEffect(() => {
    localStorage.setItem("hue", String(hue()));
    localStorage.setItem("saturation", String(saturation()));
    applyThemeVars();
  });

  onMount(() => {
    applyThemeVars();
  });

  return (
    <ShowcaseLayout>
      <div class="grid gap-6 md:grid-cols-3 mt-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-fg-body">Hue</label>
          <div class="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              value={hue()}
              onInput={(e) => setHue(+e.currentTarget.value)}
              class="w-full"
            />
            <div class="text-sm mt-1 text-fg-secondary">{hue()}</div>
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-fg-body">
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
            <div class="text-sm mt-1 text-fg-secondary">{saturation()}%</div>
          </div>
        </div>

        <div>
          <button
            onClick={() => setTheme(theme() === "light" ? "dark" : "light")}
            class="inline-flex items-center px-4 py-2 rounded border font-medium text-sm bg-body text-fg-body hover:bg-bg-secondary transition-colors"
          >
            {theme() === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </ShowcaseLayout>
  );
}
// import { createSignal, onMount, createEffect } from "solid-js";
// import ShowcaseLayout from "../components/ShowcaseLayout";
// import { theme, setTheme } from "../lib/theme";

// export default function Theming() {
//   const [hue, setHue] = createSignal(210);
//   const [saturation, setSaturation] = createSignal(60);

//   onMount(() => {
//     const storedHue = localStorage.getItem("theme-hue");
//     const storedSaturation = localStorage.getItem("theme-saturation");

//     if (storedHue) setHue(+storedHue);
//     if (storedSaturation) setSaturation(+storedSaturation);
//   });

//   createEffect(() => {
//     const h = hue();
//     const s = saturation();

//     document.documentElement.style.setProperty("--hue", h.toString());
//     document.documentElement.style.setProperty("--saturation", `${s}%`);

//     localStorage.setItem("theme-hue", h.toString());
//     localStorage.setItem("theme-saturation", s.toString());
//   });

//   return (
//     <ShowcaseLayout>
//       <div class="grid gap-6 md:grid-cols-3 mt-4">
//         <div>
//           <label class="block mb-1 text-sm font-medium text-[hsl(var(--color-fg-body))]">
//             Hue
//           </label>
//           <div class="flex items-center gap-2">
//             <input
//               type="range"
//               min="0"
//               max="360"
//               value={hue()}
//               onInput={(e) => setHue(+e.currentTarget.value)}
//               class="w-full"
//             />
//             <div class="text-sm mt-1 text-[hsl(var(--color-fg-secondary))]">
//               {hue()}
//             </div>
//           </div>
//         </div>

//         <div>
//           <label class="block mb-1 text-sm font-medium text-[hsl(var(--color-fg-body))]">
//             Saturation
//           </label>
//           <div class="flex items-center gap-2">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={saturation()}
//               onInput={(e) => setSaturation(+e.currentTarget.value)}
//               class="w-full"
//             />
//             <div class="text-sm mt-1 text-[hsl(var(--color-fg-secondary))]">
//               {saturation()}%
//             </div>
//           </div>
//         </div>

//         <div>
//           <button
//             onClick={() => {
//               const next = theme() === "light" ? "dark" : "light";
//               setTheme(next);
//               document.documentElement.dataset.theme = next;
//               localStorage.setItem("theme", next);
//             }}
//             class="inline-flex items-center px-4 py-2 rounded border font-medium text-sm bg-[hsl(var(--color-bg-secondary))] text-[hsl(var(--color-fg-body))]"
//           >
//             {theme() === "light" ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//       </div>
//     </ShowcaseLayout>
//   );
// }

