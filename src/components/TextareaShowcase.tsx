import { Component, createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Textarea, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const TextareaShowcase: Component = () => {
  const [value, setValue] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "variants", title: "Variants" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

  const textareaProps = [
    {
      name: "variant",
      type: '"primary" | "secondary"',
      default: '"primary"',
      description: "Visual variant of the textarea",
    },
    {
      name: "width",
      type: `Width`,
      default: "false",
      description: 'Pass width="full".',
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
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
    },
    {
      name: "value",
      type: "string",
      description: "Current value of the textarea",
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
            <Flex justify="start" align="center" gap="sm">
              <Textarea
                value={value()}
                onInput={(e) => setValue(e.currentTarget.value)}
                placeholder="Bio"
              />
            </Flex>

            <CodeBlock
              code={`const [value, setValue] = createSignal("");

<Textarea
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Bio"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex direction="col" gap="sm" class="w-full component-preview">
                <Textarea variant="primary" placeholder="Primary" />
                <Textarea variant="secondary" placeholder="Secondary" />
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Textarea variant="primary" placeholder="Primary" />
<Textarea variant="secondary" placeholder="Secondary" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex direction="col" gap="md">
            <Flex direction="col" align="start" justify="start" gap="sm">
              <Textarea state="disabled" placeholder="Disabled textarea" />
              <Textarea state="invalid" placeholder="Invalid textarea" />
              <Textarea class="w-full" placeholder="Full width textarea" />
            </Flex>
            <CodeBlock
              code={`<Textarea state="disabled" placeholder="Disabled textarea" />
<Textarea state="invalid" placeholder="Invalid textarea" />
<Textarea class="w-full" placeholder="Full width textarea" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={textareaProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default TextareaShowcase;
