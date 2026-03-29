import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { RadioGroup, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function RadioGroupShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "direction", title: "Direction" },
    { id: "disabled", title: "Disabled Options" },
    { id: "props", title: "Props" },
  ] as const;

  const radioGroupProps = [
    {
      name: "name",
      type: "string",
      description: "The name attribute for the radio group",
    },
    {
      name: "label",
      type: "string",
      description: "Optional label displayed as a legend above the group",
    },
    {
      name: "options",
      type: "RadioGroupOption[]",
      description: "Array of { value, label, disabled? } objects",
    },
    {
      name: "value",
      type: "string",
      description: "The currently selected value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Callback when selection changes",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "Size of the radio buttons",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      default: "undefined",
      description: "Color scheme of the radio buttons",
    },
    {
      name: "direction",
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
      description: "Layout direction of the options",
    },
  ];

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const [value, setValue] = createSignal("apple");

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <RadioGroup
                name="default-demo"
                label="Pick a fruit"
                options={options}
                value={value()}
                onChange={setValue}
              />
            </Flex>
            <CodeBlock
              code={`<RadioGroup
  name="default-demo"
  label="Pick a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ]}
  value={value()}
  onChange={setValue}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <RadioGroup name="c-primary" options={options} value="apple" color="primary" direction="horizontal" />
              <RadioGroup name="c-secondary" options={options} value="apple" color="secondary" direction="horizontal" />
              <RadioGroup name="c-accent" options={options} value="apple" color="accent" direction="horizontal" />
              <RadioGroup name="c-success" options={options} value="apple" color="success" direction="horizontal" />
              <RadioGroup name="c-warning" options={options} value="apple" color="warning" direction="horizontal" />
              <RadioGroup name="c-error" options={options} value="apple" color="error" direction="horizontal" />
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="c-primary" options={options} value="apple" color="primary" direction="horizontal" />
<RadioGroup name="c-secondary" options={options} value="apple" color="secondary" direction="horizontal" />
<RadioGroup name="c-accent" options={options} value="apple" color="accent" direction="horizontal" />
<RadioGroup name="c-success" options={options} value="apple" color="success" direction="horizontal" />
<RadioGroup name="c-warning" options={options} value="apple" color="warning" direction="horizontal" />
<RadioGroup name="c-error" options={options} value="apple" color="error" direction="horizontal" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <RadioGroup name="s-xs" options={options} value="apple" size="xs" direction="horizontal" />
              <RadioGroup name="s-sm" options={options} value="apple" size="sm" direction="horizontal" />
              <RadioGroup name="s-md" options={options} value="apple" size="md" direction="horizontal" />
              <RadioGroup name="s-lg" options={options} value="apple" size="lg" direction="horizontal" />
              <RadioGroup name="s-xl" options={options} value="apple" size="xl" direction="horizontal" />
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="s-xs" options={options} value="apple" size="xs" direction="horizontal" />
<RadioGroup name="s-sm" options={options} value="apple" size="sm" direction="horizontal" />
<RadioGroup name="s-md" options={options} value="apple" size="md" direction="horizontal" />
<RadioGroup name="s-lg" options={options} value="apple" size="lg" direction="horizontal" />
<RadioGroup name="s-xl" options={options} value="apple" size="xl" direction="horizontal" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="direction" title="Direction">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="xl">
              <RadioGroup name="d-vert" label="Vertical (default)" options={options} value="banana" />
              <RadioGroup name="d-horiz" label="Horizontal" options={options} value="banana" direction="horizontal" />
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="d-vert" label="Vertical (default)" options={options} value="banana" />
<RadioGroup name="d-horiz" label="Horizontal" options={options} value="banana" direction="horizontal" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled Options">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <RadioGroup
                name="disabled-demo"
                label="Some options disabled"
                options={[
                  { value: "a", label: "Available" },
                  { value: "b", label: "Disabled", disabled: true },
                  { value: "c", label: "Also available" },
                ]}
                value="a"
              />
            </Flex>
            <CodeBlock
              code={`<RadioGroup
  name="disabled-demo"
  label="Some options disabled"
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Disabled", disabled: true },
    { value: "c", label: "Also available" },
  ]}
  value="a"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={radioGroupProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
