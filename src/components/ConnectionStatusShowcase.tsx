import ShowcaseLayout from "./ShowcaseLayout";
import { ConnectionStatus, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ConnectionStatusShowcase() {
  const sections = [
    { id: "default", title: "Default (All States)" },
    { id: "reconnect", title: "With Reconnect Callback" },
    { id: "custom-labels", title: "Custom Labels" },
    { id: "props", title: "Props" },
  ] as const;

  const connectionStatusProps = [
    {
      name: "state",
      type: '"connecting" | "connected" | "disconnected" | "error"',
      description: "Current connection state",
      required: true,
    },
    {
      name: "errorMessage",
      type: "string",
      description: 'Error message to display when state is "error"',
    },
    {
      name: "serviceName",
      type: "string",
      description: "Service name to display",
    },
    {
      name: "url",
      type: "string",
      description: "URL to display",
    },
    {
      name: "isCustomUrl",
      type: "boolean",
      description: "Whether the URL is custom (will be indicated in the tooltip)",
    },
    {
      name: "showDetails",
      type: "boolean",
      description: "Whether to show detailed information",
    },
    {
      name: "showUrl",
      type: "boolean",
      description: "Whether to show the URL",
    },
    {
      name: "showReconnectButton",
      type: "boolean",
      description: "Whether to show the reconnect button when disconnected or error",
    },
    {
      name: "onReconnect",
      type: "() => void | Promise<void>",
      description: "Callback when reconnect button is clicked",
    },
    {
      name: "class",
      type: "string",
      description: "Custom class name",
    },
    {
      name: "className",
      type: "string",
      description: "Custom class name (alias)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Custom style",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Data theme",
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
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default (All States)">
          <Flex direction="col" gap="md">
            <div class="border border-base-300 rounded-lg p-4 space-y-4">
              <ConnectionStatus state="connected" serviceName="API Server" />
              <ConnectionStatus state="connecting" serviceName="API Server" />
              <ConnectionStatus state="disconnected" serviceName="API Server" />
              <ConnectionStatus
                state="error"
                serviceName="API Server"
                errorMessage="Connection refused"
              />
            </div>
            <CodeBlock
              code={`<ConnectionStatus state="connected" serviceName="API Server" />
<ConnectionStatus state="connecting" serviceName="API Server" />
<ConnectionStatus state="disconnected" serviceName="API Server" />
<ConnectionStatus
  state="error"
  serviceName="API Server"
  errorMessage="Connection refused"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="reconnect" title="With Reconnect Callback">
          <Flex direction="col" gap="md">
            <div class="border border-base-300 rounded-lg p-4 space-y-4">
              <ConnectionStatus
                state="disconnected"
                serviceName="WebSocket"
                url="wss://api.example.com/ws"
                showUrl
                showDetails
                showReconnectButton
                onReconnect={() => alert("Reconnecting...")}
              />
              <ConnectionStatus
                state="error"
                serviceName="WebSocket"
                url="wss://api.example.com/ws"
                showUrl
                showDetails
                showReconnectButton
                errorMessage="Timeout after 30s"
                onReconnect={() => alert("Reconnecting...")}
              />
            </div>
            <CodeBlock
              code={`<ConnectionStatus
  state="disconnected"
  serviceName="WebSocket"
  url="wss://api.example.com/ws"
  showUrl
  showDetails
  showReconnectButton
  onReconnect={() => alert("Reconnecting...")}
/>
<ConnectionStatus
  state="error"
  serviceName="WebSocket"
  url="wss://api.example.com/ws"
  showUrl
  showDetails
  showReconnectButton
  errorMessage="Timeout after 30s"
  onReconnect={() => alert("Reconnecting...")}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-labels" title="Custom Labels">
          <Flex direction="col" gap="md">
            <div class="border border-base-300 rounded-lg p-4 space-y-4">
              <ConnectionStatus
                state="connected"
                serviceName="Database"
                url="postgres://db.internal:5432"
                showUrl
                showDetails
                isCustomUrl
              />
              <ConnectionStatus
                state="connecting"
                serviceName="Redis Cache"
                url="redis://cache.internal:6379"
                showUrl
                showDetails
              />
            </div>
            <CodeBlock
              code={`<ConnectionStatus
  state="connected"
  serviceName="Database"
  url="postgres://db.internal:5432"
  showUrl
  showDetails
  isCustomUrl
/>
<ConnectionStatus
  state="connecting"
  serviceName="Redis Cache"
  url="redis://cache.internal:6379"
  showUrl
  showDetails
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={connectionStatusProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
