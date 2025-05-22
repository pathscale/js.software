import { createSignal, createEffect } from "solid-js";

export type ThemeValue = "light" | "dark";

const saved = localStorage.getItem("theme") as ThemeValue | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme: ThemeValue = saved || (prefersDark ? "dark" : "light");

const [theme, setTheme] = createSignal<ThemeValue>(initialTheme);

createEffect(() => {
  const current = theme();
  document.documentElement.dataset.theme = current;
  localStorage.setItem("theme", current);
});

export { theme, setTheme };
