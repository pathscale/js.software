import { Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function FlexShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "direction", title: "Direction" },
    { id: "justify", title: "Justify" },
    { id: "align", title: "Align" },
    { id: "wrap", title: "Wrap" },
    { id: "gap", title: "Gap" },
    { id: "responsive", title: "Responsive Props" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "direction",
      type: `"row" | "col" | "row-reverse" | "col-reverse"`,
      description: "Flex direction",
    },
    {
      name: "justify",
      type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
      description: "Horizontal alignment",
    },
    {
      name: "align",
      type: `"start" | "center" | "end" | "stretch" | "baseline"`,
      description: "Vertical alignment",
    },
    {
      name: "wrap",
      type: `"wrap" | "nowrap" | "wrap-reverse"`,
      description: "Wrap behavior",
    },
    {
      name: "gap",
      type: `"none" | "sm" | "md" | "lg" | "xl"`,
      description: "Gap between items",
    },
    {
      name: "gapX",
      type: `"none" | "sm" | "md" | "lg" | "xl"`,
      description: "Horizontal gap",
    },
    {
      name: "gapY",
      type: `"none" | "sm" | "md" | "lg" | "xl"`,
      description: "Vertical gap",
    },
    { name: "grow", type: "boolean", description: "Whether items grow" },
    { name: "shrink", type: "boolean", description: "Whether items shrink" },
    {
      name: "basis",
      type: `"none" | "sm" | "md" | "lg" | "xl"`,
      description: "Initial flex basis",
    },
  ];

  const box = "bg-primary text-primary-content rounded p-2";

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

        <ShowcaseSection id="direction" title="Direction">
          <Flex direction="col" gap="md">
            <Flex direction="row" gap="md">
              <div class={box}>Row 1</div>
              <div class={box}>Row 2</div>
            </Flex>
            <CodeBlock code={`<Flex direction="row" gap="md">...</Flex>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="justify" title="Justify">
          <Flex direction="col" gap="md">
            <Flex direction="row" justify="between" gap="md">
              <div class={box}>Start</div>
              <div class={box}>End</div>
            </Flex>
            <CodeBlock code={`<Flex justify="between">...</Flex>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="align" title="Align">
          <Flex direction="col" gap="md">
            <Flex direction="row" align="end" gap="md" class="h-20">
              <div class={`${box} h-8`}>A</div>
              <div class={`${box} h-12`}>B</div>
            </Flex>
            <CodeBlock code={`<Flex align="end">...</Flex>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="wrap" title="Wrap">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" gap="md">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div class={box}>Item {i + 1}</div>
                ))}
            </Flex>
            <CodeBlock code={`<Flex wrap="wrap">...</Flex>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="gap" title="Gap">
          <Flex direction="col" gap="md">
            <Flex direction="row" gap="lg">
              <div class={box}>1</div>
              <div class={box}>2</div>
              <div class={box}>3</div>
            </Flex>
            <CodeBlock code={`<Flex gap="lg">...</Flex>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive Props">
          <Flex direction="col" gap="md">
            <Flex
              direction={{ base: "col", md: "row" }}
              gap={{ base: "sm", md: "lg" }}
              justify={{ base: "center", md: "between" }}
            >
              <div class={box}>One</div>
              <div class={box}>Two</div>
            </Flex>
            <CodeBlock
              code={`<Flex
  direction={{ base: "col", md: "row" }}
  gap={{ base: "sm", md: "lg" }}
  justify={{ base: "center", md: "between" }}
>
  ...
</Flex>`}
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
