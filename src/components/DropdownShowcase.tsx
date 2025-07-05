import ShowcaseLayout from "./ShowcaseLayout";
import { Dropdown, Card, Navbar, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DropdownShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "as-card", title: "As Card" },
    { id: "in-navbar", title: "In Navbar" },
    { id: "helper", title: "Helper" },
    { id: "details", title: "Details" },
    { id: "positioning", title: "Positioning" },
    { id: "full-width", title: "Full Width" },
    { id: "props", title: "Props" },
  ] as const;

  const dropdownProps = [
    {
      name: "horizontal",
      type: '"left" | "right"',
      description: "Horizontal alignment of the dropdown menu",
    },
    {
      name: "vertical",
      type: '"top" | "bottom"',
      description: "Vertical alignment of the dropdown menu",
    },
    {
      name: "end",
      type: "boolean",
      default: "false",
      description: "Align dropdown menu to the right (legacy)",
    },
    {
      name: "hover",
      type: "boolean",
      default: "false",
      description: "Open dropdown on hover instead of click",
    },
    {
      name: "open",
      type: "boolean",
      description: "Force open/close state of the dropdown",
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      description: "Make dropdown container full width",
    },
    {
      name: "item",
      type: "JSX.Element",
      description: "Content to render as dropdown items",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessibility label",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that describes the dropdown",
    },
    {
      name: "aria-expanded",
      type: "boolean",
      description: "Indicates if dropdown is expanded",
    },
    {
      name: "aria-haspopup",
      type: "boolean | string",
      description: "Indicates dropdown has popup menu",
    },
    {
      name: "aria-labelledby",
      type: "string",
      description: "ID of element that labels the dropdown",
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
            <Flex justify="start" align="start" class="my-16">
              <Dropdown>
                <Dropdown.Toggle>Click</Dropdown.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown>
  <Dropdown.Toggle>Click</Dropdown.Toggle>
  <Dropdown.Menu class="w-52">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="as-card" title="As Card">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" class="my-16">
              <Dropdown>
                <Dropdown.Toggle>Click</Dropdown.Toggle>
                <Dropdown.Menu class="card card-compact w-64 p-2 shadow bg-primary text-primary-content m-1">
                  <Card.Body>
                    <Card.Title tag="h3">Card title!</Card.Title>
                    <p>you can use any element as a dropdown.</p>
                  </Card.Body>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown>
  <Dropdown.Toggle>Click</Dropdown.Toggle>
  <Dropdown.Menu class="card card-compact w-64 p-2 shadow bg-primary text-primary-content m-1">
    <Card.Body>
      <Card.Title tag="h3">Card title!</Card.Title>
      <p>you can use any element as a dropdown.</p>
    </Card.Body>
  </Dropdown.Menu>
</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="in-navbar" title="In Navbar">
          <Flex direction="col" gap="md">
            <Navbar class="my-16 px-2 font-sans bg-base-300 rounded-box">
              <Navbar.Start class="px-2 lg:flex-none">
                <span class="text-lg font-bold">daisyUI</span>
              </Navbar.Start>
              <Navbar.End>
                <Button color="ghost">Button</Button>
                <Dropdown end>
                  <Dropdown.Toggle
                    class="btn btn-ghost rounded-btn"
                    button={false}
                  >
                    Dropdown
                  </Dropdown.Toggle>
                  <Dropdown.Menu class="w-52 mt-4">
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.End>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="my-16 px-2 font-sans bg-base-300 rounded-box">
  <Navbar.Start class="px-2 lg:flex-none">
    <span class="text-lg font-bold">daisyUI</span>
  </Navbar.Start>
  <Navbar.End>
    <Button color="ghost">Button</Button>
    <Dropdown end>
      <Dropdown.Toggle class="btn btn-ghost rounded-btn" button={false}>
        Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu class="w-52 mt-4">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Navbar.End>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="helper" title="Helper">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" class="my-16">
              A normal text and a helper dropdown
              <Dropdown end>
                <Dropdown.Toggle
                  button={false}
                  class="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu class="card compact w-64 !p-0 shadow bg-base-100 rounded-box">
                  <Card.Body>
                    <Card.Title tag="h2">You needed more info?</Card.Title>
                    <p>Here is a description!</p>
                  </Card.Body>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Flex justify="start" align="start" class="my-16">
  A normal text and a helper dropdown
  <Dropdown end>
    <Dropdown.Toggle
      button={false}
      class="btn btn-circle btn-ghost btn-xs text-info"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-4 h-4 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </Dropdown.Toggle>
    <Dropdown.Menu class="card compact w-64 !p-0 shadow bg-base-100 rounded-box">
      <Card.Body>
        <Card.Title tag="h2">You needed more info?</Card.Title>
        <p>Here is a description!</p>
      </Card.Body>
    </Dropdown.Menu>
  </Dropdown>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="details" title="Details">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" class="my-16">
              <Dropdown.Details>
                <Dropdown.Details.Toggle>Click</Dropdown.Details.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Details>
            </Flex>
            <CodeBlock
              code={`<Dropdown.Details>
  <Dropdown.Details.Toggle>Click</Dropdown.Details.Toggle>
  <Dropdown.Menu class="w-52">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown.Details>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positioning" title="Positioning">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center" gap="md" class="my-16">
              <Dropdown horizontal="left">
                <Dropdown.Toggle>Left</Dropdown.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown horizontal="right">
                <Dropdown.Toggle>Right</Dropdown.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown vertical="top">
                <Dropdown.Toggle>Top</Dropdown.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown vertical="bottom">
                <Dropdown.Toggle>Bottom</Dropdown.Toggle>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown horizontal="left">
  <Dropdown.Toggle>Left</Dropdown.Toggle>
  <Dropdown.Menu class="w-52">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown horizontal="right">
  <Dropdown.Toggle>Right</Dropdown.Toggle>
  <Dropdown.Menu class="w-52">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown vertical="top">
  <Dropdown.Toggle>Top</Dropdown.Toggle>
  <Dropdown.Menu class="w-52">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="full-width" title="Full Width">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" class="my-16">
              <Dropdown fullWidth>
                <Dropdown.Toggle class="w-full justify-start">Full Width Dropdown</Dropdown.Toggle>
                <Dropdown.Menu class="w-full">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                  <Dropdown.Item>Item 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown fullWidth>
  <Dropdown.Toggle class="w-full justify-start">Full Width Dropdown</Dropdown.Toggle>
  <Dropdown.Menu class="w-full">
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Item>Item 2</Dropdown.Item>
    <Dropdown.Item>Item 3</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={dropdownProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
