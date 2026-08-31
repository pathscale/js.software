import { createSignal } from "solid-js";
import { Flex, Select } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

type Option = { value: string; label: string };

const Trigger = () => (
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
);

const Listbox = (props: { options: Option[] }) => (
  <Select.Popover>
    <Select.Listbox>
      {props.options.map((opt) => (
        <Select.Option value={opt.value}>{opt.label}</Select.Option>
      ))}
    </Select.Listbox>
  </Select.Popover>
);

export default function SelectShowcase() {
  const [selected, setSelected] = createSignal<string | null>(null);

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "variants", title: "Variants" },
    { id: "states", title: "States" },
    { id: "multiple", title: "Multiple Selection" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "value",
      type: "string | string[] | null",
      description: "Controlled selected value(s)",
    },
    {
      name: "defaultValue",
      type: "string | string[] | null",
      description: "Uncontrolled initial value",
    },
    {
      name: "onChange",
      type: "(value: string | string[] | null) => void",
      description: "Fired when selection changes",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder shown when nothing is selected",
    },
    {
      name: "variant",
      type: '"primary" | "secondary"',
      default: '"primary"',
      description: "Visual variant of the trigger",
    },
    {
      name: "selectionMode",
      type: '"single" | "multiple"',
      default: '"single"',
      description: "Whether one or many options can be selected",
    },
    {
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      default: "false",
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
    },
    {
      name: "width",
      type: `Width`,
      default: "false",
      description: 'Pass width="full".',
    },
    {
      name: "placement",
      type: '"top" | "bottom" | ...',
      default: '"bottom"',
      description: "Popover placement",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  const fruitOptions: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "kiwi", label: "Kiwi" },
  ];

  const animalOptions: Option[] = [
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "rabbit", label: "Rabbit" },
    { value: "hamster", label: "Hamster" },
    { value: "bird", label: "Bird" },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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

        <ShowcaseSection id="basic" title="Basic Usage">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="sm">
              <Select
                placeholder="Select a fruit"
                value={selected()}
                onChange={(v) => setSelected(typeof v === "string" ? v : null)}
              >
                <Trigger />
                <Listbox options={fruitOptions} />
              </Select>
              <div class="text-sm text-base-content/60">
                Selected fruit: {selected() ?? "(none)"}
              </div>
            </Flex>
            <CodeBlock
              code={`<Select
  placeholder="Select a fruit"
  value={selected()}
  onChange={(v) => setSelected(v as string | null)}
>
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Popover>
    <Select.Listbox>
      {fruitOptions.map((opt) => (
        <Select.Option value={opt.value}>{opt.label}</Select.Option>
      ))}
    </Select.Listbox>
  </Select.Popover>
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Select variant="primary" placeholder="Primary">
                <Trigger />
                <Listbox options={fruitOptions} />
              </Select>
              <Select variant="secondary" placeholder="Secondary">
                <Trigger />
                <Listbox options={animalOptions} />
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select variant="primary"> ... </Select>
<Select variant="secondary"> ... </Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Select state="disabled" placeholder="Disabled">
                <Trigger />
                <Listbox options={fruitOptions} />
              </Select>
              <Select class="w-full" placeholder="Full width">
                <Trigger />
                <Listbox options={animalOptions} />
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select state="disabled"> ... </Select>
<Select class="w-full"> ... </Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="multiple" title="Multiple Selection">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Select selectionMode="multiple" placeholder="Pick several fruits">
                <Trigger />
                <Listbox options={fruitOptions} />
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select selectionMode="multiple"> ... </Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
