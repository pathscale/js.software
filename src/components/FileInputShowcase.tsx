import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { FileInput, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const FileInputShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "bordered", title: "Bordered" },
    { id: "form-control", title: "Form Control and Labels" },
    { id: "props", title: "Props" },
  ] as const;

  const fileInputProps = [
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "ghost" | "info" | "success" | "warning" | "error"',
      description: "The color scheme of the file input",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the file input",
    },
    {
      name: "bordered",
      type: "boolean",
      default: "false",
      description: "Whether to show a border around the file input",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the file input is disabled",
    },
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
            <Flex justify="left" align="left">
              <FileInput class="w-full max-w-xs" />
            </Flex>
            <CodeBlock code={`<FileInput class="w-full max-w-xs" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <FileInput class="w-full max-w-xs" color="primary" />
              <FileInput class="w-full max-w-xs" color="secondary" />
              <FileInput class="w-full max-w-xs" color="accent" />
              <FileInput class="w-full max-w-xs" color="ghost" />
              <FileInput class="w-full max-w-xs" color="info" />
              <FileInput class="w-full max-w-xs" color="success" />
              <FileInput class="w-full max-w-xs" color="warning" />
              <FileInput class="w-full max-w-xs" color="error" />
            </Flex>
            <CodeBlock
              code={`<Flex justify="left" align="left">
<FileInput class="w-full max-w-xs" color="primary" />
<FileInput class="w-full max-w-xs" color="secondary" />
<FileInput class="w-full max-w-xs" color="accent" />
<FileInput class="w-full max-w-xs" color="ghost" />
<FileInput class="w-full max-w-xs" color="info" />
<FileInput class="w-full max-w-xs" color="success" />
<FileInput class="w-full max-w-xs" color="warning" />
<FileInput class="w-full max-w-xs" color="error" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <FileInput class="w-full max-w-xs" size="xs" />
              <FileInput class="w-full max-w-xs" size="sm" />
              <FileInput class="w-full max-w-xs" size="md" />
              <FileInput class="w-full max-w-xs" size="lg" />
              <FileInput class="w-full max-w-xs" size="xl" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" justify="left" align="left" gap="lg">
  <FileInput class="w-full max-w-xs" size="xs" />
  <FileInput class="w-full max-w-xs" size="sm" />
  <FileInput class="w-full max-w-xs" size="md" />
  <FileInput class="w-full max-w-xs" size="lg" />
  <FileInput class="w-full max-w-xs" size="xl" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="bordered" title="Bordered">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="left" align="left" gap="lg">
              <FileInput class="w-full max-w-xs" bordered />
              <FileInput class="w-full max-w-xs" bordered color="primary" />
              <FileInput class="w-full max-w-xs" bordered color="secondary" />
            </Flex>
            <CodeBlock
              code={`<div class="w-full flex flex-col gap-2">
  <FileInput class="w-full max-w-xs" bordered />
  <FileInput class="w-full max-w-xs" bordered color="primary" />
  <FileInput class="w-full max-w-xs" bordered color="secondary" />
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="form-control" title="Form Control and Labels">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Pick a file</span>
                  <span class="label-text-alt">Alt label</span>
                </label>
                <FileInput class="w-full" />
                <label class="label">
                  <span class="label-text-alt">Alt label</span>
                  <span class="label-text-alt">Alt label</span>
                </label>
              </div>
            </Flex>
            <CodeBlock
              code={`<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Pick a file</span>
    <span class="label-text-alt">Alt label</span>
  </label>
  <FileInput class="w-full" />
  <label class="label">
    <span class="label-text-alt">Alt label</span>
    <span class="label-text-alt">Alt label</span>
  </label>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={fileInputProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default FileInputShowcase;
