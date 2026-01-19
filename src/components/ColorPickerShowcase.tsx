import ShowcaseLayout from "./ShowcaseLayout";
import { Flex } from "@pathscale/ui";
import ColorPicker from "./colorpicker/ColorPicker";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal } from "solid-js";

export default function ColorPickerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "formats", title: "Formats" },
    { id: "modes", title: "Modes" },
    { id: "swatches", title: "Swatches" },
    { id: "alpha", title: "Alpha" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "value",
      type: "string",
      description:
        "Current color value (e.g. '#FFFFFF', 'rgb(255, 255, 255)').",
    },
    {
      name: "onChange",
      type: "(color: string) => void",
      description: "Callback fired when the color value changes.",
    },
    {
      name: "format",
      type: "'hex' | 'rgb' | 'hsl'",
      description: "Output color format. Default is 'hex'.",
    },
    {
      name: "initialMode",
      type: "'picker' | 'wheel'",
      description: "Initial picker mode. Default is 'picker'.",
    },
    {
      name: "showAlpha",
      type: "boolean",
      description: "Enable alpha (opacity) adjustment.",
    },
    {
      name: "swatches",
      type: "string[]",
      description: "List of preset colors displayed below the picker.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable the ColorPicker.",
    },
    {
      name: "placement",
      type: "'top' | 'bottom' | 'left' | 'right'",
      description: "Popover placement relative to the trigger.",
    },
  ];

  // ===== Signals =====
  const [color1, setColor1] = createSignal("#FF6B6B");
  const [color2, setColor2] = createSignal("rgb(78, 205, 196)");
  const [color3, setColor3] = createSignal("hsl(180, 50%, 50%)");

  const [pickerColor, setPickerColor] = createSignal("#4D96FF");
  const [wheelColor, setWheelColor] = createSignal("#6BCB77");

  const [swatchColor, setSwatchColor] = createSignal("#FF0000");

  const [alphaColor, setAlphaColor] = createSignal("rgba(255, 107, 107, 0.5)");

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
            By default, the ColorPicker displays a color preview. Clicking it
            opens the color selection panel.
          </p>
          <Flex direction="col" gap="md">
            <ColorPicker value={color1()} onChange={setColor1} />
            <span class="text-xs font-mono">{color1()}</span>
            <CodeBlock
              code={`const [color, setColor] = createSignal("#FF6B6B");

<ColorPicker value={color()} onChange={setColor} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="formats" title="Formats">
          <p class="mb-4 text-base-content/70">
            Supports common color formats such as HEX, RGB, and HSL.
          </p>
          <Flex direction="col" gap="lg">
            <Flex direction="col" gap="sm">
              <span class="text-xs font-semibold uppercase">RGB</span>
              <ColorPicker format="rgb" value={color2()} onChange={setColor2} />
              <span class="text-xs font-mono">{color2()}</span>
            </Flex>

            <Flex direction="col" gap="sm">
              <span class="text-xs font-semibold uppercase">HSL</span>
              <ColorPicker format="hsl" value={color3()} onChange={setColor3} />
              <span class="text-xs font-mono">{color3()}</span>
            </Flex>

            <CodeBlock
              code={`<ColorPicker format="rgb" value={rgb()} onChange={setRgb} />
<ColorPicker format="hsl" value={hsl()} onChange={setHsl} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="modes" title="Modes">
          <p class="mb-4 text-base-content/70">
            Two color selection modes: picker and wheel.
          </p>
          <Flex gap="xl">
            <Flex direction="col" gap="sm">
              <span class="text-xs font-semibold uppercase">Picker</span>
              <ColorPicker
                initialMode="picker"
                value={pickerColor()}
                onChange={setPickerColor}
              />
              <span class="text-xs font-mono">{pickerColor()}</span>
            </Flex>

            <Flex direction="col" gap="sm">
              <span class="text-xs font-semibold uppercase">Wheel</span>
              <ColorPicker
                initialMode="wheel"
                value={wheelColor()}
                onChange={setWheelColor}
              />
              <span class="text-xs font-mono">{wheelColor()}</span>
            </Flex>
          </Flex>

          <CodeBlock
            code={`<ColorPicker
  initialMode="picker"
  value={pickerColor()}
  onChange={setPickerColor}
/>

<ColorPicker
  initialMode="wheel"
  value={wheelColor()}
  onChange={setWheelColor}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="swatches" title="Swatches">
          <p class="mb-4 text-base-content/70">
            Preset color palette for faster selection.
          </p>
          <ColorPicker
            value={swatchColor()}
            onChange={setSwatchColor}
            swatches={[
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#FF00FF",
              "#00FFFF",
            ]}
          />
          <p class="text-xs font-mono">{swatchColor()}</p>
          <CodeBlock
            code={`<ColorPicker
  value={swatchColor()}
  onChange={setSwatchColor}
  swatches={[
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ]}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alpha" title="Alpha">
          <p class="mb-4 text-base-content/70">
            Enable opacity control with alpha slider.
          </p>
          <ColorPicker
            showAlpha
            format="rgba"
            value={alphaColor()}
            onChange={setAlphaColor}
          />
          <p class="text-xs font-mono">{alphaColor()}</p>
          <CodeBlock
            code={`<ColorPicker
  showAlpha
  format="rgba"
  value={alphaColor()}
  onChange={setAlphaColor}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <p class="mb-4 text-base-content/70">
            Prevents interaction with the ColorPicker.
          </p>
          <ColorPicker disabled value={disabledColor()} />
          <CodeBlock
            code={`<ColorPicker
  disabled
  value="#888888"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
