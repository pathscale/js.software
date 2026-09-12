import { Button, Icon, Separator, Slider } from "@pathscale/ui";
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
  onThemeUpdate: (values: Record<string, string>) => void;
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
    props.onThemeUpdate(cssVars);
  };

  const resetToHype4 = () => applyTuning(HYPE4_DEFAULTS);

  return (
    <div class="w-full">
      <h3 class="flex items-center gap-3 opacity-70 text-xs"><span><span class="flex items-center gap-1.5">
          <Icon src="mdi--blur" width={16} height={16} class="opacity-40" />
          Glass
          <Button
            id="theme-glass-reset"
            size="sm"
            variant="ghost"
            class="ml-auto"
            onClick={resetToHype4}
            title="Reset to Hype4 defaults"
          >
            Hype4
          </Button>
        </span></span><Separator class="flex-1" /></h3>

      <div class="flex flex-col gap-2">
        <div class="bg-base-200 rounded-lg p-2">
          <Slider
            id="theme-glass-blur"
            label="Blur"
            size="sm"
            min={0}
            max={BLUR_MAX}
            step={1}
            value={tuning().blur}
            formatValue={(value) => `${value}px`}
            onChange={(value) => applyTuning({ blur: value })}
          />
        </div>

        <div class="bg-base-200 rounded-lg p-2">
          <Slider
            id="theme-glass-refraction"
            label="Refraction"
            size="sm"
            min={0}
            max={REFRACTION_MAX}
            step={0.01}
            value={tuning().refraction}
            formatValue={(value) => value.toFixed(2)}
            onChange={(value) => applyTuning({ refraction: value })}
          />
        </div>

        <div class="bg-base-200 rounded-lg p-2">
          <Slider
            id="theme-glass-depth"
            label="Depth"
            size="sm"
            min={0}
            max={DEPTH_MAX}
            step={1}
            value={tuning().depth}
            onChange={(value) => applyTuning({ depth: value })}
          />
        </div>
      </div>
    </div>
  );
}
