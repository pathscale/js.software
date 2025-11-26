import { createSignal, onCleanup } from "solid-js";
import { Flex, Icon, StreamingTable, StreamingColumnDef} from "@pathscale/ui";
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
    { id: "basic", title: "Basic Streaming" },
    { id: "append-mode", title: "Append Mode with Buffer Limit" },
    { id: "sync-mode", title: "Sync Mode" },
    { id: "with-features", title: "With Sorting, Filtering & Pagination" },
  ] as const;

  // Mock streaming data generator
  const [data, setData] = createSignal<MockDataRow[]>([]);
  const [isStreaming, setIsStreaming] = createSignal(false);
  const [streamInterval, setStreamInterval] = createSignal<number | undefined>();

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
      description: "Column definitions (header, accessorKey, cell renderer, etc.)",
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
      description: "If true, only append new rows (don't remove stale). If false, sync mode (upsert + remove).",
    },
    {
      name: "...enhancedTableProps",
      type: "EnhancedTableProps",
      default: "—",
      description: "All props from EnhancedTable (sorting, filtering, pagination, icons, etc.)",
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

        <ShowcaseSection id="basic" title="Basic Streaming">
          <Flex direction="col" gap="md">
            <p class="text-sm text-base-content/70">
              StreamingTable maintains reactive row stores for efficient updates.
              Each incoming data array is synced with the internal store.
            </p>

            <div class="flex gap-2 items-center">
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
                {data().length} rows
              </div>
            </div>

            <div class="overflow-x-auto">
              <StreamingTable
                data={data()}
                columns={columns}
                getRowId={(row) => row.id}
                streamingConfig={{
                  maxBufferSize: 100,
                  appendMode: false,
                }}
              />
            </div>

            <CodeBlock
              code={`const [data, setData] = createSignal<DataRow[]>([]);

<StreamingTable
  data={data()}
  columns={columns}
  getRowId={(row) => row.id}
  streamingConfig={{
    maxBufferSize: 100,
    appendMode: true,
  }}
  enablePagination
  enableSorting
  enableFilters
  // ...all EnhancedTable props available
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="streaming-table-props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">StreamingTable</h3>
            <PropsTable props={streamingTableProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
