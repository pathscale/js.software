import { Stack, Flex, Card } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function StackShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "stacked-images", title: "Stacked Images" },
    { id: "stacked-cards-border", title: "Cards with Border" },
    { id: "stacked-cards-shadow", title: "Cards with Shadow" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "direction",
      type: `"top" | "bottom" | "left" | "right"`,
      description:
        "Position of the first item in the stack (default undefined).",
    },
    {
      name: "reverse",
      type: "boolean",
      description: "Reverses the stacking order.",
    },
    {
      name: "as",
      type: "string",
      description: "HTML tag or component to render as (default: 'div').",
    },
    {
      name: "class / className",
      type: "string",
      description: "Additional CSS classes for the outer container.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme styling via data-theme.",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles applied to the stack container.",
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
            <Stack>
              <div class="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">
                1
              </div>
              <div class="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">
                2
              </div>
              <div class="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">
                3
              </div>
            </Stack>

            <CodeBlock
              code={`<Stack>
  <div class="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">1</div>
  <div class="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">2</div>
  <div class="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">3</div>
</Stack>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="stacked-images" title="Stacked Images">
          <Flex direction="col" gap="md">
            <Stack>
              <img
                class="rounded"
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              />
              <img
                class="rounded"
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              />
              <img
                class="rounded"
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              />
            </Stack>

            <CodeBlock
              code={`<Stack>
  <img class="rounded" src="...photo-1.webp" />
  <img class="rounded" src="...photo-2.webp" />
  <img class="rounded" src="...photo-3.webp" />
</Stack>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="stacked-cards-border" title="Cards with Border">
          <Flex direction="col" gap="md">
            <Stack>
              <Card class="text-center border border-base-content w-36 bg-base-100">
                <Card.Body>A</Card.Body>
              </Card>
              <Card class="text-center border border-base-content w-36 bg-base-100">
                <Card.Body>B</Card.Body>
              </Card>
              <Card class="text-center border border-base-content w-36 bg-base-100">
                <Card.Body>C</Card.Body>
              </Card>
            </Stack>

            <CodeBlock
              code={`<Stack>
  <Card class="text-center border border-base-content w-36 bg-base-100">
    <Card.Body>A</Card.Body>
  </Card>
  <Card class="text-center border border-base-content w-36 bg-base-100">
    <Card.Body>B</Card.Body>
  </Card>
  <Card class="text-center border border-base-content w-36 bg-base-100">
    <Card.Body>C</Card.Body>
  </Card>
</Stack>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="stacked-cards-shadow" title="Cards with Shadow">
          <Flex direction="col" gap="md">
            <Stack>
              <Card class="text-center shadow-md w-36 bg-base-200">
                <Card.Body>A</Card.Body>
              </Card>
              <Card class="text-center shadow-md w-36 bg-base-200">
                <Card.Body>B</Card.Body>
              </Card>
              <Card class="text-center shadow-md w-36 bg-base-200">
                <Card.Body>C</Card.Body>
              </Card>
            </Stack>

            <CodeBlock
              code={`<Stack>
  <Card class="text-center shadow-md w-36 bg-base-200">
    <Card.Body>A</Card.Body>
  </Card>
  <Card class="text-center shadow-md w-36 bg-base-200">
    <Card.Body>B</Card.Body>
  </Card>
  <Card class="text-center shadow-md w-36 bg-base-200">
    <Card.Body>C</Card.Body>
  </Card>
</Stack>`}
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
