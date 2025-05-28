import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Modal, Button } from "@pathscale/ui";
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
      description: "Whether the modal is open",
    },
    {
      name: "position",
      type: '"start" | "end" | "top" | "middle" | "bottom"',
      default: "undefined",
      description: "Position of the modal",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description:
        "Whether the modal is responsive (bottom on mobile, middle on desktop)",
    },
    {
      name: "backdrop",
      type: "boolean",
      default: "false",
      description: "Whether to show a backdrop with a close button",
    },
    {
      name: "ariaHidden",
      type: "boolean",
      description: "ARIA hidden attribute",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
  ];

  const [defaultOpen, setDefaultOpen] = createSignal(false);
  const [outsideOpen, setOutsideOpen] = createSignal(false);
  const [closeButtonOpen, setCloseButtonOpen] = createSignal(false);
  const [customWidthOpen, setCustomWidthOpen] = createSignal(false);

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
          <div class="font-sans">
            <Button onClick={() => setDefaultOpen(true)}>Open Modal</Button>
            <Modal open={defaultOpen()} backdrop position="middle">
              <Modal.Header class="font-bold">Hello!</Modal.Header>
              <Modal.Body>Press ESC key or click outside to close</Modal.Body>
              <Modal.Actions>
                <form method="dialog">
                  <Button>Close</Button>
                </form>
              </Modal.Actions>
            </Modal>
          </div>
          <CodeBlock
            code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal 
  open={open()} 
  backdrop
  position="middle"
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>
    Press ESC key or click outside to close
  </Modal.Body>
  <Modal.Actions>
    <form method="dialog">
      <Button>Close</Button>
    </form>
  </Modal.Actions>
</Modal>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="clicked-outside" title="Clicked Outside">
          <div class="font-sans">
            <Button onClick={() => setOutsideOpen(true)}>Open Modal</Button>
            <Modal open={outsideOpen()} backdrop position="middle">
              <Modal.Header class="font-bold">Hello!</Modal.Header>
              <Modal.Body>Press ESC key or click outside to close</Modal.Body>
            </Modal>
          </div>
          <CodeBlock
            code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal 
  open={open()} 
  backdrop 
  position="middle"
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>Press ESC key or click outside to close</Modal.Body>
</Modal>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="close-button" title="Close Button">
          <div class="font-sans">
            <Button onClick={() => setCloseButtonOpen(true)}>Open Modal</Button>
            <Modal open={closeButtonOpen()} backdrop position="middle">
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
          </div>
          <CodeBlock
            code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal 
  open={open()}
  backdrop
  position="middle"
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
  <Modal.Body>Press ESC key or click on X button to close</Modal.Body>
</Modal>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-width" title="Custom Width">
          <div class="font-sans">
            <Button onClick={() => setCustomWidthOpen(true)}>Open Modal</Button>
            <Modal
              open={customWidthOpen()}
              class="w-11/12 max-w-5xl"
              backdrop
              position="middle"
            >
              <Modal.Header class="font-bold">Hello!</Modal.Header>
              <Modal.Body>Press ESC key or click outside to close</Modal.Body>
              <Modal.Actions>
                <form method="dialog">
                  <Button>Close</Button>
                </form>
              </Modal.Actions>
            </Modal>
          </div>
          <CodeBlock
            code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal 
  open={open()} 
  class="w-11/12 max-w-5xl"
  backdrop
  position="middle"
>
  <Modal.Header class="font-bold">Hello!</Modal.Header>
  <Modal.Body>
    Press ESC key or click outside to close
  </Modal.Body>
  <Modal.Actions>
    <form method="dialog">
      <Button>Close</Button>
    </form>
  </Modal.Actions>
</Modal>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={modalProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
