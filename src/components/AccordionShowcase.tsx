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
      name: "selectionMode",
      type: '"single" | "multiple"',
      default: '"single"',
      description: "Whether one or many items can be expanded at the same time",
    },
    {
      name: "value",
      type: "string | string[]",
      description: "Controlled expanded item value(s)",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      description: "Initially expanded item value(s) (uncontrolled)",
    },
    {
      name: "onValueChange",
      type: "(value: string[]) => void",
      description: "Callback fired when expanded items change",
    },
    {
      name: "variant",
      type: '"default" | "surface"',
      default: '"default"',
      description: "Visual style of the accordion root",
    },
    {
      name: "hideSeparator",
      type: "boolean",
      default: "false",
      description: "Hide separators between items",
    },
    {
      name: "isDisabled",
      type: "boolean",
      default: "false",
      description: "Disable the entire accordion",
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
          <Flex direction="col" gap="md">
            <Accordion class="bg-base-200" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="c">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <CodeBlock
              code={`<Accordion class="bg-base-200" defaultValue="a">
  <Accordion.Item value="a">
    <Accordion.Trigger class="text-xl font-medium">
      Click to open this one and close others
    </Accordion.Trigger>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `icon="arrow"` removed; built-in indicator is now a chevron via <Accordion.Indicator/>. Section kept to show default chevron behavior. */}
        <ShowcaseSection id="with-arrow" title="With Arrow">
          <Flex direction="col" gap="md">
            <Accordion class="bg-base-200" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="c">
                <Accordion.Trigger class="text-xl font-medium">
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <CodeBlock
              code={`<Accordion class="bg-base-200" defaultValue="a">
  <Accordion.Item value="a">
    <Accordion.Trigger class="text-xl font-medium">
      Click to open this one and close others
    </Accordion.Trigger>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `icon="plus"` removed; pass a custom indicator via <Accordion.Trigger indicator={...}> to render plus/minus. */}
        <ShowcaseSection id="with-plus" title="With Plus/Minus">
          <Flex direction="col" gap="md">
            <Accordion class="bg-base-200" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Trigger
                  class="text-xl font-medium"
                  indicator={<span aria-hidden="true">+</span>}
                >
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.Trigger
                  class="text-xl font-medium"
                  indicator={<span aria-hidden="true">+</span>}
                >
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="c">
                <Accordion.Trigger
                  class="text-xl font-medium"
                  indicator={<span aria-hidden="true">+</span>}
                >
                  Click to open this one and close others
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <CodeBlock
              code={`<Accordion class="bg-base-200" defaultValue="a">
  <Accordion.Item value="a">
    <Accordion.Trigger class="text-xl font-medium" indicator={<span>+</span>}>
      Click to open this one and close others
    </Accordion.Trigger>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="joined" title="Joined Together">
          <Flex direction="col" gap="md">
            <Join class="w-full" vertical>
              <Accordion
                class="border border-base-300 join-item"
                defaultValue="a"
              >
                <Accordion.Item value="a">
                  <Accordion.Trigger class="text-xl font-medium">
                    Click to open this one and close others
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <p>hello</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="b">
                  <Accordion.Trigger class="text-xl font-medium">
                    Click to open this one and close others
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <p>hello</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="c">
                  <Accordion.Trigger class="text-xl font-medium">
                    Click to open this one and close others
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <p>hello</p>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Join>
            <CodeBlock
              code={`<Join class="w-full" vertical>
  <Accordion class="border border-base-300 join-item" defaultValue="a">
    <Accordion.Item value="a">
      <Accordion.Trigger class="text-xl font-medium">
        Click to open this one and close others
      </Accordion.Trigger>
      <Accordion.Content>
        <p>hello</p>
      </Accordion.Content>
    </Accordion.Item>
    {/* ... other items ... */}
  </Accordion>
</Join>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `name`-based radio grouping removed; each <Accordion> root with selectionMode="single" is its own group. */}
        <ShowcaseSection id="multiple" title="Multiple Groups">
          <Flex direction="col" gap="md">
            <Accordion class="bg-base-200" defaultValue="a1">
              <Accordion.Item value="a1">
                <Accordion.Trigger class="text-xl font-medium">
                  Group A
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="a2">
                <Accordion.Trigger class="text-xl font-medium">
                  Group A
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="a3">
                <Accordion.Trigger class="text-xl font-medium">
                  Group A
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>

            <Accordion class="bg-base-200" defaultValue="b1">
              <Accordion.Item value="b1">
                <Accordion.Trigger class="text-xl font-medium">
                  Group B
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b2">
                <Accordion.Trigger class="text-xl font-medium">
                  Group B
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b3">
                <Accordion.Trigger class="text-xl font-medium">
                  Group B
                </Accordion.Trigger>
                <Accordion.Content>
                  <p>hello</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <CodeBlock
              code={`{/* Group A */}
<Accordion class="bg-base-200" defaultValue="a1">
  <Accordion.Item value="a1">
    <Accordion.Trigger class="text-xl font-medium">Group A</Accordion.Trigger>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>

{/* Group B */}
<Accordion class="bg-base-200" defaultValue="b1">
  <Accordion.Item value="b1">
    <Accordion.Trigger class="text-xl font-medium">Group B</Accordion.Trigger>
    <Accordion.Content>
      <p>hello</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
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
