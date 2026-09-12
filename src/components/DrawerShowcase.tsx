import { Button, Drawer, Flex } from "@pathscale/ui";
import { Menu } from "@pathscale/ui/lab";
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
      name: "open",
      type: `boolean`,
      description: "Completes the open / defaultOpen / onOpenChange triple.",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Drawer placement="left" size="md">
              <Drawer.Trigger as={Button}>Open drawer</Drawer.Trigger>
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
  <Drawer.Trigger as={Button} flavor="primary">Open drawer</Drawer.Trigger>
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
              <Drawer.Trigger as={Button}>Open from right</Drawer.Trigger>
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
              <Drawer.Trigger as={Button}>Open with header</Drawer.Trigger>
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
  <Drawer.Trigger as={Button}>Open</Drawer.Trigger>
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
