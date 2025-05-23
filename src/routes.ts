import { Component } from "solid-js";
import Home from "./pages/Home";
import AccordionShowcase from "./components/AccordionShowcase";
import AutocompleteShowcase from "./components/AutocompleteShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import ChartShowcase from "./components/ChartShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import FieldShowcase from "./components/FieldShowcase";
import InputShowcase from "./components/InputShowcase";
import MenuShowcase from "./components/MenuShowcase";
import NavbarShowcase from "./components/NavbarShowcase";
import PaginationShowcase from "./components/PaginationShowcase";
import ProgressShowcase from "./components/ProgressShowcase";
import SelectShowcase from "./components/SelectShowcase";
import SliderShowcase from "./components/SliderShowcase";
import StepsShowcase from "./components/StepsShowcase";
import SwitchShowcase from "./components/SwitchShowcase";
import TableShowcase from "./components/TableShowcase";
import TabsShowcase from "./components/TabsShowcase";
import TagShowcase from "./components/TagShowcase";
import TextareaShowcase from "./components/TextareaShowcase";
import Theming from "./pages/Theming";
import TimelineShowcase from "./components/TimelineShowcase";
import ToastShowcase from "./components/ToastShowcase";
import TooltipShowcase from "./components/TooltipShowcase";
import UploadShowcase from "./components/UploadShowcase";
import ValidationShowcase from "./components/ValidationShowcase";

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
    name: "Accordion",
    path: "/accordion",
    component: AccordionShowcase,
    description: "Expandable and collapsible sections to show or hide content.",
  },
  {
    name: "Autocomplete",
    path: "/autocomplete",
    component: AutocompleteShowcase,
    description: "Text field with automatic suggestions based on user input.",
  },
  {
    name: "Avatar",
    path: "/avatar",
    component: AvatarShowcase,
    description:
      "Visual representation of users with images, icons, or initials.",
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
    name: "Chart",
    path: "/chart",
    component: ChartShowcase,
    description: "Charts and data visualizations in various formats.",
  },
  {
    name: "Checkbox",
    path: "/checkbox",
    component: CheckboxShowcase,
    description: "Checkboxes for selecting one or multiple options.",
  },
  {
    name: "Dropdown",
    path: "/dropdown",
    component: DropdownShowcase,
    description: "Dropdown menu for displaying additional actions or options.",
  },
  {
    name: "Field",
    path: "/field",
    component: FieldShowcase,
    description: "Container or wrapper for form fields with labels and help.",
  },
  {
    name: "Input",
    path: "/input",
    component: InputShowcase,
    description: "Text input fields for forms and user data.",
  },
  {
    name: "Menu",
    path: "/menu",
    component: MenuShowcase,
    description: "Navigation lists or grouped actions in menus.",
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
    name: "Select",
    path: "/select",
    component: SelectShowcase,
    description: "Dropdowns for selecting an option from a list.",
  },
  {
    name: "Slider",
    path: "/slider",
    component: SliderShowcase,
    description: "Slider control for selecting values within a range.",
  },
  {
    name: "Steps",
    path: "/steps",
    component: StepsShowcase,
    description: "Step indicators for sequential processes or forms.",
  },
  {
    name: "Switch",
    path: "/switch",
    component: SwitchShowcase,
    description: "Switches for toggling between two states, such as on/off.",
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
    name: "Tag",
    path: "/tag",
    component: TagShowcase,
    description:
      "Small labels for categorizing, highlighting, or filtering information.",
  },
  {
    name: "Textarea",
    path: "/textarea",
    component: TextareaShowcase,
    description: "Multiline text field for entering longer content.",
  },
  {
    name: "Theming",
    path: "/theming",
    component: Theming,
    description: "Playground for testing dynamic HSL-based theme settings.",
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
    name: "Tooltip",
    path: "/tooltip",
    component: TooltipShowcase,
    description: "Informative messages that appear on hover or focus.",
  },
  {
    name: "Upload",
    path: "/upload",
    component: UploadShowcase,
    description: "Component for uploading files from the user's device.",
  },
  {
    name: "Validation",
    path: "/validation",
    component: ValidationShowcase,
    description: "States and messages for validating forms and user input.",
  },
];
