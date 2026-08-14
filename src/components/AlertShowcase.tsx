import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Alert, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const AlertShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "status-colors", title: "Status Colors" },
    { id: "custom-indicator", title: "Custom Indicator" },
    { id: "with-buttons", title: "With Buttons" },
    { id: "with-title", title: "With Title and Description" },
    { id: "props", title: "Props" },
  ] as const;

  const alertProps = [
    {
      name: "flavor",
      type: `Flavor`,
      default: '"default"',
      description: "What the thing is. Open: your own name yields a class you can style.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Flat in 2.3: title, icon and onDismiss are props, and the body is the children",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "class",
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
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
                class="block text-sm text-fg-secondary hover:text-fg-body"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex
            class="w-full component-preview"
            align="start"
            justify="start"
            gap="md"
          >
            <Alert>
              12 unread messages. Tap to see.
              </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  12 unread messages. Tap to see.
  </Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="status-colors" title="Status Colors">
          <Flex
            class="w-full component-preview"
            align="start"
            justify="start"
            gap="md"
          >
            <Flex direction="col" gap="md" class="w-full component-preview">
              <Alert flavor="neutral">
                Default status alert
                </Alert>
              <Alert flavor="accent">
                Accent status alert
                </Alert>
              <Alert flavor="success">
                Success status alert
                </Alert>
              <Alert flavor="warning">
                Warning status alert
                </Alert>
              <Alert flavor="destructive">
                Danger status alert
                </Alert>
            </Flex>
          </Flex>
          <CodeBlock
            code={`<Alert flavor="success">
  Success status alert
  </Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-indicator" title="Custom Indicator">
          <Flex
            class="w-full component-preview"
            align="start"
            justify="start"
            gap="md"
          >
            <Alert flavor="accent">
              <InfoIcon />
              Alert with a custom icon
              </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert flavor="accent">
  <InfoIcon />
  Alert with a custom icon
  </Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-buttons" title="With Buttons">
          <Flex
            class="w-full component-preview"
            align="start"
            justify="start"
            gap="md"
          >
            <Alert class="shadow-lg">
              we use cookies for no reason.
              <div class="space-x-1">
                <Button size="sm">Deny</Button>
                <Button size="sm" flavor="primary">
                  Accept
                </Button>
              </div>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  we use cookies for no reason.
  <Button size="sm">Deny</Button>
  <Button size="sm" flavor="primary">Accept</Button>
</Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-title" title="With Title and Description">
          <Flex
            class="w-full component-preview"
            align="start"
            justify="start"
            gap="md"
          >
            <Alert class="shadow-lg">
              You have 1 unread message
              <Button size="sm">See</Button>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  You have 1 unread message
  <Button size="sm">See</Button>
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

export default AlertShowcase;
