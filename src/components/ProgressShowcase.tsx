import ShowcaseLayout from "./ShowcaseLayout";
import { Progress } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ProgressShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "sizes", title: "Sizes" },
    { id: "shapes", title: "Shapes" },
    { id: "colors", title: "Colors" },
    { id: "variants", title: "Variants" },
    { id: "labels", title: "Labels" },
    { id: "indeterminate", title: "Indeterminate" },
    { id: "props", title: "Props" },
  ];

  const colors = ["default", "danger", "success", "info", "warning"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const shapes = ["rounded", "circle"] as const;
  const variants = ["filled", "outlined", "ghost"] as const;

  const progressProps = [
    {
      name: "value",
      type: "number | null",
      description: "Progress value (0-100). Use null for indeterminate state",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the progress bar",
    },
    {
      name: "shape",
      type: '"rounded" | "circle"',
      default: '"rounded"',
      description: "Shape of the progress bar",
    },
    {
      name: "color",
      type: '"default" | "danger" | "success" | "info" | "warning"',
      default: '"default"',
      description: "Color theme of the progress bar",
    },
    {
      name: "variant",
      type: '"filled" | "outlined" | "ghost"',
      default: '"filled"',
      description: "Visual variant of the progress bar",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "false",
      description: "Whether to show the progress value",
    },
    {
      name: "format",
      type: '"percent" | "raw"',
      default: '"percent"',
      description: "Format of the displayed value",
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
            <Progress value={60} />
          </div>
          <CodeBlock code={`<Progress value={60} />`} />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="space-y-4">
            {sizes.map((size) => (
              <Progress value={75} size={size} showValue />
            ))}
          </div>
          <CodeBlock
            code={`<Progress value={75} size="sm" />
<Progress value={75} size="md" />
<Progress value={75} size="lg" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="shapes" title="Shapes">
          <div class="space-y-4">
            {shapes.map((shape) => (
              <Progress value={75} shape={shape} showValue />
            ))}
          </div>
          <CodeBlock
            code={`<Progress value={75} shape="rounded" />
<Progress value={75} shape="circle" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="space-y-4">
            {colors.map((color) => (
              <Progress value={75} color={color} showValue />
            ))}
          </div>
          <CodeBlock
            code={`<Progress value={75} color="default" />
<Progress value={75} color="danger" />
<Progress value={75} color="success" />
<Progress value={75} color="info" />
<Progress value={75} color="warning" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="space-y-4">
            {variants.map((variant) => (
              <Progress value={75} variant={variant} showValue />
            ))}
          </div>
          <CodeBlock
            code={`<Progress value={75} variant="filled" />
<Progress value={75} variant="outlined" />
<Progress value={75} variant="ghost" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="labels" title="Labels">
          <div class="space-y-4">
            <Progress value={75} showValue format="percent" />
            <Progress value={75} showValue format="raw" />
          </div>
          <CodeBlock
            code={`<Progress value={75} showValue format="percent" />
<Progress value={75} showValue format="raw" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="indeterminate" title="Indeterminate">
          <div class="space-y-4">
            <Progress value={null} />
          </div>
          <CodeBlock code={`<Progress value={null} />`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={progressProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
