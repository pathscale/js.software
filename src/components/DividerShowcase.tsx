import { Divider, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function DividerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "horizontal", title: "Horizontal" },
    { id: "no-text", title: "Without Text" },
    { id: "responsive", title: "Responsive" },
    { id: "colors", title: "Colors" },
    { id: "positions", title: "Different Positions" },
    { id: "positions-horizontal", title: "Horizontal Positions" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "text",
      type: "string",
      description: "Text to display in the divider",
    },
    {
      name: "horizontal",
      type: "boolean",
      description: "Shows the divider horizontally",
    },
    {
      name: "color",
      type: `"default" | "neutral" | "primary" | "secondary" | "accent" | "success" | "warning" | "info" | "error"`,
      description: "Color theme of the divider",
    },
    {
      name: "position",
      type: `"center" | "start" | "end"`,
      description: "Text position in the divider",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute",
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
            <Divider>OR</Divider>
            <CodeBlock code={`<Divider>OR</Divider>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="horizontal" title="Horizontal">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="start" gap="sm">
              <Flex
                grow
                class="h-20 bg-base-300 rounded-box place-items-center grid"
              >
                content
              </Flex>
              <Flex class="h-20 px-2 items-center justify-center">OR</Flex>
              <Flex
                grow
                class="h-20 bg-base-300 rounded-box place-items-center grid"
              >
                content
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex align="center" justify="start" gap="sm">
  <Flex
    grow
    class="h-20 bg-base-300 rounded-box place-items-center grid"
  >
    content
  </Flex>
  <Flex class="h-20 px-2 items-center justify-center">OR</Flex>
  <Flex
    grow
    class="h-20 bg-base-300 rounded-box place-items-center grid"
  >
    content
  </Flex>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="no-text" title="Without Text">
          <Flex direction="col" gap="md">
            <Divider />
            <CodeBlock code={`<Divider />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="sm">
              <Flex
                direction={{ base: "col", lg: "row" }}
                class="w-full"
                gap="sm"
              >
                <Flex
                  grow
                  class="h-32 bg-base-300 rounded-box grid place-items-center"
                >
                  content
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  class="h-8 lg:h-32 lg:px-4 text-sm"
                >
                  OR
                </Flex>
                <Flex
                  grow
                  class="h-32 bg-base-300 rounded-box grid place-items-center"
                >
                  content
                </Flex>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex align="start" justify="start" gap="sm">
  <Flex direction={{ base: "col", lg: "row" }} class="w-full" gap="sm">
    <Flex
      grow
      class="h-32 bg-base-300 rounded-box grid place-items-center"
    >
      content
    </Flex>

    <Flex
      align="center"
      justify="center"
      class="h-8 lg:h-32 lg:px-4 text-sm"
    >
      OR
    </Flex>

    <Flex
      grow
      class="h-32 bg-base-300 rounded-box grid place-items-center"
    >
      content
    </Flex>
  </Flex>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            {[
              "default",
              "neutral",
              "primary",
              "secondary",
              "accent",
              "success",
              "warning",
              "info",
              "error",
            ].map((color) => (
              <Divider color={color as any}>{color}</Divider>
            ))}
            <CodeBlock code={`<Divider color="primary">Primary</Divider>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Different Positions">
          <Flex direction="col" gap="md">
            <Flex direction="col" gap="md">
              <Divider position="start">Start</Divider>
              <Divider>Default</Divider>
              <Divider position="end">End</Divider>
            </Flex>
            <CodeBlock
              code={`<Divider position="start">Start</Divider>
<Divider>Default</Divider>
<Divider position="end">End</Divider>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positions-horizontal" title="Horizontal Positions">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="center" gap="sm" class="h-42">
              <Divider horizontal position="start">
                Start
              </Divider>
              <Divider horizontal>Default</Divider>
              <Divider horizontal position="end">
                End
              </Divider>
            </Flex>
            <CodeBlock
              code={`<Divider horizontal position="start">Start</Divider>
<Divider horizontal>Default</Divider>
<Divider horizontal position="end">End</Divider>`}
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
