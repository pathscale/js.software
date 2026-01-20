import { createMemo, createSignal, type ParentComponent } from "solid-js";
import {
  AlphaSlider,
  ColorInput,
  ColorPickerContext,
  ColorPickerFlowerSelector,
  ColorPickerGradientSelector,
  ColorPickerWheelSelector,
  ColorPreview,
  ColorSwatches,
  ColorWheel,
  ColorWheelFlower,
  HueSlider,
  LightnessSlider,
  SaturationBrightness,
  useColorPickerContext,
  type ColorFormat,
  type ColorPickerContextType,
  type ColorValue,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

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

function hexToRgb(hex: string): RGB | null {
  const cleaned = hex.replace(/^#/, "");

  if (cleaned.length === 3) {
    return {
      r: Number.parseInt(cleaned[0] + cleaned[0], 16),
      g: Number.parseInt(cleaned[1] + cleaned[1], 16),
      b: Number.parseInt(cleaned[2] + cleaned[2], 16),
    };
  }

  if (cleaned.length === 6) {
    return {
      r: Number.parseInt(cleaned.substring(0, 2), 16),
      g: Number.parseInt(cleaned.substring(2, 4), 16),
      b: Number.parseInt(cleaned.substring(4, 6), 16),
    };
  }

  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(value))).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const hueToRgb = (p: number, q: number, t: number) => {
    let temp = t;
    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 0.5) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  };

  if (sNorm === 0) {
    const gray = Math.round(255 * lNorm);
    return { r: gray, g: gray, b: gray };
  }

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  return {
    r: Math.round(255 * hueToRgb(p, q, hNorm + 1 / 3)),
    g: Math.round(255 * hueToRgb(p, q, hNorm)),
    b: Math.round(255 * hueToRgb(p, q, hNorm - 1 / 3)),
  };
}

function parseColor(value: string): ColorValue | null {
  const trimmed = value.trim();

  if (trimmed.startsWith("#")) {
    const rgb = hexToRgb(trimmed);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      rgb: { ...rgb, a: 1 },
      hsl: { ...hsl, a: 1 },
      hex: trimmed,
    };
  }

  const rgbMatch = trimmed.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/,
  );
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1], 10);
    const g = Number.parseInt(rgbMatch[2], 10);
    const b = Number.parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1;
    const hsl = rgbToHsl(r, g, b);
    return {
      rgb: { r, g, b, a },
      hsl: { ...hsl, a },
      hex: rgbToHex(r, g, b),
    };
  }

  const hslMatch = trimmed.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)/,
  );
  if (hslMatch) {
    const h = Number.parseFloat(hslMatch[1]);
    const s = Number.parseFloat(hslMatch[2]);
    const l = Number.parseFloat(hslMatch[3]);
    const a = hslMatch[4] ? Number.parseFloat(hslMatch[4]) : 1;
    const rgb = hslToRgb(h, s, l);
    return {
      rgb: { ...rgb, a },
      hsl: { h, s, l, a },
      hex: rgbToHex(rgb.r, rgb.g, rgb.b),
    };
  }

  return null;
}

function formatColor(color: ColorValue, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return color.hex;
    case "rgb":
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case "rgba":
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    case "hsl":
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    case "hsla":
      return `hsla(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%, ${color.hsl.a})`;
    default:
      return color.hex;
  }
}

function getDefaultColor(): ColorValue {
  return {
    rgb: { r: 255, g: 255, b: 255, a: 1 },
    hsl: { h: 0, s: 0, l: 100, a: 1 },
    hex: "#ffffff",
  };
}

interface ColorPickerProviderProps {
  value: string;
  onChange: (color: string) => void;
  format?: ColorFormat;
  disabled?: boolean;
}

const ColorPickerProvider: ParentComponent<ColorPickerProviderProps> = (props) => {
  const color = createMemo(() => {
    return parseColor(props.value || "#ffffff") || getDefaultColor();
  });
  const [currentFormat, setCurrentFormat] = createSignal<ColorFormat>(
    props.format || "hex",
  );

  const handleColorChange = (nextColor: ColorValue) => {
    props.onChange(formatColor(nextColor, currentFormat()));
  };

  const handleFormatChange = (nextFormat: ColorFormat) => {
    setCurrentFormat(nextFormat);
    props.onChange(formatColor(color(), nextFormat));
  };

  const contextValue: ColorPickerContextType = {
    color,
    format: currentFormat,
    disabled: () => props.disabled || false,
    onChange: handleColorChange,
    onFormatChange: handleFormatChange,
  };

  return (
    <ColorPickerContext.Provider value={contextValue}>
      {props.children}
    </ColorPickerContext.Provider>
  );
};

function ColorPreviewRow() {
  const context = useColorPickerContext();

  return (
    <div class="flex items-center gap-3">
      <ColorPreview
        color={context.color()}
        disabled={context.disabled()}
      />
      <span class="text-xs font-mono">{formatColor(context.color(), context.format())}</span>
    </div>
  );
}

interface PickerPanelProps {
  title: string;
  value: string;
  onChange: (color: string) => void;
  format?: ColorFormat;
  disabled?: boolean;
  showAlpha?: boolean;
  swatches?: string[];
}

const PickerPanel: ParentComponent<PickerPanelProps> = (props) => (
  <ColorPickerProvider
    value={props.value}
    onChange={props.onChange}
    format={props.format}
    disabled={props.disabled}
  >
    <div class="space-y-4 rounded-lg border border-base-300 bg-base-100 p-4">
      <span class="text-xs font-semibold uppercase tracking-wide text-base-content/70">
        {props.title}
      </span>
      <ColorPreviewRow />
      <div class="space-y-4">{props.children}</div>
      {props.showAlpha ? <AlphaSlider /> : null}
      <ColorInput />
      {props.swatches ? <ColorSwatches swatches={props.swatches} /> : null}
    </div>
  </ColorPickerProvider>
);

export default function ColorPickerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "composition", title: "Composition" },
    { id: "selectors", title: "Selector Components" },
    { id: "wheel-flower", title: "Wheel And Flower" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const contextValueProps = [
    {
      name: "color",
      type: "Accessor<ColorValue>",
      description: "Current color state provided to child controls.",
    },
    {
      name: "format",
      type: "Accessor<ColorFormat>",
      description: "Current output format (hex, rgb, rgba, hsl, hsla).",
    },
    {
      name: "disabled",
      type: "Accessor<boolean>",
      description: "Disables interactive child components when true.",
    },
    {
      name: "onChange",
      type: "(color: ColorValue) => void",
      description: "Updates the ColorValue in response to user input.",
    },
    {
      name: "onFormatChange",
      type: "(format: ColorFormat) => void",
      description: "Updates the output format used by inputs/readouts.",
    },
  ];

  const previewProps = [
    {
      name: "color",
      type: "ColorValue",
      required: true,
      description: "Color data to preview.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables the preview interaction.",
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Optional click handler for the preview button.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional wrapper classes.",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for class.",
    },
  ];

  const inputProps = [
    {
      name: "class",
      type: "string",
      description: "Additional wrapper classes.",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for class.",
    },
  ];

  const swatchesProps = [
    {
      name: "swatches",
      type: "string[]",
      required: true,
      description: "Array of preset colors.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional wrapper classes.",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for class.",
    },
  ];

  const controlProps = [
    {
      name: "class",
      type: "string",
      description: "Optional classes for the control wrapper.",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for class.",
    },
  ];

  const selectorProps = [
    {
      name: "(none)",
      type: "-",
      description: "Selector components read from ColorPickerContext.",
    },
  ];

  const [manualGradient, setManualGradient] = createSignal(
    "rgba(255, 107, 107, 0.7)",
  );
  const [selectorGradient, setSelectorGradient] = createSignal("#4D96FF");
  const [selectorWheel, setSelectorWheel] = createSignal("#6BCB77");
  const [selectorFlower, setSelectorFlower] = createSignal("#FFD93D");
  const [wheelManual, setWheelManual] = createSignal("#845EC2");
  const [flowerManual, setFlowerManual] = createSignal("#FF9671");
  const [disabledColor, setDisabledColor] = createSignal("#888888");

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

        <ShowcaseSection id="composition" title="Composition">
          <p class="mb-4 text-base-content/70">
            The color picker is now composable. Use ColorPickerContext with the
            individual building blocks to create your own layout. The examples
            below use a small ColorPickerProvider helper (defined in this
            showcase) to wire up the context.
          </p>
          <div class="grid gap-6 md:grid-cols-2">
            <PickerPanel
              title="Manual Gradient"
              value={manualGradient()}
              onChange={setManualGradient}
              format="rgba"
              showAlpha
              swatches={DEFAULT_SWATCHES}
            >
              <SaturationBrightness />
              <HueSlider />
            </PickerPanel>
            <PickerPanel
              title="Gradient Selector"
              value={selectorGradient()}
              onChange={setSelectorGradient}
            >
              <ColorPickerGradientSelector />
            </PickerPanel>
          </div>
          <CodeBlock
            code={`const [color, setColor] = createSignal("rgba(255, 107, 107, 0.7)");

<ColorPickerProvider value={color()} onChange={setColor} format="rgba">
  <SaturationBrightness />
  <HueSlider />
  <AlphaSlider />
  <ColorInput />
  <ColorSwatches swatches={DEFAULT_SWATCHES} />
</ColorPickerProvider>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="selectors" title="Selector Components">
          <p class="mb-4 text-base-content/70">
            Prefer prebuilt selectors? Use the dedicated selector components for
            gradient, wheel, or flower layouts.
          </p>
          <div class="grid gap-6 md:grid-cols-2">
            <PickerPanel
              title="Wheel Selector"
              value={selectorWheel()}
              onChange={setSelectorWheel}
            >
              <ColorPickerWheelSelector />
            </PickerPanel>
            <PickerPanel
              title="Flower Selector"
              value={selectorFlower()}
              onChange={setSelectorFlower}
            >
              <div class="flex flex-col items-center gap-4 w-full">
                <ColorPickerFlowerSelector />
              </div>
            </PickerPanel>
          </div>
          <CodeBlock
            code={`<ColorPickerProvider value={color()} onChange={setColor}>
  <ColorPickerWheelSelector />
  <ColorInput />
</ColorPickerProvider>

<ColorPickerProvider value={color()} onChange={setColor}>
  <div class="flex flex-col items-center gap-4 w-full">
    <ColorPickerFlowerSelector />
  </div>
  <ColorInput />
</ColorPickerProvider>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="wheel-flower" title="Wheel And Flower">
          <p class="mb-4 text-base-content/70">
            Build custom wheel layouts with the lower level wheel components.
            Pair them with LightnessSlider and ColorInput for a full control
            stack.
          </p>
          <div class="grid gap-6 md:grid-cols-2">
            <PickerPanel
              title="Wheel + Lightness"
              value={wheelManual()}
              onChange={setWheelManual}
            >
              <ColorWheel />
              <LightnessSlider />
            </PickerPanel>
            <PickerPanel
              title="Flower + Lightness"
              value={flowerManual()}
              onChange={setFlowerManual}
            >
              <div class="flex flex-col items-center gap-4 w-full">
                <ColorWheelFlower />
                <LightnessSlider />
              </div>
            </PickerPanel>
          </div>
          <CodeBlock
            code={`<ColorPickerProvider value={color()} onChange={setColor}>
  <ColorWheel />
  <LightnessSlider />
  <ColorInput />
</ColorPickerProvider>

<ColorPickerProvider value={color()} onChange={setColor}>
  <div class="flex flex-col items-center gap-4 w-full">
    <ColorWheelFlower />
    <LightnessSlider />
  </div>
  <ColorInput />
</ColorPickerProvider>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <p class="mb-4 text-base-content/70">
            Disable the entire picker by setting disabled on the provider. All
            child components will respect it.
          </p>
          <PickerPanel
            title="Disabled"
            value={disabledColor()}
            onChange={setDisabledColor}
            disabled
          >
            <ColorPickerGradientSelector />
          </PickerPanel>
          <CodeBlock
            code={`<ColorPickerProvider value={color()} onChange={setColor} disabled>
  <ColorPickerGradientSelector />
  <ColorInput />
</ColorPickerProvider>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <div class="space-y-8">
            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorPickerContext Value
              </h3>
              <PropsTable props={contextValueProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorPreview
              </h3>
              <PropsTable props={previewProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorInput
              </h3>
              <PropsTable props={inputProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                ColorSwatches
              </h3>
              <PropsTable props={swatchesProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                Controls With Class Props
              </h3>
              <p class="text-sm text-base-content/70">
                Applies to SaturationBrightness, HueSlider, LightnessSlider,
                AlphaSlider, ColorWheel, and ColorWheelFlower.
              </p>
              <PropsTable props={controlProps} />
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                Selector Components
              </h3>
              <p class="text-sm text-base-content/70">
                ColorPickerGradientSelector, ColorPickerWheelSelector, and
                ColorPickerFlowerSelector take no props.
              </p>
              <PropsTable props={selectorProps} />
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
