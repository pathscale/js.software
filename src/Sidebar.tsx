import { A, useLocation } from "@solidjs/router";
import clsx from "clsx";
import { FiMenu, FiX } from "solid-icons/fi";
import { createSignal, Show } from "solid-js";
import { routes } from "./routes";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen());

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        class="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-[hsl(var(--color-bg-body)/1)] shadow-md"
        aria-label="Toggle menu"
      >
        <Show when={isOpen()} fallback={<FiMenu size={24} />}>
          <FiX size={24} />
        </Show>
      </button>

      {/* Sidebar */}
      <aside
        class={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[hsl(var(--color-bg-body)/1)] transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-[hsl(var(--color-fg-body)/0.15)] shadow-lg",
          {
            "translate-x-0": isOpen(),
            "-translate-x-full": !isOpen(),
          }
        )}
      >
        <div class="h-full flex flex-col">
          {/* Logo/Title */}
          <div class="p-4 border-b border-[hsl(var(--color-fg-body)/0.15)] bg-[hsl(var(--color-bg-secondary)/1)]">
            <div class="flex items-center justify-center">
              <h1 class="text-xl font-bold text-[hsl(var(--color-fg-body)/1)]">
                UI Components
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav class="flex-1 overflow-y-auto p-4 space-y-1">
            {routes.map((route) => (
              <A
                href={route.path}
                class={clsx(
                  "block px-4 py-2 rounded-lg text-[hsl(var(--color-fg-body)/1)] hover:bg-[hsl(var(--color-bg-secondary)/1)] transition-colors",
                  {
                    "bg-[hsl(var(--color-bg-secondary)/1)] font-medium":
                      location.pathname === route.path,
                  }
                )}
              >
                {route.name}
              </A>
            ))}
          </nav>

          {/* Theme toggle in footer */}
          <div class="p-4 border-t border-[hsl(var(--color-fg-body)/0.15)] bg-[hsl(var(--color-bg-secondary)/1)] flex justify-between items-center">
            <span class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

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
