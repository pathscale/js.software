import ShowcaseLayout from "./ShowcaseLayout";
import { Timeline } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TimelineShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "states", title: "States" },
    { id: "custom-content", title: "Custom Content" },
    { id: "props", title: "Props" },
  ];

  const basicStages = [
    { title: "Order Placed" },
    { title: "Processing" },
    { title: "Shipped" },
    { title: "Delivered" },
  ];

  const stagesWithStates = [
    { title: "Order Placed", active: true },
    { title: "Processing", active: true },
    { title: "Shipped", active: true },
    { title: "Delivered" },
  ];

  const stagesWithError = [
    { title: "Order Placed", active: true },
    { title: "Processing", active: true },
    { title: "Shipped", error: true },
    { title: "Delivered" },
  ];

  const customStages = [
    {
      title: "Order #123 Placed",
      date: "2024-03-20",
      description: "Your order has been confirmed",
      active: true,
    },
    {
      title: "Payment Processed",
      date: "2024-03-20",
      description: "Payment of $99.99 has been processed",
      active: true,
    },
    {
      title: "Order Shipped",
      date: "2024-03-21",
      description: "Package is on its way",
      active: true,
    },
    {
      title: "Out for Delivery",
      date: "2024-03-22",
      description: "Expected delivery by 5 PM",
    },
  ];

  const timelineProps = [
    {
      name: "stages",
      type: "TimelineStage[]",
      required: true,
      description: "Array of stages to display in the timeline",
    },
    {
      name: "renderStage",
      type: "(stage: TimelineStage, index: number) => JSX.Element",
      description: "Custom render function for timeline stages",
    },
  ];

  const stageProps = [
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether the stage is active/completed",
    },
    {
      name: "error",
      type: "boolean",
      default: "false",
      description: "Whether the stage has an error",
    },
    {
      name: "title",
      type: "string",
      description: "Title text for the stage (when using default rendering)",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-primary)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="max-w-md pl-6">
            <Timeline stages={basicStages} />
          </div>
          <CodeBlock
            code={`const stages = [
  { title: "Order Placed" },
  { title: "Processing" },
  { title: "Shipped" },
  { title: "Delivered" },
];

<Timeline stages={stages} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="space-y-8 max-w-md pl-6">
            <div>
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-muted)/1)] mb-4">
                Active States
              </h3>
              <Timeline stages={stagesWithStates} />
            </div>

            <div>
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-muted)/1)] mb-4">
                With Error
              </h3>
              <Timeline stages={stagesWithError} />
            </div>
          </div>
          <CodeBlock
            code={`// Active states
const stages = [
  { title: "Order Placed", active: true },
  { title: "Processing", active: true },
  { title: "Shipped", active: true },
  { title: "Delivered" },
];

<Timeline stages={stages} />

// With error
const stages = [
  { title: "Order Placed", active: true },
  { title: "Processing", active: true },
  { title: "Shipped", error: true },
  { title: "Delivered" },
];

<Timeline stages={stages} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-content" title="Custom Content">
          <div class="max-w-md pl-6">
            <Timeline
              stages={customStages}
              renderStage={(stage) => (
                <div class="space-y-1">
                  <div class="font-medium">{stage.title}</div>
                  <div class="text-xs text-[hsl(var(--color-fg-muted)/1)]">
                    {stage.date}
                  </div>
                  <div class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                    {stage.description}
                  </div>
                </div>
              )}
            />
          </div>
          <CodeBlock
            code={`const stages = [
  {
    title: "Order #123 Placed",
    date: "2024-03-20",
    description: "Your order has been confirmed",
    active: true,
  },
  {
    title: "Payment Processed",
    date: "2024-03-20",
    description: "Payment of $99.99 has been processed",
    active: true,
  },
  // ... more stages
];

<Timeline
  stages={stages}
  renderStage={(stage) => (
    <div class="space-y-1">
      <div class="font-medium">{stage.title}</div>
      <div class="text-xs text-[hsl(var(--color-fg-muted)/1)]">{stage.date}</div>
      <div class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">{stage.description}</div>
    </div>
  )}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Timeline Props</h3>
          <PropsTable props={timelineProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">TimelineStage Props</h3>
          <PropsTable props={stageProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
