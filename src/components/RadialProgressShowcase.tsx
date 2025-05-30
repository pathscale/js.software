import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { RadialProgress, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const RadialProgressShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "background", title: "Background Color" },
    { id: "size-thickness", title: "Custom Size and Thickness" },
    { id: "props", title: "Props" },
  ] as const;

  const radialProgressProps = [
    {
      name: "value",
      type: "number",
      description: "Current value of the radial progress (0-100)",
    },
    {
      name: "size",
      type: "string",
      default: "4rem",
      description: "Size of the radial progress (CSS dimension)",
    },
    {
      name: "thickness",
      type: "string",
      default: "4px",
      description: "Thickness of the progress ring (CSS dimension)",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color variant of the radial progress",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <RadialProgress value={75}>75%</RadialProgress>
            </Flex>
            <CodeBlock
              code={`<RadialProgress value={75}>75%</RadialProgress>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left" gap="lg">
              <RadialProgress value={75} color="primary">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="secondary">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="accent">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="info">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="success">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="warning">
                75%
              </RadialProgress>
              <RadialProgress value={75} color="error">
                75%
              </RadialProgress>
            </Flex>
            <CodeBlock
              code={`<Flex align="left" justify="left" gap="lg">
  <RadialProgress value={75} color="primary">75%</RadialProgress>
  <RadialProgress value={75} color="secondary">75%</RadialProgress>
  <RadialProgress value={75} color="accent">75%</RadialProgress>
  <RadialProgress value={75} color="info">75%</RadialProgress>
  <RadialProgress value={75} color="success">75%</RadialProgress>
  <RadialProgress value={75} color="warning">75%</RadialProgress>
  <RadialProgress value={75} color="error">75%</RadialProgress>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="background" title="Background Color">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left">
              <RadialProgress
                value={75}
                class="bg-primary text-primary-content border-4 border-primary"
              >
                75%
              </RadialProgress>
            </Flex>
            <CodeBlock
              code={`<RadialProgress
  value={75}
  class="bg-primary text-primary-content border-4 border-primary"
>
  75%
</RadialProgress>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="size-thickness" title="Custom Size and Thickness">
          <Flex direction="col" gap="md">
            <Flex align="left" justify="left" gap="lg">
              <RadialProgress value={70} size="12rem" thickness="2px">
                70%
              </RadialProgress>
              <RadialProgress value={80} size="12rem" thickness="2rem">
                80%
              </RadialProgress>
            </Flex>
            <CodeBlock
              code={`<Flex align="left" justify="left" gap="lg">
  <RadialProgress value={70} size="12rem" thickness="2px">
    70%
  </RadialProgress>
  <RadialProgress value={80} size="12rem" thickness="2rem">
    80%
  </RadialProgress>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={radialProgressProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default RadialProgressShowcase;
