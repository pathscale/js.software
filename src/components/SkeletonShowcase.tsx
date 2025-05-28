import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Skeleton } from "@pathscale/ui";
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
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Skeleton class="w-32 h-32" />
          </div>
          <CodeBlock code={`<Skeleton class="w-32 h-32" />`} />
        </ShowcaseSection>

        <ShowcaseSection id="circle" title="Circle With Content">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <div class="flex flex-col gap-4 w-52">
              <div class="flex gap-4 items-center">
                <Skeleton class="w-16 h-16 rounded-full shrink-0" />
                <div class="flex flex-col gap-4">
                  <Skeleton class="h-4 w-20" />
                  <Skeleton class="h-4 w-28" />
                </div>
              </div>
              <Skeleton class="h-32 w-full" />
            </div>
          </div>
          <CodeBlock
            code={`<div class="flex flex-col gap-4 w-52">
  <div class="flex gap-4 items-center">
    <Skeleton class="w-16 h-16 rounded-full shrink-0" />
    <div class="flex flex-col gap-4">
      <Skeleton class="h-4 w-20" />
      <Skeleton class="h-4 w-28" />
    </div>
  </div>
  <Skeleton class="h-32 w-full" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="rectangle" title="Rectangle With Content">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <div class="flex flex-col gap-4 w-52">
              <Skeleton class="h-32 w-full" />
              <Skeleton class="h-4 w-28" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-full" />
            </div>
          </div>
          <CodeBlock
            code={`<div class="flex flex-col gap-4 w-52">
  <Skeleton class="h-32 w-full" />
  <Skeleton class="h-4 w-28" />
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-full" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={skeletonProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default SkeletonShowcase;
