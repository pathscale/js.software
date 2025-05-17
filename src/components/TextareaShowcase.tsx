import { createSignal } from "solid-js";
import { Textarea } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function TextareaShowcase() {
  const [value, setValue] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "colors", title: "Color Variants" },
    { id: "sizes", title: "Size Variants" },
    { id: "states", title: "States" },
    { id: "resize", title: "Resize Options" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    { name: "value", type: "string", description: "Textarea content value" },
    {
      name: "onInput",
      type: "JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent>",
      description: "Callback when content changes",
    },
    {
      name: "color",
      type: '"primary" | "info" | "success" | "warning" | "danger"',
      default: '"primary"',
      description: "Color scheme of the border",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the text and padding",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Visual loading state",
    },
    {
      name: "resize",
      type: '"none" | "x" | "y" | "both"',
      default: '"y"',
      description: "Resize behavior",
    },
    { name: "disabled", type: "boolean", description: "Disables the textarea" },
    {
      name: "hasCounter",
      type: "boolean",
      description: "Show character counter",
    },
    {
      name: "maxLength",
      type: "number",
      description: "Max characters allowed (required for counter)",
    },
    { name: "class", type: "string", description: "Custom classes" },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 hover:text-gray-900"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="space-y-4">
            <Textarea
              value={value()}
              onInput={(e) => setValue(e.currentTarget.value)}
              placeholder="Write your message here..."
            />
            <div class="text-sm text-gray-600">
              Characters: {value().length}
            </div>
          </div>
          <CodeBlock
            code={`const [value, setValue] = createSignal("");

<Textarea
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Write your message here..."
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Color Variants">
          <div class="flex flex-col gap-4">
            <Textarea color="primary" placeholder="Primary textarea" />
            <Textarea color="info" placeholder="Info textarea" />
            <Textarea color="success" placeholder="Success textarea" />
            <Textarea color="warning" placeholder="Warning textarea" />
            <Textarea color="danger" placeholder="Danger textarea" />
          </div>
          <CodeBlock
            code={`<Textarea color="primary" placeholder="Primary textarea" />
<Textarea color="info" placeholder="Info textarea" />
<Textarea color="success" placeholder="Success textarea" />
<Textarea color="warning" placeholder="Warning textarea" />
<Textarea color="danger" placeholder="Danger textarea" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Size Variants">
          <div class="flex flex-col gap-4">
            <Textarea size="sm" placeholder="Small size textarea" />
            <Textarea size="md" placeholder="Medium size textarea" />
            <Textarea size="lg" placeholder="Large size textarea" />
          </div>
          <CodeBlock
            code={`<Textarea size="sm" placeholder="Small size textarea" />
<Textarea size="md" placeholder="Medium size textarea" />
<Textarea size="lg" placeholder="Large size textarea" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-col gap-4">
            <Textarea disabled placeholder="Disabled state" />
            <Textarea loading placeholder="Loading state" />
            <Textarea readonly placeholder="Read-only state" />
          </div>
          <CodeBlock
            code={`<Textarea disabled placeholder="Disabled state" />
<Textarea loading placeholder="Loading state" />
<Textarea readonly placeholder="Read-only state" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="resize" title="Resize Options">
          <div class="flex flex-col gap-4">
            <Textarea resize="none" placeholder="No resize" />
            <Textarea resize="x" placeholder="Horizontal resize" />
            <Textarea resize="y" placeholder="Vertical resize" />
            <Textarea resize="both" placeholder="Both directions resize" />
          </div>
          <CodeBlock
            code={`<Textarea resize="none" placeholder="No resize" />
<Textarea resize="x" placeholder="Horizontal resize" />
<Textarea resize="y" placeholder="Vertical resize" />
<Textarea resize="both" placeholder="Both directions resize" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
