import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import type { Component } from "solid-js";

export interface RouteConfig {
  name: string;
  path: string;
  component: Component;
}

export const routes: RouteConfig[] = [
  { name: "Home", path: "/", component: lazy(() => import("./pages/Home")) },
  {
    name: "Button",
    path: "/button",
    component: lazy(() => import("./components/ButtonShowcase")),
  },
  {
    name: "Avatar",
    path: "/avatar",
    component: lazy(() => import("./components/AvatarShowcase")),
  },
  {
    name: "Progress",
    path: "/progress",
    component: lazy(() => import("./components/ProgressShowcase")),
  },
  {
    name: "Table",
    path: "/table",
    component: lazy(() => import("./components/TableShowcase")),
  },
  {
    name: "Tag",
    path: "/tag",
    component: lazy(() => import("./components/TagShowcase")),
  },
  {
    name: "Tooltip",
    path: "/tooltip",
    component: lazy(() => import("./components/TooltipShowcase")),
  },
  {
    name: "Slider",
    path: "/slider",
    component: lazy(() => import("./components/SliderShowcase")),
  },
  {
    name: "Pagination",
    path: "/pagination",
    component: lazy(() => import("./components/PaginationShowcase")),
  },
  {
    name: "Input",
    path: "/input",
    component: lazy(() => import("./components/InputShowcase")),
  },
  {
    name: "Autocomplete",
    path: "/autocomplete",
    component: lazy(() => import("./components/AutocompleteShowcase")),
  },
  {
    name: "Validation",
    path: "/validation",
    component: lazy(() => import("./components/ValidationShowcase")),
  },
  {
    name: "Textarea",
    path: "/textarea",
    component: lazy(() => import("./components/TextareaShowcase")),
  },
  {
    name: "Select",
    path: "/select",
    component: lazy(() => import("./components/SelectShowcase")),
  },
  {
    name: "Upload",
    path: "/upload",
    component: lazy(() => import("./components/UploadShowcase")),
  },
  {
    name: "Switch",
    path: "/switch",
    component: lazy(() => import("./components/SwitchShowcase")),
  },
  {
    name: "Field",
    path: "/field",
    component: lazy(() => import("./components/FieldShowcase")),
  },
  {
    name: "Checkbox",
    path: "/checkbox",
    component: lazy(() => import("./components/CheckboxShowcase")),
  },
  {
    name: "Breadcrumb",
    path: "/breadcrumb",
    component: lazy(() => import("./components/BreadcrumbShowcase")),
  },
  {
    name: "Dropdown",
    path: "/dropdown",
    component: lazy(() => import("./components/DropdownShowcase")),
  },
  {
    name: "Menu",
    path: "/menu",
    component: lazy(() => import("./components/MenuShowcase")),
  },
  {
    name: "Navbar",
    path: "/navbar",
    component: lazy(() => import("./components/NavbarShowcase")),
  },
  {
    name: "Accordion",
    path: "/accordion",
    component: lazy(() => import("./components/AccordionShowcase")),
  },
  {
    name: "Tabs",
    path: "/tabs",
    component: lazy(() => import("./components/TabsShowcase")),
  },
  {
    name: "Timeline",
    path: "/timeline",
    component: lazy(() => import("./components/TimelineShowcase")),
  },
  {
    name: "Steps",
    path: "/steps",
    component: lazy(() => import("./components/StepsShowcase")),
  },
  {
    name: "Chart",
    path: "/chart",
    component: lazy(() => import("./components/ChartShowcase")),
  },
  {
    name: "Toast",
    path: "/toast",
    component: lazy(() => import("./components/ToastShowcase")),
  },
];
