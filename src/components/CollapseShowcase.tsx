import ShowcaseLayout from "./ShowcaseLayout";
import { Collapse, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function CollapseShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-arrow", title: "With Arrow" },
    { id: "with-plus", title: "With Plus" },
    { id: "with-checkbox", title: "With Checkbox" },
    { id: "controlled", title: "Controlled" },
    { id: "details", title: "Details" },
    { id: "props", title: "Props" },
  ] as const;

  const collapseProps = [
    {
      name: "checkbox",
      type: "boolean",
      default: "false",
      description: "Whether to use a checkbox for toggle control",
    },
    {
      name: "icon",
      type: '"arrow" | "plus"',
      description: "The icon to show for toggle",
    },
    {
      name: "open",
      type: "boolean",
      description: "Whether the collapse is open (controlled mode)",
    },
    {
      name: "onOpen",
      type: "() => void",
      description: "Callback when the collapse opens",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when the collapse closes",
    },
    {
      name: "onToggle",
      type: "() => void",
      description: "Callback when the collapse state changes",
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

  const detailsProps = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

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
            <Collapse>
              <Collapse.Title>Click to open/close</Collapse.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse>
            <CodeBlock
              code={`<Collapse>
  <Collapse.Title>Click to open/close</Collapse.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-arrow" title="With Arrow">
          <Flex direction="col" gap="md">
            <Collapse icon="arrow">
              <Collapse.Title>Click to open/close</Collapse.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse>
            <CodeBlock
              code={`<Collapse icon="arrow">
  <Collapse.Title>Click to open/close</Collapse.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-plus" title="With Plus">
          <Flex direction="col" gap="md">
            <Collapse icon="plus">
              <Collapse.Title>Click to open/close</Collapse.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse>
            <CodeBlock
              code={`<Collapse icon="plus">
  <Collapse.Title>Click to open/close</Collapse.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-checkbox" title="With Checkbox">
          <Flex direction="col" gap="md">
            <Collapse checkbox>
              <Collapse.Title>Click to open/close</Collapse.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse>
            <CodeBlock
              code={`<Collapse checkbox>
  <Collapse.Title>Click to open/close</Collapse.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled">
          <Flex direction="col" gap="md">
            <Collapse open={true}>
              <Collapse.Title>This collapse is forced open</Collapse.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse>
            <CodeBlock
              code={`<Collapse open={true}>
  <Collapse.Title>This collapse is forced open</Collapse.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="details" title="Details">
          <Flex direction="col" gap="md">
            <Collapse.Details class="bg-base-200">
              <Collapse.Details.Title class="text-xl font-medium">
                Click to open/close
              </Collapse.Details.Title>
              <Collapse.Content>
                <p>content</p>
              </Collapse.Content>
            </Collapse.Details>
            <CodeBlock
              code={`<Collapse.Details class="bg-base-200">
  <Collapse.Details.Title class="text-xl font-medium">
    Click to open/close
  </Collapse.Details.Title>
  <Collapse.Content>
    <p>content</p>
  </Collapse.Content>
</Collapse.Details>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Collapse Props</h3>
          <PropsTable props={collapseProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">Collapse.Details Props</h3>
          <PropsTable props={detailsProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
