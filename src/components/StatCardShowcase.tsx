import ShowcaseLayout from "./ShowcaseLayout";
import { StatCard, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function StatCardShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "with-actions", title: "With Actions" },
    { id: "copyable-value", title: "Copyable Value" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const subComponentProps = [
    {
      name: "StatCard.Figure",
      type: "JSX.HTMLAttributes<HTMLDivElement> & { copyable?: boolean }",
      description: "Container for an icon or figure displayed in the stat card",
    },
    {
      name: "StatCard.Title",
      type: "JSX.HTMLAttributes<HTMLDivElement> & { copyable?: boolean }",
      description: "Title/label for the stat",
    },
    {
      name: "StatCard.Value",
      type: "JSX.HTMLAttributes<HTMLDivElement> & { copyable?: boolean }",
      description: "The main value display of the stat",
    },
    {
      name: "StatCard.Desc",
      type: "JSX.HTMLAttributes<HTMLDivElement> & { copyable?: boolean }",
      description: "Description or secondary text below the value",
    },
    {
      name: "StatCard.Actions",
      type: "JSX.HTMLAttributes<HTMLDivElement> & { copyable?: boolean }",
      description: "Container for action buttons or links",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <StatCard>
                <StatCard.Figure>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </StatCard.Figure>
                <StatCard.Title>Total Page Views</StatCard.Title>
                <StatCard.Value>31,256</StatCard.Value>
                <StatCard.Desc>21% more than last month</StatCard.Desc>
              </StatCard>
              <StatCard>
                <StatCard.Title>Downloads</StatCard.Title>
                <StatCard.Value>4,200</StatCard.Value>
                <StatCard.Desc>Jan 1st - Feb 1st</StatCard.Desc>
              </StatCard>
            </Flex>
            <CodeBlock
              code={`<StatCard>
  <StatCard.Figure>
    <svg>...</svg>
  </StatCard.Figure>
  <StatCard.Title>Total Page Views</StatCard.Title>
  <StatCard.Value>31,256</StatCard.Value>
  <StatCard.Desc>21% more than last month</StatCard.Desc>
</StatCard>

<StatCard>
  <StatCard.Title>Downloads</StatCard.Title>
  <StatCard.Value>4,200</StatCard.Value>
  <StatCard.Desc>Jan 1st - Feb 1st</StatCard.Desc>
</StatCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-actions" title="With Actions">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <StatCard>
                <StatCard.Title>Account Balance</StatCard.Title>
                <StatCard.Value>$25,600</StatCard.Value>
                <StatCard.Desc>Current balance</StatCard.Desc>
                <StatCard.Actions>
                  <Button size="sm" color="primary">Withdraw</Button>
                  <Button size="sm" color="ghost">Details</Button>
                </StatCard.Actions>
              </StatCard>
            </Flex>
            <CodeBlock
              code={`<StatCard>
  <StatCard.Title>Account Balance</StatCard.Title>
  <StatCard.Value>$25,600</StatCard.Value>
  <StatCard.Desc>Current balance</StatCard.Desc>
  <StatCard.Actions>
    <Button size="sm" color="primary">Withdraw</Button>
    <Button size="sm" color="ghost">Details</Button>
  </StatCard.Actions>
</StatCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="copyable-value" title="Copyable Value">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <StatCard>
                <StatCard.Title>API Key</StatCard.Title>
                <StatCard.Value copyable>sk-abc123xyz</StatCard.Value>
                <StatCard.Desc copyable>Click value to copy</StatCard.Desc>
              </StatCard>
              <StatCard>
                <StatCard.Title copyable>Transaction ID</StatCard.Title>
                <StatCard.Value copyable>TXN-987654</StatCard.Value>
                <StatCard.Desc>Completed</StatCard.Desc>
              </StatCard>
            </Flex>
            <CodeBlock
              code={`<StatCard>
  <StatCard.Title>API Key</StatCard.Title>
  <StatCard.Value copyable>sk-abc123xyz</StatCard.Value>
  <StatCard.Desc copyable>Click value to copy</StatCard.Desc>
</StatCard>

<StatCard>
  <StatCard.Title copyable>Transaction ID</StatCard.Title>
  <StatCard.Value copyable>TXN-987654</StatCard.Value>
  <StatCard.Desc>Completed</StatCard.Desc>
</StatCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-semibold mb-2">StatCard</h3>
          <PropsTable props={props} />
          <h3 class="text-lg font-semibold mt-6 mb-2">Sub-components</h3>
          <PropsTable props={subComponentProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
