import { Icon } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface GlassSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

const numberFromToken = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function GlassSection(props: GlassSectionProps) {
  const glassBlur = () => numberFromToken(props.theme["--glass-blur"], 11);
  const glassOpacity = () =>
    numberFromToken(props.theme["--glass-background-opacity"], 38);
  const glassBorderOpacity = () =>
    numberFromToken(props.theme["--glass-border-opacity"], 30);
  const glassDepth = () =>
    numberFromToken(props.theme["--glass-refraction-depth"], 5);

  const updateDepth = (value: number) => {
    props.onThemeUpdate("--glass-refraction-depth", `${value}px`);
    props.onThemeUpdate("--glass-depth-sheen-opacity", `${Math.min(80, 20 + value * 2)}%`);
    props.onThemeUpdate("--glass-depth-sheen-size", `${Math.min(85, 45 + value)}%`);
    props.onThemeUpdate(
      "--glass-depth-surface-opacity",
      `${Math.min(24, 4 + value * 0.6)}%`,
    );
    props.onThemeUpdate(
      "--glass-depth-surface-size",
      `${Math.min(94, 70 + value * 0.8)}%`,
    );
  };

  return (
    <div class="w-full">
      <h3 class="divider divider-start text-xs">
        <span class="flex gap-1.5">
          <Icon name="icon-[mdi--blur]" width={16} height={16} class="opacity-40" />
          Glass
        </span>
      </h3>

      <div class="flex flex-col gap-2">
        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Blur</span>
            <span class="text-base-content/50 font-mono text-xs">{glassBlur()}px</span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={48}
            step={1}
            value={glassBlur()}
            onInput={(event) =>
              props.onThemeUpdate("--glass-blur", `${event.currentTarget.value}px`)
            }
          />
        </label>

        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Surface opacity</span>
            <span class="text-base-content/50 font-mono text-xs">
              {(glassOpacity() / 100).toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={80}
            step={1}
            value={glassOpacity()}
            onInput={(event) =>
              props.onThemeUpdate(
                "--glass-background-opacity",
                `${event.currentTarget.value}%`,
              )
            }
          />
        </label>

        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Border opacity</span>
            <span class="text-base-content/50 font-mono text-xs">
              {(glassBorderOpacity() / 100).toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={80}
            step={1}
            value={glassBorderOpacity()}
            onInput={(event) =>
              props.onThemeUpdate(
                "--glass-border-opacity",
                `${event.currentTarget.value}%`,
              )
            }
          />
        </label>

        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Depth</span>
            <span class="text-base-content/50 font-mono text-xs">{glassDepth()}px</span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={30}
            step={1}
            value={glassDepth()}
            onInput={(event) => updateDepth(Number(event.currentTarget.value))}
          />
        </label>
      </div>
    </div>
  );
}
