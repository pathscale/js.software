import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  Sidenav,
  type SidenavItem,
  type SidenavItemGroup,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const SidenavShowcase: Component = () => {
  const [selectedId, setSelectedId] = createSignal("dashboard");
  const [isCollapsed, setIsCollapsed] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(true);

  const simpleMenuItems: SidenavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "#dashboard",
      icon: "⌂",
      active: selectedId() === "dashboard",
      onClick: () => setSelectedId("dashboard"),
    },
    {
      id: "users",
      label: "Users",
      href: "#users",
      icon: "👥",
      active: selectedId() === "users",
      onClick: () => setSelectedId("users"),
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "#analytics",
      icon: "📊",
      active: selectedId() === "analytics",
      onClick: () => setSelectedId("analytics"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
      active: selectedId() === "settings",
      onClick: () => setSelectedId("settings"),
    },
  ];

  const menuItems: (SidenavItem | SidenavItemGroup)[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "#dashboard",
      icon: "⌂",
      active: selectedId() === "dashboard",
      onClick: () => setSelectedId("dashboard"),
    },
    {
      label: "Management",
      items: [
        {
          id: "users",
          label: "Users",
          href: "#users",
          icon: "👥",
          active: selectedId() === "users",
          onClick: () => setSelectedId("users"),
        },
        {
          id: "analytics",
          label: "Analytics",
          href: "#analytics",
          icon: "📊",
          active: selectedId() === "analytics",
          onClick: () => setSelectedId("analytics"),
        },
      ],
    },
    {
      label: "Configuration",
      items: [
        {
          id: "settings",
          label: "Settings",
          icon: "⚙",
          active: selectedId() === "settings",
          onClick: () => setSelectedId("settings"),
        },
      ],
    },
  ];

  const sections = [
    { id: "default", title: "Default Sidenav" },
    { id: "collapsed", title: "Collapsed Sidenav" },
    { id: "item-groups", title: "Sidenav with Item Groups" },
    { id: "props", title: "Props" },
  ] as const;

  const sidenavProps = [
    {
      name: "title",
      type: "string",
      description: "The title displayed in the sidenav header.",
    },
    {
      name: "items",
      type: "(SidenavItem | SidenavItemGroup)[]",
      description: "Array of sidenav items and item groups.",
    },
    {
      name: "isOpen",
      type: "boolean",
      default: "true",
      description: "Controls the open/closed state of the sidenav.",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback function when the sidenav is closed.",
    },
    {
      name: "collapsed",
      type: "boolean",
      default: "false",
      description: "Controls the collapsed state of the sidenav.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Additional content to display in the sidenav.",
    },
    {
      name: "footer",
      type: "JSX.Element",
      description: "Content to display in the sidenav footer.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the sidenav.",
    },
    // Add other relevant props based on your Sidenav component definition
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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

        <ShowcaseSection id="default" title="Default Sidenav">
          <div class="flex">
            <Sidenav
              title="Simple Dashboard"
              items={simpleMenuItems}
              isOpen={true}
              collapsed={false}
            />
            <div class="flex-1 p-8">
              <h1>Default Sidenav Example</h1>
              <p class="text-gray-600">
                A simple sidenav with flat menu items (no groups)
              </p>
            </div>
          </div>
          <CodeBlock
            code={`const simpleMenuItems: SidenavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "#dashboard",
    icon: "⌂",
    active: selectedId() === "dashboard",
    onClick: () => setSelectedId("dashboard"),
  },
  {
    id: "users",
    label: "Users",
    href: "#users",
    icon: "👥",
    active: selectedId() === "users",
    onClick: () => setSelectedId("users"),
  },
  // ... more items
];

<Sidenav
  title="Simple Dashboard"
  items={simpleMenuItems}
  isOpen={true}
  collapsed={false}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="collapsed" title="Collapsed Sidenav">
          <div class="flex">
            <Sidenav
              title="My Dashboard"
              items={menuItems}
              isOpen={true}
              collapsed={true}
            />
            <div class="flex-1 p-8">
              <h1>Collapsed Sidenav Example</h1>
            </div>
          </div>
          <CodeBlock
            code={`<Sidenav\n  title="My Dashboard"\n  items={menuItems}\n  isOpen={true}\n  collapsed={true}\n/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="item-groups" title="Sidenav with Item Groups">
          <div class="flex">
            <Sidenav
              title="My Dashboard"
              items={menuItems}
              isOpen={true}
              collapsed={false}
            />
            <div class="flex-1 p-8">
              <h1>Sidenav with Item Groups Example</h1>
            </div>
          </div>
          {/* Reusing menuItems as it already has groups */}
          <CodeBlock
            code={`const menuItems = [\n  // ... items and groups definition ...\n];\n\n<Sidenav\n  title="My Dashboard"\n  items={menuItems}\n  isOpen={true}\n  collapsed={false}\n/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={sidenavProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default SidenavShowcase;
