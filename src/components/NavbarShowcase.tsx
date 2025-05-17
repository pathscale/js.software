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
      name: "brand",
      type: "JSX.Element",
      description: "Content for the brand/logo section",
    },
    {
      name: "start",
      type: "JSX.Element",
      description: "Content for the start/left section",
    },
    {
      name: "end",
      type: "JSX.Element",
      description: "Content for the end/right section",
    },
    {
      name: "color",
      type: '"info" | "primary" | "success" | "light"',
      default: '"info"',
      description: "Color theme of the navbar",
    },
  ];

  const navbarItemProps = [
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether the item is in active state",
    },
    {
      name: "href",
      type: "string",
      description: "URL for link items",
    },
    {
      name: "tag",
      type: '"a" | "div"',
      default: '"div"',
      description: "HTML element to render as",
    },
    {
      name: "to",
      type: "string",
      description: "Router link destination",
    },
  ];

  const navbarDropdownProps = [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Text label for the dropdown trigger",
    },
    {
      name: "hoverable",
      type: "boolean",
      default: "false",
      description: "Whether dropdown opens on hover",
    },
    {
      name: "align",
      type: '"left" | "right"',
      default: '"left"',
      description: "Alignment of the dropdown menu",
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
          <Navbar
            start={
              <>
                <NavbarItem active>Home</NavbarItem>
                <NavbarItem>Features</NavbarItem>
                <NavbarItem>Pricing</NavbarItem>
                <NavbarItem>About</NavbarItem>
              </>
            }
            end={
              <>
                <NavbarItem>Login</NavbarItem>
                <NavbarItem>Sign Up</NavbarItem>
              </>
            }
          />
          <CodeBlock
            code={`<Navbar
  start={
    <>
      <NavbarItem active>Home</NavbarItem>
      <NavbarItem>Features</NavbarItem>
      <NavbarItem>Pricing</NavbarItem>
      <NavbarItem>About</NavbarItem>
    </>
  }
  end={
    <>
      <NavbarItem>Login</NavbarItem>
      <NavbarItem>Sign Up</NavbarItem>
    </>
  }
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-dropdown" title="With Dropdown">
          <Navbar
            start={
              <>
                <NavbarItem active>Home</NavbarItem>
                <NavbarDropdown label="Products" hoverable>
                  <div class="p-2">
                    <NavbarItem>Product 1</NavbarItem>
                    <NavbarItem>Product 2</NavbarItem>
                    <NavbarItem>Product 3</NavbarItem>
                  </div>
                </NavbarDropdown>
                <NavbarDropdown label="Services" hoverable align="right">
                  <div class="p-2">
                    <NavbarItem>Service 1</NavbarItem>
                    <NavbarItem>Service 2</NavbarItem>
                  </div>
                </NavbarDropdown>
              </>
            }
          />
          <CodeBlock
            code={`<Navbar
  start={
    <>
      <NavbarItem active>Home</NavbarItem>
      <NavbarDropdown label="Products" hoverable>
        <div class="p-2">
          <NavbarItem>Product 1</NavbarItem>
          <NavbarItem>Product 2</NavbarItem>
          <NavbarItem>Product 3</NavbarItem>
        </div>
      </NavbarDropdown>
      <NavbarDropdown label="Services" hoverable align="right">
        <div class="p-2">
          <NavbarItem>Service 1</NavbarItem>
          <NavbarItem>Service 2</NavbarItem>
        </div>
      </NavbarDropdown>
    </>
  }
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-brand" title="With Brand">
          <Navbar
            brand={<div class="text-xl font-bold">Logo</div>}
            start={
              <>
                <NavbarItem active>Home</NavbarItem>
                <NavbarItem>Features</NavbarItem>
                <NavbarItem>About</NavbarItem>
              </>
            }
          />
          <CodeBlock
            code={`<Navbar
  brand={
    <div class="text-xl font-bold">Logo</div>
  }
  start={
    <>
      <NavbarItem active>Home</NavbarItem>
      <NavbarItem>Features</NavbarItem>
      <NavbarItem>About</NavbarItem>
    </>
  }
/>`}
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
