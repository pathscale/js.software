import { describe, expect, it, setDefaultTimeout } from "bun:test";
import chroma from "chroma-js";
import { calculateContrastRatio } from "../src/utils/theme/contrastCalculation";
import {
  accentOptions,
  applyThemeComposition,
  artworkAccentOptions,
  enforceThemeInkContrast,
  SOFTNESS_STOPS,
  STRENGTH_STOPS,
  surfaceColors,
} from "../src/lib/themeComposer";
import type { Theme } from "../src/types/theme";

setDefaultTimeout(15_000);

const seed = (mode: "light" | "dark"): Theme => ({
  name: `${mode} test`,
  _themeType: mode,
} as Theme);

describe("theme composition contrast", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const surface of ["#000000", "#ffffff", "#7f00ff"]) {
      it(`keeps shared ${mode} text readable on every ${surface} surface tier`, () => {
        const theme = applyThemeComposition(seed(mode), {
          surface,
          strength: 50,
          softness: 12,
          textBrightness: -4,
        });

        for (const key of [
          "--color-base-100",
          "--color-base-200",
          "--color-base-300",
        ]) {
          expect(
            calculateContrastRatio(theme[key], theme["--color-base-content"]),
          ).toBeGreaterThanOrEqual(4.5);
          const background = chroma(theme[key]);
          const muted = chroma.mix(
            background,
            theme["--color-base-content"],
            0.6,
            "rgb",
          );
          expect(chroma.contrast(background, muted)).toBeGreaterThanOrEqual(4.5);
        }
      });
    }
  }

  it("keeps every generated accent readable as ink on every surface tier", () => {
    for (const mode of ["light", "dark"] as const) {
      for (const surface of surfaceColors(mode)) {
        for (const strength of STRENGTH_STOPS) {
          for (const softness of SOFTNESS_STOPS) {
            const theme = applyThemeComposition(seed(mode), {
              surface,
              strength,
              softness,
            });
            const surfaces = [
              theme["--color-base-100"],
              theme["--color-base-200"],
              theme["--color-base-300"],
            ];
            for (const options of [
              accentOptions(surface, mode, strength, softness),
              artworkAccentOptions(surface, mode, strength, softness),
            ]) {
              expect(options).toHaveLength(7);
              expect(new Set(options).size).toBe(options.length);
              for (const accent of options) {
                for (const background of surfaces) {
                  expect(calculateContrastRatio(background, accent)).toBeGreaterThanOrEqual(4.5);
                }
              }
            }
          }
        }
      }
    }
  });

  it("repairs every theme ink token against the composed surfaces", () => {
    const composed = applyThemeComposition(seed("light"), {
      surface: "#ffffff",
      strength: 50,
      softness: 12,
    });
    const unsafe = {
      ...composed,
      "--color-primary": composed["--color-base-100"],
      "--color-secondary": composed["--color-base-100"],
      "--color-accent": composed["--color-base-100"],
      "--color-neutral": composed["--color-base-100"],
      "--color-info": composed["--color-base-100"],
      "--color-success": composed["--color-base-100"],
      "--color-warning": composed["--color-base-100"],
      "--color-error": composed["--color-base-100"],
    };
    const repaired = enforceThemeInkContrast(unsafe);
    for (const key of [
      "--color-primary",
      "--color-secondary",
      "--color-accent",
      "--color-neutral",
      "--color-info",
      "--color-success",
      "--color-warning",
      "--color-error",
    ]) {
      for (const background of [
        repaired["--color-base-100"],
        repaired["--color-base-200"],
        repaired["--color-base-300"],
      ]) {
        expect(calculateContrastRatio(background, repaired[key])).toBeGreaterThanOrEqual(4.5);
      }
      expect(
        calculateContrastRatio(repaired[key], repaired[`${key}-content`]),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        calculateContrastRatio(
          repaired[`${key}-soft`],
          repaired[`${key}-soft-foreground`],
        ),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
