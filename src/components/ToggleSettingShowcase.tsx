import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { ToggleSetting, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ToggleSettingShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-description", title: "With Description" },
    { id: "disabled", title: "Disabled" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const toggleSettingProps = [
    {
      name: "label",
      type: "string",
      description: "The main label text for the toggle setting",
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
      description: "Whether the toggle is checked",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback when the toggle state changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the toggle setting is disabled",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "Size of the toggle",
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
              <ToggleSetting
                label="Enable notifications"
                checked={notifications()}
                onChange={setNotifications}
              />
            </div>
            <CodeBlock
              code={`<ToggleSetting
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
              <ToggleSetting
                label="Dark mode"
                description="Use dark theme across the app"
                checked={darkMode()}
                onChange={setDarkMode}
              />
              <ToggleSetting
                label="Auto-save"
                description="Automatically save changes every 30 seconds"
                checked={true}
              />
            </div>
            <CodeBlock
              code={`<ToggleSetting
  label="Dark mode"
  description="Use dark theme across the app"
  checked={darkMode()}
  onChange={setDarkMode}
/>
<ToggleSetting
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
              <ToggleSetting label="Disabled off" disabled />
              <ToggleSetting label="Disabled on" disabled checked />
            </div>
            <CodeBlock
              code={`<ToggleSetting label="Disabled off" disabled />
<ToggleSetting label="Disabled on" disabled checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <div class="w-80 space-y-4">
              <ToggleSetting label="Extra small" size="xs" checked />
              <ToggleSetting label="Small" size="sm" checked />
              <ToggleSetting label="Medium" size="md" checked />
              <ToggleSetting label="Large" size="lg" checked />
              <ToggleSetting label="Extra large" size="xl" checked />
            </div>
            <CodeBlock
              code={`<ToggleSetting label="Extra small" size="xs" checked />
<ToggleSetting label="Small" size="sm" checked />
<ToggleSetting label="Medium" size="md" checked />
<ToggleSetting label="Large" size="lg" checked />
<ToggleSetting label="Extra large" size="xl" checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toggleSettingProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
