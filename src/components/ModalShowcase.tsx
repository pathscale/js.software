import { createSignal } from "solid-js";
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
    { id: "sizes", title: "Sizes" },
    { id: "custom-width", title: "Custom Width" },
    { id: "props", title: "Props" },
  ] as const;

  const modalProps = [
    {
      name: "isOpen",
      type: "boolean",
      default: "false",
      description: "Controls the visibility of the modal.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Initial open state for uncontrolled mode.",
    },
    {
      name: "onOpenChange",
      type: "(isOpen: boolean) => void",
      description: "Callback fired when open state changes.",
    },
    {
      name: "placement",
      type: `"auto" | "top" | "center" | "bottom"`,
      default: `"auto"`,
      description: "Sets the modal position.",
    },
    {
      name: "backdrop",
      type: `"opaque" | "blur" | "transparent"`,
      default: `"opaque"`,
      description: "Backdrop appearance variant.",
    },
    {
      name: "isDismissable",
      type: "boolean",
      default: "true",
      description: "Whether the modal can be dismissed by the user.",
    },
    {
      name: "shouldCloseOnEsc",
      type: "boolean",
      default: "true",
      description: "Enables closing the modal with the ESC key.",
    },
    {
      name: "shouldCloseOnBackdropClick",
      type: "boolean",
      default: "true",
      description: "Enables closing the modal by clicking outside.",
    },
    {
      name: "size",
      type: `"xs" | "sm" | "md" | "lg" | "cover" | "full"`,
      description: "Size of the modal.",
    },
    {
      name: "scrollBehavior",
      type: `"inside" | "outside"`,
      default: `"inside"`,
      description: "Controls scrolling behavior of modal content.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class).",
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

  const modalFooterProps = [
    {
      name: "class",
      type: "string",
      description: "Custom CSS classes for the footer container.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Buttons or elements shown in the footer.",
    },
  ];

  const [defaultOpen, setDefaultOpen] = createSignal(false);
  const [outsideOpen, setOutsideOpen] = createSignal(false);
  const [closeButtonOpen, setCloseButtonOpen] = createSignal(false);
  const [customWidthOpen, setCustomWidthOpen] = createSignal(false);

  const [xsModalOpen, setXsModalOpen] = createSignal(false);
  const [smModalOpen, setSmModalOpen] = createSignal(false);
  const [lgModalOpen, setLgModalOpen] = createSignal(false);

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
            <Flex justify="start" align="start">
              <Button onClick={() => setDefaultOpen(true)}>Open Modal</Button>
              <Modal
                isOpen={defaultOpen()}
                onOpenChange={setDefaultOpen}
                backdrop="opaque"
                placement="center"
              >
                <Modal.Content>
                  <Modal.Header class="font-bold">Hello!</Modal.Header>
                  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger>
                      <Button>Close</Button>
                    </Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  isOpen={open()}
  onOpenChange={setOpen}
  backdrop="opaque"
  placement="center"
>
  <Modal.Content>
    <Modal.Header class="font-bold">Hello!</Modal.Header>
    <Modal.Body>Press ESC key or click outside to close</Modal.Body>
    <Modal.Footer>
      <Modal.CloseTrigger>
        <Button>Close</Button>
      </Modal.CloseTrigger>
    </Modal.Footer>
  </Modal.Content>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outside-click" title="Click Outside">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button onClick={() => setOutsideOpen(true)}>Open Modal</Button>
              <Modal
                isOpen={outsideOpen()}
                onOpenChange={setOutsideOpen}
                backdrop="opaque"
                placement="center"
              >
                <Modal.Content>
                  <Modal.Header class="font-bold">Hello!</Modal.Header>
                  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
                </Modal.Content>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  isOpen={open()}
  onOpenChange={setOpen}
  backdrop="opaque"
  placement="center"
>
  <Modal.Content>
    <Modal.Header class="font-bold">Hello!</Modal.Header>
    <Modal.Body>Press ESC key or click outside to close</Modal.Body>
  </Modal.Content>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="close-button" title="Close Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button onClick={() => setCloseButtonOpen(true)}>
                Open Modal
              </Button>
              <Modal
                isOpen={closeButtonOpen()}
                onOpenChange={setCloseButtonOpen}
                backdrop="opaque"
                placement="center"
              >
                <Modal.Content>
                  <Modal.CloseTrigger class="absolute right-2 top-2" />
                  <Modal.Header class="font-bold">Hello!</Modal.Header>
                  <Modal.Body>
                    Press ESC key or click on X button to close
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal isOpen={open()} onOpenChange={setOpen} backdrop="opaque" placement="center">
  <Modal.Content>
    <Modal.CloseTrigger class="absolute right-2 top-2" />
    <Modal.Header class="font-bold">Hello!</Modal.Header>
    <Modal.Body>Press ESC key or click on X button to close</Modal.Body>
  </Modal.Content>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="md">
              <Button onClick={() => setXsModalOpen(true)}>XS Modal</Button>
              <Modal
                isOpen={xsModalOpen()}
                onOpenChange={setXsModalOpen}
                backdrop="opaque"
                placement="center"
                size="xs"
              >
                <Modal.Content>
                  <Modal.Header class="font-bold">XS Modal</Modal.Header>
                  <Modal.Body>This is an extra small modal</Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger>
                      <Button>Close</Button>
                    </Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

              <Button onClick={() => setSmModalOpen(true)}>SM Modal</Button>
              <Modal
                isOpen={smModalOpen()}
                onOpenChange={setSmModalOpen}
                backdrop="opaque"
                placement="center"
                size="sm"
              >
                <Modal.Content>
                  <Modal.Header class="font-bold">Small Modal</Modal.Header>
                  <Modal.Body>This is a small modal</Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger>
                      <Button>Close</Button>
                    </Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

              <Button onClick={() => setLgModalOpen(true)}>LG Modal</Button>
              <Modal
                isOpen={lgModalOpen()}
                onOpenChange={setLgModalOpen}
                backdrop="opaque"
                placement="center"
                size="lg"
              >
                <Modal.Content>
                  <Modal.Header class="font-bold">Large Modal</Modal.Header>
                  <Modal.Body>This is a large modal with more content space</Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger>
                      <Button>Close</Button>
                    </Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal size="xs" isOpen={open()} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>XS Modal</Modal.Header>
    <Modal.Body>Extra small modal</Modal.Body>
  </Modal.Content>
</Modal>

<Modal size="sm" isOpen={open()} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>Small Modal</Modal.Header>
    <Modal.Body>Small modal</Modal.Body>
  </Modal.Content>
</Modal>

<Modal size="lg" isOpen={open()} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>Large Modal</Modal.Header>
    <Modal.Body>Large modal</Modal.Body>
  </Modal.Content>
</Modal>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-width" title="Custom Width">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button onClick={() => setCustomWidthOpen(true)}>
                Open Modal
              </Button>
              <Modal
                isOpen={customWidthOpen()}
                onOpenChange={setCustomWidthOpen}
                backdrop="opaque"
                placement="center"
              >
                <Modal.Content class="w-11/12 max-w-5xl">
                  <Modal.Header class="font-bold">Hello!</Modal.Header>
                  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger>
                      <Button>Close</Button>
                    </Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Flex>
            <CodeBlock
              code={`<Modal
  isOpen={open()}
  onOpenChange={setOpen}
  backdrop="opaque"
  placement="center"
>
  <Modal.Content class="w-11/12 max-w-5xl">
    <Modal.Header class="font-bold">Hello!</Modal.Header>
    <Modal.Body>Press ESC key or click outside to close</Modal.Body>
    <Modal.Footer>
      <Modal.CloseTrigger>
        <Button>Close</Button>
      </Modal.CloseTrigger>
    </Modal.Footer>
  </Modal.Content>
</Modal>`}
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

            <h3 class="text-lg font-semibold">Modal.Footer</h3>
            <PropsTable props={modalFooterProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
