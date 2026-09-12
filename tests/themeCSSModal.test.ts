import { describe, expect, it } from "bun:test";
import { generateThemeCSS } from "../src/lib/themeCSS";
import { withThemeAliases } from "../src/lib/themeAliases";
import {
  applyThemeComposition,
  enforceThemeInkContrast,
} from "../src/lib/themeComposer";
import type { Theme } from "../src/types/theme";

const seed: Theme = {
  name: 'QA "theme"',
  _themeType: "light",
  "--color-primary": "#3366cc",
  "--color-secondary": "#6633cc",
  "--color-accent": "#0088aa",
  "--color-neutral": "#46505a",
  "--color-info": "#1769aa",
  "--color-success": "#16834a",
  "--color-warning": "#8a5b00",
  "--color-error": "#b42335",
};

describe("theme CSS export", () => {
  it("exports every live UI color token with the generated theme", () => {
    const theme = withThemeAliases(
      enforceThemeInkContrast(
        applyThemeComposition(seed, {
          surface: "#d9e8ff",
          strength: 40,
          softness: 6,
          textBrightness: -2,
        }),
      ),
    );
    const css = generateThemeCSS(theme, {
      isDefault: true,
      isPrefersDark: true,
      colorScheme: "light",
    });

    for (const [key, value] of Object.entries(theme)) {
      if (key.startsWith("--color-")) {
        expect(css).toContain(`${key}: ${value};`);
      }
    }
    expect(css).toContain(":root,");
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('[data-theme="QA \\22 theme\\22 "]');
  });
});
