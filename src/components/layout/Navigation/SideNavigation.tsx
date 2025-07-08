import { Component, createSignal, createEffect, For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";

export interface NavigationItem {
  title: string;
  href?: string;
  icon?: string;
  children?: NavigationItem[];
  badge?: string;
  isNew?: boolean;
}

export interface NavigationGroup {
  title: string;
  icon: string;
  children: NavigationItem[];
  defaultOpen?: boolean;
}

export interface SideNavigationProps {
  className?: string;
}

export const SideNavigation: Component<SideNavigationProps> = (props) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = createSignal<Set<string>>(
    new Set(["Overview", "Components"])
  );

  // Navigation structure based on Chromatic's sidebar with all component links
  const navigationGroups: NavigationGroup[] = [
    {
      title: "Overview",
      icon: "📖",
      defaultOpen: true,
      children: [
        { title: "Home", href: "/" },
        { title: "Documentation", href: "/docs" },
      ],
    },
    {
      title: "Utils",
      icon: "🔧",
      children: [
        { title: "Theming", href: "/theming" },
        { title: "SVG Background", href: "/svg-background" },
      ],
    },
    {
      title: "Actions",
      icon: "⚡",
      children: [
        { title: "Button", href: "/button" },
        { title: "Dropdown", href: "/dropdown" },
        { title: "Modal", href: "/modal" },
        { title: "Swap", href: "/swap" },
        { title: "Copy Button", href: "/copy-button" },
      ],
    },
    {
      title: "Data Display",
      icon: "📊",
      children: [
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
      icon: "🧭",
      children: [
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
      icon: "💬",
      children: [
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
      icon: "📝",
      children: [
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
      icon: "📐",
      children: [
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
      icon: "📱",
      children: [
        { title: "Artboard", href: "/artboard" },
        { title: "Browser Mockup", href: "/browsermockup" },
        { title: "Code Mockup", href: "/codemockup" },
        { title: "Phone Mockup", href: "/phonemockup" },
        { title: "Window Mockup", href: "/windowmockup" },
      ],
    },
  ];

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupTitle)) {
        newSet.delete(groupTitle);
      } else {
        newSet.add(groupTitle);
      }
      return newSet;
    });
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isGroupActive = (group: NavigationGroup) => {
    return group.children.some(
      (item) => item.href && location.pathname.startsWith(item.href)
    );
  };

  // Auto-expand active groups
  createEffect(() => {
    const currentPath = location.pathname;
    navigationGroups.forEach((group) => {
      const hasActiveChild = group.children.some(
        (item) => item.href && currentPath.startsWith(item.href)
      );
      if (hasActiveChild) {
        setExpandedGroups((prev) => new Set([...prev, group.title]));
      }
    });
  });

  const ChevronIcon = (props: { isOpen: boolean }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class={`transition-transform duration-200 ${
        props.isOpen ? "rotate-90" : ""
      }`}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );

  return (
    <nav
      class={`w-full h-full overflow-y-auto px-4 py-6 ${props.className || ""}`}
    >
      <div class="space-y-2">
        <For each={navigationGroups}>
          {(group) => {
            const isExpanded = () => expandedGroups().has(group.title);
            const isActiveGroup = () => isGroupActive(group);

            return (
              <div class="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.title)}
                  class={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors
                    ${
                      isActiveGroup()
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-base-200"
                    }`}
                >
                  <span class="text-lg">{group.icon}</span>
                  <span class="flex-1 font-medium">{group.title}</span>
                  <ChevronIcon isOpen={isExpanded()} />
                </button>

                {/* Group Items */}
                <Show when={isExpanded()}>
                  <div class="ml-8 space-y-1">
                    <For each={group.children}>
                      {(item) => (
                        <a
                          href={item.href}
                          class={`block px-3 py-2 text-sm rounded-lg transition-colors
                            ${
                              isActive(item.href || "")
                                ? "bg-primary text-white font-medium"
                                : "text-base-content/70 hover:bg-base-200"
                            }`}
                        >
                          <div class="flex items-center justify-between">
                            <span>{item.title}</span>
                            <Show when={item.badge}>
                              <span class="px-2 py-1 text-xs bg-accent text-white rounded-full">
                                {item.badge}
                              </span>
                            </Show>
                            <Show when={item.isNew}>
                              <span class="px-2 py-1 text-xs bg-secondary text-white rounded-full">
                                New
                              </span>
                            </Show>
                          </div>
                        </a>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            );
          }}
        </For>
      </div>

      {/* Footer links */}
      <div class="mt-8 pt-6 border-t border-base-300">
        <div class="space-y-1">
          <a
            href="/resources"
            class="block px-3 py-2 text-sm text-base-content/70 hover:bg-base-200 rounded-lg transition-colors"
          >
            Resources
          </a>
          <a
            href="/community"
            class="block px-3 py-2 text-sm text-base-content/70 hover:bg-base-200 rounded-lg transition-colors"
          >
            Community
          </a>
          <a
            href="https://github.com/pathscale/ui"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-3 py-2 text-sm text-base-content/70 hover:bg-base-200 rounded-lg transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Version info */}
      <div class="mt-4 px-3 py-2 text-xs text-base-content/70">
        @pathscale/ui v0.0.83
      </div>
    </nav>
  );
};

export default SideNavigation;
