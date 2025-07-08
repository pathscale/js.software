import { Component, createSignal, For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Dropdown } from "@pathscale/ui";

export interface CompactNavigationProps {
  className?: string;
}

export const CompactNavigation: Component<CompactNavigationProps> = (props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(false);

  // Simplified navigation for compact view
  const navigationItems = [
    { title: "Overview", href: "/docs" },
    { title: "Components", href: "/docs/components" },
    { title: "Theming", href: "/docs/theming" },
    { title: "Guides", href: "/docs/guides" },
  ];

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const item = navigationItems.find((item) =>
      currentPath.startsWith(item.href)
    );
    return item?.title || "Documentation";
  };

  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div class={`md:hidden ${props.className || ""}`}>
      <Dropdown>
        <Dropdown.Toggle
          class="w-full flex items-center justify-between px-4 py-3 bg-base-100 border border-chromatic-border rounded-lg text-left"
          button={false}
        >
          <span class="font-medium ">Docs » {getCurrentPageTitle()}</span>
          <ChevronDownIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu class="w-full mt-2 border border-chromatic-border shadow-chromatic-lg">
          <For each={navigationItems}>
            {(item) => (
              <a
                href={item.href}
                class={`block px-4 py-3 text-sm transition-colors border-b border-chromatic-border last:border-b-0
                  ${
                    location.pathname.startsWith(item.href)
                      ? "bg-chromatic-primary/10 text-chromatic-primary font-medium"
                      : " hover:bg-base-200"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            )}
          </For>

          {/* Additional links */}
          <div class="border-t border-chromatic-border">
            <a
              href="/resources"
              class="block px-4 py-3 text-sm text-chromatic-muted hover: hover:bg-base-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </a>
            <a
              href="https://github.com/pathscale/ui"
              target="_blank"
              rel="noopener noreferrer"
              class="block px-4 py-3 text-sm text-chromatic-muted hover: hover:bg-base-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </a>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CompactNavigation;
