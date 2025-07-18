import { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Components",
    subcategories: [
      {
        title: "Utils",
        items: [
          { title: "Theming", href: "/theming" },
          { title: "SVG Background", href: "/svg-background" },
        ],
      },
      {
        title: "Actions",
        items: [
          { title: "Button", href: "/button" },
          { title: "Dropdown", href: "/dropdown" },
          { title: "Modal", href: "/modal" },
          { title: "Swap", href: "/swap" },
          { title: "Copy Button", href: "/copy-button" },
        ],
      },
      {
        title: "Data Display",
        items: [
          { title: "Accordion", href: "/accordion" },
          { title: "Avatar", href: "/avatar" },
          { title: "Badge", href: "/badge" },
          { title: "Card", href: "/card" },
          { title: "Carousel", href: "/carousel" },
          { title: "Chat Bubble", href: "/chat-bubble" },
          { title: "Collapse", href: "/collapse" },
          { title: "Countdown", href: "/countdown" },
          { title: "Diff", href: "/diff" },
          { title: "Icon", href: "/icon" },
          { title: "Kbd", href: "/kbd" },
          { title: "Stats", href: "/stats" },
          { title: "Table", href: "/table" },
          { title: "Timeline", href: "/timeline" },
          { title: "Code Mockup", href: "/codemockup" },
          { title: "Rating", href: "/rating" },
        ],
      },
      {
        title: "Navigation",
        items: [
          { title: "Breadcrumb", href: "/breadcrumb" },
          { title: "Dock", href: "/dock" },
          { title: "Link", href: "/link" },
          { title: "Menu", href: "/menu" },
          { title: "Navbar", href: "/navbar" },
          { title: "Pagination", href: "/pagination" },
          { title: "Steps", href: "/steps" },
          { title: "Tabs", href: "/tabs" },
          { title: "Sidenav", href: "/sidenav" },
        ],
      },
      {
        title: "Feedback",
        items: [
          { title: "Alert", href: "/alert" },
          { title: "Loading", href: "/loading" },
          { title: "Progress", href: "/progress" },
          { title: "Radial Progress", href: "/radial-progress" },
          { title: "Skeleton", href: "/skeleton" },
          { title: "Toast", href: "/toast" },
          { title: "Tooltip", href: "/tooltip" },
        ],
      },
      {
        title: "Data Input",
        items: [
          { title: "Calendar", href: "/calendar" },
          { title: "Checkbox", href: "/checkbox" },
          { title: "File Input", href: "/file-input" },
          { title: "Form", href: "/form" },
          { title: "Input", href: "/input" },
          { title: "Radio", href: "/radio" },
          { title: "Range", href: "/range" },
          { title: "Select", href: "/select" },
          { title: "Textarea", href: "/textarea" },
          { title: "Toggle", href: "/toggle" },
          { title: "Join", href: "/join" },
        ],
      },
      {
        title: "Layout",
        items: [
          { title: "Divider", href: "/divider" },
          { title: "Drawer", href: "/drawer" },
          { title: "Flex", href: "/flex" },
          { title: "Footer", href: "/footer" },
          { title: "Grid", href: "/grid" },
          { title: "Hero", href: "/hero" },
          { title: "Indicator", href: "/indicator" },
          { title: "Mask", href: "/mask" },
          { title: "Stack", href: "/stack" },
          { title: "Background", href: "/background" },
        ],
      },
      {
        title: "Mockup",
        items: [
          { title: "Artboard", href: "/artboard" },
          { title: "Browser Mockup", href: "/browsermockup" },
          { title: "Code Mockup", href: "/codemockup" },
          { title: "Phone Mockup", href: "/phonemockup" },
          { title: "Window Mockup", href: "/windowmockup" },
        ],
      },
    ],
  },
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "Showcases",
    href: "/showcases",
  },
];