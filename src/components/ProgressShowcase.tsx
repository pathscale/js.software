import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Progress, Flex } from "@pathscale/ui";
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
    <Flex direction="col" gap="sm">
      <Progress class="w-56" value={0} max={props.max} color={props.color} />
      <Progress class="w-56" value={10} max={props.max} color={props.color} />
      <Progress class="w-56" value={40} max={props.max} color={props.color} />
      <Progress class="w-56" value={70} max={props.max} color={props.color} />
      <Progress class="w-56" value={100} max={props.max} color={props.color} />
    </Flex>
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
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} />
  <Progress class="w-56" value={10} max={100} />
  <Progress class="w-56" value={40} max={100} />
  <Progress class="w-56" value={70} max={100} />
  <Progress class="w-56" value={100} max={100} />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="primary" title="Primary Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="primary" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="primary" />
  <Progress class="w-56" value={10} max={100} color="primary" />
  <Progress class="w-56" value={40} max={100} color="primary" />
  <Progress class="w-56" value={70} max={100} color="primary" />
  <Progress class="w-56" value={100} max={100} color="primary" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="secondary" title="Secondary Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="secondary" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="secondary" />
  <Progress class="w-56" value={10} max={100} color="secondary" />
  <Progress class="w-56" value={40} max={100} color="secondary" />
  <Progress class="w-56" value={70} max={100} color="secondary" />
  <Progress class="w-56" value={100} max={100} color="secondary" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="accent" title="Accent Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="accent" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="accent" />
  <Progress class="w-56" value={10} max={100} color="accent" />
  <Progress class="w-56" value={40} max={100} color="accent" />
  <Progress class="w-56" value={70} max={100} color="accent" />
  <Progress class="w-56" value={100} max={100} color="accent" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="success" title="Success Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="success" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="success" />
  <Progress class="w-56" value={10} max={100} color="success" />
  <Progress class="w-56" value={40} max={100} color="success" />
  <Progress class="w-56" value={70} max={100} color="success" />
  <Progress class="w-56" value={100} max={100} color="success" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="info" title="Info Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="info" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="info" />
  <Progress class="w-56" value={10} max={100} color="info" />
  <Progress class="w-56" value={40} max={100} color="info" />
  <Progress class="w-56" value={70} max={100} color="info" />
  <Progress class="w-56" value={100} max={100} color="info" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="warning" title="Warning Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="warning" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="warning" />
  <Progress class="w-56" value={10} max={100} color="warning" />
  <Progress class="w-56" value={40} max={100} color="warning" />
  <Progress class="w-56" value={70} max={100} color="warning" />
  <Progress class="w-56" value={100} max={100} color="warning" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="error" title="Error Color">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <ProgressTemplate max={100} color="error" />
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Progress class="w-56" value={0} max={100} color="error" />
  <Progress class="w-56" value={10} max={100} color="error" />
  <Progress class="w-56" value={40} max={100} color="error" />
  <Progress class="w-56" value={70} max={100} color="error" />
  <Progress class="w-56" value={100} max={100} color="error" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="indeterminate" title="Indeterminate">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center">
              <Progress class="w-56" />
            </Flex>
            <CodeBlock
              code={`<Flex align="center" justify="center">
  <Progress class="w-56" />
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={progressProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default ProgressShowcase;
