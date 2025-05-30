import ShowcaseLayout from "./ShowcaseLayout";
import { Diff, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DiffShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "text", title: "Text" },
    { id: "props", title: "Props" },
  ] as const;

  const diffProps = [
    {
      name: "secondItem",
      type: "JSX.Element",
      description: "The second item to compare with",
      required: true,
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
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
            <Diff
              secondItem={
                <img
                  alt="daisy"
                  src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
                />
              }
            >
              <img
                alt="daisy"
                src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
              />
            </Diff>
            <CodeBlock
              code={`<Diff
  secondItem={
    <img
      alt="daisy"
      src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
    />
  }
>
  <img
    alt="daisy"
    src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
  />
</Diff>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="text" title="Text">
          <Flex direction="col" gap="md">
            <Diff
              secondItem={
                <div class="bg-base-200 text-9xl font-black grid place-content-center">
                  DAISY
                </div>
              }
            >
              <div class="bg-primary text-primary-content text-9xl font-black grid place-content-center">
                DAISY
              </div>
            </Diff>
            <CodeBlock
              code={`<Diff
  secondItem={
    <div class="bg-base-200 text-9xl font-black grid place-content-center">
      DAISY
    </div>
  }
>
  <div class="bg-primary text-primary-content text-9xl font-black grid place-content-center">
    DAISY
  </div>
</Diff>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={diffProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
