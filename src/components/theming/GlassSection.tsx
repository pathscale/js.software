import { Button, Icon } from "@pathscale/ui";
import {
  BLUR_MAX,
  DEPTH_MAX,
  HYPE4_DEFAULTS,
  REFRACTION_MAX,
  resolveGlassCssVariables,
  tuningFromTheme,
} from "../../lib/glassFormulas";
import { Theme } from "../../utils/themeUtils";

interface GlassSectionProps {
  theme: Theme;
  onThemeUpdate: (key: string, value: string) => void;
}

export default function GlassSection(props: GlassSectionProps) {
  const tuning = () => tuningFromTheme(props.theme);

  const applyTuning = (
    next: Partial<{ blur: number; refraction: number; depth: number }>,
  ) => {
    const current = tuning();
    const merged = {
      blur: next.blur ?? current.blur,
      refraction: next.refraction ?? current.refraction,
      depth: next.depth ?? current.depth,
    };
    const cssVars = resolveGlassCssVariables(merged);
    for (const [key, value] of Object.entries(cssVars)) {
      props.onThemeUpdate(key, value);
    }
  };

  const resetToHype4 = () => applyTuning(HYPE4_DEFAULTS);

  return (
    <div class="w-full">
      <h3 class="divider divider-start text-xs">
        <span class="flex items-center gap-1.5">
          <Icon src="mdi--blur" width={16} height={16} class="opacity-40" />
          Glass
          <Button
            size="sm"
            variant="ghost"
            class="ml-auto"
            onClick={resetToHype4}
            title="Reset to Hype4 defaults"
          >
            Hype4
          </Button>
        </span>
      </h3>

      <div class="flex flex-col gap-2">
        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Blur</span>
            <span class="text-base-content/50 font-mono text-xs">
              {tuning().blur}px
            </span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={BLUR_MAX}
            step={1}
            value={tuning().blur}
            onInput={(event) =>
              applyTuning({ blur: Number(event.currentTarget.value) })
            }
          />
        </label>

        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Refraction</span>
            <span class="text-base-content/50 font-mono text-xs">
              {tuning().refraction.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={REFRACTION_MAX}
            step={0.01}
            value={tuning().refraction}
            onInput={(event) =>
              applyTuning({ refraction: Number(event.currentTarget.value) })
            }
          />
        </label>

        <label class="bg-base-200 rounded-box flex flex-col gap-1 p-2">
          <span class="flex items-center justify-between gap-2">
            <span class="text-base-content/70 text-xs">Depth</span>
            <span class="text-base-content/50 font-mono text-xs">
              {tuning().depth}
            </span>
          </span>
          <input
            type="range"
            class="range range-xs"
            min={0}
            max={DEPTH_MAX}
            step={1}
            value={tuning().depth}
            onInput={(event) =>
              applyTuning({ depth: Number(event.currentTarget.value) })
            }
          />
        </label>
      </div>
    </div>
  );
}
