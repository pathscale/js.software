import { CodeMockup, CodeMockupLine, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CodeMockupShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "prefix", title: "Custom Prefix" },
    { id: "multi-line", title: "Multiple Lines" },
    { id: "highlight", title: "Highlighted Line" },
    { id: "scroll", title: "Long Line with Scroll" },
    { id: "no-prefix", title: "Without Prefix" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "dataPrefix",
      type: "string | boolean",
      description:
        "Symbol shown at the beginning of the line. `false` disables it.",
    },
    {
      name: "status",
      type: `"info" | "success" | "warning" | "error"`,
      description: "Highlights the line with the corresponding status color.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional class for outer container",
    },
    {
      name: "innerClass",
      type: "string",
      description: "Class applied to the inner <code> tag",
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
            <CodeMockup>
              <CodeMockupLine>yarn add daisyui react-daisyui</CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line>yarn add daisyui react-daisyui</CodeMockup.Line>
</CodeMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="prefix" title="Custom Prefix">
          <Flex direction="col" gap="md">
            <CodeMockup>
              <CodeMockupLine dataPrefix="$">
                yarn add daisyui react-daisyui
              </CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line dataPrefix="$">
    yarn add daisyui react-daisyui
  </CodeMockup.Line>
</CodeMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="multi-line" title="Multiple Lines">
          <Flex direction="col" gap="md">
            <CodeMockup>
              <CodeMockupLine>yarn add daisyui react-daisyui</CodeMockupLine>
              <CodeMockupLine class="text-warning">
                installing...
              </CodeMockupLine>
              <CodeMockupLine class="text-success">Done!</CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line>yarn add daisyui react-daisyui</CodeMockup.Line>
  <CodeMockup.Line class="text-warning">installing...</CodeMockup.Line>
  <CodeMockup.Line class="text-success">Done!</CodeMockup.Line>
</CodeMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="highlight" title="Highlighted Line">
          <Flex direction="col" gap="md">
            <CodeMockup>
              <CodeMockupLine>yarn add daisyui react-daisyui</CodeMockupLine>
              <CodeMockupLine>installing...</CodeMockupLine>
              <CodeMockupLine status="warning">Error!</CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line>yarn add daisyui react-daisyui</CodeMockup.Line>
  <CodeMockup.Line>installing...</CodeMockup.Line>
  <CodeMockup.Line status="warning">Error!</CodeMockup.Line>
</CodeMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="scroll" title="Long Line with Scroll">
          <Flex direction="col" gap="md">
            <CodeMockup>
              <CodeMockupLine dataPrefix="~">
                Magnam dolore beatae necessitatibus nemopsum itaque sit. Et
                porro quae qui et et dolore ratione.
              </CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line dataPrefix="~">
    Magnam dolore beatae necessitatibus nemopsum itaque sit. Et porro quae qui et et dolore ratione.
  </CodeMockup.Line>
</CodeMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="no-prefix" title="Without Prefix">
          <Flex direction="col" gap="md">
            <CodeMockup>
              <CodeMockupLine dataPrefix={false}>without prefix</CodeMockupLine>
            </CodeMockup>
            <CodeBlock
              code={`<CodeMockup>
  <CodeMockup.Line dataPrefix={false}>without prefix</CodeMockup.Line>
</CodeMockup>`}
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
