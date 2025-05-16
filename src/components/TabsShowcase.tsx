import ShowcaseLayout from "./ShowcaseLayout";
import { Tabs } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TabsShowcase() {
  const types = ["basic", "boxed", "toggle", "toggle-rounded"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const alignments = ["left", "center", "right"] as const;

  const sections = [
    { id: "types", title: "Types" },
    { id: "sizes", title: "Sizes" },
    { id: "alignments", title: "Alignments" },
    { id: "expanded", title: "Expanded" },
    { id: "disabled", title: "Disabled Tabs" },
    { id: "controlled", title: "Controlled Tabs" },
    { id: "props", title: "Props" },
  ] as const;

  const sampleTabs = [
    {
      label: "Tab 1",
      content: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          Content for Tab 1
        </div>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          Content for Tab 2
        </div>
      ),
    },
    {
      label: "Tab 3",
      content: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          Content for Tab 3
        </div>
      ),
    },
  ];

  const disabledTabs = [
    {
      label: "Active",
      content: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          Active tab content
        </div>
      ),
    },
    { label: "Disabled", content: <div>Disabled content</div>, disabled: true },
    {
      label: "Normal",
      content: (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          Normal tab content
        </div>
      ),
    },
  ];

  const tabsProps = [
    {
      name: "items",
      type: "TabItem[]",
      description:
        "Array of tab items with label, content, and optional disabled state",
    },
    {
      name: "type",
      type: '"basic" | "boxed" | "toggle" | "toggle-rounded"',
      default: '"basic"',
      description: "The visual style of the tabs",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the tabs",
    },
    {
      name: "alignment",
      type: '"left" | "center" | "right"',
      default: '"left"',
      description: "The alignment of the tabs",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description: "Whether the tabs should take full width",
    },
    {
      name: "value",
      type: "number",
      description: "Controlled active tab index",
    },
    {
      name: "onChange",
      type: "(index: number) => void",
      description: "Callback when active tab changes",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="types" title="Types">
          <div class="space-y-8">
            {types.map((type) => (
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                  {type}
                </h3>
                <Tabs items={sampleTabs} type={type} />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Tab types
<Tabs
  items={[
    { label: "Tab 1", content: "Content 1" },
    { label: "Tab 2", content: "Content 2" },
  ]}
  type="basic"
/>

<Tabs
  items={tabItems}
  type="boxed"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="space-y-8">
            {sizes.map((size) => (
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Size {size}
                </h3>
                <Tabs items={sampleTabs} size={size} type="toggle" />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Tab sizes
<Tabs
  items={tabItems}
  size="sm"
/>

<Tabs
  items={tabItems}
  size="lg"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alignments" title="Alignments">
          <div class="space-y-8">
            {alignments.map((alignment) => (
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                  {alignment} aligned
                </h3>
                <Tabs items={sampleTabs} alignment={alignment} type="boxed" />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Tab alignments
<Tabs
  items={tabItems}
  alignment="left"
/>

<Tabs
  items={tabItems}
  alignment="center"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="expanded" title="Expanded">
          <div class="space-y-4">
            <Tabs items={sampleTabs} expanded type="toggle" />
          </div>
          <CodeBlock
            code={`// Expanded tabs
<Tabs
  items={tabItems}
  expanded
  type="toggle"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled Tabs">
          <div class="space-y-4">
            <Tabs items={disabledTabs} type="boxed" />
          </div>
          <CodeBlock
            code={`// Disabled tabs
<Tabs
  items={[
    { label: "Active", content: "Active content" },
    { label: "Disabled", content: "Disabled content", disabled: true },
    { label: "Normal", content: "Normal content" },
  ]}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled Tabs">
          <div class="space-y-4">
            <Tabs
              items={sampleTabs}
              value={1}
              onChange={(index) => console.log("Tab changed to:", index)}
            />
          </div>
          <CodeBlock
            code={`// Controlled tabs
const [activeTab, setActiveTab] = createSignal(0);

<Tabs
  items={tabItems}
  value={activeTab()}
  onChange={setActiveTab}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={tabsProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
