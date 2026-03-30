import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { SliderField, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SliderFieldShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-label", title: "With label" },
    { id: "without-label", title: "Without label" },
    { id: "custom-formatter", title: "Custom formatter" },
    { id: "min-max-step", title: "Min/Max/Step" },
    { id: "colors", title: "Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const sliderFieldProps = [
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the slider",
    },
    {
      name: "value",
      type: "number",
      description: "Current value of the slider",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Callback when the slider value changes",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value of the slider",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value of the slider",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step increment between values",
    },
    {
      name: "formatValue",
      type: "(value: number) => string",
      description: "Custom formatter for the displayed value",
    },
    {
      name: "color",
      type: '"primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info"',
      description: "Color theme for the slider track",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      description: "Size of the slider",
    },
  ];

  const [basic, setBasic] = createSignal(50);
  const [labeled, setLabeled] = createSignal(70);
  const [bare, setBare] = createSignal(30);
  const [formatted, setFormatted] = createSignal(25);
  const [stepped, setStepped] = createSignal(40);
  const [colorVal, setColorVal] = createSignal(60);

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
              <SliderField value={basic()} onChange={setBasic} />
            </div>
            <CodeBlock
              code={`<SliderField value={value()} onChange={setValue} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-label" title="With label">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <SliderField
                label="Volume"
                value={labeled()}
                onChange={setLabeled}
              />
            </div>
            <CodeBlock
              code={`<SliderField
  label="Volume"
  value={value()}
  onChange={setValue}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="without-label" title="Without label">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <SliderField value={bare()} onChange={setBare} />
            </div>
            <CodeBlock
              code={`<SliderField value={value()} onChange={setValue} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-formatter" title="Custom formatter">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <SliderField
                label="Discount"
                value={formatted()}
                onChange={setFormatted}
                formatValue={(v) => `${v}%`}
              />
            </div>
            <CodeBlock
              code={`<SliderField
  label="Discount"
  value={value()}
  onChange={setValue}
  formatValue={(v) => \`\${v}%\`}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="min-max-step" title="Min/Max/Step">
          <Flex direction="col" gap="md">
            <div class="w-80">
              <SliderField
                label="Temperature"
                value={stepped()}
                onChange={setStepped}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <CodeBlock
              code={`<SliderField
  label="Temperature"
  value={value()}
  onChange={setValue}
  min={0}
  max={100}
  step={5}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <div class="w-80 space-y-4">
              <SliderField label="Primary" value={colorVal()} onChange={setColorVal} color="primary" />
              <SliderField label="Secondary" value={colorVal()} onChange={setColorVal} color="secondary" />
              <SliderField label="Accent" value={colorVal()} onChange={setColorVal} color="accent" />
              <SliderField label="Success" value={colorVal()} onChange={setColorVal} color="success" />
              <SliderField label="Warning" value={colorVal()} onChange={setColorVal} color="warning" />
              <SliderField label="Error" value={colorVal()} onChange={setColorVal} color="error" />
              <SliderField label="Info" value={colorVal()} onChange={setColorVal} color="info" />
            </div>
            <CodeBlock
              code={`<SliderField label="Primary" value={value()} onChange={setValue} color="primary" />
<SliderField label="Secondary" value={value()} onChange={setValue} color="secondary" />
<SliderField label="Accent" value={value()} onChange={setValue} color="accent" />
<SliderField label="Success" value={value()} onChange={setValue} color="success" />
<SliderField label="Warning" value={value()} onChange={setValue} color="warning" />
<SliderField label="Error" value={value()} onChange={setValue} color="error" />
<SliderField label="Info" value={value()} onChange={setValue} color="info" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={sliderFieldProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
