import ShowcaseLayout from "./ShowcaseLayout";
import { Menu, MenuItem } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function MenuShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "states", title: "States" },
    { id: "nested", title: "Nested Menus" },
    { id: "inline", title: "Inline Menu" },
    { id: "links", title: "Links" },
    { id: "props", title: "Props" },
  ];

  const menuProps = [
    {
      name: "inline",
      type: "boolean",
      default: "false",
      description: "Whether to display menu items horizontally",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  const menuItemProps = [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Text content of the menu item",
    },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether the item is in active state",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the item is disabled",
    },
    {
      name: "to",
      type: "string",
      description: "URL for link items",
    },
    {
      name: "target",
      type: "string",
      description: "Target attribute for link items",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="w-64">
            <Menu>
              <div class="px-4 pb-2 font-medium text-gray-700">
                Main Navigation
              </div>
              <MenuItem label="Home" />
              <MenuItem label="About" />
              <MenuItem label="Contact" />
              <div class="px-4 pb-2 font-medium text-gray-700">User</div>
              <MenuItem label="Profile" />
              <MenuItem label="Settings" />
              <MenuItem label="Logout" />
            </Menu>
          </div>
          <CodeBlock
            code={`<Menu>
  <div class="px-4 pb-2 font-medium text-gray-700">Main Navigation</div>
  <MenuItem label="Home" />
  <MenuItem label="About" />
  <MenuItem label="Contact" />
  <div class="px-4 pb-2 font-medium text-gray-700">User</div>
  <MenuItem label="Profile" />
  <MenuItem label="Settings" />
  <MenuItem label="Logout" />
</Menu>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="w-64">
            <Menu>
              <MenuItem label="Active Item" active />
              <MenuItem label="Disabled Item" disabled />
              <MenuItem label="Regular Item" />
            </Menu>
          </div>
          <CodeBlock
            code={`<Menu>
  <MenuItem label="Active Item" active />
  <MenuItem label="Disabled Item" disabled />
  <MenuItem label="Regular Item" />
</Menu>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="nested" title="Nested Menus">
          <div class="w-64">
            <Menu>
              <MenuItem label="Settings">
                <MenuItem label="Account" />
                <MenuItem label="Security" />
                <MenuItem label="Notifications" />
              </MenuItem>
              <MenuItem label="Help">
                <MenuItem label="Documentation" />
                <MenuItem label="Support" />
              </MenuItem>
            </Menu>
          </div>
          <CodeBlock
            code={`<Menu>
  <MenuItem label="Settings">
    <MenuItem label="Account" />
    <MenuItem label="Security" />
    <MenuItem label="Notifications" />
  </MenuItem>
  <MenuItem label="Help">
    <MenuItem label="Documentation" />
    <MenuItem label="Support" />
  </MenuItem>
</Menu>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="inline" title="Inline Menu">
          <Menu inline>
            <MenuItem label="Home" />
            <MenuItem label="Products" />
            <MenuItem label="About" />
            <MenuItem label="Contact" />
          </Menu>
          <CodeBlock
            code={`<Menu inline>
  <MenuItem label="Home" />
  <MenuItem label="Products" />
  <MenuItem label="About" />
  <MenuItem label="Contact" />
</Menu>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="links" title="Links">
          <div class="w-64">
            <Menu>
              <MenuItem label="Documentation" to="https://docs.example.com" />
              <MenuItem
                label="External Link"
                to="https://example.com"
                target="_blank"
              />
              <MenuItem label="Internal Link" to="/dashboard" />
            </Menu>
          </div>
          <CodeBlock
            code={`<Menu>
  <MenuItem label="Documentation" to="https://docs.example.com" />
  <MenuItem label="External Link" to="https://example.com" target="_blank" />
  <MenuItem label="Internal Link" to="/dashboard" />
</Menu>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Menu Props</h3>
          <PropsTable props={menuProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">MenuItem Props</h3>
          <PropsTable props={menuItemProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
