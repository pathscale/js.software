import ShowcaseLayout from "./ShowcaseLayout";
import { Badge, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function BadgeShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "soft-style", title: "Soft Style" },
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
      type: '"sm" | "md" | "lg"',
      description: "Size of the badge",
    },
    {
      name: "color",
      type: '"default" | "accent" | "success" | "warning" | "danger"',
      description: "Color scheme of the badge",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "soft"',
      description: "Visual style variant of the badge",
    },
    {
      name: "placement",
      type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
      description: "Placement when used with BadgeAnchor",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
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
            <Flex align="start" justify="start">
              <Badge>Badge</Badge>
            </Flex>
            <CodeBlock code={`<Badge>Badge</Badge>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="start" gap="md" wrap="wrap">
              <Badge>default</Badge>
              <Badge color="accent">accent</Badge>
              <Badge color="success">success</Badge>
              <Badge color="warning">warning</Badge>
              <Badge color="danger">danger</Badge>
            </Flex>
            <CodeBlock
              code={`<Badge>default</Badge>
<Badge color="accent">accent</Badge>
<Badge color="success">success</Badge>
<Badge color="warning">warning</Badge>
<Badge color="danger">danger</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="soft-style" title="Soft Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Badge variant="soft">default</Badge>
              <Badge variant="soft" color="accent">
                accent
              </Badge>
              <Badge variant="soft" color="success">
                success
              </Badge>
              <Badge variant="soft" color="warning">
                warning
              </Badge>
              <Badge variant="soft" color="danger">
                danger
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge variant="soft">default</Badge>
<Badge variant="soft" color="accent">accent</Badge>
<Badge variant="soft" color="success">success</Badge>
<Badge variant="soft" color="warning">warning</Badge>
<Badge variant="soft" color="danger">danger</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Badge size="lg">987,654</Badge>
              <Badge size="md">987,654</Badge>
              <Badge size="sm">987,654</Badge>
            </Flex>
            <CodeBlock
              code={`<Badge size="lg">987,654</Badge>
<Badge size="md">987,654</Badge>
<Badge size="sm">987,654</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="empty" title="Empty Badges">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Badge size="lg" color="accent" />
              <Badge size="md" color="accent" />
              <Badge size="sm" color="accent" />
            </Flex>
            <CodeBlock
              code={`<Badge size="lg" color="accent" />
<Badge size="md" color="accent" />
<Badge size="sm" color="accent" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="state-colors" title="State Colors">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Badge color="accent" class="gap-2">
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
              <Badge color="danger" class="gap-2">
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
                danger
              </Badge>
            </Flex>
            <CodeBlock
              code={`<Badge color="accent" class="gap-2">
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
<Badge color="danger" class="gap-2">
  <svg>...</svg>
  danger
</Badge>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="badge-in-text" title="Badge in Text">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
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
</h4>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="badge-in-button" title="Badge in Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button>
                Inbox
                <Badge>+99</Badge>
              </Button>
              <Button>
                Inbox
                <Badge color="accent">+99</Badge>
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button>
  Inbox
  <Badge>+99</Badge>
</Button>
<Button>
  Inbox
  <Badge color="accent">+99</Badge>
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
