import { Button, Card, Flex } from "@pathscale/ui";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

export default function CardShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "image-overlay", title: "Image Overlay" },
    { id: "side-image", title: "Side Image" },
    { id: "bordered", title: "Bordered" },
    { id: "compact", title: "Compact" },
    { id: "backgrounds", title: "Backgrounds" },
    { id: "shadows", title: "Shadows" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const cardProps = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the card",
    },
    {
      name: "border",
      type: "boolean",
      default: "false",
      description: "Whether to show a border",
    },
    {
      name: "variant",
      type: '"dash" | "outline" | "border"',
      description: "Visual variant of the card",
    },
    {
      name: "imageFull",
      type: "boolean",
      default: "false",
      description: "Whether the image should take full height",
    },
    {
      name: "side",
      type: "ComponentSize | boolean",
      description:
        "Whether to show content side by side and at what breakpoint",
    },
    {
      name: "background",
      type: '"primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "base-100" | "base-200" | "base-300"',
      description: "Background color of the card",
    },
    {
      name: "shadow",
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      description: "Shadow size of the card",
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      description: "Make card take full width of container",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
      name: "aria-label",
      type: "string",
      description: "Accessibility label",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element that describes the card",
    },
    {
      name: "aria-labelledby",
      type: "string",
      description: "ID of element that labels the card",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role attribute",
    },
  ];

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
            <Card>
              <Card.Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
              <Card.Body class="items-center text-center">
                <Card.Title tag="h2">Shoes!</Card.Title>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Card.Actions class="justify-end">
                  <Button color="primary">Buy Now</Button>
                </Card.Actions>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card>
  <Card.Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
  />
  <Card.Body class="items-center text-center">
    <Card.Title tag="h2">Shoes!</Card.Title>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Card.Actions class="justify-end">
      <Button color="primary">Buy Now</Button>
    </Card.Actions>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="image-overlay" title="Image Overlay">
          <Flex direction="col" gap="md">
            <Card imageFull>
              <Card.Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
              <Card.Body>
                <Card.Title tag="h2">Shoes!</Card.Title>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Card.Actions class="justify-end">
                  <Button color="primary">Buy Now</Button>
                </Card.Actions>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card imageFull>
  <Card.Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
  />
  <Card.Body>
    <Card.Title tag="h2">Shoes!</Card.Title>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Card.Actions class="justify-end">
      <Button color="primary">Buy Now</Button>
    </Card.Actions>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="side-image" title="Side Image">
          <Flex direction="col" gap="md">
            <Card side>
              <Card.Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                class="w-full max-w-sm"
              />
              <Card.Body>
                <Card.Title tag="h2">Shoes!</Card.Title>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Card.Actions class="justify-end">
                  <Button color="primary">Buy Now</Button>
                </Card.Actions>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card side>
  <Card.Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    class="w-full max-w-sm"
  />
  <Card.Body>
    <Card.Title tag="h2">Shoes!</Card.Title>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Card.Actions class="justify-end">
      <Button color="primary">Buy Now</Button>
    </Card.Actions>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="bordered" title="Bordered">
          <Flex direction="col" gap="md">
            <Card variant="border">
              <Card.Body>
                <Card.Title tag="h2">Bordered Card</Card.Title>
                <p>A card with a border around it</p>
                <Card.Actions class="justify-end">
                  <Button color="primary">Action</Button>
                </Card.Actions>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card variant="border">
  <Card.Body>
    <Card.Title tag="h2">Bordered Card</Card.Title>
    <p>A card with a border around it</p>
    <Card.Actions class="justify-end">
      <Button color="primary">Action</Button>
    </Card.Actions>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="compact" title="Compact">
          <Flex direction="col" gap="md">
            <Card size="sm">
              <Card.Body>
                <Card.Title tag="h2">Compact Card</Card.Title>
                <p>A smaller, more compact card</p>
                <Card.Actions class="justify-end">
                  <Button color="primary" size="sm">
                    Action
                  </Button>
                </Card.Actions>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card size="sm">
  <Card.Body>
    <Card.Title tag="h2">Compact Card</Card.Title>
    <p>A smaller, more compact card</p>
    <Card.Actions class="justify-end">
      <Button color="primary" size="sm">Action</Button>
    </Card.Actions>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="backgrounds" title="Backgrounds">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Card background="primary">
                <Card.Body>
                  <Card.Title tag="h2">Primary Background</Card.Title>
                  <p>Card with primary background color</p>
                </Card.Body>
              </Card>
              <Card background="secondary">
                <Card.Body>
                  <Card.Title tag="h2">Secondary Background</Card.Title>
                  <p>Card with secondary background color</p>
                </Card.Body>
              </Card>
              <Card background="base-200">
                <Card.Body>
                  <Card.Title tag="h2">Base-200 Background</Card.Title>
                  <p>Card with base-200 background color</p>
                </Card.Body>
              </Card>
            </Flex>
            <CodeBlock
              code={`<Card background="primary">
  <Card.Body>
    <Card.Title tag="h2">Primary Background</Card.Title>
    <p>Card with primary background color</p>
  </Card.Body>
</Card>

<Card background="secondary">
  <Card.Body>
    <Card.Title tag="h2">Secondary Background</Card.Title>
    <p>Card with secondary background color</p>
  </Card.Body>
</Card>

<Card background="base-200">
  <Card.Body>
    <Card.Title tag="h2">Base-200 Background</Card.Title>
    <p>Card with base-200 background color</p>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="shadows" title="Shadows">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Card shadow="sm">
                <Card.Body>
                  <Card.Title tag="h2">Small Shadow</Card.Title>
                  <p>Card with small shadow</p>
                </Card.Body>
              </Card>
              <Card shadow="lg">
                <Card.Body>
                  <Card.Title tag="h2">Large Shadow</Card.Title>
                  <p>Card with large shadow</p>
                </Card.Body>
              </Card>
              <Card shadow="xl">
                <Card.Body>
                  <Card.Title tag="h2">Extra Large Shadow</Card.Title>
                  <p>Card with extra large shadow</p>
                </Card.Body>
              </Card>
            </Flex>
            <CodeBlock
              code={`<Card shadow="sm">
  <Card.Body>
    <Card.Title tag="h2">Small Shadow</Card.Title>
    <p>Card with small shadow</p>
  </Card.Body>
</Card>

<Card shadow="lg">
  <Card.Body>
    <Card.Title tag="h2">Large Shadow</Card.Title>
    <p>Card with large shadow</p>
  </Card.Body>
</Card>

<Card shadow="xl">
  <Card.Body>
    <Card.Title tag="h2">Extra Large Shadow</Card.Title>
    <p>Card with extra large shadow</p>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Card size="xs">
                <Card.Body>
                  <Card.Title tag="h2">XS Card</Card.Title>
                  <p>Extra small card</p>
                </Card.Body>
              </Card>
              <Card size="sm">
                <Card.Body>
                  <Card.Title tag="h2">Small Card</Card.Title>
                  <p>Small card</p>
                </Card.Body>
              </Card>
              <Card size="lg">
                <Card.Body>
                  <Card.Title tag="h2">Large Card</Card.Title>
                  <p>Large card with more padding</p>
                </Card.Body>
              </Card>
            </Flex>
            <CodeBlock
              code={`<Card size="xs">
  <Card.Body>
    <Card.Title tag="h2">XS Card</Card.Title>
    <p>Extra small card</p>
  </Card.Body>
</Card>

<Card size="sm">
  <Card.Body>
    <Card.Title tag="h2">Small Card</Card.Title>
    <p>Small card</p>
  </Card.Body>
</Card>

<Card size="lg">
  <Card.Body>
    <Card.Title tag="h2">Large Card</Card.Title>
    <p>Large card with more padding</p>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={cardProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
