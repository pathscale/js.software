import { Component } from "solid-js";
import { ROUTES } from "./config/routes";

import Home from "./pages/Home";
import Theming from "./pages/Theming";
import DocsIndex from "./pages/docs/Index";
import DocsInstallation from "./pages/docs/Installation";
import Showcases from "./pages/Showcases";

import AccordionShowcase from "./components/AccordionShowcase";
import AlertShowcase from "./components/AlertShowcase";
import ArtboardShowcase from "./components/ArtboardShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import BackgroundShowcase from "./components/BackgroundShowcase";
import BadgeShowcase from "./components/BadgeShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import BrowserMockupShowcase from "./components/BrowserMockupShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import CalendarShowcase from "./components/CalendarShowcase";
import CardShowcase from "./components/CardShowcase";
import CarouselShowcase from "./components/CarouselShowcase";
import ChatBubbleShowcase from "./components/ChatBubbleShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import CodeMockupShowcase from "./components/CodeMockupShowcase";
import CollapseShowcase from "./components/CollapseShowcase";
import CopyButtonShowcase from "./components/CopyButtonShowcase";
import CountdownShowcase from "./components/CountdownShowcase";
import DiffShowcase from "./components/DiffShowcase";
import DividerShowcase from "./components/DividerShowcase";
import DockShowcase from "./components/DockShowcase";
import DrawerShowcase from "./components/DrawerShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import FileInputShowcase from "./components/FileInputShowcase";
import FlexShowcase from "./components/FlexShowcase";
import FooterShowcase from "./components/FooterShowcase";
import FormShowcase from "./components/FormShowcase";
import GridShowcase from "./components/GridShowcase";
import HeroShowcase from "./components/HeroShowcase";
import IconShowcase from "./components/IconShowcase";
import IndicatorShowcase from "./components/IndicatorShowcase";
import InputShowcase from "./components/InputShowcase";
import JoinShowcase from "./components/JoinShowcase";
import KbdShowcase from "./components/KbdShowcase";
import LinkShowcase from "./components/LinkShowcase";
import LoadingShowcase from "./components/LoadingShowcase";
import MaskShowcase from "./components/MaskShowcase";
import MenuShowcase from "./components/MenuShowcase";
import ModalShowcase from "./components/ModalShowcase";
import NavbarShowcase from "./components/NavbarShowcase";
import PaginationShowcase from "./components/PaginationShowcase";
import PhonemockupShowcase from "./components/PhonemockupShowcase";
import ProgressShowcase from "./components/ProgressShowcase";
import RadialProgressShowcase from "./components/RadialProgressShowcase";
import RadioShowcase from "./components/RadioShowcase";
import RangeShowcase from "./components/RangeShowcase";
import RatingShowcase from "./components/RatingShowcase";
import SelectShowcase from "./components/SelectShowcase";
import SidenavShowcase from "./components/SidenavShowcase";
import SkeletonShowcase from "./components/SkeletonShowcase";
import StackShowcase from "./components/StackShowcase";
import StatsShowcase from "./components/StatsShowcase";
import StepsShowcase from "./components/StepsShowcase";
import SvgBackgroundShowcase from "./components/SvgBackgroundShowcase";
import SwapShowcase from "./components/SwapShowcase";
import TableShowcase from "./components/TableShowcase";
import TabsShowcase from "./components/TabsShowcase";
import TextareaShowcase from "./components/TextareaShowcase";
import TimelineShowcase from "./components/TimelineShowcase";
import ToastShowcase from "./components/ToastShowcase";
import ToggleShowcase from "./components/ToggleShowcase";
import TooltipShowcase from "./components/TooltipShowcase";
import WindowMockupShowcase from "./components/WindowMockupShowcase";

export interface RouteConfig {
  name: string;
  path: string;
  component: Component;
  description: string;
}

export const routes: RouteConfig[] = [
  {
    name: "Home",
    path: ROUTES.HOME,
    component: Home,
    description: "Main page and welcome to the component showcase.",
  },
  {
    name: "Theming",
    path: ROUTES.THEMING,
    component: Theming,
    description: "Playground for testing dynamic HSL-based theme settings.",
  },
  {
    name: "Documentation",
    path: ROUTES.DOCS,
    component: DocsIndex,
    description: "@pathscale/ui component library documentation and guide.",
  },
  {
    name: "Installation",
    path: ROUTES.DOCS_INSTALLATION,
    component: DocsInstallation,
    description: "Get started with @pathscale/ui installation and setup.",
  },
  {
    name: "Showcases",
    path: ROUTES.SHOWCASES,
    component: Showcases,
    description: "Interactive component demonstrations and examples.",
  },
  {
    name: "Accordion",
    path: ROUTES.ACCORDION,
    component: AccordionShowcase,
    description: "Expandable and collapsible sections to show or hide content.",
  },
  {
    name: "Alert",
    path: ROUTES.ALERT,
    component: AlertShowcase,
    description: "Displays important messages to the user.",
  },
  {
    name: "Artboard",
    path: ROUTES.ARTBOARD,
    component: ArtboardShowcase,
    description: "Simulates screen dimensions with mobile device framing.",
  },
  {
    name: "Avatar",
    path: ROUTES.AVATAR,
    component: AvatarShowcase,
    description:
      "Visual representation of users with images, icons, or initials.",
  },
  {
    name: "Badge",
    path: ROUTES.BADGE,
    component: BadgeShowcase,
    description: "Small count or label to indicate status or quantity.",
  },
  {
    name: "Background",
    path: ROUTES.BACKGROUND,
    component: BackgroundShowcase,
    description: "Container with customizable background colors.",
  },

  {
    name: "Breadcrumb",
    path: ROUTES.BREADCRUMB,
    component: BreadcrumbShowcase,
    description: "Hierarchical navigation showing the current path in the app.",
  },
  {
    name: "Browser Mockup",
    path: ROUTES.BROWSER_MOCKUP,
    component: BrowserMockupShowcase,
    description: "Mockup browser frame for previewing web content.",
  },
  {
    name: "Button",
    path: ROUTES.BUTTON,
    component: ButtonShowcase,
    description: "Customizable buttons for actions and forms.",
  },
  {
    name: "Calendar",
    path: ROUTES.CALENDAR,
    component: CalendarShowcase,
    description: "Date picker with optional input and embedded display.",
  },
  {
    name: "Card",
    path: ROUTES.CARD,
    component: CardShowcase,
    description: "Flexible container for grouping related content.",
  },
  {
    name: "Carousel",
    path: ROUTES.CAROUSEL,
    component: CarouselShowcase,
    description: "A rotating set of images or content.",
  },
  {
    name: "Chat Bubble",
    path: ROUTES.CHAT_BUBBLE,
    component: ChatBubbleShowcase,
    description: "Speech bubbles for chat interfaces.",
  },
  {
    name: "Checkbox",
    path: ROUTES.CHECKBOX,
    component: CheckboxShowcase,
    description: "Checkboxes for selecting one or multiple options.",
  },
  {
    name: "Code Mockup",
    path: ROUTES.CODE_MOCKUP,
    component: CodeMockupShowcase,
    description: "Styled code block mockup for display purposes.",
  },
  {
    name: "Collapse",
    path: ROUTES.COLLAPSE,
    component: CollapseShowcase,
    description: "Expand and collapse content.",
  },
  {
    name: "Copy Button",
    path: ROUTES.COPY_BUTTON,
    component: CopyButtonShowcase,
    description: "Button for copying content to the clipboard.",
  },
  {
    name: "Countdown",
    path: ROUTES.COUNTDOWN,
    component: CountdownShowcase,
    description: "Displays a countdown timer.",
  },
  {
    name: "Diff",
    path: ROUTES.DIFF,
    component: DiffShowcase,
    description: "Display differences between two pieces of content.",
  },
  {
    name: "Divider",
    path: ROUTES.DIVIDER,
    component: DividerShowcase,
    description: "Visual divider line between sections or content.",
  },
  {
    name: "Dock",
    path: ROUTES.DOCK,
    component: DockShowcase,
    description: "Navigation bar at the bottom of the screen.",
  },
  {
    name: "Drawer",
    path: ROUTES.DRAWER,
    component: DrawerShowcase,
    description: "Slide-in panel from the side of the screen.",
  },
  {
    name: "Dropdown",
    path: ROUTES.DROPDOWN,
    component: DropdownShowcase,
    description: "Dropdown menu for displaying additional actions or options.",
  },
  {
    name: "FileInput",
    path: ROUTES.FILE_INPUT,
    component: FileInputShowcase,
    description: "Component for uploading files from the user's device.",
  },
  {
    name: "Flex",
    path: ROUTES.FLEX,
    component: FlexShowcase,
    description: "Flexible box layout wrapper for components.",
  },
  {
    name: "Footer",
    path: ROUTES.FOOTER,
    component: FooterShowcase,
    description: "Footer layout component for pages.",
  },
  {
    name: "Form",
    path: ROUTES.FORM,
    component: FormShowcase,
    description:
      "Form component showcasing various input fields and validation states.",
  },
  {
    name: "Grid",
    path: ROUTES.GRID,
    component: GridShowcase,
    description: "Grid layout system for content.",
  },
  {
    name: "Hero",
    path: ROUTES.HERO,
    component: HeroShowcase,
    description: "Hero section for headers, intros, or marketing.",
  },
  {
    name: "Icon",
    path: ROUTES.ICON,
    component: IconShowcase,
    description: "SVG icon wrapper and manager.",
  },
  {
    name: "Indicator",
    path: ROUTES.INDICATOR,
    component: IndicatorShowcase,
    description: "Notification dots and badges for elements.",
  },
  {
    name: "Input",
    path: ROUTES.INPUT,
    component: InputShowcase,
    description: "Text input fields for forms and user data.",
  },
  {
    name: "Join",
    path: ROUTES.JOIN,
    component: JoinShowcase,
    description: "Visual grouping of adjacent elements.",
  },
  {
    name: "Kbd",
    path: ROUTES.KBD,
    component: KbdShowcase,
    description: "Display keyboard key presses.",
  },
  {
    name: "Link",
    path: ROUTES.LINK,
    component: LinkShowcase,
    description: "Hyperlinks for navigation.",
  },
  {
    name: "Loading",
    path: ROUTES.LOADING,
    component: LoadingShowcase,
    description: "Indicators for loading states.",
  },
  {
    name: "Mask",
    path: ROUTES.MASK,
    component: MaskShowcase,
    description: "Shape masking utility for images or elements.",
  },
  {
    name: "Menu",
    path: ROUTES.MENU,
    component: MenuShowcase,
    description: "Navigation lists or grouped actions in menus.",
  },
  {
    name: "Modal",
    path: ROUTES.MODAL,
    component: ModalShowcase,
    description: "Modal dialogs for displaying content on top of an overlay.",
  },
  {
    name: "Navbar",
    path: ROUTES.NAVBAR,
    component: NavbarShowcase,
    description: "Main navigation bar for moving between app sections.",
  },
  {
    name: "Pagination",
    path: ROUTES.PAGINATION,
    component: PaginationShowcase,
    description:
      "Controls for navigating between pages of content or long lists.",
  },
  {
    name: "Phonemockup",
    path: ROUTES.PHONEMOCKUP,
    component: PhonemockupShowcase,
    description: "Mobile phone mockup for content previews.",
  },
  {
    name: "Progress",
    path: ROUTES.PROGRESS,
    component: ProgressShowcase,
    description:
      "Visual indicators of progress for tasks or ongoing processes.",
  },
  {
    name: "Radial Progress",
    path: ROUTES.RADIAL_PROGRESS,
    component: RadialProgressShowcase,
    description: "Circular progress indicators.",
  },
  {
    name: "Radio",
    path: ROUTES.RADIO,
    component: RadioShowcase,
    description: "Radio buttons for selecting a single option.",
  },
  {
    name: "Range",
    path: ROUTES.RANGE,
    component: RangeShowcase,
    description: "Slider control for selecting values within a range.",
  },
  {
    name: "Rating",
    path: ROUTES.RATING,
    component: RatingShowcase,
    description: "Rating input using stars or other icons.",
  },
  {
    name: "Select",
    path: ROUTES.SELECT,
    component: SelectShowcase,
    description: "Dropdowns for selecting an option from a list.",
  },
  {
    name: "SvgBackground",
    path: ROUTES.SVG_BACKGROUND,
    component: SvgBackgroundShowcase,
    description: "SVG background for the page.",
  },
  {
    name: "Sidenav",
    path: ROUTES.SIDENAV,
    component: SidenavShowcase,
    description: "Side navigation for app sections.",
  },
  {
    name: "Skeleton",
    path: ROUTES.SKELETON,
    component: SkeletonShowcase,
    description: "Placeholder content while loading.",
  },
  {
    name: "Stack",
    path: ROUTES.STACK,
    component: StackShowcase,
    description: "Layered stack of elements with overlap.",
  },
  {
    name: "Stats",
    path: ROUTES.STATS,
    component: StatsShowcase,
    description: "Display statistics or data.",
  },
  {
    name: "Steps",
    path: ROUTES.STEPS,
    component: StepsShowcase,
    description: "Step indicators for sequential processes or forms.",
  },
  {
    name: "Swap",
    path: ROUTES.SWAP,
    component: SwapShowcase,
    description: "Toggle between two elements.",
  },
  {
    name: "Table",
    path: ROUTES.TABLE,
    component: TableShowcase,
    description:
      "Tables for displaying and organizing data in rows and columns.",
  },
  {
    name: "Tabs",
    path: ROUTES.TABS,
    component: TabsShowcase,
    description:
      "Tab navigation for switching between different views or panels.",
  },
  {
    name: "Textarea",
    path: ROUTES.TEXTAREA,
    component: TextareaShowcase,
    description: "Multiline text field for entering longer content.",
  },
  {
    name: "Timeline",
    path: ROUTES.TIMELINE,
    component: TimelineShowcase,
    description: "Visualization of events in chronological order.",
  },
  {
    name: "Toast",
    path: ROUTES.TOAST,
    component: ToastShowcase,
    description: "Brief, non-intrusive notifications for user messages.",
  },
  {
    name: "Toggle",
    path: ROUTES.TOGGLE,
    component: ToggleShowcase,
    description: "Switches for toggling between two states, such as on/off.",
  },
  {
    name: "Tooltip",
    path: ROUTES.TOOLTIP,
    component: TooltipShowcase,
    description: "Informative messages that appear on hover or focus.",
  },
  {
    name: "Window Mockup",
    path: ROUTES.WINDOW_MOCKUP,
    component: WindowMockupShowcase,
    description: "Window frame mockup for web content preview.",
  },
];
