import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Mask,
  Select,
  Table,
} from "@pathscale/ui";
import { createSignal, For } from "solid-js";

import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TableShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "active", title: "Active Row" },
    { id: "zebra", title: "Zebra" },
    { id: "visuals", title: "With Visual Elements" },
  ] as const;

  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const [size, setSize] = createSignal<(typeof sizes)[number]>("md");
  const sizeOptions = sizes.map((s) => ({ value: s, label: s }));

  const tableProps = [
    {
      name: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl"`,
      default: `"md"`,
      description: "Sets the size of the table.",
    },
    {
      name: "zebra",
      type: "boolean",
      default: "false",
      description: "Enables zebra-striping for alternate rows (table-zebra).",
    },
    {
      name: "pinRows",
      type: "boolean",
      default: "false",
      description: "Pins the table header rows when scrolling.",
    },
    {
      name: "pinCols",
      type: "boolean",
      default: "false",
      description: "Pins the table columns on horizontal scroll.",
    },
    {
      name: "dataTheme",
      type: "string",
      default: "—",
      description: "Applies a specific theme to the table.",
    },
  ];

  const headProps = [
    {
      name: "children",
      type: "JSX.Element | JSX.Element[]",
      default: "—",
      description: "Content of the table head, typically <th> cells.",
    },
  ];

  const bodyProps = [
    {
      name: "children",
      type: "JSX.Element | JSX.Element[]",
      default: "—",
      description:
        "Content of the table body, typically one or more <Table.Row>.",
    },
  ];

  const footerProps = [
    {
      name: "children",
      type: "JSX.Element | JSX.Element[]",
      default: "—",
      description: "Content of the table footer, typically <td> cells.",
    },
  ];

  const rowProps = [
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Highlights the row visually as active.",
    },
    {
      name: "noCell",
      type: "boolean",
      default: "false",
      description:
        "Prevents children from being automatically wrapped in <td> or <th>.",
    },
    {
      name: "children",
      type: "JSX.Element | JSX.Element[]",
      default: "—",
      description: "Row content. Can include text or any components.",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Cy Ganderton</Table.Cell>
                    <Table.Cell>Quality Control Specialist</Table.Cell>
                    <Table.Cell>Blue</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Hart Hagerty</Table.Cell>
                    <Table.Cell>Desktop Support Technician</Table.Cell>
                    <Table.Cell>Purple</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Brice Swyre</Table.Cell>
                    <Table.Cell>Tax Accountant</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Cy Ganderton</Table.Cell>
      <Table.Cell>Quality Control Specialist</Table.Cell>
      <Table.Cell>Blue</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>Hart Hagerty</Table.Cell>
      <Table.Cell>Desktop Support Technician</Table.Cell>
      <Table.Cell>Purple</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>Brice Swyre</Table.Cell>
      <Table.Cell>Tax Accountant</Table.Cell>
      <Table.Cell>Red</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="active" title="Active Row">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row active>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Cy Ganderton</Table.Cell>
                    <Table.Cell>Quality Control Specialist</Table.Cell>
                    <Table.Cell>Blue</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Hart Hagerty</Table.Cell>
                    <Table.Cell>Desktop Support Technician</Table.Cell>
                    <Table.Cell>Purple</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Brice Swyre</Table.Cell>
                    <Table.Cell>Tax Accountant</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
    <Table.Row active>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Cy Ganderton</Table.Cell>
      <Table.Cell>Quality Control Specialist</Table.Cell>
      <Table.Cell>Blue</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>Hart Hagerty</Table.Cell>
      <Table.Cell>Desktop Support Technician</Table.Cell>
      <Table.Cell>Purple</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>Brice Swyre</Table.Cell>
      <Table.Cell>Tax Accountant</Table.Cell>
      <Table.Cell>Red</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="zebra" title="Zebra">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table zebra>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Cy Ganderton</Table.Cell>
                    <Table.Cell>Quality Control Specialist</Table.Cell>
                    <Table.Cell>Blue</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Hart Hagerty</Table.Cell>
                    <Table.Cell>Desktop Support Technician</Table.Cell>
                    <Table.Cell>Purple</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Brice Swyre</Table.Cell>
                    <Table.Cell>Tax Accountant</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table zebra>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Cy Ganderton</Table.Cell>
      <Table.Cell>Quality Control Specialist</Table.Cell>
      <Table.Cell>Blue</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>Hart Hagerty</Table.Cell>
      <Table.Cell>Desktop Support Technician</Table.Cell>
      <Table.Cell>Purple</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>Brice Swyre</Table.Cell>
      <Table.Cell>Tax Accountant</Table.Cell>
      <Table.Cell>Red</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hover" title="Hover">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table hover>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Cy Ganderton</Table.Cell>
                    <Table.Cell>Quality Control Specialist</Table.Cell>
                    <Table.Cell>Blue</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Hart Hagerty</Table.Cell>
                    <Table.Cell>Desktop Support Technician</Table.Cell>
                    <Table.Cell>Purple</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Brice Swyre</Table.Cell>
                    <Table.Cell>Tax Accountant</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table hover>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Cy Ganderton</Table.Cell>
      <Table.Cell>Quality Control Specialist</Table.Cell>
      <Table.Cell>Blue</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>Hart Hagerty</Table.Cell>
      <Table.Cell>Desktop Support Technician</Table.Cell>
      <Table.Cell>Purple</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>Brice Swyre</Table.Cell>
      <Table.Cell>Tax Accountant</Table.Cell>
      <Table.Cell>Red</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-visual-elements" title="With visual elements">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table class="rounded-box">
                <Table.Head>
                  <Checkbox />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                  <Table.HeadCell />
                </Table.Head>

                <Table.Body>
                  <Table.Row>
                    <Checkbox />
                    <Flex align="center" gap="md" class="truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Hart Hagerty</div>
                        <div class="text-sm opacity-50">United States</div>
                      </div>
                    </Flex>
                    <div>
                      Zemlak, Daniel and Leannon
                      <br />
                      <Badge color="ghost" size="sm">
                        Desktop Support Technician
                      </Badge>
                    </div>
                    <div>Purple</div>
                    <Button color="ghost" size="xs">
                      details
                    </Button>
                  </Table.Row>

                  <Table.Row>
                    <Checkbox />
                    <Flex align="center" gap="md" class="truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Brice Swyre</div>
                        <div class="text-sm opacity-50">China</div>
                      </div>
                    </Flex>
                    <div>
                      Carrol Group
                      <br />
                      <Badge color="ghost" size="sm">
                        Tax Accountant
                      </Badge>
                    </div>
                    <div>Red</div>
                    <Button color="ghost" size="xs">
                      details
                    </Button>
                  </Table.Row>

                  <Table.Row>
                    <Checkbox />
                    <Flex align="center" gap="md" class="truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Marjy Ferencz</div>
                        <div class="text-sm opacity-50">Russia</div>
                      </div>
                    </Flex>
                    <div>
                      Rowe-Schoen
                      <br />
                      <Badge color="ghost" size="sm">
                        Office Assistant I
                      </Badge>
                    </div>
                    <div>Crimson</div>
                    <Button color="ghost" size="xs">
                      details
                    </Button>
                  </Table.Row>

                  <Table.Row>
                    <Checkbox />
                    <Flex align="center" gap="md" class="truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Yancy Tear</div>
                        <div class="text-sm opacity-50">Brazil</div>
                      </div>
                    </Flex>
                    <div>
                      Wyman-Ledner
                      <br />
                      <Badge color="ghost" size="sm">
                        Community Outreach Specialist
                      </Badge>
                    </div>
                    <div>Indigo</div>
                    <Button color="ghost" size="xs">
                      details
                    </Button>
                  </Table.Row>
                </Table.Body>

                <Table.Footer>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                  <Table.HeadCell />
                </Table.Footer>
              </Table>
            </div>

            <CodeBlock
              code={`<Table class="rounded-box">
  <Table.Head>
    <Checkbox />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
    <Table.HeadCell />
  </Table.Head>

  <Table.Body>
    <Table.Row>
      <Checkbox />
      <Flex align="center" gap="md" class="truncate">
        <Mask
          variant="squircle"
          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
          class="w-12 h-12"
        />
        <div>
          <div class="font-bold">Hart Hagerty</div>
          <div class="text-sm opacity-50">United States</div>
        </div>
      </Flex>
      <div>
        Zemlak, Daniel and Leannon
        <br />
        <Badge color="ghost" size="sm">Desktop Support Technician</Badge>
      </div>
      <div>Purple</div>
      <Button color="ghost" size="xs">details</Button>
    </Table.Row>

    <Table.Row>
      <Checkbox />
      <Flex align="center" gap="md" class="truncate">
        <Mask
          variant="squircle"
          src="https://img.daisyui.com/images/profile/demo/3@94.webp"
          class="w-12 h-12"
        />
        <div>
          <div class="font-bold">Brice Swyre</div>
          <div class="text-sm opacity-50">China</div>
        </div>
      </Flex>
      <div>
        Carrol Group
        <br />
        <Badge color="ghost" size="sm">Tax Accountant</Badge>
      </div>
      <div>Red</div>
      <Button color="ghost" size="xs">details</Button>
    </Table.Row>

    <Table.Row>
      <Checkbox />
      <Flex align="center" gap="md" class="truncate">
        <Mask
          variant="squircle"
          src="https://img.daisyui.com/images/profile/demo/4@94.webp"
          class="w-12 h-12"
        />
        <div>
          <div class="font-bold">Marjy Ferencz</div>
          <div class="text-sm opacity-50">Russia</div>
        </div>
      </Flex>
      <div>
        Rowe-Schoen
        <br />
        <Badge color="ghost" size="sm">Office Assistant I</Badge>
      </div>
      <div>Crimson</div>
      <Button color="ghost" size="xs">details</Button>
    </Table.Row>

    <Table.Row>
      <Checkbox />
      <Flex align="center" gap="md" class="truncate">
        <Mask
          variant="squircle"
          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
          class="w-12 h-12"
        />
        <div>
          <div class="font-bold">Yancy Tear</div>
          <div class="text-sm opacity-50">Brazil</div>
        </div>
      </Flex>
      <div>
        Wyman-Ledner
        <br />
        <Badge color="ghost" size="sm">Community Outreach Specialist</Badge>
      </div>
      <div>Indigo</div>
      <Button color="ghost" size="xs">details</Button>
    </Table.Row>
  </Table.Body>

  <Table.Footer>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
    <Table.HeadCell />
  </Table.Footer>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="table-size" title="Size">
          <Flex direction="col" gap="md">
            <Flex gap="sm" class="mb-2">
              <label for="table-size-select" class="font-medium">
                Select size:
              </label>
              <Select
                id="table-size-select"
                value={size()}
                onChange={(e) =>
                  setSize(e.currentTarget.value as (typeof sizes)[number])
                }
              >
                <For each={sizeOptions}>
                  {(opt) => <option value={opt.value}>{opt.label}</option>}
                </For>
              </Select>
            </Flex>

            <div class="overflow-x-auto">
              <Table size={size()}>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Company</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  <Table.HeadCell>Last Login</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Cy Ganderton</Table.Cell>
                    <Table.Cell>Quality Control Specialist</Table.Cell>
                    <Table.Cell>Littel, Schaden and Vandervort</Table.Cell>
                    <Table.Cell>Canada</Table.Cell>
                    <Table.Cell>12/16/2020</Table.Cell>
                    <Table.Cell>Blue</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Hart Hagerty</Table.Cell>
                    <Table.Cell>Desktop Support Technician</Table.Cell>
                    <Table.Cell>Zemlak, Daniel and Leannon</Table.Cell>
                    <Table.Cell>United States</Table.Cell>
                    <Table.Cell>12/5/2020</Table.Cell>
                    <Table.Cell>Purple</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Brice Swyre</Table.Cell>
                    <Table.Cell>Tax Accountant</Table.Cell>
                    <Table.Cell>Carroll Group</Table.Cell>
                    <Table.Cell>China</Table.Cell>
                    <Table.Cell>8/15/2020</Table.Cell>
                    <Table.Cell>Red</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Footer>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Company</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  <Table.HeadCell>Last Login</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Footer>
              </Table>
            </div>

            <CodeBlock
              code={`<Table size={size()}>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Company</Table.HeadCell>
    <Table.HeadCell>Location</Table.HeadCell>
    <Table.HeadCell>Last Login</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Cy Ganderton</Table.Cell>
      <Table.Cell>Quality Control Specialist</Table.Cell>
      <Table.Cell>Littel, Schaden and Vandervort</Table.Cell>
      <Table.Cell>Canada</Table.Cell>
      <Table.Cell>12/16/2020</Table.Cell>
      <Table.Cell>Blue</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>Hart Hagerty</Table.Cell>
      <Table.Cell>Desktop Support Technician</Table.Cell>
      <Table.Cell>Zemlak, Daniel and Leannon</Table.Cell>
      <Table.Cell>United States</Table.Cell>
      <Table.Cell>12/5/2020</Table.Cell>
      <Table.Cell>Purple</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>Brice Swyre</Table.Cell>
      <Table.Cell>Tax Accountant</Table.Cell>
      <Table.Cell>Carroll Group</Table.Cell>
      <Table.Cell>China</Table.Cell>
      <Table.Cell>8/15/2020</Table.Cell>
      <Table.Cell>Red</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Company</Table.HeadCell>
    <Table.HeadCell>Location</Table.HeadCell>
    <Table.HeadCell>Last Login</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Footer>
</Table>
`}
            />
          </Flex>
        </ShowcaseSection>
        <ShowcaseSection id="table-pinned" title="Pinned Rows and Columns">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto max-h-96">
              <Table pinRows pinCols>
                <Table.Head>
                  <Table.HeadCell />
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Favorite Color</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <For each={Array.from({ length: 10 })}>
                    {(_, i) => (
                      <Table.Row>
                        <Table.Cell>{i() + 1}</Table.Cell>
                        <Table.Cell>Cy Ganderton</Table.Cell>
                        <Table.Cell>Quality Control Specialist</Table.Cell>
                        <Table.Cell>Blue</Table.Cell>
                      </Table.Row>
                    )}
                  </For>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table pinRows pinCols>
  <Table.Head>
    <Table.HeadCell />
    <Table.HeadCell>Name</Table.HeadCell>
    <Table.HeadCell>Job</Table.HeadCell>
    <Table.HeadCell>Favorite Color</Table.HeadCell>
  </Table.Head>
  <Table.Body>
     <Table.Row>
        <Table.Cell>{1}</Table.Cell>
        <Table.Cell>Cy Ganderton</Table.Cell>
        <Table.Cell>Quality Control Specialist</Table.Cell>
        <Table.Cell>Blue</Table.Cell>
     </Table.Row>
     {/* ...more rows... */}
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="enhanced-table" title="Enhanced Table">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table.Enhanced
                columns={[
                  { accessorKey: "id", header: "ID" },
                  { accessorKey: "name", header: "Name" },
                  { accessorKey: "job", header: "Job Title" },
                  { accessorKey: "color", header: "Favorite Color" },
                ]}
                data={[
                  {
                    id: 1,
                    name: "Cy Ganderton",
                    job: "Quality Control Specialist",
                    color: "Blue",
                  },
                  {
                    id: 2,
                    name: "Hart Hagerty",
                    job: "Desktop Support Technician",
                    color: "Purple",
                  },
                  {
                    id: 3,
                    name: "Brice Swyre",
                    job: "Tax Accountant",
                    color: "Red",
                  },
                ]}
              />
            </div>

            <CodeBlock
              code={`<EnhancedTable
  columns={[
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "job", header: "Job Title" },
    { accessorKey: "color", header: "Favorite Color" },
  ]}
  data={[
    { id: 1, name: "Cy Ganderton", job: "Quality Control Specialist", color: "Blue" },
    { id: 2, name: "Hart Hagerty", job: "Desktop Support Technician", color: "Purple" },
    { id: 3, name: "Brice Swyre", job: "Tax Accountant", color: "Red" },
  ]}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="table-props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Table</h3>
            <PropsTable props={tableProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Head</h3>
            <PropsTable props={headProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Body</h3>
            <PropsTable props={bodyProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Footer</h3>
            <PropsTable props={footerProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Row</h3>
            <PropsTable props={rowProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
