export const GLASS_THEME_DEFAULTS = {
  "--glass-background-color": "white",
  "--glass-background-opacity": "38%",
  "--glass-border-color": "white",
  "--glass-border-opacity": "30%",
  "--glass-highlight-color": "white",
  "--glass-highlight-opacity": "80%",
  "--glass-bottom-highlight-opacity": "10%",
  "--glass-edge-highlight-opacity": "30%",
  "--glass-inner-glow-rgb": "255 255 255",
  "--glass-inner-glow-alpha": "0",
  "--glass-inner-glow-blur": "0px",
  "--glass-inner-glow-spread": "0px",
  "--glass-depth-top-glow-opacity": "8%",
  "--glass-depth-bottom-glow-opacity": "12%",
  "--glass-depth-sheen-opacity": "40%",
  "--glass-depth-sheen-size": "70%",
  "--glass-depth-surface-opacity": "8%",
  "--glass-depth-surface-size": "82%",
  "--glass-rim-start-color": "var(--color-base-content)",
  "--glass-rim-start-opacity": "21%",
  "--glass-rim-end-color": "white",
  "--glass-rim-end-opacity": "35%",
  "--glass-glow-ring-opacity": "10%",
  "--glass-liquid-edge-size": "3px",
  "--glass-liquid-inner-blur": "18px",
  "--glass-border-radius": "20px",
  "--glass-blur": "11px",
  "--glass-saturation": "1",
  "--glass-brightness": "1",
  "--glass-shadow-depth": "0 8px 32px rgb(0 0 0 / 10%)",
  "--glass-fallback-background-opacity": "78%",
  "--glass-refraction-depth": "5px",
  "--glass-refraction-strength": "0.38",
  "--glass-refraction-chromatic-aberration": "0.01",
} as const;

export const GLASS_THEME_TOKEN_ORDER = Object.keys(
  GLASS_THEME_DEFAULTS,
) as (keyof typeof GLASS_THEME_DEFAULTS)[];

export function withGlassThemeDefaults<T extends Record<string, string>>(theme: T) {
  return {
    ...GLASS_THEME_DEFAULTS,
    ...theme,
  };
}
