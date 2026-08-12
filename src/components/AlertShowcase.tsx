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
      name: "status",
      type: '"default" | "accent" | "success" | "warning" | "danger"',
      default: '"default"',
      description: "The status/color variant of the alert",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Compound children: Alert.Indicator, Alert.Content, Alert.Title, Alert.Description",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class)",
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
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>12 unread messages. Tap to see.</Alert.Description>
              </Alert.Content>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Description>12 unread messages. Tap to see.</Alert.Description>
  </Alert.Content>
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
            <Flex direction="col" gap="md" class="w-full">
              <Alert status="default">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Default status alert</Alert.Description>
                </Alert.Content>
              </Alert>
              <Alert status="accent">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Accent status alert</Alert.Description>
                </Alert.Content>
              </Alert>
              <Alert status="success">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Success status alert</Alert.Description>
                </Alert.Content>
              </Alert>
              <Alert status="warning">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Warning status alert</Alert.Description>
                </Alert.Content>
              </Alert>
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Danger status alert</Alert.Description>
                </Alert.Content>
              </Alert>
            </Flex>
          </Flex>
          <CodeBlock
            code={`<Alert status="success">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Description>Success status alert</Alert.Description>
  </Alert.Content>
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
            <Alert status="accent">
              <Alert.Indicator>
                <InfoIcon />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Description>Alert with a custom icon</Alert.Description>
              </Alert.Content>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert status="accent">
  <Alert.Indicator>
    <InfoIcon />
  </Alert.Indicator>
  <Alert.Content>
    <Alert.Description>Alert with a custom icon</Alert.Description>
  </Alert.Content>
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
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>we use cookies for no reason.</Alert.Description>
              </Alert.Content>
              <div class="space-x-1">
                <Button size="sm">Deny</Button>
                <Button size="sm" variant="primary">
                  Accept
                </Button>
              </div>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Description>we use cookies for no reason.</Alert.Description>
  </Alert.Content>
  <Button size="sm">Deny</Button>
  <Button size="sm" color="primary">Accept</Button>
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
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>New message!</Alert.Title>
                <Alert.Description>You have 1 unread message</Alert.Description>
              </Alert.Content>
              <Button size="sm">See</Button>
            </Alert>
          </Flex>
          <CodeBlock
            code={`<Alert>
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>New message!</Alert.Title>
    <Alert.Description>You have 1 unread message</Alert.Description>
  </Alert.Content>
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
