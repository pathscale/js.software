import { createSignal } from "solid-js";
import { Checkbox } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CheckboxShowcase() {
  const [checked, setChecked] = createSignal(false);

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "colors", title: "Color Variants" },
    { id: "sizes", title: "Size Variants" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

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
    {
      name: "aria-label",
      type: "string",
      description:
        "Accessible label for the checkbox when visual label is not used",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element containing additional descriptive text",
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
                class="block text-sm text-gray-600 hover:text-gray-900"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="space-y-4">
            <Checkbox
              checked={checked()}
              onChange={(e) => setChecked(e.currentTarget.checked)}
              label={<span>Enable feature</span>}
            />
            <div class="text-sm text-gray-600">
              Checked state: {checked() ? "true" : "false"}
            </div>
          </div>
          <CodeBlock
            code={`const [checked, setChecked] = createSignal(false);

<Checkbox
  checked={checked()}
  onChange={(e) => setChecked(e.currentTarget.checked)}
  label={<span>Enable feature</span>}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Color Variants">
          <div class="flex flex-col gap-4">
            <Checkbox checked color="primary" label="Primary" />
            <Checkbox checked color="success" label="Success" />
            <Checkbox checked color="warning" label="Warning" />
            <Checkbox checked color="danger" label="Danger" />
          </div>
          <CodeBlock
            code={`<Checkbox checked color="primary" label="Primary" />
<Checkbox checked color="success" label="Success" />
<Checkbox checked color="warning" label="Warning" />
<Checkbox checked color="danger" label="Danger" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Size Variants">
          <div class="flex flex-col gap-4">
            <Checkbox size="sm" label="Small size checkbox" />
            <Checkbox size="md" label="Medium size checkbox" />
            <Checkbox size="lg" label="Large size checkbox" />
          </div>
          <CodeBlock
            code={`<Checkbox size="sm" label="Small size checkbox" />
<Checkbox size="md" label="Medium size checkbox" />
<Checkbox size="lg" label="Large size checkbox" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-col gap-4">
            <Checkbox checked label="Checked state" />
            <Checkbox indeterminate label="Indeterminate state" />
            <Checkbox disabled label="Disabled state" />
            <Checkbox checked disabled label="Checked and disabled" />
          </div>
          <CodeBlock
            code={`<Checkbox checked label="Checked state" />
<Checkbox indeterminate label="Indeterminate state" />
<Checkbox disabled label="Disabled state" />
<Checkbox checked disabled label="Checked and disabled" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
