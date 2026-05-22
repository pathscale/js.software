import { createSignal } from "solid-js";
import { Icon, Tabs } from "@pathscale/ui";
import ComponentsDemo from "./ComponentsDemo";
import ComponentVariants from "./ComponentVariants";
import ColorPalette from "./ColorPalette";

interface PreviewProps {
  currentTheme: Record<string, string>;
}

export default function Preview(props: PreviewProps) {
  const [previewtabs, setPreviewtabs] = createSignal("Components Demo");

  return (
    <div class="text-base-content pt-6 transition-colors duration-500 bg-base-300">
      <div class="flex items-center justify-between gap-4 px-8 ps-10">
        <h2 class="font-title text-lg md:max-lg:hidden">{previewtabs()}</h2>
        <Tabs variant="boxed" size="sm" class="bg-base-300">
          <Tabs.Tab
            active={previewtabs() === "Components Demo"}
            onClick={() => setPreviewtabs("Components Demo")}
          >
            <Icon name="icon-[mdi--apps]" width={16} height={16} />
          </Tabs.Tab>
          <Tabs.Tab
            active={previewtabs() === "Component Variants"}
            onClick={() => setPreviewtabs("Component Variants")}
          >
            <Icon name="icon-[mdi--format-list-bulleted]" width={16} height={16} />
          </Tabs.Tab>
          <Tabs.Tab
            active={previewtabs() === "Color Palette"}
            onClick={() => setPreviewtabs("Color Palette")}
          >
            <Icon name="icon-[mdi--palette]" width={16} height={16} />
          </Tabs.Tab>
        </Tabs>
      </div>
      <div class="px-8 py-6">
        {previewtabs() === "Components Demo" && <ComponentsDemo />}

        {previewtabs() === "Component Variants" && <ComponentVariants />}

        {previewtabs() === "Color Palette" && <ColorPalette currentTheme={props.currentTheme} />}
      </div>
    </div>
  );
}
