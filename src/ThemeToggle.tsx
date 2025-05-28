import { FiMoon, FiSun } from "solid-icons/fi";
import { setTheme, theme } from "./lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-md bg-primary text-primary-content"
      aria-label="Toggle theme"
    >
      {theme() === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
