import { Field, Input } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function FieldShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "sizes", title: "Sizes" },
    { id: "types", title: "Types" },
    { id: "layouts", title: "Layouts" },
    { id: "props", title: "Props" },
  ] as const;

  const sizes = ["sm", "md", "lg"] as const;
  const types = ["default", "danger"] as const;

  const props = [
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the field",
    },
    {
      name: "message",
      type: "string",
      description: "Helper or error message below the field",
    },
    {
      name: "type",
      type: '"default" | "danger"',
      default: '"default"',
      description: "Visual intent of the field",
    },
    {
      name: "horizontal",
      type: "boolean",
      default: "false",
      description: "Whether to use horizontal layout",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the field and its label",
    },
    {
      name: "grouped",
      type: "boolean",
      default: "false",
      description: "Whether to group multiple controls",
    },
    {
      name: "groupMultiline",
      type: "boolean",
      default: "false",
      description: "Whether grouped controls should wrap to multiple lines",
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
          <div class="space-y-4">
            <Field label="Username">
              <Input placeholder="Enter username" />
            </Field>
            <Field label="Email" message="We'll never share your email">
              <Input type="email" placeholder="Enter email" />
            </Field>
            <CodeBlock
              code={`<Field label="Username">
  <Input placeholder="Enter username" />
</Field>

<Field
  label="Email"
  message="We'll never share your email"
>
  <Input type="email" placeholder="Enter email" />
</Field>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="space-y-4">
            {sizes.map((size) => (
              <Field label={`${size.toUpperCase()} size field`} size={size}>
                <Input size={size} placeholder={`${size} input`} />
              </Field>
            ))}
            <CodeBlock
              code={`// Size variations
<Field label="Small field" size="sm">
  <Input size="sm" placeholder="Small input" />
</Field>

<Field label="Medium field" size="md">
  <Input size="md" placeholder="Medium input" />
</Field>

<Field label="Large field" size="lg">
  <Input size="lg" placeholder="Large input" />
</Field>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="types" title="Types">
          <div class="space-y-4">
            {types.map((type) => (
              <Field
                label={`${type} type field`}
                type={type}
                message={
                  type === "danger"
                    ? "This field has an error"
                    : "Helper message"
                }
              >
                <Input
                  placeholder={`${type} input`}
                  color={type === "danger" ? "danger" : undefined}
                />
              </Field>
            ))}
            <CodeBlock
              code={`// Type variations
<Field
  label="Default type field"
  type="default"
  message="Helper message"
>
  <Input placeholder="Default input" />
</Field>

<Field
  label="Danger type field"
  type="danger"
  message="This field has an error"
>
  <Input
    placeholder="Error input"
    color="danger"
  />
</Field>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="layouts" title="Layouts">
          <div class="space-y-4">
            <Field label="Vertical (default)">
              <Input placeholder="Default layout" />
            </Field>

            <Field label="Horizontal" horizontal>
              <Input placeholder="Horizontal layout" />
            </Field>

            <Field label="Grouped controls" grouped>
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
            </Field>

            <Field label="Grouped multiline" grouped groupMultiline>
              <Input placeholder="Street" />
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="ZIP" />
            </Field>

            <CodeBlock
              code={`// Layout variations
<Field label="Vertical (default)">
  <Input placeholder="Default layout" />
</Field>

<Field label="Horizontal" horizontal>
  <Input placeholder="Horizontal layout" />
</Field>

<Field label="Grouped controls" grouped>
  <Input placeholder="First name" />
  <Input placeholder="Last name" />
</Field>

<Field label="Grouped multiline" grouped groupMultiline>
  <Input placeholder="Street" />
  <Input placeholder="City" />
  <Input placeholder="State" />
  <Input placeholder="ZIP" />
</Field>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
