import { Artboard, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function ArtboardShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default (Sizes 1–6)" },
    { id: "horizontal", title: "Horizontal Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "demo",
      type: "boolean",
      default: "true",
      description: "Applies default demo styling for device look",
    },
    {
      name: "size",
      type: "1 | 2 | 3 | 4 | 5 | 6",
      description: "Size presets for different screen dimensions",
    },
    {
      name: "horizontal",
      type: "boolean",
      description: "Displays the artboard in horizontal orientation",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
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
                class="block text-sm text-fg-secondary hover:text-fg-body"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default (Sizes 1–6)">
          <Flex wrap="wrap" gap="md">
            <Artboard size={1}>320×568</Artboard>
            <Artboard size={2}>375×667</Artboard>
            <Artboard size={3}>414×736</Artboard>
            <Artboard size={4}>375×812</Artboard>
            <Artboard size={5}>414×896</Artboard>
            <Artboard size={6}>320×1024</Artboard>
          </Flex>
          <CodeBlock
            code={`<Artboard size={1}>320×568</Artboard>
<Artboard size={2}>375×667</Artboard>
<Artboard size={3}>414×736</Artboard>
<Artboard size={4}>375×812</Artboard>
<Artboard size={5}>414×896</Artboard>
<Artboard size={6}>320×1024</Artboard>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="horizontal" title="Horizontal Sizes">
          <Flex wrap="wrap" gap="md">
            <Artboard size={1} horizontal>
              568×320
            </Artboard>
            <Artboard size={2} horizontal>
              667×375
            </Artboard>
            <Artboard size={3} horizontal>
              736×414
            </Artboard>
            <Artboard size={4} horizontal>
              812×375
            </Artboard>
            <Artboard size={5} horizontal>
              896×414
            </Artboard>
            <Artboard size={6} horizontal>
              1024×320
            </Artboard>
          </Flex>
          <CodeBlock
            code={`<Artboard size={1} horizontal>568×320</Artboard>
<Artboard size={2} horizontal>667×375</Artboard>
<Artboard size={3} horizontal>736×414</Artboard>
<Artboard size={4} horizontal>812×375</Artboard>
<Artboard size={5} horizontal>896×414</Artboard>
<Artboard size={6} horizontal>1024×320</Artboard>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
