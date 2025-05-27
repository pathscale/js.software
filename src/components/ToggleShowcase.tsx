import ShowcaseLayout from "./ShowcaseLayout";
import { Toggle } from "@pathscale/ui";
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
      name: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "The default checked state of the toggle",
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
          <div class="flex items-center gap-4">
            <Toggle />
            <Toggle checked />
          </div>
          <CodeBlock
            code={`<Toggle />
<Toggle checked />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-wrap items-center gap-4">
            <Toggle color="primary" checked />
            <Toggle color="secondary" checked />
            <Toggle color="accent" checked />
            <Toggle color="neutral" checked />
            <Toggle color="info" checked />
            <Toggle color="success" checked />
            <Toggle color="warning" checked />
            <Toggle color="error" checked />
          </div>
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
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex items-center gap-4">
            <Toggle size="xs" />
            <Toggle size="sm" />
            <Toggle size="md" />
            <Toggle size="lg" />
            <Toggle size="xl" />
          </div>
          <CodeBlock
            code={`<Toggle size="xs" />
<Toggle size="sm" />
<Toggle size="md" />
<Toggle size="lg" />
<Toggle size="xl" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <div class="flex items-center gap-4">
            <Toggle disabled />
            <Toggle disabled checked />
          </div>
          <CodeBlock
            code={`<Toggle disabled />
<Toggle disabled checked />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toggleProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
