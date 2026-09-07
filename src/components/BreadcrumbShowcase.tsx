import ShowcaseLayout from "./ShowcaseLayout";
import { Breadcrumb, BreadcrumbItem, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { ROUTES } from "../config/routes";

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
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
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
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Breadcrumb>
                <BreadcrumbItem href={ROUTES.HOME}>Home</BreadcrumbItem>
                <BreadcrumbItem href={ROUTES.HOME}>Documents</BreadcrumbItem>
                <BreadcrumbItem href={ROUTES.HOME}>Add Document</BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            <CodeBlock
              code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Documents</BreadcrumbItem>
  <BreadcrumbItem href="/">Add Document</BreadcrumbItem>
</Breadcrumb>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-icons" title="With Icons">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Breadcrumb>
                <BreadcrumbItem href={ROUTES.HOME}>
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
                </BreadcrumbItem>
                <BreadcrumbItem href={ROUTES.HOME}>
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
                </BreadcrumbItem>
                <BreadcrumbItem href={ROUTES.HOME}>
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
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            <CodeBlock
              code={`<Breadcrumb>
  <BreadcrumbItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
    Home
  </BreadcrumbItem>
  <BreadcrumbItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
    Documents
  </BreadcrumbItem>
  <BreadcrumbItem href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Add Document
  </BreadcrumbItem>
</Breadcrumb>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="max-width" title="With Max Width">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Breadcrumb class="max-w-xs">
                <BreadcrumbItem>Long text 1</BreadcrumbItem>
                <BreadcrumbItem>Long text 2</BreadcrumbItem>
                <BreadcrumbItem>Long text 3</BreadcrumbItem>
                <BreadcrumbItem>Long text 4</BreadcrumbItem>
                <BreadcrumbItem>Long text 5</BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            <CodeBlock
              code={`<Breadcrumb class="max-w-xs">
  <BreadcrumbItem>Long text 1</BreadcrumbItem>
  <BreadcrumbItem>Long text 2</BreadcrumbItem>
  <BreadcrumbItem>Long text 3</BreadcrumbItem>
  <BreadcrumbItem>Long text 4</BreadcrumbItem>
  <BreadcrumbItem>Long text 5</BreadcrumbItem>
</Breadcrumb>`}
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
