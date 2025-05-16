import { createSignal } from "solid-js";
import { Input } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { FiLock, FiEye, FiEyeOff } from "solid-icons/fi";

export default function InputShowcase() {
  const [value, setValue] = createSignal("");

  const props = [
    { name: "value", type: "string", description: "Input value" },
    {
      name: "type",
      type: "string",
      default: '"text"',
      description: "HTML input type",
    },
    {
      name: "color",
      type: '"danger" | "success" | "warning"',
      description: "Color state of the input",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "false",
      description: "Applies full border radius",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "true",
      description: "Expands input to full width",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Visually dims the input",
    },
    {
      name: "passwordReveal",
      type: "boolean",
      description: "Toggles password visibility",
    },
    {
      name: "leftIcon",
      type: "JSX.Element",
      description: "Icon on the left inside the input",
    },
    {
      name: "rightIcon",
      type: "JSX.Element",
      description: "Icon/button on the right (used with passwordReveal)",
    },
    { name: "class", type: "string", description: "Custom class names" },
  ];

  return (
    <ShowcaseLayout>
      <ShowcaseSection id="basic" title="Basic Controlled Input">
        <Input
          value={value()}
          onInput={(e) => setValue(e.currentTarget.value)}
          placeholder="Type here"
        />
        <CodeBlock
          code={`<Input
  value={value()}
  onInput={(e) => setValue(e.currentTarget.value)}
  placeholder="Type here"
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="colors" title="Color States">
        <div class="flex flex-col gap-4">
          <Input color="success" placeholder="Success" />
          <Input color="warning" placeholder="Warning" />
          <Input color="danger" placeholder="Danger" />
        </div>
        <CodeBlock
          code={`<Input color="success" placeholder="Success" />
<Input color="warning" placeholder="Warning" />
<Input color="danger" placeholder="Danger" />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="rounded" title="Rounded">
        <Input rounded placeholder="Rounded input" />
        <CodeBlock code={`<Input rounded placeholder="Rounded input" />`} />
      </ShowcaseSection>

      <ShowcaseSection id="loading" title="Loading State">
        <Input loading placeholder="Loading input..." />
        <CodeBlock code={`<Input loading placeholder="Loading input..." />`} />
      </ShowcaseSection>

      <ShowcaseSection id="icons" title="Input with Icons">
        <Input leftIcon={<FiLock />} placeholder="With left icon" />
        <CodeBlock
          code={`<Input
  leftIcon={<FiLock />}
  placeholder="With left icon"
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="password" title="Password Reveal">
        <Input
          type="password"
          passwordReveal
          leftIcon={<FiLock />}
          rightIcon={<FiEye />}
          placeholder="Enter password"
        />
        <CodeBlock
          code={`<Input
  type="password"
  passwordReveal
  leftIcon={<FiLock />}
  rightIcon={<FiEye />}
  placeholder="Enter password"
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
