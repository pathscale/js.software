import { createSignal } from "solid-js";
import { Select, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function SelectShowcase() {
  const [selected, setSelected] = createSignal("");
  const [colorSelected, setColorSelected] = createSignal("");
  const [sizeSelected, setSizeSelected] = createSignal("");

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "colors", title: "Color Variants" },
    { id: "sizes", title: "Size Variants" },
    { id: "states", title: "States" },
    { id: "variants", title: "Variants" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "value",
      type: "string | number | null",
      description: "Current selected value",
    },
    {
      name: "onChange",
      type: "JSX.EventHandlerUnion<HTMLSelectElement, Event>",
      description: "Fired when value changes",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder option shown when value is empty",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the select input",
    },
    {
      name: "color",
      type: '"primary" | "info" | "success" | "warning" | "danger"',
      default: '"primary"',
      description: "Color scheme",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Apply loading styles",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description: "Make the select fill its container",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "false",
      description: "Apply rounded corners",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the select input",
    },
    {
      name: "nativeSize",
      type: "string | number",
      description: "Native HTML select size (number of visible options)",
    },
    { name: "class", type: "string", description: "Additional custom classes" },
  ];

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "kiwi", label: "Kiwi" },
  ];

  const colorOptions = [
    { value: "red", label: "Ruby Red" },
    { value: "blue", label: "Ocean Blue" },
    { value: "green", label: "Forest Green" },
    { value: "purple", label: "Royal Purple" },
    { value: "orange", label: "Sunset Orange" },
  ];

  const sizeOptions = [
    { value: "xs", label: "Extra Small" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "sports", label: "Sports" },
    { value: "home", label: "Home & Garden" },
  ];

  const animalOptions = [
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "rabbit", label: "Rabbit" },
    { value: "hamster", label: "Hamster" },
    { value: "bird", label: "Bird" },
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
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="sm">
              <Select
                placeholder="Select a fruit"
                value={selected()}
                onChange={(e) => setSelected(e.currentTarget.value)}
              >
                {fruitOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <div class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                Selected fruit: {selected() || "(none)"}
              </div>
            </Flex>
            <CodeBlock
              code={`const [selected, setSelected] = createSignal("");

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "kiwi", label: "Kiwi" },
];

<Select
  placeholder="Select a fruit"
  value={selected()}
  onChange={(e) => setSelected(e.currentTarget.value)}
>
  {fruitOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Color Variants">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="lg">
              <Select
                placeholder="Select a color"
                color="primary"
                value={colorSelected()}
                onChange={(e) => setColorSelected(e.currentTarget.value)}
              >
                {colorOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select placeholder="Select a category" color="info">
                {categoryOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select placeholder="Select a fruit" color="success">
                {fruitOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select placeholder="Select a size" color="warning">
                {sizeOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select placeholder="Select an animal" color="danger">
                {animalOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select placeholder="Select a color" color="primary">
  {colorOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select placeholder="Select a category" color="info">
  {categoryOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select placeholder="Select a fruit" color="success">
  {fruitOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select placeholder="Select a size" color="warning">
  {sizeOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select placeholder="Select an animal" color="danger">
  {animalOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Size Variants">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="lg">
              <Select
                size="sm"
                placeholder="Small size"
                value={sizeSelected()}
                onChange={(e) => setSizeSelected(e.currentTarget.value)}
              >
                {sizeOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select size="md" placeholder="Medium size">
                {animalOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select size="lg" placeholder="Large size">
                {fruitOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select size="sm" placeholder="Small size">
  {sizeOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select size="md" placeholder="Medium size">
  {animalOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select size="lg" placeholder="Large size">
  {fruitOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="lg">
              <Select disabled placeholder="Disabled state">
                {fruitOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select loading placeholder="Loading state">
                {animalOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select disabled placeholder="Disabled state">
  {fruitOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select loading placeholder="Loading state">
  {animalOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="center" gap="lg">
              <Select rounded placeholder="Rounded corners">
                {colorOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select expanded placeholder="Full width">
                {categoryOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
              <Select nativeSize={4} placeholder="Multiple visible options">
                {animalOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
            <CodeBlock
              code={`<Select rounded placeholder="Rounded corners">
  {colorOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select expanded placeholder="Full width">
  {categoryOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>
<Select nativeSize={4} placeholder="Multiple visible options">
  {animalOptions.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  ))}
</Select>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
