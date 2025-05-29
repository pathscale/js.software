import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  Sidenav,
  type SidenavItem,
  type SidenavItemGroup,
} from "@pathscale/ui";

const SidenavShowcase: Component = () => {
  const [selectedId, setSelectedId] = createSignal("dashboard");
  const [isCollapsed, setIsCollapsed] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(true);

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

  return (
    <div class="flex">
      <Sidenav
        title="My Dashboard"
        items={menuItems}
        isOpen={isOpen()}
        collapsed={isCollapsed()}
        footer={
          <button
            class="btn btn-ghost btn-sm w-full"
            onClick={() => setIsCollapsed(!isCollapsed())}
          >
            {isCollapsed() ? "→" : "←"}
          </button>
        }
      />
      <div class="flex-1 p-8">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default SidenavShowcase;
