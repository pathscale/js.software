import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Icon } from "@pathscale/ui";
import { createEffect, createSignal } from "solid-js";
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

export default function ThemeCSSModal(props: ThemeCSSModalProps) {
  const [cssText, setCssText] = createSignal("");
  const [isClipboardButtonPressed, setIsClipboardButtonPressed] = createSignal(false);

  const generateCSS = (theme: Theme) => {
    /*
     * Plain CSS, not a daisyUI `@plugin "daisyui/theme"` block.
     *
     * This exported a theme in a format the site itself no longer uses: a
     * theme in @pathscale/ui is a block of custom properties on a selector and
     * nothing more. Anyone pasting the old output into this repository would
     * have got a rule that never applied, and a plugin directive for a package
     * that is not installed.
     *
     * `default` decides whether the theme also claims `:root`, and
     * `prefersdark` whether it answers the OS preference - the two things the
     * plugin's booleans meant, expressed as selectors and a media query.
     */
    const selectors = [
      props.isDefault ? ":root" : null,
      `[data-theme="${theme.name}"]`,
    ].filter(Boolean).join(",\n");
    const baseProps = [`  color-scheme: ${props.colorScheme || "light"};`];

    // Color properties in specific order like DaisyUI
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
      if (open) setCssText(generateCSS(theme));
    },
  );

  const copyThemeCSSToClipboard = () => {
    navigator.clipboard
      .writeText(cssText())
      .then(() => {
        setIsClipboardButtonPressed(true);
        setTimeout(() => setIsClipboardButtonPressed(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => !open && props.onClose()}
      backdrop="opaque"
      placement="center"
      shouldCloseOnEsc
      shouldCloseOnBackdropClick
      class="w-11/12 max-w-4xl"
    >
      <DialogHeader class="font-bold">
        <div class="flex items-center gap-2">
          <Icon src="mdi--code-braces" width={20} height={20} />
          CSS Theme
        </div>
      </DialogHeader>

      <DialogBody>
        <p class="text-sm text-base-content/60 mb-4">
          Copy this CSS to add your theme to DaisyUI
        </p>

        <div class="relative">
          <textarea
            class="w-full rounded-field border border-base-300 bg-base-100 p-3 font-mono text-xs w-full h-80 font-mono text-xs resize-none"
            value={cssText()}
            readonly
            spellcheck={false}
          />

          <Button
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
      </DialogBody>

      <DialogFooter>
        <Button
          onClick={props.onClose}
          class="mt-5"
        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
