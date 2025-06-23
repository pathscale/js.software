import { A } from "@solidjs/router";
import { FiMenu, FiX } from "solid-icons/fi";
import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, Show, onMount, onCleanup } from "solid-js";

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
  const location = useLocation();
  const [activePath, setActivePath] = createSignal(location.pathname);

  const [isDesktop, setIsDesktop] = createSignal(true);

  const checkIfDesktop = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  onMount(() => {
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkIfDesktop);
  });

  createEffect(() => {
    setActivePath(location.pathname);
  });

  createEffect(() => {
    if (isDesktop()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  const toggleSidebar = () => setIsOpen(!isOpen());

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
        desktopBreakpoint={1024}
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
              <A noScroll href="/" class="sidenav-item-link">
                Home
              </A>
            </SidenavLink>
          </SidenavItem>

          <SidenavGroup label="Utils">
            <SidenavItem active={activePath() === "/theming"}>
              <SidenavLink asChild>
                <A noScroll href="/theming" class="sidenav-item-link">
                  Theming
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/svg-background"}>
              <SidenavLink asChild>
                <A noScroll href="/svg-background" class="sidenav-item-link">
                  SVG Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Actions">
            <SidenavItem active={activePath() === "/button"}>
              <SidenavLink asChild>
                <A noScroll href="/button" class="sidenav-item-link">
                  Button
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dropdown"}>
              <SidenavLink asChild>
                <A noScroll href="/dropdown" class="sidenav-item-link">
                  Dropdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/modal"}>
              <SidenavLink asChild>
                <A noScroll href="/modal" class="sidenav-item-link">
                  Modal
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/swap"}>
              <SidenavLink asChild>
                <A noScroll href="/swap" class="sidenav-item-link">
                  Swap
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/copy-button"}>
              <SidenavLink asChild>
                <A noScroll href="/copy-button" class="sidenav-item-link">
                  Copy Button
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Display">
            <SidenavItem active={activePath() === "/accordion"}>
              <SidenavLink asChild>
                <A noScroll href="/accordion" class="sidenav-item-link">
                  Accordion
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/avatar"}>
              <SidenavLink asChild>
                <A noScroll href="/avatar" class="sidenav-item-link">
                  Avatar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/badge"}>
              <SidenavLink asChild>
                <A noScroll href="/badge" class="sidenav-item-link">
                  Badge
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/card"}>
              <SidenavLink asChild>
                <A noScroll href="/card" class="sidenav-item-link">
                  Card
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/carousel"}>
              <SidenavLink asChild>
                <A noScroll href="/carousel" class="sidenav-item-link">
                  Carousel
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/chat-bubble"}>
              <SidenavLink asChild>
                <A noScroll href="/chat-bubble" class="sidenav-item-link">
                  Chat Bubble
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/collapse"}>
              <SidenavLink asChild>
                <A noScroll href="/collapse" class="sidenav-item-link">
                  Collapse
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/countdown"}>
              <SidenavLink asChild>
                <A noScroll href="/countdown" class="sidenav-item-link">
                  Countdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/diff"}>
              <SidenavLink asChild>
                <A noScroll href="/diff" class="sidenav-item-link">
                  Diff
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/icon"}>
              <SidenavLink asChild>
                <A noScroll href="/icon" class="sidenav-item-link">
                  Icon
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/kbd"}>
              <SidenavLink asChild>
                <A noScroll href="/kbd" class="sidenav-item-link">
                  Kbd
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stats"}>
              <SidenavLink asChild>
                <A noScroll href="/stats" class="sidenav-item-link">
                  Stats
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/table"}>
              <SidenavLink asChild>
                <A noScroll href="/table" class="sidenav-item-link">
                  Table
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/timeline"}>
              <SidenavLink asChild>
                <A noScroll href="/timeline" class="sidenav-item-link">
                  Timeline
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A noScroll href="/codemockup" class="sidenav-item-link">
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/rating"}>
              <SidenavLink asChild>
                <A noScroll href="/rating" class="sidenav-item-link">
                  Rating
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Navigation">
            <SidenavItem active={activePath() === "/breadcrumb"}>
              <SidenavLink asChild>
                <A noScroll href="/breadcrumb" class="sidenav-item-link">
                  Breadcrumb
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dock"}>
              <SidenavLink asChild>
                <A noScroll href="/dock" class="sidenav-item-link">
                  Dock
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/link"}>
              <SidenavLink asChild>
                <A noScroll href="/link" class="sidenav-item-link">
                  Link
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/menu"}>
              <SidenavLink asChild>
                <A noScroll href="/menu" class="sidenav-item-link">
                  Menu
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/navbar"}>
              <SidenavLink asChild>
                <A noScroll href="/navbar" class="sidenav-item-link">
                  Navbar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/pagination"}>
              <SidenavLink asChild>
                <A noScroll href="/pagination" class="sidenav-item-link">
                  Pagination
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/steps"}>
              <SidenavLink asChild>
                <A noScroll href="/steps" class="sidenav-item-link">
                  Steps
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tabs"}>
              <SidenavLink asChild>
                <A noScroll href="/tabs" class="sidenav-item-link">
                  Tabs
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/sidenav"}>
              <SidenavLink asChild>
                <A noScroll href="/sidenav" class="sidenav-item-link">
                  Sidenav
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Feedback">
            <SidenavItem active={activePath() === "/alert"}>
              <SidenavLink asChild>
                <A noScroll href="/alert" class="sidenav-item-link">
                  Alert
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/loading"}>
              <SidenavLink asChild>
                <A noScroll href="/loading" class="sidenav-item-link">
                  Loading
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/progress"}>
              <SidenavLink asChild>
                <A noScroll href="/progress" class="sidenav-item-link">
                  Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radial-progress"}>
              <SidenavLink asChild>
                <A noScroll href="/radial-progress" class="sidenav-item-link">
                  Radial Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/skeleton"}>
              <SidenavLink asChild>
                <A noScroll href="/skeleton" class="sidenav-item-link">
                  Skeleton
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toast"}>
              <SidenavLink asChild>
                <A noScroll href="/toast" class="sidenav-item-link">
                  Toast
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tooltip"}>
              <SidenavLink asChild>
                <A noScroll href="/tooltip" class="sidenav-item-link">
                  Tooltip
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Input">
            <SidenavItem active={activePath() === "/calendar"}>
              <SidenavLink asChild>
                <A noScroll href="/calendar" class="sidenav-item-link">
                  Calendar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/checkbox"}>
              <SidenavLink asChild>
                <A noScroll href="/checkbox" class="sidenav-item-link">
                  Checkbox
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/file-input"}>
              <SidenavLink asChild>
                <A noScroll href="/file-input" class="sidenav-item-link">
                  File Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/form"}>
              <SidenavLink asChild>
                <A noScroll href="/form" class="sidenav-item-link">
                  Form
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/input"}>
              <SidenavLink asChild>
                <A noScroll href="/input" class="sidenav-item-link">
                  Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radio"}>
              <SidenavLink asChild>
                <A noScroll href="/radio" class="sidenav-item-link">
                  Radio
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/range"}>
              <SidenavLink asChild>
                <A noScroll href="/range" class="sidenav-item-link">
                  Range
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/select"}>
              <SidenavLink asChild>
                <A noScroll href="/select" class="sidenav-item-link">
                  Select
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/textarea"}>
              <SidenavLink asChild>
                <A noScroll href="/textarea" class="sidenav-item-link">
                  Textarea
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toggle"}>
              <SidenavLink asChild>
                <A noScroll href="/toggle" class="sidenav-item-link">
                  Toggle
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A noScroll href="/join" class="sidenav-item-link">
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Layout">
            <SidenavItem active={activePath() === "/divider"}>
              <SidenavLink asChild>
                <A noScroll href="/divider" class="sidenav-item-link">
                  Divider
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/drawer"}>
              <SidenavLink asChild>
                <A noScroll href="/drawer" class="sidenav-item-link">
                  Drawer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/flex"}>
              <SidenavLink asChild>
                <A noScroll href="/flex" class="sidenav-item-link">
                  Flex
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/footer"}>
              <SidenavLink asChild>
                <A noScroll href="/footer" class="sidenav-item-link">
                  Footer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/grid"}>
              <SidenavLink asChild>
                <A noScroll href="/grid" class="sidenav-item-link">
                  Grid
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/hero"}>
              <SidenavLink asChild>
                <A noScroll href="/hero" class="sidenav-item-link">
                  Hero
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/indicator"}>
              <SidenavLink asChild>
                <A noScroll href="/indicator" class="sidenav-item-link">
                  Indicator
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A noScroll href="/join" class="sidenav-item-link">
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/mask"}>
              <SidenavLink asChild>
                <A noScroll href="/mask" class="sidenav-item-link">
                  Mask
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stack"}>
              <SidenavLink asChild>
                <A noScroll href="/stack" class="sidenav-item-link">
                  Stack
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/background"}>
              <SidenavLink asChild>
                <A noScroll href="/background" class="sidenav-item-link">
                  Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Mockup">
            <SidenavItem active={activePath() === "/artboard"}>
              <SidenavLink asChild>
                <A noScroll href="/artboard" class="sidenav-item-link">
                  Artboard
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/browsermockup"}>
              <SidenavLink asChild>
                <A noScroll href="/browsermockup" class="sidenav-item-link">
                  Browser Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A noScroll href="/codemockup" class="sidenav-item-link">
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/phonemockup"}>
              <SidenavLink asChild>
                <A noScroll href="/phonemockup" class="sidenav-item-link">
                  Phone Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/windowmockup"}>
              <SidenavLink asChild>
                <A noScroll href="/windowmockup" class="sidenav-item-link">
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
