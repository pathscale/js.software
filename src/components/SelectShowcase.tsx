import { createSignal } from "solid-js";
import { Select } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function SelectShowcase() {
  const [selected, setSelected] = createSignal("");

  const props = [
    {
      name: "value",
      type: "string | number | null",
      description: "Current selected value",
    },
    {
      name: "onChange",
      type: "JSX.EventHandlerUnion<HTMLSelectElement, Event>",
      description: "Fired when value changes",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder option shown when value is empty",
    },
    {
      name: "nativeSize",
      type: "string | number",
      description: "Native HTML select size (number of visible options)",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the select input",
    },
    {
      name: "color",
      type: '"primary" | "info" | "success" | "warning" | "danger"',
      default: '"primary"',
      description: "Color scheme",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Apply loading styles",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description: "Make the select fill its container",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "false",
      description: "Apply rounded corners",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable the select input",
    },
    { name: "class", type: "string", description: "Additional custom classes" },
  ];

  const options = ["Option A", "Option B", "Option C"];

  return (
    <ShowcaseLayout>
      <ShowcaseSection id="basic" title="Basic Controlled Select">
        <Select
          placeholder="Choose an option"
          value={selected()}
          onChange={(e: { currentTarget: { value: any } }) =>
            setSelected(e.currentTarget.value)
          }
        >
          {options.map((opt) => (
            <option value={opt}>{opt}</option>
          ))}
        </Select>
        <CodeBlock
          code={`<Select
  placeholder="Choose an option"
  value={selected()}
  onChange={(e) => setSelected(e.currentTarget.value)}
>
  <option value="Option A">Option A</option>
  <option value="Option B">Option B</option>
  <option value="Option C">Option C</option>
</Select>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="sizes" title="Size Variants">
        <div class="flex flex-col gap-4">
          <Select size="sm" placeholder="Small">
            <option>One</option>
          </Select>
          <Select size="md" placeholder="Medium">
            <option>Two</option>
          </Select>
          <Select size="lg" placeholder="Large">
            <option>Three</option>
          </Select>
        </div>
        <CodeBlock
          code={`<Select size="sm" placeholder="Small"><option>One</option></Select>
<Select size="md" placeholder="Medium"><option>Two</option></Select>
<Select size="lg" placeholder="Large"><option>Three</option></Select>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="colors" title="Color Variants">
        <div class="flex flex-col gap-4">
          <Select color="primary" placeholder="Primary">
            <option>1</option>
          </Select>
          <Select color="info" placeholder="Info">
            <option>2</option>
          </Select>
          <Select color="success" placeholder="Success">
            <option>3</option>
          </Select>
          <Select color="warning" placeholder="Warning">
            <option>4</option>
          </Select>
          <Select color="danger" placeholder="Danger">
            <option>5</option>
          </Select>
        </div>
        <CodeBlock
          code={`<Select color="primary" placeholder="Primary"><option>1</option></Select>
<Select color="info" placeholder="Info"><option>2</option></Select>
<Select color="success" placeholder="Success"><option>3</option></Select>
<Select color="warning" placeholder="Warning"><option>4</option></Select>
<Select color="danger" placeholder="Danger"><option>5</option></Select>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="states" title="States: Disabled and Loading">
        <div class="flex flex-col gap-4">
          <Select disabled placeholder="Disabled">
            <option>Can't select</option>
          </Select>
          <Select loading placeholder="Loading...">
            <option>Loading</option>
          </Select>
        </div>
        <CodeBlock
          code={`<Select disabled placeholder="Disabled"><option>Can't select</option></Select>
<Select loading placeholder="Loading..."><option>Loading</option></Select>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="layout" title="Layout Options">
        <div class="flex flex-col gap-4">
          <Select expanded placeholder="Expanded full width">
            <option>Expanded</option>
          </Select>
          <Select rounded placeholder="Rounded">
            <option>Rounded</option>
          </Select>
        </div>
        <CodeBlock
          code={`<Select expanded placeholder="Expanded full width"><option>Expanded</option></Select>
<Select rounded placeholder="Rounded"><option>Rounded</option></Select>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
