import ShowcaseLayout from "./ShowcaseLayout";
import { Toggle, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ToggleShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const toggleProps = [
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      default: "undefined",
      description: "The color scheme of the toggle",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "The size of the toggle",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the toggle is checked",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the toggle is disabled",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLInputElement>) => void",
      description: "Callback function when the toggle state changes",
    },
    {
      name: "ref",
      type: "Ref<HTMLInputElement>",
      description: "Forward ref to the input element",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply",
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
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Toggle />
              <Toggle checked />
            </Flex>
            <CodeBlock
              code={`<Toggle />
<Toggle checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <Toggle color="primary" checked />
              <Toggle color="secondary" checked />
              <Toggle color="accent" checked />
              <Toggle color="neutral" checked />
              <Toggle color="info" checked />
              <Toggle color="success" checked />
              <Toggle color="warning" checked />
              <Toggle color="error" checked />
            </Flex>
            <CodeBlock
              code={`<Toggle color="primary" checked />
<Toggle color="secondary" checked />
<Toggle color="accent" checked />
<Toggle color="neutral" checked />
<Toggle color="info" checked />
<Toggle color="success" checked />
<Toggle color="warning" checked />
<Toggle color="error" checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Toggle size="xs" />
              <Toggle size="sm" />
              <Toggle size="md" />
              <Toggle size="lg" />
              <Toggle size="xl" />
            </Flex>
            <CodeBlock
              code={`<Toggle size="xs" />
<Toggle size="sm" />
<Toggle size="md" />
<Toggle size="lg" />
<Toggle size="xl" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Toggle disabled />
              <Toggle disabled checked />
            </Flex>
            <CodeBlock
              code={`<Toggle disabled />
<Toggle disabled checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toggleProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
