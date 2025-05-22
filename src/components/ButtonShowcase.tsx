import ShowcaseLayout from "./ShowcaseLayout";
import { Button } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ButtonShowcase() {
  const variants = ["fill", "gray", "ghost"] as const;
  const colors = [
    "inverse",
    "primary",
    "secondary",
    "tertiary",
    "accent",
    "positive",
    "destructive",
  ] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const shapes = ["rounded", "circle"] as const;
  const spacing = [0, "xs", "sm", "md", "lg"] as const;
  const alignments = ["start", "center", "end"] as const;

  const sections = [
    { id: "variants-colors", title: "Variants × Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "spacing", title: "Spacing" },
    { id: "alignment", title: "Alignment" },
    { id: "shapes", title: "Shapes" },
    { id: "states", title: "States" },
    { id: "polymorphic", title: "Polymorphic Usage" },
    { id: "props", title: "Props" },
  ] as const;

  const buttonProps = [
    {
      name: "variant",
      type: '"fill" | "gray" | "ghost"',
      default: '"fill"',
      description: "The visual style variant of the button",
    },
    {
      name: "color",
      type: '"inverse" | "primary" | "secondary" | "tertiary" | "accent" | "positive" | "destructive"',
      default: '"primary"',
      description: "The color scheme of the button",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the button",
    },
    {
      name: "shape",
      type: '"rounded" | "circle"',
      default: '"rounded"',
      description: "The shape of the button",
    },
    {
      name: "spacing",
      type: '0 | "xs" | "sm" | "md" | "lg"',
      default: '"md"',
      description: "The internal spacing/padding of the button",
    },
    {
      name: "align",
      type: '"start" | "center" | "end"',
      default: '"center"',
      description: "The alignment of button content",
    },
    {
      name: "stretched",
      type: "boolean",
      default: "false",
      description: "Whether the button should stretch to full width",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Whether the button is in a loading state",
    },
    {
      name: "as",
      type: "ValidComponent",
      default: '"button"',
      description: "The HTML element or component to render as",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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

        <ShowcaseSection id="variants-colors" title="Variants × Colors">
          {variants.map((variant) => (
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-tertiary)/1)]">
                {variant}
              </h3>
              <div class="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button variant={variant} color={color}>
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <CodeBlock
            code={`// Variant and color combinations
<Button variant="fill" color="primary">Primary Fill</Button>
<Button variant="gray" color="accent">Accent Gray</Button>
<Button variant="ghost" color="destructive">Destructive Ghost</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-wrap gap-2 items-center">
            {sizes.map((size) => (
              <Button size={size}>Size {size}</Button>
            ))}
          </div>
          <CodeBlock
            code={`// Size variations
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="spacing" title="Spacing">
          <div class="flex flex-wrap gap-2">
            {spacing.map((space) => (
              <Button spacing={space}>Spacing {space}</Button>
            ))}
          </div>
          <CodeBlock
            code={`// Spacing variations
<Button spacing={0}>No Spacing</Button>
<Button spacing="xs">XS Spacing</Button>
<Button spacing="sm">SM Spacing</Button>
<Button spacing="md">MD Spacing</Button>
<Button spacing="lg">LG Spacing</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alignment" title="Alignment">
          <div class="space-y-2">
            {alignments.map((align) => (
              <Button align={align} stretched class="w-64">
                Align {align}
              </Button>
            ))}
          </div>
          <CodeBlock
            code={`// Content alignment
<Button align="start">Left aligned content</Button>
<Button align="center">Centered content</Button>
<Button align="end">Right aligned content</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="shapes" title="Shapes">
          <div class="flex flex-wrap gap-2">
            {shapes.map((shape) => (
              <Button shape={shape}>{shape}</Button>
            ))}
          </div>
          <CodeBlock
            code={`// Shape variations
<Button shape="rounded">Rounded</Button>
<Button shape="circle">Circle</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
            <Button stretched>Full Width</Button>
          </div>
          <CodeBlock
            code={`// Interactive states
<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button stretched>Full Width</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="polymorphic" title="Polymorphic Usage">
          <div class="flex flex-wrap gap-2">
            <Button as="a" href="#" onClick={(e) => e.preventDefault()}>
              Link Button
            </Button>
            <Button as="span" role="button">
              Span Button
            </Button>
          </div>
          <CodeBlock
            code={`// Polymorphic usage
<Button as="a" href="#">Link Button</Button>
<Button as="span" role="button">Span Button</Button>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={buttonProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
