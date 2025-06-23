import { Button, Drawer, Flex, Menu, Navbar } from "@pathscale/ui";
import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DrawerShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "responsive", title: "Responsive" },
    { id: "navbar", title: "With Navbar" },
    { id: "right", title: "Right Side" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    { name: "side", type: "JSX.Element", description: "Drawer content" },
    { name: "open", type: "boolean", description: "Whether drawer is open" },
    { name: "end", type: "boolean", description: "Aligns drawer to right" },
    {
      name: "onClickOverlay",
      type: "() => void",
      description: "Close on overlay click",
    },
    {
      name: "sideClassName",
      type: "string",
      description: "Classes for drawer side",
    },
    {
      name: "contentClassName",
      type: "string",
      description: "Classes for drawer content",
    },
    {
      name: "toggleClassName",
      type: "string",
      description: "Classes for drawer checkbox toggle",
    },
    {
      name: "overlayClassName",
      type: "string",
      description: "Classes for drawer overlay",
    },
    {
      name: "class",
      type: "string",
      description: "Additional container classes",
    },
  ];

  const Sidebar = () => (
    <Menu class="p-4 w-80 h-full bg-base-200 text-base-content">
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
            {(() => {
              const [open, setOpen] = createSignal(false);
              return (
                <Drawer
                  open={open()}
                  onClickOverlay={() => setOpen(false)}
                  side={<Sidebar />}
                  sideClassName="h-full absolute"
                  contentClassName="flex h-56 items-center justify-center"
                >
                  <Button color="primary" onClick={() => setOpen(true)}>
                    Open drawer
                  </Button>
                </Drawer>
              );
            })()}
            <CodeBlock code={`<Drawer open={open} side={<Sidebar />} ... />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            {(() => {
              const [open, setOpen] = createSignal(false);
              return (
                <Drawer
                  open={open()}
                  onClickOverlay={() => setOpen(false)}
                  side={<Sidebar />}
                  class="lg:drawer-open"
                  sideClassName="h-full absolute"
                  contentClassName="flex h-56 items-center justify-center"
                >
                  <Button
                    color="primary"
                    onClick={() => setOpen(true)}
                    class="lg:hidden"
                  >
                    Open drawer
                  </Button>
                </Drawer>
              );
            })()}
            <CodeBlock code={`<Drawer class="lg:drawer-open" ... />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="navbar" title="With Navbar">
          <Flex direction="col" gap="md">
            {(() => {
              const [open, setOpen] = createSignal(false);
              return (
                <Drawer
                  open={open()}
                  onClickOverlay={() => setOpen(false)}
                  side={
                    <Menu class="p-4 w-60 md:w-80 h-full bg-base-200">
                      <Menu.Item>
                        <a>Sidebar Item 1</a>
                      </Menu.Item>
                      <Menu.Item>
                        <a>Sidebar Item 2</a>
                      </Menu.Item>
                    </Menu>
                  }
                  class="h-56 rounded overflow-hidden"
                  contentClassName="flex flex-col"
                >
                  <Navbar class="w-full bg-base-300">
                    <div class="flex-none lg:hidden">
                      <Button
                        shape="square"
                        color="ghost"
                        onClick={() => setOpen(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="w-6 h-6 stroke-current"
                          fill="none"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div class="flex-1 px-2 mx-2">Navbar Title</div>
                    <div class="flex-none hidden lg:block">
                      <Menu horizontal>
                        <Menu.Item>
                          <a>Navbar Item 1</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>Navbar Item 2</a>
                        </Menu.Item>
                      </Menu>
                    </div>
                  </Navbar>
                  <Flex grow align="center" justify="center">
                    Content
                  </Flex>
                </Drawer>
              );
            })()}
            <CodeBlock code={`<Drawer><Navbar>...</Navbar></Drawer>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="right" title="Right Side">
          <Flex direction="col" gap="md">
            {(() => {
              const [open, setOpen] = createSignal(false);
              return (
                <Drawer
                  open={open()}
                  end
                  onClickOverlay={() => setOpen(false)}
                  side={<Sidebar />}
                  sideClassName="h-full absolute ms-[-100vw] w-[stretch]"
                  contentClassName="flex h-56 items-center justify-center"
                >
                  <Button color="primary" onClick={() => setOpen(true)}>
                    Open drawer
                  </Button>
                </Drawer>
              );
            })()}
            <CodeBlock code={`<Drawer end side={...} />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
