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

  return <ShowcaseLayout></ShowcaseLayout>;
}
