import { createSignal } from "solid-js";
import { CopyButton, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CopyButtonShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "custom-content", title: "Custom Text / Icon" },
    { id: "with-callback", title: "With Callback" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "text",
      type: "string",
      description: "Text to be copied to the clipboard.",
    },
    {
      name: "title",
      type: "string",
      description: "Tooltip shown on hover. Defaults to 'Copy to clipboard'.",
    },
    {
      name: "onCopy",
      type: "() => void",
      description: "Callback function executed after text is copied.",
    },
    {
      name: "children",
      type: "JSX.Element",
      description:
        "Custom content for the button instead of the default copy icon.",
    },
    {
      name: "copiedToken",
      type: "string | Component",
      description:
        "Custom text or component shown after the text has been copied.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class).",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value.",
    },
  ];

  const [copyCount, setCopyCount] = createSignal(0);

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

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex gap="md" wrap="wrap" align="center">
              <CopyButton text="Hello World" />
              <span class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                Copies "Hello World"
              </span>
            </Flex>
            <CodeBlock code={`<CopyButton text="Hello World" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-content" title="Custom Text / Icon">
          <Flex direction="col" gap="md">
            <Flex gap="md" wrap="wrap" align="center">
              <CopyButton text="npm install @pathscale/ui">
                <span class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy install command
                </span>
              </CopyButton>
            </Flex>
            <CodeBlock
              code={`<CopyButton text="npm install @pathscale/ui">
  <span class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
    Copy install command
  </span>
</CopyButton>`}
            />

            <Flex gap="md" wrap="wrap" align="center">
              <CopyButton
                text="Custom copied text"
                title="Click to copy"
                copiedToken="Copied!"
              />
              <span class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                Custom tooltip and copied token
              </span>
            </Flex>
            <CodeBlock
              code={`<CopyButton
  text="Custom copied text"
  title="Click to copy"
  copiedToken="Copied!"
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-callback" title="With Callback">
          <Flex direction="col" gap="md">
            <Flex gap="md" wrap="wrap" align="center">
              <CopyButton
                text="Tracked copy"
                onCopy={() => setCopyCount((c) => c + 1)}
              />
              <span class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
                Copied {copyCount()} time{copyCount() !== 1 ? "s" : ""}
              </span>
            </Flex>
            <CodeBlock
              code={`const [copyCount, setCopyCount] = createSignal(0);

<CopyButton
  text="Tracked copy"
  onCopy={() => setCopyCount((c) => c + 1)}
/>
<span>Copied {copyCount()} time(s)</span>`}
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
