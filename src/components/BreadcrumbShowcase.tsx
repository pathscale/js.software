import ShowcaseLayout from "./ShowcaseLayout";
import { Breadcrumbs, BreadcrumbsItem, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function BreadcrumbShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-icons", title: "With Icons" },
    { id: "max-width", title: "With Max Width" },
    { id: "props", title: "Props" },
  ] as const;

  const breadcrumbsProps = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for `class`, useful in JSX environments",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
            <Flex justify="left" align="left">
              <Breadcrumbs>
                <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
                <BreadcrumbsItem href="/">Documents</BreadcrumbsItem>
                <BreadcrumbsItem href="/">Add Document</BreadcrumbsItem>
              </Breadcrumbs>
            </Flex>
            <CodeBlock
              code={`<Breadcrumbs>
  <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
  <BreadcrumbsItem href="/">Documents</BreadcrumbsItem>
  <BreadcrumbsItem href="/">Add Document</BreadcrumbsItem>
</Breadcrumbs>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Breadcrumbs>
                <BreadcrumbsItem href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 mr-2 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Home
                </BreadcrumbsItem>
                <BreadcrumbsItem href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 mr-2 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Documents
                </BreadcrumbsItem>
                <BreadcrumbsItem href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 mr-2 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Add Document
                </BreadcrumbsItem>
              </Breadcrumbs>
            </Flex>
            <CodeBlock
              code={`<Breadcrumbs>
  <BreadcrumbsItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
    Home
  </BreadcrumbsItem>
  <BreadcrumbsItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
    Documents
  </BreadcrumbsItem>
  <BreadcrumbsItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Add Document
  </BreadcrumbsItem>
</Breadcrumbs>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="max-width" title="With Max Width">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Breadcrumbs class="max-w-xs">
                <BreadcrumbsItem>Long text 1</BreadcrumbsItem>
                <BreadcrumbsItem>Long text 2</BreadcrumbsItem>
                <BreadcrumbsItem>Long text 3</BreadcrumbsItem>
                <BreadcrumbsItem>Long text 4</BreadcrumbsItem>
                <BreadcrumbsItem>Long text 5</BreadcrumbsItem>
              </Breadcrumbs>
            </Flex>
            <CodeBlock
              code={`<Breadcrumbs class="max-w-xs">
  <BreadcrumbsItem>Long text 1</BreadcrumbsItem>
  <BreadcrumbsItem>Long text 2</BreadcrumbsItem>
  <BreadcrumbsItem>Long text 3</BreadcrumbsItem>
  <BreadcrumbsItem>Long text 4</BreadcrumbsItem>
  <BreadcrumbsItem>Long text 5</BreadcrumbsItem>
</Breadcrumbs>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={breadcrumbsProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
