import ShowcaseLayout from "./ShowcaseLayout";
import { SkipLink, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SkipLinkShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "custom-href", title: "Custom href" },
    { id: "custom-text", title: "Custom text" },
    { id: "props", title: "Props" },
  ] as const;

  const skipLinkProps = [
    {
      name: "href",
      type: "string",
      default: '"#main-content"',
      description: "The target anchor the skip link navigates to",
    },
    {
      name: "children",
      type: "JSX.Element",
      default: '"Skip to main content"',
      description: "Custom label text or element for the skip link",
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
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <p class="text-sm text-gray-500">
              Tab into the area below to reveal the skip link (it is visually hidden until focused).
            </p>
            <div class="relative border border-base-300 rounded-lg p-4">
              <SkipLink />
              <div id="main-content">Main content area</div>
            </div>
            <CodeBlock
              code={`<SkipLink />
<div id="main-content">Main content area</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-href" title="Custom href">
          <Flex direction="col" gap="md">
            <p class="text-sm text-gray-500">
              Point the skip link to a different target by setting the href prop.
            </p>
            <div class="relative border border-base-300 rounded-lg p-4">
              <SkipLink href="#custom-section" />
              <div id="custom-section">Custom section target</div>
            </div>
            <CodeBlock
              code={`<SkipLink href="#custom-section" />
<div id="custom-section">Custom section target</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-text" title="Custom text">
          <Flex direction="col" gap="md">
            <p class="text-sm text-gray-500">
              Override the default label by passing children.
            </p>
            <div class="relative border border-base-300 rounded-lg p-4">
              <SkipLink href="#main-content">Jump to content</SkipLink>
              <div id="main-content">Main content area</div>
            </div>
            <CodeBlock
              code={`<SkipLink href="#main-content">Jump to content</SkipLink>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={skipLinkProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
