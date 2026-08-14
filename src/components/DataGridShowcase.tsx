import { Button, Chip, createDataGrid, DataGrid, Flex } from "@pathscale/ui";
import { For } from "solid-js";

import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  status: string;
};

const PEOPLE: Person[] = [
  { id: 1, firstName: "John", lastName: "Doe", age: 41, status: "active" },
  { id: 2, firstName: "Jane", lastName: "Roe", age: 29, status: "invited" },
  { id: 3, firstName: "Ada", lastName: "Byron", age: 36, status: "active" },
  { id: 4, firstName: "Grace", lastName: "Hopper", age: 45, status: "archived" },
  { id: 5, firstName: "Alan", lastName: "Turing", age: 41, status: "invited" },
];

const STATUS_FLAVOR: Record<string, string> = {
  active: "success",
  invited: "info",
  archived: "neutral",
};

/** The builder is the primary API, so every demo here starts with one. */
function seed(grid: ReturnType<typeof createDataGrid<Person>>) {
  for (const person of PEOPLE) grid.addRow(person);
  return grid;
}

export default function DataGridShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "custom-cells", title: "Custom cells" },
    { id: "search-sort-page", title: "Search, sort and page" },
    { id: "selection", title: "Selection" },
    { id: "grouping", title: "Grouping" },
    { id: "presentation", title: "Presentation" },
    { id: "empty", title: "Empty" },
    { id: "porting", title: "Porting from vue3-ui" },
    { id: "props", title: "Props" },
  ] as const;

  const basic = seed(createDataGrid<Person>());
  basic.addColumn("id", "ID", "number");
  basic.addColumn("firstName", "First Name", "string");
  basic.addColumn("lastName", "Last Name", "string");
  basic.addColumn("age", "Age", "number", { align: "end" });

  const custom = seed(createDataGrid<Person>());
  custom.addColumn("firstName", "Name", "string");
  custom.addColumn("status", "Status", "custom", {
    render: ({ value }) => (
      <Chip size="sm" flavor={STATUS_FLAVOR[String(value)] ?? "neutral"}>
        {String(value)}
      </Chip>
    ),
  });

  const full = seed(createDataGrid<Person>({ pageSize: 3 }));
  full.addColumn("id", "ID", "number", { sticky: true });
  full.addColumn("firstName", "First Name", "string", { searchable: true });
  full.addColumn("lastName", "Last Name", "string", { searchable: true });
  full.addColumn("age", "Age", "number", { align: "end" });

  const selectable = seed(createDataGrid<Person>({ selection: "multiple" }));
  selectable.addColumn("firstName", "First Name", "string");
  selectable.addColumn("status", "Status", "string");

  const grouped = seed(createDataGrid<Person>({ groupBy: "status" }));
  grouped.addColumn("firstName", "First Name", "string");
  grouped.addColumn("age", "Age", "number", { align: "end" });

  const dense = seed(createDataGrid<Person>());
  dense.addColumn("firstName", "First Name", "string");
  dense.addColumn("lastName", "Last Name", "string");
  dense.addColumn("age", "Age", "number", { align: "end" });

  const blank = createDataGrid<Person>();
  blank.addColumn("firstName", "First Name", "string");
  blank.addColumn("age", "Age", "number");

  const gridProps = [
    {
      name: "model",
      type: "DataGridModel",
      default: "—",
      description:
        "The only required prop. Everything the grid can do is a fact about the model.",
    },
    {
      name: "borders",
      type: `"none" | "rows" | "cols" | "both"`,
      default: `"rows"`,
      description: "Named borders, not grid: a prop named grid beside model={grid} reads like the model twice.",
    },
    {
      name: "striping",
      type: `"none" | "rows" | "cols"`,
      default: `"none"`,
      description: "Zebra shading, one step below the hover shade so a hovered stripe still changes.",
    },
    {
      name: "sticky",
      type: `"none" | "header" | "columns" | "both"`,
      default: `"none"`,
      description: "Columns stick when the column itself was added with sticky: true.",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      description: "Row hover feedback. Named to match Card rather than vue3's hoverable.",
    },
    { name: "size", type: "Size", default: `"md"`, description: "Row density." },
    { name: "width", type: "Width", default: "—", description: "Mirrored to data-width." },
    { name: "flavor", type: "Flavor", default: "—", description: "Mirrored to data-flavor." },
    { name: "caption", type: "JSX.Element", default: "—", description: "Rendered as a real <caption>." },
    {
      name: "empty",
      type: "JSX.Element",
      default: `"No rows"`,
      description: "Shown in place of the body when nothing survives the filters.",
    },
    {
      name: "renderExpanded",
      type: "(row) => JSX.Element",
      default: "—",
      description: "Supplying it is what makes rows expandable. There is no expandable flag.",
    },
    {
      name: "onSortChange / onPageChange / onSelectionChange",
      type: "(value) => void",
      default: "—",
      description:
        "Mirrors, for an app keeping state in a URL. The model stays the source: read the URL and call grid.setSort().",
    },
  ];

  const modelMethods = [
    {
      name: "addColumn(name, label, dataType?, options?)",
      type: `dataType: "string" | "number" | "boolean" | "date" | "custom"`,
      default: `"string"`,
      description:
        "dataType stays third positional so a vue3 call ports verbatim, but it is a closed union: an open string let a typo typecheck and render nothing.",
    },
    {
      name: "addRow(row, index?) / deleteRow(index) / setRows(rows)",
      type: "void",
      default: "—",
      description: "deleteRow indexes the source rows, not what is on screen.",
    },
    {
      name: "sortByColumn(name, direction?)",
      type: `direction?: "ascending" | "descending"`,
      default: "—",
      description:
        "Without a direction it cycles ascending, descending, unsorted, so the same header click puts the grid back as it was found.",
    },
    {
      name: "searchColumn(name, query) / resetFilters()",
      type: "void",
      default: "—",
      description:
        "Queries accumulate across columns. vue3 could only ever hold the last one.",
    },
    {
      name: "switchPage(page) / setPageSize(size)",
      type: "void",
      default: "—",
      description: "Pages count from zero and a request is clamped to the pages that exist.",
    },
    {
      name: "toggleColumn(name, visible?) / toggleCheck(row, index) / toggleCheckAll(selected)",
      type: "void",
      default: "—",
      description:
        "toggleCheckAll takes what the reader can see, not what a filter is hiding.",
    },
    {
      name: "setGroupBy(name) / groups(name) / filterRows(name, value)",
      type: "void | unknown[] | Row[]",
      default: "—",
      description: "groups returns distinct values in first-seen order.",
    },
  ];

  const modelAccessors = [
    {
      name: "columns / visibleColumns / columnsByName",
      type: "Accessor",
      default: "—",
      description: "visibleColumns replaces vue3's getColumns, which always returned only the visible ones.",
    },
    {
      name: "rows / filteredRows / sortedRows / pageRows",
      type: "Accessor<Row[]>",
      default: "—",
      description:
        "rows is the source and the rest is derived, which is why searching survives a page change.",
    },
    {
      name: "sort / queries / page / pageSize / pageCount / total",
      type: "Accessor",
      default: "—",
      description: "Read them to mirror state into a URL.",
    },
    {
      name: "selectedIds / selectedRows / groupBy / groupedRows",
      type: "Accessor",
      default: "—",
      description:
        "Selection is keyed by an id assigned in source order, so it survives a sort.",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            <For each={sections}>
              {(section) => (
                <a
                  href={`#${section.id}`}
                  class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
                >
                  {section.title}
                </a>
              )}
            </For>
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <p class="text-sm opacity-80">
            Build the model, hand it over. <code>model</code> is the only required prop, and
            there is no <code>sortable</code>, <code>searchable</code>, <code>checkable</code>,{" "}
            <code>pagination</code> or <code>expandable</code> flag, because each of those is
            already a fact about the model and a second copy on the tag could disagree with it.
          </p>
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={basic} />
          </Flex>
          <CodeBlock
            code={`const grid = createDataGrid<Person>();
grid.addColumn("id", "ID", "number");
grid.addColumn("firstName", "First Name", "string");
grid.addColumn("lastName", "Last Name", "string");
grid.addColumn("age", "Age", "number", { align: "end" });
for (const person of people) grid.addRow(person);

<DataGrid model={grid} />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="custom-cells" title="Custom cells">
          <p class="text-sm opacity-80">
            <code>dataType: "custom"</code> is what a per-column <code>render</code> is for. It
            receives the cell value, the whole row, the column and the row index.
          </p>
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={custom} borders="rows" />
          </Flex>
          <CodeBlock
            code={`grid.addColumn("status", "Status", "custom", {
  render: ({ value }) => <Chip size="sm" flavor={flavorFor(value)}>{String(value)}</Chip>,
});`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="search-sort-page" title="Search, sort and page">
          <p class="text-sm opacity-80">
            A search box appears for every column added <code>searchable</code>, and the footer
            appears because the model was given a <code>pageSize</code>. The three compose:
            search something, then turn the page, and the search is still applied. In vue3 each
            of those three rewrote the same array, so any two of them destroyed each other.
          </p>
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={full} borders="both" striping="rows" sticky="both" interactive />
          </Flex>
          <CodeBlock
            code={`const grid = createDataGrid<Person>({ pageSize: 3 });
grid.addColumn("id", "ID", "number", { sticky: true });
grid.addColumn("firstName", "First Name", "string", { searchable: true });
grid.addColumn("lastName", "Last Name", "string", { searchable: true });

<DataGrid model={grid} borders="both" striping="rows" sticky="both" interactive />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="selection" title="Selection">
          <p class="text-sm opacity-80">
            The checkbox column exists because the model was given a selection mode. Selection is
            keyed by an id assigned in source order, so it stays attached to its row across a
            sort, and "select all" takes what the reader can see rather than what a filter is
            hiding.
          </p>
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={selectable} borders="rows" interactive />
            <Button
              size="sm"
              variant="outline"
              onClick={() => console.log(selectable.selectedRows())}
            >
              Log selection
            </Button>
          </Flex>
          <CodeBlock
            code={`const grid = createDataGrid<Person>({ selection: "multiple" });   // or "single"

<DataGrid model={grid} borders="rows" interactive />
// grid.selectedRows() / grid.selectedIds()`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="grouping" title="Grouping">
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={grouped} borders="rows" />
          </Flex>
          <CodeBlock
            code={`const grid = createDataGrid<Person>({ groupBy: "status" });
// or later: grid.setGroupBy("status")
// grid.groups("status") -> distinct values, in first-seen order`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="presentation" title="Presentation">
          <p class="text-sm opacity-80">
            What is left on the tag is presentation, which is nobody else's fact. The border axis
            is <code>borders</code>, not <code>grid</code>: a prop named <code>grid</code> sitting
            beside <code>model={"{grid}"}</code> reads like the model was passed twice.
          </p>
          <Flex class="w-full component-preview" direction="col" gap="lg">
            <DataGrid model={dense} size="xs" borders="both" striping="rows" />
            <DataGrid model={dense} size="lg" borders="none" />
          </Flex>
          <CodeBlock
            code={`<DataGrid model={grid} size="xs" borders="both" striping="rows" />
<DataGrid model={grid} size="lg" borders="none" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="empty" title="Empty">
          <Flex class="w-full component-preview" direction="col" gap="md">
            <DataGrid model={blank} empty="Nothing here yet" />
          </Flex>
          <CodeBlock code={`<DataGrid model={grid} empty="Nothing here yet" />`} />
        </ShowcaseSection>

        <ShowcaseSection id="porting" title="Porting from vue3-ui">
          <p class="text-sm opacity-80">
            The verbs and their positional shapes carry over, so{" "}
            <code>grid.addColumn("id", "ID", "number")</code> moves unchanged. Five differences:
          </p>
          <PropsTable
            props={[
              {
                name: "caption",
                type: "label",
                default: "—",
                description: "caption collides with the <caption> element.",
              },
              {
                name: "dataType: string",
                type: "closed union",
                default: "—",
                description: "A typo used to typecheck and render nothing.",
              },
              {
                name: "sortByColumn(col, ascendant)",
                type: "sortByColumn(col, direction?)",
                default: "—",
                description: `A bare true meaning "ascending" is what 2.2 spent the release removing.`,
              },
              {
                name: "switchPage() reading a field",
                type: "switchPage(page)",
                default: "—",
                description: "Explicit.",
              },
              {
                name: "getColumns()",
                type: "visibleColumns()",
                default: "—",
                description: "It always returned only the visible ones.",
              },
            ]}
          />
          <p class="text-sm opacity-80">
            Drag reordering is not ported and cell editing is deferred. Eight of vue3's eighteen
            props do not survive as flags at all, because the capability follows from the model.
          </p>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">DataGrid</h3>
            <PropsTable props={gridProps} />

            <h3 class="text-lg font-semibold mt-4">createDataGrid — methods</h3>
            <PropsTable props={modelMethods} />

            <h3 class="text-lg font-semibold mt-4">createDataGrid — accessors</h3>
            <PropsTable props={modelAccessors} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
