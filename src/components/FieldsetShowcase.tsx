import ShowcaseLayout from "./ShowcaseLayout";
import { Checkbox, Fieldset, Flex, Input } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function FieldsetShowcase() {
  const sections = [
    { id: "default", title: "Default with Legend" },
    { id: "description", title: "With Description" },
    { id: "disabled", title: "Disabled State" },
    { id: "gap-sizes", title: "Custom Gap" },
    { id: "props", title: "Props" },
  ] as const;

  const fieldsetProps = [
    {
      name: "children",
      type: "JSX.Element",
      description: "Child elements rendered inside the <fieldset> element",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Native fieldset disabled attribute; disables all form controls within",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes (use Tailwind gap-* utilities to control spacing)",
    },
    {
      name: "class",
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value (from IComponentBaseProps)",
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
              <Fieldset>
                <Fieldset.Legend>Personal Information</Fieldset.Legend>
                <Fieldset.Group>
                  <Input placeholder="First name" />
                  <Input placeholder="Last name" />
                  <Input placeholder="Email" />
                </Fieldset.Group>
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset>
  <Fieldset.Legend>Personal Information</Fieldset.Legend>
  <Fieldset.Group>
    <Input placeholder="First name" />
    <Input placeholder="Last name" />
    <Input placeholder="Email" />
  </Fieldset.Group>
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="description" title="With Description">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Fieldset>
                <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
                <p class="text-sm text-base-content/70">
                  Choose how you would like to receive notifications.
                </p>
                <Fieldset.Group>
                  <Checkbox>Email notifications</Checkbox>
                  <Checkbox>SMS notifications</Checkbox>
                  <Checkbox>Push notifications</Checkbox>
                </Fieldset.Group>
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset>
  <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
  <p class="text-sm text-base-content/70">
    Choose how you would like to receive notifications.
  </p>
  <Fieldset.Group>
    <Checkbox>Email notifications</Checkbox>
    <Checkbox>SMS notifications</Checkbox>
    <Checkbox>Push notifications</Checkbox>
  </Fieldset.Group>
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled State">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Fieldset disabled>
                <Fieldset.Legend>Account Settings</Fieldset.Legend>
                <p class="text-sm text-base-content/70">These fields are currently locked.</p>
                <Fieldset.Group>
                  <Input placeholder="Username" value="johndoe" />
                  <Input placeholder="Email" value="john@example.com" />
                </Fieldset.Group>
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset disabled>
  <Fieldset.Legend>Account Settings</Fieldset.Legend>
  <Fieldset.Group>
    <Input placeholder="Username" value="johndoe" />
    <Input placeholder="Email" value="john@example.com" />
  </Fieldset.Group>
</Fieldset>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="gap-sizes" title="Custom Gap">
          <Flex direction="col" gap="md">
            <p class="text-sm text-base-content/70">
              The `gap` prop was removed; control spacing with Tailwind `gap-*` utilities on
              Fieldset.Group.
            </p>
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <Fieldset>
                <Fieldset.Legend>gap-0</Fieldset.Legend>
                <Fieldset.Group class="gap-0">
                  <Input placeholder="Field A" />
                  <Input placeholder="Field B" />
                </Fieldset.Group>
              </Fieldset>
              <Fieldset>
                <Fieldset.Legend>gap-4</Fieldset.Legend>
                <Fieldset.Group class="gap-4">
                  <Input placeholder="Field A" />
                  <Input placeholder="Field B" />
                </Fieldset.Group>
              </Fieldset>
              <Fieldset>
                <Fieldset.Legend>gap-8</Fieldset.Legend>
                <Fieldset.Group class="gap-8">
                  <Input placeholder="Field A" />
                  <Input placeholder="Field B" />
                </Fieldset.Group>
              </Fieldset>
            </Flex>
            <CodeBlock
              code={`<Fieldset>
  <Fieldset.Legend>gap-4</Fieldset.Legend>
  <Fieldset.Group class="gap-4">
    <Input placeholder="Field A" />
    <Input placeholder="Field B" />
  </Fieldset.Group>
</Fieldset>`}
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
