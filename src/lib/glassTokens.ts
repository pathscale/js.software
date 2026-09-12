import {
  GLASS_DEFAULTS,
  GLASS_LIMITS,
  resolveGlassTokens,
  type GlassMode,
  type GlassTuning,
} from "@pathscale/ui/styles/glass.js";

export type GlassThemeTuning = Required<GlassTuning>;

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
  };
};

export const resolveGlassThemeValues = (
  tuning: GlassThemeTuning,
  mode: GlassMode,
): Record<string, string> => {
  const tokens = resolveGlassTokens(tuning, mode);
  return {
    ...tokens,
    _glassBlur: `${tuning.blur}`,
    _glassRefraction: `${tuning.refraction}`,
    _glassDepth: `${tuning.depth}`,
    _glassControlTint: `${tuning.controlTint}`,
  };
};

export const glassThemeDefaults = (mode: GlassMode): Record<string, string> =>
  resolveGlassThemeValues(GLASS_DEFAULTS[mode], mode);

export const GLASS_THEME_DEFAULTS = glassThemeDefaults("dark");
export const GLASS_THEME_TOKEN_ORDER = Object.keys(
  resolveGlassTokens(GLASS_DEFAULTS.dark, "dark"),
);

const withoutLegacyGlassOverrides = <T extends Record<string, string>>(theme: T) => {
  const next = { ...theme };
  delete next._glassOpacity;
  delete next._glassScrim;
  delete next["--theme-glass-scrim-opacity"];
  return next;
};

export function withGlassThemeDefaults<T extends Record<string, string>>(theme: T) {
  const mode: GlassMode = theme._themeType === "light" ? "light" : "dark";
  const tuning = tuningFromTheme(theme, mode);
  return {
    _glassEnabled: "1",
    ...withoutLegacyGlassOverrides(theme),
    ...resolveGlassThemeValues(tuning, mode),
  };
}

export function resetGlassTheme<T extends Record<string, string>>(theme: T) {
  const mode: GlassMode = theme._themeType === "light" ? "light" : "dark";
  return {
    ...withoutLegacyGlassOverrides(theme),
    ...glassThemeDefaults(mode),
    _glassEnabled: "1",
  };
}

export { GLASS_DEFAULTS, GLASS_LIMITS };
