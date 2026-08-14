import ShowcaseLayout from "./ShowcaseLayout";
import { Flex } from "@pathscale/ui";
import { Menu } from "@pathscale/ui/lab";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function MenuShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "single-selection", title: "Single Selection" },
    { id: "multiple-selection", title: "Multiple Selection" },
    { id: "disabled", title: "Disabled Items" },
    { id: "icons", title: "With Icons" },
    { id: "sections", title: "Sections" },
    { id: "items-prop", title: "Items Prop" },
    { id: "props", title: "Props" },
  ] as const;

  const menuProps = [
    {
      name: "selectionMode",
      type: '"none" | "single" | "multiple"',
      default: '"none"',
      description: 'Selection behavior. "none" makes the menu action-only',
    },
    {
      name: "selectedKeys",
      type: "Iterable<string | number>",
      description: "Controlled set of selected keys",
    },
    {
      name: "defaultSelectedKeys",
      type: "Iterable<string | number>",
      description: "Default set of selected keys (uncontrolled)",
    },
    {
      name: "disabledKeys",
      type: "Iterable<string | number>",
      description: "Set of keys that are disabled",
    },
    {
      name: "disallowEmptySelection",
      type: "boolean",
      description: "Prevent deselecting the last selected item",
    },
    {
      name: "onSelectionChange",
      type: "(keys: Set<string>) => void",
      description: "Callback fired when selection changes",
    },
    {
      name: "onAction",
      type: "(key: string) => void",
      description: "Callback fired when an item is activated",
    },
    {
      name: "items",
      type: "readonly T[]",
      description: "Data source for rendering items via children render fn",
    },
    {
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  const IconHome = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
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
  );

  const IconInfo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
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
  );

  const IconStats = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
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
  );

  type FileItem = { id: string; name: string };
  const fileItems: readonly FileItem[] = [
    { id: "readme", name: "README.md" },
    { id: "package", name: "package.json" },
    { id: "tsconfig", name: "tsconfig.json" },
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
            <Flex justify="start" align="start">
              <Menu class="w-56 bg-base-200 rounded-box">
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
                <Menu.Item>Item 3</Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item>Item 1</Menu.Item>
  <Menu.Item>Item 2</Menu.Item>
  <Menu.Item>Item 3</Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="single-selection" title="Single Selection">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu
                selectionMode="single"
                defaultSelectedKeys={["item-2"]}
                class="w-56 bg-base-200 rounded-box"
              >
                <Menu.Item id="item-1">
                  <Menu.ItemIndicator />
                  Item 1
                </Menu.Item>
                <Menu.Item id="item-2">
                  <Menu.ItemIndicator />
                  Item 2
                </Menu.Item>
                <Menu.Item id="item-3">
                  <Menu.ItemIndicator />
                  Item 3
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu selectionMode="single" defaultSelectedKeys={["item-2"]}>
  <Menu.Item id="item-1">
    <Menu.ItemIndicator />
    Item 1
  </Menu.Item>
  <Menu.Item id="item-2">
    <Menu.ItemIndicator />
    Item 2
  </Menu.Item>
  <Menu.Item id="item-3">
    <Menu.ItemIndicator />
    Item 3
  </Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="multiple-selection" title="Multiple Selection">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu
                selectionMode="multiple"
                defaultSelectedKeys={["a", "c"]}
                class="w-56 bg-base-200 rounded-box"
              >
                <Menu.Item id="a">
                  <Menu.ItemIndicator />A
                </Menu.Item>
                <Menu.Item id="b">
                  <Menu.ItemIndicator />B
                </Menu.Item>
                <Menu.Item id="c">
                  <Menu.ItemIndicator />C
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu selectionMode="multiple" defaultSelectedKeys={["a", "c"]}>
  <Menu.Item id="a"><Menu.ItemIndicator />A</Menu.Item>
  <Menu.Item id="b"><Menu.ItemIndicator />B</Menu.Item>
  <Menu.Item id="c"><Menu.ItemIndicator />C</Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled Items">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu class="w-56 bg-base-200 rounded-box">
                <Menu.Item>Enabled item</Menu.Item>
                <Menu.Item state="disabled">Disabled item</Menu.Item>
                <Menu.Item state="disabled">Disabled item</Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item>Enabled item</Menu.Item>
  <Menu.Item state="disabled">Disabled item</Menu.Item>
  <Menu.Item state="disabled">Disabled item</Menu.Item>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu class="w-56 bg-base-200 rounded-box">
                <Menu.Item>
                  <Flex gap="sm" align="center">
                    <IconHome />
                    Home
                  </Flex>
                </Menu.Item>
                <Menu.Item>
                  <Flex gap="sm" align="center">
                    <IconInfo />
                    About
                  </Flex>
                </Menu.Item>
                <Menu.Item>
                  <Flex gap="sm" align="center">
                    <IconStats />
                    Stats
                  </Flex>
                </Menu.Item>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Item>
    <Flex gap="sm" align="center">
      <IconHome />
      Home
    </Flex>
  </Menu.Item>
  ...
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sections" title="Sections">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu class="w-56 bg-base-200 rounded-box">
                <Menu.Section title="Account">
                  <Menu.Item>Profile</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                </Menu.Section>
                <Menu.Section title="Workspace">
                  <Menu.Item>Members</Menu.Item>
                  <Menu.Item>Billing</Menu.Item>
                </Menu.Section>
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu>
  <Menu.Section title="Account">
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Settings</Menu.Item>
  </Menu.Section>
  <Menu.Section title="Workspace">
    <Menu.Item>Members</Menu.Item>
    <Menu.Item>Billing</Menu.Item>
  </Menu.Section>
</Menu>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="items-prop" title="Items Prop">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Menu
                items={fileItems}
                class="w-56 bg-base-200 rounded-box"
                onAction={(key) => console.log("activated", key)}
              >
                {(item) => <Menu.Item id={(item as FileItem).id}>{(item as FileItem).name}</Menu.Item>}
              </Menu>
            </Flex>
            <CodeBlock
              code={`<Menu items={fileItems} onAction={(key) => console.log(key)}>
  {(item) => <Menu.Item id={item.id}>{item.name}</Menu.Item>}
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
