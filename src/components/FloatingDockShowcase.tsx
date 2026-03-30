import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { FloatingDock, Flex } from "@pathscale/ui";
import type { FloatingDockItem } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const homeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24">
    <path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5" />
  </svg>
);

const settingsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z" />
  </svg>
);

const heartIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24">
    <path fill="currentColor" d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
  </svg>
);

const accountIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
  </svg>
);

const sampleItems: FloatingDockItem[] = [
  { title: "Home", icon: homeIcon, href: "#" },
  { title: "Search", icon: searchIcon, href: "#" },
  { title: "Favorites", icon: heartIcon, href: "#" },
  { title: "Settings", icon: settingsIcon, href: "#" },
  { title: "Account", icon: accountIcon, href: "#" },
];

const FloatingDockShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "vertical", title: "Vertical Orientation" },
    { id: "custom-sizing", title: "Custom Sizing" },
    { id: "no-container", title: "Without Container" },
    { id: "props", title: "Props" },
  ] as const;

  const floatingDockProps = [
    {
      name: "items",
      type: "FloatingDockItem[]",
      description: "Array of dock items with title, icon, href, and optional onClick.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      description: 'Direction the dock is oriented. Default: "horizontal".',
    },
    {
      name: "tooltipDirection",
      type: '"top" | "bottom" | "left" | "right"',
      description: 'Where the tooltip appears relative to each icon. Default: "top".',
    },
    {
      name: "mobilePopupDirection",
      type: '"top" | "bottom" | "left" | "right"',
      description: 'Where the mobile popup opens. Default: "top".',
    },
    {
      name: "gap",
      type: "number",
      description: "Gap between items in px. Default: 16.",
    },
    {
      name: "baseSize",
      type: "number",
      description: "Icon container resting size in px. Default: 40.",
    },
    {
      name: "hoverSize",
      type: "number",
      description: "Icon container size when hovered/nearest to cursor in px. Default: 80.",
    },
    {
      name: "iconSize",
      type: "number",
      description: "Icon resting size in px. Default: 20.",
    },
    {
      name: "hoverIconSize",
      type: "number",
      description: "Icon size when hovered/nearest in px. Default: 40.",
    },
    {
      name: "magnifyRange",
      type: "number",
      description: "Distance in px within which magnification activates. Default: 150.",
    },
    {
      name: "magnify",
      type: "boolean",
      description: "Enable the spring magnification effect. Default: true.",
    },
    {
      name: "showDesktop",
      type: "boolean",
      description: "Show the desktop dock. Default: true.",
    },
    {
      name: "showMobile",
      type: "boolean",
      description: "Show the mobile toggle dock. Default: true.",
    },
    {
      name: "showContainer",
      type: "boolean",
      description: "Show the dock container background. Default: true.",
    },
    {
      name: "desktopClass",
      type: "string",
      description: "Classes applied to the desktop dock container.",
    },
    {
      name: "mobileClass",
      type: "string",
      description: "Classes applied to the mobile dock container.",
    },
    {
      name: "itemClass",
      type: "string",
      description: "Classes applied to each item wrapper.",
    },
    {
      name: "tooltipClass",
      type: "string",
      description: "Classes applied to the tooltip.",
    },
    {
      name: "mobileToggleIcon",
      type: "JSX.Element",
      description: "Icon shown in the mobile toggle button.",
    },
    {
      name: "springMass",
      type: "number",
      description: "Spring mass for the magnification animation. Default: 0.1.",
    },
    {
      name: "springStiffness",
      type: "number",
      description: "Spring stiffness for the magnification animation. Default: 150.",
    },
    {
      name: "springDamping",
      type: "number",
      description: "Spring damping for the magnification animation. Default: 12.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value.",
    },
  ];

  const itemProps = [
    {
      name: "title",
      type: "string",
      description: "Tooltip label displayed on hover.",
    },
    {
      name: "icon",
      type: "JSX.Element",
      description: "Icon element rendered inside the dock button.",
    },
    {
      name: "href",
      type: "string",
      description: "Navigation URL. Ignored when onClick is provided.",
    },
    {
      name: "onClick",
      type: "(e: MouseEvent) => void",
      description: "Click handler. When provided, renders a button instead of an anchor.",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex class="w-full" align="center" justify="center" gap="sm">
              <FloatingDock items={sampleItems} showMobile={false} />
            </Flex>
            <CodeBlock
              code={`<FloatingDock
  items={[
    { title: "Home", icon: <HomeIcon />, href: "#" },
    { title: "Search", icon: <SearchIcon />, href: "#" },
    { title: "Favorites", icon: <HeartIcon />, href: "#" },
    { title: "Settings", icon: <SettingsIcon />, href: "#" },
    { title: "Account", icon: <AccountIcon />, href: "#" },
  ]}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="vertical" title="Vertical Orientation">
          <Flex direction="col" gap="md">
            <Flex class="w-full min-h-[300px]" align="center" justify="center" gap="sm">
              <FloatingDock
                items={sampleItems}
                orientation="vertical"
                tooltipDirection="right"
                showMobile={false}
              />
            </Flex>
            <CodeBlock
              code={`<FloatingDock
  items={items}
  orientation="vertical"
  tooltipDirection="right"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-sizing" title="Custom Sizing">
          <Flex direction="col" gap="md">
            <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
              Larger resting size (60px) with a bigger hover size (100px).
            </p>
            <Flex class="w-full" align="center" justify="center" gap="sm">
              <FloatingDock
                items={sampleItems}
                baseSize={60}
                hoverSize={100}
                iconSize={30}
                hoverIconSize={50}
                showMobile={false}
              />
            </Flex>
            <CodeBlock
              code={`<FloatingDock
  items={items}
  baseSize={60}
  hoverSize={100}
  iconSize={30}
  hoverIconSize={50}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="no-container" title="Without Container">
          <Flex direction="col" gap="md">
            <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
              The container background and shadow are hidden with showContainer set to false.
            </p>
            <Flex class="w-full" align="center" justify="center" gap="sm">
              <FloatingDock
                items={sampleItems}
                showContainer={false}
                showMobile={false}
              />
            </Flex>
            <CodeBlock
              code={`<FloatingDock
  items={items}
  showContainer={false}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">FloatingDock Props</h3>
          <PropsTable props={floatingDockProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">FloatingDockItem</h3>
          <PropsTable props={itemProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default FloatingDockShowcase;
