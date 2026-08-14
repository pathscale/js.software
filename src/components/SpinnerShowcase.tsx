import ShowcaseLayout from "./ShowcaseLayout";
import { Flex, Spinner } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SpinnerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "variants", title: "Variants" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the loading indicator",
    },
    {
      name: "flavor",
      type: `Flavor`,
      default: '"current"',
      description: "What the thing is. Open: your own name yields a class you can style.",
    },
    {
      name: "variant",
      type: '"spinner" | "dots" | "ring" | "ball" | "bars" | "infinity"',
      default: '"spinner"',
      description: "Visual style variant of the loading indicator",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
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
      description: "Accessibility label for the loading indicator",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of element describing the loading state",
    },
    {
      name: "aria-live",
      type: '"off" | "polite" | "assertive"',
      description: "How screen readers should announce loading changes",
    },
    {
      name: "aria-busy",
      type: "boolean",
      description: "Indicates the element is busy (loading)",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the loading indicator",
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
            <Flex justify="start" align="start">
              <Spinner shape="spinner" />
            </Flex>
            <CodeBlock code={`<Spinner shape="spinner" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Spinner />
              <Spinner flavor="current" />
              <Spinner flavor="accent" />
              <Spinner flavor="success" />
              <Spinner flavor="warning" />
              <Spinner flavor="destructive" />
            </Flex>
            <CodeBlock
              code={`<Spinner />
<Spinner flavor="current" />
<Spinner flavor="accent" />
<Spinner flavor="success" />
<Spinner flavor="warning" />
<Spinner flavor="destructive" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Spinner shape="spinner" />
              <Spinner shape="dots" />
              <Spinner shape="ring" />
              <Spinner shape="ball" />
              <Spinner shape="bars" />
              <Spinner shape="infinity" />
            </Flex>
            <CodeBlock
              code={`<Spinner shape="spinner" />
<Spinner shape="dots" />
<Spinner shape="ring" />
<Spinner shape="ball" />
<Spinner shape="bars" />
<Spinner shape="infinity" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" justify="start" align="start" gap="lg">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </Flex>
            <CodeBlock
              code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
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
