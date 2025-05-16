import { createSignal } from "solid-js";
import { Checkbox } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CheckboxShowcase() {
  const [checked, setChecked] = createSignal(false);

  const props = [
    {
      name: "label",
      type: "JSX.Element",
      description: "Label text or element displayed next to the checkbox",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Whether the checkbox is checked",
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description: "Displays an indeterminate state (visual only)",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the checkbox",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the checkbox and label text",
    },
    {
      name: "color",
      type: '"primary" | "success" | "warning" | "danger"',
      default: '"primary"',
      description: "Color scheme for the checkbox when checked",
    },
    {
      name: "onChange",
      type: "JSX.EventHandlerUnion<HTMLInputElement, Event>",
      description: "Callback triggered when the checkbox changes",
    },
  ];

  return (
    <ShowcaseLayout>
      <ShowcaseSection id="default" title="Basic Usage">
        <Checkbox
          checked={checked()}
          onChange={(e) => setChecked(e.currentTarget.checked)}
          label={<span>Enable feature</span>}
        />
        <CodeBlock
          code={`<Checkbox
  checked={checked()}
  onChange={(e) => setChecked(e.currentTarget.checked)}
  label={<span>Enable feature</span>}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="colors" title="Color Variants">
        <div class="flex flex-col gap-4">
          <Checkbox color="primary" label={<span>Primary</span>} />
          <Checkbox color="success" label={<span>Success</span>} />
          <Checkbox color="warning" label={<span>Warning</span>} />
          <Checkbox color="danger" label={<span>Danger</span>} />
        </div>
        <CodeBlock
          code={`<Checkbox color="primary" label="Primary" />
<Checkbox color="success" label="Success" />
<Checkbox color="warning" label="Warning" />
<Checkbox color="danger" label="Danger" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="sizes" title="Size Variants">
        <div class="flex flex-col gap-4">
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
          <Checkbox size="lg" label="Large" />
        </div>
        <CodeBlock
          code={`<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="states" title="States">
        <div class="flex flex-col gap-4">
          <Checkbox checked label="Checked" />
          <Checkbox indeterminate label="Indeterminate" />
          <Checkbox disabled label="Disabled" />
        </div>
        <CodeBlock
          code={`<Checkbox checked label="Checked" />
<Checkbox indeterminate label="Indeterminate" />
<Checkbox disabled label="Disabled" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
