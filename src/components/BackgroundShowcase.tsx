import { Background, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function BackgroundShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "with-theme", title: "With Theme" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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

        <ShowcaseSection id="default" title="Default">
          <Background>
            <div class="p-8 text-center text-base-content">
              This is the default background using <code>bg-base-200</code>.
            </div>
          </Background>
          <CodeBlock
            code={`<Background>
  <div class="p-8 text-center text-base-content">
    This is the default background using <code>bg-base-200</code>.
  </div>
</Background>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-theme" title="With Theme">
          <Background dataTheme="retro">
            <div class="p-8 text-center text-base-content">
              This background uses <code>data-theme="retro"</code>.
            </div>
          </Background>
          <CodeBlock
            code={`<Background dataTheme="retro">
  <div class="p-8 text-center text-base-content">
    This background uses <code>dataTheme="retro"</code>.
  </div>
</Background>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
