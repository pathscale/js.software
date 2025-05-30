import { Accordion, Join, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function AccordionShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "with-arrow", title: "With Arrow" },
    { id: "with-plus", title: "With Plus/Minus" },
    { id: "joined", title: "Joined Together" },
    { id: "multiple", title: "Multiple Groups" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "name",
      type: "string",
      description:
        "Name attribute for radio input, used for grouping accordions",
    },
    {
      name: "icon",
      type: '"arrow" | "plus"',
      description: "Icon type to show for the accordion",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the accordion is expanded by default",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
          <Flex wrap="wrap" gap="md">
            <Accordion class="bg-base-200" checked>
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
          </Flex>
          <CodeBlock
            code={`<Accordion class="bg-base-200" checked>
  <Accordion.Title class="text-xl font-medium">
    Click to open this one and close others
  </Accordion.Title>
  <Accordion.Content>
    <p>hello</p>
  </Accordion.Content>
</Accordion>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-arrow" title="With Arrow">
          <Flex wrap="wrap" gap="md">
            <Accordion class="bg-base-200" icon="arrow" checked>
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200" icon="arrow">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200" icon="arrow">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
          </Flex>
          <CodeBlock
            code={`<Accordion class="bg-base-200" icon="arrow" checked>
  <Accordion.Title class="text-xl font-medium">
    Click to open this one and close others
  </Accordion.Title>
  <Accordion.Content>
    <p>hello</p>
  </Accordion.Content>
</Accordion>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-plus" title="With Plus/Minus">
          <Flex wrap="wrap" gap="md">
            <Accordion class="bg-base-200" icon="plus" checked>
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200" icon="plus">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="bg-base-200" icon="plus">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
          </Flex>
          <CodeBlock
            code={`<Accordion class="bg-base-200" icon="plus" checked>
  <Accordion.Title class="text-xl font-medium">
    Click to open this one and close others
  </Accordion.Title>
  <Accordion.Content>
    <p>hello</p>
  </Accordion.Content>
</Accordion>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="joined" title="Joined Together">
          <Join class="w-full" vertical>
            <Accordion
              class="border border-base-300 join-item"
              icon="arrow"
              checked
            >
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="border border-base-300 join-item" icon="arrow">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
            <Accordion class="border border-base-300 join-item" icon="arrow">
              <Accordion.Title class="text-xl font-medium">
                Click to open this one and close others
              </Accordion.Title>
              <Accordion.Content>
                <p>hello</p>
              </Accordion.Content>
            </Accordion>
          </Join>
          <CodeBlock
            code={`<Join class="w-full" vertical>
  <Accordion class="border border-base-300 join-item" icon="arrow" checked>
    <Accordion.Title class="text-xl font-medium">
      Click to open this one and close others
    </Accordion.Title>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion>
  {/* ... other accordions ... */}
</Join>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="multiple" title="Multiple Groups">
          <div class="space-y-4">
            <Flex wrap="wrap" gap="md">
              <Accordion class="bg-base-200" name="groupA" checked>
                <Accordion.Title class="text-xl font-medium">
                  Group A
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
              <Accordion class="bg-base-200" name="groupA">
                <Accordion.Title class="text-xl font-medium">
                  Group A
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
              <Accordion class="bg-base-200" name="groupA">
                <Accordion.Title class="text-xl font-medium">
                  Group A
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
            </Flex>

            <Flex wrap="wrap" gap="md">
              <Accordion class="bg-base-200" name="groupB" checked>
                <Accordion.Title class="text-xl font-medium">
                  Group B
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
              <Accordion class="bg-base-200" name="groupB">
                <Accordion.Title class="text-xl font-medium">
                  Group B
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
              <Accordion class="bg-base-200" name="groupB">
                <Accordion.Title class="text-xl font-medium">
                  Group B
                </Accordion.Title>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion>
            </Flex>
          </div>
          <CodeBlock
            code={`{/* Group A */}
<Accordion class="bg-base-200" name="groupA" checked>
  <Accordion.Title class="text-xl font-medium">Group A</Accordion.Title>
  <Accordion.Content>
    <p>hello</p>
  </Accordion.Content>
</Accordion>

{/* Group B */}
<Accordion class="bg-base-200" name="groupB" checked>
  <Accordion.Title class="text-xl font-medium">Group B</Accordion.Title>
  <Accordion.Content>
    <p>hello</p>
  </Accordion.Content>
</Accordion>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
