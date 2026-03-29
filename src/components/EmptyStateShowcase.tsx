import ShowcaseLayout from "./ShowcaseLayout";
import { EmptyState, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function EmptyStateShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "icon-only", title: "Icon Only" },
    { id: "with-action", title: "With Action Button" },
    { id: "props", title: "Props" },
  ] as const;

  const emptyStateProps = [
    {
      name: "icon",
      type: "string",
      description: "Iconify icon name to display",
    },
    {
      name: "iconSize",
      type: "number",
      default: "48",
      description: "Size of the icon in pixels",
    },
    {
      name: "title",
      type: "JSX.Element",
      description: "Title text or element",
    },
    {
      name: "description",
      type: "JSX.Element",
      description: "Description text or element below the title",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Custom content rendered below the description (e.g. action buttons)",
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
            <div class="border border-base-300 rounded-lg">
              <EmptyState
                icon="mdi:inbox-outline"
                title="No messages yet"
                description="When you receive messages, they will appear here."
              />
            </div>
            <CodeBlock
              code={`<EmptyState
  icon="mdi:inbox-outline"
  title="No messages yet"
  description="When you receive messages, they will appear here."
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icon-only" title="Icon Only">
          <Flex direction="col" gap="md">
            <div class="border border-base-300 rounded-lg">
              <EmptyState icon="mdi:cloud-off-outline" iconSize={64} />
            </div>
            <CodeBlock
              code={`<EmptyState icon="mdi:cloud-off-outline" iconSize={64} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-action" title="With Action Button">
          <Flex direction="col" gap="md">
            <div class="border border-base-300 rounded-lg">
              <EmptyState
                icon="mdi:file-document-outline"
                title="No documents"
                description="Get started by creating your first document."
              >
                <Button color="primary" size="sm">
                  Create Document
                </Button>
              </EmptyState>
            </div>
            <CodeBlock
              code={`<EmptyState
  icon="mdi:file-document-outline"
  title="No documents"
  description="Get started by creating your first document."
>
  <Button color="primary" size="sm">
    Create Document
  </Button>
</EmptyState>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={emptyStateProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
