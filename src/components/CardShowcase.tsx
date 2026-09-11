import { Button, Card, Flex } from "@pathscale/ui";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

export default function CardShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-header-footer", title: "Header & Footer" },
    { id: "with-image", title: "With Image" },
    { id: "variants", title: "Variants" },
    { id: "hoverable", title: "Hoverable" },
    { id: "pressable", title: "Pressable" },
    { id: "props", title: "Props" },
  ] as const;

  const cardProps = [
    {
      name: "variant",
      type: '"solid" | "soft" | "outline" | "ghost" | "plain"',
      default: '"plain"',
      // The old scale conflated three things. `bordered` is variant outline,
      // `shadow` is an elevation, `flat` is variant plain.
      description: "Fill treatment. Shared vocabulary, same values on every component.",
    },
    {
      name: "material",
      type: '"solid" | "glass"',
      default: '"solid"',
      description: "What the surface is made of. Absorbs the old GlassPanel.",
    },
    {
      name: "elevation",
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      default: '"none"',
      description: "How far off the page it sits. Was the separate shadow prop.",
    },
    {
      name: "isInteractive",
      type: "boolean",
      default: "false",
      description: "Button role, tab stop and keyboard activation. Replaces isHoverable and isPressable, which were one call site each across 330.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
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
      description: "ARIA role attribute (defaults to 'button' when an onClick handler is provided)",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Card>
              <Card.Body>
                <h2 class="text-lg font-semibold">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Flex justify="end" class="mt-4">
                  <Button flavor="primary">Buy Now</Button>
                </Flex>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card>
  <Card.Body>
    <h2 class="text-lg font-semibold">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Flex justify="end" class="mt-4">
      <Button flavor="primary">Buy Now</Button>
    </Flex>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-header-footer" title="Header & Footer">
          <Flex direction="col" gap="md">
            <Card variant="outline">
              <Card.Header>
                <h2 class="text-lg font-semibold">Card Title</h2>
              </Card.Header>
              <Card.Body>
                <p>This card uses Header, Body, and Footer slots.</p>
              </Card.Body>
              <Card.Footer>
                <Flex justify="end" gap="sm">
                  <Button variant="ghost">Cancel</Button>
                  <Button flavor="primary">Confirm</Button>
                </Flex>
              </Card.Footer>
            </Card>
            <CodeBlock
              code={`<Card variant="outline">
  <Card.Header>
    <h2 class="text-lg font-semibold">Card Title</h2>
  </Card.Header>
  <Card.Body>
    <p>This card uses Header, Body, and Footer slots.</p>
  </Card.Body>
  <Card.Footer>
    <Flex justify="end" gap="sm">
      <Button variant="ghost">Cancel</Button>
      <Button flavor="primary">Confirm</Button>
    </Flex>
  </Card.Footer>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-image" title="With Image">
          <Flex direction="col" gap="md">
            <Card class="overflow-hidden">
              <img
                src="https://i.pravatar.cc/96"
                alt="Shoes"
                class="w-full h-48 object-cover"
              />
              <Card.Body>
                <h2 class="text-lg font-semibold">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Flex justify="end" class="mt-4">
                  <Button flavor="primary">Buy Now</Button>
                </Flex>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card class="overflow-hidden">
  <img
    src="https://i.pravatar.cc/96"
    alt="Shoes"
    class="w-full h-48 object-cover"
  />
  <Card.Body>
    <h2 class="text-lg font-semibold">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Flex justify="end" class="mt-4">
      <Button flavor="primary">Buy Now</Button>
    </Flex>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Card variant="solid">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Default</h2>
                  <p>Default card variant</p>
                </Card.Body>
              </Card>
              <Card variant="soft">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Flat</h2>
                  <p>Flat card with no elevation</p>
                </Card.Body>
              </Card>
              <Card variant="outline">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Bordered</h2>
                  <p>Card with a border around it</p>
                </Card.Body>
              </Card>
              <Card elevation="lg">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Shadow</h2>
                  <p>Card with an elevated shadow</p>
                </Card.Body>
              </Card>
            </Flex>
            <CodeBlock
              code={`<Card variant="solid">...</Card>
<Card variant="soft">...</Card>
<Card variant="outline">...</Card>
<Card elevation="lg">...</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hoverable" title="Hoverable">
          <Flex direction="col" gap="md">
            <Card isInteractive role="article" aria-label="Hover me">
              <Card.Body>
                <h2 class="text-lg font-semibold">Hover me</h2>
                <p>Hover state adds an interactive treatment.</p>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card isInteractive role="article" aria-label="Hover me">
  <Card.Body>
    <h2 class="text-lg font-semibold">Hover me</h2>
    <p>Hover state adds an interactive treatment.</p>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="pressable" title="Pressable">
          <Flex direction="col" gap="md">
            <Card
              isInteractive
              onClick={() => console.log("card pressed")}
            >
              <Card.Body>
                <h2 class="text-lg font-semibold">Press me</h2>
                <p>Acts like a button; Enter/Space activates.</p>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card
  isInteractive
  onClick={() => console.log("card pressed")}
>
  <Card.Body>
    <h2 class="text-lg font-semibold">Press me</h2>
    <p>Acts like a button; Enter/Space activates.</p>
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
