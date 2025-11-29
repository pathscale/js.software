import { createSignal, onCleanup } from "solid-js";
import { Flex, Icon, StreamingTable } from "@pathscale/ui";
import type { StreamingColumnDef } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

interface MockDataRow {
  id: string;
  symbol: string;
  price: number;
  change: number;
  timestamp: number;
}

export default function StreamingTableShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "demo", title: "Interactive Demo" },
    { id: "props", title: "Props" },
  ] as const;

  // Mock streaming data generator
  const [data, setData] = createSignal<MockDataRow[]>([]);
  const [isStreaming, setIsStreaming] = createSignal(false);
  const [streamInterval, setStreamInterval] = createSignal<number | undefined>();
  const [filterValue, setFilterValue] = createSignal("");

  const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "AAVEUSDT"];

  const generateRow = (id: number): MockDataRow => ({
    id: `row-${id}`,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    price: 50000 + Math.random() * 10000,
    change: (Math.random() - 0.5) * 10,
    timestamp: Date.now(),
  });

  const startStreaming = () => {
    setIsStreaming(true);
    let counter = 0;

    const interval = setInterval(() => {
      const newRows = Array.from({ length: 5 }, () => generateRow(counter++));
      setData((prev) => [...prev, ...newRows]);
    }, 1000) as unknown as number;

    setStreamInterval(interval);
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    const interval = streamInterval();
    if (interval !== undefined) {
      clearInterval(interval);
      setStreamInterval(undefined);
    }
  };

  const resetData = () => {
    stopStreaming();
    setData([]);
  };

  onCleanup(() => {
    const interval = streamInterval();
    if (interval !== undefined) {
      clearInterval(interval);
    }
  });

  const columns: StreamingColumnDef<MockDataRow>[] = [
    { header: "Symbol", accessorKey: "symbol" },
    {
      header: "Price",
      accessorKey: "price",
      cell: (ctx: any) => `$${ctx.row.original.price.toFixed(2)}`,
    },
    {
      header: "Change %",
      accessorKey: "change",
      cell: (ctx: any) => {
        const value = ctx.row.original.change;
        const color = value >= 0 ? "text-success" : "text-error";
        return <span class={color}>{value.toFixed(2)}%</span>;
      },
    },
    {
      header: "Timestamp",
      accessorFn: (row: MockDataRow) => new Date(row.timestamp).toLocaleTimeString(),
    },
  ];

  const streamingTableProps = [
    {
      name: "data",
      type: "TData[]",
      default: "—",
      description: "Array of data rows to display. Updates reactively.",
    },
    {
      name: "columns",
      type: "StreamingColumnDef<TData>[]",
      default: "—",
      description: "Column definitions (header, accessorKey, cell renderer, sortingFn, filterFn, etc.)",
    },
    {
      name: "getRowId",
      type: "(row: TData) => string",
      default: "(row) => row.id || JSON.stringify(row)",
      description: "Function to extract unique ID from each row",
    },
    {
      name: "streamingConfig.maxBufferSize",
      type: "number",
      default: "1000",
      description: "Maximum number of rows to keep in buffer (FIFO truncation)",
    },
    {
      name: "streamingConfig.appendMode",
      type: "boolean",
      default: "false",
      description: "If true, only append new rows. If false, sync mode (upsert + remove stale).",
    },
    {
      name: "enableSorting",
      type: "boolean",
      default: "false",
      description: "Enable client-side sorting. Click column headers to toggle sort direction.",
    },
    {
      name: "enableFiltering",
      type: "boolean",
      default: "false",
      description: "Enable client-side filtering. Filters are applied before sorting and pagination.",
    },
    {
      name: "filterValue",
      type: "string",
      default: "''",
      description: "External control of filter value. Case-insensitive search across all columns.",
    },
    {
      name: "globalFilterFn",
      type: "(row, filterValue, columns) => boolean",
      default: "defaultGlobalFilterFn",
      description: "Custom global filter function. Overrides default case-insensitive matching.",
    },
    {
      name: "enablePagination",
      type: "boolean",
      default: "false",
      description: "Enable client-side pagination with page controls.",
    },
    {
      name: "pageSize",
      type: "number",
      default: "10",
      description: "Number of rows per page when pagination is enabled.",
    },
    {
      name: "initialPage",
      type: "number",
      default: "0",
      description: "Initial page index (0-based) when pagination is enabled.",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="demo" title="Interactive Demo">
          <Flex direction="col" gap="md">
            <p class="text-sm text-base-content/70">
              StreamingTable supports client-side sorting, filtering, and pagination on top of buffered streaming data.
              All features work together seamlessly: filter → sort → paginate.
            </p>

            <div class="flex gap-2 items-center flex-wrap">
              <button
                class="btn btn-sm btn-primary h-8"
                onClick={startStreaming}
                disabled={isStreaming()}
              >
                <Icon name="icon-[lucide--play]" width={16} height={16} />
                Start Streaming
              </button>
              <button
                class="btn btn-sm btn-error h-8"
                onClick={stopStreaming}
                disabled={!isStreaming()}
              >
                <Icon name="icon-[lucide--stop-circle]" width={16} height={16} />
                Stop
              </button>
              <button class="btn btn-sm btn-neutral h-8" onClick={resetData}>
                Reset
              </button>
              <div class="badge badge-info h-8 px-3">
                {data().length} rows buffered
              </div>
            </div>

            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Search (filters all columns)</span>
              </label>
              <input
                type="text"
                placeholder="Filter by symbol, price, change..."
                class="input input-bordered input-sm"
                value={filterValue()}
                onInput={(e) => setFilterValue(e.currentTarget.value)}
              />
            </div>

            <div class="overflow-x-auto">
              <StreamingTable
                data={data()}
                columns={columns}
                getRowId={(row) => row.id}
                streamingConfig={{
                  maxBufferSize: 1000,
                  appendMode: true,
                }}
                enableSorting={true}
                enableFiltering={true}
                filterValue={filterValue()}
                enablePagination={true}
                pageSize={10}
              />
            </div>

            <CodeBlock
              code={`const [filterValue, setFilterValue] = createSignal("");

<input
  type="text"
  value={filterValue()}
  onInput={(e) => setFilterValue(e.currentTarget.value)}
/>

<StreamingTable
  data={streamData()}
  columns={columns}
  streamingConfig={{
    maxBufferSize: 1000,
    appendMode: true,
  }}
  // Enable all features
  enableSorting={true}
  enableFiltering={true}
  filterValue={filterValue()}
  enablePagination={true}
  pageSize={10}
/>`}
            />

            <div class="alert alert-info">
              <Icon name="icon-[lucide--info]" width={20} height={20} />
              <div>
                <h4 class="font-bold">Feature Highlights</h4>
                <ul class="list-disc list-inside text-sm mt-2">
                  <li><strong>Sorting:</strong> Click column headers to sort (asc/desc/none cycle)</li>
                  <li><strong>Filtering:</strong> Case-insensitive search across all columns</li>
                  <li><strong>Pagination:</strong> 10 rows per page with page navigation</li>
                  <li><strong>Buffer Management:</strong> FIFO truncation at 1000 rows</li>
                  <li><strong>Real-time Updates:</strong> Features work on streaming data</li>
                </ul>
              </div>
            </div>
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">StreamingTable</h3>
            <PropsTable props={streamingTableProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
