import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  Sidenav,
  SidenavMenu,
  SidenavItem,
  SidenavGroup,
  SidenavLink,
  Flex,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const SidenavShowcase: Component = () => {
  const [selectedId, setSelectedId] = createSignal("dashboard");
  const [isCollapsed, setIsCollapsed] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(true);

  const simpleMenuItems = [
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
      href: "#settings",
      icon: "⚙",
      active: selectedId() === "settings",
      onClick: () => setSelectedId("settings"),
    },
  ];

  const menuItems = [
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
          href: "#settings",
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
      name: "children",
      type: "JSX.Element",
      description: "The content to display in the sidenav (typically SidenavMenu with SidenavItem and SidenavGroup components).",
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
          <Flex direction="col" gap="md">
            <Flex>
              <Sidenav
                title="Simple Dashboard"
                isOpen={true}
                collapsed={false}
              >
                <SidenavMenu>
                  {simpleMenuItems.map((item) => (
                    <SidenavItem active={item.active}>
                      <SidenavLink>
                        <a href={item.href} onClick={item.onClick}>
                          <span class="sidenav-item-icon">{item.icon}</span>
                          <span class="sidenav-item-label">{item.label}</span>
                        </a>
                      </SidenavLink>
                    </SidenavItem>
                  ))}
                </SidenavMenu>
              </Sidenav>
              <Flex grow direction="col" class="p-8">
                <h1>Default Sidenav Example</h1>
                <p class="text-gray-600">
                  A simple sidenav with flat menu items (no groups)
                </p>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Sidenav
  title="Simple Dashboard"
  isOpen={true}
  collapsed={false}
>
  <SidenavMenu>
    <SidenavItem active={selectedId() === "dashboard"}>
      <SidenavLink>
        <a href="#dashboard" onClick={() => setSelectedId("dashboard")}>
          <span class="sidenav-item-icon">⌂</span>
          <span class="sidenav-item-label">Dashboard</span>
        </a>
      </SidenavLink>
    </SidenavItem>
    <SidenavItem active={selectedId() === "users"}>
      <SidenavLink>
        <a href="#users" onClick={() => setSelectedId("users")}>
          <span class="sidenav-item-icon">👥</span>
          <span class="sidenav-item-label">Users</span>
        </a>
      </SidenavLink>
    </SidenavItem>
    {/* ... more items */}
  </SidenavMenu>
</Sidenav>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="collapsed" title="Collapsed Sidenav">
          <Flex direction="col" gap="md">
            <Flex>
              <Sidenav
                title="My Dashboard"
                isOpen={true}
                collapsed={true}
              >
                <SidenavMenu>
                  {menuItems.map((item) => (
                    item.items ? (
                      <SidenavGroup label={item.label} collapsed={true}>
                        {item.items.map((subItem) => (
                          <SidenavItem active={subItem.active}>
                            <SidenavLink>
                              <a href={subItem.href} onClick={subItem.onClick}>
                                <span class="sidenav-item-icon">{subItem.icon}</span>
                                <span class="sidenav-item-label">{subItem.label}</span>
                              </a>
                            </SidenavLink>
                          </SidenavItem>
                        ))}
                      </SidenavGroup>
                    ) : (
                      <SidenavItem active={item.active}>
                        <SidenavLink>
                          <a href={item.href} onClick={item.onClick}>
                            <span class="sidenav-item-icon">{item.icon}</span>
                            <span class="sidenav-item-label">{item.label}</span>
                          </a>
                        </SidenavLink>
                      </SidenavItem>
                    )
                  ))}
                </SidenavMenu>
              </Sidenav>
              <Flex grow direction="col" class="p-8">
                <h1>Collapsed Sidenav Example</h1>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Sidenav
  title="My Dashboard"
  isOpen={true}
  collapsed={true}
>
  <SidenavMenu>
    {/* Regular items and groups */}
  </SidenavMenu>
</Sidenav>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="item-groups" title="Sidenav with Item Groups">
          <Flex>
            <Sidenav
              title="My Dashboard"
              isOpen={true}
              collapsed={false}
            >
              <SidenavMenu>
                {menuItems.map((item) => (
                  item.items ? (
                    <SidenavGroup label={item.label} collapsed={false}>
                      {item.items.map((subItem) => (
                        <SidenavItem active={subItem.active}>
                          <SidenavLink>
                            <a href={subItem.href} onClick={subItem.onClick}>
                              <span class="sidenav-item-icon">{subItem.icon}</span>
                              <span class="sidenav-item-label">{subItem.label}</span>
                            </a>
                          </SidenavLink>
                        </SidenavItem>
                      ))}
                    </SidenavGroup>
                  ) : (
                    <SidenavItem active={item.active}>
                      <SidenavLink>
                        <a href={item.href} onClick={item.onClick}>
                          <span class="sidenav-item-icon">{item.icon}</span>
                          <span class="sidenav-item-label">{item.label}</span>
                        </a>
                      </SidenavLink>
                    </SidenavItem>
                  )
                ))}
              </SidenavMenu>
            </Sidenav>
            <Flex grow direction="col" class="p-8">
              <h1>Sidenav with Item Groups Example</h1>
            </Flex>
          </Flex>
          {/* Reusing menuItems as it already has groups */}
          <CodeBlock
            code={`<Sidenav
  title="My Dashboard"
  isOpen={true}
  collapsed={false}
>
  <SidenavMenu>
    <SidenavItem active={selectedId() === "dashboard"}>
      <SidenavLink>
        <a href="#dashboard">
          <span class="sidenav-item-icon">⌂</span>
          <span class="sidenav-item-label">Dashboard</span>
        </a>
      </SidenavLink>
    </SidenavItem>
    <SidenavGroup label="Management">
      <SidenavItem active={selectedId() === "users"}>
        <SidenavLink>
          <a href="#users">
            <span class="sidenav-item-icon">👥</span>
            <span class="sidenav-item-label">Users</span>
          </a>
        </SidenavLink>
      </SidenavItem>
      <SidenavItem active={selectedId() === "analytics"}>
        <SidenavLink>
          <a href="#analytics">
            <span class="sidenav-item-icon">📊</span>
            <span class="sidenav-item-label">Analytics</span>
          </a>
        </SidenavLink>
      </SidenavItem>
    </SidenavGroup>
  </SidenavMenu>
</Sidenav>`}
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
