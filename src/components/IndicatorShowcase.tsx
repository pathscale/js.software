import { Indicator, Button, Badge, Flex } from "@pathscale/ui";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import ShowcaseLayout from "./ShowcaseLayout";

export default function IndicatorShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-badge", title: "With Badge" },
    { id: "with-button", title: "With Button" },
    { id: "positions", title: "Position Variants" },
    { id: "multiple", title: "Multiple Indicators" },
    { id: "props", title: "Props" },
  ];
  const props = [
    {
      name: "horizontal",
      type: `"start" | "center" | "end"`,
      description: "Horizontal alignment",
    },
    {
      name: "vertical",
      type: `"top" | "middle" | "bottom"`,
      description: "Vertical alignment",
    },
    { name: "class", type: "string", description: "Custom CSS classes" },
    { name: "className", type: "string", description: "Additional CSS classes (alias for class)" },
    { name: "style", type: "JSX.CSSProperties", description: "Inline styles to apply" },
    { name: "children", type: "JSX.Element", description: "Content to display inside the indicator" },
    { name: "dataTheme", type: "string", description: "Theme data attribute value" },
    { name: "as", type: "string", description: "Custom element tag" },
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
            <div class="p-8 inline-block">
              <Indicator>
                <Indicator.Item class="badge badge-secondary" />
                <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
                  content
                </div>
              </Indicator>
            </div>
            <CodeBlock
              code={`<Indicator>
  <Indicator.Item class="badge badge-secondary" />
  <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
    content
  </div>
</Indicator>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-badge" title="With Badge">
          <Flex direction="col" gap="md">
            <div class="p-8 inline-block">
              <Indicator>
                <Indicator.Item>
                  <Badge color="primary">New</Badge>
                </Indicator.Item>
                <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
                  content
                </div>
              </Indicator>
            </div>
            <CodeBlock
              code={`<Indicator>
  <Indicator.Item>
    <Badge color="primary">New</Badge>
  </Indicator.Item>
  <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
    content
  </div>
</Indicator>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-button" title="With Button">
          <Flex direction="col" gap="md">
            <div class="p-8 inline-block">
              <Indicator>
                <Indicator.Item>
                  <Badge color="secondary">99+</Badge>
                </Indicator.Item>
                <Button>Inbox</Button>
              </Indicator>
            </div>
            <CodeBlock
              code={`<Indicator>
  <Indicator.Item>
    <Badge color="secondary">99+</Badge>
  </Indicator.Item>
  <Button>Inbox</Button>
</Indicator>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="positions" title="Position Variants">
          <Flex direction="col" gap="md">
            <div class="p-8 inline-block">
              <Indicator>
                <Indicator.Item horizontal="start" vertical="top">
                  <Badge color="secondary">Top Start</Badge>
                </Indicator.Item>
                <Indicator.Item horizontal="end" vertical="middle">
                  <Badge color="primary">Middle End</Badge>
                </Indicator.Item>
                <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
                  content
                </div>
              </Indicator>
            </div>
            <CodeBlock
              code={`<Indicator>
  <Indicator.Item horizontal="start" vertical="top">
    <Badge color="secondary">Top Start</Badge>
  </Indicator.Item>
  <Indicator.Item horizontal="end" vertical="middle">
    <Badge color="primary">Middle End</Badge>
  </Indicator.Item>
  <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">
    content
  </div>
</Indicator>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="multiple" title="Multiple Indicators">
          <Flex direction="col" gap="md">
            <div class="p-8 inline-block">
              <Indicator>
                <Indicator.Item horizontal="start" vertical="top">
                  <Badge color="secondary">A</Badge>
                </Indicator.Item>
                <Indicator.Item horizontal="center" vertical="middle">
                  <Badge color="primary">B</Badge>
                </Indicator.Item>
                <Indicator.Item horizontal="end" vertical="bottom">
                  <Badge color="accent">C</Badge>
                </Indicator.Item>
                <div class="grid w-60 h-32 bg-base-300 place-items-center">
                  content
                </div>
              </Indicator>
            </div>
            <CodeBlock
              code={`<Indicator>
  <Indicator.Item horizontal="start" vertical="top">
    <Badge color="secondary">A</Badge>
  </Indicator.Item>
  <Indicator.Item horizontal="center" vertical="middle">
    <Badge color="primary">B</Badge>
  </Indicator.Item>
  <Indicator.Item horizontal="end" vertical="bottom">
    <Badge color="accent">C</Badge>
  </Indicator.Item>
  <div class="grid w-60 h-32 bg-base-300 place-items-center">
    content
  </div>
</Indicator>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
