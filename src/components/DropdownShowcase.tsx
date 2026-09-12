import ShowcaseLayout from "./ShowcaseLayout";
import { Button, Card, Dropdown, Flex, Navbar } from "@pathscale/ui";
import { createSignal } from "solid-js";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { ActionStatus } from "./showcase/ActionStatus";

export default function DropdownShowcase() {
  const [placementStatus, setPlacementStatus] = createSignal(
    "No placement menu opened",
  );
  const sections = [
    { id: "default", title: "Default" },
    { id: "as-card", title: "As Card" },
    { id: "in-navbar", title: "In Navbar" },
    { id: "helper", title: "Helper" },
    { id: "placement", title: "Placement" },
    { id: "align", title: "Alignment" },
    { id: "props", title: "Props" },
  ] as const;

  const dropdownProps = [
    {
      name: "placement",
      type: '"top" | "bottom" | "left" | "right"',
      description: "Where the menu opens relative to the trigger",
    },
    {
      name: "autoFlip",
      type: "boolean",
      default: "true",
      description: "Flip placement when there is no room",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Initial open state (uncontrolled)",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Fired when the menu opens or closes",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable the dropdown",
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
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
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
                <Dropdown.Trigger>Click</Dropdown.Trigger>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown>
  <Dropdown.Trigger>Click</Dropdown.Trigger>
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
                <Dropdown.Trigger>Click</Dropdown.Trigger>
                <Dropdown.Menu class="w-64 p-2 shadow bg-primary text-primary-content">
                  <Card.Body>
                    <h3 class="font-bold">Card title!</h3>
                    <p>you can use any element as a dropdown.</p>
                  </Card.Body>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown>
  <Dropdown.Trigger>Click</Dropdown.Trigger>
  <Dropdown.Menu class="w-64 p-2 shadow bg-primary text-primary-content">
    <Card.Body>
      <h3 class="font-bold">Card title!</h3>
      <p>you can use any element as a dropdown.</p>
    </Card.Body>
  </Dropdown.Menu>
</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="in-navbar" title="In Navbar">
          <Flex direction="col" gap="md">
            <Navbar class="my-16 px-2 font-sans bg-base-300">
              <Navbar.Start class="px-2 lg:flex-none">
                <span class="text-lg font-bold">Brand</span>
              </Navbar.Start>
              <Navbar.End>
                <Button variant="ghost">Button</Button>
                <Dropdown placement="bottom">
                  <Dropdown.Trigger>
                    Dropdown
                  </Dropdown.Trigger>
                  <Dropdown.Menu align="end" class="w-52 mt-4">
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.End>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="my-16 px-2 font-sans bg-base-300">
  <Navbar.Start class="px-2 lg:flex-none">
    <span class="text-lg font-bold">Brand</span>
  </Navbar.Start>
  <Navbar.End>
    <Button variant="ghost">Button</Button>
    <Dropdown placement="bottom">
      <Dropdown.Trigger>
        Dropdown
      </Dropdown.Trigger>
      <Dropdown.Menu align="end" class="w-52 mt-4">
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
              <Dropdown placement="bottom">
                <Dropdown.Trigger class="text-info">
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
                    />
                  </svg>
                </Dropdown.Trigger>
                <Dropdown.Menu
                  align="end"
                  class="w-64 !p-0 shadow bg-base-100"
                >
                  <Card.Body>
                    <h2 class="text-lg font-bold">You needed more info?</h2>
                    <p>Here is a description!</p>
                  </Card.Body>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Flex justify="start" align="start" class="my-16">
  A normal text and a helper dropdown
  <Dropdown placement="bottom">
    <Dropdown.Trigger class="text-info">
      <svg ...><path d="..." /></svg>
    </Dropdown.Trigger>
    <Dropdown.Menu align="end" class="w-64 !p-0 shadow bg-base-100">
      <Card.Body>
        <h2 class="text-lg font-bold">You needed more info?</h2>
        <p>Here is a description!</p>
      </Card.Body>
    </Dropdown.Menu>
  </Dropdown>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="placement" title="Placement">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center" gap="md" class="my-16">
              <Dropdown
                id="left-placement"
                placement="left"
                onOpenChange={(open) =>
                  setPlacementStatus(`Left menu ${open ? "opened" : "closed"}`)
                }
              >
                <Dropdown.Trigger>Left</Dropdown.Trigger>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="right-placement"
                placement="right"
                onOpenChange={(open) =>
                  setPlacementStatus(`Right menu ${open ? "opened" : "closed"}`)
                }
              >
                <Dropdown.Trigger>Right</Dropdown.Trigger>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="top-placement"
                placement="top"
                onOpenChange={(open) =>
                  setPlacementStatus(`Top menu ${open ? "opened" : "closed"}`)
                }
              >
                <Dropdown.Trigger>Top</Dropdown.Trigger>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="bottom-placement"
                placement="bottom"
                onOpenChange={(open) =>
                  setPlacementStatus(`Bottom menu ${open ? "opened" : "closed"}`)
                }
              >
                <Dropdown.Trigger>Bottom</Dropdown.Trigger>
                <Dropdown.Menu class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <ActionStatus message={placementStatus()} />
            <CodeBlock
              code={`<Dropdown placement="left">...</Dropdown>
<Dropdown placement="right">...</Dropdown>
<Dropdown placement="top">...</Dropdown>
<Dropdown placement="bottom">...</Dropdown>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="align" title="Alignment">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" class="my-16">
              <Dropdown placement="bottom">
                <Dropdown.Trigger class="w-full justify-start">
                  Aligned Dropdown
                </Dropdown.Trigger>
                <Dropdown.Menu align="start" class="w-52">
                  <Dropdown.Item>Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                  <Dropdown.Item>Item 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <CodeBlock
              code={`<Dropdown placement="bottom">
  <Dropdown.Trigger class="w-full justify-start">
    Aligned Dropdown
  </Dropdown.Trigger>
  <Dropdown.Menu align="start" class="w-52">
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
