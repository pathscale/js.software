import ShowcaseLayout from "./ShowcaseLayout";
import { Table, Badge, Button, Checkbox, Mask, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TableShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "active-row", title: "Active Row" },
    { id: "hover", title: "Highlights on Hover" },
    { id: "zebra", title: "Zebra Striping" },
    { id: "visual-elements", title: "With Visual Elements" },
    { id: "compact", title: "Compact Size" },
    { id: "pinned", title: "Pinned Rows and Columns" },
    { id: "props", title: "Props" },
  ] as const;

  const tableProps = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "The size of the table",
    },
    {
      name: "zebra",
      type: "boolean",
      default: "false",
      description: "Whether to show zebra striping",
    },
    {
      name: "pinRows",
      type: "boolean",
      default: "false",
      description: "Whether to pin rows while scrolling",
    },
    {
      name: "pinCols",
      type: "boolean",
      default: "false",
      description: "Whether to pin columns while scrolling",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  // Helper function to generate large dataset for pinned example
  const generateTableData = (colCount: number) => {
    return {
      headers: new Array(colCount).fill("header").map((value, i) => value + i),
      row: new Array(colCount).fill("data").map((value, i) => value + i),
      footers: new Array(colCount).fill("footer").map((value, i) => value + i),
    };
  };

  const tableData = generateTableData(50);

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
              code={`<div class="overflow-x-auto">
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
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="active-row" title="Active Row">
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
                  <Table.Row active={true}>
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
              code={`<div class="overflow-x-auto">
  <Table>
    <Table.Head>
      <span />
      <span>Name</span>
      <span>Job</span>
      <span>Favorite Color</span>
    </Table.Head>

    <Table.Body>
      <Table.Row active={true}>
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
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hover" title="Highlights on Hover">
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

                  <Table.Row hover={true}>
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
              code={`<div class="overflow-x-auto">
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

      <Table.Row hover={true}>
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
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="zebra" title="Zebra Striping">
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
              code={`<div class="overflow-x-auto">
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
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="visual-elements" title="With Visual Elements">
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
                    <div class="flex items-center space-x-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
                    <div class="flex items-center space-x-3 truncate">
                      <Mask
                        variant="squircle"
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
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
                </Table.Body>

                <Table.Footer>
                  <span>&nbsp;</span>
                  <span>Name</span>
                  <span>Job</span>
                  <span>Favorite Color</span>
                  <span>&nbsp;</span>
                </Table.Footer>
              </Table>
            </div>

            <CodeBlock
              code={`<div class="overflow-x-auto">
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
        <div class="flex items-center space-x-3 truncate">
          <Mask
            variant="squircle"
            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
        <Button color="ghost" size="xs">details</Button>
      </Table.Row>

      <Table.Row>
        <Checkbox />
        <div class="flex items-center space-x-3 truncate">
          <Mask
            variant="squircle"
            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
          />
          <div>
            <div class="font-bold">Brice Swyre</div>
            <div class="text-sm opacity-50">China</div>
          </div>
        </div>
        <div>
          Carrol Group
          <br />
          <Badge color="ghost" size="sm">Tax Accountant</Badge>
        </div>
        <div>Red</div>
        <Button color="ghost" size="xs">details</Button>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <span>&nbsp;</span>
      <span>Name</span>
      <span>Job</span>
      <span>Favorite Color</span>
      <span>&nbsp;</span>
    </Table.Footer>
  </Table>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="compact" title="Compact Size">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Table size="xs">
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
              code={`<div class="overflow-x-auto">
  <Table size="xs">
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
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="pinned" title="Pinned Rows and Columns">
          <Flex direction="col" gap="md">
            <Flex aligin="center" justify="center">
              <div class="overflow-x-auto max-w-lg max-h-80">
                <Table pinRows pinCols zebra>
                  <Table.Head>
                    {tableData.headers.map((header, i) => (
                      <div>{header}</div>
                    ))}
                  </Table.Head>
                  <Table.Body>
                    {Array(10)
                      .fill("")
                      .map(() => (
                        <Table.Row>
                          {tableData.row.map((cell, i) => (
                            <div>{cell}</div>
                          ))}
                        </Table.Row>
                      ))}
                  </Table.Body>
                  <Table.Footer>
                    {tableData.footers.map((footer, i) => (
                      <div>{footer}</div>
                    ))}
                  </Table.Footer>
                </Table>
              </div>
            </Flex>
            <CodeBlock
              code={`<div class="overflow-x-auto max-w-lg max-h-80">
  <Table pinRows pinCols zebra>
    <Table.Head>
      {headers.map(header => <div>{header}</div>)}
    </Table.Head>
    <Table.Body>
      {rows.map(row => (
        <Table.Row>
          {row.map(cell => <div>{cell}</div>)}
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      {footers.map(footer => <div>{footer}</div>)}
    </Table.Footer>
  </Table>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tableProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
