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
      type: '"default" | "flat" | "bordered" | "shadow"',
      default: '"default"',
      description: "Visual variant of the card",
    },
    {
      name: "isHoverable",
      type: "boolean",
      default: "false",
      description: "Adds an interactive hover treatment",
    },
    {
      name: "isPressable",
      type: "boolean",
      default: "false",
      description: "Makes the card behave like a button (role + keyboard activation)",
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
      description: "ARIA role attribute (defaults to 'button' when isPressable)",
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
              <Card.Body>
                <h2 class="text-lg font-semibold">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Flex justify="end" class="mt-4">
                  <Button color="primary">Buy Now</Button>
                </Flex>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card>
  <Card.Body>
    <h2 class="text-lg font-semibold">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Flex justify="end" class="mt-4">
      <Button color="primary">Buy Now</Button>
    </Flex>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-header-footer" title="Header & Footer">
          <Flex direction="col" gap="md">
            <Card variant="bordered">
              <Card.Header>
                <h2 class="text-lg font-semibold">Card Title</h2>
              </Card.Header>
              <Card.Body>
                <p>This card uses Header, Body, and Footer slots.</p>
              </Card.Body>
              <Card.Footer>
                <Flex justify="end" gap="sm">
                  <Button variant="ghost">Cancel</Button>
                  <Button color="primary">Confirm</Button>
                </Flex>
              </Card.Footer>
            </Card>
            <CodeBlock
              code={`<Card variant="bordered">
  <Card.Header>
    <h2 class="text-lg font-semibold">Card Title</h2>
  </Card.Header>
  <Card.Body>
    <p>This card uses Header, Body, and Footer slots.</p>
  </Card.Body>
  <Card.Footer>
    <Flex justify="end" gap="sm">
      <Button variant="ghost">Cancel</Button>
      <Button color="primary">Confirm</Button>
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
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                class="w-full h-48 object-cover"
              />
              <Card.Body>
                <h2 class="text-lg font-semibold">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <Flex justify="end" class="mt-4">
                  <Button color="primary">Buy Now</Button>
                </Flex>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card class="overflow-hidden">
  <img
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    class="w-full h-48 object-cover"
  />
  <Card.Body>
    <h2 class="text-lg font-semibold">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <Flex justify="end" class="mt-4">
      <Button color="primary">Buy Now</Button>
    </Flex>
  </Card.Body>
</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Card variant="default">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Default</h2>
                  <p>Default card variant</p>
                </Card.Body>
              </Card>
              <Card variant="flat">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Flat</h2>
                  <p>Flat card with no elevation</p>
                </Card.Body>
              </Card>
              <Card variant="bordered">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Bordered</h2>
                  <p>Card with a border around it</p>
                </Card.Body>
              </Card>
              <Card variant="shadow">
                <Card.Body>
                  <h2 class="text-lg font-semibold">Shadow</h2>
                  <p>Card with an elevated shadow</p>
                </Card.Body>
              </Card>
            </Flex>
            <CodeBlock
              code={`<Card variant="default">...</Card>
<Card variant="flat">...</Card>
<Card variant="bordered">...</Card>
<Card variant="shadow">...</Card>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hoverable" title="Hoverable">
          <Flex direction="col" gap="md">
            <Card isHoverable>
              <Card.Body>
                <h2 class="text-lg font-semibold">Hover me</h2>
                <p>Hover state adds an interactive treatment.</p>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card isHoverable>
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
              isPressable
              isHoverable
              onClick={() => console.log("card pressed")}
            >
              <Card.Body>
                <h2 class="text-lg font-semibold">Press me</h2>
                <p>Acts like a button; Enter/Space activates.</p>
              </Card.Body>
            </Card>
            <CodeBlock
              code={`<Card
  isPressable
  isHoverable
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
