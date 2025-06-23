import { Flex, Mask } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function MaskShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "variants", title: "Variants" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "variant",
      type: `"squircle" | "heart" | "hexagon" | "hexagon-2" | "decagon" | "pentagon" | "diamond" | "square" | "circle" | "star" | "star-2" | "triangle" | "triangle-2" | "triangle-3" | "triangle-4" | "half-1" | "half-2"`,
      description: "Defines the shape of the image mask",
    },
    {
      name: "src",
      type: "string",
      description: "Image source URL",
    },
    {
      name: "alt",
      type: "string",
      description: "Alt text for the image",
    },
    {
      name: "class / className",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  const variants = [
    "squircle",
    "heart",
    "hexagon",
    "hexagon-2",
    "decagon",
    "pentagon",
    "diamond",
    "square",
    "circle",
    "star",
    "star-2",
    "triangle",
    "triangle-2",
    "triangle-3",
    "triangle-4",
    "half-1",
    "half-2",
  ] as const;

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

        <ShowcaseSection id="variants" title="Variants">
          <Flex wrap="wrap" gap="md">
            {variants.map((variant) => (
              <Flex direction="col" align="center" gap="md">
                <Mask
                  variant={variant}
                  class="w-24 h-24"
                  src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
                />
                <span class="text-sm text-center">{variant}</span>
              </Flex>
            ))}
          </Flex>

          <CodeBlock
            code={`<Mask
  variant="squircle"
  class="w-24 h-24"
  src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
