import { Component, Show } from "solid-js";
import { Button, Flex, Link, Navbar } from "@pathscale/ui";
import { useNavigation } from "./hooks/useNavigation";
import { MainNavigation } from "./components/MainNavigation";
import { ComponentsMenu } from "./components/ComponentsMenu";
import { MobileSidebar } from "./components/MobileSidebar";
import { GitHubIcon } from "./components/GitHubIcon";
import { MarketingHeaderProps } from "./types";
import { ROUTES, EXTERNAL_ROUTES } from "../../../config/routes";
import Search from "../../content/Search";

export const MarketingHeader: Component<MarketingHeaderProps> = (props) => {
  const navigation = useNavigation();

  const HamburgerIcon = () => (
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
  );

  return (
    <Navbar.Stack class={`navbar-stack glass-nav sticky top-0 z-50 ${props.class || ""}`}>
      {/* `glass-nav` rather than a glass Card: the chrome is a seam across the
          top of the page, not a panel sitting on it, so it wants a hairline
          bottom border and no radius, corners or shadow. */}
      <div class="page-container">
        {/* Transparent: `glass-nav` on the stack is what paints the chrome. A
            bare Navbar.Row defaults to flavor neutral, which is near-black by
            design and read as a black bar across the light theme. */}
        <Navbar.Row class="py-2 bg-transparent">
        <Navbar.Start class="lg:hidden">
          <Button
            variant="ghost"
            width="square"
            aria-label={navigation.isOpen() ? "Close navigation" : "Open navigation"}
            onClick={() => navigation.setIsOpen(!navigation.isOpen())}
          >
            <HamburgerIcon />
          </Button>
        </Navbar.Start>

        <Navbar.Start class="hidden lg:flex">
          <Link
            href={ROUTES.HOME}
            class="text-base-content text-xl font-bold normal-case hover:text-primary transition-colors px-4 py-2"
          >
            UI
          </Link>
        </Navbar.Start>

        <Navbar.Center class="lg:hidden">
          <Link href={ROUTES.HOME} class="text-base-content text-xl font-bold normal-case px-4 py-2">
            UI
          </Link>
        </Navbar.Center>

        <Navbar.Center class="hidden lg:flex">
          <MainNavigation navigation={navigation} />
        </Navbar.Center>

        <Navbar.End class="hidden lg:flex">
          <Flex gap="md" align="center">
            <Search class="w-48" />
            <Link
              id="github-source-link"
              href={EXTERNAL_ROUTES.GITHUB}
              isExternal
              aria-label="View UI on GitHub"
              class="text-base-content hover:text-primary p-2 rounded-full transition-colors"
            >
              <GitHubIcon />
            </Link>
            <Button
              href={ROUTES.DOCS_INSTALLATION}
              flavor="primary"
              class="whitespace-nowrap"
            >
              Get Started
            </Button>
          </Flex>
        </Navbar.End>

        <Navbar.End class="lg:hidden">
          <Link
            href={EXTERNAL_ROUTES.GITHUB}
            isExternal
            aria-label="View UI on GitHub from mobile navigation"
            class="text-base-content p-2 rounded-full"
          >
            <GitHubIcon />
          </Link>
        </Navbar.End>
        </Navbar.Row>
      </div>

      <Show when={navigation.shouldShowComponentsMenu()}>
        <ComponentsMenu navigation={navigation} />
      </Show>

      <Show when={navigation.isOpen()}>
        <MobileSidebar navigation={navigation} />
      </Show>
    </Navbar.Stack>
  );
};

export default MarketingHeader;
