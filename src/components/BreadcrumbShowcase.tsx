import ShowcaseLayout from "./ShowcaseLayout";
import { Breadcrumb, BreadcrumbItem } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function BreadcrumbShowcase() {
  const sizes = ["sm", "md", "lg"] as const;
  const alignments = ["left", "center", "right"] as const;
  const separators = ["arrow", "dot", "bullet", "succeeds"] as const;

  const sections = [
    { id: "sizes", title: "Sizes" },
    { id: "alignments", title: "Alignments" },
    { id: "separators", title: "Separators" },
    { id: "active", title: "Active State" },
    { id: "links", title: "With Links" },
    { id: "props", title: "Props" },
  ] as const;

  const breadcrumbProps = [
    {
      name: "alignment",
      type: '"left" | "center" | "right"',
      default: '"left"',
      description: "Horizontal alignment of the breadcrumb",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the breadcrumb",
    },
    {
      name: "separator",
      type: '"arrow" | "dot" | "bullet" | "succeeds"',
      description: "Separator between items",
    },
  ];

  const breadcrumbItemProps = [
    {
      name: "href",
      type: "string",
      description: "URL for the breadcrumb item",
    },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether this is the active/current item",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-col gap-4">
            {sizes.map((size) => (
              <Breadcrumb size={size}>
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Library</BreadcrumbItem>
                <BreadcrumbItem active>Current Page</BreadcrumbItem>
              </Breadcrumb>
            ))}
          </div>
          <CodeBlock
            code={`// Breadcrumb sizes
<Breadcrumb size="sm">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Library</BreadcrumbItem>
  <BreadcrumbItem active>Current Page</BreadcrumbItem>
</Breadcrumb>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alignments" title="Alignments">
          <div class="flex flex-col gap-4">
            {alignments.map((alignment) => (
              <Breadcrumb alignment={alignment}>
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Library</BreadcrumbItem>
                <BreadcrumbItem active>Current Page</BreadcrumbItem>
              </Breadcrumb>
            ))}
          </div>
          <CodeBlock
            code={`// Breadcrumb alignments
<Breadcrumb alignment="left">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Library</BreadcrumbItem>
  <BreadcrumbItem active>Current Page</BreadcrumbItem>
</Breadcrumb>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="separators" title="Separators">
          <div class="flex flex-col gap-4">
            {separators.map((separator) => (
              <Breadcrumb separator={separator}>
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Library</BreadcrumbItem>
                <BreadcrumbItem active>Current Page</BreadcrumbItem>
              </Breadcrumb>
            ))}
          </div>
          <CodeBlock
            code={`// Breadcrumb separators
<Breadcrumb separator="arrow">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Library</BreadcrumbItem>
  <BreadcrumbItem active>Current Page</BreadcrumbItem>
</Breadcrumb>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="links" title="With Links">
          <div class="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbItem href="/products/electronics">
                Electronics
              </BreadcrumbItem>
              <BreadcrumbItem active>Laptops</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <CodeBlock
            code={`// Breadcrumb with links
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
  <BreadcrumbItem active>Laptops</BreadcrumbItem>
</Breadcrumb>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium mb-4">Breadcrumb Props</h3>
              <PropsTable props={breadcrumbProps} />
            </div>
            <div>
              <h3 class="text-lg font-medium mb-4">BreadcrumbItem Props</h3>
              <PropsTable props={breadcrumbItemProps} />
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
