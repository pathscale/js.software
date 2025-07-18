import { Component, Show } from "solid-js";
import { Navbar, Button, Flex } from "@pathscale/ui";
import { useNavigation } from "./hooks/useNavigation";
import { MainNavigation } from "./components/MainNavigation";
import { ComponentsMenu } from "./components/ComponentsMenu";
import { MobileSidebar } from "./components/MobileSidebar";
import { GitHubIcon } from "./components/GitHubIcon";
import { MarketingHeaderProps } from "./types";
import { ROUTES, EXTERNAL_ROUTES } from "../../../config/routes";

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
    <Navbar.Stack class={`navbar-stack sticky top-0 z-50 ${props.className || ""}`}>
      <Navbar.Row class="bg-base-100 shadow-sm px-4 py-1.5">
        <Navbar.Start class="lg:hidden">
          <Button
            color="ghost"
            shape="square"
            onClick={() => navigation.setIsOpen(!navigation.isOpen())}
          >
            <HamburgerIcon />
          </Button>
        </Navbar.Start>

        <Navbar.Start class="hidden lg:flex">
          <a
            href={ROUTES.HOME}
            class="text-xl font-bold normal-case hover:text-primary transition-colors px-4 py-2"
          >
            UI
          </a>
        </Navbar.Start>

        <Navbar.Center class="lg:hidden">
          <a href={ROUTES.HOME} class="text-xl font-bold normal-case px-4 py-2">
            UI
          </a>
        </Navbar.Center>

        <Navbar.Center class="hidden lg:flex">
          <MainNavigation navigation={navigation} />
        </Navbar.Center>

        <Navbar.End class="hidden lg:flex">
          <Flex gap="md" align="center">
            <a
              href={EXTERNAL_ROUTES.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary p-2 rounded-full transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href={ROUTES.DOCS_INSTALLATION}
              class="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
            >
              Get Started
            </a>
          </Flex>
        </Navbar.End>

        <Navbar.End class="lg:hidden">
          <a
            href={EXTERNAL_ROUTES.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full"
          >
            <GitHubIcon />
          </a>
        </Navbar.End>
      </Navbar.Row>

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