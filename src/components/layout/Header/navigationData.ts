import type { NavigationItem } from "./types";
import { ROUTES } from "../../../config/routes";

export const navigationItems: NavigationItem[] = [
  { title: "Home", href: ROUTES.HOME },
  {
    title: "Components",
    subcategories: [
      {
        title: "Actions",
        items: [
          { title: "Button", href: ROUTES.BUTTON },
          { title: "Dropdown", href: ROUTES.DROPDOWN },
          { title: "Menu", href: ROUTES.MENU },
          { title: "Modal", href: ROUTES.MODAL },
          { title: "Toggle", href: ROUTES.TOGGLE },
        ],
      },
      {
        title: "Data display",
        items: [
          { title: "Avatar", href: ROUTES.AVATAR },
          { title: "Badge", href: ROUTES.BADGE },
          { title: "Card", href: ROUTES.CARD },
          { title: "Chat Bubble", href: ROUTES.CHAT_BUBBLE },
          { title: "Empty State", href: ROUTES.EMPTY_STATE },
          { title: "Kbd", href: ROUTES.KBD },
          { title: "Table", href: ROUTES.TABLE },
        ],
      },
      {
        title: "Feedback",
        items: [
          { title: "Alert", href: ROUTES.ALERT },
          { title: "Progress Bar", href: ROUTES.PROGRESS_BAR },
          { title: "Progress Circle", href: ROUTES.PROGRESS_CIRCLE },
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
          { title: "Disclosure", href: ROUTES.DISCLOSURE },
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
          { title: "Breadcrumbs", href: ROUTES.BREADCRUMB },
          { title: "Floating Dock", href: ROUTES.FLOATING_DOCK },
          { title: "Link", href: ROUTES.LINK },
          { title: "Navbar", href: ROUTES.NAVBAR },
          { title: "Pagination", href: ROUTES.PAGINATION },
          { title: "Tabs", href: ROUTES.TABS },
        ],
      },
      {
        title: "Surfaces",
        items: [
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
  { title: "Showcases", href: ROUTES.SHOWCASES },
];
