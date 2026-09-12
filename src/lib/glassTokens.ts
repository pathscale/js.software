import {
  GLASS_DEFAULTS,
  GLASS_LIMITS,
  resolveGlassTokens,
  type GlassMode,
  type GlassTuning,
} from "@pathscale/ui/styles/glass.js";

export const GLASS_OPACITY_DEFAULT = 55;
export const GLASS_OPACITY_MAX = 100;
export const GLASS_SCRIM_DEFAULT = 0;
export const GLASS_SCRIM_MAX = 70;

export interface GlassThemeTuning extends Required<GlassTuning> {
  opacity: number;
  scrim: number;
}

const finite = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const tuningFromTheme = (
  theme: Record<string, string | undefined>,
  mode: GlassMode,
): GlassThemeTuning => {
  const defaults = GLASS_DEFAULTS[mode];
  return {
    blur: clamp(
      finite(theme._glassBlur ?? theme["--glass-blur"], defaults.blur),
      GLASS_LIMITS.blur.min,
      GLASS_LIMITS.blur.max,
    ),
    refraction: clamp(
      finite(
        theme._glassRefraction ?? theme["--glass-refraction-strength"],
        defaults.refraction,
      ),
      GLASS_LIMITS.refraction.min,
      GLASS_LIMITS.refraction.max,
    ),
    depth: clamp(
      finite(
        theme._glassDepth ?? theme["--glass-refraction-depth"],
        defaults.depth,
      ),
      GLASS_LIMITS.depth.min,
      GLASS_LIMITS.depth.max,
    ),
    controlTint: clamp(
      finite(theme._glassControlTint, defaults.controlTint),
      GLASS_LIMITS.controlTint.min,
      GLASS_LIMITS.controlTint.max,
    ),
    opacity: clamp(
      finite(theme._glassOpacity, GLASS_OPACITY_DEFAULT),
      0,
      GLASS_OPACITY_MAX,
    ),
    scrim: clamp(
      finite(theme._glassScrim, GLASS_SCRIM_DEFAULT),
      0,
      GLASS_SCRIM_MAX,
    ),
  };
};

export const resolveGlassThemeValues = (
  tuning: GlassThemeTuning,
  mode: GlassMode,
): Record<string, string> => {
  const tokens = resolveGlassTokens(tuning, mode);
  const opacity = clamp(tuning.opacity, 0, GLASS_OPACITY_MAX);
  const scrim = clamp(tuning.scrim, 0, GLASS_SCRIM_MAX);
  return {
    ...tokens,
    "--glass-background-opacity": `${opacity}%`,
    "--theme-glass-scrim-opacity": `${scrim}%`,
    _glassBlur: `${tuning.blur}`,
    _glassRefraction: `${tuning.refraction}`,
    _glassDepth: `${tuning.depth}`,
    _glassControlTint: `${tuning.controlTint}`,
    _glassOpacity: `${opacity}`,
    _glassScrim: `${scrim}`,
  };
};

export const glassThemeDefaults = (mode: GlassMode): Record<string, string> =>
  resolveGlassThemeValues(
    {
      ...GLASS_DEFAULTS[mode],
      opacity: GLASS_OPACITY_DEFAULT,
      scrim: GLASS_SCRIM_DEFAULT,
    },
    mode,
  );

export const GLASS_THEME_DEFAULTS = glassThemeDefaults("dark");
export const GLASS_THEME_TOKEN_ORDER = Object.keys(
  resolveGlassTokens(GLASS_DEFAULTS.dark, "dark"),
).concat("--theme-glass-scrim-opacity");

export function withGlassThemeDefaults<T extends Record<string, string>>(theme: T) {
  const mode: GlassMode = theme._themeType === "light" ? "light" : "dark";
  const tuning = tuningFromTheme(theme, mode);
  return {
    _glassEnabled: "1",
    ...theme,
    ...resolveGlassThemeValues(tuning, mode),
  };
}

export function resetGlassTheme<T extends Record<string, string>>(theme: T) {
  const mode: GlassMode = theme._themeType === "light" ? "light" : "dark";
  return {
    ...theme,
    ...glassThemeDefaults(mode),
    _glassEnabled: "1",
  };
}

export { GLASS_DEFAULTS, GLASS_LIMITS };
