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
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Blue</span>
                  </Table.Row>
                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Purple</span>
                  </Table.Row>
                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Red</span>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table>
  <Table.Head>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <span>1</span>
      <span>Cy Ganderton</span>
      <span>Quality Control Specialist</span>
      <span>Blue</span>
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
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <Table.Row active>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Blue</span>
                  </Table.Row>
                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Purple</span>
                  </Table.Row>
                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Red</span>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table>
  <Table.Head>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
  </Table.Head>
  <Table.Body>
    <Table.Row active>
      <span>1</span>
      <span>Cy Ganderton</span>
      <span>Quality Control Specialist</span>
      <span>Blue</span>
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
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Blue</span>
                  </Table.Row>
                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Purple</span>
                  </Table.Row>
                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Red</span>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table zebra>
  <Table.Head>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <span>1</span>
      <span>Cy Ganderton</span>
      <span>Quality Control Specialist</span>
      <span>Blue</span>
    </Table.Row>
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hover" title="Hover">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table hover>
                <Table.Head>
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Blue</span>
                  </Table.Row>
                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Purple</span>
                  </Table.Row>
                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Red</span>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table hover>
  <Table.Head>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <span>1</span>
      <span>Cy Ganderton</span>
      <span>Quality Control Specialist</span>
      <span>Blue</span>
    </Table.Row>
    <Table.Row>
      <span>2</span>
      <span>Hart Hagerty</span>
      <span>Desktop Support Technician</span>
      <span>Purple</span>
    </Table.Row>
    <Table.Row>
      <span>3</span>
      <span>Brice Swyre</span>
      <span>Tax Accountant</span>
      <span>Red</span>
    </Table.Row>
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-visual-elements" title="With visual elements">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table class="rounded-box">
                <Table.Head>
                  <Checkbox />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                  <span />
                </Table.Head>

                <Table.Body>
                  <Table.Row>
                    <Checkbox />
                    <div class="flex items-center gap-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Hart Hagerty</div>
                        <div class="text-sm opacity-50">United States</div>
                      </div>
                    </div>
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
                    <div class="flex items-center gap-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Brice Swyre</div>
                        <div class="text-sm opacity-50">China</div>
                      </div>
                    </div>
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
                    <div class="flex items-center gap-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Marjy Ferencz</div>
                        <div class="text-sm opacity-50">Russia</div>
                      </div>
                    </div>
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
                    <div class="flex items-center gap-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        class="w-12 h-12"
                      />
                      <div>
                        <div class="font-bold">Yancy Tear</div>
                        <div class="text-sm opacity-50">Brazil</div>
                      </div>
                    </div>
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
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                  <span />
                </Table.Footer>
              </Table>
            </div>

            <CodeBlock
              code={`<Table class="rounded-box">
  <Table.Head>
    <Checkbox />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
    <span />
  </Table.Head>
  <Table.Body>
    {/* ...Rows... */}
  </Table.Body>
  <Table.Footer>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
    <span />
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
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Company</span>
                  <span>Location</span>
                  <span>Last Login</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Littel, Schaden and Vandervort</span>
                    <span>Canada</span>
                    <span>12/16/2020</span>
                    <span>Blue</span>
                  </Table.Row>
                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Zemlak, Daniel and Leannon</span>
                    <span>United States</span>
                    <span>12/5/2020</span>
                    <span>Purple</span>
                  </Table.Row>
                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Carroll Group</span>
                    <span>China</span>
                    <span>8/15/2020</span>
                    <span>Red</span>
                  </Table.Row>
                </Table.Body>
                <Table.Footer>
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Company</span>
                  <span>Location</span>
                  <span>Last Login</span>
                  <span>Favorite Color</span>
                </Table.Footer>
              </Table>
            </div>

            <CodeBlock
              code={`<Table size="md">
    <Table.Head>
      <span />
      <span>Name</span>
      <span>Job</span>
      <span>Company</span>
      <span>Location</span>
      <span>Last Login</span>
      <span>Favorite Color</span>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <span>1</span>
        <span>Cy Ganderton</span>
        <span>Quality Control Specialist</span>
        <span>Littel, Schaden and Vandervort</span>
        <span>Canada</span>
        <span>12/16/2020</span>
        <span>Blue</span>
      </Table.Row>
      <Table.Row>
        <span>2</span>
        <span>Hart Hagerty</span>
        <span>Desktop Support Technician</span>
        <span>Zemlak, Daniel and Leannon</span>
        <span>United States</span>
        <span>12/5/2020</span>
        <span>Purple</span>
      </Table.Row>
      <Table.Row>
        <span>3</span>
        <span>Brice Swyre</span>
        <span>Tax Accountant</span>
        <span>Carroll Group</span>
        <span>China</span>
        <span>8/15/2020</span>
        <span>Red</span>
      </Table.Row>
    </Table.Body>
    <Table.Footer>
      <span />
      <span>Name</span>
      <span>Job</span>
      <span>Company</span>
      <span>Location</span>
      <span>Last Login</span>
      <span>Favorite Color</span>
    </Table.Footer>
  </Table>`}
            />
          </Flex>
        </ShowcaseSection>
        <ShowcaseSection id="table-pinned" title="Pinned Rows and Columns">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto max-h-96">
              <Table pinRows pinCols>
                <Table.Head>
                  <span />
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                </Table.Head>
                <Table.Body>
                  <For each={Array.from({ length: 10 })}>
                    {(_, i) => (
                      <Table.Row noCell>
                        <th>{i() + 1}</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                      </Table.Row>
                    )}
                  </For>
                </Table.Body>
              </Table>
            </div>
            <CodeBlock
              code={`<Table pinRows pinCols>
  <Table.Head>
    <span />
    <span>Name</span>
    <span>Job</span>
    <span>Favorite Color</span>
  </Table.Head>
  <Table.Body>
     <Table.Row>
        <span>1</span>
        <span>Cy Ganderton</span>
        <span>Quality Control Specialist</span>
        <span>Littel, Schaden and Vandervort</span>
        <span>Canada</span>
        <span>12/16/2020</span>
        <span>Blue</span>
     </Table.Row>
     {/* ...more rows... */}
  </Table.Body>
</Table>`}
            />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
