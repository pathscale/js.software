import { createSignal, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { routes } from "./routes";
import { FiMenu, FiX } from "solid-icons/fi";
import ThemeToggle from "./ThemeToggle";
import clsx from "clsx";

export default function Sidebar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen());

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        class="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
        aria-label="Toggle menu"
      >
        <Show when={isOpen()} fallback={<FiMenu size={24} />}>
          <FiX size={24} />
        </Show>
      </button>

      {/* Sidebar */}
      <aside
        class={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-gray-200 dark:border-gray-700 shadow-lg",
          {
            "translate-x-0": isOpen(),
            "-translate-x-full": !isOpen(),
          }
        )}
      >
        <div class="h-full flex flex-col">
          {/* Logo/Title */}
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div class="flex items-center justify-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
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
                  "block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  {
                    "bg-gray-100 dark:bg-gray-700 font-medium":
                      location.pathname === route.path,
                  }
                )}
              >
                {route.name}
              </A>
            ))}
          </nav>

          {/* Theme toggle in footer */}
          <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">Theme</span>
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
