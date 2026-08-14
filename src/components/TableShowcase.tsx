import { Chip, Button, Checkbox, Flex, Table } from "@pathscale/ui";
import { For } from "solid-js";

import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

// Mask avatars, Tag "ghost" color, Button size "xs") are no longer part of the public API.
// The new compound: Table -> ScrollContainer -> Content -> Header/Column + Body/Row/Cell.
export default function TableShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "visuals", title: "With Visual Elements" },
  ] as const;

  const tableProps = [
    {
      name: "variant",
      type: `"primary" | "secondary"`,
      default: `"primary"`,
      description: "Visual variant of the table surface.",
    },
    {
      name: "children",
      type: "JSX.Element",
      default: "—",
      description: "Typically Table.ScrollContainer wrapping Table.Content.",
    },
  ];

  const contentProps = [
    {
      name: "sortDescriptor",
      type: `{ column: string; direction: "ascending" | "descending" }`,
      default: "—",
      description: "Current sort state propagated to sortable columns.",
    },
    {
      name: "onSortChange",
      type: "(descriptor) => void",
      default: "—",
      description: "Fired when a sortable column is toggled.",
    },
  ];

  const headerProps = [
    {
      name: "children",
      type: "JSX.Element",
      default: "—",
      description: "Typically one or more <Table.Column> cells.",
    },
  ];

  const columnProps = [
    {
      name: "id",
      type: "string",
      default: "—",
      description: "Unique column identifier used for sorting and data-attributes.",
    },
    {
      name: "allowsSorting",
      type: "boolean",
      default: "false",
      description: "Marks the column as sortable; click/Enter toggles direction.",
    },
  ];

  const bodyProps = [
    {
      name: "children",
      type: "JSX.Element",
      default: "—",
      description: "One or more <Table.Row>.",
    },
  ];

  const rowProps = [
    {
      name: "children",
      type: "JSX.Element",
      default: "—",
      description: "Row content; usually <Table.Cell> elements.",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            <For each={sections}>
              {(section) => (
                <a
                  href={`#${section.id}`}
                  class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
                >
                  {section.title}
                </a>
              )}
            </For>
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Table>
              <Table.ScrollContainer>
                <Table.Content>
                  <Table.Header>
                    <Table.Row>
                      <Table.Column id="idx" />
                      <Table.Column id="name">Name</Table.Column>
                      <Table.Column id="job">Job</Table.Column>
                      <Table.Column id="color">Favorite Color</Table.Column>
                    </Table.Row>
                  </Table.Header>
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
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
            <CodeBlock
              code={`<Table>
  <Table.ScrollContainer>
    <Table.Content>
      <Table.Header>
        <Table.Row>
          <Table.Column id="idx" />
          <Table.Column id="name">Name</Table.Column>
          <Table.Column id="job">Job</Table.Column>
          <Table.Column id="color">Favorite Color</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>Cy Ganderton</Table.Cell>
          <Table.Cell>Quality Control Specialist</Table.Cell>
          <Table.Cell>Blue</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="visuals" title="With Visual Elements">
          <Flex direction="col" gap="md">
            <Table>
              <Table.ScrollContainer>
                <Table.Content class="rounded-box">
                  <Table.Header>
                    <Table.Row>
                      <Table.Column id="select">
                        <Checkbox />
                      </Table.Column>
                      <Table.Column id="name">Name</Table.Column>
                      <Table.Column id="job">Job</Table.Column>
                      <Table.Column id="color">Favorite Color</Table.Column>
                      <Table.Column id="actions" />
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Flex align="center" gap="md" class="truncate">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Hart Hagerty"
                            class="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                          </div>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        Zemlak, Daniel and Leannon
                        <br />
                        <Chip size="sm">
                          Desktop Support Technician
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>Purple</Table.Cell>
                      <Table.Cell>
                        <Button variant="ghost" size="sm">
                          details
                        </Button>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Flex align="center" gap="md" class="truncate">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Brice Swyre"
                            class="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div class="font-bold">Brice Swyre</div>
                            <div class="text-sm opacity-50">China</div>
                          </div>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        Carrol Group
                        <br />
                        <Chip size="sm">
                          Tax Accountant
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>Red</Table.Cell>
                      <Table.Cell>
                        <Button variant="ghost" size="sm">
                          details
                        </Button>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Flex align="center" gap="md" class="truncate">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            alt="Marjy Ferencz"
                            class="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div class="font-bold">Marjy Ferencz</div>
                            <div class="text-sm opacity-50">Russia</div>
                          </div>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        Rowe-Schoen
                        <br />
                        <Chip size="sm">
                          Office Assistant I
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>Crimson</Table.Cell>
                      <Table.Cell>
                        <Button variant="ghost" size="sm">
                          details
                        </Button>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Flex align="center" gap="md" class="truncate">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Yancy Tear"
                            class="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div class="font-bold">Yancy Tear</div>
                            <div class="text-sm opacity-50">Brazil</div>
                          </div>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        Wyman-Ledner
                        <br />
                        <Chip size="sm">
                          Community Outreach Specialist
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>Indigo</Table.Cell>
                      <Table.Cell>
                        <Button variant="ghost" size="sm">
                          details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
              <Table.Footer>Footer content area</Table.Footer>
            </Table>

            <CodeBlock
              code={`<Table>
  <Table.ScrollContainer>
    <Table.Content class="rounded-box">
      <Table.Header>
        <Table.Row>
          <Table.Column id="select"><Checkbox /></Table.Column>
          <Table.Column id="name">Name</Table.Column>
          <Table.Column id="job">Job</Table.Column>
          <Table.Column id="color">Favorite Color</Table.Column>
          <Table.Column id="actions" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell><Checkbox /></Table.Cell>
          <Table.Cell>
            <Flex align="center" gap="md" class="truncate">
              <img src="..." class="w-12 h-12 rounded-full" />
              <div>
                <div class="font-bold">Hart Hagerty</div>
                <div class="text-sm opacity-50">United States</div>
              </div>
            </Flex>
          </Table.Cell>
          <Table.Cell>
            Zemlak, Daniel and Leannon
            <br />
            <Chip size="sm">Desktop Support Technician</Chip>
          </Table.Cell>
          <Table.Cell>Purple</Table.Cell>
          <Table.Cell>
            <Button variant="ghost" size="sm">details</Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
  <Table.Footer>Footer content area</Table.Footer>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="table-props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Table (Root)</h3>
            <PropsTable props={tableProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Content</h3>
            <PropsTable props={contentProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Header</h3>
            <PropsTable props={headerProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Column</h3>
            <PropsTable props={columnProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Body</h3>
            <PropsTable props={bodyProps} />

            <h3 class="text-lg font-semibold mt-4">Table.Row</h3>
            <PropsTable props={rowProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
