import ShowcaseLayout from "./ShowcaseLayout";
import { Switch, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SwitchShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const toggleProps = [
    {
      name: "flavor",
      type: `Flavor`,
      default: '"default"',
      description: "What the thing is. Open: your own name yields a class you can style.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
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
      name: "class",
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
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
              <Switch />
              <Switch checked />
            </Flex>
            <CodeBlock
              code={`<Switch />
<Switch checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <Switch flavor="neutral" checked />
              <Switch flavor="accent" checked />
              <Switch flavor="success" checked />
              <Switch flavor="warning" checked />
              <Switch flavor="destructive" checked />
            </Flex>
            <CodeBlock
              code={`<Switch flavor="neutral" checked />
<Switch flavor="accent" checked />
<Switch flavor="success" checked />
<Switch flavor="warning" checked />
<Switch flavor="destructive" checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Switch size="sm" />
              <Switch size="md" />
              <Switch size="lg" />
            </Flex>
            <CodeBlock
              code={`<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Switch disabled />
              <Switch disabled checked />
            </Flex>
            <CodeBlock
              code={`<Switch disabled />
<Switch disabled checked />`}
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
