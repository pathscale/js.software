import { Button, Flex, Toast } from "@pathscale/ui";
import { Component, createSignal, For, Show } from "solid-js";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

type AlertStatus = "default" | "accent" | "success" | "warning" | "danger";
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
      name: "variant",
      type: '"default" | "accent" | "success" | "warning" | "danger"',
      description: "Visual style/severity of the toast",
    },
    {
      name: "title",
      type: "JSX.Element",
      description: "Title content rendered when using the default body",
    },
    {
      name: "description",
      type: "JSX.Element",
      description: "Secondary description content",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Renders a close button and is invoked when it is clicked",
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
  ];

  const providerProps = [
    {
      name: "placement",
      type: '"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end"',
      default: '"bottom-end"',
      description: "Where toasts are rendered within the provider region",
    },
    {
      name: "maxVisibleToasts",
      type: "number",
      description: "Maximum number of toasts visible at once",
    },
    {
      name: "gap",
      type: "number",
      default: "12",
      description: "Pixel gap between stacked toasts",
    },
    {
      name: "width",
      type: "number | string",
      description: "Toast width (number is treated as px)",
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
  const statuses: AlertStatus[] = ["accent", "success", "warning", "danger"];

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
            <Show when={showDefault()}>
              <Toast.Provider>
                <Toast variant="accent" title="Default toast message." />
              </Toast.Provider>
            </Show>
            <CodeBlock
              code={`<Toast.Provider>
  <Toast variant="accent" title="Default toast message." />
</Toast.Provider>`}
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
            <Show when={showWithAlert()}>
              <Toast.Provider>
                <Toast variant="success" title="New message arrived." />
              </Toast.Provider>
            </Show>
            <CodeBlock
              code={`<Toast.Provider>
  <Toast variant="success" title="New message arrived." />
</Toast.Provider>`}
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
            <Show when={showMultiple()}>
              <Toast.Provider>
                <Toast variant="accent" title="New message arrived." />
                <Toast variant="success" title="Message sent successfully." />
                <Toast variant="warning" title="Connection unstable." />
              </Toast.Provider>
            </Show>
            <CodeBlock
              code={`<Toast.Provider>
  <Toast variant="accent" title="New message arrived." />
  <Toast variant="success" title="Message sent successfully." />
  <Toast variant="warning" title="Connection unstable." />
</Toast.Provider>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="dynamic" title="Dynamic Alerts">
          <Flex direction="col" gap="md">
            <Button onClick={addAlert}>Add Toast</Button>
            <Toast.Provider>
              <For each={alerts()}>
                {(alert, index) => (
                  <Toast
                    variant={alert.status}
                    title={alert.text}
                    onClose={() => removeAlert(index())}
                  />
                )}
              </For>
            </Toast.Provider>
            <CodeBlock
              code={`<Toast.Provider>
  <For each={alerts()}>
    {(alert, index) => (
      <Toast
        variant={alert.status}
        title={alert.text}
        onClose={() => removeAlert(index())}
      />
    )}
  </For>
</Toast.Provider>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="limited" title="Limited Dynamic Alerts">
          <Flex direction="col" gap="md">
            <Button onClick={addLimitedAlert}>Add Toast (Max 3)</Button>
            <Toast.Provider maxVisibleToasts={3}>
              <For each={limitedAlerts()}>
                {(alert, index) => (
                  <Toast
                    variant={alert.status}
                    title={alert.text}
                    onClose={() => removeLimitedAlert(index())}
                  />
                )}
              </For>
            </Toast.Provider>
            <CodeBlock
              code={`<Toast.Provider maxVisibleToasts={3}>
  <For each={limitedAlerts()}>
    {(alert, index) => (
      <Toast
        variant={alert.status}
        title={alert.text}
        onClose={() => removeLimitedAlert(index())}
      />
    )}
  </For>
</Toast.Provider>`}
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
            <Show when={showPositions()}>
              <Toast.Provider placement="top">
                <Toast variant="accent" title="Top" />
              </Toast.Provider>
              <Toast.Provider placement="bottom">
                <Toast variant="accent" title="Bottom" />
              </Toast.Provider>
              <Toast.Provider placement="top-start">
                <Toast variant="accent" title="Top-left" />
              </Toast.Provider>
              <Toast.Provider placement="top-end">
                <Toast variant="accent" title="Top-right" />
              </Toast.Provider>
              <Toast.Provider placement="bottom-start">
                <Toast variant="accent" title="Bottom-left" />
              </Toast.Provider>
              <Toast.Provider placement="bottom-end">
                <Toast variant="accent" title="Bottom-right" />
              </Toast.Provider>
            </Show>
            <CodeBlock
              code={`<Toast.Provider placement="top">
  <Toast variant="accent" title="Top" />
</Toast.Provider>
<Toast.Provider placement="bottom">
  <Toast variant="accent" title="Bottom" />
</Toast.Provider>
<Toast.Provider placement="top-start">
  <Toast variant="accent" title="Top-left" />
</Toast.Provider>
<Toast.Provider placement="top-end">
  <Toast variant="accent" title="Top-right" />
</Toast.Provider>
<Toast.Provider placement="bottom-start">
  <Toast variant="accent" title="Bottom-left" />
</Toast.Provider>
<Toast.Provider placement="bottom-end">
  <Toast variant="accent" title="Bottom-right" />
</Toast.Provider>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Toast</h3>
            <PropsTable props={toastProps} />

            <h3 class="text-lg font-semibold">Toast.Provider</h3>
            <PropsTable props={providerProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default ToastShowcase;
