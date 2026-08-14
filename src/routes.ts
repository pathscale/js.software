import type { Component } from "solid-js";
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
import AvatarShowcase from "./components/AvatarShowcase";
import BadgeShowcase from "./components/BadgeShowcase";
import BreadcrumbShowcase from "./components/BreadcrumbShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import CalendarShowcase from "./components/CalendarShowcase";
import CardShowcase from "./components/CardShowcase";
import ChatBubbleShowcase from "./components/ChatBubbleShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import ColorPickerShowcase from "./components/ColorPickerShowcase";
import CoverageShowcase from "./components/CoverageShowcase";
import DataGridShowcase from "./components/DataGridShowcase";
import DisclosureShowcase from "./components/DisclosureShowcase";
import DrawerShowcase from "./components/DrawerShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import EmptyStateShowcase from "./components/EmptyStateShowcase";
import FieldsetShowcase from "./components/FieldsetShowcase";
import FileInputShowcase from "./components/FileInputShowcase";
import FlexShowcase from "./components/FlexShowcase";
import FloatingDockShowcase from "./components/FloatingDockShowcase";
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
import ModalShowcase from "./components/ModalShowcase";
import NavbarShowcase from "./components/NavbarShowcase";
import NoiseBackgroundShowcase from "./components/NoiseBackgroundShowcase";
import PaginationShowcase from "./components/PaginationShowcase";
import ProgressBarShowcase from "./components/ProgressBarShowcase";
import ProgressCircleShowcase from "./components/ProgressCircleShowcase";
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
import ToggleShowcase from "./components/ToggleShowcase";
import TooltipShowcase from "./components/TooltipShowcase";
import VideoPreviewShowcase from "./components/VideoPreviewShowcase";

export interface RouteConfig {
  name: string;
  path: string;
  component: Component;
  description: string;
}

const componentRoutes = ([
  ["Accordion", ROUTES.ACCORDION, AccordionShowcase, "Expandable content sections."],
  ["Alert", ROUTES.ALERT, AlertShowcase, "Important status and feedback messages."],
  ["Avatar", ROUTES.AVATAR, AvatarShowcase, "Images, initials, and user identity."],
  ["Badge", ROUTES.BADGE, BadgeShowcase, "Compact labels, counts, and statuses."],
  ["Breadcrumbs", ROUTES.BREADCRUMB, BreadcrumbShowcase, "Hierarchical navigation paths."],
  ["Button", ROUTES.BUTTON, ButtonShowcase, "Semantic actions and form controls."],
  ["Calendar", ROUTES.CALENDAR, CalendarShowcase, "Interactive date selection."],
  ["Card", ROUTES.CARD, CardShowcase, "Grouped content and actions."],
  ["Chat Bubble", ROUTES.CHAT_BUBBLE, ChatBubbleShowcase, "Conversation messages."],
  ["Checkbox", ROUTES.CHECKBOX, CheckboxShowcase, "Boolean and multi-select controls."],
  ["Color Picker", ROUTES.COLOR_PICKER, ColorPickerShowcase, "Composable color selection."],
  ["Disclosure", ROUTES.DISCLOSURE, DisclosureShowcase, "Reveal supporting content."],
  ["Drawer", ROUTES.DRAWER, DrawerShowcase, "Edge-mounted overlay panels."],
  ["Dropdown", ROUTES.DROPDOWN, DropdownShowcase, "Contextual actions and menus."],
  ["Empty State", ROUTES.EMPTY_STATE, EmptyStateShowcase, "Guidance for empty content."],
  ["Fieldset", ROUTES.FIELDSET, FieldsetShowcase, "Related form controls and actions."],
  ["File Input", ROUTES.FILE_INPUT, FileInputShowcase, "File selection with the Input recipe."],
  ["Flex", ROUTES.FLEX, FlexShowcase, "Responsive flex layout parameters."],
  ["Floating Dock", ROUTES.FLOATING_DOCK, FloatingDockShowcase, "Magnifying action dock."],
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
  ["Modal", ROUTES.MODAL, ModalShowcase, "Focused overlay dialogs."],
  ["Navbar", ROUTES.NAVBAR, NavbarShowcase, "Application navigation structure."],
  ["Noise Background", ROUTES.NOISE_BACKGROUND, NoiseBackgroundShowcase, "Layered ambient backgrounds."],
  ["Pagination", ROUTES.PAGINATION, PaginationShowcase, "Paged data navigation."],
  ["Progress Bar", ROUTES.PROGRESS_BAR, ProgressBarShowcase, "Linear progress feedback."],
  ["Progress Circle", ROUTES.PROGRESS_CIRCLE, ProgressCircleShowcase, "Circular progress feedback."],
  ["Radio", ROUTES.RADIO, RadioShowcase, "Single-choice controls."],
  ["Radio Group", ROUTES.RADIO_GROUP, RadioGroupShowcase, "Grouped single-choice controls."],
  ["Select", ROUTES.SELECT, SelectShowcase, "Keyboard-accessible option selection."],
  ["Separator", ROUTES.SEPARATOR, SeparatorShowcase, "Semantic content separation."],
  ["Skeleton", ROUTES.SKELETON, SkeletonShowcase, "Loading placeholders."],
  ["Slider", ROUTES.SLIDER, SliderShowcase, "Continuous numeric input."],
  ["Spinner", ROUTES.SPINNER, SpinnerShowcase, "Indeterminate loading feedback."],
  ["Data Grid", ROUTES.DATA_GRID, DataGridShowcase, "One tag over a model that owns the state."],
  ["Table", ROUTES.TABLE, TableShowcase, "The headless parts, assembled by hand."],
  ["Tabs", ROUTES.TABS, TabsShowcase, "Selectable views and panels."],
  ["Textarea", ROUTES.TEXTAREA, TextareaShowcase, "Multiline text input."],
  ["Toast", ROUTES.TOAST, ToastShowcase, "Transient notifications."],
  ["Toggle", ROUTES.TOGGLE, ToggleShowcase, "Pressed and on/off state."],
  ["Tooltip", ROUTES.TOOLTIP, TooltipShowcase, "Context on hover and focus."],
  ["Video Preview", ROUTES.VIDEO_PREVIEW, VideoPreviewShowcase, "Live media preview."],
  ["Complete Coverage", ROUTES.COVERAGE, CoverageShowcase, "Current public families without a dedicated page."],
] satisfies [string, string, Component, string][]).map(
  ([name, path, component, description]): RouteConfig => ({ name, path, component, description }),
);

export const routes: RouteConfig[] = [
  { name: "Home", path: ROUTES.HOME, component: Home, description: "PathScale UI documentation." },
  { name: "Theming", path: ROUTES.THEMING, component: Theming, description: "Theme and glass token playground." },
  { name: "Documentation", path: ROUTES.DOCS, component: DocsIndex, description: "PathScale UI guides." },
  { name: "Installation", path: ROUTES.DOCS_INSTALLATION, component: DocsInstallation, description: "Install UI and Solid Layouts." },
  { name: "Solid Layouts", path: ROUTES.DOCS_LAYOUTS, component: DocsLayouts, description: "Understand the two compiler passes." },
  { name: "Usage Cheatsheet", path: ROUTES.DOCS_USAGE, component: DocsUsage, description: "Common component patterns." },
  { name: "Showcases", path: ROUTES.SHOWCASES, component: Showcases, description: "Current interactive examples." },
  ...componentRoutes,
];
