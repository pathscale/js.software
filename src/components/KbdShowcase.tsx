import ShowcaseLayout from "./ShowcaseLayout";
import { Kbd, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function KbdShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "in-text", title: "In Text" },
    { id: "key-combination", title: "Key Combination" },
    { id: "function-keys", title: "Function Keys" },
    { id: "full-keyboard", title: "Full Keyboard" },
    { id: "arrow-keys", title: "Arrow Keys" },
    { id: "props", title: "Props" },
  ] as const;

  const kbdProps = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "The content to display inside the keyboard key",
    },
    {
      name: "...props",
      type: "HTMLKbdElement",
      description: "All standard HTML kbd element attributes",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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
              <Kbd>A</Kbd>
            </Flex>
            <CodeBlock code={`<Kbd>A</Kbd>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="in-text" title="In Text">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <div class="font-sans">
                Press <Kbd>F</Kbd> to pay respects.
              </div>
            </Flex>
            <CodeBlock
              code={`<div class="font-sans">
  Press <Kbd>F</Kbd> to pay respects.
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="key-combination" title="Key Combination">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <div class="flex items-center gap-1">
                <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
              </div>
            </Flex>
            <CodeBlock
              code={`<div class="flex items-center gap-1">
  <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="function-keys" title="Function Keys">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <div class="flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>⌥</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>⌃</Kbd>
              </div>
            </Flex>
            <CodeBlock
              code={`<div class="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>⌥</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>⌃</Kbd>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="full-keyboard" title="Full Keyboard">
          <Flex direction="col" gap="md">
            <div class="overflow-x-auto">
              <Flex justify="center" gap="sm" class="w-full">
                <Kbd>q</Kbd>
                <Kbd>w</Kbd>
                <Kbd>e</Kbd>
                <Kbd>r</Kbd>
                <Kbd>t</Kbd>
                <Kbd>y</Kbd>
                <Kbd>u</Kbd>
                <Kbd>i</Kbd>
                <Kbd>o</Kbd>
                <Kbd>p</Kbd>
              </Flex>
              <Flex justify="center" gap="sm" class="w-full my-1">
                <Kbd>a</Kbd>
                <Kbd>s</Kbd>
                <Kbd>d</Kbd>
                <Kbd>f</Kbd>
                <Kbd>g</Kbd>
                <Kbd>h</Kbd>
                <Kbd>j</Kbd>
                <Kbd>k</Kbd>
                <Kbd>l</Kbd>
              </Flex>
              <Flex justify="center" gap="sm" class="w-full my-1">
                <Kbd>z</Kbd>
                <Kbd>x</Kbd>
                <Kbd>c</Kbd>
                <Kbd>v</Kbd>
                <Kbd>b</Kbd>
                <Kbd>n</Kbd>
                <Kbd>m</Kbd>
                <Kbd>/</Kbd>
              </Flex>
            </div>
            <CodeBlock
              code={`<div class="overflow-x-auto">
  <Flex justify="center" gap="sm" class="w-full">
    <Kbd>q</Kbd>
    <Kbd>w</Kbd>
    <Kbd>e</Kbd>
    <Kbd>r</Kbd>
    <Kbd>t</Kbd>
    <Kbd>y</Kbd>
    <Kbd>u</Kbd>
    <Kbd>i</Kbd>
    <Kbd>o</Kbd>
    <Kbd>p</Kbd>
  </Flex>
  <Flex justify="center" gap="sm" class="w-full" class="my-1">
    <Kbd>a</Kbd>
    <Kbd>s</Kbd>
    <Kbd>d</Kbd>
    <Kbd>f</Kbd>
    <Kbd>g</Kbd>
    <Kbd>h</Kbd>
    <Kbd>j</Kbd>
    <Kbd>k</Kbd>
    <Kbd>l</Kbd>
  </Flex>
  <Flex justify="center" gap="sm" class="w-full" class="my-1">
    <Kbd>z</Kbd>
    <Kbd>x</Kbd>
    <Kbd>c</Kbd>
    <Kbd>v</Kbd>
    <Kbd>b</Kbd>
    <Kbd>n</Kbd>
    <Kbd>m</Kbd>
    <Kbd>/</Kbd>
  </Flex>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="arrow-keys" title="Arrow Keys">
          <Flex direction="col" gap="md">
            <Flex direction="col" gap="sm">
              <Flex justify="center" class="w-full">
                <Kbd>▲</Kbd>
              </Flex>
              <Flex justify="center" gap="xl" class="w-full">
                <Kbd>◀︎</Kbd>
                <Kbd>▶︎</Kbd>
              </Flex>
              <Flex justify="center" class="w-full">
                <Kbd>▼</Kbd>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Flex direction="col" gap="sm">
  <Flex justify="center" class="w-full">
    <Kbd>▲</Kbd>
  </Flex>
  <Flex justify="center" gap="xl" class="w-full">
    <Kbd>◀︎</Kbd>
    <Kbd>▶︎</Kbd>
  </Flex>
  <Flex justify="center" class="w-full">
    <Kbd>▼</Kbd>
  </Flex>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={kbdProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
