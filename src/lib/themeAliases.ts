import type { Theme } from "../types/theme";

/**
 * Keep the public UI token aliases attached to the generated surface ladder.
 *
 * A generated theme used to replace `--color-base-content` while leaving the
 * imported light/dark theme's generic and compatibility foregrounds behind.
 * Components that read those aliases could therefore retain dark ink on a dark
 * generated theme, including chrome outside the preview scope.
 */
export const withThemeAliases = <T extends Theme>(theme: T): T => ({
  ...theme,
  "--color-default": "var(--color-base-200)",
  "--color-default-foreground": "var(--color-base-content)",
  "--color-default-hover": "var(--color-base-300)",
  "--color-background": "var(--color-base-100)",
  "--color-foreground": "var(--color-base-content)",
  "--color-bg-body": "var(--color-base-100)",
  "--color-bg-inverse": "var(--color-base-content)",
  "--color-bg-primary": "var(--color-base-200)",
  "--color-bg-secondary": "var(--color-base-300)",
  "--color-bg-tertiary": "var(--color-base-300)",
  "--color-fg-body": "var(--color-base-content)",
  "--color-fg-inverse": "var(--color-base-100)",
  "--color-fg-primary": "var(--color-base-content)",
  "--color-fg-secondary": "var(--color-base-content)",
  "--color-fg-tertiary": "var(--color-base-content)",
  "--b1": "var(--color-base-100)",
  "--b2": "var(--color-base-200)",
  "--b3": "var(--color-base-300)",
  "--bc": "var(--color-base-content)",
  "--shade": "var(--color-base-content)",
}) as T;
