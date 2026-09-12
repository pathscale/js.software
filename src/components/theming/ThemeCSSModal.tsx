import { Button, Dialog, Icon, Textarea } from "@pathscale/ui";
import { createEffect, createSignal } from "solid-js";
import { ActionStatus } from "../showcase/ActionStatus";
import {
  GLASS_THEME_DEFAULTS,
  GLASS_THEME_TOKEN_ORDER,
  Theme,
} from "../../utils/themeUtils";

interface ThemeCSSModalProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  isDefault?: boolean;
  isPrefersDark?: boolean;
  colorScheme?: "light" | "dark";
}

const escapeCssString = (value: string) =>
  value.replace(/[\0-\x1f\x7f"\\]/g, (character) => {
    const codePoint = character.codePointAt(0) || 0;
    return codePoint === 0 ? "\uFFFD" : `\\${codePoint.toString(16)} `;
  });

export default function ThemeCSSModal(props: ThemeCSSModalProps) {
  const [cssText, setCssText] = createSignal("");
  const [isClipboardButtonPressed, setIsClipboardButtonPressed] = createSignal(false);
  const [copyStatus, setCopyStatus] = createSignal("Copy generated CSS");

  const generateCSS = (theme: Theme) => {
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
      props.isDefault ? ":root" : null,
      `[data-theme="${escapeCssString(theme.name)}"]`,
    ].filter(Boolean).join(",\n");
    const baseProps = [`  color-scheme: ${props.colorScheme || "light"};`];

    // Colour properties in a fixed order, so a regenerated theme diffs cleanly.
    const colorOrder = [
      "--color-base-100", "--color-base-content", "--color-base-200", "--color-base-300",
      "--color-primary", "--color-primary-content",
      "--color-secondary", "--color-secondary-content",
      "--color-accent", "--color-accent-content",
      "--color-neutral", "--color-neutral-content",
      "--color-info", "--color-info-content",
      "--color-success", "--color-success-content",
      "--color-warning", "--color-warning-content",
      "--color-error", "--color-error-content"
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
    return props.isPrefersDark
      ? `${block}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n${allProps.map((l) => `  ${l}`).join("\n")}\n  }\n}`
      : block;
  };

  // Solid 2 splits an effect in two: the first function tracks and returns,
  // the second acts on that value. The one-argument form throws
  // MISSING_EFFECT_FN.
  createEffect(
    () => ({ open: props.open, theme: props.theme }),
    ({ open, theme }) => {
      if (open) {
        setCssText(generateCSS(theme));
        setCopyStatus("Copy generated CSS");
        setIsClipboardButtonPressed(false);
      }
    },
  );

  const copyThemeCSSToClipboard = () => {
    const write = navigator.clipboard?.writeText(cssText());
    if (!write) {
      setCopyStatus("CSS copy unavailable");
      return;
    }
    write
      .then(() => {
        setIsClipboardButtonPressed(true);
        setCopyStatus("CSS copied");
        setTimeout(() => setIsClipboardButtonPressed(false), 2000);
      })
      .catch(() => setCopyStatus("CSS copy unavailable"));
  };

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => !open && props.onClose()}
      backdrop="opaque"
      placement="center"
      shouldCloseOnEsc
      shouldCloseOnBackdropClick
    >
      <Dialog.Content class="w-11/12 max-w-4xl">
        <Dialog.Header class="font-bold">
          <Dialog.Heading class="flex items-center gap-2">
            <Icon src="mdi--code-braces" width={20} height={20} />
            CSS Theme
          </Dialog.Heading>
        </Dialog.Header>

        <Dialog.Body>
          <p class="text-sm text-base-content/60 mb-4">
            Copy this CSS to add your theme to @pathscale/ui
          </p>

          <div class="relative">
            <Textarea
              id="theme-generated-css"
              aria-label="Generated theme CSS"
              class="h-80 w-full resize-none font-mono text-xs"
              value={cssText()}
              readonly
              spellcheck={false}
            />

            <Button
              id="theme-copy-css"
              aria-label={copyStatus()}
              class="absolute top-2 right-5"
              size="sm"
              flavor={isClipboardButtonPressed() ? "primary" : "secondary"}
              onClick={copyThemeCSSToClipboard}
            >
              {isClipboardButtonPressed() ? (
                <>
                  <Icon src="mdi--check" width={16} height={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Icon src="mdi--content-copy" width={16} height={16} />
                  Copy
                </>
              )}
            </Button>
          </div>
          <ActionStatus message={copyStatus()} />
        </Dialog.Body>

        <Dialog.Footer>
          <Button id="theme-close-css" onClick={props.onClose}>Close</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
