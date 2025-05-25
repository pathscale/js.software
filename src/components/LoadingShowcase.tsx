import ShowcaseLayout from "./ShowcaseLayout";
import { Loading } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function LoadingShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "variants", title: "Variants" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the loading indicator",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost"',
      description: "Color of the loading indicator",
    },
    {
      name: "variant",
      type: '"spinner" | "dots" | "ring" | "ball" | "bars" | "infinity"',
      default: '"spinner"',
      description: "Visual style variant of the loading indicator",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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

        <ShowcaseSection id="default" title="Default">
          <Loading variant="spinner" />
          <CodeBlock code={`<Loading variant="spinner" />`} />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-wrap gap-4">
            <Loading class="m-1" />
            <Loading class="m-1" color="primary" />
            <Loading class="m-1" color="secondary" />
            <Loading class="m-1" color="success" />
            <Loading class="m-1" color="warning" />
            <Loading class="m-1" color="error" />
            <Loading class="m-1" color="info" />
            <Loading class="m-1" color="accent" />
            <Loading class="m-1" color="ghost" />
          </div>
          <CodeBlock
            code={`<Loading class="m-1" />
<Loading class="m-1" color="primary" />
<Loading class="m-1" color="secondary" />
<Loading class="m-1" color="success" />
<Loading class="m-1" color="warning" />
<Loading class="m-1" color="error" />
<Loading class="m-1" color="info" />
<Loading class="m-1" color="accent" />
<Loading class="m-1" color="ghost" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="flex gap-x-2">
            <Loading variant="spinner" />
            <Loading variant="dots" />
            <Loading variant="ring" />
            <Loading variant="ball" />
            <Loading variant="bars" />
            <Loading variant="infinity" />
          </div>
          <CodeBlock
            code={`<Loading variant="spinner" />
<Loading variant="dots" />
<Loading variant="ring" />
<Loading variant="ball" />
<Loading variant="bars" />
<Loading variant="infinity" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex items-center gap-4">
            <Loading size="xs" />
            <Loading size="sm" />
            <Loading size="md" />
            <Loading size="lg" />
            <Loading size="xl" />
          </div>
          <CodeBlock
            code={`<Loading size="xs" />
<Loading size="sm" />
<Loading size="md" />
<Loading size="lg" />
<Loading size="xl" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
