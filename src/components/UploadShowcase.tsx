import { createSignal, For, Show } from "solid-js";
import { Upload, Tag } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { FiUpload } from "solid-icons/fi";

export default function UploadShowcase() {
  const [basicFiles, setBasicFiles] = createSignal<File[]>([]);
  const [buttonFiles, setButtonFiles] = createSignal<File[]>([]);
  const [sizeFiles, setSizeFiles] = createSignal<File[]>([]);
  const [multipleFiles, setMultipleFiles] = createSignal<File[]>([]);
  const [dragFiles, setDragFiles] = createSignal<File[]>([]);

  const props = [
    {
      name: "label",
      type: "string",
      description: "Text label to display inside the component",
    },
    {
      name: "icon",
      type: "JSX.Element",
      description: "Icon element to display next to the label",
    },
    {
      name: "style",
      type: '"boxed" | "button"',
      default: '"boxed"',
      description: "Visual style of the uploader",
    },
    {
      name: "color",
      type: '"primary" | "success" | "info" | "warning" | "danger" | "gray"',
      default: '"gray"',
      description: "Color scheme (applies to 'button' style)",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of label and icon",
    },
    {
      name: "multiple",
      type: "boolean",
      description: "Allow multiple file selection",
    },
    {
      name: "accept",
      type: "string",
      description: "Comma-separated list of accepted MIME types or extensions",
    },
    { name: "disabled", type: "boolean", description: "Disables the upload" },
    {
      name: "dragDrop",
      type: "boolean",
      description: "Enable drag-and-drop file selection",
    },
    {
      name: "onChange",
      type: "(files: File | File[]) => void",
      description: "Callback when file(s) selected",
    },
  ];

  return (
    <ShowcaseLayout>
      <ShowcaseSection id="basic" title="Basic Upload (Boxed)">
        <Upload
          label="Upload file"
          icon={<FiUpload />}
          onChange={(file) =>
            setBasicFiles(Array.isArray(file) ? file : [file])
          }
        />
        <FileList
          files={basicFiles()}
          onRemove={(i) =>
            setBasicFiles((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
          }
        />
        <CodeBlock
          code={`<Upload
  label="Upload file"
  icon={<FiUpload />}
  onChange={(file) => setFiles(Array.isArray(file) ? file : [file])}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="button" title="Button Style + Color">
        <div class="flex flex-col gap-4">
          {(["primary", "success", "danger"] as const).map((color) => (
            <Upload
              style="button"
              color={color}
              label={`Upload ${color}`}
              icon={<FiUpload />}
              onChange={(file) =>
                setButtonFiles(Array.isArray(file) ? file : [file])
              }
            />
          ))}
        </div>
        <FileList
          files={buttonFiles()}
          onRemove={(i) =>
            setButtonFiles((prev) => [
              ...prev.slice(0, i),
              ...prev.slice(i + 1),
            ])
          }
        />
      </ShowcaseSection>

      <ShowcaseSection id="sizes" title="Size Variants">
        <div class="flex flex-col gap-4">
          <Upload
            size="sm"
            label="Small"
            icon={<FiUpload />}
            onChange={(file) =>
              setSizeFiles(Array.isArray(file) ? file : [file])
            }
          />
          <Upload
            size="md"
            label="Medium"
            icon={<FiUpload />}
            onChange={(file) =>
              setSizeFiles(Array.isArray(file) ? file : [file])
            }
          />
          <Upload
            size="lg"
            label="Large"
            icon={<FiUpload />}
            onChange={(file) =>
              setSizeFiles(Array.isArray(file) ? file : [file])
            }
          />
        </div>
        <FileList
          files={sizeFiles()}
          onRemove={(i) =>
            setSizeFiles((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
          }
        />
      </ShowcaseSection>

      <ShowcaseSection id="multiple" title="Multiple File Upload">
        <Upload
          label="Upload multiple files"
          icon={<FiUpload />}
          multiple
          onChange={(file) =>
            setMultipleFiles(Array.isArray(file) ? file : [file])
          }
        />
        <FileList
          files={multipleFiles()}
          onRemove={(i) =>
            setMultipleFiles((prev) => [
              ...prev.slice(0, i),
              ...prev.slice(i + 1),
            ])
          }
        />
      </ShowcaseSection>

      <ShowcaseSection id="dragdrop" title="Drag and Drop">
        <Upload
          label="Drop file here or click to upload"
          dragDrop
          icon={<FiUpload />}
          onChange={(file) => setDragFiles(Array.isArray(file) ? file : [file])}
        />
        <FileList
          files={dragFiles()}
          onRemove={(i) =>
            setDragFiles((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
          }
        />
      </ShowcaseSection>

      <ShowcaseSection id="disabled" title="Disabled Upload">
        <Upload label="Disabled" disabled icon={<FiUpload />} />
        <CodeBlock
          code={`<Upload label="Disabled" disabled icon={<FiUpload />} />`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}

function FileList(props: {
  files: File[];
  onRemove?: (index: number) => void;
}) {
  return (
    <Show when={props.files.length}>
      <div class="flex flex-wrap gap-2 mt-3">
        <For each={props.files}>
          {(file, index) => (
            <Tag
              color="info"
              variant="fill"
              size="sm"
              closable
              onClose={() => props.onRemove?.(index())}
            >
              {file.name}
            </Tag>
          )}
        </For>
      </div>
    </Show>
  );
}
