import ShowcaseLayout from "./ShowcaseLayout";
import { Fieldset, Input, Checkbox, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function FieldsetShowcase() {
  const sections = [
    { id: "default", title: "Default with Legend" },
    { id: "description", title: "With Description" },
    { id: "disabled", title: "Disabled State" },
    { id: "gap-sizes", title: "Gap Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const fieldsetProps = [
    {
      name: "legend",
      type: "JSX.Element | string",
      description: "Legend content displayed at the top of the fieldset",
    },
    {
      name: "description",
      type: "string",
      description: "Optional description text below the legend",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all form controls within the fieldset",
    },
    {
      name: "gap",
      type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "Spacing between child elements",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Child elements rendered inside the fieldset",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value (from IComponentBaseProps)",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
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

        <ShowcaseSection id="default" title="Default with Legend">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Fieldset legend="Personal Information">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
                <Input placeholder="Email" />
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset legend="Personal Information">
  <Input placeholder="First name" />
  <Input placeholder="Last name" />
  <Input placeholder="Email" />
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="description" title="With Description">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Fieldset
                legend="Notification Preferences"
                description="Choose how you would like to receive notifications."
              >
                <Checkbox>Email notifications</Checkbox>
                <Checkbox>SMS notifications</Checkbox>
                <Checkbox>Push notifications</Checkbox>
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset
  legend="Notification Preferences"
  description="Choose how you would like to receive notifications."
>
  <Checkbox>Email notifications</Checkbox>
  <Checkbox>SMS notifications</Checkbox>
  <Checkbox>Push notifications</Checkbox>
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled State">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Fieldset legend="Account Settings" description="These fields are currently locked." disabled>
                <Input placeholder="Username" value="johndoe" />
                <Input placeholder="Email" value="john@example.com" />
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset legend="Account Settings" description="These fields are currently locked." disabled>
  <Input placeholder="Username" value="johndoe" />
  <Input placeholder="Email" value="john@example.com" />
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="gap-sizes" title="Gap Sizes">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <Fieldset legend="gap=none" gap="none">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
              <Fieldset legend="gap=xs" gap="xs">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
              <Fieldset legend="gap=sm" gap="sm">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
              <Fieldset legend="gap=md" gap="md">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
              <Fieldset legend="gap=lg" gap="lg">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
              <Fieldset legend="gap=xl" gap="xl">
                <Input placeholder="Field A" />
                <Input placeholder="Field B" />
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset legend="gap=none" gap="none">
  <Input placeholder="Field A" />
  <Input placeholder="Field B" />
</Fieldset>
<Fieldset legend="gap=xs" gap="xs">...</Fieldset>
<Fieldset legend="gap=sm" gap="sm">...</Fieldset>
<Fieldset legend="gap=md" gap="md">...</Fieldset>
<Fieldset legend="gap=lg" gap="lg">...</Fieldset>
<Fieldset legend="gap=xl" gap="xl">...</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={fieldsetProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
