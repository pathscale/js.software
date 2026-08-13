import { Tabs } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function TabsShowcase() {
  const sections = [
    { id: "default", title: "Default Tabs" },
    { id: "variants", title: "Variants (primary, secondary)" },
    { id: "orientation", title: "Orientation (horizontal, vertical)" },
    { id: "with-panels", title: "Tabs With Panels" },
    { id: "controlled", title: "Controlled Selection" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "variant",
      type: `"primary" | "secondary"`,
      description: "Visual style variant",
    },
    {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      description: "Layout orientation",
    },
    {
      name: "selectedKey",
      type: "string | number",
      description: "Controlled selected tab key",
    },
    {
      name: "defaultSelectedKey",
      type: "string | number",
      description: "Initial selected tab key (uncontrolled)",
    },
    {
      name: "onSelectionChange",
      type: "(key: string | number) => void",
      description: "Fired when the active tab changes",
    },
    { name: "class", type: "string", description: "Custom Tailwind class" },
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
          <Tabs defaultSelectedKey="one">
            <Tabs.List>
              <Tabs.Tab id="one">Tab 1</Tabs.Tab>
              <Tabs.Tab id="two">Tab 2</Tabs.Tab>
              <Tabs.Tab id="three">Tab 3</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <CodeBlock
            code={`<Tabs defaultSelectedKey="one">
  <Tabs.List>
    <Tabs.Tab id="one">Tab 1</Tabs.Tab>
    <Tabs.Tab id="two">Tab 2</Tabs.Tab>
    <Tabs.Tab id="three">Tab 3</Tabs.Tab>
  </Tabs.List>
</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Tabs variant="primary" defaultSelectedKey="a">
            <Tabs.List>
              <Tabs.Tab id="a">Primary</Tabs.Tab>
              <Tabs.Tab id="b">Tab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Tabs variant="secondary" defaultSelectedKey="a">
            <Tabs.List>
              <Tabs.Tab id="a">Secondary</Tabs.Tab>
              <Tabs.Tab id="b">Tab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <CodeBlock
            code={`<Tabs variant="primary">...</Tabs>
<Tabs variant="secondary">...</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="orientation" title="Orientation">
          <Tabs orientation="horizontal" defaultSelectedKey="a">
            <Tabs.List>
              <Tabs.Tab id="a">Horizontal</Tabs.Tab>
              <Tabs.Tab id="b">Tab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Tabs orientation="vertical" defaultSelectedKey="a">
            <Tabs.List>
              <Tabs.Tab id="a">Vertical</Tabs.Tab>
              <Tabs.Tab id="b">Tab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <CodeBlock
            code={`<Tabs orientation="horizontal">...</Tabs>
<Tabs orientation="vertical">...</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-panels" title="Tabs With Panels">
          <Tabs defaultSelectedKey="a">
            <Tabs.List>
              <Tabs.Tab id="a">Tab A</Tabs.Tab>
              <Tabs.Tab id="b">Tab B</Tabs.Tab>
              <Tabs.Tab id="c">Tab C</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel id="a">
              <p class="mt-2">Content for Tab A</p>
            </Tabs.Panel>
            <Tabs.Panel id="b">
              <p class="mt-2">Content for Tab B</p>
            </Tabs.Panel>
            <Tabs.Panel id="c">
              <p class="mt-2">Content for Tab C</p>
            </Tabs.Panel>
          </Tabs>
          <CodeBlock
            code={`<Tabs defaultSelectedKey="a">
  <Tabs.List>
    <Tabs.Tab id="a">Tab A</Tabs.Tab>
    <Tabs.Tab id="b">Tab B</Tabs.Tab>
    <Tabs.Tab id="c">Tab C</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="a">Content for Tab A</Tabs.Panel>
  <Tabs.Panel id="b">Content for Tab B</Tabs.Panel>
  <Tabs.Panel id="c">Content for Tab C</Tabs.Panel>
</Tabs>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled Selection">
          <Tabs selectedKey="b">
            <Tabs.List>
              <Tabs.Tab id="a">A</Tabs.Tab>
              <Tabs.Tab id="b">B</Tabs.Tab>
              <Tabs.Tab id="c">C</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <CodeBlock
            code={`<Tabs selectedKey={key()} onSelectionChange={setKey}>
  <Tabs.List>
    <Tabs.Tab id="a">A</Tabs.Tab>
    <Tabs.Tab id="b">B</Tabs.Tab>
    <Tabs.Tab id="c">C</Tabs.Tab>
  </Tabs.List>
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
