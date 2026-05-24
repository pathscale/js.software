import { createSignal, For } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { RadioGroup, Radio, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

type Option = { value: string; label: string; disabled?: boolean };

export default function RadioGroupShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "variants", title: "Variants" },
    { id: "orientation", title: "Orientation" },
    { id: "disabled", title: "Disabled Options" },
    { id: "invalid", title: "Invalid State" },
    { id: "props", title: "Props" },
  ] as const;

  const radioGroupProps = [
    {
      name: "name",
      type: "string",
      description: "The name attribute for the radio inputs in the group",
    },
    {
      name: "label",
      type: "JSX.Element",
      description: "Optional label displayed above the group",
    },
    {
      name: "description",
      type: "JSX.Element",
      description: "Optional description text",
    },
    {
      name: "errorMessage",
      type: "JSX.Element",
      description: "Optional error message displayed below",
    },
    {
      name: "value",
      type: "string",
      description: "The currently selected value (controlled)",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "The default selected value (uncontrolled)",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Callback when selection changes",
    },
    {
      name: "orientation",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Layout direction of the radio items",
    },
    {
      name: "variant",
      type: '"primary" | "secondary"',
      default: '"primary"',
      description: "Visual variant of the radio buttons",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables all radios in the group",
    },
    {
      name: "isInvalid",
      type: "boolean",
      description: "Marks the group as invalid",
    },
  ];

  const options: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const [value, setValue] = createSignal("apple");

  const renderOptions = (opts: Option[]) => (
    <For each={opts}>
      {(opt) => (
        <Radio value={opt.value} isDisabled={opt.disabled}>
          {opt.label}
        </Radio>
      )}
    </For>
  );

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
                value={value()}
                onChange={setValue}
              >
                {renderOptions(options)}
              </RadioGroup>
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="default-demo" label="Pick a fruit" value={value()} onChange={setValue}>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="cherry">Cherry</Radio>
</RadioGroup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <RadioGroup
                name="v-primary"
                label="Primary"
                defaultValue="apple"
                variant="primary"
                orientation="horizontal"
              >
                {renderOptions(options)}
              </RadioGroup>
              <RadioGroup
                name="v-secondary"
                label="Secondary"
                defaultValue="apple"
                variant="secondary"
                orientation="horizontal"
              >
                {renderOptions(options)}
              </RadioGroup>
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="v-primary" variant="primary" orientation="horizontal" defaultValue="apple">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="cherry">Cherry</Radio>
</RadioGroup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="orientation" title="Orientation">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="xl">
              <RadioGroup name="d-vert" label="Vertical (default)" defaultValue="banana">
                {renderOptions(options)}
              </RadioGroup>
              <RadioGroup
                name="d-horiz"
                label="Horizontal"
                defaultValue="banana"
                orientation="horizontal"
              >
                {renderOptions(options)}
              </RadioGroup>
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="d-horiz" label="Horizontal" defaultValue="banana" orientation="horizontal">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="cherry">Cherry</Radio>
</RadioGroup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled Options">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <RadioGroup name="disabled-demo" label="Some options disabled" defaultValue="a">
                {renderOptions([
                  { value: "a", label: "Available" },
                  { value: "b", label: "Disabled", disabled: true },
                  { value: "c", label: "Also available" },
                ])}
              </RadioGroup>
            </Flex>
            <CodeBlock
              code={`<RadioGroup name="disabled-demo" label="Some options disabled" defaultValue="a">
  <Radio value="a">Available</Radio>
  <Radio value="b" isDisabled>Disabled</Radio>
  <Radio value="c">Also available</Radio>
</RadioGroup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="invalid" title="Invalid State">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <RadioGroup
                name="invalid-demo"
                label="Please pick a fruit"
                isInvalid
                errorMessage="A selection is required"
              >
                {renderOptions(options)}
              </RadioGroup>
            </Flex>
            <CodeBlock
              code={`<RadioGroup
  name="invalid-demo"
  label="Please pick a fruit"
  isInvalid
  errorMessage="A selection is required"
>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="cherry">Cherry</Radio>
</RadioGroup>`}
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
