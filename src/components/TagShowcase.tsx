import ShowcaseLayout from "./ShowcaseLayout";
import { Tag } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TagShowcase() {
  const types = [
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "dark",
    "light",
  ] as const;
  const sizes = ["normal", "medium", "large"] as const;

  const sections = [
    { id: "types", title: "Types" },
    { id: "sizes", title: "Sizes" },
    { id: "variants", title: "Variants" },
    { id: "closable", title: "Closable Tags" },
    { id: "attached", title: "Attached Close Button" },
    { id: "custom-close", title: "Custom Close Icon" },
    { id: "props", title: "Props" },
  ] as const;

  const tagProps = [
    {
      name: "type",
      type: '"primary" | "info" | "success" | "warning" | "danger" | "dark" | "light"',
      description: "The visual style and color of the tag",
    },
    {
      name: "size",
      type: '"normal" | "medium" | "large"',
      default: '"normal"',
      description: "The size of the tag",
    },
    {
      name: "rounded",
      type: "boolean",
      description: "Whether the tag should have fully rounded corners",
    },
    {
      name: "closable",
      type: "boolean",
      description: "Whether the tag should have a close button",
    },
    {
      name: "attached",
      type: "boolean",
      description:
        "Whether the close button should be attached as a separate element",
    },
    {
      name: "ariaCloseLabel",
      type: "string",
      default: '"Remove tag"',
      description: "Aria label for the close button",
    },
    {
      name: "onClose",
      type: "(e: MouseEvent) => void",
      description: "Callback function when the close button is clicked",
    },
    {
      name: "closeIcon",
      type: "JSX.Element",
      description: "Custom close button content",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  const handleClose = () => {
    // Handle close event
  };

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-primary)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="types" title="Types">
          <div class="flex flex-wrap gap-2">
            {types.map((type) => (
              <Tag type={type}>{type}</Tag>
            ))}
          </div>
          <CodeBlock
            code={`// Tag types
<Tag type="primary">primary</Tag>
<Tag type="info">info</Tag>
<Tag type="success">success</Tag>
<Tag type="warning">warning</Tag>
<Tag type="danger">danger</Tag>
<Tag type="dark">dark</Tag>
<Tag type="light">light</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-wrap gap-2 items-center">
            {sizes.map((size) => (
              <Tag size={size} type="primary">
                Size {size}
              </Tag>
            ))}
          </div>
          <CodeBlock
            code={`// Tag sizes
<Tag size="normal" type="primary">Normal size</Tag>
<Tag size="medium" type="primary">Medium size</Tag>
<Tag size="large" type="primary">Large size</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <Tag type="primary">Default</Tag>
              <Tag type="primary" rounded>
                Rounded
              </Tag>
            </div>
          </div>
          <CodeBlock
            code={`// Tag variants
<Tag type="primary">Default</Tag>
<Tag type="primary" rounded>Rounded</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="closable" title="Closable Tags">
          <div class="flex flex-wrap gap-2">
            {types.map((type) => (
              <Tag type={type} closable onClose={handleClose}>
                Closable {type}
              </Tag>
            ))}
          </div>
          <CodeBlock
            code={`// Closable tags
<Tag type="primary" closable onClose={handleClose}>
  Closable tag
</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="attached" title="Attached Close Button">
          <div class="flex flex-wrap gap-2">
            {types.slice(0, 3).map((type) => (
              <Tag type={type} closable attached onClose={handleClose}>
                Attached {type}
              </Tag>
            ))}
          </div>
          <CodeBlock
            code={`// Attached close button
<Tag type="primary" closable attached onClose={handleClose}>
  Attached close button
</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-close" title="Custom Close Icon">
          <div class="flex flex-wrap gap-2">
            <Tag
              type="primary"
              closable
              onClose={handleClose}
              closeIcon={<span class="text-xs">✕</span>}
            >
              Custom close icon
            </Tag>
            <Tag
              type="info"
              closable
              attached
              onClose={handleClose}
              closeIcon={<span class="text-xs">✕</span>}
            >
              Attached custom close
            </Tag>
          </div>
          <CodeBlock
            code={`// Custom close icon
<Tag
  type="primary"
  closable
  onClose={handleClose}
  closeIcon={<span class="text-xs">✕</span>}
>
  Custom close icon
</Tag>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tagProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
