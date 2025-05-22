import { onMount } from "solid-js";
import { FiSun, FiMoon } from "solid-icons/fi";
import { theme, setTheme } from "./lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const next = theme() === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

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

  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme() === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
