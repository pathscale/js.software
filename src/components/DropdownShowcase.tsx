import ShowcaseLayout from "./ShowcaseLayout";
import { Dropdown, DropdownItem } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DropdownShowcase() {
  const triggers = ["click", "hover"] as const;
  const colors = ["primary", "secondary", "default"] as const;

  const sections = [
    { id: "triggers", title: "Triggers" },
    { id: "colors", title: "Colors" },
    { id: "states", title: "States" },
    { id: "custom-labels", title: "Custom Labels" },
    { id: "props", title: "Props" },
  ] as const;

  const dropdownProps = [
    {
      name: "trigger",
      type: '"click" | "hover"',
      default: '"click"',
      description: "The interaction method to open the dropdown",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "default"',
      default: '"primary"',
      description: "The color scheme of the dropdown button",
    },
    {
      name: "label",
      type: "string | JSX.Element",
      default: '"Toggle"',
      description: "The label shown on the dropdown button",
    },
    {
      name: "disabledLabel",
      type: "string | JSX.Element",
      default: "same as label",
      description: "The label shown when dropdown is disabled",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the dropdown is disabled",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  const sampleItems = (
    <>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </>
  );

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="triggers" title="Triggers">
          <div class="flex flex-wrap gap-4">
            {triggers.map((trigger) => (
              <Dropdown trigger={trigger} label={`${trigger} trigger`}>
                {sampleItems}
              </Dropdown>
            ))}
          </div>
          <CodeBlock
            code={`// Trigger variations
<Dropdown trigger="click" label="Click trigger">
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
  <DropdownItem>Option 3</DropdownItem>
</Dropdown>

<Dropdown trigger="hover" label="Hover trigger">
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
  <DropdownItem>Option 3</DropdownItem>
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-wrap gap-4">
            {colors.map((color) => (
              <Dropdown trigger="click" color={color} label={`${color} color`}>
                {sampleItems}
              </Dropdown>
            ))}
          </div>
          <CodeBlock
            code={`// Color variations
<Dropdown trigger="click" color="primary" label="Primary color">
  {/* Dropdown items */}
</Dropdown>

<Dropdown trigger="click" color="secondary" label="Secondary color">
  {/* Dropdown items */}
</Dropdown>

<Dropdown trigger="click" color="default" label="Default color">
  {/* Dropdown items */}
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-wrap gap-4">
            <Dropdown trigger="click" label="Normal state">
              {sampleItems}
            </Dropdown>
            <Dropdown trigger="click" disabled label="Disabled state">
              {sampleItems}
            </Dropdown>
          </div>
          <CodeBlock
            code={`// Interactive states
<Dropdown trigger="click" label="Normal state">
  {/* Dropdown items */}
</Dropdown>

<Dropdown trigger="click" disabled label="Disabled state">
  {/* Dropdown items */}
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-labels" title="Custom Labels">
          <div class="flex flex-wrap gap-4">
            <Dropdown
              trigger="click"
              label={
                <span class="flex items-center">
                  Custom <span class="ml-2">🔽</span>
                </span>
              }
            >
              {sampleItems}
            </Dropdown>
            <Dropdown
              trigger="click"
              disabled
              label="Normal Label"
              disabledLabel={<span class="text-gray-400">Cannot open ⚠️</span>}
            >
              {sampleItems}
            </Dropdown>
          </div>
          <CodeBlock
            code={`// Custom labels
<Dropdown 
  trigger="click"
  label={<span class="flex items-center">Custom <span class="ml-2">🔽</span></span>}
>
  {/* Dropdown items */}
</Dropdown>

<Dropdown 
  trigger="click"
  disabled
  label="Normal Label"
  disabledLabel={<span class="text-gray-400">Cannot open ⚠️</span>}
>
  {/* Dropdown items */}
</Dropdown>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={dropdownProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
