import { Button, Icon, Dialog, DialogBody, DialogFooter, DialogHeader } from "@pathscale/ui";
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
    const baseProps = [
      `  name: "${theme.name}";`,
      `  default: ${props.isDefault ? "true" : "false"};`,
      `  prefersdark: ${props.isPrefersDark ? "true" : "false"};`,
      `  color-scheme: "${props.colorScheme || "light"}";`,
    ];

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

    return `@plugin "daisyui/theme" {\n${allProps.join("\n")}\n}`;
  };

  createEffect(() => {
    if (props.open) {
      setCssText(generateCSS(props.theme));
    }
  });

  // Update CSS when options change
  createEffect(() => {
    if (props.open) {
      setCssText(generateCSS(props.theme));
    }
  });

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
            class="textarea textarea-bordered w-full h-80 font-mono text-xs resize-none"
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
