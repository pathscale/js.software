export interface GlassTuningValues {
  blur: number;
  refraction: number;
  depth: number;
}

export const REFRACTION_MAX = 0.4;
export const DEPTH_MAX = 30;
export const BLUR_MAX = 50;

export const HYPE4_DEFAULTS: GlassTuningValues = {
  blur: 20,
  refraction: 0.15,
  depth: 10,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const round = (value: number, precision = 2): number => {
  const factor = 10 ** precision;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

const formatNumber = (value: number, precision = 2): string => {
  const rounded = round(value, precision);
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
};

const formatPercent = (value: number, precision = 2): string =>
  `${formatNumber(value, precision)}%`;

const formatPx = (value: number, precision = 2): string =>
  `${formatNumber(value, precision)}px`;

export const normalizeGlassValues = (
  input: Partial<GlassTuningValues>,
  fallback: GlassTuningValues = HYPE4_DEFAULTS,
): GlassTuningValues => ({
  blur: clamp(Number(input.blur ?? fallback.blur), 0, BLUR_MAX),
  refraction: clamp(
    Number(input.refraction ?? fallback.refraction),
    0,
    REFRACTION_MAX,
  ),
  depth: clamp(Number(input.depth ?? fallback.depth), 0, DEPTH_MAX),
});

export const resolveGlassCssVariables = (
  values: GlassTuningValues,
): Record<string, string> => {
  const normalized = normalizeGlassValues(values);
  const refractionRatio = normalized.refraction / REFRACTION_MAX;
  const depthRatio = normalized.depth / DEPTH_MAX;
  const refractionSoft = refractionRatio === 0 ? 0 : refractionRatio ** 0.82;
  const refractionSurface = refractionRatio === 0 ? 0 : refractionRatio ** 0.95;
  const depthSoft = depthRatio === 0 ? 0 : depthRatio ** 0.85;
  const hasDepth = depthSoft > 0;

  const backgroundOpacity = 38 * refractionSurface;
  const borderOpacity = 30 * refractionSoft;
  const highlightOpacity = 80 * refractionSoft;
  const bottomHighlightOpacity = 10 * refractionSoft;
  const edgeHighlightOpacity = 30 * refractionSoft + 4 * depthSoft;
  const rimStartOpacity = 21 * refractionSoft + 3 * depthSoft;
  const rimEndOpacity = 35 * refractionSoft + 5 * depthSoft;
  const innerGlowAlpha = 0.18 * refractionSoft * depthSoft + 0.05 * depthSoft;
  const topGlowOpacity = 8 * depthSoft * (0.35 + 0.65 * refractionSoft);
  const bottomGlowOpacity = 12 * depthSoft * (0.2 + 0.55 * refractionSoft);
  const sheenOpacity = 40 * depthSoft * (0.25 + 0.75 * refractionSoft);
  const fallbackBackgroundOpacity = clamp(
    backgroundOpacity * 2 + 12 * refractionSoft,
    0,
    78,
  );
  const shadowDepth = hasDepth
    ? `0 ${formatPx(4 + 10 * depthSoft)} ${formatPx(
        18 + 26 * depthSoft,
      )} rgb(0 0 0 / ${formatPercent(3 + 7 * depthSoft)})`
    : "0 0 0 rgb(0 0 0 / 0%)";

  return {
    "--glass-blur": formatPx(normalized.blur, 0),
    "--glass-saturation": formatNumber(1 + 0.2 * refractionSoft),
    "--glass-brightness": "1",
    "--glass-background-color": "white",
    "--glass-background-opacity": formatPercent(backgroundOpacity),
    "--glass-border-color": "white",
    "--glass-border-opacity": formatPercent(borderOpacity),
    "--glass-highlight-color": "white",
    "--glass-highlight-opacity": formatPercent(highlightOpacity),
    "--glass-bottom-highlight-opacity": formatPercent(bottomHighlightOpacity),
    "--glass-edge-highlight-opacity": formatPercent(edgeHighlightOpacity),
    "--glass-rim-start-color": "var(--color-base-content)",
    "--glass-rim-start-opacity": formatPercent(rimStartOpacity),
    "--glass-rim-end-color": "white",
    "--glass-rim-end-opacity": formatPercent(rimEndOpacity),
    "--glass-inner-glow-rgb": "255 255 255",
    "--glass-inner-glow-alpha": formatNumber(innerGlowAlpha, 3),
    "--glass-inner-glow-blur": formatPx(hasDepth ? 1 + 3 * depthSoft : 0),
    "--glass-inner-glow-spread": "0px",
    "--glass-depth-top-glow-opacity": formatPercent(topGlowOpacity),
    "--glass-depth-bottom-glow-opacity": formatPercent(bottomGlowOpacity),
    "--glass-depth-sheen-opacity": formatPercent(sheenOpacity),
    "--glass-depth-sheen-size": formatPercent(82 - 16 * depthSoft),
    "--glass-depth-surface-opacity": "0%",
    "--glass-depth-surface-size": "82%",
    "--glass-glow-ring-opacity": "10%",
    "--glass-liquid-edge-size": "3px",
    "--glass-liquid-inner-blur": "18px",
    "--glass-border-radius": "20px",
    "--glass-shadow-depth": shadowDepth,
    "--glass-fallback-background-opacity": formatPercent(
      fallbackBackgroundOpacity,
    ),
    "--glass-refraction-depth": formatPx(normalized.depth, 0),
    "--glass-refraction-strength": formatNumber(normalized.refraction, 2),
    "--glass-refraction-chromatic-aberration": formatNumber(
      0.01 + 0.03 * depthSoft,
      3,
    ),
  };
};

export const tuningFromTheme = (
  theme: Record<string, string | undefined>,
): GlassTuningValues => {
  const blur = Number.parseFloat(theme["--glass-blur"] ?? "");
  const refraction = Number.parseFloat(
    theme["--glass-refraction-strength"] ?? "",
  );
  const depth = Number.parseFloat(theme["--glass-refraction-depth"] ?? "");

  return normalizeGlassValues({
    blur: Number.isFinite(blur) ? blur : undefined,
    refraction: Number.isFinite(refraction) ? refraction : undefined,
    depth: Number.isFinite(depth) ? depth : undefined,
  });
};
