import ShowcaseLayout from "./ShowcaseLayout";
import { Menu, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function MenuShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "responsive", title: "Responsive" },
    { id: "icon-only", title: "Icon Only" },
    { id: "horizontal", title: "Horizontal" },
    { id: "sizes", title: "Sizes" },
    { id: "disabled", title: "Disabled Items" },
    { id: "icons", title: "With Icons" },
    { id: "icons-and-badge", title: "Icons and Badge" },
    { id: "title", title: "With Title" },
    { id: "submenu", title: "Submenu" },
    { id: "collapsible", title: "Collapsible Submenu" },
    { id: "file-tree", title: "File Tree" },
    { id: "active", title: "Active Item" },
    { id: "mega-menu", title: "Mega Menu" },
    { id: "props", title: "Props" },
  ] as const;

  const menuProps = [
    {
      name: "vertical",
      type: "boolean",
      default: "true",
      description: "Vertical menu (default)",
    },
    {
      name: "horizontal",
      type: "boolean",
      default: "false",
      description: "Horizontal menu",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description: "Makes the menu responsive",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the menu",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

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
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 2</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item><a>Item 2</a></Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu responsive>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 2</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu responsive>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item><a>Item 2</a></Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icon-only" title="Icon Only">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item>
    <a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </a>
  </Menu.Item>
  {/* ... other menu items with icons ... */}
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="horizontal" title="Horizontal">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu horizontal>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 2</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu horizontal>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item><a>Item 2</a></Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center" gap="lg">
              <Menu size="xs" class="w-56 bg-base-200 rounded-box">
                <Menu.Item>
                  <a>xs item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>xs item 2</a>
                </Menu.Item>
              </Menu>
              <Menu size="sm" class="w-56 bg-base-200 rounded-box">
                <Menu.Item>
                  <a>sm item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>sm item 2</a>
                </Menu.Item>
              </Menu>
              <Menu size="md" class="w-56 bg-base-200 rounded-box">
                <Menu.Item>
                  <a>md item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>md item 2</a>
                </Menu.Item>
              </Menu>
              <Menu size="lg" class="w-56 bg-base-200 rounded-box">
                <Menu.Item>
                  <a>lg item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>lg item 2</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu size="xs">
  <Menu.Item><a>xs item 1</a></Menu.Item>
  <Menu.Item><a>xs item 2</a></Menu.Item>
</Menu>
{/* ... other sizes ... */}`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled Items">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>Enabled item</a>
                </Menu.Item>
                <Menu.Item disabled>
                  <a>Disabled item</a>
                </Menu.Item>
                <Menu.Item disabled>
                  <a>Disabled item</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item><a>Enabled item</a></Menu.Item>
  <Menu.Item disabled><a>Disabled item</a></Menu.Item>
  <Menu.Item disabled><a>Disabled item</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Item 1
                  </a>
                </Menu.Item>
                {/* Similar items with icons */}
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item>
    <a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Item 1
    </a>
  </Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="submenu" title="Submenu">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Parent</a>
                  <Menu>
                    <Menu.Item>
                      <a>Level 2 Item 1</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Level 2 Item 2</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Parent</a>
                      <Menu>
                        <Menu.Item>
                          <a>Level 3 Item 1</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>Level 3 Item 2</a>
                        </Menu.Item>
                      </Menu>
                    </Menu.Item>
                  </Menu>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item>
    <a>Parent</a>
    <Menu>
      <Menu.Item><a>Level 2 Item 1</a></Menu.Item>
      <Menu.Item><a>Level 2 Item 2</a></Menu.Item>
      <Menu.Item>
        <a>Parent</a>
        <Menu>
          <Menu.Item><a>Level 3 Item 1</a></Menu.Item>
          <Menu.Item><a>Level 3 Item 2</a></Menu.Item>
        </Menu>
      </Menu.Item>
    </Menu>
  </Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="collapsible" title="Collapsible Submenu">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Details open={true} label="Parent">
                    <Menu.Item>
                      <a>Level 2 Item 1</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Level 2 Item 2</a>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Details open={true} label="Parent">
                        <Menu.Item>
                          <a>Level 3 Item 1</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>Level 3 Item 2</a>
                        </Menu.Item>
                      </Menu.Details>
                    </Menu.Item>
                  </Menu.Details>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item>
    <Menu.Details open={true} label="Parent">
      <Menu.Item><a>Level 2 Item 1</a></Menu.Item>
      <Menu.Item><a>Level 2 Item 2</a></Menu.Item>
      <Menu.Item>
        <Menu.Details open={true} label="Parent">
          <Menu.Item><a>Level 3 Item 1</a></Menu.Item>
          <Menu.Item><a>Level 3 Item 2</a></Menu.Item>
        </Menu.Details>
      </Menu.Item>
    </Menu.Details>
  </Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="active" title="Active Item">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu>
                <Menu.Item>
                  <a>Item 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a class="active">Item 2</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Item 3</a>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item><a>Item 1</a></Menu.Item>
  <Menu.Item><a class="active">Item 2</a></Menu.Item>
  <Menu.Item><a>Item 3</a></Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="mega-menu" title="Mega Menu">
          <Flex direction="col" gap="md">
            <Flex justify="center" align="center">
              <Menu responsive>
                <Menu.Item>
                  <a>Solutions</a>
                  <Menu>
                    <Menu.Item>
                      <a>Design</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Development</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Hosting</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Domain register</a>
                    </Menu.Item>
                  </Menu>
                </Menu.Item>
                <Menu.Item>
                  <a>Enterprise</a>
                  <Menu>
                    <Menu.Item>
                      <a>CRM software</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Marketing management</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Security</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Consulting</a>
                    </Menu.Item>
                  </Menu>
                </Menu.Item>
                <Menu.Item>
                  <a>Products</a>
                  <Menu>
                    <Menu.Item>
                      <a>UI Kit</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Wordpress themes</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Wordpress plugins</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a>Open source</a>
                      <Menu>
                        <Menu.Item>
                          <a>Auth management system</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>VScode theme</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>Color picker app</a>
                        </Menu.Item>
                      </Menu>
                    </Menu.Item>
                  </Menu>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu responsive>
  <Menu.Item>
    <a>Solutions</a>
    <Menu>
      <Menu.Item><a>Design</a></Menu.Item>
      <Menu.Item><a>Development</a></Menu.Item>
      <Menu.Item><a>Hosting</a></Menu.Item>
      <Menu.Item><a>Domain register</a></Menu.Item>
    </Menu>
  </Menu.Item>
  {/* ... other menu items ... */}
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={menuProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
