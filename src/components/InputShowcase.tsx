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
    { id: "sizes", title: "Sizes" },
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
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the input",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color variant of the input",
    },
    {
      name: "variant",
      type: '"bordered" | "ghost" | "flushed"',
      default: '"bordered"',
      description: "Visual variant of the input",
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "true",
      description: "Expands input to full width",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
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
      name: "leftIcon",
      type: "JSX.Element",
      description: "Icon on the left inside the input",
    },
    {
      name: "rightIcon",
      type: "JSX.Element",
      description: "Icon/button on the right (used with password toggle)",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    { name: "class", type: "string", description: "Additional CSS classes" },
    { name: "className", type: "string", description: "Additional CSS classes (alias for class)" },
    { name: "style", type: "JSX.CSSProperties", description: "Inline styles" },
    {
      name: "aria-label",
      type: "string",
      description: "Accessibility label",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that describes the input",
    },
    {
      name: "aria-invalid",
      type: "boolean",
      description: "Indicates if the input has a validation error",
    },
    {
      name: "aria-required",
      type: "boolean",
      description: "Indicates if the input is required",
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
              <Input color="primary" placeholder="Primary" />
              <Input color="secondary" placeholder="Secondary" />
              <Input color="accent" placeholder="Accent" />
              <Input color="info" placeholder="Info" />
              <Input color="success" placeholder="Success" />
              <Input color="warning" placeholder="Warning" />
              <Input color="error" placeholder="Error" />
            </Flex>
            <CodeBlock
              code={`<Input placeholder="Default input" />
<Input color="primary" placeholder="Primary" />
<Input color="secondary" placeholder="Secondary" />
<Input color="accent" placeholder="Accent" />
<Input color="info" placeholder="Info" />
<Input color="success" placeholder="Success" />
<Input color="warning" placeholder="Warning" />
<Input color="error" placeholder="Error" />`}
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

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input size="xs" placeholder="Extra small" />
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium (default)" />
              <Input size="lg" placeholder="Large" />
              <Input size="xl" placeholder="Extra large" />
            </Flex>
            <CodeBlock
              code={`<Input size="xs" placeholder="Extra small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <Input variant="bordered" placeholder="Bordered (default)" />
              <Input variant="ghost" placeholder="Ghost variant" />
              <Input variant="flushed" placeholder="Flushed variant" />
              <div class="w-48">
                <Input fullWidth={false} placeholder="Not full width" />
              </div>
            </Flex>
            <CodeBlock
              code={`<Input variant="bordered" placeholder="Bordered (default)" />
<Input variant="ghost" placeholder="Ghost variant" />
<Input variant="flushed" placeholder="Flushed variant" />
<div class="w-48">
  <Input fullWidth={false} placeholder="Not full width" />
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
