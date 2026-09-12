import { Button, ComplexColorWheel, Flex } from "@pathscale/ui";
import { createMemo, For } from "solid-js";
import { hexToOklch, Theme, updateThemeColor } from "../../utils/themeUtils";
import {
  accentOptions,
  artworkAccentOptions,
  applyCompositionWithAccentHarmony,
  applyThemeComposition,
  compositionFromTheme,
  SOFTNESS_STOPS,
  STRENGTH_STOPS,
  surfaceColors,
  surfaceTone,
  TEXT_BRIGHTNESS_STOPS,
  type ThemeComposition,
} from "../../lib/themeComposer";

interface ThemeComposerProps {
  theme: Theme;
  onThemeChange: (theme: Theme, message: string) => void;
  onReset: () => void;
}

const parseOklch = (value: string) => {
  const canonical = value.trim().startsWith("#") ? hexToOklch(value) : value;
  const match = canonical.match(
    /^oklch\(\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))%\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))/i,
  );
  if (!match) return null;
  return {
    lightness: Number(match[1]),
    chroma: Number(match[2]),
    hue: Number(match[3]),
  };
};

const colorsMatch = (stored: string, swatch: string) => {
  const left = parseOklch(stored);
  const right = parseOklch(swatch);
  if (!left || !right) return stored.trim().toLowerCase() === swatch.trim().toLowerCase();

  // updateThemeColor stores whole lightness/hue values and three chroma
  // decimals. Compare within that quantization instead of round-tripping to a
  // hex value that can move by several RGB channels.
  const hueDelta = Math.abs(left.hue - right.hue) % 360;
  const hueDistance = Math.min(hueDelta, 360 - hueDelta);
  return (
    Math.abs(left.lightness - right.lightness) <= 0.51 &&
    Math.abs(left.chroma - right.chroma) <= 0.001 &&
    hueDistance <= 1
  );
};

const storedSelection = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < 7
    ? parsed
    : undefined;
};

function AccentSelector(props: {
  id: string;
  label: string;
  hint: string;
  value: string;
  options: readonly string[];
  selectedIndex?: number;
  onPick: (value: string) => void;
}) {
  return (
    <div class="flex flex-col gap-1.5">
      <div class="flex items-baseline gap-2">
        <span class="font-semibold text-base-content/70 text-xs uppercase tracking-[.04em]">
          {props.label}
        </span>
        <span class="text-base-content/60 text-xs">{props.hint}</span>
      </div>
      <Flex align="center" gap="sm">
        <For each={props.options}>
          {(option, index) => {
            const selected = () =>
              props.selectedIndex === undefined
                ? colorsMatch(props.value, option)
                : props.selectedIndex === index();
            return (
              <Button
                id={`${props.id}-${index()}`}
                type="button"
                aria-label={`${props.label} ${index() + 1}`}
                title={`${props.label} ${index() + 1}`}
                aria-pressed={selected() ? "true" : "false"}
                onClick={() => props.onPick(option)}
                class={`size-7 overflow-hidden rounded-full border-2 p-0 transition-[border-color,transform] hover:scale-110 ${
                  selected()
                    ? "border-base-content ring-2 ring-base-100 ring-inset"
                    : "border-base-300 hover:border-base-content"
                }`}
              >
                <span
                  aria-hidden="true"
                  class="block size-full rounded-full"
                  style={{ "background-color": option }}
                />
              </Button>
            );
          }}
        </For>
      </Flex>
    </div>
  );
}

export default function ThemeComposer(props: ThemeComposerProps) {
  const mode = createMemo(() =>
    props.theme._themeType === "dark" ? "dark" : "light",
  );
  const composition = createMemo(() => compositionFromTheme(props.theme));
  const palette = createMemo(() => surfaceColors(mode()));
  const controlFriends = createMemo(() =>
    accentOptions(
      composition().surface,
      mode(),
      composition().strength,
      composition().softness,
    ),
  );
  const artworkFriends = createMemo(() =>
    artworkAccentOptions(
      composition().surface,
      mode(),
      composition().strength,
      composition().softness,
    ),
  );

  const commitComposition = (patch: Partial<ThemeComposition>, message: string) =>
    props.onThemeChange(applyCompositionWithAccentHarmony(props.theme, patch), message);

  const adjustments = createMemo(() => [
    {
      id: "strength",
      label: "Colour strength",
      hint: "How far the picked colour reaches into the surfaces",
      stops: STRENGTH_STOPS,
      value: composition().strength,
      onChange: (value: number) => commitComposition({ strength: value }, "Surface strength updated"),
      preview: (value: number) =>
        surfaceTone({ ...composition(), strength: value }, mode(), 1),
      formatValue: (value: number) => `${value}%`,
    },
    {
      id: "softness",
      label: "Softness",
      hint: "Lifts surfaces away from the light or dark edge",
      stops: SOFTNESS_STOPS,
      value: composition().softness,
      onChange: (value: number) => commitComposition({ softness: value }, "Surface softness updated"),
      preview: (value: number) =>
        surfaceTone({ ...composition(), softness: value }, mode(), 1),
      formatValue: (value: number) => `${Math.round((value / 12) * 100)}%`,
    },
    {
      id: "text-brightness",
      label: "Text brightness",
      hint: "Moves body text toward its strongest contrast",
      stops: TEXT_BRIGHTNESS_STOPS,
      value: composition().textBrightness,
      onChange: (value: number) =>
        commitComposition({ textBrightness: value }, "Text brightness updated"),
      preview: () => props.theme["--color-base-200"],
      ink: (value: number) =>
        applyThemeComposition(props.theme, { textBrightness: value })["--color-base-content"],
      formatValue: (value: number) => `${value > 0 ? "+" : ""}${value}`,
    },
  ]);

  return (
    <section aria-label="Theme colour composition" class="flex w-full flex-col gap-3">
      <ComplexColorWheel
        id="theme-composer-surface"
        value={composition().surface}
        onChange={(surface) => commitComposition({ surface }, "Surface colour updated")}
        mode={mode()}
        palette={palette()}
        aria-label="Surface colour"
        adjustments={adjustments()}
        layout="stacked"
        material="solid"
        action={
          <Button
            id="theme-composer-reset"
            type="button"
            size="sm"
            variant="outline"
            onClick={props.onReset}
          >
            Reset
          </Button>
        }
      />

      <div class="flex flex-col gap-3 px-1">
        <AccentSelector
          id="theme-control-accent"
          label="Control accent"
          hint="Buttons, focus rings, active tabs"
          value={props.theme["--color-primary"]}
          options={controlFriends()}
          selectedIndex={storedSelection(props.theme._controlAccentIndex)}
          onPick={(value) =>
            props.onThemeChange(
              {
                ...updateThemeColor(props.theme, "--color-primary", value),
                _controlAccentIndex: `${controlFriends().indexOf(value)}`,
              },
              "Control accent updated",
            )
          }
        />
        <AccentSelector
          id="theme-art-accent"
          label="Artwork accent"
          hint="Icons and decorative emphasis"
          value={props.theme["--color-accent"]}
          options={artworkFriends()}
          selectedIndex={storedSelection(props.theme._artAccentIndex)}
          onPick={(value) =>
            props.onThemeChange(
              {
                ...updateThemeColor(props.theme, "--color-accent", value),
                _artAccentIndex: `${artworkFriends().indexOf(value)}`,
              },
              "Artwork accent updated",
            )
          }
        />
      </div>
    </section>
  );
}
