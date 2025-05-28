import { FiMoon, FiSun } from "solid-icons/fi";
import { setTheme, theme } from "./lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    setTheme(theme() === "light" ? "dark" : "light");
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
