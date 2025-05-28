import ShowcaseLayout from "./ShowcaseLayout";
import { Kbd } from "@pathscale/ui";
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
          <Kbd>A</Kbd>
          <CodeBlock code={`<Kbd>A</Kbd>`} />
        </ShowcaseSection>

        <ShowcaseSection id="in-text" title="In Text">
          <div class="font-sans">
            Press <Kbd>F</Kbd> to pay respects.
          </div>
          <CodeBlock
            code={`<div class="font-sans">
  Press <Kbd>F</Kbd> to pay respects.
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="key-combination" title="Key Combination">
          <div class="flex items-center gap-1">
            <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
          </div>
          <CodeBlock
            code={`<div class="flex items-center gap-1">
  <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="function-keys" title="Function Keys">
          <div class="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌃</Kbd>
          </div>
          <CodeBlock
            code={`<div class="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>⌥</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>⌃</Kbd>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="full-keyboard" title="Full Keyboard">
          <div class="overflow-x-auto">
            <div class="flex justify-center gap-1 w-full">
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
            </div>
            <div class="flex justify-center gap-1 my-1 w-full">
              <Kbd>a</Kbd>
              <Kbd>s</Kbd>
              <Kbd>d</Kbd>
              <Kbd>f</Kbd>
              <Kbd>g</Kbd>
              <Kbd>h</Kbd>
              <Kbd>j</Kbd>
              <Kbd>k</Kbd>
              <Kbd>l</Kbd>
            </div>
            <div class="flex justify-center gap-1 my-1 w-full">
              <Kbd>z</Kbd>
              <Kbd>x</Kbd>
              <Kbd>c</Kbd>
              <Kbd>v</Kbd>
              <Kbd>b</Kbd>
              <Kbd>n</Kbd>
              <Kbd>m</Kbd>
              <Kbd>/</Kbd>
            </div>
          </div>
          <CodeBlock
            code={`<div class="overflow-x-auto">
  <div class="flex justify-center gap-1 w-full">
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
  </div>
  <div class="flex justify-center gap-1 my-1 w-full">
    <Kbd>a</Kbd>
    <Kbd>s</Kbd>
    <Kbd>d</Kbd>
    <Kbd>f</Kbd>
    <Kbd>g</Kbd>
    <Kbd>h</Kbd>
    <Kbd>j</Kbd>
    <Kbd>k</Kbd>
    <Kbd>l</Kbd>
  </div>
  <div class="flex justify-center gap-1 my-1 w-full">
    <Kbd>z</Kbd>
    <Kbd>x</Kbd>
    <Kbd>c</Kbd>
    <Kbd>v</Kbd>
    <Kbd>b</Kbd>
    <Kbd>n</Kbd>
    <Kbd>m</Kbd>
    <Kbd>/</Kbd>
  </div>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="arrow-keys" title="Arrow Keys">
          <div>
            <div class="flex justify-center w-full">
              <Kbd>▲</Kbd>
            </div>
            <div class="flex justify-center gap-12 w-full">
              <Kbd>◀︎</Kbd>
              <Kbd>▶︎</Kbd>
            </div>
            <div class="flex justify-center w-full">
              <Kbd>▼</Kbd>
            </div>
          </div>
          <CodeBlock
            code={`<div>
  <div class="flex justify-center w-full">
    <Kbd>▲</Kbd>
  </div>
  <div class="flex justify-center gap-12 w-full">
    <Kbd>◀︎</Kbd>
    <Kbd>▶︎</Kbd>
  </div>
  <div class="flex justify-center w-full">
    <Kbd>▼</Kbd>
  </div>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={kbdProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
