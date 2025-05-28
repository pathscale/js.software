import { FiMoon, FiSun } from "solid-icons/fi";
import { setTheme, theme } from "./lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    console.log("Current theme:", theme());
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);

    setTimeout(() => {
      console.log("data-theme attribute:", document.documentElement.dataset.theme);
      console.log("CSS variables:", {
        baseContent: getComputedStyle(document.documentElement).getPropertyValue('--base-content'),
        base100: getComputedStyle(document.documentElement).getPropertyValue('--base-100')
      });
    }, 100);
  };

  return (
    <button
      onClick={toggleTheme}
      class="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme() === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
