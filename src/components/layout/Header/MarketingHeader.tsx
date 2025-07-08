import { Component, createSignal, For } from "solid-js";
import { Navbar, Button, Dropdown, Flex, Link } from "@pathscale/ui";
import Search from "../../content/Search";

export interface MarketingHeaderProps {
  className?: string;
}

export const MarketingHeader: Component<MarketingHeaderProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  // Navigation structure for @pathscale/ui documentation
  const platformItems = [
    {
      title: "Components",
      href: "/docs/components",
      description: "Explore all available UI components",
    },
    {
      title: "Theming",
      href: "/theming",
      description: "Customize colors, fonts, and design tokens",
    },
    {
      title: "Installation",
      href: "/docs/installation",
      description: "Get started with @pathscale/ui",
    },
  ];

  const navLinks = [
    { title: "Docs", href: "/docs" },
    { title: "Components", href: "/docs/components" },
    { title: "Showcases", href: "/showcases" },
  ];

  const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <Navbar class={`sticky top-0 z-50 ${props.className || ""}`}>
      {/* Mobile menu button */}
      <Navbar.Start class="lg:hidden">
        <Button
          color="ghost"
          shape="square"
          onClick={() => setIsOpen(!isOpen())}
          class=""
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

      {/* Main navigation - Desktop */}
      <Navbar.Center class="hidden lg:flex">
        <Flex gap="lg" align="center">
          {/* Platform Dropdown */}
          <Dropdown>
            <Dropdown.Toggle
              class="hover:text-primary px-4 py-2 flex items-center gap-1 cursor-pointer"
              button={false}
            >
              Platform
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
            </Dropdown.Toggle>
            <Dropdown.Menu class="w-80 mt-2 p-4 border border-base-300 shadow-lg">
              <For each={platformItems}>
                {(item) => (
                  <a
                    href={item.href}
                    class="block p-3 rounded-lg hover:bg-base-200 transition-colors"
                  >
                    <div class="font-semibold  mb-1">{item.title}</div>
                    <div class="text-sm text-base-content/70">
                      {item.description}
                    </div>
                  </a>
                )}
              </For>
            </Dropdown.Menu>
          </Dropdown>

          {/* Direct Navigation Links */}
          <For each={navLinks}>
            {(link) => (
              <a
                href={link.href}
                class="hover:text-primary px-4 py-2 transition-colors"
              >
                {link.title}
              </a>
            )}
          </For>
        </Flex>
      </Navbar.Center>

      {/* Right side actions */}
      <Navbar.End class="hidden lg:flex">
        <Flex gap="md" align="center">
          {/* GitHub Link */}
          <a
            href="https://github.com/pathscale/ui"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary p-2 rounded-full transition-colors"
          >
            <GitHubIcon />
          </a>

          {/* Get Started CTA */}
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

      {/* Mobile Menu Overlay */}
      {isOpen() && (
        <div class="lg:hidden absolute top-full left-0 right-0 border-b border-base-300 shadow-lg">
          <div class="p-4 space-y-4">
            {/* Mobile Search */}
            <div class="pb-4 border-b border-base-300">
              <Search />
            </div>
            {/* Platform Section */}
            <div>
              <div class="font-semibold  mb-2">Platform</div>
              <div class="pl-4 space-y-2">
                <For each={platformItems}>
                  {(item) => (
                    <a
                      href={item.href}
                      class="block text-base-content/70 hover:text-primary py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  )}
                </For>
              </div>
            </div>

            {/* Direct Links */}
            <div class="space-y-2">
              <For each={navLinks}>
                {(link) => (
                  <a
                    href={link.href}
                    class="block hover:text-primary py-2 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </a>
                )}
              </For>
            </div>

            {/* CTA Button */}
            <div class="pt-4 border-t border-base-300">
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
      )}
    </Navbar>
  );
};

export default MarketingHeader;
