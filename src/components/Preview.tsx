import { Icon, Tabs } from "@pathscale/ui";
import ComponentsDemo from "./ComponentsDemo";
import ComponentVariants from "./ComponentVariants";
import ColorPalette from "./ColorPalette";
import { createSignal } from "solid-js";

type TabKey = "demo" | "variants" | "palette";

interface PreviewProps {
  currentTheme: Record<string, string>;
}

const TAB_TITLES: Record<TabKey, string> = {
  demo: "Components Demo",
  variants: "Component Variants",
  palette: "Color Palette",
};

export default function Preview(props: PreviewProps) {
  const [selectedKey, setSelectedKey] = createSignal<TabKey>("demo");

  const handleSelectionChange = (key: string | number) => {
    setSelectedKey(key as TabKey);
  };

  return (
    <div
      id="theme-preview"
      class="text-base-content pt-6 transition-colors duration-500 bg-base-300"
    >
      <div class="flex flex-col items-start gap-3 px-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:ps-10">
        <h2 class="font-title text-lg">{TAB_TITLES[selectedKey()]}</h2>
        <Tabs
          id="theme-preview-tabs"
          variant="primary"
          selectedKey={selectedKey()}
          onSelectionChange={handleSelectionChange as never}
          class="bg-base-300"
        >
          <Tabs.List>
            <Tabs.Tab id="demo" aria-label="Components Demo">
              <Icon src="mdi--apps" width={16} height={16} />
              <span>Demo</span>
            </Tabs.Tab>
            <Tabs.Tab id="variants" aria-label="Component Variants">
              <Icon src="mdi--format-list-bulleted" width={16} height={16} />
              <span>Variants</span>
            </Tabs.Tab>
            <Tabs.Tab id="palette" aria-label="Color Palette">
              <Icon src="mdi--palette" width={16} height={16} />
              <span>Palette</span>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div class="px-3 py-4 sm:px-8 sm:py-6">
        {selectedKey() === "demo" && (
          <ComponentsDemo glassEnabled={props.currentTheme._glassEnabled !== "0"} />
        )}
        {selectedKey() === "variants" && <ComponentVariants />}
        {selectedKey() === "palette" && <ColorPalette currentTheme={props.currentTheme} />}
      </div>
    </div>
  );
}
