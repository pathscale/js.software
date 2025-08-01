import { Component, createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Range, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const RangeShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "steps", title: "With Steps and Ticks" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const rangeProps = [
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "The color scheme of the range slider",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the range slider",
    },
    {
      name: "step",
      type: "number",
      description:
        "Step value for the range slider. When set, ticks are automatically displayed unless displayTicks is false",
    },
    {
      name: "displayTicks",
      type: "boolean",
      description:
        "Force display or hide tick marks. If not set, ticks are shown when step is defined",
    },
    {
      name: "ticksStep",
      type: "number",
      description:
        "Custom step value for tick marks. Defaults to the step value if not provided",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value of the range",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value of the range",
    },
    {
      name: "value",
      type: "number",
      description: "Current value of the range slider",
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
            <Flex align="start" justify="start">
              <Range />
            </Flex>
            <CodeBlock code={`<Range />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="steps" title="With Steps and Ticks">
          <Flex direction="col" gap="md">
            <Flex direction="col" align="start" justify="start" gap="lg">
              <div class="w-full max-w-xs">
                <p class="text-sm mb-4">Automatic ticks with step</p>
                <Range min={0} max={100} step={25} />
              </div>
              <div class="w-full max-w-xs mt-8">
                <p class="text-sm mb-4">Custom tick step</p>
                <Range min={0} max={100} step={25} ticksStep={10} />
              </div>
              <div class="w-full max-w-xs mt-8">
                <p class="text-sm mb-4">Disabled ticks with step</p>
                <Range min={0} max={100} step={25} displayTicks={false} />
              </div>
            </Flex>
            <CodeBlock
              code={`// Automatic ticks with step
<Range min={0} max={100} step={25} />

// Custom tick step
<Range min={0} max={100} step={25} ticksStep={10} />

// Disabled ticks with step
<Range min={0} max={100} step={25} displayTicks={false} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex direction="col" gap="sm" class="w-full">
                <Range value={20} color="primary" />
                <Range value={30} color="secondary" />
                <Range value={40} color="accent" />
                <Range value={50} color="success" />
                <Range value={60} color="warning" />
                <Range value={70} color="info" />
                <Range value={80} color="error" />
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Range value={20} color="primary" />
  <Range value={30} color="secondary" />
  <Range value={40} color="accent" />
  <Range value={50} color="success" />
  <Range value={60} color="warning" />
  <Range value={70} color="info" />
  <Range value={80} color="error" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex direction="col" gap="sm" class="w-full">
                <Range value={40} size="xs" />
                <Range value={50} size="sm" />
                <Range value={60} size="md" />
                <Range value={70} size="lg" />
                <Range value={80} size="xl" />
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Range value={40} size="xs" />
  <Range value={50} size="sm" />
  <Range value={60} size="md" />
  <Range value={70} size="lg" />
  <Range value={80} size="xl" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={rangeProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default RangeShowcase;
