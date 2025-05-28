import { Component, createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Toast, Button, Alert } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

type AlertStatus = "info" | "success" | "warning" | "error";
type AlertItem = { text: string; status: AlertStatus };

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
      name: "position",
      type: '"top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
      default: '"bottom-right"',
      description: "Position of the toast container",
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

  // Dynamic alerts state
  const [alerts, setAlerts] = createSignal<AlertItem[]>([]);

  const [limitedAlerts, setLimitedAlerts] = createSignal<AlertItem[]>([]);

  const [alertCounter, setAlertCounter] = createSignal(0);
  const [limitedAlertCounter, setLimitedAlertCounter] = createSignal(0);

  const statuses: AlertStatus[] = ["info", "success", "warning", "error"];

  const addAlert = () => {
    const currentCounter = alertCounter();
    setAlertCounter(currentCounter + 1);

    setAlerts((prev) => [
      ...prev,
      {
        text: `Message #${currentCounter + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)]!,
      },
    ]);
  };

  const addLimitedAlert = () => {
    const currentCounter = limitedAlertCounter();
    setLimitedAlertCounter(currentCounter + 1);

    setLimitedAlerts((prev) => {
      const maxInMemory = 3;
      const newAlert: AlertItem = {
        text: `Limited message #${currentCounter + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)]!,
      };

      const newAlerts = [...prev, newAlert];

      if (newAlerts.length > maxInMemory) {
        return newAlerts.slice(-maxInMemory);
      }

      return newAlerts;
    });
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
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Toast>Default toast message.</Toast>
          </div>
          <CodeBlock code={`<Toast>Default toast message.</Toast>`} />
        </ShowcaseSection>

        <ShowcaseSection id="with-alert" title="With Alert">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Toast>
              <Alert status="info">
                <span>New message arrived.</span>
              </Alert>
            </Toast>
          </div>
          <CodeBlock
            code={`<Toast>
  <Alert status="info">
    <span>New message arrived.</span>
  </Alert>
</Toast>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="multiple" title="Multiple Alerts">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <Toast>
              <Alert status="info">New message arrived.</Alert>
              <Alert status="success">Message sent successfully.</Alert>
              <Alert status="warning">Connection unstable.</Alert>
            </Toast>
          </div>
          <CodeBlock
            code={`<Toast>
  <Alert status="info">New message arrived.</Alert>
  <Alert status="success">Message sent successfully.</Alert>
  <Alert status="warning">Connection unstable.</Alert>
</Toast>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="dynamic" title="Dynamic Alerts">
          <div class="flex w-full component-preview items-center justify-center gap-2 flex-col">
            <div class="flex gap-2 mb-4">
              <Button onClick={addAlert}>Add Toast</Button>
            </div>
            <Toast max={0}>
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
            </Toast>
          </div>
          <CodeBlock
            code={`const [alerts, setAlerts] = createSignal<AlertItem[]>([
  { text: "This is a custom alert!", status: "info" },
]);

const addAlert = () => {
  setAlerts(prev => [...prev, {
    text: \`Message #\${alerts().length + 1}\`,
    status: // random status
  }]);
};

const removeAlert = (index: number) => {
  setAlerts(prev => prev.filter((_, i) => i !== index));
};

return (
  <Toast max={0}>
    {alerts().map((alert, index) => (
      <Alert
        status={alert.status}
        class="flex justify-between gap-4"
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
)`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="limited" title="Limited Dynamic Alerts">
          <div class="flex w-full component-preview items-center justify-center gap-2 flex-col">
            <div class="flex gap-2 mb-4">
              <Button onClick={addLimitedAlert}>Add Toast (Max 3)</Button>
            </div>
            <Toast max={3}>
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
            </Toast>
          </div>
          <CodeBlock
            code={`<Toast max={3}>
  {limitedAlerts().map((alert, index) => (
    <Alert
      status={alert.status}
      class="flex justify-between gap-4"
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
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Positions">
          <div class="flex w-full component-preview items-center justify-center gap-2">
            <div class="w-full flex flex-col gap-2">
              <Toast position="top">
                <Alert status="info">Top position</Alert>
              </Toast>
              <Toast position="bottom">
                <Alert status="info">Bottom position</Alert>
              </Toast>
              <Toast position="top-left">
                <Alert status="info">Top-left position</Alert>
              </Toast>
              <Toast position="top-right">
                <Alert status="info">Top-right position</Alert>
              </Toast>
              <Toast position="bottom-left">
                <Alert status="info">Bottom-left position</Alert>
              </Toast>
              <Toast position="bottom-right">
                <Alert status="info">Bottom-right position</Alert>
              </Toast>
            </div>
          </div>
          <CodeBlock
            code={`<Toast position="top">
  <Alert status="info">Top position</Alert>
</Toast>
<Toast position="bottom">
  <Alert status="info">Bottom position</Alert>
</Toast>
<Toast position="top-left">
  <Alert status="info">Top-left position</Alert>
</Toast>
<Toast position="top-right">
  <Alert status="info">Top-right position</Alert>
</Toast>
<Toast position="bottom-left">
  <Alert status="info">Bottom-left position</Alert>
</Toast>
<Toast position="bottom-right">
  <Alert status="info">Bottom-right position</Alert>
</Toast>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toastProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default ToastShowcase;
