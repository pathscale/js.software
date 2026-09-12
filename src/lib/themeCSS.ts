import { GLASS_THEME_DEFAULTS, GLASS_THEME_TOKEN_ORDER } from "../utils/themeUtils";
import type { Theme } from "../types/theme";

const escapeCssString = (value: string) =>
  value.replace(/[\0-\x1f\x7f"\\]/g, (character) => {
    const codePoint = character.codePointAt(0) || 0;
    return codePoint === 0 ? "\uFFFD" : `\\${codePoint.toString(16)} `;
  });

export interface ThemeCSSOptions {
  isDefault?: boolean;
  isPrefersDark?: boolean;
  colorScheme?: "light" | "dark";
}

export const generateThemeCSS = (theme: Theme, options: ThemeCSSOptions = {}) => {
  /*
   * Plain CSS.
   *
   * This used to export a theme in a format the site itself no longer uses:
   * a theme in @pathscale/ui is a block of custom properties on a selector
   * and nothing more. Anyone pasting the old output into this repository
   * would have got a rule that never applied, and a plugin directive for a
   * package that is not installed.
   *
   * `default` decides whether the theme also claims `:root`, and
   * `prefersdark` whether it answers the OS preference - the two things the
   * plugin's booleans meant, expressed as selectors and a media query.
   */
  const selectors = [
    options.isDefault ? ":root" : null,
    `[data-theme="${escapeCssString(theme.name)}"]`,
  ].filter(Boolean).join(",\n");
  const baseProps = [`  color-scheme: ${options.colorScheme || "light"};`];

  // Colour properties in a fixed order, so a regenerated theme diffs cleanly.
  const colorFamilies = [
    "primary", "secondary", "accent", "neutral", "info", "success",
    "warning", "error", "danger",
  ];
  const colorOrder = [
    "--color-base-100", "--color-base-content", "--color-base-200", "--color-base-300",
    ...colorFamilies.flatMap((family) => [
      `--color-${family}`,
      `--color-${family}-content`,
      `--color-${family}-foreground`,
      `--color-${family}-soft`,
      `--color-${family}-soft-foreground`,
      `--color-${family}-soft-hover`,
      `--color-${family}-hover`,
    ]),
  ];

  const colorProps = colorOrder
    .filter(key => theme[key])
    .map(key => `  ${key}: ${theme[key]};`);

  const aliasOrder = [
    "--color-default", "--color-default-foreground", "--color-default-hover",
    "--color-background", "--color-foreground",
    "--color-bg-body", "--color-bg-inverse", "--color-bg-primary",
    "--color-bg-secondary", "--color-bg-tertiary",
    "--color-fg-body", "--color-fg-inverse", "--color-fg-primary",
    "--color-fg-secondary", "--color-fg-tertiary",
    "--b1", "--b2", "--b3", "--bc", "--shade",
  ];
  const aliasProps = aliasOrder
    .filter(key => theme[key])
    .map(key => `  ${key}: ${theme[key]};`);

  // Add default radius, size and effect values if not present
  const defaultValues: Record<string, string> = {
    "--radius-selector": "0.5rem",
    "--radius-field": "0.25rem",
    "--radius-box": "0.5rem",
    "--size-selector": "0.25rem",
    "--size-field": "0.25rem",
    "--border": "1px",
    "--depth": "1",
    "--noise": "0",
    ...GLASS_THEME_DEFAULTS,
  };

  const radiusProps = [
    `  --radius-selector: ${theme["--radius-selector"] || defaultValues["--radius-selector"]};`,
    `  --radius-field: ${theme["--radius-field"] || defaultValues["--radius-field"]};`,
    `  --radius-box: ${theme["--radius-box"] || defaultValues["--radius-box"]};`
  ];

  const sizeProps = [
    `  --size-selector: ${theme["--size-selector"] || defaultValues["--size-selector"]};`,
    `  --size-field: ${theme["--size-field"] || defaultValues["--size-field"]};`,
    `  --border: ${theme["--border"] || defaultValues["--border"]};`
  ];

  const effectProps = [
    `  --depth: ${theme["--depth"] || defaultValues["--depth"]};`,
    `  --noise: ${theme["--noise"] || defaultValues["--noise"]};`
  ];

  const glassProps = GLASS_THEME_TOKEN_ORDER.map(
    (key) => `  ${key}: ${theme[key] || defaultValues[key]};`
  );

  const allProps = [
    ...baseProps,
    ...colorProps,
    ...aliasProps,
    ...radiusProps,
    ...sizeProps,
    ...effectProps,
    ...glassProps
  ];

  const block = `${selectors} {\n${allProps.join("\n")}\n}`;
  return options.isPrefersDark
    ? `${block}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n${allProps.map((l) => `  ${l}`).join("\n")}\n  }\n}`
    : block;
};
