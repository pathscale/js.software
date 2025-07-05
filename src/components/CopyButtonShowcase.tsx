import { CopyButton, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CopyButtonShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "custom-content", title: "Custom Content" },
    { id: "with-title", title: "With Tooltip Title" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "text",
      type: "string",
      description: "Text to be copied to the clipboard.",
    },
    {
      name: "title",
      type: "string",
      description: "Tooltip shown on hover. Defaults to 'Copy to clipboard'.",
    },
    {
      name: "onCopy",
      type: "() => void",
      description: "Callback function executed after text is copied.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description:
        "Custom content for the button instead of the default label.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
    {
      name: "className",
      type: "string", 
      description: "Additional CSS classes (alias for class).",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value.",
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
            <Flex gap="md" wrap="wrap">
              <CopyButton text="Hello World" />
            </Flex>
            <CodeBlock code={`<CopyButton text="Hello World" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
