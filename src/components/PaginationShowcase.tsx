import ShowcaseLayout from "./ShowcaseLayout";
import { Pagination, Button, Flex, Grid } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function PaginationShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "sizes", title: "Sizes" },
    { id: "disabled", title: "With Disabled Button" },
    { id: "navigation", title: "Navigation Buttons" },
    { id: "outline", title: "Outline Navigation" },
    { id: "radio", title: "Radio Inputs" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "The content to be joined together",
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
            <Flex align="left" justify="left">
              <Pagination>
                <Button class="join-item">1</Button>
                <Button class="join-item" active>
                  2
                </Button>
                <Button class="join-item">3</Button>
                <Button class="join-item">4</Button>
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <Button class="join-item">1</Button>
  <Button class="join-item" active>2</Button>
  <Button class="join-item">3</Button>
  <Button class="join-item">4</Button>
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" align="center" justify="left" gap="lg">
              <Pagination>
                <Button size="xs" class="join-item">
                  1
                </Button>
                <Button size="xs" class="join-item" active>
                  2
                </Button>
                <Button size="xs" class="join-item">
                  3
                </Button>
                <Button size="xs" class="join-item">
                  4
                </Button>
              </Pagination>

              <Pagination>
                <Button size="sm" class="join-item">
                  1
                </Button>
                <Button size="sm" class="join-item" active>
                  2
                </Button>
                <Button size="sm" class="join-item">
                  3
                </Button>
                <Button size="sm" class="join-item">
                  4
                </Button>
              </Pagination>

              <Pagination>
                <Button size="md" class="join-item">
                  1
                </Button>
                <Button size="md" class="join-item" active>
                  2
                </Button>
                <Button size="md" class="join-item">
                  3
                </Button>
                <Button size="md" class="join-item">
                  4
                </Button>
              </Pagination>

              <Pagination>
                <Button size="lg" class="join-item">
                  1
                </Button>
                <Button size="lg" class="join-item" active>
                  2
                </Button>
                <Button size="lg" class="join-item">
                  3
                </Button>
                <Button size="lg" class="join-item">
                  4
                </Button>
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <Button size="xs" class="join-item">1</Button>
  <Button size="xs" class="join-item" active>2</Button>
  <Button size="xs" class="join-item">3</Button>
  <Button size="xs" class="join-item">4</Button>
</Pagination>

<Pagination>
  <Button size="sm" class="join-item">1</Button>
  <Button size="sm" class="join-item" active>2</Button>
  <Button size="sm" class="join-item">3</Button>
  <Button size="sm" class="join-item">4</Button>
</Pagination>

<Pagination>
  <Button size="md" class="join-item">1</Button>
  <Button size="md" class="join-item" active>2</Button>
  <Button size="md" class="join-item">3</Button>
  <Button size="md" class="join-item">4</Button>
</Pagination>

<Pagination>
  <Button size="lg" class="join-item">1</Button>
  <Button size="lg" class="join-item" active>2</Button>
  <Button size="lg" class="join-item">3</Button>
  <Button size="lg" class="join-item">4</Button>
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="With Disabled Button">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <Pagination>
                <Button class="join-item">1</Button>
                <Button class="join-item">2</Button>
                <Button class="join-item" disabled>
                  ...
                </Button>
                <Button class="join-item">99</Button>
                <Button class="join-item">100</Button>
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <Button class="join-item">1</Button>
  <Button class="join-item">2</Button>
  <Button class="join-item" disabled>...</Button>
  <Button class="join-item">99</Button>
  <Button class="join-item">100</Button>
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="navigation" title="Navigation Buttons">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <Pagination>
                <Button class="join-item">«</Button>
                <Button class="join-item">Page 22</Button>
                <Button class="join-item">»</Button>
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <Button class="join-item">«</Button>
  <Button class="join-item">Page 22</Button>
  <Button class="join-item">»</Button>
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outline" title="Outline Navigation">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <Pagination>
                <Grid cols="2">
                  <Button variant="outline" class="join-item">
                    Previous page
                  </Button>
                  <Button variant="outline" class="join-item">
                    Next
                  </Button>
                </Grid>
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <Grid cols="2">
    <Button variant="outline" class="join-item">Previous page</Button>
    <Button variant="outline" class="join-item">Next</Button>
  </Grid>
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="radio" title="Radio Inputs">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <Pagination>
                <input
                  class="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label="1"
                  checked
                />
                <input
                  class="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label="2"
                />
                <input
                  class="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label="3"
                />
                <input
                  class="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label="4"
                />
              </Pagination>
            </Flex>
            <CodeBlock
              code={`<Pagination>
  <input
    class="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="1"
    checked
  />
  <input
    class="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="2"
  />
  <input
    class="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="3"
  />
  <input
    class="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="4"
  />
</Pagination>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
