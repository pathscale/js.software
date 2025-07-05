import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Skeleton, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const SkeletonShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "circle", title: "Circle With Content" },
    { id: "rectangle", title: "Rectangle With Content" },
    { id: "props", title: "Props" },
  ] as const;

  const skeletonProps = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Optional content to display inside the skeleton",
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
            <Flex align="start" justify="start">
              <Skeleton class="w-32 h-32" />
            </Flex>
            <CodeBlock code={`<Skeleton class="w-32 h-32" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="circle" title="Circle With Content">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex direction="col" gap="lg" class="w-52">
                <Flex gap="lg" align="start">
                  <Skeleton class="w-16 h-16 rounded-full shrink-0" />
                  <Flex direction="col" gap="lg">
                    <Skeleton class="h-4 w-20" />
                    <Skeleton class="h-4 w-28" />
                  </Flex>
                </Flex>
                <Skeleton class="h-32 w-full" />
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="lg" class="w-52">
  <Flex gap="lg" align="start">
    <Skeleton class="w-16 h-16 rounded-full shrink-0" />
    <Flex direction="col" gap="lg">
      <Skeleton class="h-4 w-20" />
      <Skeleton class="h-4 w-28" />
    </Flex>
  </Flex>
  <Skeleton class="h-32 w-full" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="rectangle" title="Rectangle With Content">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Flex direction="col" gap="lg" class="w-52">
                <Skeleton class="h-32 w-full" />
                <Skeleton class="h-4 w-28" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-full" />
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="lg" class="w-52">
  <Skeleton class="h-32 w-full" />
  <Skeleton class="h-4 w-28" />
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-full" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={skeletonProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default SkeletonShowcase;
