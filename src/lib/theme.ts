import { createEffect, createSignal } from "solid-js";

export type ThemeValue = "light" | "dark";

/*
 * Dark unless the reader has said otherwise.
 *
 * The site is designed dark - it is the theme the whole palette was built
 * against - so an unset preference lands there rather than on the light
 * mirror. A saved choice still wins, and so does an explicit OS preference for
 * light.
 */
const getInitialTheme = (): ThemeValue => {
  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem("theme") as ThemeValue | null;
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const [theme, setTheme] = createSignal<ThemeValue>(getInitialTheme());

// Solid 2 splits an effect in two: the first function tracks and returns, the
// second acts on that value. The one-argument form throws MISSING_EFFECT_FN.
createEffect(
  () => theme(),
  (current) => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
    }
  },
);

export { setTheme, theme };

