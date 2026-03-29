import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { DropdownSelect, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DropdownSelectShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-label", title: "With Label" },
    { id: "disabled", title: "Disabled" },
    { id: "placeholder", title: "Custom Placeholder" },
    { id: "checkmark", title: "Checkmark vs No Checkmark" },
    { id: "props", title: "Props" },
  ] as const;

  const dropdownSelectProps = [
    {
      name: "options",
      type: "DropdownSelectOption[]",
      description: "Array of { label, value, disabled? } objects",
    },
    {
      name: "value",
      type: "string",
      description: "Currently selected value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Callback when selection changes",
    },
    {
      name: "label",
      type: "string",
      description: "Accessible label for the dropdown",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Select..."',
      description: "Placeholder text when no value is selected",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the dropdown is disabled",
    },
    {
      name: "showCheckmark",
      type: "boolean",
      default: "true",
      description: "Show checkmark next to the selected option",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Size of the dropdown trigger button",
    },
  ];

  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
  ];

  const [value1, setValue1] = createSignal("");
  const [value2, setValue2] = createSignal("banana");
  const [value3, setValue3] = createSignal("");
  const [value4, setValue4] = createSignal("cherry");

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
              <DropdownSelect
                options={fruits}
                value={value1()}
                onChange={setValue1}
              />
            </Flex>
            <CodeBlock
              code={`<DropdownSelect
  options={fruits}
  value={value()}
  onChange={setValue}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-label" title="With Label">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <DropdownSelect
                label="Favorite fruit"
                options={fruits}
                value={value2()}
                onChange={setValue2}
              />
            </Flex>
            <CodeBlock
              code={`<DropdownSelect
  label="Favorite fruit"
  options={fruits}
  value={value()}
  onChange={setValue}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <DropdownSelect
                options={fruits}
                value="apple"
                disabled
              />
            </Flex>
            <CodeBlock
              code={`<DropdownSelect
  options={fruits}
  value="apple"
  disabled
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="placeholder" title="Custom Placeholder">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <DropdownSelect
                options={fruits}
                value={value3()}
                onChange={setValue3}
                placeholder="Choose a fruit..."
              />
            </Flex>
            <CodeBlock
              code={`<DropdownSelect
  options={fruits}
  value={value()}
  onChange={setValue}
  placeholder="Choose a fruit..."
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="checkmark" title="Checkmark vs No Checkmark">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <DropdownSelect
                options={fruits}
                value={value4()}
                onChange={setValue4}
                showCheckmark={true}
              />
              <DropdownSelect
                options={fruits}
                value={value4()}
                onChange={setValue4}
                showCheckmark={false}
              />
            </Flex>
            <CodeBlock
              code={`{/* With checkmark (default) */}
<DropdownSelect options={fruits} value={value()} onChange={setValue} showCheckmark={true} />

{/* Without checkmark */}
<DropdownSelect options={fruits} value={value()} onChange={setValue} showCheckmark={false} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={dropdownSelectProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
