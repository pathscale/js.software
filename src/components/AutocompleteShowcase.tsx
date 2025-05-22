import { createSignal } from "solid-js";
import { Autocomplete } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function AutocompleteShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "sizes", title: "Sizes" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

  const colors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];

  const [selectedColor, setSelectedColor] = createSignal("");

  const props = [
    {
      name: "items",
      type: "Array<string | number>",
      description: "Array of items to choose from",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the input",
    },
    {
      name: "value",
      type: "string | number",
      description: "Controlled value of the input",
    },
    {
      name: "onChange",
      type: "(val: string | number) => void",
      description: "Callback when value changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the input is disabled",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the input field",
    },
    {
      name: "state",
      type: '"default" | "disabled"',
      default: '"default"',
      description: "Visual state of the input",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="space-y-4">
            <div class="space-y-4">
              <Autocomplete
                label="Select a color"
                items={colors}
                value={selectedColor()}
                onChange={(val) => setSelectedColor(val.toString())}
              />
              <div class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                Selected value: {selectedColor() || "none"}
              </div>
            </div>
            <CodeBlock
              code={`const colors = ["slate", "gray", "zinc", "neutral", ...];
const [selected, setSelected] = createSignal("");

<Autocomplete
  label="Select a color"
  items={colors}
  value={selected()}
  onChange={(val) => setSelected(val.toString())}
/>`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="space-y-4">
            <Autocomplete label="Small size" items={colors} size="sm" />
            <Autocomplete
              label="Medium size (default)"
              items={colors}
              size="md"
            />
            <Autocomplete label="Large size" items={colors} size="lg" />
            <CodeBlock
              code={`// Size variations
<Autocomplete label="Small size" items={items} size="sm" />
<Autocomplete label="Medium size" items={items} size="md" />
<Autocomplete label="Large size" items={items} size="lg" />`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="space-y-4">
            <Autocomplete label="Normal state" items={colors} />
            <Autocomplete label="Disabled state" items={colors} disabled />
            <CodeBlock
              code={`// Component states
<Autocomplete label="Normal state" items={items} />
<Autocomplete label="Disabled state" items={items} disabled />`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
