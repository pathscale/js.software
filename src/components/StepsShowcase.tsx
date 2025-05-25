import ShowcaseLayout from "./ShowcaseLayout";
import { Steps } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function StepsShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "responsive", title: "Responsive" },
    { id: "data-content", title: "With Data Content" },
    { id: "custom-colors", title: "Custom Colors" },
    { id: "scrollable", title: "Scrollable Steps" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "vertical",
      type: "boolean",
      default: "false",
      description: "Display steps vertically",
    },
    {
      name: "horizontal",
      type: "boolean",
      default: "false",
      description: "Display steps horizontally",
    },
    {
      name: "as",
      type: "ElementType",
      default: '"ul"',
      description: "HTML element to render as",
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
      name: "data-theme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  const stepProps = [
    {
      name: "value",
      type: "string",
      description: "Custom value to display instead of step number",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color of the step",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Step content",
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
          <Steps>
            <Steps.Step color="primary">Register</Steps.Step>
            <Steps.Step color="primary">Choose plan</Steps.Step>
            <Steps.Step>Purchase</Steps.Step>
            <Steps.Step>Receive Product</Steps.Step>
          </Steps>
          <CodeBlock
            code={`<Steps>
  <Steps.Step color="primary">Register</Steps.Step>
  <Steps.Step color="primary">Choose plan</Steps.Step>
  <Steps.Step>Purchase</Steps.Step>
  <Steps.Step>Receive Product</Steps.Step>
</Steps>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Steps class="lg:steps-horizontal" vertical>
            <Steps.Step color="primary">Register</Steps.Step>
            <Steps.Step color="primary">Choose plan</Steps.Step>
            <Steps.Step>Purchase</Steps.Step>
            <Steps.Step>Receive Product</Steps.Step>
          </Steps>
          <CodeBlock
            code={`<Steps class="lg:steps-horizontal" vertical>
  <Steps.Step color="primary">Register</Steps.Step>
  <Steps.Step color="primary">Choose plan</Steps.Step>
  <Steps.Step>Purchase</Steps.Step>
  <Steps.Step>Receive Product</Steps.Step>
</Steps>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="data-content" title="With Data Content">
          <Steps>
            <Steps.Step value="?" color="neutral">
              Step 1
            </Steps.Step>
            <Steps.Step value="!" color="neutral">
              Step 2
            </Steps.Step>
            <Steps.Step value="✓" color="neutral">
              Step 3
            </Steps.Step>
            <Steps.Step value="✕" color="neutral">
              Step 4
            </Steps.Step>
            <Steps.Step value="!" color="neutral">
              Step 5
            </Steps.Step>
            <Steps.Step value="" color="neutral">
              Step 6
            </Steps.Step>
            <Steps.Step value="●" color="neutral">
              Step 7
            </Steps.Step>
          </Steps>
          <CodeBlock
            code={`<Steps>
  <Steps.Step value="?" color="neutral">Step 1</Steps.Step>
  <Steps.Step value="!" color="neutral">Step 2</Steps.Step>
  <Steps.Step value="✓" color="neutral">Step 3</Steps.Step>
  <Steps.Step value="✕" color="neutral">Step 4</Steps.Step>
  <Steps.Step value="!" color="neutral">Step 5</Steps.Step>
  <Steps.Step value="" color="neutral">Step 6</Steps.Step>
  <Steps.Step value="●" color="neutral">Step 7</Steps.Step>
</Steps>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-colors" title="Custom Colors">
          <Steps>
            <Steps.Step color="info">Fly to moon</Steps.Step>
            <Steps.Step color="info">Shrink the moon</Steps.Step>
            <Steps.Step color="info">Grab the moon</Steps.Step>
            <Steps.Step value="?" color="error">
              Sit on toilet
            </Steps.Step>
          </Steps>
          <CodeBlock
            code={`<Steps>
  <Steps.Step color="info">Fly to moon</Steps.Step>
  <Steps.Step color="info">Shrink the moon</Steps.Step>
  <Steps.Step color="info">Grab the moon</Steps.Step>
  <Steps.Step value="?" color="error">Sit on toilet</Steps.Step>
</Steps>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="scrollable" title="Scrollable Steps">
          <div class="overflow-x-auto">
            <Steps>
              <Steps.Step>start</Steps.Step>
              <Steps.Step color="secondary">2</Steps.Step>
              <Steps.Step color="secondary">3</Steps.Step>
              <Steps.Step color="secondary">4</Steps.Step>
              <Steps.Step>5</Steps.Step>
              <Steps.Step color="accent">6</Steps.Step>
              <Steps.Step color="accent">7</Steps.Step>
              <Steps.Step>8</Steps.Step>
              <Steps.Step color="error">9</Steps.Step>
              <Steps.Step color="error">10</Steps.Step>
              <Steps.Step>11</Steps.Step>
              <Steps.Step>12</Steps.Step>
              <Steps.Step color="warning">13</Steps.Step>
              <Steps.Step color="warning">14</Steps.Step>
              <Steps.Step>15</Steps.Step>
              <Steps.Step color="neutral">16</Steps.Step>
              <Steps.Step color="neutral">17</Steps.Step>
              <Steps.Step color="neutral">18</Steps.Step>
              <Steps.Step color="neutral">19</Steps.Step>
              <Steps.Step color="neutral">20</Steps.Step>
              <Steps.Step color="neutral">21</Steps.Step>
              <Steps.Step color="neutral">22</Steps.Step>
              <Steps.Step color="neutral">23</Steps.Step>
              <Steps.Step color="neutral">end</Steps.Step>
            </Steps>
          </div>
          <CodeBlock
            code={`<div class="overflow-x-auto">
  <Steps>
    <Steps.Step>start</Steps.Step>
    <Steps.Step color="secondary">2</Steps.Step>
    <Steps.Step color="secondary">3</Steps.Step>
    {/* More steps... */}
    <Steps.Step color="neutral">end</Steps.Step>
  </Steps>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Steps Component Props</h3>
          <PropsTable props={props} />

          <h3 class="text-lg font-medium mt-8 mb-4">Step Props</h3>
          <PropsTable props={stepProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
