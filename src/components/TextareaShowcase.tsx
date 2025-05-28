import { Component, createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Textarea } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const TextareaShowcase: Component = () => {
  const [value, setValue] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "form-control", title: "Form Control and Labels" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

  const textareaProps = [
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "ghost" | "info" | "success" | "warning" | "error"',
      description: "Color variant of the textarea",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Size of the textarea",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the textarea is disabled",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Textarea
              value={value()}
              onInput={(e) => setValue(e.currentTarget.value)}
              placeholder="Bio"
            />
          </div>
          <CodeBlock
            code={`const [value, setValue] = createSignal("");

<Textarea
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Bio"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-col gap-2 w-full max-w-md">
            <Textarea color="primary" placeholder="Primary" />
            <Textarea color="secondary" placeholder="Secondary" />
            <Textarea color="accent" placeholder="Accent" />
            <Textarea color="ghost" placeholder="Ghost" />
            <Textarea color="info" placeholder="Info" />
            <Textarea color="success" placeholder="Success" />
            <Textarea color="warning" placeholder="Warning" />
            <Textarea color="error" placeholder="Error" />
          </div>
          <CodeBlock
            code={`<Textarea color="primary" placeholder="Primary" />
<Textarea color="secondary" placeholder="Secondary" />
<Textarea color="accent" placeholder="Accent" />
<Textarea color="ghost" placeholder="Ghost" />
<Textarea color="info" placeholder="Info" />
<Textarea color="success" placeholder="Success" />
<Textarea color="warning" placeholder="Warning" />
<Textarea color="error" placeholder="Error" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-col gap-2 w-full max-w-md">
            <Textarea size="xs" placeholder="Extra small" />
            <Textarea size="sm" placeholder="Small" />
            <Textarea size="md" placeholder="Medium (default)" />
            <Textarea size="lg" placeholder="Large" />
            <Textarea size="xl" placeholder="Extra large" />
          </div>
          <CodeBlock
            code={`<Textarea size="xs" placeholder="Extra small" />
<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium (default)" />
<Textarea size="lg" placeholder="Large" />
<Textarea size="xl" placeholder="Extra large" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="form-control" title="Form Control and Labels">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <div class="form-control w-full max-w-md">
              <label class="label">
                <span class="label-text">Your bio</span>
                <span class="label-text-alt">Alt label</span>
              </label>
              <Textarea placeholder="Bio" />
              <label class="label">
                <span class="label-text-alt">Your bio</span>
                <span class="label-text-alt">Alt label</span>
              </label>
            </div>
          </div>
          <CodeBlock
            code={`<div class="form-control w-full max-w-md">
  <label class="label">
    <span class="label-text">Your bio</span>
    <span class="label-text-alt">Alt label</span>
  </label>
  <Textarea placeholder="Bio" />
  <label class="label">
    <span class="label-text-alt">Your bio</span>
    <span class="label-text-alt">Alt label</span>
  </label>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-col gap-2 w-full max-w-md">
            <Textarea disabled placeholder="Disabled textarea" />
            <Textarea
              class="textarea-disabled"
              placeholder="Disabled via class"
            />
          </div>
          <CodeBlock
            code={`<Textarea disabled placeholder="Disabled textarea" />
<Textarea class="textarea-disabled" placeholder="Disabled via class" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={textareaProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default TextareaShowcase;
