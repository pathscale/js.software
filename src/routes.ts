import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import type { Component } from "solid-js";

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
    component: lazy(() => import("./pages/Home")),
    description: "Main page and welcome to the component showcase.",
  },
  {
    name: "Accordion",
    path: "/accordion",
    component: lazy(() => import("./components/AccordionShowcase")),
    description: "Expandable and collapsible sections to show or hide content.",
  },
  {
    name: "Autocomplete",
    path: "/autocomplete",
    component: lazy(() => import("./components/AutocompleteShowcase")),
    description: "Text field with automatic suggestions based on user input.",
  },
  {
    name: "Avatar",
    path: "/avatar",
    component: lazy(() => import("./components/AvatarShowcase")),
    description:
      "Visual representation of users with images, icons, or initials.",
  },
  {
    name: "Breadcrumb",
    path: "/breadcrumb",
    component: lazy(() => import("./components/BreadcrumbShowcase")),
    description: "Hierarchical navigation showing the current path in the app.",
  },
  {
    name: "Button",
    path: "/button",
    component: lazy(() => import("./components/ButtonShowcase")),
    description: "Customizable buttons for actions and forms.",
  },
  {
    name: "Chart",
    path: "/chart",
    component: lazy(() => import("./components/ChartShowcase")),
    description: "Charts and data visualizations in various formats.",
  },
  {
    name: "Checkbox",
    path: "/checkbox",
    component: lazy(() => import("./components/CheckboxShowcase")),
    description: "Checkboxes for selecting one or multiple options.",
  },
  {
    name: "Dropdown",
    path: "/dropdown",
    component: lazy(() => import("./components/DropdownShowcase")),
    description: "Dropdown menu for displaying additional actions or options.",
  },
  {
    name: "Field",
    path: "/field",
    component: lazy(() => import("./components/FieldShowcase")),
    description: "Container or wrapper for form fields with labels and help.",
  },
  {
    name: "Input",
    path: "/input",
    component: lazy(() => import("./components/InputShowcase")),
    description: "Text input fields for forms and user data.",
  },
  {
    name: "Menu",
    path: "/menu",
    component: lazy(() => import("./components/MenuShowcase")),
    description: "Navigation lists or grouped actions in menus.",
  },
  {
    name: "Navbar",
    path: "/navbar",
    component: lazy(() => import("./components/NavbarShowcase")),
    description: "Main navigation bar for moving between app sections.",
  },
  {
    name: "Pagination",
    path: "/pagination",
    component: lazy(() => import("./components/PaginationShowcase")),
    description:
      "Controls for navigating between pages of content or long lists.",
  },
  {
    name: "Progress",
    path: "/progress",
    component: lazy(() => import("./components/ProgressShowcase")),
    description:
      "Visual indicators of progress for tasks or ongoing processes.",
  },
  {
    name: "Select",
    path: "/select",
    component: lazy(() => import("./components/SelectShowcase")),
    description: "Dropdowns for selecting an option from a list.",
  },
  {
    name: "Slider",
    path: "/slider",
    component: lazy(() => import("./components/SliderShowcase")),
    description: "Slider control for selecting values within a range.",
  },
  {
    name: "Steps",
    path: "/steps",
    component: lazy(() => import("./components/StepsShowcase")),
    description: "Step indicators for sequential processes or forms.",
  },
  {
    name: "Switch",
    path: "/switch",
    component: lazy(() => import("./components/SwitchShowcase")),
    description: "Switches for toggling between two states, such as on/off.",
  },
  {
    name: "Table",
    path: "/table",
    component: lazy(() => import("./components/TableShowcase")),
    description:
      "Tables for displaying and organizing data in rows and columns.",
  },
  {
    name: "Tabs",
    path: "/tabs",
    component: lazy(() => import("./components/TabsShowcase")),
    description:
      "Tab navigation for switching between different views or panels.",
  },
  {
    name: "Tag",
    path: "/tag",
    component: lazy(() => import("./components/TagShowcase")),
    description:
      "Small labels for categorizing, highlighting, or filtering information.",
  },
  {
    name: "Textarea",
    path: "/textarea",
    component: lazy(() => import("./components/TextareaShowcase")),
    description: "Multiline text field for entering longer content.",
  },
  {
    name: "Timeline",
    path: "/timeline",
    component: lazy(() => import("./components/TimelineShowcase")),
    description: "Visualization of events in chronological order.",
  },
  {
    name: "Toast",
    path: "/toast",
    component: lazy(() => import("./components/ToastShowcase")),
    description: "Brief, non-intrusive notifications for user messages.",
  },
  {
    name: "Tooltip",
    path: "/tooltip",
    component: lazy(() => import("./components/TooltipShowcase")),
    description: "Informative messages that appear on hover or focus.",
  },
  {
    name: "Upload",
    path: "/upload",
    component: lazy(() => import("./components/UploadShowcase")),
    description: "Component for uploading files from the user's device.",
  },
  {
    name: "Validation",
    path: "/validation",
    component: lazy(() => import("./components/ValidationShowcase")),
    description: "States and messages for validating forms and user input.",
  },
];
