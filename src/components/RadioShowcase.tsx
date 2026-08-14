import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Radio, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const RadioShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "description", title: "Description and validation" },
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
      name: "description",
      type: "JSX.Element",
      description: "Supporting text rendered under the label",
    },
    {
      name: "issues",
      type: `Issue[]`,
      default: "false",
      description: 'Validation results. Validity is derived from them, not asserted; force it with state="invalid".',
    },
    {
      name: "indicator",
      type: "JSX.Element",
      description: "Replaces the dot drawn inside the control",
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
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      default: "false",
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
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

        <ShowcaseSection
          id="description"
          title="Description and validation"
        >
          <Flex direction="col" gap="md">
            <Flex direction="col" align="start" justify="start" gap="sm">
              <Radio name="radio2" description="Billed once a year.">
                Annual
              </Radio>
              <Radio name="radio2" state="invalid" description="Unavailable in your region.">
                Monthly
              </Radio>
            </Flex>
            <CodeBlock
              code={`<Radio name="plan" description="Billed once a year.">
  Annual
</Radio>
<Radio name="plan" state="invalid" description="Unavailable in your region.">
  Monthly
</Radio>`}
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
