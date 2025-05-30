import ShowcaseLayout from "./ShowcaseLayout";
import { Badge, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function BadgeShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "brand-colors", title: "Brand Colors" },
    { id: "soft-style", title: "Soft Style" },
    { id: "outline-style", title: "Outline Style" },
    { id: "dash-style", title: "Dash Style" },
    { id: "sizes", title: "Sizes" },
    { id: "empty", title: "Empty Badges" },
    { id: "state-colors", title: "State Colors" },
    { id: "badge-in-text", title: "Badge in Text" },
    { id: "badge-in-button", title: "Badge in Button" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the badge",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "ghost" | "info" | "success" | "warning" | "error"',
      description: "Color scheme of the badge",
    },
    {
      name: "variant",
      type: '"soft" | "outline" | "dash"',
      description: "Visual style variant of the badge",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description: "Whether the badge should be responsive",
    },
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
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
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
            <Flex align="left" justify="left">
              <Badge>Badge</Badge>
            </Flex>
            <CodeBlock code={`<Badge>Badge</Badge>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="brand-colors" title="Brand Colors">
          <Flex direction="col" gap="md">
            <Flex aligin="center" justify="left" gap="md">
              <Badge>default</Badge>
              <Badge color="neutral">neutral</Badge>
              <Badge color="primary">primary</Badge>
              <Badge color="secondary">secondary</Badge>
              <Badge color="accent">accent</Badge>
              <Badge color="ghost">ghost</Badge>
            </Flex>
            <CodeBlock
              code={`<Badge>default</Badge>
<Badge color="neutral">neutral</Badge>
<Badge color="primary">primary</Badge>
<Badge color="secondary">secondary</Badge>
<Badge color="accent">accent</Badge>
<Badge color="ghost">ghost</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="soft-style" title="Soft Style">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge variant="soft">default</Badge>
              <Badge variant="soft" color="primary">
                primary
              </Badge>
              <Badge variant="soft" color="secondary">
                secondary
              </Badge>
              <Badge variant="soft" color="accent">
                accent
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge variant="soft">default</Badge>
<Badge variant="soft" color="primary">primary</Badge>
<Badge variant="soft" color="secondary">secondary</Badge>
<Badge variant="soft" color="accent">accent</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outline-style" title="Outline Style">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge variant="outline">default</Badge>
              <Badge variant="outline" color="primary">
                primary
              </Badge>
              <Badge variant="outline" color="secondary">
                secondary
              </Badge>
              <Badge variant="outline" color="accent">
                accent
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge variant="outline">default</Badge>
<Badge variant="outline" color="primary">primary</Badge>
<Badge variant="outline" color="secondary">secondary</Badge>
<Badge variant="outline" color="accent">accent</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="dash-style" title="Dash Style">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge variant="dash">default</Badge>
              <Badge variant="dash" color="primary">
                primary
              </Badge>
              <Badge variant="dash" color="secondary">
                secondary
              </Badge>
              <Badge variant="dash" color="accent">
                accent
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge variant="dash">default</Badge>
<Badge variant="dash" color="primary">primary</Badge>
<Badge variant="dash" color="secondary">secondary</Badge>
<Badge variant="dash" color="accent">accent</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge size="lg">987,654</Badge>
              <Badge size="md">987,654</Badge>
              <Badge size="sm">987,654</Badge>
              <Badge size="xs">987,654</Badge>
            </Flex>
            <CodeBlock
              code={`<Badge size="lg">987,654</Badge>
<Badge size="md">987,654</Badge>
<Badge size="sm">987,654</Badge>
<Badge size="xs">987,654</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="empty" title="Empty Badges">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge size="lg" color="primary" />
              <Badge size="md" color="primary" />
              <Badge size="sm" color="primary" />
              <Badge size="xs" color="primary" />
            </Flex>
            <CodeBlock
              code={`<Badge size="lg" color="primary" />
<Badge size="md" color="primary" />
<Badge size="sm" color="primary" />
<Badge size="xs" color="primary" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="state-colors" title="State Colors">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Badge color="info" class="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                info
              </Badge>
              <Badge color="success" class="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                success
              </Badge>
              <Badge color="warning" class="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                warning
              </Badge>
              <Badge color="error" class="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                error
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge color="info" class="gap-2">
  <svg>...</svg>
  info
</Badge>
<Badge color="success" class="gap-2">
  <svg>...</svg>
  success
</Badge>
<Badge color="warning" class="gap-2">
  <svg>...</svg>
  warning
</Badge>
<Badge color="error" class="gap-2">
  <svg>...</svg>
  error
</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="badge-in-text" title="Badge in Text">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <h2 class="text-xl">
                Heading
                <Badge size="lg">NEW</Badge>
              </h2>
              <h3 class="text-xl">
                Heading
                <Badge size="md">NEW</Badge>
              </h3>
              <h4 class="text-base">
                Heading
                <Badge size="sm">NEW</Badge>
              </h4>
              <h5 class="text-sm">
                Heading
                <Badge size="xs">NEW</Badge>
              </h5>
            </Flex>
            <CodeBlock
              code={`<h2 class="text-xl">
  Heading
  <Badge size="lg">NEW</Badge>
</h2>
<h3 class="text-xl">
  Heading
  <Badge size="md">NEW</Badge>
</h3>
<h4 class="text-base">
  Heading
  <Badge size="sm">NEW</Badge>
</h4>
<h5 class="text-sm">
  Heading
  <Badge size="xs">NEW</Badge>
</h5>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="badge-in-button" title="Badge in Button">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Button>
                Inbox
                <Badge>+99</Badge>
              </Button>
              <Button>
                Inbox
                <Badge color="secondary">+99</Badge>
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button>
  Inbox
  <Badge>+99</Badge>
</Button>
<Button>
  Inbox
  <Badge color="secondary">+99</Badge>
</Button>`}
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
