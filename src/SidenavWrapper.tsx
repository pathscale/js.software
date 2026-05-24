// TODO[ui-1.2.2]: Sidenav family removed from @pathscale/ui; replaced with plain HTML/Tailwind nav
import { A, useLocation } from "@solidjs/router";
import { FiMenu, FiX } from "solid-icons/fi";
import { createEffect, createSignal, For, Show, onMount, onCleanup } from "solid-js";

import { Button } from "@pathscale/ui";

import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; items: NavLink[] };

const HOME: NavLink = { href: "/", label: "Home" };

const GROUPS: NavGroup[] = [
  {
    label: "Utils",
    items: [
      { href: "/theming", label: "Theming" },
      { href: "/svg-background", label: "SVG Background" },
    ],
  },
  {
    label: "Actions",
    items: [
      { href: "/button", label: "Button" },
      { href: "/dropdown", label: "Dropdown" },
      { href: "/modal", label: "Modal" },
      { href: "/swap", label: "Swap" },
      { href: "/copy-button", label: "Copy Button" },
    ],
  },
  {
    label: "Data Display",
    items: [
      { href: "/accordion", label: "Accordion" },
      { href: "/avatar", label: "Avatar" },
      { href: "/badge", label: "Badge" },
      { href: "/card", label: "Card" },
      { href: "/carousel", label: "Carousel" },
      { href: "/chat-bubble", label: "Chat Bubble" },
      { href: "/collapse", label: "Collapse" },
      { href: "/countdown", label: "Countdown" },
      { href: "/diff", label: "Diff" },
      { href: "/icon", label: "Icon" },
      { href: "/kbd", label: "Kbd" },
      { href: "/stats", label: "Stats" },
      { href: "/table", label: "Table" },
      { href: "/timeline", label: "Timeline" },
      { href: "/codemockup", label: "Code Mockup" },
      { href: "/rating", label: "Rating" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { href: "/breadcrumb", label: "Breadcrumb" },
      { href: "/dock", label: "Dock" },
      { href: "/link", label: "Link" },
      { href: "/menu", label: "Menu" },
      { href: "/navbar", label: "Navbar" },
      { href: "/pagination", label: "Pagination" },
      { href: "/steps", label: "Steps" },
      { href: "/tabs", label: "Tabs" },
      { href: "/sidenav", label: "Sidenav" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { href: "/alert", label: "Alert" },
      { href: "/loading", label: "Loading" },
      { href: "/progress", label: "Progress" },
      { href: "/radial-progress", label: "Radial Progress" },
      { href: "/skeleton", label: "Skeleton" },
      { href: "/toast", label: "Toast" },
      { href: "/tooltip", label: "Tooltip" },
    ],
  },
  {
    label: "Data Input",
    items: [
      { href: "/calendar", label: "Calendar" },
      { href: "/checkbox", label: "Checkbox" },
      { href: "/file-input", label: "File Input" },
      { href: "/form", label: "Form" },
      { href: "/input", label: "Input" },
      { href: "/radio", label: "Radio" },
      { href: "/range", label: "Range" },
      { href: "/select", label: "Select" },
      { href: "/textarea", label: "Textarea" },
      { href: "/toggle", label: "Toggle" },
      { href: "/join", label: "Join" },
    ],
  },
  {
    label: "Layout",
    items: [
      { href: "/divider", label: "Divider" },
      { href: "/drawer", label: "Drawer" },
      { href: "/flex", label: "Flex" },
      { href: "/footer", label: "Footer" },
      { href: "/grid", label: "Grid" },
      { href: "/hero", label: "Hero" },
      { href: "/indicator", label: "Indicator" },
      { href: "/mask", label: "Mask" },
      { href: "/stack", label: "Stack" },
      { href: "/background", label: "Background" },
    ],
  },
  {
    label: "Mockup",
    items: [
      { href: "/artboard", label: "Artboard" },
      { href: "/browsermockup", label: "Browser Mockup" },
      { href: "/codemockup", label: "Code Mockup" },
      { href: "/phonemockup", label: "Phone Mockup" },
      { href: "/windowmockup", label: "Window Mockup" },
    ],
  },
];

export default function SidenavWrapper() {
  const [isOpen, setIsOpen] = createSignal(true);
  const location = useLocation();
  const [activePath, setActivePath] = createSignal(location.pathname);
  const [isDesktop, setIsDesktop] = createSignal(true);

  const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 1024);

  onMount(() => {
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
  });

  onCleanup(() => window.removeEventListener("resize", checkIfDesktop));

  createEffect(() => setActivePath(location.pathname));
  createEffect(() => setIsOpen(isDesktop()));

  const toggleSidebar = () => setIsOpen(!isOpen());

  const linkClass = (href: string) =>
    activePath() === href
      ? "block px-3 py-1.5 rounded-md text-sm font-medium bg-base-200 text-base-content"
      : "block px-3 py-1.5 rounded-md text-sm text-base-content/80 hover:bg-base-200 hover:text-base-content";

  return (
    <div class="fixed z-50">
      <Button
        onClick={toggleSidebar}
        class="lg:hidden fixed top-4 right-4 p-2 rounded-lg z-50"
        aria-label="Toggle menu"
      >
        <Show when={isOpen()} fallback={<FiMenu size={24} />}>
          <FiX size={24} />
        </Show>
      </Button>

      <Show when={isOpen()}>
        <aside class="fixed inset-y-0 left-0 w-64 bg-base-100 border-r border-base-300 flex flex-col z-40">
          <header class="p-4 border-b border-base-300">
            <h2 class="text-base font-semibold">UI Components</h2>
          </header>

          <nav class="flex-1 overflow-y-auto px-2 py-3 space-y-4">
            <A noScroll href={HOME.href} class={linkClass(HOME.href)}>
              {HOME.label}
            </A>

            <For each={GROUPS}>
              {(group) => (
                <div class="space-y-1">
                  <div class="px-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                    {group.label}
                  </div>
                  <For each={group.items}>
                    {(item) => (
                      <A noScroll href={item.href} class={linkClass(item.href)}>
                        {item.label}
                      </A>
                    )}
                  </For>
                </div>
              )}
            </For>
          </nav>

          <footer class="p-4 bg-base-200 flex justify-between items-center">
            <span class="text-sm text-base-content/70">Theme</span>
            <ThemeToggle />
          </footer>
        </aside>
      </Show>
    </div>
  );
}
