import { A } from "@solidjs/router";
import { FiMenu, FiX } from "solid-icons/fi";
import { useLocation, useNavigate } from "@solidjs/router";
import { createSignal, onCleanup, onMount, Show } from "solid-js";

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
  const navigate = useNavigate();

  const activePath = () => location.pathname;

  const toggleSidebar = () => setIsOpen(!isOpen());

  const handleNavClick = (path: string) => () => {
    navigate(path);
    if (!isDesktop()) setIsOpen(false);
  };

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
              <A href="/" onClick={() => !isDesktop() && setIsOpen(false)}>
                Home
              </A>
            </SidenavLink>
          </SidenavItem>

          <SidenavGroup label="Utils">
            <SidenavItem active={activePath() === "/theming"}>
              <SidenavLink asChild>
                <A
                  href="/theming"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Theming
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/svg-background"}>
              <SidenavLink asChild>
                <A
                  href="/svg-background"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  SVG Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Actions">
            <SidenavItem active={activePath() === "/button"}>
              <SidenavLink asChild>
                <A
                  href="/button"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Button
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dropdown"}>
              <SidenavLink asChild>
                <A
                  href="/dropdown"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Dropdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/modal"}>
              <SidenavLink asChild>
                <A
                  href="/modal"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Modal
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/swap"}>
              <SidenavLink asChild>
                <A
                  href="/swap"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Swap
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/copy-button"}>
              <SidenavLink asChild>
                <A
                  href="/copy-button"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Copy Button
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Display">
            <SidenavItem active={activePath() === "/accordion"}>
              <SidenavLink asChild>
                <A
                  href="/accordion"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Accordion
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/avatar"}>
              <SidenavLink asChild>
                <A
                  href="/avatar"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Avatar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/badge"}>
              <SidenavLink asChild>
                <A
                  href="/badge"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Badge
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/card"}>
              <SidenavLink asChild>
                <A
                  href="/card"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Card
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/carousel"}>
              <SidenavLink asChild>
                <A
                  href="/carousel"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Carousel
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/chat-bubble"}>
              <SidenavLink asChild>
                <A
                  href="/chat-bubble"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Chat Bubble
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/collapse"}>
              <SidenavLink asChild>
                <A
                  href="/collapse"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Collapse
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/countdown"}>
              <SidenavLink asChild>
                <A
                  href="/countdown"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Countdown
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/diff"}>
              <SidenavLink asChild>
                <A
                  href="/diff"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Diff
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/kbd"}>
              <SidenavLink asChild>
                <A href="/kbd" onClick={() => !isDesktop() && setIsOpen(false)}>
                  Kbd
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stats"}>
              <SidenavLink asChild>
                <A
                  href="/stats"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Stats
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/table"}>
              <SidenavLink asChild>
                <A
                  href="/table"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Table
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/timeline"}>
              <SidenavLink asChild>
                <A
                  href="/timeline"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Timeline
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A
                  href="/codemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/rating"}>
              <SidenavLink asChild>
                <A
                  href="/rating"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Rating
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Navigation">
            <SidenavItem active={activePath() === "/breadcrumb"}>
              <SidenavLink asChild>
                <A
                  href="/breadcrumb"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Breadcrumb
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dock"}>
              <SidenavLink asChild>
                <A
                  href="/dock"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Dock
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/link"}>
              <SidenavLink asChild>
                <A
                  href="/link"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Link
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/menu"}>
              <SidenavLink asChild>
                <A
                  href="/menu"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Menu
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/navbar"}>
              <SidenavLink asChild>
                <A
                  href="/navbar"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Navbar
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/pagination"}>
              <SidenavLink asChild>
                <A
                  href="/pagination"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Pagination
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/steps"}>
              <SidenavLink asChild>
                <A
                  href="/steps"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Steps
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tabs"}>
              <SidenavLink asChild>
                <A
                  href="/tabs"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Tabs
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/sidenav"}>
              <SidenavLink asChild>
                <A
                  href="/sidenav"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Sidenav
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Feedback">
            <SidenavItem active={activePath() === "/alert"}>
              <SidenavLink asChild>
                <A
                  href="/alert"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Alert
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/loading"}>
              <SidenavLink asChild>
                <A
                  href="/loading"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Loading
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/progress"}>
              <SidenavLink asChild>
                <A
                  href="/progress"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radial-progress"}>
              <SidenavLink asChild>
                <A
                  href="/radial-progress"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Radial Progress
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/skeleton"}>
              <SidenavLink asChild>
                <A
                  href="/skeleton"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Skeleton
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toast"}>
              <SidenavLink asChild>
                <A
                  href="/toast"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Toast
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tooltip"}>
              <SidenavLink asChild>
                <A
                  href="/tooltip"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Tooltip
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Input">
            <SidenavItem active={activePath() === "/checkbox"}>
              <SidenavLink asChild>
                <A
                  href="/checkbox"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Checkbox
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/file-input"}>
              <SidenavLink asChild>
                <A
                  href="/file-input"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  File Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/form"}>
              <SidenavLink asChild>
                <A
                  href="/form"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Form
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/input"}>
              <SidenavLink asChild>
                <A
                  href="/input"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Input
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radio"}>
              <SidenavLink asChild>
                <A
                  href="/radio"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Radio
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/range"}>
              <SidenavLink asChild>
                <A
                  href="/range"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Range
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/select"}>
              <SidenavLink asChild>
                <A
                  href="/select"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Select
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/textarea"}>
              <SidenavLink asChild>
                <A
                  href="/textarea"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Textarea
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toggle"}>
              <SidenavLink asChild>
                <A
                  href="/toggle"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Toggle
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A
                  href="/join"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Layout">
            <SidenavItem active={activePath() === "/divider"}>
              <SidenavLink asChild>
                <A
                  href="/divider"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Divider
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/drawer"}>
              <SidenavLink asChild>
                <A
                  href="/drawer"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Drawer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/flex"}>
              <SidenavLink asChild>
                <A
                  href="/flex"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Flex
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/footer"}>
              <SidenavLink asChild>
                <A
                  href="/footer"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Footer
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/grid"}>
              <SidenavLink asChild>
                <A
                  href="/grid"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Grid
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/hero"}>
              <SidenavLink asChild>
                <A
                  href="/hero"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Hero
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/indicator"}>
              <SidenavLink asChild>
                <A
                  href="/indicator"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Indicator
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <A
                  href="/join"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Join
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/mask"}>
              <SidenavLink asChild>
                <A
                  href="/mask"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Mask
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stack"}>
              <SidenavLink asChild>
                <A
                  href="/stack"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Stack
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/background"}>
              <SidenavLink asChild>
                <A
                  href="/background"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Background
                </A>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Mockup">
            <SidenavItem active={activePath() === "/artboard"}>
              <SidenavLink asChild>
                <A
                  href="/artboard"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Artboard
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/browsermockup"}>
              <SidenavLink asChild>
                <A
                  href="/browsermockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Browser Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <A
                  href="/codemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Code Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/phonemockup"}>
              <SidenavLink asChild>
                <A
                  href="/phonemockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
                >
                  Phone Mockup
                </A>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/windowmockup"}>
              <SidenavLink asChild>
                <A
                  href="/windowmockup"
                  onClick={() => !isDesktop() && setIsOpen(false)}
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
