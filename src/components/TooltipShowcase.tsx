import ShowcaseLayout from "./ShowcaseLayout";
import { Tooltip, Button } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TooltipShowcase() {
  const types = [
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "gray",
  ] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const positions = ["top", "bottom", "left", "right"] as const;

  const sections = [
    { id: "types", title: "Types" },
    { id: "sizes", title: "Sizes" },
    { id: "positions", title: "Positions" },
    { id: "variants", title: "Variants" },
    { id: "multiline", title: "Multiline" },
    { id: "delay", title: "Delay & Always Visible" },
    { id: "props", title: "Props" },
  ] as const;

  const tooltipProps = [
    {
      name: "label",
      type: "string",
      description: "The text content of the tooltip",
    },
    {
      name: "type",
      type: '"primary" | "info" | "success" | "warning" | "danger" | "gray"',
      default: '"primary"',
      description: "The visual style and color of the tooltip",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the tooltip text",
    },
    {
      name: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "The position of the tooltip relative to its trigger",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "true",
      description: "Whether the tooltip should have rounded corners",
    },
    {
      name: "dashed",
      type: "boolean",
      default: "false",
      description: "Whether to show a dashed border",
    },
    {
      name: "multilined",
      type: "boolean",
      default: "false",
      description: "Whether the tooltip should support multiple lines",
    },
    {
      name: "animated",
      type: "boolean",
      default: "true",
      description: "Whether to animate the tooltip",
    },
    {
      name: "delay",
      type: "number",
      description: "Delay in milliseconds before showing the tooltip",
    },
    {
      name: "always",
      type: "boolean",
      default: "false",
      description: "Whether the tooltip should always be visible",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="types" title="Types">
          <div class="flex flex-wrap gap-4 items-center">
            {types.map((type) => (
              <Tooltip label={`${type} tooltip`} type={type}>
                <Button size="sm">{type}</Button>
              </Tooltip>
            ))}
          </div>
          <CodeBlock
            code={`// Tooltip types
<Tooltip label="Primary tooltip" type="primary">
  <Button>Primary</Button>
</Tooltip>
<Tooltip label="Info tooltip" type="info">
  <Button>Info</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-wrap gap-4 items-center">
            {sizes.map((size) => (
              <Tooltip label={`Size ${size}`} size={size}>
                <Button size="sm">Size {size}</Button>
              </Tooltip>
            ))}
          </div>
          <CodeBlock
            code={`// Tooltip sizes
<Tooltip label="Small tooltip" size="sm">
  <Button>Small</Button>
</Tooltip>
<Tooltip label="Medium tooltip" size="md">
  <Button>Medium</Button>
</Tooltip>
<Tooltip label="Large tooltip" size="lg">
  <Button>Large</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Positions">
          <div class="flex flex-wrap gap-8 items-center justify-center p-16">
            {positions.map((position) => (
              <Tooltip label={`${position} position`} position={position}>
                <Button size="sm">{position}</Button>
              </Tooltip>
            ))}
          </div>
          <CodeBlock
            code={`// Tooltip positions
<Tooltip label="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip label="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="flex flex-wrap gap-4 items-center">
            <Tooltip label="Default tooltip">
              <Button size="sm">Default</Button>
            </Tooltip>
            <Tooltip label="Rounded tooltip" rounded>
              <Button size="sm">Rounded</Button>
            </Tooltip>
            <Tooltip label="Dashed border" dashed>
              <Button size="sm">Dashed</Button>
            </Tooltip>
            <Tooltip label="Not animated" animated={false}>
              <Button size="sm">No Animation</Button>
            </Tooltip>
          </div>
          <CodeBlock
            code={`// Tooltip variants
<Tooltip label="Default tooltip">
  <Button>Default</Button>
</Tooltip>
<Tooltip label="Dashed border" dashed>
  <Button>Dashed</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="multiline" title="Multiline">
          <div class="flex flex-wrap gap-4 items-center">
            <Tooltip
              label="This is a multiline\ntooltip example with\nthree lines of text"
              multilined
            >
              <Button size="sm">Multiline</Button>
            </Tooltip>
            <Tooltip
              label="Single line will truncate if it's too long to fit in the available space"
              multilined={false}
            >
              <Button size="sm">Single line</Button>
            </Tooltip>
          </div>
          <CodeBlock
            code={`// Multiline tooltips
<Tooltip
  label="This is a multiline\ntooltip example with\nthree lines of text"
  multilined
>
  <Button>Multiline</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="delay" title="Delay & Always Visible">
          <div class="flex flex-wrap gap-4 items-center">
            <Tooltip label="Appears with delay" delay={500}>
              <Button size="sm">Delayed</Button>
            </Tooltip>
            <Tooltip label="Always visible tooltip" always>
              <Button size="sm">Always visible</Button>
            </Tooltip>
          </div>
          <CodeBlock
            code={`// Delayed and always visible tooltips
<Tooltip label="Appears with delay" delay={500}>
  <Button>Delayed</Button>
</Tooltip>
<Tooltip label="Always visible tooltip" always>
  <Button>Always visible</Button>
</Tooltip>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tooltipProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
