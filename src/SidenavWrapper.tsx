import { A } from "@solidjs/router";
import { FiMenu, FiX } from "solid-icons/fi";
import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";

import {
  Button,
  Sidenav,
  SidenavItem,
  SidenavLink,
  SidenavMenu,
  SidenavGroup,
} from "@pathscale/ui";

import ThemeToggle from "./ThemeToggle";

export default function SidenavWrapper() {
  const [isOpen, setIsOpen] = createSignal(true);
  const [isDesktop, setIsDesktop] = createSignal(true);
  const location = useLocation();
  const [activePath, setActivePath] = createSignal(location.pathname);

  createEffect(() => {
    setActivePath(location.pathname);
  });

  const toggleSidebar = () => setIsOpen(!isOpen());

  const checkIfDesktop = () => {
    const width = window.innerWidth;
    setIsDesktop(width >= 1024);
  };

  onMount(() => {
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkIfDesktop);
  });

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

      <Sidenav
        title="UI Components"
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        class={isDesktop() ? "sidenav-desktop" : ""}
        footer={
          <div class="p-4 bg-base-200 flex justify-between items-center">
            <span class="text-sm text-base-content/70">Theme</span>
            <ThemeToggle />
          </div>
        }
      >
        <SidenavMenu>
          <SidenavItem active={activePath() === "/"}>
            <SidenavLink asChild>
              <A noScroll href="/" onClick={() => !isDesktop() && setIsOpen(false)} class="sidenav-item-link">
                Home
              </A>
            </SidenavLink>
          </SidenavItem>

          <SidenavGroup label="Utils">
            <SidenavItem active={activePath() === "/theming"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/theming"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Theming
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/svg-background"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/svg-background"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  SVG Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Actions">
            <SidenavItem active={activePath() === "/button"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/button"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Button
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dropdown"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/dropdown"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Dropdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/modal"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/modal"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Modal
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/swap"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/swap"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Swap
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/copy-button"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/copy-button"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Copy Button
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Display">
            <SidenavItem active={activePath() === "/accordion"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/accordion"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Accordion
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/avatar"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/avatar"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Avatar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/badge"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/badge"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Badge
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/card"}>
              <SidenavLink asChild>
                <A noScroll 
                  href="/card"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Card
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/carousel"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/carousel"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Carousel
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/chat-bubble"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/chat-bubble"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Chat Bubble
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/collapse"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/collapse"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Collapse
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/countdown"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/countdown"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Countdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/diff"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/diff"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Diff
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/kbd"}>
              <SidenavLink asChild>
                <A noScroll href="/kbd" onClick={() => !isDesktop() && setIsOpen(false)} class="sidenav-item-link">
                  Kbd
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stats"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/stats"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Stats
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/table"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/table"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Table
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/timeline"}>
              <SidenavLink asChild>

                <A noScroll
                  href="/timeline"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Timeline
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/codemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/rating"}>
              <SidenavLink asChild>
                <A noScroll 
                  href="/rating"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Rating
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Navigation">
            <SidenavItem active={activePath() === "/breadcrumb"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/breadcrumb"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Breadcrumb
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dock"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/dock"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Dock
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/link"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/link"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Link
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/menu"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/menu"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Menu
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/navbar"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/navbar"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Navbar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/pagination"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/pagination"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Pagination
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/steps"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/steps"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Steps
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tabs"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/tabs"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Tabs
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/sidenav"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/sidenav"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Sidenav
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Feedback">
            <SidenavItem active={activePath() === "/alert"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/alert"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Alert
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/loading"}>
              <SidenavLink asChild>
                <A noScroll 
                  href="/loading"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Loading
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/progress"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/progress"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radial-progress"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/radial-progress"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Radial Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/skeleton"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/skeleton"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Skeleton
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toast"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/toast"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Toast
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tooltip"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/tooltip"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Tooltip
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Input">
            <SidenavItem active={activePath() === "/checkbox"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/checkbox"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Checkbox
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/file-input"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/file-input"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  File Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/form"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/form"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Form
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/input"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/input"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radio"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/radio"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Radio
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/range"}>
              <SidenavLink asChild>
                <A noScroll 
                  href="/range"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Range
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/select"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/select"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Select
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/textarea"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/textarea"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Textarea
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toggle"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/toggle"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Toggle
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/join"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Layout">
            <SidenavItem active={activePath() === "/divider"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/divider"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Divider
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/drawer"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/drawer"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Drawer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/flex"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/flex"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Flex
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/footer"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/footer"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Footer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/grid"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/grid"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Grid
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/hero"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/hero"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Hero
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/indicator"}>
              <SidenavLink asChild>
                <A noScroll 
                  href="/indicator"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Indicator
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/join"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/mask"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/mask"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Mask
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stack"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/stack"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Stack
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/background"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/background"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Mockup">
            <SidenavItem active={activePath() === "/artboard"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/artboard"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Artboard
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/browsermockup"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/browsermockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Browser Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/codemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/phonemockup"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/phonemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Phone Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/windowmockup"}>
              <SidenavLink asChild>
                <A noScroll
                  href="/windowmockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                  class="sidenav-item-link"
                >
                  Window Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>
        </SidenavMenu>
      </Sidenav>
    </div>
  );
}
