import { Component } from "solid-js";
import AccordionShowcase from "./components/AccordionShowcase";
import AlertShowcase from "./components/AlertShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import BadgeShowcase from "./components/BadgeShowcase";
import DockShowcase from "./components/DockShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import CardShowcase from "./components/CardShowcase";
import CarouselShowcase from "./components/CarouselShowcase";
import ChatBubbleShowcase from "./components/ChatBubbleShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import CollapseShowcase from "./components/CollapseShowcase";
import CountdownShowcase from "./components/CountdownShowcase";
import DiffShowcase from "./components/DiffShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import FileInputShowcase from "./components/FileInputShowcase";
import Home from "./pages/Home";
import InputShowcase from "./components/InputShowcase";
import KbdShowcase from "./components/KbdShowcase";
import LinkShowcase from "./components/LinkShowcase";
import LoadingShowcase from "./components/LoadingShowcase";
import MenuShowcase from "./components/MenuShowcase";
import ModalShowcase from "./components/ModalShowcase";
import NavbarShowcase from "./components/NavbarShowcase";
import PaginationShowcase from "./components/PaginationShowcase";
import ProgressShowcase from "./components/ProgressShowcase";
import RadialProgressShowcase from "./components/RadialProgressShowcase";
import RadioShowcase from "./components/RadioShowcase";
import RangeShowcase from "./components/RangeShowcase";
import RatingShowcase from "./components/RatingShowcase";
import SelectShowcase from "./components/SelectShowcase";
import SkeletonShowcase from "./components/SkeletonShowcase";
import StatsShowcase from "./components/StatsShowcase";
import StepsShowcase from "./components/StepsShowcase";
import SwapShowcase from "./components/SwapShowcase";
import SwitchShowcase from "./components/SwitchShowcase";
import TableShowcase from "./components/TableShowcase";
import TabsShowcase from "./components/TabsShowcase";
import TextareaShowcase from "./components/TextareaShowcase";
import Theming from "./pages/Theming";
import TimelineShowcase from "./components/TimelineShowcase";
import ToastShowcase from "./components/ToastShowcase";
import ToggleShowcase from "./components/ToggleShowcase";
import TooltipShowcase from "./components/TooltipShowcase";
import SidenavShowcase from "./components/SidenavShowcase";

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
    name: "Breadcrumb",
    path: "/breadcrumb",
    component: BreadcrumbShowcase,
    description: "Hierarchical navigation showing the current path in the app.",
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
    name: "Collapse",
    path: "/collapse",
    component: CollapseShowcase,
    description: "Expand and collapse content.",
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
    name: "Dock",
    path: "/dock",
    component: DockShowcase,
    description: "Navigation bar at the bottom of the screen.",
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
    name: "Input",
    path: "/input",
    component: InputShowcase,
    description: "Text input fields for forms and user data.",
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
    name: "Skeleton",
    path: "/skeleton",
    component: SkeletonShowcase,
    description: "Placeholder content while loading.",
  },
  {
    name: "Sidenav",
    path: "/sidenav",
    component: SidenavShowcase,
    description: "Side navigation for app sections.",
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
];
