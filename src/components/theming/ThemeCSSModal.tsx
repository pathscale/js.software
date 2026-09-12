import { Button, Dialog, Icon, Textarea } from "@pathscale/ui";
import { createEffect, createSignal } from "solid-js";
import { ActionStatus } from "../showcase/ActionStatus";
import type { Theme } from "../../utils/themeUtils";
import { generateThemeCSS } from "../../lib/themeCSS";

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
  const [copyStatus, setCopyStatus] = createSignal("Copy generated CSS");

  // Solid 2 splits an effect in two: the first function tracks and returns,
  // the second acts on that value. The one-argument form throws
  // MISSING_EFFECT_FN.
  createEffect(
    () => ({ open: props.open, theme: props.theme }),
    ({ open, theme }) => {
      if (open) {
        setCssText(
          generateThemeCSS(theme, {
            isDefault: props.isDefault,
            isPrefersDark: props.isPrefersDark,
            colorScheme: props.colorScheme,
          }),
        );
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
