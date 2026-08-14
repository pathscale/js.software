import { createSignal, For } from "solid-js";
import { ColorSwatch, Flex } from "@pathscale/ui";
import { ColorPicker, ColorArea, ColorField, ColorSlider, ColorSwatchPicker, ColorWheelFlower } from "@pathscale/ui/lab";
import ShowcaseLayout from "./ShowcaseLayout";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const DEFAULT_SWATCHES = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#845EC2",
  "#FF9671",
  "#00C9A7",
  "#F9F871",
];

export default function ColorPickerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "custom-composition", title: "Custom Composition" },
    { id: "with-alpha", title: "With Alpha Slider" },
    { id: "swatch-picker", title: "Swatch Picker" },
    { id: "wheel-flower", title: "Wheel Flower" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const rootProps = [
    {
      name: "value",
      type: "string",
      description: "Controlled color value (hex or rgba)",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Default color value when uncontrolled",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Fires whenever the color changes",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables every nested picker control",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Override the default Area + Slider + Field composition",
    },
  ];

  const compoundParts = [
    {
      name: "ColorPicker.Area",
      type: "Component",
      description: "Saturation/brightness picker. Wraps <ColorArea> with context binding.",
    },
    {
      name: 'ColorPicker.Slider type="hue"',
      type: "Component",
      description: "Hue slider bound to ColorPicker state",
    },
    {
      name: 'ColorPicker.Slider type="alpha"',
      type: "Component",
      description: "Alpha slider bound to ColorPicker state",
    },
    {
      name: "ColorPicker.Field",
      type: "Component",
      description: "Text input for entering colors by hex/rgb/hsl",
    },
  ];

  const swatchPickerProps = [
    { name: "value", type: "string", description: "Selected color" },
    { name: "defaultValue", type: "string", description: "Default selected color" },
    { name: "onChange", type: "(value: string) => void", description: "Selection callback" },
    { name: "isDisabled", type: "boolean", description: "Disables all swatches" },
  ];

  const wheelFlowerProps = [
    { name: "(provider-based)", type: "-", description: "Reads from its own internal ColorPickerContext; see component source for advanced wiring." },
  ];

  const [defaultColor, setDefaultColor] = createSignal("#3B82F6");
  const [customColor, setCustomColor] = createSignal("#FFD93D");
  const [alphaColor, setAlphaColor] = createSignal("rgba(255, 107, 107, 0.5)");
  const [swatchColor, setSwatchColor] = createSignal("#4D96FF");
  const [disabledColor] = createSignal("#888888");

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

        <ShowcaseSection id="default" title="Default">
          <p class="mb-4 text-base-content/70">
            The default ColorPicker renders an area, hue slider, and field
            without extra wiring.
          </p>
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm">
              <ColorPicker value={defaultColor()} onChange={setDefaultColor} />
              <p class="mt-3 text-xs font-mono">{defaultColor()}</p>
            </div>
            <CodeBlock
              code={`const [color, setColor] = createSignal("#3B82F6");

<ColorPicker value={color()} onChange={setColor} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-composition" title="Custom Composition">
          <p class="mb-4 text-base-content/70">
            Provide custom children to ColorPicker to control the layout.
          </p>
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm">
              <ColorPicker value={customColor()} onChange={setCustomColor}>
                <Flex direction="col" gap="md">
                  <ColorPicker.Area />
                  <ColorPicker.Slider type="hue" />
                  <ColorPicker.Field />
                </Flex>
              </ColorPicker>
              <p class="mt-3 text-xs font-mono">{customColor()}</p>
            </div>
            <CodeBlock
              code={`<ColorPicker value={color()} onChange={setColor}>
  <Flex direction="col" gap="md">
    <ColorPicker.Area />
    <ColorPicker.Slider type="hue" />
    <ColorPicker.Field />
  </Flex>
</ColorPicker>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-alpha" title="With Alpha Slider">
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm">
              <ColorPicker value={alphaColor()} onChange={setAlphaColor}>
                <Flex direction="col" gap="md">
                  <ColorPicker.Area />
                  <ColorPicker.Slider type="hue" />
                  <ColorPicker.Slider type="alpha" />
                  <ColorPicker.Field />
                </Flex>
              </ColorPicker>
              <p class="mt-3 text-xs font-mono">{alphaColor()}</p>
            </div>
            <CodeBlock
              code={`<ColorPicker value={color()} onChange={setColor}>
  <Flex direction="col" gap="md">
    <ColorPicker.Area />
    <ColorPicker.Slider type="hue" />
    <ColorPicker.Slider type="alpha" />
    <ColorPicker.Field />
  </Flex>
</ColorPicker>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="swatch-picker" title="Swatch Picker">
          <p class="mb-4 text-base-content/70">
            ColorSwatchPicker exposes a controlled grid of preset colors.
          </p>
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm">
              <ColorSwatchPicker value={swatchColor()} onChange={setSwatchColor}>
                <Flex gap="sm" wrap="wrap">
                  <For each={DEFAULT_SWATCHES}>
                    {(color) => <ColorSwatch color={color} />}
                  </For>
                </Flex>
              </ColorSwatchPicker>
              <p class="mt-3 text-xs font-mono">{swatchColor()}</p>
            </div>
            <CodeBlock
              code={`<ColorSwatchPicker value={swatchColor()} onChange={setSwatchColor}>
  <Flex gap="sm" wrap="wrap">
    <For each={DEFAULT_SWATCHES}>
      {(color) => <ColorSwatch color={color} />}
    </For>
  </Flex>
</ColorSwatchPicker>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="wheel-flower" title="Wheel Flower">
          <p class="mb-4 text-base-content/70">
            ColorWheelFlower renders a flower-style hue/saturation picker. It
            relies on its own internal context provider, so it can be dropped in
            standalone.
          </p>
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm flex justify-center">
              <ColorWheelFlower />
            </div>
            <CodeBlock code={`<ColorWheelFlower />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <div class="rounded-lg border border-base-300 bg-base-100 p-4 max-w-sm">
              <ColorPicker value={disabledColor()} state="disabled" />
              <p class="mt-3 text-xs font-mono">{disabledColor()}</p>
            </div>
            <CodeBlock code={`<ColorPicker value={color()} state="disabled" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <div class="space-y-8">
            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorPicker (Root)
              </h3>
              <PropsTable props={rootProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                Compound Parts
              </h3>
              <PropsTable props={compoundParts} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorSwatchPicker
              </h3>
              <PropsTable props={swatchPickerProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorWheelFlower
              </h3>
              <PropsTable props={wheelFlowerProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                Standalone Building Blocks
              </h3>
              <p class="text-sm text-base-content/70">
                ColorArea, ColorSlider, ColorField, and ColorSwatch can be used
                outside of ColorPicker. See their dedicated showcases.
              </p>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
