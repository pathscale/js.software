import ShowcaseLayout from "./ShowcaseLayout";
import { Steps } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal } from "solid-js";

export default function StepsShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "custom", title: "Custom Markers" },
    { id: "clickable", title: "Clickable Steps" },
    { id: "animated", title: "Animated Steps" },
    { id: "props", title: "Props" },
  ];

  const basicSteps = [
    {
      title: "Step 1",
      subtitle: "First step",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Welcome</h3>
          <p>This is the content of step 1.</p>
        </div>
      ),
    },
    {
      title: "Step 2",
      subtitle: "Second step",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Configuration</h3>
          <p>This is the content of step 2.</p>
        </div>
      ),
    },
    {
      title: "Step 3",
      subtitle: "Final step",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Complete</h3>
          <p>This is the content of step 3.</p>
        </div>
      ),
    },
  ];

  const customSteps = [
    {
      title: "Account",
      marker: "👤",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Account Setup</h3>
          <p>Create your account.</p>
        </div>
      ),
    },
    {
      title: "Profile",
      marker: "📝",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Profile Details</h3>
          <p>Complete your profile.</p>
        </div>
      ),
    },
    {
      title: "Done",
      marker: "✨",
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">All Set!</h3>
          <p>Your account is ready.</p>
        </div>
      ),
    },
  ];

  const [activeStep, setActiveStep] = createSignal(0);

  const clickableSteps = [
    {
      title: "Step 1",
      clickable: true,
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Clickable Step 1</h3>
          <p>You can click on the steps above to navigate.</p>
        </div>
      ),
    },
    {
      title: "Step 2",
      clickable: true,
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Clickable Step 2</h3>
          <p>Try clicking on different steps.</p>
        </div>
      ),
    },
    {
      title: "Step 3",
      clickable: true,
      content: (
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="text-lg font-medium mb-2">Clickable Step 3</h3>
          <p>Navigation made easy.</p>
        </div>
      ),
    },
  ];

  const stepsProps = [
    {
      name: "steps",
      type: "StepItem[]",
      required: true,
      description: "Array of step items to display",
    },
    {
      name: "animated",
      type: "boolean",
      default: "false",
      description: "Enable transition animations",
    },
    {
      name: "initial",
      type: "number",
      default: "0",
      description: "Initial active step index",
    },
    {
      name: "value",
      type: "number",
      description: "Controlled active step index",
    },
    {
      name: "onStepChange",
      type: "(stepIndex: number) => void",
      description: "Callback fired when step changes",
    },
  ];

  const stepItemProps = [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Title of the step",
    },
    {
      name: "marker",
      type: "string",
      description: "Custom marker content (defaults to step number)",
    },
    {
      name: "subtitle",
      type: "string",
      description: "Optional subtitle text",
    },
    {
      name: "clickable",
      type: "boolean",
      default: "false",
      description: "Whether the step can be clicked to navigate",
    },
    {
      name: "content",
      type: "JSX.Element",
      required: true,
      description: "Content to display when step is active",
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
          <Steps steps={basicSteps} />
          <CodeBlock
            code={`const steps = [
  {
    title: "Step 1",
    subtitle: "First step",
    content: <div>Content for step 1</div>
  },
  {
    title: "Step 2",
    subtitle: "Second step",
    content: <div>Content for step 2</div>
  },
  {
    title: "Step 3",
    subtitle: "Final step",
    content: <div>Content for step 3</div>
  }
];

<Steps steps={steps} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom" title="Custom Markers">
          <Steps steps={customSteps} />
          <CodeBlock
            code={`const steps = [
  {
    title: "Account",
    marker: "👤",
    content: <div>Account setup content</div>
  },
  {
    title: "Profile",
    marker: "📝",
    content: <div>Profile setup content</div>
  },
  {
    title: "Done",
    marker: "✨",
    content: <div>Completion content</div>
  }
];

<Steps steps={steps} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="clickable" title="Clickable Steps">
          <Steps steps={clickableSteps} />
          <CodeBlock
            code={`const steps = [
  {
    title: "Step 1",
    clickable: true,
    content: <div>Content for step 1</div>
  },
  {
    title: "Step 2",
    clickable: true,
    content: <div>Content for step 2</div>
  },
  {
    title: "Step 3",
    clickable: true,
    content: <div>Content for step 3</div>
  }
];

<Steps steps={steps} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="animated" title="Animated Steps">
          <Steps steps={basicSteps} animated />
          <CodeBlock code={`<Steps steps={steps} animated />`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Steps Component Props</h3>
          <PropsTable props={stepsProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">StepItem Props</h3>
          <PropsTable props={stepItemProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
