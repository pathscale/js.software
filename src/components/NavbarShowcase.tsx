import ShowcaseLayout from "./ShowcaseLayout";
import { Navbar, NavbarItem, NavbarDropdown } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function NavbarShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "colors", title: "Colors" },
    { id: "with-items", title: "With Items" },
    { id: "with-dropdown", title: "With Dropdown" },
    { id: "with-brand", title: "With Brand" },
    { id: "props", title: "Props" },
  ];

  const colors = ["info", "primary", "success", "light"] as const;

  const navbarProps = [
    {
      name: "color",
      type: `"primary" | "info" | "success" | "danger" | "warning" | "light"`,
      default: `"primary"`,
      description: "Visual color scheme for the navbar",
    },
    {
      name: "modelValue",
      type: "string",
      description: "Current selected label value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Called when a new item is selected",
    },
    {
      name: "spaced",
      type: "boolean",
      default: "false",
      description: "Applies horizontal and vertical spacing",
    },
    {
      name: "shadow",
      type: "boolean",
      default: "false",
      description: "Adds a shadow below the navbar",
    },
    {
      name: "transparent",
      type: "boolean",
      default: "false",
      description: "Removes background and borders",
    },
    {
      name: "fixedTop",
      type: "boolean",
      default: "false",
      description: "Fixes the navbar to the top of the page",
    },
    {
      name: "fixedBottom",
      type: "boolean",
      default: "false",
      description: "Fixes the navbar to the bottom of the page",
    },
    {
      name: "children",
      type: "JSX.Element",
      description:
        "The content inside the navbar, typically NavbarItems and Dropdowns",
    },
  ];

  const navbarItemProps = [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Value used for selection and active state",
    },
    {
      name: "color",
      type: `"light" | "default"`,
      default: `"default"`,
      description: "Visual variant of the item",
    },
    {
      name: "align",
      type: `"start" | "end"`,
      default: `"start"`,
      description: "Aligns the item to left or right",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Visual content of the item",
    },
  ];

  const navbarDropdownProps = [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Trigger label for the dropdown menu",
    },
    {
      name: "hoverable",
      type: "boolean",
      default: "false",
      description: "Open dropdown on hover instead of click",
    },
    {
      name: "align",
      type: `"left" | "right"`,
      default: `"left"`,
      description: "Horizontal alignment of the dropdown menu",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content shown inside the dropdown",
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
          <div class="space-y-4">
            <Navbar>
              <div>Basic Navbar</div>
            </Navbar>
          </div>
          <CodeBlock
            code={`<Navbar>
  <div>Basic Navbar</div>
</Navbar>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="space-y-4">
            {colors.map((color) => (
              <Navbar color={color}>
                <div>Navbar {color}</div>
              </Navbar>
            ))}
          </div>
          <CodeBlock
            code={`// Color variants
<Navbar color="info">Info Navbar</Navbar>
<Navbar color="primary">Primary Navbar</Navbar>
<Navbar color="success">Success Navbar</Navbar>
<Navbar color="light">Light Navbar</Navbar>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-items" title="With Items">
          <div class="space-y-4">
            <Navbar
              modelValue="Home"
              onChange={(val) => console.log("selected:", val)}
            >
              <NavbarItem label="Home">Home</NavbarItem>
              <NavbarItem label="Features">Features</NavbarItem>
              <NavbarItem label="Pricing">Pricing</NavbarItem>
              <NavbarItem label="About">About</NavbarItem>
              <NavbarItem label="Login">Login</NavbarItem>
              <NavbarItem label="Sign Up">Sign Up</NavbarItem>
            </Navbar>
          </div>
          <CodeBlock
            code={`<Navbar modelValue="Home" onChange={(val) => console.log("selected:", val)}>
  <NavbarItem label="Home">Home</NavbarItem>
  <NavbarItem label="Features">Features</NavbarItem>
  <NavbarItem label="Pricing">Pricing</NavbarItem>
  <NavbarItem label="About">About</NavbarItem>
  <NavbarItem label="Login">Login</NavbarItem>
  <NavbarItem label="Sign Up">Sign Up</NavbarItem>
</Navbar>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-dropdown" title="With Dropdown">
          <div class="space-y-4">
            <Navbar
              modelValue="Home"
              onChange={(val) => console.log("selected:", val)}
            >
              <NavbarItem label="Home">Home</NavbarItem>
              <NavbarDropdown label="Products" hoverable>
                <div class="p-2 space-y-1">
                  <NavbarItem label="Product A" color="light">
                    Product A
                  </NavbarItem>
                  <NavbarItem label="Product B" color="light">
                    Product B
                  </NavbarItem>
                </div>
              </NavbarDropdown>
              <NavbarDropdown label="Resources" hoverable align="right">
                <div class="p-2 space-y-1">
                  <NavbarItem label="Docs" color="light">
                    Docs
                  </NavbarItem>
                  <NavbarItem label="API" color="light">
                    API
                  </NavbarItem>
                </div>
              </NavbarDropdown>
            </Navbar>
            <CodeBlock
              code={`<Navbar modelValue="Home" onChange={(val) => console.log("selected:", val)}>
  <NavbarItem label="Home">Home</NavbarItem>
  <NavbarDropdown label="Products" hoverable>…</NavbarDropdown>
  <NavbarDropdown label="Resources" hoverable align="right">…</NavbarDropdown>
</Navbar>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="with-brand" title="With Brand">
          <div class="space-y-4">
            <Navbar
              modelValue="Home"
              onChange={(val) => console.log("selected:", val)}
            >
              <NavbarItem label="Home">
                <span class="text-xl font-bold">Logo</span>
              </NavbarItem>
              <NavbarItem label="Features">Features</NavbarItem>
              <NavbarItem label="About">About</NavbarItem>
            </Navbar>
          </div>

          <CodeBlock
            code={`<Navbar modelValue="Home" onChange={(val) => console.log("selected:", val)}>
  <NavbarItem label="Home">
    <span class="text-xl font-bold">Logo</span>
  </NavbarItem>
  <NavbarItem label="Features">Features</NavbarItem>
  <NavbarItem label="About">About</NavbarItem>
</Navbar>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="visual-variants" title="Visual Variants">
          <div class="space-y-6">
            <Navbar color="primary" spaced shadow modelValue="Home">
              <NavbarItem label="Home">Home</NavbarItem>
              <NavbarItem label="About">About</NavbarItem>
              <NavbarItem label="Contact">Contact</NavbarItem>
            </Navbar>

            <Navbar color="light" transparent modelValue="Home">
              <NavbarItem label="Home">Home</NavbarItem>
              <NavbarItem label="Docs">Docs</NavbarItem>
              <NavbarItem label="API">API</NavbarItem>
            </Navbar>
          </div>

          <CodeBlock
            code={`<Navbar color="primary" spaced shadow modelValue="Home">...</Navbar>
<Navbar color="light" transparent modelValue="Home">...</Navbar>

<div class="h-64 overflow-y-scroll relative">
  <Navbar fixedTop>...</Navbar>
  <div class="pt-16">...</div>
</div>

<div class="h-64 overflow-y-scroll relative">
  <div class="pb-16">...</div>
  <Navbar fixedBottom>...</Navbar>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Navbar Props</h3>
          <PropsTable props={navbarProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">NavbarItem Props</h3>
          <PropsTable props={navbarItemProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">NavbarDropdown Props</h3>
          <PropsTable props={navbarDropdownProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
