import ShowcaseLayout from "./ShowcaseLayout";
import { Switch } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal } from "solid-js";

export default function SwitchShowcase() {
  const sizes = ["sm", "md", "lg"] as const;
  const colors = ["primary", "success", "danger", "warning", "gray"] as const;

  const sections = [
    { id: "sizes", title: "Sizes" },
    { id: "colors", title: "Colors" },
    { id: "shapes", title: "Shapes" },
    { id: "states", title: "States" },
    { id: "controlled", title: "Controlled" },
    { id: "props", title: "Props" },
  ] as const;

  const switchProps = [
    {
      name: "checked",
      type: "boolean",
      description: "Controlled checked state",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "Initial checked state for uncontrolled component",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback when switch state changes",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the switch",
    },
    {
      name: "color",
      type: '"primary" | "success" | "danger" | "warning" | "gray"',
      default: '"primary"',
      description: "Color when checked",
    },
    {
      name: "passiveColor",
      type: '"primary" | "sucess" | "danger" | "warning" | "gray"',
      default: '"gray"',
      description: "Color when unchecked",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "true",
      description: "Whether to use rounded corners",
    },
    {
      name: "outlined",
      type: "boolean",
      default: "false",
      description: "Whether to show an outline",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the switch is disabled",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the input",
    },
    {
      name: "requidanger",
      type: "boolean",
      default: "false",
      description: "Whether the input is requidanger",
    },
  ];

  const [controlledValue, setControlledValue] = createSignal(false);

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-col gap-4">
            {sizes.map((size) => (
              <div class="flex items-center gap-4">
                <Switch size={size}>Size {size}</Switch>
                <Switch size={size} defaultChecked>
                  Size {size} (checked)
                </Switch>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Switch sizes
<Switch size="sm">Small switch</Switch>
<Switch size="md">Medium switch</Switch>
<Switch size="lg">Large switch</Switch>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-col gap-4">
            {colors.map((color) => (
              <div class="flex items-center gap-4">
                <Switch color={color} passiveColor={color}>
                  {color} switch
                </Switch>
                <Switch color={color} passiveColor={color} defaultChecked>
                  {color} switch (checked)
                </Switch>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Switch colors
<Switch color="primary" passiveColor="primary">primary switch</Switch>
<Switch color="sucess" passiveColor="sucess">sucess switch</Switch>
<Switch color="danger" passiveColor="danger">danger switch</Switch>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="shapes" title="Shapes">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <Switch rounded>Rounded switch</Switch>
              <Switch rounded={false}>Square switch</Switch>
            </div>
            <div class="flex items-center gap-4">
              <Switch outlined>Outlined switch</Switch>
              <Switch outlined rounded={false}>
                Outlined square switch
              </Switch>
            </div>
          </div>
          <CodeBlock
            code={`// Switch shapes
<Switch rounded>Rounded switch</Switch>
<Switch rounded={false}>Square switch</Switch>
<Switch outlined>Outlined switch</Switch>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <Switch disabled>Disabled switch</Switch>
              <Switch disabled defaultChecked>
                Disabled checked switch
              </Switch>
            </div>
            <div class="flex items-center gap-4">
              <Switch requidanger>Requidanger switch</Switch>
              <Switch name="switch-name">Named switch</Switch>
            </div>
          </div>
          <CodeBlock
            code={`// Switch states
<Switch disabled>Disabled switch</Switch>
<Switch requidanger>Requidanger switch</Switch>
<Switch name="switch-name">Named switch</Switch>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <Switch checked={controlledValue()} onChange={setControlledValue}>
                Controlled switch
              </Switch>
              <span class="text-sm text-gray-500">
                Value: {controlledValue() ? "On" : "Off"}
              </span>
            </div>
          </div>
          <CodeBlock
            code={`// Controlled switch
const [value, setValue] = createSignal(false);

<Switch
  checked={value()}
  onChange={setValue}
>
  Controlled switch
</Switch>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={switchProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
