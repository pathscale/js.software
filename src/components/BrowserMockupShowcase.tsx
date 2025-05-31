import { BrowserMockup, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function BrowserMockupShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "background", title: "With Background Variant" },
    { id: "custom-border", title: "Custom Border Color" },
    { id: "custom-background", title: "Custom Background Color" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "url",
      type: "string",
      description: "URL text shown in the address input field",
    },
    {
      name: "variant",
      type: `"border" | "background"`,
      default: `"border"`,
      description: "Visual style variant for border or background emphasis",
    },
    {
      name: "inputClassName",
      type: "string",
      description: "CSS classes applied to the address bar input",
    },
    {
      name: "innerClassName",
      type: "string",
      description: "CSS classes applied to the inner content container",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes for the main container",
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
          <Flex direction="col" gap="md">
            <BrowserMockup url="https://react.daisyui.com" class="w-full">
              Hello!
            </BrowserMockup>
            <CodeBlock
              code={`<BrowserMockup url="https://react.daisyui.com" class="w-full">
  Hello!
</BrowserMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="background" title="With Background Variant">
          <Flex direction="col" gap="md">
            <BrowserMockup
              url="https://react.daisyui.com"
              variant="background"
              class="w-full"
            >
              Hello!
            </BrowserMockup>
            <CodeBlock
              code={`<BrowserMockup url="https://react.daisyui.com" variant="background" class="w-full">
  Hello!
</BrowserMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-border" title="Custom Border Color">
          <Flex direction="col" gap="md">
            <BrowserMockup
              url="https://react.daisyui.com"
              class="w-full border-primary"
              inputClassName="border-primary"
            >
              Hello!
            </BrowserMockup>
            <CodeBlock
              code={`<BrowserMockup
  url="https://react.daisyui.com"
  class="w-full border-primary"
  inputClassName="border-primary"
>
  Hello!
</BrowserMockup>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-background" title="Custom Background Color">
          <Flex direction="col" gap="md">
            <BrowserMockup
              url="https://react.daisyui.com"
              variant="background"
              class="w-full bg-warning"
              innerClassName="bg-info info-content"
            >
              Hello!
            </BrowserMockup>
            <CodeBlock
              code={`<BrowserMockup
  url="https://react.daisyui.com"
  variant="background"
  class="w-full bg-warning"
  innerClassName="bg-info info-content"
>
  Hello!
</BrowserMockup>`}
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
