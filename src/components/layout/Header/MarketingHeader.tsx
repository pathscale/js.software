import { Component, createSignal, For, Show, createMemo } from "solid-js";
import { Navbar, Button, Flex } from "@pathscale/ui";
import { useLocation } from "@solidjs/router";
import Search from "../../content/Search";
import {
  FiTool,
  FiZap,
  FiBarChart2,
  FiCompass,
  FiMessageCircle,
  FiEdit3,
  FiGrid,
  FiSmartphone,
} from "solid-icons/fi";

export interface MarketingHeaderProps {
  className?: string;
}

export const MarketingHeader: Component<MarketingHeaderProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeCategory, setActiveCategory] = createSignal<string | null>(null);
  const location = useLocation();

  // Navigation structure for @pathscale/ui documentation
  const navigationCategories = [
    {
      title: "Utils",
      icon: FiTool,
      items: [
        { title: "Theming", href: "/theming" },
        { title: "SVG Background", href: "/svg-background" },
      ],
    },
    {
      title: "Actions",
      icon: FiZap,
      items: [
        { title: "Button", href: "/button" },
        { title: "Dropdown", href: "/dropdown" },
        { title: "Modal", href: "/modal" },
        { title: "Swap", href: "/swap" },
        { title: "Copy Button", href: "/copy-button" },
      ],
    },
    {
      title: "Data Display",
      icon: FiBarChart2,
      items: [
        { title: "Accordion", href: "/accordion" },
        { title: "Avatar", href: "/avatar" },
        { title: "Badge", href: "/badge" },
        { title: "Card", href: "/card" },
        { title: "Carousel", href: "/carousel" },
        { title: "Chat Bubble", href: "/chat-bubble" },
        { title: "Collapse", href: "/collapse" },
        { title: "Countdown", href: "/countdown" },
        { title: "Diff", href: "/diff" },
        { title: "Icon", href: "/icon" },
        { title: "Kbd", href: "/kbd" },
        { title: "Stats", href: "/stats" },
        { title: "Table", href: "/table" },
        { title: "Timeline", href: "/timeline" },
        { title: "Code Mockup", href: "/codemockup" },
        { title: "Rating", href: "/rating" },
      ],
    },
    {
      title: "Navigation",
      icon: FiCompass,
      items: [
        { title: "Breadcrumb", href: "/breadcrumb" },
        { title: "Dock", href: "/dock" },
        { title: "Link", href: "/link" },
        { title: "Menu", href: "/menu" },
        { title: "Navbar", href: "/navbar" },
        { title: "Pagination", href: "/pagination" },
        { title: "Steps", href: "/steps" },
        { title: "Tabs", href: "/tabs" },
        { title: "Sidenav", href: "/sidenav" },
      ],
    },
    {
      title: "Feedback",
      icon: FiMessageCircle,
      items: [
        { title: "Alert", href: "/alert" },
        { title: "Loading", href: "/loading" },
        { title: "Progress", href: "/progress" },
        { title: "Radial Progress", href: "/radial-progress" },
        { title: "Skeleton", href: "/skeleton" },
        { title: "Toast", href: "/toast" },
        { title: "Tooltip", href: "/tooltip" },
      ],
    },
    {
      title: "Data Input",
      icon: FiEdit3,
      items: [
        { title: "Calendar", href: "/calendar" },
        { title: "Checkbox", href: "/checkbox" },
        { title: "File Input", href: "/file-input" },
        { title: "Form", href: "/form" },
        { title: "Input", href: "/input" },
        { title: "Radio", href: "/radio" },
        { title: "Range", href: "/range" },
        { title: "Select", href: "/select" },
        { title: "Textarea", href: "/textarea" },
        { title: "Toggle", href: "/toggle" },
        { title: "Join", href: "/join" },
      ],
    },
    {
      title: "Layout",
      icon: FiGrid,
      items: [
        { title: "Divider", href: "/divider" },
        { title: "Drawer", href: "/drawer" },
        { title: "Flex", href: "/flex" },
        { title: "Footer", href: "/footer" },
        { title: "Grid", href: "/grid" },
        { title: "Hero", href: "/hero" },
        { title: "Indicator", href: "/indicator" },
        { title: "Mask", href: "/mask" },
        { title: "Stack", href: "/stack" },
        { title: "Background", href: "/background" },
      ],
    },
    {
      title: "Mockup",
      icon: FiSmartphone,
      items: [
        { title: "Artboard", href: "/artboard" },
        { title: "Browser Mockup", href: "/browsermockup" },
        { title: "Code Mockup", href: "/codemockup" },
        { title: "Phone Mockup", href: "/phonemockup" },
        { title: "Window Mockup", href: "/windowmockup" },
      ],
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const activeCat = createMemo(() => {
    const currentPath = location.pathname;
    return navigationCategories.find((cat) =>
      cat.items.some((item) => item.href === currentPath)
    );
  });

  const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <Navbar.Stack class={`sticky top-0 z-50 ${props.className || ""}`}>
      {/* Level 1: Main Navigation */}
      <Navbar.Row class="bg-base-100 shadow-sm px-4 py-1.5">
        {/* Mobile hamburger */}
        <Navbar.Start class="lg:hidden">
          <Button
            color="ghost"
            shape="square"
            onClick={() => setIsOpen(!isOpen())}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </Button>
        </Navbar.Start>

        {/* Logo */}
        <Navbar.Start class="hidden lg:flex">
          <a
            href="/"
            class="text-xl font-bold normal-case hover:text-primary transition-colors px-4 py-2"
          >
            @pathscale/ui
          </a>
        </Navbar.Start>

        {/* Center logo for mobile */}
        <Navbar.Center class="lg:hidden">
          <a href="/" class="text-xl font-bold normal-case px-4 py-2">
            @pathscale/ui
          </a>
        </Navbar.Center>

        {/* Main Categories - Desktop */}
        <Navbar.Center class="hidden lg:flex">
          <Flex gap="md" align="center">
            <For each={navigationCategories}>
              {(category) => (
                <Button
                  color="ghost"
                  size="lg"
                  onClick={() => {
                    setActiveCategory(
                      activeCategory() === category.title
                        ? null
                        : category.title
                    );
                  }}
                  class={`px-3 py-2 rounded-lg transition-colors font-medium text-base ${
                    activeCategory() === category.title ||
                    (!activeCategory() &&
                      activeCat() &&
                      activeCat()!.title === category.title)
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-base-200"
                  }`}
                >
                  <category.icon size={18} class="mr-2 inline-block" />
                  {category.title}
                </Button>
              )}
            </For>
          </Flex>
        </Navbar.Center>

        {/* Right side actions */}
        <Navbar.End class="hidden lg:flex">
          <Flex gap="md" align="center">
            <a
              href="https://github.com/pathscale/ui"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary p-2 rounded-full transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href="/docs/installation"
              class="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Get Started
            </a>
          </Flex>
        </Navbar.End>

        {/* Mobile menu end */}
        <Navbar.End class="lg:hidden">
          <a
            href="https://github.com/pathscale/ui"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full"
          >
            <GitHubIcon />
          </a>
        </Navbar.End>
      </Navbar.Row>

      {/* Level 2: Category Items - Hidden on mobile */}
      <Show when={activeCategory() || activeCat()}>
        {(() => {
          const category = navigationCategories.find(
            (cat) => cat.title === (activeCategory() || activeCat()?.title)
          );
          return (
            <Navbar.Row class="hidden lg:block bg-base-200 border-t border-base-300 px-4 py-2">
              <Flex wrap="wrap" gap="sm" align="center">
                <For each={category?.items || []}>
                  {(item) => (
                    <a
                      href={item.href}
                      class={`px-3 py-1 rounded-md text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "hover:bg-base-300"
                      }`}
                    >
                      {item.title}
                    </a>
                  )}
                </For>
              </Flex>
            </Navbar.Row>
          );
        })()}
      </Show>

      {/* Mobile Sidebar */}
      <Show when={isOpen()}>
        <div class="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            class="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div class="fixed top-0 left-0 h-screen w-80 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div class="flex flex-col h-screen">
              {/* Header */}
              <div class="flex items-center justify-between p-4 border-b border-base-300">
                <span class="text-xl font-bold">@pathscale/ui</span>
                <Button
                  color="ghost"
                  size="sm"
                  shape="circle"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {/* Search */}
              <div class="p-4 border-b border-base-300">
                <Search />
              </div>

              {/* Navigation */}
              <div class="flex-1 overflow-y-auto p-4">
                <div class="space-y-6">
                  <For each={navigationCategories}>
                    {(category) => (
                      <div>
                        <div class="font-semibold text-base-content mb-3 flex items-center">
                          <category.icon size={16} class="mr-2 inline-block" />
                          {category.title}
                        </div>
                        <div class="space-y-2">
                          <For each={category.items}>
                            {(item) => (
                              <a
                                href={item.href}
                                class={`block px-3 py-2 rounded-lg transition-colors ${
                                  isActive(item.href)
                                    ? "bg-primary text-white"
                                    : "text-base-content/70 hover:bg-base-200"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {item.title}
                              </a>
                            )}
                          </For>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Footer */}
              <div class="p-4 border-t border-base-300">
                <a
                  href="/docs/installation"
                  class="block w-full bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-center transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Navbar.Stack>
  );
};

export default MarketingHeader;
