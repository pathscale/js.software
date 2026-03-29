import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { ConfirmDialog, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ConfirmDialogShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "danger", title: "Danger Variant" },
    { id: "loading", title: "Loading State" },
    { id: "props", title: "Props" },
  ] as const;

  const confirmDialogProps = [
    {
      name: "open",
      type: "boolean",
      description: "Whether the dialog is open",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when the dialog is closed or cancelled",
    },
    {
      name: "onConfirm",
      type: "() => void",
      description: "Callback when the confirm button is clicked",
    },
    {
      name: "title",
      type: "string",
      description: "Dialog title text",
    },
    {
      name: "message",
      type: "JSX.Element",
      description: "Dialog body message",
    },
    {
      name: "confirmText",
      type: "string",
      default: '"Confirm"',
      description: "Text for the confirm button",
    },
    {
      name: "cancelText",
      type: "string",
      default: '"Cancel"',
      description: "Text for the cancel button",
    },
    {
      name: "confirmColor",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      default: '"error"',
      description: "Color of the confirm button",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Shows loading state on the confirm button",
    },
  ];

  const [defaultOpen, setDefaultOpen] = createSignal(false);
  const [dangerOpen, setDangerOpen] = createSignal(false);
  const [loadingOpen, setLoadingOpen] = createSignal(false);

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Button color="primary" onClick={() => setDefaultOpen(true)}>
                Open Confirm Dialog
              </Button>
            </Flex>
            <ConfirmDialog
              open={defaultOpen()}
              onClose={() => setDefaultOpen(false)}
              onConfirm={() => setDefaultOpen(false)}
              title="Confirm Action"
              message="Are you sure you want to proceed with this action?"
              confirmText="Yes, proceed"
              confirmColor="primary"
            />
            <CodeBlock
              code={`<Button color="primary" onClick={() => setOpen(true)}>
  Open Confirm Dialog
</Button>
<ConfirmDialog
  open={open()}
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
  title="Confirm Action"
  message="Are you sure you want to proceed with this action?"
  confirmText="Yes, proceed"
  confirmColor="primary"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="danger" title="Danger Variant">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Button color="error" onClick={() => setDangerOpen(true)}>
                Delete Item
              </Button>
            </Flex>
            <ConfirmDialog
              open={dangerOpen()}
              onClose={() => setDangerOpen(false)}
              onConfirm={() => setDangerOpen(false)}
              title="Delete Item"
              message="This action cannot be undone. Are you sure you want to delete this item?"
              confirmText="Delete"
              confirmColor="error"
            />
            <CodeBlock
              code={`<ConfirmDialog
  open={open()}
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
  title="Delete Item"
  message="This action cannot be undone. Are you sure you want to delete this item?"
  confirmText="Delete"
  confirmColor="error"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="loading" title="Loading State">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Button color="warning" onClick={() => setLoadingOpen(true)}>
                Open Loading Dialog
              </Button>
            </Flex>
            <ConfirmDialog
              open={loadingOpen()}
              onClose={() => setLoadingOpen(false)}
              onConfirm={() => {}}
              title="Processing"
              message="Please wait while we process your request..."
              confirmText="Confirming..."
              loading
            />
            <CodeBlock
              code={`<ConfirmDialog
  open={open()}
  onClose={() => setOpen(false)}
  onConfirm={handleConfirm}
  title="Processing"
  message="Please wait while we process your request..."
  confirmText="Confirming..."
  loading
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={confirmDialogProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
