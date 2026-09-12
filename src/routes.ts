import type { Component } from "solid-js";
import { componentFamilies, type ComponentFamilyId } from "@pathscale/ui";
import { ROUTES } from "./config/routes";
import Home from "./pages/Home";
import Showcases from "./pages/Showcases";
import Theming from "./pages/Theming";
import DocsIndex from "./pages/docs/Index";
import DocsInstallation from "./pages/docs/Installation";
import DocsLayouts from "./pages/docs/Layouts";
import DocsUsage from "./pages/docs/Usage";
import AccordionShowcase from "./components/AccordionShowcase";
import AlertShowcase from "./components/AlertShowcase";
import AuthPoweredByShowcase from "./components/AuthPoweredByShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import BadgeShowcase from "./components/BadgeShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import CalendarShowcase from "./components/CalendarShowcase";
import CardShowcase from "./components/CardShowcase";
import ChatBubbleShowcase from "./components/ChatBubbleShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import ColorPickerShowcase from "./components/ColorPickerShowcase";
import CoverageShowcase, { coverageFamilyIds } from "./components/CoverageShowcase";
import DataGridShowcase from "./components/DataGridShowcase";
import CollapsibleShowcase from "./components/CollapsibleShowcase";
import DrawerShowcase from "./components/DrawerShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import EmptyShowcase from "./components/EmptyShowcase";
import FieldsetShowcase from "./components/FieldsetShowcase";
import FileInputShowcase from "./components/FileInputShowcase";
import FlexShowcase from "./components/FlexShowcase";
import DockShowcase from "./components/DockShowcase";
import FooterShowcase from "./components/FooterShowcase";
import FormActionsShowcase from "./components/FormActionsShowcase";
import FormShowcase from "./components/FormShowcase";
import GlassPanelShowcase from "./components/GlassPanelShowcase";
import GlowCardShowcase from "./components/GlowCardShowcase";
import GridShowcase from "./components/GridShowcase";
import IconShowcase from "./components/IconShowcase";
import InputShowcase from "./components/InputShowcase";
import JoinShowcase from "./components/JoinShowcase";
import KbdShowcase from "./components/KbdShowcase";
import LinkShowcase from "./components/LinkShowcase";
import MenuShowcase from "./components/MenuShowcase";
import DialogShowcase from "./components/DialogShowcase";
import NavbarShowcase from "./components/NavbarShowcase";
import NoiseBackgroundShowcase from "./components/NoiseBackgroundShowcase";
import PaginationShowcase from "./components/PaginationShowcase";
import ProgressShowcase from "./components/ProgressShowcase";
import RadialProgressShowcase from "./components/RadialProgressShowcase";
import RadioGroupShowcase from "./components/RadioGroupShowcase";
import RadioShowcase from "./components/RadioShowcase";
import SelectShowcase from "./components/SelectShowcase";
import SeparatorShowcase from "./components/SeparatorShowcase";
import SkeletonShowcase from "./components/SkeletonShowcase";
import SliderShowcase from "./components/SliderShowcase";
import SpinnerShowcase from "./components/SpinnerShowcase";
import TableShowcase from "./components/TableShowcase";
import TabsShowcase from "./components/TabsShowcase";
import TextareaShowcase from "./components/TextareaShowcase";
import ToastShowcase from "./components/ToastShowcase";
import SwitchShowcase from "./components/SwitchShowcase";
import TooltipShowcase from "./components/TooltipShowcase";
import VideoPreviewShowcase from "./components/VideoPreviewShowcase";

export interface RouteConfig {
  name: string;
  path: string;
  component: Component;
  description: string;
}

const dedicatedFamiliesByRoute = {
  Accordion: ["accordion"],
  Alert: ["alert"],
  "Auth Powered By": ["auth-powered-by"],
  Avatar: ["avatar"],
  Badge: ["badge"],
  Breadcrumb: ["breadcrumb"],
  Button: ["button"],
  Calendar: ["calendar"],
  Card: ["card"],
  "Chat Bubble": ["chat-bubble"],
  Checkbox: ["checkbox"],
  "Color Picker": ["color-picker"],
  Collapsible: ["collapsible"],
  Drawer: ["drawer"],
  Dropdown: ["dropdown"],
  Empty: ["empty"],
  Fieldset: ["fieldset"],
  "File Input": ["input"],
  Flex: ["flex"],
  Dock: ["dock"],
  Footer: ["footer"],
  Form: ["form"],
  "Fieldset Actions": ["fieldset"],
  "Glow Card": ["glow-card"],
  Grid: ["grid"],
  Icon: ["icon"],
  Input: ["input"],
  Join: ["join"],
  Kbd: ["kbd"],
  Link: ["link"],
  Menu: ["menu"],
  Dialog: ["dialog"],
  Navbar: ["navbar"],
  "Noise Background": ["noise-background"],
  Pagination: ["pagination"],
  Progress: ["progress"],
  "Radial Progress": ["radial-progress"],
  Radio: ["radio"],
  "Radio Group": ["radio-group"],
  Select: ["select"],
  Separator: ["separator"],
  Skeleton: ["skeleton"],
  Slider: ["slider"],
  Spinner: ["spinner"],
  "Data Grid": ["data-grid"],
  Table: ["table"],
  Tabs: ["tabs"],
  Textarea: ["textarea"],
  Toast: ["toast"],
  Switch: ["switch"],
  Tooltip: ["tooltip"],
  "Video Preview": ["video-preview"],
} as const satisfies Record<string, readonly ComponentFamilyId[]>;

const componentRoutes = ([
  ["Accordion", ROUTES.ACCORDION, AccordionShowcase, "Expandable content sections."],
  ["Alert", ROUTES.ALERT, AlertShowcase, "Important status and feedback messages."],
  [
    "Auth Powered By",
    ROUTES.AUTH_POWERED_BY,
    AuthPoweredByShowcase,
    "Honey identity-provider attribution, variants, alignment, and custom marks.",
  ],
  ["Avatar", ROUTES.AVATAR, AvatarShowcase, "Images, initials, and user identity."],
  ["Badge", ROUTES.BADGE, BadgeShowcase, "Compact labels, counts, and statuses."],
  ["Breadcrumb", ROUTES.BREADCRUMB, BreadcrumbShowcase, "Hierarchical navigation paths."],
  ["Button", ROUTES.BUTTON, ButtonShowcase, "Semantic actions and form controls."],
  ["Calendar", ROUTES.CALENDAR, CalendarShowcase, "Interactive date selection."],
  ["Card", ROUTES.CARD, CardShowcase, "Grouped content and actions."],
  ["Chat Bubble", ROUTES.CHAT_BUBBLE, ChatBubbleShowcase, "Conversation messages."],
  ["Checkbox", ROUTES.CHECKBOX, CheckboxShowcase, "Boolean and multi-select controls."],
  ["Color Picker", ROUTES.COLOR_PICKER, ColorPickerShowcase, "Composable color selection."],
  ["Collapsible", ROUTES.COLLAPSIBLE, CollapsibleShowcase, "Reveal supporting content."],
  ["Drawer", ROUTES.DRAWER, DrawerShowcase, "Edge-mounted overlay panels."],
  ["Dropdown", ROUTES.DROPDOWN, DropdownShowcase, "Contextual actions and menus."],
  ["Empty", ROUTES.EMPTY, EmptyShowcase, "Guidance for empty content."],
  ["Fieldset", ROUTES.FIELDSET, FieldsetShowcase, "Related form controls and actions."],
  ["File Input", ROUTES.FILE_INPUT, FileInputShowcase, "File selection with the Input recipe."],
  ["Flex", ROUTES.FLEX, FlexShowcase, "Responsive flex layout parameters."],
  ["Dock", ROUTES.DOCK, DockShowcase, "Magnifying action dock."],
  ["Footer", ROUTES.FOOTER, FooterShowcase, "Page footer structure."],
  ["Form", ROUTES.FORM, FormShowcase, "Validation-aware form composition."],
  ["Fieldset Actions", ROUTES.FORM_ACTIONS, FormActionsShowcase, "Semantic form action layout."],
  ["Glass Panel", ROUTES.GLASS_PANEL, GlassPanelShowcase, "Theme-driven glass surfaces."],
  ["Glow Card", ROUTES.GLOW_CARD, GlowCardShowcase, "Interactive glow surface."],
  ["Grid", ROUTES.GRID, GridShowcase, "Responsive grid layout parameters."],
  ["Icon", ROUTES.ICON, IconShowcase, "Consistent SVG icon presentation."],
  ["Input", ROUTES.INPUT, InputShowcase, "Text and native input controls."],
  ["Join", ROUTES.JOIN, JoinShowcase, "Visually connected controls."],
  ["Kbd", ROUTES.KBD, KbdShowcase, "Keyboard shortcut notation."],
  ["Link", ROUTES.LINK, LinkShowcase, "Accessible navigation links."],
  ["Menu", ROUTES.MENU, MenuShowcase, "Structured actions and navigation."],
  ["Dialog", ROUTES.DIALOG, DialogShowcase, "Focused overlay dialogs."],
  ["Navbar", ROUTES.NAVBAR, NavbarShowcase, "Application navigation structure."],
  ["Noise Background", ROUTES.NOISE_BACKGROUND, NoiseBackgroundShowcase, "Layered ambient backgrounds."],
  ["Pagination", ROUTES.PAGINATION, PaginationShowcase, "Paged data navigation."],
  ["Progress", ROUTES.PROGRESS, ProgressShowcase, "Linear progress feedback."],
  ["Radial Progress", ROUTES.RADIAL_PROGRESS, RadialProgressShowcase, "Circular progress feedback."],
  ["Radio", ROUTES.RADIO, RadioShowcase, "Single-choice controls."],
  ["Radio Group", ROUTES.RADIO_GROUP, RadioGroupShowcase, "Grouped single-choice controls."],
  ["Select", ROUTES.SELECT, SelectShowcase, "Keyboard-accessible option selection."],
  ["Separator", ROUTES.SEPARATOR, SeparatorShowcase, "Semantic content separation."],
  ["Skeleton", ROUTES.SKELETON, SkeletonShowcase, "Spinner placeholders."],
  ["Slider", ROUTES.SLIDER, SliderShowcase, "Continuous numeric input."],
  ["Spinner", ROUTES.SPINNER, SpinnerShowcase, "Indeterminate loading feedback."],
  ["Data Grid", ROUTES.DATA_GRID, DataGridShowcase, "One tag over a model that owns the state."],
  ["Table", ROUTES.TABLE, TableShowcase, "The headless parts, assembled by hand."],
  ["Tabs", ROUTES.TABS, TabsShowcase, "Selectable views and panels."],
  ["Textarea", ROUTES.TEXTAREA, TextareaShowcase, "Multiline text input."],
  ["Toast", ROUTES.TOAST, ToastShowcase, "Transient notifications."],
  ["Switch", ROUTES.SWITCH, SwitchShowcase, "Pressed and on/off state."],
  ["Tooltip", ROUTES.TOOLTIP, TooltipShowcase, "Context on hover and focus."],
  ["Video Preview", ROUTES.VIDEO_PREVIEW, VideoPreviewShowcase, "Live media preview."],
  ["Complete Coverage", ROUTES.COVERAGE, CoverageShowcase, "Current public families without a dedicated page."],
] satisfies [string, string, Component, string][]).map(
  ([name, path, component, description]): RouteConfig => ({ name, path, component, description }),
);

const demonstratedFamilies = new Set<ComponentFamilyId>(coverageFamilyIds);
for (const ids of Object.values(dedicatedFamiliesByRoute)) {
  for (const id of ids) demonstratedFamilies.add(id);
}
const missingFamilies = componentFamilies.filter(
  (family) => !demonstratedFamilies.has(family.id),
);
if (missingFamilies.length > 0) {
  throw new Error(
    `js.software has no showcase for: ${missingFamilies
      .map((family) => `${family.id} (${family.name})`)
      .join(", ")}`,
  );
}

export const routes: RouteConfig[] = [
  { name: "Home", path: ROUTES.HOME, component: Home, description: "PathScale UI documentation." },
  { name: "Theming", path: ROUTES.THEMING, component: Theming, description: "Theme and glass token playground." },
  { name: "Documentation", path: ROUTES.DOCS, component: DocsIndex, description: "PathScale UI guides." },
  { name: "Installation", path: ROUTES.DOCS_INSTALLATION, component: DocsInstallation, description: "Install UI and Solid Layouts." },
  { name: "Solid Layouts", path: ROUTES.DOCS_LAYOUTS, component: DocsLayouts, description: "Understand the two compiler passes." },
  { name: "Usage Cheatsheet", path: ROUTES.DOCS_USAGE, component: DocsUsage, description: "Common component patterns." },
  { name: "Components", path: ROUTES.SHOWCASES, component: Showcases, description: "Current interactive examples." },
  ...componentRoutes,
];
