import ShowcaseLayout from "./ShowcaseLayout";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DropdownShowcase() {
  const sections = [
    { id: "triggers", title: "Triggers" },
    { id: "colors", title: "Colors" },
    { id: "states", title: "States" },
    { id: "custom-labels", title: "Custom Labels" },
    { id: "alignment", title: "Alignment" },
    { id: "props", title: "Props" },
  ] as const;

  const dropdownProps = [
    {
      name: "hoverable",
      type: "boolean",
      default: "false",
      description: "Opens the dropdown on hover instead of click.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the dropdown and prevents interaction.",
    },
    {
      name: "position",
      type: `"left" | "right" | "top-left" | "top-right"`,
      default: `"left"`,
      description: "Controls the alignment of the dropdown menu.",
    },
    {
      name: "children",
      type: "JSX.Element",
      required: true,
      description: "Trigger and menu content.",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="triggers" title="Triggers">
          <div class="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="fill">
                  Click trigger
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem>Option 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown hoverable>
              <DropdownTrigger>
                <Button color="positive" variant="fill">
                  Hover trigger
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem>Option 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <CodeBlock
            code={`<Dropdown>
  <DropdownTrigger>
    <Button color="primary">Click trigger</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </DropdownMenu>
</Dropdown>

<Dropdown hoverable>
  <DropdownTrigger>
    <Button color="success">Hover trigger</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="fill">
                  Primary
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Primary A</DropdownItem>
                <DropdownItem>Primary B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button color="secondary" variant="fill">
                  Secondary
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Secondary A</DropdownItem>
                <DropdownItem>Secondary B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button color="inverse" variant="fill">
                  Inverse
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Default A</DropdownItem>
                <DropdownItem>Default B</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <CodeBlock
            code={`<Dropdown>
  <DropdownTrigger>
    <Button color="primary" variant="fill">Primary</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Primary A</DropdownItem>
    <DropdownItem>Primary B</DropdownItem>
  </DropdownMenu>
</Dropdown>

<Dropdown>
  <DropdownTrigger>
    <Button color="secondary" variant="fill">Secondary</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Secondary A</DropdownItem>
    <DropdownItem>Secondary B</DropdownItem>
  </DropdownMenu>
</Dropdown>

<Dropdown>
  <DropdownTrigger>
    <Button color="inverse" variant="fill">Inverse</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Default A</DropdownItem>
    <DropdownItem>Default B</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="fill">
                  Enabled
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown disabled>
              <DropdownTrigger>
                <Button color="primary" variant="fill" disabled>
                  Disabled
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <CodeBlock
            code={`<Dropdown>
<DropdownTrigger>
  <Button color="primary" variant="fill">Enabled</Button>
</DropdownTrigger>
<DropdownMenu>
  <DropdownItem>Option A</DropdownItem>
  <DropdownItem>Option B</DropdownItem>
</DropdownMenu>
</Dropdown>

<Dropdown disabled>
<DropdownTrigger>
  <Button color="primary" variant="fill" disabled>Disabled</Button>
</DropdownTrigger>
<DropdownMenu>
  <DropdownItem>Option A</DropdownItem>
  <DropdownItem>Option B</DropdownItem>
</DropdownMenu>
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-labels" title="Custom Labels">
          <div class="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button color="accent" variant="fill">
                  More
                  <svg
                    class="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem>Option 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown disabled>
              <DropdownTrigger>
                <Button color="primary" variant="fill" disabled>
                  Cannot open
                  <svg
                    class="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Hidden</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <CodeBlock
            code={`<Dropdown>
  <DropdownTrigger>
    <Button>
      More
      <svg class="..." ... />
    </Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
  </DropdownMenu>
</Dropdown>

<Dropdown disabled>
  <DropdownTrigger>
    <Button disabled>
      Cannot open
      <svg class="..." ... />
    </Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Hidden</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alignment" title="Alignment">
          <div class="flex flex-wrap gap-4">
            <Dropdown position="left">
              <DropdownTrigger>
                <Button color="primary">Bottom Left</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown position="right">
              <DropdownTrigger>
                <Button color="primary">Bottom Right</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown position="top-left">
              <DropdownTrigger>
                <Button color="primary">Top Left</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown position="top-right">
              <DropdownTrigger>
                <Button color="primary">Top Right</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Option A</DropdownItem>
                <DropdownItem>Option B</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <CodeBlock
            code={`<Dropdown position="left">...</Dropdown>
<Dropdown position="right">...</Dropdown>
<Dropdown position="top-left">...</Dropdown>
<Dropdown position="top-right">...</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={dropdownProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
