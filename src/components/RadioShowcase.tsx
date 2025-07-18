import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Radio, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const RadioShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "disabled", title: "Disabled" },
    { id: "with-labels", title: "With Labels and Form" },
    { id: "props", title: "Props" },
  ] as const;

  const radioProps = [
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the radio is checked",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the radio is disabled",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the radio input, used for grouping",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color variant of the radio",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Size of the radio button",
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
            <Flex align="start" justify="start" gap="sm">
              <Radio name="radio1" checked />
              <Radio name="radio1" />
            </Flex>
            <CodeBlock
              code={`<Flex align="start" justify="start" gap="sm">
  <Radio name="radio1" checked />
  <Radio name="radio1" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="sm">
              <Radio checked color="primary" name="radio2" />
              <Radio checked color="secondary" name="radio3" />
              <Radio checked color="accent" name="radio4" />
              <Radio checked color="success" name="radio5" />
              <Radio checked color="warning" name="radio6" />
              <Radio checked color="info" name="radio7" />
              <Radio checked color="error" name="radio8" />
            </Flex>
            <CodeBlock
              code={`<Flex align="start" justify="start" gap="sm">
  <Radio checked color="primary" name="radio2" />
  <Radio checked color="secondary" name="radio3" />
  <Radio checked color="accent" name="radio4" />
  <Radio checked color="success" name="radio5" />
  <Radio checked color="warning" name="radio6" />
  <Radio checked color="info" name="radio7" />
  <Radio checked color="error" name="radio8" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="sm">
              <Radio name="radio9" disabled />
              <Radio name="radio9" disabled />
            </Flex>
            <CodeBlock
              code={`<Flex align="start" justify="start" gap="sm">
  <Radio name="radio9" disabled />
  <Radio name="radio9" disabled />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-labels" title="With Labels and Form">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex
                gap="lg"
                class="bg-[hsl(var(--color-bg-secondary)/1)] w-full max-w-sm p-4 rounded-lg shadow"
              >
                <label class="cursor-pointer flex items-center gap-2">
                  <Radio
                    name="radio10"
                    class="checked:bg-red-500"
                    checked
                  />
                  <span>Red Pill</span>
                </label>
                <label class="cursor-pointer flex items-center gap-2">
                  <Radio name="radio10" class="checked:bg-blue-500" />
                  <span>Blue Pill</span>
                </label>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex
  gap="lg"
  class="bg-[hsl(var(--color-bg-secondary)/1)] w-full max-w-sm p-4 rounded-lg shadow"
>
  <label class="cursor-pointer flex items-center gap-2">
    <Radio name="radio10" class="checked:bg-red-500" checked />
    <span>Red Pill</span>
  </label>
  <label class="cursor-pointer flex items-center gap-2">
    <Radio name="radio10" class="checked:bg-blue-500" />
    <span>Blue Pill</span>
  </label>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={radioProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default RadioShowcase;
