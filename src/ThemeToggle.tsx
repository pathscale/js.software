import { Button, Icon } from "@pathscale/ui";
import { setTheme, theme } from "./lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="solid"
      flavor="primary"
      size="sm"
      width="square"
      radius="md"
      aria-label="Switch theme"
    >
      {theme() === "dark" ? <Icon src="icon-[lucide--sun]" width={20} height={20} /> : <Icon src="icon-[lucide--moon]" width={20} height={20} />}
    </Button>
  );
}
