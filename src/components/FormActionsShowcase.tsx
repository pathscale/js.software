import ShowcaseLayout from "./ShowcaseLayout";
import { FormActions, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function FormActionsShowcase() {
  const sections = [
    { id: "single", title: "Single Layout" },
    { id: "split", title: "Split Layout" },
    { id: "center", title: "Center Layout" },
    { id: "loading", title: "Loading State" },
    { id: "disabled", title: "Disabled (Invalid)" },
    { id: "props", title: "Props" },
  ] as const;

  const formActionsProps = [
    {
      name: "submitText",
      type: "string",
      default: '"Submit"',
      description: "Text for the submit button",
    },
    {
      name: "cancelText",
      type: "string",
      default: '"Cancel"',
      description: "Text for the cancel button (split layout only)",
    },
    {
      name: "isLoading",
      type: "boolean",
      default: "false",
      description: "Shows loading spinner on submit button",
    },
    {
      name: "isValid",
      type: "boolean",
      default: "true",
      description: "Whether the form is valid; disables submit when false",
    },
    {
      name: "onCancel",
      type: "() => void",
      description: "Callback when the cancel button is clicked",
    },
    {
      name: "layout",
      type: '"single" | "split" | "center"',
      default: '"single"',
      description: "Layout style of the form actions",
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

        <ShowcaseSection id="single" title="Single Layout">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <FormActions layout="single" submitText="Save Changes" />
            </div>
            <CodeBlock
              code={`<FormActions layout="single" submitText="Save Changes" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="split" title="Split Layout">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <FormActions
                layout="split"
                submitText="Confirm"
                cancelText="Go Back"
                onCancel={() => alert("Cancel clicked")}
              />
            </div>
            <CodeBlock
              code={`<FormActions
  layout="split"
  submitText="Confirm"
  cancelText="Go Back"
  onCancel={() => alert("Cancel clicked")}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="center" title="Center Layout">
          <Flex direction="col" gap="md">
            <div class="w-full max-w-lg">
              <FormActions layout="center" submitText="Continue" />
            </div>
            <CodeBlock
              code={`<FormActions layout="center" submitText="Continue" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="loading" title="Loading State">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <FormActions layout="split" submitText="Saving..." isLoading />
            </div>
            <CodeBlock
              code={`<FormActions layout="split" submitText="Saving..." isLoading />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled (Invalid)">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <FormActions layout="single" submitText="Submit" isValid={false} />
            </div>
            <CodeBlock
              code={`<FormActions layout="single" submitText="Submit" isValid={false} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={formActionsProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
