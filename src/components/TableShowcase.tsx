import ShowcaseLayout from "./ShowcaseLayout";
import { Table } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TableShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "sortable", title: "Sortable Columns" },
    { id: "props", title: "Props" },
  ];

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
  };

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
  ];

  const basicColumns = [
    { key: "name" as const, header: "Name" },
    { key: "email" as const, header: "Email" },
    { key: "role" as const, header: "Role" },
  ];

  const sortableColumns = [
    { key: "name" as const, header: "Name", sortable: true },
    { key: "email" as const, header: "Email", sortable: true },
    { key: "role" as const, header: "Role", sortable: true },
  ];

  const tableProps = [
    {
      name: "columns",
      type: "Column<Row>[]",
      required: true,
      description: "Array of column definitions",
    },
    {
      name: "rows",
      type: "Row[]",
      required: true,
      description: "Array of data rows",
    },
    {
      name: "rowKey",
      type: "(row: Row) => string | number",
      required: true,
      description: "Function to get unique key for each row",
    },
    {
      name: "onSort",
      type: "(key: keyof Row, direction: 'asc' | 'desc') => void",
      description: "Callback when sorting changes",
    },
  ];

  const columnProps = [
    {
      name: "key",
      type: "keyof Row",
      required: true,
      description: "Property key from row data",
    },
    {
      name: "header",
      type: "string",
      required: true,
      description: "Column header text",
    },
    {
      name: "sortable",
      type: "boolean",
      description: "Whether column is sortable",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <Table columns={basicColumns} rows={users} rowKey={(row) => row.id} />
          <CodeBlock
            code={`const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const rows = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
];

<Table
  columns={columns}
  rows={rows}
  rowKey={(row) => row.id}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sortable" title="Sortable Columns">
          <Table
            columns={sortableColumns}
            rows={users}
            rowKey={(row) => row.id}
            onSort={(key, direction) => {
              console.log(`Sorting by ${String(key)} ${direction}`);
            }}
          />
          <CodeBlock
            code={`const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
];

<Table
  columns={columns}
  rows={rows}
  rowKey={(row) => row.id}
  onSort={(key, direction) => {
    console.log(\`Sorting by \${key} \${direction}\`);
  }}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Table Props</h3>
          <PropsTable props={tableProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">Column Props</h3>
          <PropsTable props={columnProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
