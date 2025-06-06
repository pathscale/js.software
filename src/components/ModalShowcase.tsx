import { createSignal, Show } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Modal, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ModalShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "clicked-outside", title: "Clicked Outside" },
    { id: "close-button", title: "Close Button" },
    { id: "custom-width", title: "Custom Width" },
    { id: "props", title: "Props" },
  ] as const;

  const modalProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controls the visibility of the modal.",
    },
    {
      name: "position",
      type: `"start" | "end" | "top" | "middle" | "bottom"`,
      default: "undefined",
      description: "Sets the modal position.",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description: "Enables responsive behavior.",
    },
    {
      name: "backdrop",
      type: "boolean",
      default: "false",
      description: "Displays a backdrop behind the modal.",
    },
    {
      name: "ariaHidden",
      type: "boolean",
      description: "Controls aria-hidden attribute for accessibility.",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when modal is closed.",
    },
    {
      name: "closeOnEsc",
      type: "boolean",
      default: "false",
      description: "Enables closing the modal with the ESC key.",
    },
    {
      name: "closeOnOutsideClick",
      type: "boolean",
      default: "false",
      description: "Enables closing the modal by clicking outside.",
    },
  ];

  const modalHeaderProps = [
    {
      name: "class",
      type: "string",
      description: "Custom CSS classes for the header container.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content of the header.",
    },
  ];

  const modalBodyProps = [
    {
      name: "class",
      type: "string",
      description: "Custom CSS classes for the body container.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content of the body.",
    },
  ];

  const modalActionsProps = [
    {
      name: "class",
      type: "string",
      description: "Custom CSS classes for the actions container.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Buttons or elements shown as actions.",
    },
  ];

  const modalLegacyProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controls the visibility of the legacy modal.",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description: "Enables responsive layout.",
    },
    {
      name: "onClickBackdrop",
      type: "() => void",
      description: "Called when backdrop is clicked.",
    },
    {
      name: "class",
      type: "string",
      description: "Custom CSS classes for the modal container.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content of the modal.",
    },
  ];

  const [defaultOpen, setDefaultOpen] = createSignal(false);
  const [outsideOpen, setOutsideOpen] = createSignal(false);
  const [closeButtonOpen, setCloseButtonOpen] = createSignal(false);
  const [customWidthOpen, setCustomWidthOpen] = createSignal(false);
  const [legacyOpen, setLegacyOpen] = createSignal(false);

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Button onClick={() => setDefaultOpen(true)}>Open Modal</Button>
              <Modal
                open={defaultOpen()}
                onClose={() => setDefaultOpen(false)}
                backdrop
                position="middle"
                closeOnEsc
                closeOnOutsideClick
              >
                <Modal.Header class="font-bold">Hello!</Modal.Header>
                <Modal.Body>Press ESC key or click outside to close</Modal.Body>
                <Modal.Actions>
                  <form method="dialog">
                    <Button>Close</Button>
                  </form>
                </Modal.Actions>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  open={open()}
  onClose={() => setOpen(false)}
  backdrop
  position="middle"
  closeOnEsc
  closeOnOutsideClick
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
  <Modal.Actions>
    <form method="dialog">
      <Button>Close</Button>
    </form>
  </Modal.Actions>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outside-click" title="Click Outside">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Button onClick={() => setOutsideOpen(true)}>Open Modal</Button>
              <Modal
                open={outsideOpen()}
                onClose={() => setOutsideOpen(false)}
                backdrop
                position="middle"
                closeOnEsc
                closeOnOutsideClick
              >
                <Modal.Header class="font-bold">Hello!</Modal.Header>
                <Modal.Body>Press ESC key or click outside to close</Modal.Body>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  open={open()}
  onClose={() => setOpen(false)}
  backdrop
  position="middle"
  closeOnEsc
  closeOnOutsideClick
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="close-button" title="Close Button">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Button onClick={() => setCloseButtonOpen(true)}>
                Open Modal
              </Button>
              <Modal
                open={closeButtonOpen()}
                onClose={() => setCloseButtonOpen(false)}
                backdrop
                position="middle"
                closeOnEsc
                closeOnOutsideClick
              >
                <form method="dialog">
                  <Button
                    size="sm"
                    color="ghost"
                    shape="circle"
                    class="absolute right-2 top-2"
                  >
                    ✕
                  </Button>
                </form>
                <Modal.Header class="font-bold">Hello!</Modal.Header>
                <Modal.Body>
                  Press ESC key or click on X button to close
                </Modal.Body>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal open={open()} onClose={() => setOpen(false)} backdrop position="middle">
  <form method="dialog">
    <Button size="sm" color="ghost" shape="circle" class="absolute right-2 top-2">✕</Button>
  </form>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>Press ESC key or click on X button to close</Modal.Body>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-width" title="Custom Width">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Button onClick={() => setCustomWidthOpen(true)}>
                Open Modal
              </Button>
              <Modal
                open={customWidthOpen()}
                onClose={() => setCustomWidthOpen(false)}
                backdrop
                position="middle"
                closeOnEsc
                closeOnOutsideClick
                class="w-11/12 max-w-5xl"
              >
                <Modal.Header class="font-bold">Hello!</Modal.Header>
                <Modal.Body>Press ESC key or click outside to close</Modal.Body>
                <Modal.Actions>
                  <form method="dialog">
                    <Button>Close</Button>
                  </form>
                </Modal.Actions>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  open={open()}
  onClose={() => setOpen(false)}
  backdrop
  position="middle"
  class="w-11/12 max-w-5xl"
  closeOnEsc
  closeOnOutsideClick
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
  <Modal.Actions>
    <form method="dialog">
      <Button>Close</Button>
    </form>
  </Modal.Actions>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="legacy" title="Modal Legacy">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Button onClick={() => setLegacyOpen(true)}>
                Open Legacy Modal
              </Button>
              <Show when={legacyOpen()}>
                <Modal.Legacy open onClickBackdrop={() => setLegacyOpen(false)}>
                  <h3 class="text-lg font-bold mb-2">Legacy Modal</h3>
                  <p>
                    This modal uses a div-based implementation with backdrop
                    click detection.
                  </p>
                  <div class="modal-action mt-4">
                    <Button onClick={() => setLegacyOpen(false)}>Close</Button>
                  </div>
                </Modal.Legacy>
              </Show>
            </Flex>
            <CodeBlock
              code={`<Show when={open()}>
  <Modal.Legacy open onClickBackdrop={() => setOpen(false)}>
    <h3 class="text-lg font-bold mb-2">Legacy Modal</h3>
    <p>This modal uses a div-based implementation with backdrop click detection.</p>
    <div class="modal-action mt-4">
      <Button onClick={() => setOpen(false)}>Close</Button>
    </div>
  </Modal.Legacy>
</Show>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Modal</h3>
            <PropsTable props={modalProps} />

            <h3 class="text-lg font-semibold">Modal.Header</h3>
            <PropsTable props={modalHeaderProps} />

            <h3 class="text-lg font-semibold">Modal.Body</h3>
            <PropsTable props={modalBodyProps} />

            <h3 class="text-lg font-semibold">Modal.Actions</h3>
            <PropsTable props={modalActionsProps} />

            <h3 class="text-lg font-semibold">Modal.Legacy</h3>
            <PropsTable props={modalLegacyProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
