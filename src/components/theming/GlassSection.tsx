import { Button, Icon, Separator, Slider, Switch } from "@pathscale/ui";
import {
  GLASS_LIMITS,
  glassThemeDefaults,
  resolveGlassThemeValues,
  tuningFromTheme,
} from "../../lib/glassTokens";
import { Theme } from "../../utils/themeUtils";

interface GlassSectionProps {
  theme: Theme;
  onThemeUpdate: (values: Record<string, string>) => void;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}

export default function GlassSection(props: GlassSectionProps) {
  const mode = () => (props.theme._themeType === "light" ? "light" : "dark");
  const tuning = () => tuningFromTheme(props.theme, mode());

  const applyTuning = (
    next: Partial<ReturnType<typeof tuning>>,
  ) => {
    props.onThemeUpdate(resolveGlassThemeValues({ ...tuning(), ...next }, mode()));
  };

  const resetGlass = () => props.onThemeUpdate(glassThemeDefaults(mode()));

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
            onClick={resetGlass}
            title="Reset glass settings"
          >
            Reset
          </Button>
        </span></span><Separator class="flex-1" /></h3>

      <div class="flex flex-col gap-2">
        <Switch
          id="theme-glass-enabled"
          class="w-full justify-between [&_[data-slot=switch-content]]:order-first"
          size="sm"
          checked={props.enabled}
          onChange={props.onEnabledChange}
          description="Switch the preview surface between solid and glass"
        >
          Glass material
        </Switch>

        <div class="bg-base-200 rounded-lg p-2">
          <Slider
            id="theme-glass-blur"
            label="Blur"
            size="sm"
            min={0}
            max={GLASS_LIMITS.blur.max}
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
            max={GLASS_LIMITS.refraction.max}
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
            max={GLASS_LIMITS.depth.max}
            step={1}
            value={tuning().depth}
            onChange={(value) => applyTuning({ depth: value })}
          />
        </div>
      </div>
    </div>
  );
}
