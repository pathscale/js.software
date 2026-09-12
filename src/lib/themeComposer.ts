import chroma from "chroma-js";
import type { Theme } from "../types/theme";
import { calculateContrastRatio } from "../utils/theme/contrastCalculation";
import { convertOklchToHex } from "../utils/theme/colorConversion";
import { updateThemeColor } from "../utils/theme/themeUtils";

export const DEFAULT_SURFACE = "#103860";
export const DEFAULT_STRENGTH = 30;
export const DEFAULT_SOFTNESS = 0;
export const DEFAULT_TEXT_BRIGHTNESS = 0;
export const STRENGTH_STOPS = [10, 20, 30, 40, 50] as const;
export const SOFTNESS_STOPS = [0, 3, 6, 9, 12] as const;
export const TEXT_BRIGHTNESS_STOPS = [-4, -2, 0, 3, 6] as const;
export const DEFAULT_CONTROL_ACCENT = "#d2ad3f";
export const DEFAULT_ARTWORK_ACCENT = "#8fb8e8";

export interface ThemeComposition {
  surface: string;
  strength: number;
  softness: number;
  textBrightness: number;
}

const asNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toOklch = (color: chroma.Color) => {
  const [lightness, colorfulness, hue] = color.oklch();
  return `oklch(${Math.round(lightness * 10000) / 100}% ${Math.max(0, colorfulness).toFixed(3)} ${Math.round(hue || 0)})`;
};

const oklchToHex = (hue: number, colorfulness: number, lightness: number) =>
  chroma.oklch(lightness / 100, colorfulness / 500, hue).hex();

/** The same 31-petal surface palette used by AgencyZero. */
export const surfaceColors = (mode: "light" | "dark") => {
  const ringHues = [42, 24, 4, 336, 300, 268, 238, 210, 184, 162, 132, 94];
  const innerHues = [30, 330, 270, 210, 150, 90];
  const levels = mode === "dark" ? [22, 33, 44] : [52, 66, 80];
  return [
    ...ringHues.map((hue) => oklchToHex(hue, 72, levels[0])),
    ...ringHues.map((hue) => oklchToHex(hue, 68, levels[1])),
    ...innerHues.map((hue) => oklchToHex(hue, 55, levels[2])),
    mode === "dark" ? "#30343b" : "#f1f3f5",
  ];
};

export const compositionFromTheme = (theme: Theme): ThemeComposition => ({
  surface:
    theme._surface ||
    convertOklchToHex(
      theme["--color-base-200"] || theme["--color-base-100"] || DEFAULT_SURFACE,
    ),
  strength: asNumber(theme._surfaceStrength, DEFAULT_STRENGTH),
  softness: asNumber(theme._surfaceSoftness, DEFAULT_SOFTNESS),
  textBrightness: asNumber(theme._textBrightness, DEFAULT_TEXT_BRIGHTNESS),
});

export const surfaceTone = (
  composition: ThemeComposition,
  mode: "light" | "dark",
  tier: 0 | 1 | 2,
) => {
  const selected = chroma(composition.surface);
  const hue = selected.oklch()[2] || 240;
  const baseLightness = mode === "dark" ? [0.11, 0.17, 0.24] : [0.985, 0.95, 0.9];
  const lift = composition.softness / 100;
  const lightness =
    mode === "dark"
      ? Math.min(baseLightness[tier] + lift, 0.48)
      : Math.max(baseLightness[tier] - lift, 0.55);
  const anchor = chroma.oklch(lightness, 0.005, hue);
  return toOklch(
    chroma.mix(
      anchor,
      selected,
      Math.min(Math.max(composition.strength, 0), 50) / 100,
      "oklch",
    ),
  );
};

export const applyThemeComposition = (
  theme: Theme,
  patch: Partial<ThemeComposition> = {},
): Theme => {
  const composition = { ...compositionFromTheme(theme), ...patch };
  const mode = theme._themeType === "dark" ? "dark" : "light";
  const base100 = surfaceTone(composition, mode, 0);
  const base200 = surfaceTone(composition, mode, 1);
  const base300 = surfaceTone(composition, mode, 2);
  const surfaces = [base100, base200, base300];
  const poles = ["#000000", "#ffffff"] as const;
  const pole = poles.reduce((best, candidate) => {
    const bestMinimum = Math.min(
      ...surfaces.map((surface) => calculateContrastRatio(surface, best)),
    );
    const candidateMinimum = Math.min(
      ...surfaces.map((surface) => calculateContrastRatio(surface, candidate)),
    );
    return candidateMinimum > bestMinimum ? candidate : best;
  });
  const softenedText = mode === "dark" ? "#b8bec6" : "#30343b";
  const requestedSoftening = Math.min(
    Math.max((6 - composition.textBrightness) / 10, 0),
    1,
  );
  const hasSafeContrast = (softening: number) => {
    const candidate = toOklch(chroma.mix(pole, softenedText, softening, "oklch"));
    return surfaces.every(
      // Leave a small margin so rounding the exported OKLCH token cannot put
      // the final browser value just below the WCAG threshold.
      (surface) => calculateContrastRatio(surface, candidate) >= 4.52,
    );
  };
  let maximumSafeSoftening = 0.4;
  if (!hasSafeContrast(maximumSafeSoftening)) {
    let low = 0;
    let high = maximumSafeSoftening;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidate = (low + high) / 2;
      if (hasSafeContrast(candidate)) low = candidate;
      else high = candidate;
    }
    maximumSafeSoftening = low;
  }
  // Scale every authored brightness stop across the safe range. Clamping each
  // requested value independently made the dimmest stops collapse to the same
  // token on highly saturated dark surfaces.
  const safeSoftening = requestedSoftening * maximumSafeSoftening;
  const content = toOklch(chroma.mix(pole, softenedText, safeSoftening, "oklch"));

  return {
    ...theme,
    _surface: composition.surface,
    _surfaceStrength: `${composition.strength}`,
    _surfaceSoftness: `${composition.softness}`,
    _textBrightness: `${composition.textBrightness}`,
    "--color-base-100": base100,
    "--color-base-200": base200,
    "--color-base-300": base300,
    "--color-base-content": content,
  };
};

export const accentOptions = (
  surface: string,
  mode: "light" | "dark",
  strength: number,
  softness: number,
) => {
  const hue = chroma(surface).oklch()[2] || 210;
  const saturation = 50 + (strength / 50) * 32 - softness * 2;
  const lightness = mode === "light" ? 54 - softness * 2.3 : 44 + softness * 2.5;
  const [defaultLightness, defaultChroma, defaultHue] =
    chroma(DEFAULT_CONTROL_ACCENT).oklch();
  const designed = chroma
    .oklch(
      Math.min(0.78, Math.max(0.35, defaultLightness + softness * 0.004)),
      Math.max(
        0.03,
        defaultChroma * (1 + (strength - DEFAULT_STRENGTH) / 150 - softness / 60),
      ),
      defaultHue || 90,
    )
    .hex();
  return [
    designed,
    ...[0, 35, 95, 155, 180, 250].map((offset) =>
      oklchToHex((hue + offset) % 360, saturation, lightness),
    ),
  ];
};

export const artworkAccentOptions = (
  surface: string,
  mode: "light" | "dark",
  strength: number,
  softness: number,
) => [
  DEFAULT_ARTWORK_ACCENT,
  ...accentOptions(surface, mode, strength, softness).slice(1),
];

const storedAccentIndex = (theme: Theme, key: string) => {
  const parsed = Number.parseInt(theme[key] ?? "", 10);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < 7 ? parsed : null;
};

/** Rebuild selected harmony friends whenever a surface axis or mode changes. */
export const applyCompositionWithAccentHarmony = (
  theme: Theme,
  patch: Partial<ThemeComposition>,
): Theme => {
  let next = applyThemeComposition(theme, patch);
  const composition = compositionFromTheme(next);
  const mode = next._themeType === "dark" ? "dark" : "light";
  const controlFriends = accentOptions(
    composition.surface,
    mode,
    composition.strength,
    composition.softness,
  );
  const artworkFriends = artworkAccentOptions(
    composition.surface,
    mode,
    composition.strength,
    composition.softness,
  );
  const controlIndex = storedAccentIndex(theme, "_controlAccentIndex");
  const artworkIndex = storedAccentIndex(theme, "_artAccentIndex");
  if (controlIndex !== null) {
    next = updateThemeColor(next, "--color-primary", controlFriends[controlIndex]);
    next._controlAccentIndex = `${controlIndex}`;
  }
  if (artworkIndex !== null) {
    next = updateThemeColor(next, "--color-accent", artworkFriends[artworkIndex]);
    next._artAccentIndex = `${artworkIndex}`;
  }
  return next;
};
