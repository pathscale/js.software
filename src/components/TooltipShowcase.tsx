import ShowcaseLayout from "./ShowcaseLayout";
import { Tooltip, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TooltipShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "force-open", title: "Force Open" },
    { id: "positions", title: "Positions" },
    { id: "colors", title: "Colors" },
    { id: "statuses", title: "Statuses" },
    { id: "props", title: "Props" },
  ] as const;

  const tooltipProps = [
    {
      name: "message",
      type: "string",
      required: true,
      description: "The text content of the tooltip",
    },
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Whether the tooltip should always be visible",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost"',
      description: "The color scheme of the tooltip",
    },
    {
      name: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "The position of the tooltip relative to its trigger",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
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
      description: "The element the tooltip is attached to",
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
            <Flex align="start" justify="start" class="my-16">
              <Tooltip message="hello">
                <Button>Hover me</Button>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip message="hello">
  <Button>Hover me</Button>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="force-open" title="Force Open">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" class="my-16">
              <Tooltip message="hello" open>
                <Button>Hover me</Button>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip message="hello" open>
  <Button>Hover me</Button>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Positions">
          <Flex direction="col" gap="md">
            <Flex gap="xl" align="start" justify="start" class="my-16">
              <Tooltip message="top" position="top">
                <Button size="sm">Top</Button>
              </Tooltip>
              <Tooltip message="bottom" position="bottom">
                <Button size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip message="left" position="left">
                <Button size="sm">Left</Button>
              </Tooltip>
              <Tooltip message="right" position="right">
                <Button size="sm">Right</Button>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip message="top" position="top">
  <Button size="sm">Top</Button>
</Tooltip>
<Tooltip message="bottom" position="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>
<Tooltip message="left" position="left">
  <Button size="sm">Left</Button>
</Tooltip>
<Tooltip message="right" position="right">
  <Button size="sm">Right</Button>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" class="my-16">
              <Tooltip color="primary" message="primary" open>
                <Button color="primary">Primary</Button>
              </Tooltip>

              <Tooltip color="secondary" message="secondary" open>
                <Button color="secondary">Secondary</Button>
              </Tooltip>

              <Tooltip color="accent" message="accent" open>
                <Button color="accent">Accent</Button>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip color="primary" message="primary" open>
  <Button color="primary">Primary</Button>
</Tooltip>

<Tooltip color="secondary" message="secondary" open>
  <Button color="secondary">Secondary</Button>
</Tooltip>

<Tooltip color="accent" message="accent" open>
  <Button color="accent">Accent</Button>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="statuses" title="Statuses">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" class="my-16">
              <Tooltip color="info" message="info" open>
                <Button color="info">Info</Button>
              </Tooltip>

              <Tooltip color="success" message="success" open>
                <Button color="success">Success</Button>
              </Tooltip>

              <Tooltip color="warning" message="warning" open>
                <Button color="warning">Warning</Button>
              </Tooltip>

              <Tooltip color="error" message="error" open>
                <Button color="error">Error</Button>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip color="info" message="info" open>
  <Button color="info">Info</Button>
</Tooltip>

<Tooltip color="success" message="success" open>
  <Button color="success">Success</Button>
</Tooltip>

<Tooltip color="warning" message="warning" open>
  <Button color="warning">Warning</Button>
</Tooltip>

<Tooltip color="error" message="error" open>
  <Button color="error">Error</Button>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tooltipProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
