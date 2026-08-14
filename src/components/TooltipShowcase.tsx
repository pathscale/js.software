import ShowcaseLayout from "./ShowcaseLayout";
import { Tooltip, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TooltipShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "force-open", title: "Force Open" },
    { id: "placements", title: "Placements" },
    { id: "with-arrow", title: "With Arrow" },
    { id: "props", title: "Props" },
  ] as const;

  const tooltipProps = [
    {
      name: "placement",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "The preferred placement of the tooltip relative to its trigger",
    },
    {
      name: "autoFlip",
      type: "boolean",
      default: "true",
      description: "Whether to flip the tooltip placement if there is not enough space",
    },
    {
      name: "sideOffset",
      type: "number",
      default: "12",
      description: "Distance between the trigger and the tooltip content",
    },
    {
      name: "showArrow",
      type: "boolean",
      default: "false",
      description: "Whether to show the tooltip arrow",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay (ms) before the tooltip opens",
    },
    {
      name: "closeDelay",
      type: "number",
      default: "100",
      description: "Delay (ms) before the tooltip closes",
    },
    {
      name: "isOpen",
      type: "boolean",
      description: "Controlled open state",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Default open state when uncontrolled",
    },
    {
      name: "onOpenChange",
      type: "(isOpen: boolean) => void",
      description: "Callback fired when the open state changes",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
            <Flex align="start" justify="start" class="my-16">
              <Tooltip>
                <Tooltip.Trigger>
                  <Button>Hover me</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>hello</Tooltip.Content>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip>
  <Tooltip.Trigger>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>hello</Tooltip.Content>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="force-open" title="Force Open">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" class="my-16">
              <Tooltip open>
                <Tooltip.Trigger>
                  <Button>Always open</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>hello</Tooltip.Content>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip open>
  <Tooltip.Trigger>
    <Button>Always open</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>hello</Tooltip.Content>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="placements" title="Placements">
          <Flex direction="col" gap="md">
            <Flex gap="xl" align="start" justify="start" class="my-16">
              <Tooltip placement="top">
                <Tooltip.Trigger>
                  <Button size="sm">Top</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>top</Tooltip.Content>
              </Tooltip>
              <Tooltip placement="bottom">
                <Tooltip.Trigger>
                  <Button size="sm">Bottom</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>bottom</Tooltip.Content>
              </Tooltip>
              <Tooltip placement="left">
                <Tooltip.Trigger>
                  <Button size="sm">Left</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>left</Tooltip.Content>
              </Tooltip>
              <Tooltip placement="right">
                <Tooltip.Trigger>
                  <Button size="sm">Right</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>right</Tooltip.Content>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip placement="top">
  <Tooltip.Trigger>
    <Button size="sm">Top</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>top</Tooltip.Content>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-arrow" title="With Arrow">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" class="my-16">
              <Tooltip open showArrow placement="top">
                <Tooltip.Trigger>
                  <Button>Top with arrow</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Tip text
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
              <Tooltip open showArrow placement="bottom">
                <Tooltip.Trigger>
                  <Button>Bottom with arrow</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Tip text
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
            </Flex>
            <CodeBlock
              code={`<Tooltip open showArrow placement="top">
  <Tooltip.Trigger>
    <Button>Top with arrow</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tip text
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tooltipProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
