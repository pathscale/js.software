import { Flex, Icon } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function IconShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "sizing", title: "Custom Size" },
    { id: "color", title: "Custom Color" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "name",
      type: "string",
      required: true,
      description:
        "The icon name from the Iconify set, e.g. icon-[mdi--home].",
    },
    {
      name: "width",
      type: "number",
      default: "24",
      description: "Width in pixels.",
    },
    {
      name: "height",
      type: "number",
      default: "24",
      description: "Height in pixels.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Optional theme for the icon (e.g. light or dark).",
    },
    {
      name: "class / className",
      type: "string",
      description: "Optional Tailwind or custom class names.",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex gap="md">
              <Icon src="mdi--home" />
              <Icon src="mdi--chevron-left" />
              <Icon src="mdi--chevron-right" />
            </Flex>
            <CodeBlock
              code={`<Icon src="mdi--home" />
<Icon src="mdi--chevron-left" />
<Icon src="mdi--chevron-right" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizing" title="Custom Size">
          <Flex direction="col" gap="md">
            <Flex gap="md" align="center">
              <Icon src="mdi--home" width={16} height={16} />
              <Icon src="mdi--home" width={24} height={24} />
              <Icon src="mdi--home" width={32} height={32} />
              <Icon src="mdi--home" width={48} height={48} />
            </Flex>
            <CodeBlock
              code={`<Icon src="mdi--home" width={16} height={16} />
<Icon src="mdi--home" width={24} height={24} />
<Icon src="mdi--home" width={32} height={32} />
<Icon src="mdi--home" width={48} height={48} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="color" title="Custom Color">
          <Flex direction="col" gap="md">
            <Flex gap="md" align="center">
              <Icon src="mdi--home" class="text-primary" />
              <Icon src="mdi--home" class="text-secondary" />
              <Icon src="mdi--home" class="text-accent" />
              <Icon src="mdi--home" class="text-error" />
            </Flex>
            <CodeBlock
              code={`<Icon src="mdi--home" class="text-primary" />
<Icon src="mdi--home" class="text-secondary" />
<Icon src="mdi--home" class="text-accent" />
<Icon src="mdi--home" class="text-error" />`}
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
