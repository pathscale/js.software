import ShowcaseLayout from "./ShowcaseLayout";
import { Pagination } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal } from "solid-js";

export default function PaginationShowcase() {
  const sizes = ["sm", "md", "lg"] as const;
  const alignments = ["start", "center", "end"] as const;

  const sections = [
    { id: "sizes", title: "Sizes" },
    { id: "alignments", title: "Alignments" },
    { id: "styles", title: "Styles" },
    { id: "simple", title: "Simple Mode" },
    { id: "ranges", title: "Custom Ranges" },
    { id: "props", title: "Props" },
  ] as const;

  const paginationProps = [
    {
      name: "total",
      type: "number",
      description: "Total number of items",
    },
    {
      name: "perPage",
      type: "number",
      default: "20",
      description: "Number of items per page",
    },
    {
      name: "current",
      type: "number",
      description: "Current page number",
    },
    {
      name: "onChange",
      type: "(page: number) => void",
      description: "Callback when page changes",
    },
    {
      name: "rangeBefore",
      type: "number",
      default: "1",
      description: "Number of pages to show before current page",
    },
    {
      name: "rangeAfter",
      type: "number",
      default: "1",
      description: "Number of pages to show after current page",
    },
    {
      name: "simple",
      type: "boolean",
      default: "false",
      description: "Whether to use simple mode",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the pagination buttons",
    },
    {
      name: "rounded",
      type: "boolean",
      default: "false",
      description: "Whether to use rounded buttons",
    },
  ];

  const [currentPage, setCurrentPage] = createSignal(1);
  const [simplePage, setSimplePage] = createSignal(1);
  const [rangePage, setRangePage] = createSignal(5);

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-col gap-4">
            {sizes.map((size) => (
              <Pagination
                size={size}
                total={100}
                current={currentPage()}
                onChange={setCurrentPage}
              />
            ))}
          </div>
          <CodeBlock
            code={`// Pagination sizes
<Pagination
  size="sm"
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>

<Pagination
  size="lg"
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="alignments" title="Alignments">
          <div class="flex flex-col gap-4">
            {alignments.map((align) => (
              <Pagination
                total={100}
                current={currentPage()}
                onChange={setCurrentPage}
                class={`flex items-center gap-1 ${
                  align === "start"
                    ? "justify-start"
                    : align === "center"
                    ? "justify-center"
                    : "justify-end"
                }`}
              />
            ))}
          </div>
          <CodeBlock
            code={`// Pagination alignments
<Pagination
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
  class="flex items-center gap-1 justify-center"
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="styles" title="Styles">
          <div class="flex flex-col gap-4">
            <Pagination
              total={100}
              current={currentPage()}
              onChange={setCurrentPage}
            />
            <Pagination
              rounded
              total={100}
              current={currentPage()}
              onChange={setCurrentPage}
            />
          </div>
          <CodeBlock
            code={`// Pagination styles
<Pagination
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>

<Pagination
  rounded
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="simple" title="Simple Mode">
          <div class="flex flex-col gap-4">
            <Pagination
              simple
              total={100}
              current={simplePage()}
              onChange={setSimplePage}
            />
            <Pagination
              simple
              perPage={1}
              total={100}
              current={simplePage()}
              onChange={setSimplePage}
            />
          </div>
          <CodeBlock
            code={`// Simple pagination
<Pagination
  simple
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>

<Pagination
  simple
  perPage={1}
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="ranges" title="Custom Ranges">
          <div class="flex flex-col gap-4">
            <Pagination
              total={100}
              current={rangePage()}
              onChange={setRangePage}
              rangeBefore={2}
              rangeAfter={2}
            />
            <Pagination
              total={100}
              current={rangePage()}
              onChange={setRangePage}
              rangeBefore={3}
              rangeAfter={1}
            />
          </div>
          <CodeBlock
            code={`// Custom ranges
<Pagination
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
  rangeBefore={2}
  rangeAfter={2}
/>

<Pagination
  total={100}
  current={currentPage()}
  onChange={setCurrentPage}
  rangeBefore={3}
  rangeAfter={1}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={paginationProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
