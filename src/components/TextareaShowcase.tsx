import { createSignal } from "solid-js";
import { Textarea } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function TextareaShowcase() {
  const [value, setValue] = createSignal("");

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
      <ShowcaseSection id="basic" title="Basic Controlled Textarea">
        <Textarea
          value={value()}
          onInput={(e) => setValue(e.currentTarget.value)}
          placeholder="Type something..."
        />
        <CodeBlock
          code={`<Textarea
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Type something..."
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="sizes" title="Size Variants">
        <div class="flex flex-col gap-4">
          <Textarea size="sm" placeholder="Small" />
          <Textarea size="md" placeholder="Medium" />
          <Textarea size="lg" placeholder="Large" />
        </div>
        <CodeBlock
          code={`<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="colors" title="Color Variants">
        <div class="flex flex-col gap-4">
          <Textarea color="primary" placeholder="Primary" />
          <Textarea color="info" placeholder="Info" />
          <Textarea color="success" placeholder="Success" />
          <Textarea color="warning" placeholder="Warning" />
          <Textarea color="danger" placeholder="Danger" />
        </div>
        <CodeBlock
          code={`<Textarea color="primary" placeholder="Primary" />
<Textarea color="info" placeholder="Info" />
<Textarea color="success" placeholder="Success" />
<Textarea color="warning" placeholder="Warning" />
<Textarea color="danger" placeholder="Danger" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="states" title="Disabled and Loading">
        <div class="flex flex-col gap-4">
          <Textarea disabled placeholder="Disabled" />
          <Textarea loading placeholder="Loading..." />
        </div>
        <CodeBlock
          code={`<Textarea disabled placeholder="Disabled" />
<Textarea loading placeholder="Loading..." />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="resize" title="Resize Options">
        <div class="flex flex-col gap-4">
          <Textarea resize="none" placeholder="No resize" />
          <Textarea resize="x" placeholder="Resize X" />
          <Textarea resize="y" placeholder="Resize Y" />
          <Textarea resize="both" placeholder="Resize Both" />
        </div>
        <CodeBlock
          code={`<Textarea resize="none" placeholder="No resize" />
<Textarea resize="x" placeholder="Resize X" />
<Textarea resize="y" placeholder="Resize Y" />
<Textarea resize="both" placeholder="Resize Both" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="counter" title="Character Counter">
        <Textarea
          hasCounter
          maxLength={100}
          value={value()}
          onInput={(e) => setValue(e.currentTarget.value)}
          placeholder="With counter..."
        />
        <CodeBlock
          code={`<Textarea
  hasCounter
  maxLength={100}
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="With counter..."
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
