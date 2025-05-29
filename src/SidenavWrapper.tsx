import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { FiMenu, FiX } from "solid-icons/fi";
import { Sidenav, type SidenavItem } from "@pathscale/ui";
import ThemeToggle from "./ThemeToggle";
import { routes } from "./routes";
import { Button } from "@pathscale/ui";
import clsx from "clsx";

export default function SidebarWrapper() {
  const [isOpen, setIsOpen] = createSignal(true);
  const [isDesktop, setIsDesktop] = createSignal(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen());

  const checkIfDesktop = (): void => {
    const viewportWidth = window.innerWidth;
    setIsDesktop(viewportWidth >= 1024);
  };

  onMount(() => {
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkIfDesktop);
  });

  createEffect(() => {
    if (isDesktop()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  const sidenavItems = (): SidenavItem[] =>
    routes.map((route) => ({
      id: route.path,
      label: route.name,
      href: route.path,
      active: location.pathname === route.path,
    }));

  return (
    <div class="fixed z-50">
      <Button
        onClick={toggleSidebar}
        class="lg:hidden fixed top-4 right-4 p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        <Show when={isOpen()} fallback={<FiMenu size={24} />}>
          <FiX size={24} />
        </Show>
      </Button>

      <Sidenav
        title="UI Components"
        items={sidenavItems()}
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        class={clsx({ "sidenav-desktop": isDesktop() })}
        footer={
          <div class="p-4 bg-[oklch(var(--color-base-200))] flex justify-between items-center">
            <span class="text-sm text-[oklch(var(--color-base-content)/0.7)]">
              Theme
            </span>
            <ThemeToggle />
          </div>
        }
      />
    </div>
  );
}
