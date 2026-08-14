import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Pagination, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function PaginationShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "few-pages", title: "Few Pages" },
    { id: "many-pages", title: "Many Pages" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "page",
      type: "number",
      description: "Current active page (1-based).",
    },
    {
      name: "total",
      type: "number",
      description: "Total number of pages.",
    },
    {
      name: "onChange",
      type: "(page: number) => void",
      description: "Callback fired when the active page changes.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      default: "false",
      description: "Disables all pagination controls.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias)",
    },
  ];

  const [defaultPage, setDefaultPage] = createSignal(2);
  const [fewPage, setFewPage] = createSignal(1);
  const [manyPage, setManyPage] = createSignal(5);
  const [disabledPage, setDisabledPage] = createSignal(3);

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
            <Flex align="start" justify="start">
              <Pagination page={defaultPage()} total={10} onChange={setDefaultPage} />
            </Flex>
            <CodeBlock
              code={`<Pagination page={page()} total={10} onChange={setPage} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="few-pages" title="Few Pages">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Pagination page={fewPage()} total={4} onChange={setFewPage} />
            </Flex>
            <CodeBlock
              code={`<Pagination page={page()} total={4} onChange={setPage} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="many-pages" title="Many Pages">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Pagination page={manyPage()} total={100} onChange={setManyPage} />
            </Flex>
            <CodeBlock
              code={`<Pagination page={page()} total={100} onChange={setPage} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Pagination
                page={disabledPage()}
                total={10}
                onChange={setDisabledPage}
                state="disabled"
              />
            </Flex>
            <CodeBlock
              code={`<Pagination page={page()} total={10} onChange={setPage} state="disabled" />`}
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
