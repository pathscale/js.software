import { WindowMockup, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function WindowMockupShowcase() {
  const sections = [
    { id: "basic", title: "Basic" },
    { id: "frame-color", title: "With Frame Color" },
    { id: "background", title: "With Background" },
    { id: "border", title: "With Border" },
    { id: "custom-content", title: "Custom Content" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "frameColor",
      type: `"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral"`,
      description: "Color of the window frame",
    },
    {
      name: "backgroundColor",
      type: `"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral"`,
      description: "Color of the content background",
    },
    {
      name: "border",
      type: "boolean",
      default: "false",
      description: "Whether to show border",
    },
    {
      name: "borderColor",
      type: `"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral"`,
      description: "Border color",
    },
    {
      name: "class",
      type: "string",
      description: "Tailwind utility classes",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme attribute for styling",
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

        <ShowcaseSection id="basic" title="Basic">
          <Flex direction="col" gap="md">
            <WindowMockup>Hello, world!</WindowMockup>
            <CodeBlock
              code={`<WindowMockup>
  Hello, world!
</WindowMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="frame-color" title="With Frame Color">
          <Flex direction="col" gap="md">
            <WindowMockup frameColor="primary">
              This window has a primary frame.
            </WindowMockup>
            <CodeBlock
              code={`<WindowMockup frameColor="primary">
  This window has a primary frame.
</WindowMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="background" title="With Background Color">
          <Flex direction="col" gap="md">
            <WindowMockup frameColor="secondary" backgroundColor="accent">
              Accent background, secondary frame
            </WindowMockup>
            <CodeBlock
              code={`<WindowMockup frameColor="secondary" backgroundColor="accent">
  Accent background, secondary frame
</WindowMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="border" title="With Border">
          <Flex direction="col" gap="md">
            <WindowMockup border borderColor="warning">
              This window has a border with warning color.
            </WindowMockup>
            <CodeBlock
              code={`<WindowMockup border borderColor="warning">
  This window has a border with warning color.
</WindowMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-content" title="Custom Content">
          <Flex direction="col" gap="md">
            <WindowMockup frameColor="info" backgroundColor="neutral" border>
              <div>
                <h3 class="text-lg font-bold">Terminal Output</h3>
                <pre class="mt-2 bg-black text-white p-2 rounded">
                  {`$ npm install
✓ Installed 123 packages
✓ Build complete`}
                </pre>
              </div>
            </WindowMockup>
            <CodeBlock
              code={`<WindowMockup frameColor="info" backgroundColor="neutral" border>
  <div>
    <h3 class="text-lg font-bold">Terminal Output</h3>
    <pre class="mt-2 bg-black text-white p-2 rounded">
      $ npm install
      ✓ Installed 123 packages
      ✓ Build complete
    </pre>
  </div>
</WindowMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
