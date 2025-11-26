import { NavigationItem } from "./types";
import { ROUTES } from "../../../config/routes";

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    title: "Components",
    subcategories: [
      {
        title: "Utils",
        items: [
          { title: "Theming", href: ROUTES.THEMING },
          { title: "SVG Background", href: ROUTES.SVG_BACKGROUND },
        ],
      },
      {
        title: "Actions",
        items: [
          { title: "Button", href: ROUTES.BUTTON },
          { title: "Dropdown", href: ROUTES.DROPDOWN },
          { title: "Modal", href: ROUTES.MODAL },
          { title: "Swap", href: ROUTES.SWAP },
          { title: "Copy Button", href: ROUTES.COPY_BUTTON },
        ],
      },
      {
        title: "Data Display",
        items: [
          { title: "Accordion", href: ROUTES.ACCORDION },
          { title: "Avatar", href: ROUTES.AVATAR },
          { title: "Badge", href: ROUTES.BADGE },
          { title: "Card", href: ROUTES.CARD },
          { title: "Carousel", href: ROUTES.CAROUSEL },
          { title: "Chat Bubble", href: ROUTES.CHAT_BUBBLE },
          { title: "Collapse", href: ROUTES.COLLAPSE },
          { title: "Countdown", href: ROUTES.COUNTDOWN },
          { title: "Diff", href: ROUTES.DIFF },
          { title: "Icon", href: ROUTES.ICON },
          { title: "Kbd", href: ROUTES.KBD },
          { title: "Stats", href: ROUTES.STATS },
          { title: "Table", href: ROUTES.TABLE },
          { title: "Streaming Table", href: ROUTES.STREAMING_TABLE },
          { title: "Timeline", href: ROUTES.TIMELINE },
          { title: "Code Mockup", href: ROUTES.CODE_MOCKUP },
          { title: "Rating", href: ROUTES.RATING },
        ],
      },
      {
        title: "Navigation",
        items: [
          { title: "Breadcrumb", href: ROUTES.BREADCRUMB },
          { title: "Dock", href: ROUTES.DOCK },
          { title: "Link", href: ROUTES.LINK },
          { title: "Menu", href: ROUTES.MENU },
          { title: "Navbar", href: ROUTES.NAVBAR },
          { title: "Pagination", href: ROUTES.PAGINATION },
          { title: "Steps", href: ROUTES.STEPS },
          { title: "Tabs", href: ROUTES.TABS },
          { title: "Sidenav", href: ROUTES.SIDENAV },
        ],
      },
      {
        title: "Feedback",
        items: [
          { title: "Alert", href: ROUTES.ALERT },
          { title: "Loading", href: ROUTES.LOADING },
          { title: "Progress", href: ROUTES.PROGRESS },
          { title: "Radial Progress", href: ROUTES.RADIAL_PROGRESS },
          { title: "Skeleton", href: ROUTES.SKELETON },
          { title: "Toast", href: ROUTES.TOAST },
          { title: "Tooltip", href: ROUTES.TOOLTIP },
        ],
      },
      {
        title: "Data Input",
        items: [
          { title: "Calendar", href: ROUTES.CALENDAR },
          { title: "Checkbox", href: ROUTES.CHECKBOX },
          { title: "File Input", href: ROUTES.FILE_INPUT },
          { title: "Form", href: ROUTES.FORM },
          { title: "Input", href: ROUTES.INPUT },
          { title: "Radio", href: ROUTES.RADIO },
          { title: "Range", href: ROUTES.RANGE },
          { title: "Select", href: ROUTES.SELECT },
          { title: "Textarea", href: ROUTES.TEXTAREA },
          { title: "Toggle", href: ROUTES.TOGGLE },
          { title: "Join", href: ROUTES.JOIN },
        ],
      },
      {
        title: "Layout",
        items: [
          { title: "Divider", href: ROUTES.DIVIDER },
          { title: "Drawer", href: ROUTES.DRAWER },
          { title: "Flex", href: ROUTES.FLEX },
          { title: "Footer", href: ROUTES.FOOTER },
          { title: "Grid", href: ROUTES.GRID },
          { title: "Hero", href: ROUTES.HERO },
          { title: "Indicator", href: ROUTES.INDICATOR },
          { title: "Mask", href: ROUTES.MASK },
          { title: "Stack", href: ROUTES.STACK },
          { title: "Background", href: ROUTES.BACKGROUND },
        ],
      },
      {
        title: "Mockup",
        items: [
          { title: "Artboard", href: ROUTES.ARTBOARD },
          { title: "Browser Mockup", href: ROUTES.BROWSER_MOCKUP },
          { title: "Code Mockup", href: ROUTES.CODE_MOCKUP },
          { title: "Phone Mockup", href: ROUTES.PHONEMOCKUP },
          { title: "Window Mockup", href: ROUTES.WINDOW_MOCKUP },
        ],
      },
    ],
  },
  {
    title: "Docs",
    href: ROUTES.DOCS,
  },
  {
    title: "Showcases",
    href: ROUTES.SHOWCASES,
  },
];