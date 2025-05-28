import { createEffect, createSignal } from "solid-js";

export type ThemeValue = "light" | "dark";

const saved = localStorage.getItem("theme") as ThemeValue | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme: ThemeValue = saved || (prefersDark ? "dark" : "light");

const [theme, setTheme] = createSignal<ThemeValue>(initialTheme);

let themeChangeCallbacks: (() => void)[] = [];

export const onThemeChange = (callback: () => void) => {
  themeChangeCallbacks.push(callback);
};

createEffect(() => {
  const current = theme();
  document.documentElement.dataset.theme = current;
  localStorage.setItem("theme", current);
  themeChangeCallbacks.forEach(callback => callback());
});

export { setTheme, theme };

