import { Carousel, Flex, Button } from "@pathscale/ui";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import ShowcaseLayout from "./ShowcaseLayout";

export default function CarouselShowcase() {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
  ];

  const sections = [
    { id: "default", title: "Default" },
    { id: "vertical", title: "Vertical" },
    { id: "snap-end", title: "Snap End" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "snap",
      type: `"start" | "center" | "end"`,
      description: "Snap alignment for carousel items",
    },
    {
      name: "direction",
      type: `"horizontal" | "vertical"`,
      description: "Orientation of the carousel",
    },
    {
      name: "class",
      type: "string",
      description: "Custom classes for styling",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Carousel.Item components as children",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for accessibility",
    },
    {
      name: "ariaLabelledBy",
      type: "string",
      description: "ARIA labelledby for accessibility",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role attribute",
    },
  ];

  const itemProps = [
    {
      name: "class",
      type: "string",
      description: "Custom classes for styling the carousel item",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Slide content (usually an image or card)",
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
          <Flex direction="col" gap="md">
            <Carousel class="rounded-box">
              {images.map((src) => (
                <Carousel.Item>
                  <img src={src} alt="Slide" />
                </Carousel.Item>
              ))}
            </Carousel>
            <CodeBlock
              code={`<Carousel class="rounded-box">
  <Carousel.Item>
    <img src="..." alt="Slide" />
  </Carousel.Item>
  ...
</Carousel>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="vertical" title="Vertical">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="sm">
              <Carousel direction="vertical" class="h-96 w-64 rounded-box">
                {images.map((src) => (
                  <Carousel.Item>
                    <img src={src} alt="Slide" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Flex>
            <CodeBlock
              code={`<Carousel direction="vertical" class="h-96 w-64 rounded-box">
  <Carousel.Item>
    <img src="..." alt="Slide" />
  </Carousel.Item>
  ...
</Carousel>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="snap-end" title="Snap End">
          <Flex direction="col" gap="md">
            <Carousel snap="end" class="rounded-box">
              {images.map((src) => (
                <Carousel.Item>
                  <img src={src} alt="Slide" />
                </Carousel.Item>
              ))}
            </Carousel>
            <CodeBlock
              code={`<Carousel snap="end" class="rounded-box">
  <Carousel.Item>
    <img src="..." alt="Slide" />
  </Carousel.Item>
  ...
</Carousel>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-semibold mb-2">Carousel</h3>
          <PropsTable props={props} />

          <h3 class="text-lg font-semibold mt-6 mb-2">Carousel.Item</h3>
          <PropsTable props={itemProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
