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
    <div class="text-base-content pt-6 transition-colors duration-500 bg-base-300">
      <div class="flex items-center justify-between gap-4 px-8 ps-10">
        <h2 class="font-title text-lg md:max-lg:hidden">{TAB_TITLES[selectedKey()]}</h2>
        <Tabs
          variant="primary"
          selectedKey={selectedKey()}
          onSelectionChange={handleSelectionChange as never}
          class="bg-base-300"
        >
          <Tabs.List>
            <Tabs.Tab id="demo">
              <Icon name="icon-[mdi--apps]" width={16} height={16} />
            </Tabs.Tab>
            <Tabs.Tab id="variants">
              <Icon name="icon-[mdi--format-list-bulleted]" width={16} height={16} />
            </Tabs.Tab>
            <Tabs.Tab id="palette">
              <Icon name="icon-[mdi--palette]" width={16} height={16} />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div class="px-8 py-6">
        {selectedKey() === "demo" && <ComponentsDemo />}
        {selectedKey() === "variants" && <ComponentVariants />}
        {selectedKey() === "palette" && <ColorPalette currentTheme={props.currentTheme} />}
      </div>
    </div>
  );
}
