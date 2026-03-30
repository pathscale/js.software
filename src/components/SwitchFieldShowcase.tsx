import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { SwitchField, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SwitchFieldShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-description", title: "With Description" },
    { id: "disabled", title: "Disabled" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const switchFieldProps = [
    {
      name: "label",
      type: "string",
      description: "The main label text for the switch field",
    },
    {
      name: "description",
      type: "string",
      description: "Optional description text displayed below the label",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the switch is checked",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback when the switch state changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the switch field is disabled",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "Size of the switch",
    },
  ];

  const [notifications, setNotifications] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);

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
            <div class="w-80">
              <SwitchField
                label="Enable notifications"
                checked={notifications()}
                onChange={setNotifications}
              />
            </div>
            <CodeBlock
              code={`<SwitchField
  label="Enable notifications"
  checked={notifications()}
  onChange={setNotifications}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-description" title="With Description">
          <Flex direction="col" gap="md">
            <div class="w-80 space-y-4">
              <SwitchField
                label="Dark mode"
                description="Use dark theme across the app"
                checked={darkMode()}
                onChange={setDarkMode}
              />
              <SwitchField
                label="Auto-save"
                description="Automatically save changes every 30 seconds"
                checked={true}
              />
            </div>
            <CodeBlock
              code={`<SwitchField
  label="Dark mode"
  description="Use dark theme across the app"
  checked={darkMode()}
  onChange={setDarkMode}
/>
<SwitchField
  label="Auto-save"
  description="Automatically save changes every 30 seconds"
  checked={true}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <div class="w-80 space-y-4">
              <SwitchField label="Disabled off" disabled />
              <SwitchField label="Disabled on" disabled checked />
            </div>
            <CodeBlock
              code={`<SwitchField label="Disabled off" disabled />
<SwitchField label="Disabled on" disabled checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <div class="w-80 space-y-4">
              <SwitchField label="Extra small" size="xs" checked />
              <SwitchField label="Small" size="sm" checked />
              <SwitchField label="Medium" size="md" checked />
              <SwitchField label="Large" size="lg" checked />
              <SwitchField label="Extra large" size="xl" checked />
            </div>
            <CodeBlock
              code={`<SwitchField label="Extra small" size="xs" checked />
<SwitchField label="Small" size="sm" checked />
<SwitchField label="Medium" size="md" checked />
<SwitchField label="Large" size="lg" checked />
<SwitchField label="Extra large" size="xl" checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={switchFieldProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
