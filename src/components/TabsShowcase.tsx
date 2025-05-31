import { Tabs } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function TabsShowcase() {
  const sections = [
    { id: "default", title: "Default Tabs" },
    { id: "variants", title: "Variants (bordered, lift, boxed)" },
    { id: "sizes", title: "Sizes (xs - xl)" },
    { id: "position", title: "Position (top, bottom)" },
    { id: "radiotabs", title: "Radio Tabs (with content)" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "variant",
      type: `"bordered" | "lift" | "boxed"`,
      description: "Visual style variant",
    },
    {
      name: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl"`,
      description: "Tab size",
    },
    {
      name: "position",
      type: `"top" | "bottom"`,
      description: "Tab bar position",
    },
    { name: "class", type: "string", description: "Custom Tailwind class" },
    { name: "dataTheme", type: "string", description: "Theme attribute" },
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

        <ShowcaseSection id="default" title="Default Tabs">
          <Tabs>
            <Tabs.Tab active>Tab 1</Tabs.Tab>
            <Tabs.Tab>Tab 2</Tabs.Tab>
            <Tabs.Tab>Tab 3</Tabs.Tab>
          </Tabs>
          <CodeBlock
            code={`<Tabs>
  <Tabs.Tab active>Tab 1</Tabs.Tab>
  <Tabs.Tab>Tab 2</Tabs.Tab>
  <Tabs.Tab>Tab 3</Tabs.Tab>
</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Tabs variant="bordered">
            <Tabs.Tab active>Bordered</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <Tabs variant="lift">
            <Tabs.Tab active>Lift</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <Tabs variant="boxed">
            <Tabs.Tab active>Boxed</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <CodeBlock
            code={`<Tabs variant="bordered">...</Tabs>
<Tabs variant="lift">...</Tabs>
<Tabs variant="boxed">...</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Tabs size="xs">
            <Tabs.Tab active>XS</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <Tabs size="md">
            <Tabs.Tab active>MD</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <Tabs size="xl">
            <Tabs.Tab active>XL</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <CodeBlock
            code={`<Tabs size="xs">...</Tabs>
<Tabs size="md">...</Tabs>
<Tabs size="xl">...</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="position" title="Position">
          <Tabs position="top">
            <Tabs.Tab active>Top</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <Tabs position="bottom">
            <Tabs.Tab active>Bottom</Tabs.Tab>
            <Tabs.Tab>Tab</Tabs.Tab>
          </Tabs>
          <CodeBlock
            code={`<Tabs position="top">...</Tabs>
<Tabs position="bottom">...</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="radiotabs" title="Radio Tabs">
          <Tabs class="tabs-boxed">
            <Tabs.RadioTab label="Tab A" name="example" active>
              <p class="mt-2">Content for Tab A</p>
            </Tabs.RadioTab>
            <Tabs.RadioTab label="Tab B" name="example">
              <p class="mt-2">Content for Tab B</p>
            </Tabs.RadioTab>
            <Tabs.RadioTab label="Tab C" name="example">
              <p class="mt-2">Content for Tab C</p>
            </Tabs.RadioTab>
          </Tabs>
          <CodeBlock
            code={`<Tabs class="tabs-boxed">
  <Tabs.RadioTab label="Tab A" name="example" active>
    <p class="mt-2">Content for Tab A</p>
  </Tabs.RadioTab>
  ...
</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
