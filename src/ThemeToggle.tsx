import { createSignal, onMount } from "solid-js";
import { FiSun, FiMoon } from "solid-icons/fi";

export default function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(false);

  const toggleTheme = () => {
    const newTheme = !isDark();
    setIsDark(newTheme);
    document.documentElement.dataset.theme = newTheme ? "dark" : "light";
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  onMount(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(initialTheme);
    document.documentElement.dataset.theme = initialTheme ? "dark" : "light";
  });

  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark() ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
