// TODO[ui-1.2.2]: Drawer rebuilt as a compound component (Root/Trigger/Backdrop/Content/Dialog/Header/Body/Footer). Old `open`, `side`, `sideClassName`, `contentClassName`, `end`, `onClickOverlay` props removed.
import { Button, Drawer, Flex, Menu } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DrawerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "right", title: "Right Side" },
    { id: "with-header", title: "With Header / Footer" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "isOpen",
      type: "boolean",
      description: "Controlled open state of the drawer",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Uncontrolled initial open state",
    },
    {
      name: "onOpenChange",
      type: "(isOpen: boolean) => void",
      description: "Callback fired when the drawer opens or closes",
    },
    {
      name: "placement",
      type: '"left" | "right" | "top" | "bottom"',
      description: "Edge the drawer slides in from",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl" | "full"',
      description: "Drawer dialog size",
    },
    {
      name: "backdrop",
      type: '"opaque" | "blur" | "transparent" | "none"',
      description: "Backdrop variant rendered behind the drawer",
    },
    {
      name: "isDismissable",
      type: "boolean",
      description: "Whether the drawer can be closed via overlay or Esc",
    },
    {
      name: "shouldCloseOnEsc",
      type: "boolean",
      description: "Whether pressing Esc closes the drawer",
    },
    {
      name: "shouldCloseOnBackdropClick",
      type: "boolean",
      description: "Whether clicking the backdrop closes the drawer",
    },
  ];

  const SidebarMenu = () => (
    <Menu class="p-4 w-full">
      <Menu.Item>
        <a>Sidebar Item 1</a>
      </Menu.Item>
      <Menu.Item>
        <a>Sidebar Item 2</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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
            <Drawer placement="left" size="md">
              <Drawer.Trigger>
                <Button color="primary">Open drawer</Button>
              </Drawer.Trigger>
              <Drawer.Backdrop>
                <Drawer.Content>
                  <Drawer.Dialog>
                    <Drawer.Body>
                      <SidebarMenu />
                    </Drawer.Body>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
            <CodeBlock
              code={`<Drawer placement="left" size="md">
  <Drawer.Trigger>
    <Button color="primary">Open drawer</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop>
    <Drawer.Content>
      <Drawer.Dialog>
        <Drawer.Body><SidebarMenu /></Drawer.Body>
      </Drawer.Dialog>
    </Drawer.Content>
  </Drawer.Backdrop>
</Drawer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="right" title="Right Side">
          <Flex direction="col" gap="md">
            <Drawer placement="right" size="md">
              <Drawer.Trigger>
                <Button color="primary">Open from right</Button>
              </Drawer.Trigger>
              <Drawer.Backdrop>
                <Drawer.Content>
                  <Drawer.Dialog>
                    <Drawer.Body>
                      <SidebarMenu />
                    </Drawer.Body>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
            <CodeBlock code={`<Drawer placement="right" size="md"> ... </Drawer>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-header" title="With Header / Footer">
          <Flex direction="col" gap="md">
            <Drawer placement="left" size="md">
              <Drawer.Trigger>
                <Button color="primary">Open with header</Button>
              </Drawer.Trigger>
              <Drawer.Backdrop>
                <Drawer.Content>
                  <Drawer.Dialog>
                    <Drawer.Header>
                      <Drawer.Heading>Drawer title</Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body>
                      <p>Body content goes here.</p>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.CloseTrigger>Close</Drawer.CloseTrigger>
                    </Drawer.Footer>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
            <CodeBlock
              code={`<Drawer placement="left" size="md">
  <Drawer.Trigger><Button>Open</Button></Drawer.Trigger>
  <Drawer.Backdrop>
    <Drawer.Content>
      <Drawer.Dialog>
        <Drawer.Header><Drawer.Heading>Title</Drawer.Heading></Drawer.Header>
        <Drawer.Body>Body</Drawer.Body>
        <Drawer.Footer><Drawer.CloseTrigger>Close</Drawer.CloseTrigger></Drawer.Footer>
      </Drawer.Dialog>
    </Drawer.Content>
  </Drawer.Backdrop>
</Drawer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
