import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Progress } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const ProgressShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "primary", title: "Primary Color" },
    { id: "secondary", title: "Secondary Color" },
    { id: "accent", title: "Accent Color" },
    { id: "success", title: "Success Color" },
    { id: "info", title: "Info Color" },
    { id: "warning", title: "Warning Color" },
    { id: "error", title: "Error Color" },
    { id: "indeterminate", title: "Indeterminate" },
    { id: "props", title: "Props" },
  ] as const;

  const progressProps = [
    {
      name: "value",
      type: "number",
      description: "Current value of the progress bar",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value of the progress bar",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color variant of the progress bar",
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

  const ProgressTemplate = (props: { color?: string; max?: number }) => (
    <div class="flex flex-col gap-y-2">
      <Progress class="w-56" value={0} max={props.max} color={props.color} />
      <Progress class="w-56" value={10} max={props.max} color={props.color} />
      <Progress class="w-56" value={40} max={props.max} color={props.color} />
      <Progress class="w-56" value={70} max={props.max} color={props.color} />
      <Progress class="w-56" value={100} max={props.max} color={props.color} />
    </div>
  );

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
          <ProgressTemplate max={100} />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} />
  <Progress class="w-56" value={10} max={100} />
  <Progress class="w-56" value={40} max={100} />
  <Progress class="w-56" value={70} max={100} />
  <Progress class="w-56" value={100} max={100} />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="primary" title="Primary Color">
          <ProgressTemplate max={100} color="primary" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="primary" />
  <Progress class="w-56" value={10} max={100} color="primary" />
  <Progress class="w-56" value={40} max={100} color="primary" />
  <Progress class="w-56" value={70} max={100} color="primary" />
  <Progress class="w-56" value={100} max={100} color="primary" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="secondary" title="Secondary Color">
          <ProgressTemplate max={100} color="secondary" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="secondary" />
  <Progress class="w-56" value={10} max={100} color="secondary" />
  <Progress class="w-56" value={40} max={100} color="secondary" />
  <Progress class="w-56" value={70} max={100} color="secondary" />
  <Progress class="w-56" value={100} max={100} color="secondary" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="accent" title="Accent Color">
          <ProgressTemplate max={100} color="accent" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="accent" />
  <Progress class="w-56" value={10} max={100} color="accent" />
  <Progress class="w-56" value={40} max={100} color="accent" />
  <Progress class="w-56" value={70} max={100} color="accent" />
  <Progress class="w-56" value={100} max={100} color="accent" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="success" title="Success Color">
          <ProgressTemplate max={100} color="success" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="success" />
  <Progress class="w-56" value={10} max={100} color="success" />
  <Progress class="w-56" value={40} max={100} color="success" />
  <Progress class="w-56" value={70} max={100} color="success" />
  <Progress class="w-56" value={100} max={100} color="success" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="info" title="Info Color">
          <ProgressTemplate max={100} color="info" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="info" />
  <Progress class="w-56" value={10} max={100} color="info" />
  <Progress class="w-56" value={40} max={100} color="info" />
  <Progress class="w-56" value={70} max={100} color="info" />
  <Progress class="w-56" value={100} max={100} color="info" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="warning" title="Warning Color">
          <ProgressTemplate max={100} color="warning" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="warning" />
  <Progress class="w-56" value={10} max={100} color="warning" />
  <Progress class="w-56" value={40} max={100} color="warning" />
  <Progress class="w-56" value={70} max={100} color="warning" />
  <Progress class="w-56" value={100} max={100} color="warning" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="error" title="Error Color">
          <ProgressTemplate max={100} color="error" />
          <CodeBlock
            code={`<div class="flex flex-col gap-y-2">
  <Progress class="w-56" value={0} max={100} color="error" />
  <Progress class="w-56" value={10} max={100} color="error" />
  <Progress class="w-56" value={40} max={100} color="error" />
  <Progress class="w-56" value={70} max={100} color="error" />
  <Progress class="w-56" value={100} max={100} color="error" />
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="indeterminate" title="Indeterminate">
          <Progress class="w-56" />
          <CodeBlock code={`<Progress class="w-56" />`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={progressProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default ProgressShowcase;
