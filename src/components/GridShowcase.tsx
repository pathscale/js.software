import { Flex, Grid } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function GridShowcase() {
  const sections = [
    { id: "cols", title: "Columns" },
    { id: "rows", title: "Rows" },
    { id: "flow", title: "Flow" },
    { id: "gap", title: "Gap" },
    { id: "auto", title: "Auto Sizing" },
    { id: "responsive", title: "Responsive Props" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "cols",
      type: `"1" | "2" | ... | "12" | ResponsiveProp`,
      description: "Number of columns",
    },
    {
      name: "rows",
      type: `"1" | "2" | ... | "12" | ResponsiveProp`,
      description: "Number of rows",
    },
    {
      name: "flow",
      type: `"row" | "col" | "row-dense" | "col-dense" | ResponsiveProp`,
      description: "Grid flow direction",
    },
    {
      name: "gap",
      type: `"none" | "sm" | "md" | "lg" | "xl" | ResponsiveProp`,
      description: "Gap between rows and columns",
    },
    {
      name: "autoCols",
      type: `"min" | "max" | "fr" | ResponsiveProp`,
      description: "Automatic column sizing",
    },
    {
      name: "autoRows",
      type: `"min" | "max" | "fr" | ResponsiveProp`,
      description: "Automatic row sizing",
    },
  ];

  const box = "bg-primary text-primary-content rounded p-2 text-center";

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

        <ShowcaseSection id="cols" title="Columns">
          <Flex direction="col" gap="md">
            <Grid cols="3" gap="md">
              <div class={box}>1</div>
              <div class={box}>2</div>
              <div class={box}>3</div>
            </Grid>
            <CodeBlock code={`<Grid cols="3" gap="md">...</Grid>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="rows" title="Rows">
          <Flex direction="col" gap="md">
            <Grid rows="2" gap="md">
              <div class={box}>A</div>
              <div class={box}>B</div>
            </Grid>
            <CodeBlock code={`<Grid rows="2" gap="md">...</Grid>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="flow" title="Flow">
          <Flex direction="col" gap="md">
            <Grid cols="2" flow="row-dense" gap="md">
              <div class={`${box} row-span-2`}>Tall</div>
              <div class={box}>Short</div>
              <div class={box}>Short</div>
            </Grid>
            <CodeBlock code={`<Grid cols="2" flow="row-dense">...</Grid>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="gap" title="Gap">
          <Flex direction="col" gap="md">
            <Grid cols="3" gap="lg">
              <div class={box}>1</div>
              <div class={box}>2</div>
              <div class={box}>3</div>
            </Grid>
            <CodeBlock code={`<Grid cols="3" gap="lg">...</Grid>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="auto" title="Auto Sizing">
          <Flex direction="col" gap="md">
            <Grid cols="3" autoRows="min" gap="md">
              <div class={box}>Min</div>
              <div class={`${box} h-20`}>Min</div>
              <div class={`${box} h-10`}>Min</div>
            </Grid>
            <CodeBlock code={`<Grid cols="3" autoRows="min">...</Grid>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive Props">
          <Flex direction="col" gap="md">
            <Grid cols={{ base: "1", sm: "2", md: "4" }} gap="md">
              <div class={box}>One</div>
              <div class={box}>Two</div>
              <div class={box}>Three</div>
              <div class={box}>Four</div>
            </Grid>
            <CodeBlock
              code={`<Grid cols={{ base: "1", sm: "2", md: "4" }} gap="md">
  ...
</Grid>`}
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
