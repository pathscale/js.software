import { PhoneMockup, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function PhoneMockupShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Component Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "color",
      type: `"primary" | "secondary" | "info" | "success" | "warning" | "error"`,
      description: "Color of the phone border (excludes 'ghost')",
    },
    {
      name: "class / className",
      type: "string",
      description: "CSS classes for the outer wrapper",
    },
    {
      name: "innerProps",
      type: "object",
      description: "Props for the inner artboard div (className, style, etc.)",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme for styling via data-theme",
    },
  ];

  const colors = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ] as const;

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
            <Flex justify="center">
              <PhoneMockup
                innerProps={{
                  class:
                    "artboard-demo phone-2 flex justify-center items-center w-[348px] h-[596px]",
                }}
              >
                Hello world
              </PhoneMockup>
            </Flex>

            <CodeBlock
              code={`<PhoneMockup
  innerProps={{
    class: "artboard-demo phone-2 flex justify-center items-center w-[348px] h-[596px]"
  }}
>
  Hello world
</PhoneMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Component Colors">
          <Flex direction="col" gap="md">
            <Flex justify="center">
              <PhoneMockup
                color="primary"
                innerProps={{
                  class:
                    "artboard-demo phone-2 flex justify-center items-center w-[348px] h-[596px]",
                }}
              >
                primary
              </PhoneMockup>
            </Flex>

            <CodeBlock
              code={`<PhoneMockup
  color="primary"
  innerProps={{
    class: "artboard-demo phone-2 flex justify-center items-center w-[348px] h-[596px]"
  }}
>
  primary
</PhoneMockup>`}
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
