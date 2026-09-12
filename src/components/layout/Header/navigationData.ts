import type { NavigationItem } from "./types";
import { ROUTES } from "../../../config/routes";

export const navigationItems: NavigationItem[] = [
  { title: "Home", href: ROUTES.HOME },
  { title: "Theming", href: ROUTES.THEMING },
  {
    title: "Components",
    subcategories: [
      {
        title: "Actions",
        items: [
          { title: "Button", href: ROUTES.BUTTON },
          { title: "Dropdown", href: ROUTES.DROPDOWN },
          { title: "Menu", href: ROUTES.MENU },
          { title: "Dialog", href: ROUTES.DIALOG },
          { title: "Switch", href: ROUTES.SWITCH },
        ],
      },
      {
        title: "Data display",
        items: [
          { title: "Avatar", href: ROUTES.AVATAR },
          { title: "Badge", href: ROUTES.BADGE },
          { title: "Card", href: ROUTES.CARD },
          { title: "Chat Bubble", href: ROUTES.CHAT_BUBBLE },
          { title: "Data Grid", href: ROUTES.DATA_GRID },
          { title: "Empty", href: ROUTES.EMPTY },
          { title: "Kbd", href: ROUTES.KBD },
          { title: "Table", href: ROUTES.TABLE },
        ],
      },
      {
        title: "Feedback",
        items: [
          { title: "Alert", href: ROUTES.ALERT },
          { title: "Progress", href: ROUTES.PROGRESS },
          { title: "Radial Progress", href: ROUTES.RADIAL_PROGRESS },
          { title: "Skeleton", href: ROUTES.SKELETON },
          { title: "Spinner", href: ROUTES.SPINNER },
          { title: "Toast", href: ROUTES.TOAST },
          { title: "Tooltip", href: ROUTES.TOOLTIP },
        ],
      },
      {
        title: "Input",
        items: [
          { title: "Calendar", href: ROUTES.CALENDAR },
          { title: "Checkbox", href: ROUTES.CHECKBOX },
          { title: "Color Picker", href: ROUTES.COLOR_PICKER },
          { title: "File Input", href: ROUTES.FILE_INPUT },
          { title: "Form", href: ROUTES.FORM },
          { title: "Input", href: ROUTES.INPUT },
          { title: "Radio Group", href: ROUTES.RADIO_GROUP },
          { title: "Select", href: ROUTES.SELECT },
          { title: "Slider", href: ROUTES.SLIDER },
          { title: "Textarea", href: ROUTES.TEXTAREA },
        ],
      },
      {
        title: "Layout",
        items: [
          { title: "Accordion", href: ROUTES.ACCORDION },
          { title: "Collapsible", href: ROUTES.COLLAPSIBLE },
          { title: "Drawer", href: ROUTES.DRAWER },
          { title: "Flex", href: ROUTES.FLEX },
          { title: "Grid", href: ROUTES.GRID },
          { title: "Join", href: ROUTES.JOIN },
          { title: "Separator", href: ROUTES.SEPARATOR },
        ],
      },
      {
        title: "Navigation",
        items: [
          { title: "Breadcrumb", href: ROUTES.BREADCRUMB },
          { title: "Dock", href: ROUTES.DOCK },
          { title: "Link", href: ROUTES.LINK },
          { title: "Navbar", href: ROUTES.NAVBAR },
          { title: "Pagination", href: ROUTES.PAGINATION },
          { title: "Tabs", href: ROUTES.TABS },
        ],
      },
      {
        title: "Surfaces",
        items: [
          { title: "Auth Powered By", href: ROUTES.AUTH_POWERED_BY },
          { title: "Glass Panel", href: ROUTES.GLASS_PANEL },
          { title: "Glow Card", href: ROUTES.GLOW_CARD },
          { title: "Noise Background", href: ROUTES.NOISE_BACKGROUND },
          { title: "Theming", href: ROUTES.THEMING },
          { title: "Complete Coverage", href: ROUTES.COVERAGE },
        ],
      },
    ],
  },
  { title: "Docs", href: ROUTES.DOCS },
  { title: "Layouts", href: ROUTES.DOCS_LAYOUTS },
];

export const DEFAULT_COMPONENT_CATEGORY = "Surfaces";
