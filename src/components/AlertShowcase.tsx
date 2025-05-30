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
    { id: "variants", title: "Variants" },
    { id: "layout", title: "Layout" },
    { id: "with-buttons", title: "With Buttons" },
    { id: "with-title", title: "With Title and Description" },
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

  const SuccessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const WarningIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );

  const ErrorIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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
            align="left"
            justify="left"
            gap="md"
          >
            <Alert icon={<InfoIcon />}>
              <span>12 unread messages. Tap to see.</span>
            </Alert>
          </Flex>
          <CodeBlock code={`<Alert icon={<InfoIcon />}>…</Alert>`} />
        </ShowcaseSection>

        <ShowcaseSection id="status-colors" title="Status Colors">
          <Flex
            class="w-full component-preview"
            align="left"
            justify="left"
            gap="md"
          >
            <Flex direction="col" gap="md" class="w-full">
              <Alert status="info" icon={<InfoIcon />}>
                …
              </Alert>
              <Alert status="success" icon={<SuccessIcon />}>
                …
              </Alert>
              <Alert status="warning" icon={<WarningIcon />}>
                …
              </Alert>
              <Alert status="error" icon={<ErrorIcon />}>
                …
              </Alert>
            </Flex>
          </Flex>
          <CodeBlock
            code={`<Alert status="info" icon={<InfoIcon />}>…</Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex
            class="w-full component-preview"
            align="left"
            justify="left"
            gap="md"
          >
            <Flex direction="col" gap="md" class="w-full">
              <Alert status="info" variant="soft" class="w-full">
                …
              </Alert>
              <Alert status="success" variant="outline" class="w-full">
                …
              </Alert>
              <Alert status="warning" variant="dash" class="w-full">
                …
              </Alert>
              <Alert status="error" variant="soft" class="w-full">
                …
              </Alert>
            </Flex>
          </Flex>
          <CodeBlock code={`<Alert status="info" variant="soft">…</Alert>`} />
        </ShowcaseSection>

        <ShowcaseSection id="layout" title="Layout">
          <Flex
            class="w-full component-preview"
            align="left"
            justify="left"
            gap="md"
          >
            <Flex direction="col" gap="md">
              <Alert icon={<InfoIcon />} layout="horizontal">
                …
              </Alert>
              <Alert icon={<InfoIcon />} layout="vertical">
                …
              </Alert>
            </Flex>
          </Flex>
          <CodeBlock
            code={`<Alert layout="horizontal">…</Alert>
<Alert layout="vertical">…</Alert>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-buttons" title="With Buttons">
          <Flex
            class="w-full component-preview"
            align="left"
            justify="left"
            gap="md"
          >
            <Alert icon={<InfoIcon />} class="shadow-lg">
              <span>we use cookies for no reason.</span>
              <div class="space-x-1">
                <Button size="sm">Deny</Button>
                <Button size="sm" color="primary">
                  Accept
                </Button>
              </div>
            </Alert>
          </Flex>
          <CodeBlock code={`<Alert icon={<InfoIcon />}>…</Alert>`} />
        </ShowcaseSection>

        <ShowcaseSection id="with-title" title="With Title and Description">
          <Flex
            class="w-full component-preview"
            align="left"
            justify="left"
            gap="md"
          >
            <Alert icon={<InfoIcon />} class="shadow-lg">
              <div>
                <h3 class="font-bold">New message!</h3>
                <div class="text-xs">You have 1 unread message</div>
              </div>
              <Button size="sm">See</Button>
            </Alert>
          </Flex>
          <CodeBlock code={`<Alert icon={<InfoIcon />}>…</Alert>`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={alertProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default AlertShowcase;
