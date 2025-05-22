import { theme, setTheme } from "./lib/theme";
import { FiSun, FiMoon } from "solid-icons/fi";

export default function ThemeToggle() {
  const toggleTheme = () => {
    setTheme(theme() === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-lg hover:bg-[hsl(var(--color-bg-secondary))] transition-colors"
      aria-label="Toggle theme"
    >
      {theme() === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
