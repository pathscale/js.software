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
              <a href="#" onClick={handleNavClick("/")}>
                Home
              </a>
            </SidenavLink>
          </SidenavItem>

          <SidenavGroup label="Utils">
            <SidenavItem active={activePath() === "/theming"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/theming")}>
                  Theming
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/svg-background"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/svg-background")}>
                  SVG Background
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Actions">
            <SidenavItem active={activePath() === "/button"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/button")}>
                  Button
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dropdown"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/dropdown")}>
                  Dropdown
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/modal"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/modal")}>
                  Modal
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/swap"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/swap")}>
                  Swap
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/copy-button"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/copy-button")}>
                  Copy Button
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Display">
            <SidenavItem active={activePath() === "/accordion"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/accordion")}>
                  Accordion
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/avatar"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/avatar")}>
                  Avatar
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/badge"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/badge")}>
                  Badge
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/card"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/card")}>
                  Card
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/carousel"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/carousel")}>
                  Carousel
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/chat-bubble"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/chat-bubble")}>
                  Chat Bubble
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/collapse"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/collapse")}>
                  Collapse
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/countdown"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/countdown")}>
                  Countdown
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/diff"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/diff")}>
                  Diff
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/kbd"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/kbd")}>
                  Kbd
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stats"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/stats")}>
                  Stats
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/table"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/table")}>
                  Table
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/timeline"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/timeline")}>
                  Timeline
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/steps"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/steps")}>
                  Steps
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/codemockup")}>
                  Code Mockup
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/rating"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/rating")}>
                  Rating
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Navigation">
            <SidenavItem active={activePath() === "/breadcrumb"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/breadcrumb")}>
                  Breadcrumb
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/dock"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/dock")}>
                  Dock
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/link"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/link")}>
                  Link
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/menu"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/menu")}>
                  Menu
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/navbar"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/navbar")}>
                  Navbar
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/pagination"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/pagination")}>
                  Pagination
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/steps"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/steps")}>
                  Steps
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tabs"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/tabs")}>
                  Tabs
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/sidenav"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/sidenav")}>
                  Sidenav
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Feedback">
            <SidenavItem active={activePath() === "/alert"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/alert")}>
                  Alert
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/loading"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/loading")}>
                  Loading
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/progress"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/progress")}>
                  Progress
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radial-progress"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/radial-progress")}>
                  Radial Progress
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/skeleton"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/skeleton")}>
                  Skeleton
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toast"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/toast")}>
                  Toast
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/tooltip"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/tooltip")}>
                  Tooltip
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Data Input">
            <SidenavItem active={activePath() === "/checkbox"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/checkbox")}>
                  Checkbox
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/file-input"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/file-input")}>
                  File Input
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/form"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/form")}>
                  Form
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/input"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/input")}>
                  Input
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/radio"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/radio")}>
                  Radio
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/range"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/range")}>
                  Range
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/rating"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/rating")}>
                  Rating
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/select"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/select")}>
                  Select
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/textarea"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/textarea")}>
                  Textarea
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/toggle"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/toggle")}>
                  Toggle
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/join")}>
                  Join
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Layout">
            <SidenavItem active={activePath() === "/divider"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/divider")}>
                  Divider
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/drawer"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/drawer")}>
                  Drawer
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/flex"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/flex")}>
                  Flex
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/footer"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/footer")}>
                  Footer
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/grid"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/grid")}>
                  Grid
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/hero"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/hero")}>
                  Hero
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/indicator"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/indicator")}>
                  Indicator
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/join"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/join")}>
                  Join
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/mask"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/mask")}>
                  Mask
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/stack"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/stack")}>
                  Stack
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/background"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/background")}>
                  Background
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>

          <SidenavGroup label="Mockup">
            <SidenavItem active={activePath() === "/artboard"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/artboard")}>
                  Artboard
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/browsermockup"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/browsermockup")}>
                  Browser Mockup
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/codemockup"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/codemockup")}>
                  Code Mockup
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/phonemockup"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/phonemockup")}>
                  Phone Mockup
                </a>
              </SidenavLink>
            </SidenavItem>
            <SidenavItem active={activePath() === "/windowmockup"}>
              <SidenavLink asChild>
                <a href="#" onClick={handleNavClick("/windowmockup")}>
                  Window Mockup
                </a>
              </SidenavLink>
            </SidenavItem>
          </SidenavGroup>
        </SidenavMenu>
      </Sidenav>
    </div>
  );
}
