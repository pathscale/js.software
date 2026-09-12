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
  "--color-primary-foreground": "var(--color-primary-content)",
  "--color-secondary-foreground": "var(--color-secondary-content)",
  "--color-accent-foreground": "var(--color-accent-content)",
  "--color-neutral-foreground": "var(--color-neutral-content)",
  "--color-info-foreground": "var(--color-info-content)",
  "--color-success-foreground": "var(--color-success-content)",
  "--color-warning-foreground": "var(--color-warning-content)",
  "--color-error-foreground": "var(--color-error-content)",
  "--color-danger": "var(--color-error)",
  "--color-danger-foreground": "var(--color-error-content)",
  "--color-danger-soft": "var(--color-error-soft)",
  "--color-danger-soft-foreground": "var(--color-error-soft-foreground)",
  "--color-danger-soft-hover": "var(--color-error-soft-hover)",
  "--color-danger-hover": "var(--color-error-hover)",
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
