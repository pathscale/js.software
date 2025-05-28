import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Alert } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const DockShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "props", title: "Props" },
  ] as const;

  const alertProps = [
    {
      name: "status",
      type: '"info" | "success" | "warning" | "error"',
      description: "The status/color variant of the alert",
    },
    {
      name: "variant",
      type: '"soft" | "dash" | "outline"',
      description: "The visual style variant of the alert",
    },
    {
      name: "layout",
      type: '"vertical" | "horizontal"',
      description: "The layout direction of the alert content",
    },
    {
      name: "icon",
      type: "JSX.Element",
      description: "Optional icon element to display in the alert",
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

  const InfoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
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
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Alert icon={<InfoIcon />}>
              <span>12 unread messages. Tap to see.</span>
            </Alert>
          </div>
          <CodeBlock
            code={`<Alert icon={<InfoIcon />}>
  <span>12 unread messages. Tap to see.</span>
</Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={alertProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default DockShowcase;
