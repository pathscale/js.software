import { createSignal } from "solid-js";
import { Input, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { FiLock, FiEye, FiEyeOff } from "solid-icons/fi";

export default function InputShowcase() {
  const [value, setValue] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "colors", title: "Color Variants" },
    { id: "states", title: "States" },
    { id: "variants", title: "Variants" },
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
      description: "Shows loading state",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the input",
    },
    {
      name: "readonly",
      type: "boolean",
      default: "false",
      description: "Makes the input readonly",
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
      <div class="space-y-8">
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

        <ShowcaseSection id="basic" title="Basic Usage">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left">
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

        <ShowcaseSection id="colors" title="Color Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input placeholder="Default input" />
              <Input color="success" placeholder="Success" />
              <Input color="warning" placeholder="Warning" />
              <Input color="danger" placeholder="Danger" />
            </Flex>
            <CodeBlock
              code={`<Input placeholder="Default input" />
<Input color="success" placeholder="Success" />
<Input color="warning" placeholder="Warning" />
<Input color="danger" placeholder="Danger" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input loading placeholder="Loading state" />
              <Input disabled placeholder="Disabled state" />
              <Input readonly value="Read-only value" />
              <Input
                type="password"
                passwordReveal
                placeholder="Password with reveal"
              />
            </Flex>
            <CodeBlock
              code={`<Input loading placeholder="Loading state" />
<Input disabled placeholder="Disabled state" />
<Input readonly value="Read-only value" />
<Input type="password" passwordReveal placeholder="Password with reveal" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input rounded placeholder="Rounded input" />
              <div class="w-48">
                <Input expanded={false} placeholder="Not expanded" />
              </div>
            </Flex>
            <CodeBlock
              code={`<Input rounded placeholder="Rounded input" />
<div class="w-48">
  <Input expanded={false} placeholder="Not expanded" />
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input leftIcon={<FiLock />} placeholder="With left icon" />
              <Input
                type="password"
                passwordReveal
                leftIcon={<FiLock />}
                rightIcon={<FiEye />}
                placeholder="Password with icons"
              />
            </Flex>
            <CodeBlock
              code={`<Input
  leftIcon={<FiLock />}
  placeholder="With left icon"
/>

<Input
  type="password"
  passwordReveal
  leftIcon={<FiLock />}
  rightIcon={<FiEye />}
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
