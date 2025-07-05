import { Alert, Button, Flex, Toast } from "@pathscale/ui";
import { Component, createSignal } from "solid-js";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

type AlertStatus = "info" | "success" | "warning" | "error";
type AlertItem = { text: string; status: AlertStatus; };

const ToastShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "with-alert", title: "With Alert" },
    { id: "multiple", title: "Multiple Alerts" },
    { id: "dynamic", title: "Dynamic Alerts" },
    { id: "limited", title: "Limited Dynamic Alerts" },
    { id: "positions", title: "Positions" },
    { id: "props", title: "Props" },
  ] as const;

  const toastProps = [
    {
      name: "max",
      type: "number",
      default: "0",
      description: "Maximum number of toasts to show (0 for unlimited)",
    },
    {
      name: "horizontal",
      type: '"start" | "center" | "end"',
      description: "Horizontal position of the toast container",
    },
    {
      name: "vertical", 
      type: '"top" | "middle" | "bottom"',
      description: "Vertical position of the toast container",
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

  const [showDefault, setShowDefault] = createSignal(false);
  const [showWithAlert, setShowWithAlert] = createSignal(false);
  const [showMultiple, setShowMultiple] = createSignal(false);
  const [showPositions, setShowPositions] = createSignal(false);

  const [alerts, setAlerts] = createSignal<AlertItem[]>([]);
  const [limitedAlerts, setLimitedAlerts] = createSignal<AlertItem[]>([]);
  const [alertCounter, setAlertCounter] = createSignal(0);
  const [limitedAlertCounter, setLimitedAlertCounter] = createSignal(0);
  const statuses: AlertStatus[] = ["info", "success", "warning", "error"];

  const addAlert = () => {
    const counter = alertCounter();
    setAlertCounter(counter + 1);
    const newAlert = {
      text: `Message #${counter + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]!,
    };
    setAlerts((prev) => [...prev, newAlert]);
    setTimeout(() => removeAlert(0), 4000);
  };

  const addLimitedAlert = () => {
    const counter = limitedAlertCounter();
    setLimitedAlertCounter(counter + 1);
    const newAlert = {
      text: `Limited message #${counter + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]!,
    };
    setLimitedAlerts((prev) => {
      const next = [...prev, newAlert].slice(-3);
      return next;
    });
    setTimeout(() => removeLimitedAlert(0), 4000);
  };

  const removeAlert = (index: number) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  const removeLimitedAlert = (index: number) => {
    setLimitedAlerts((prev) => prev.filter((_, i) => i !== index));
  };

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
            <Button
              onClick={() => {
                setShowDefault(true);
                setTimeout(() => setShowDefault(false), 4000);
              }}
            >
              Show Default Toast
            </Button>
            {showDefault() && (
              <Toast>
                <Alert status="info">Default toast message.</Alert>
              </Toast>
            )}
            <CodeBlock
              code={`<Toast>\n  <Alert status="info">Default toast message.</Alert>\n</Toast>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-alert" title="With Alert">
          <Flex direction="col" gap="md">
            <Button
              onClick={() => {
                setShowWithAlert(true);
                setTimeout(() => setShowWithAlert(false), 4000);
              }}
            >
              Show Toast with Alert
            </Button>
            {showWithAlert() && (
              <Toast>
                <Alert status="success">
                  <span>New message arrived.</span>
                </Alert>
              </Toast>
            )}
            <CodeBlock
              code={`<Toast>\n  <Alert status="success">\n    <span>New message arrived.</span>\n  </Alert>\n</Toast>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="multiple" title="Multiple Alerts">
          <Flex direction="col" gap="md">
            <Button
              onClick={() => {
                setShowMultiple(true);
                setTimeout(() => setShowMultiple(false), 4000);
              }}
            >
              Show Multiple Alerts
            </Button>
            {showMultiple() && (
              <Toast>
                <Alert status="info">New message arrived.</Alert>
                <Alert status="success">Message sent successfully.</Alert>
                <Alert status="warning">Connection unstable.</Alert>
              </Toast>
            )}
            <CodeBlock
              code={`<Toast>\n  <Alert status="info">New message arrived.</Alert>\n  <Alert status="success">Message sent successfully.</Alert>\n  <Alert status="warning">Connection unstable.</Alert>\n</Toast>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="dynamic" title="Dynamic Alerts">
          <Flex direction="col" gap="md">
            <Button onClick={addAlert}>Add Toast</Button>
            <Toast>
              {alerts().map((alert, index) => (
                <Alert
                  status={alert.status}
                  class="flex justify-between gap-4"
                  style={{ "min-width": "16rem" }}
                >
                  <span>{alert.text}</span>
                  <Button
                    size="sm"
                    color="ghost"
                    onClick={() => removeAlert(index)}
                  >
                    ✕
                  </Button>
                </Alert>
              ))}
            </Toast>
            <CodeBlock
              code={`<Toast>
  {alerts().map((alert, index) => (
    <Alert
      status={alert.status}
      class="flex justify-between gap-4"
      style="min-width: 16rem;"
    >
      <span>{alert.text}</span>
      <Button
        size="sm"
        color="ghost"
        onClick={() => removeAlert(index)}
      >
        ✕
      </Button>
    </Alert>
  ))}
</Toast>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="limited" title="Limited Dynamic Alerts">
          <Flex direction="col" gap="md">
            <Button onClick={addLimitedAlert}>Add Toast (Max 3)</Button>
            <Toast max={3}>
              {limitedAlerts().map((alert, index) => (
                <Alert
                  status={alert.status}
                  class="flex justify-between gap-4"
                  style={{ "min-width": "16rem" }}
                >
                  <span>{alert.text}</span>
                  <Button
                    size="sm"
                    color="ghost"
                    onClick={() => removeLimitedAlert(index)}
                  >
                    ✕
                  </Button>
                </Alert>
              ))}
            </Toast>
            <CodeBlock
              code={`<Toast max={3}>
{limitedAlerts().map((alert, index) => (
  <Alert
    status={alert.status}
    class="flex justify-between gap-4"
    style="min-width: 16rem;"
  >
    <span>{alert.text}</span>
    <Button
      size="sm"
      color="ghost"
      onClick={() => removeLimitedAlert(index)}
    >
      ✕
    </Button>
  </Alert>
))}
</Toast>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Positions">
          <Flex direction="col" gap="md">
            <Button
              onClick={() => {
                setShowPositions(true);
                setTimeout(() => setShowPositions(false), 4000);
              }}
            >
              Show Toast in All Positions
            </Button>
            {showPositions() && (
              <>
                <Toast vertical="top">
                  <Alert status="info">Top</Alert>
                </Toast>
                <Toast vertical="bottom">
                  <Alert status="info">Bottom</Alert>
                </Toast>
                <Toast vertical="top" horizontal="start">
                  <Alert status="info">Top-left</Alert>
                </Toast>
                <Toast vertical="top" horizontal="end">
                  <Alert status="info">Top-right</Alert>
                </Toast>
                <Toast vertical="bottom" horizontal="start">
                  <Alert status="info">Bottom-left</Alert>
                </Toast>
                <Toast vertical="bottom" horizontal="end">
                  <Alert status="info">Bottom-right</Alert>
                </Toast>
              </>
            )}
            <CodeBlock
              code={`<div>
  <Toast vertical="top">
    <Alert status="info">Top</Alert>
  </Toast>
  <Toast vertical="bottom">
    <Alert status="info">Bottom</Alert>
  </Toast>
  <Toast vertical="top" horizontal="start">
    <Alert status="info">Top-left</Alert>
  </Toast>
  <Toast vertical="top" horizontal="end">
    <Alert status="info">Top-right</Alert>
  </Toast>
  <Toast vertical="bottom" horizontal="start">
    <Alert status="info">Bottom-left</Alert>
  </Toast>
  <Toast vertical="bottom" horizontal="end">
    <Alert status="info">Bottom-right</Alert>
  </Toast>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toastProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default ToastShowcase;
