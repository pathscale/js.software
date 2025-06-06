import { Component } from "solid-js";

import Home from "./pages/Home";
import Theming from "./pages/Theming";

import AccordionShowcase from "./components/AccordionShowcase";
import AlertShowcase from "./components/AlertShowcase";
import ArtboardShowcase from "./components/ArtboardShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import BackgroundShowcase from "./components/BackgroundShowcase";
import BadgeShowcase from "./components/BadgeShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import BrowserMockupShowcase from "./components/BrowserMockupShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
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
import SvgBackgroundShowcase from './components/SvgBackgroundShowcase';
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
    path: "/",
    component: Home,
    description: "Main page and welcome to the component showcase.",
  },
  {
    name: "Theming",
    path: "/theming",
    component: Theming,
    description: "Playground for testing dynamic HSL-based theme settings.",
  },
  {
    name: "Accordion",
    path: "/accordion",
    component: AccordionShowcase,
    description: "Expandable and collapsible sections to show or hide content.",
  },
  {
    name: "Alert",
    path: "/alert",
    component: AlertShowcase,
    description: "Displays important messages to the user.",
  },
  {
    name: "Artboard",
    path: "/artboard",
    component: ArtboardShowcase,
    description: "Simulates screen dimensions with mobile device framing.",
  },
  {
    name: "Avatar",
    path: "/avatar",
    component: AvatarShowcase,
    description:
      "Visual representation of users with images, icons, or initials.",
  },
  {
    name: "Badge",
    path: "/badge",
    component: BadgeShowcase,
    description: "Small count or label to indicate status or quantity.",
  },
  {
    name: "Background",
    path: "/background",
    component: BackgroundShowcase,
    description: "Container with customizable background colors.",
  },

  {
    name: "Breadcrumb",
    path: "/breadcrumb",
    component: BreadcrumbShowcase,
    description: "Hierarchical navigation showing the current path in the app.",
  },
  {
    name: "Browser Mockup",
    path: "/browsermockup",
    component: BrowserMockupShowcase,
    description: "Mockup browser frame for previewing web content.",
  },
  {
    name: "Button",
    path: "/button",
    component: ButtonShowcase,
    description: "Customizable buttons for actions and forms.",
  },
  {
    name: "Card",
    path: "/card",
    component: CardShowcase,
    description: "Flexible container for grouping related content.",
  },
  {
    name: "Carousel",
    path: "/carousel",
    component: CarouselShowcase,
    description: "A rotating set of images or content.",
  },
  {
    name: "Chat Bubble",
    path: "/chat-bubble",
    component: ChatBubbleShowcase,
    description: "Speech bubbles for chat interfaces.",
  },
  {
    name: "Checkbox",
    path: "/checkbox",
    component: CheckboxShowcase,
    description: "Checkboxes for selecting one or multiple options.",
  },
  {
    name: "Code Mockup",
    path: "/codemockup",
    component: CodeMockupShowcase,
    description: "Styled code block mockup for display purposes.",
  },
  {
    name: "Collapse",
    path: "/collapse",
    component: CollapseShowcase,
    description: "Expand and collapse content.",
  },
  {
    name: "Copy Button",
    path: "/copy-button",
    component: CopyButtonShowcase,
    description: "Button for copying content to the clipboard.",
  },
  {
    name: "Countdown",
    path: "/countdown",
    component: CountdownShowcase,
    description: "Displays a countdown timer.",
  },
  {
    name: "Diff",
    path: "/diff",
    component: DiffShowcase,
    description: "Display differences between two pieces of content.",
  },
  {
    name: "Divider",
    path: "/divider",
    component: DividerShowcase,
    description: "Visual divider line between sections or content.",
  },
  {
    name: "Dock",
    path: "/dock",
    component: DockShowcase,
    description: "Navigation bar at the bottom of the screen.",
  },
  {
    name: "Drawer",
    path: "/drawer",
    component: DrawerShowcase,
    description: "Slide-in panel from the side of the screen.",
  },
  {
    name: "Dropdown",
    path: "/dropdown",
    component: DropdownShowcase,
    description: "Dropdown menu for displaying additional actions or options.",
  },
  {
    name: "FileInput",
    path: "/file-input",
    component: FileInputShowcase,
    description: "Component for uploading files from the user's device.",
  },
  {
    name: "Flex",
    path: "/flex",
    component: FlexShowcase,
    description: "Flexible box layout wrapper for components.",
  },
  {
    name: "Footer",
    path: "/footer",
    component: FooterShowcase,
    description: "Footer layout component for pages.",
  },
  {
    name: "Form",
    path: "/form",
    component: FormShowcase,
    description:
      "Form component showcasing various input fields and validation states.",
  },
  {
    name: "Grid",
    path: "/grid",
    component: GridShowcase,
    description: "Grid layout system for content.",
  },
  {
    name: "Hero",
    path: "/hero",
    component: HeroShowcase,
    description: "Hero section for headers, intros, or marketing.",
  },
  {
    name: "Icon",
    path: "/icon",
    component: IconShowcase,
    description: "SVG icon wrapper and manager.",
  },
  {
    name: "Indicator",
    path: "/indicator",
    component: IndicatorShowcase,
    description: "Notification dots and badges for elements.",
  },
  {
    name: "Input",
    path: "/input",
    component: InputShowcase,
    description: "Text input fields for forms and user data.",
  },
  {
    name: "Join",
    path: "/join",
    component: JoinShowcase,
    description: "Visual grouping of adjacent elements.",
  },
  {
    name: "Kbd",
    path: "/kbd",
    component: KbdShowcase,
    description: "Display keyboard key presses.",
  },
  {
    name: "Link",
    path: "/link",
    component: LinkShowcase,
    description: "Hyperlinks for navigation.",
  },
  {
    name: "Loading",
    path: "/loading",
    component: LoadingShowcase,
    description: "Indicators for loading states.",
  },
  {
    name: "Mask",
    path: "/mask",
    component: MaskShowcase,
    description: "Shape masking utility for images or elements.",
  },
  {
    name: "Menu",
    path: "/menu",
    component: MenuShowcase,
    description: "Navigation lists or grouped actions in menus.",
  },
  {
    name: "Modal",
    path: "/modal",
    component: ModalShowcase,
    description: "Modal dialogs for displaying content on top of an overlay.",
  },
  {
    name: "Navbar",
    path: "/navbar",
    component: NavbarShowcase,
    description: "Main navigation bar for moving between app sections.",
  },
  {
    name: "Pagination",
    path: "/pagination",
    component: PaginationShowcase,
    description:
      "Controls for navigating between pages of content or long lists.",
  },
  {
    name: "Phonemockup",
    path: "/phonemockup",
    component: PhonemockupShowcase,
    description: "Mobile phone mockup for content previews.",
  },
  {
    name: "Progress",
    path: "/progress",
    component: ProgressShowcase,
    description:
      "Visual indicators of progress for tasks or ongoing processes.",
  },
  {
    name: "Radial Progress",
    path: "/radial-progress",
    component: RadialProgressShowcase,
    description: "Circular progress indicators.",
  },
  {
    name: "Radio",
    path: "/radio",
    component: RadioShowcase,
    description: "Radio buttons for selecting a single option.",
  },
  {
    name: "Range",
    path: "/range",
    component: RangeShowcase,
    description: "Slider control for selecting values within a range.",
  },
  {
    name: "Rating",
    path: "/rating",
    component: RatingShowcase,
    description: "Rating input using stars or other icons.",
  },
  {
    name: "Select",
    path: "/select",
    component: SelectShowcase,
    description: "Dropdowns for selecting an option from a list.",
  },
  {
    name: "SvgBackground",
    path: "/svg-background",
    component: SvgBackgroundShowcase,
    description: "SVG background for the page.",
  },
  {
    name: "Sidenav",
    path: "/sidenav",
    component: SidenavShowcase,
    description: "Side navigation for app sections.",
  },
  {
    name: "Skeleton",
    path: "/skeleton",
    component: SkeletonShowcase,
    description: "Placeholder content while loading.",
  },
  {
    name: "Stack",
    path: "/stack",
    component: StackShowcase,
    description: "Layered stack of elements with overlap.",
  },
  {
    name: "Stats",
    path: "/stats",
    component: StatsShowcase,
    description: "Display statistics or data.",
  },
  {
    name: "Steps",
    path: "/steps",
    component: StepsShowcase,
    description: "Step indicators for sequential processes or forms.",
  },
  {
    name: "Swap",
    path: "/swap",
    component: SwapShowcase,
    description: "Toggle between two elements.",
  },
  {
    name: "Table",
    path: "/table",
    component: TableShowcase,
    description:
      "Tables for displaying and organizing data in rows and columns.",
  },
  {
    name: "Tabs",
    path: "/tabs",
    component: TabsShowcase,
    description:
      "Tab navigation for switching between different views or panels.",
  },
  {
    name: "Textarea",
    path: "/textarea",
    component: TextareaShowcase,
    description: "Multiline text field for entering longer content.",
  },
  {
    name: "Timeline",
    path: "/timeline",
    component: TimelineShowcase,
    description: "Visualization of events in chronological order.",
  },
  {
    name: "Toast",
    path: "/toast",
    component: ToastShowcase,
    description: "Brief, non-intrusive notifications for user messages.",
  },
  {
    name: "Toggle",
    path: "/toggle",
    component: ToggleShowcase,
    description: "Switches for toggling between two states, such as on/off.",
  },
  {
    name: "Tooltip",
    path: "/tooltip",
    component: TooltipShowcase,
    description: "Informative messages that appear on hover or focus.",
  },
  {
    name: "Window Mockup",
    path: "/windowmockup",
    component: WindowMockupShowcase,
    description: "Window frame mockup for web content preview.",
  },
];
