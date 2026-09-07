import { createSignal } from "solid-js";
import { Flex, Icon, Input } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function InputShowcase() {
  const [value, setValue] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "states", title: "States" },
    { id: "sizes", title: "Sizes" },
    { id: "icons", title: "With Icons" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    { name: "value", type: "string", description: "Input value" },
    {
      name: "type",
      type: "string",
      default: '"text"',
      description: "HTML input type",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"sm"',
      description:
        'Size of the input. It defaulted to "md" before 4.0, which left an unsized field 4px taller than an unsized Button; both are 2.25rem now. Pass size="md" if you want the old height.',
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      description:
        'Stretches the field to its container. Input takes a boolean here, not the Width vocabulary: width="full" is a Button prop and is silently dropped on an Input.',
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
    },
    {
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      default: "false",
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
    },
    {
      name: "issues",
      type: `Issue[]`,
      default: "false",
      description: 'Validation results. Validity is derived from them, not asserted; force it with state="invalid".',
    },
    {
      name: "label",
      type: "JSX.Element",
      description: "Optional label rendered above the input",
    },
    {
      name: "helperText",
      type: "JSX.Element",
      description: "Helper text rendered below the input",
    },
    {
      name: "errorMessage",
      type: "JSX.Element",
      description: "Error message rendered below the input (implies invalid state)",
    },
    {
      name: "startIcon",
      type: "JSX.Element",
      description: "Icon rendered at the start of the input",
    },
    {
      name: "endIcon",
      type: "JSX.Element",
      description: "Icon rendered at the end of the input",
    },
    { name: "class", type: "string", description: "Extra classes, merged into the root. There is no className." },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start">
              <Input
                value={value()}
                onInput={(e) => setValue(e.currentTarget.value)}
                placeholder="Type here"
              />
            </Flex>
            <CodeBlock
              code={`const [value, setValue] = createSignal("");

<Input
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Type here"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Input placeholder="Default" />
              <Input state="disabled" placeholder="Disabled state" />
              <Input readonly value="Read-only value" />
              <Input state="invalid" placeholder="Invalid state" errorMessage="Required" />
              <Input type="password" placeholder="Password" />
            </Flex>
            <CodeBlock
              code={`<Input placeholder="Default" />
<Input state="disabled" placeholder="Disabled state" />
<Input readonly value="Read-only value" />
<Input state="invalid" placeholder="Invalid state" errorMessage="Required" />
<Input type="password" placeholder="Password" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium (default)" />
              <Input size="lg" placeholder="Large" />
            </Flex>
            <CodeBlock
              code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Input startIcon={<Icon src="icon-[lucide--lock]" />} placeholder="With start icon" />
              <Input
                type="password"
                startIcon={<Icon src="icon-[lucide--lock]" />}
                endIcon={<Icon src="icon-[lucide--eye]" />}
                placeholder="Password with icons"
              />
            </Flex>
            <CodeBlock
              code={`<Input startIcon={<Icon src="icon-[lucide--lock]" />} placeholder="With start icon" />

<Input
  type="password"
  startIcon={<Icon src="icon-[lucide--lock]" />}
  endIcon={<Icon src="icon-[lucide--eye]" />}
  placeholder="Password with icons"
/>`}
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
