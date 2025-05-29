import { createSignal, Show, For } from "solid-js";
import { useLocation, A } from "@solidjs/router";
import { clsx } from "clsx";
import { FiMenu, FiX } from "solid-icons/fi";
import { Sidenav, type SidenavItem } from "@pathscale/ui"; // Adjust import path as needed
import ThemeToggle from "./ThemeToggle"; // Adjust import path as needed
import { routes } from "./routes";

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen());

  const sidenavItems = (): SidenavItem[] =>
    routes.map((route) => ({
      id: route.path,
      label: route.name,
      href: route.path,
      active: location.pathname === route.path,
    }));

  return (
    <>
      <button
        onClick={toggleSidebar}
        class="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-[oklch(var(--color-base-200))] shadow-md"
        aria-label="Toggle menu"
      >
        <Show when={isOpen()} fallback={<FiMenu size={24} />}>
          <FiX size={24} />
        </Show>
      </button>

      {/* Sidebar using new Sidenav component */}
      <div class="fixed inset-y-0 left-0 z-40">
        <Sidenav
          title="UI Components"
          items={sidenavItems()}
          isOpen={isOpen()}
          onClose={() => setIsOpen(false)}
          footer={
            <div class="p-4 bg-[oklch(var(--color-base-200))] flex justify-between items-center">
              <span class="text-sm text-[oklch(var(--color-base-content)/0.7)]">
                Theme
              </span>
              <ThemeToggle />
            </div>
          }
          class="h-full bg-[oklch(var(--color-base-100))] border-r border-[oklch(var(--color-base-300))] shadow-lg"
        />
      </div>

      {/* Backdrop for mobile */}
      <Show when={isOpen()}>
        <div
          class="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      </Show>
    </>
  );
}
