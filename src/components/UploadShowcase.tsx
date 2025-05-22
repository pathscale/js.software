import { createSignal, For, Show } from "solid-js";
import { Upload, Tag } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { FiUpload } from "solid-icons/fi";

export default function UploadShowcase() {
  const styles = ["boxed", "button"] as const;
  const colors = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "gray",
  ] as const;
  const sizes = ["sm", "md", "lg"] as const;

  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "styles", title: "Styles" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "features", title: "Features" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

  const [basicFiles, setBasicFiles] = createSignal<File[]>([]);
  const [styleFiles, setStyleFiles] = createSignal<File[]>([]);
  const [colorFiles, setColorFiles] = createSignal<File[]>([]);
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
      default: "false",
      description: "Allow multiple file selection",
    },
    {
      name: "accept",
      type: "string",
      description: "Comma-separated list of accepted MIME types or extensions",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the upload",
    },
    {
      name: "dragDrop",
      type: "boolean",
      default: "false",
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
          <div class="space-y-4">
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
                setBasicFiles((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }
            />
          </div>
          <CodeBlock
            code={`<Upload
  label="Upload file"
  icon={<FiUpload />}
  onChange={(file) => setFiles(Array.isArray(file) ? file : [file])}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="styles" title="Styles">
          <div class="space-y-4">
            {styles.map((style) => (
              <Upload
                style={style}
                label={`${style} style uploader`}
                icon={<FiUpload />}
                onChange={(file) =>
                  setStyleFiles(Array.isArray(file) ? file : [file])
                }
              />
            ))}
            <FileList
              files={styleFiles()}
              onRemove={(i) =>
                setStyleFiles((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }
            />
          </div>
          <CodeBlock
            code={`// Available styles
<Upload style="boxed" label="Boxed style uploader" />
<Upload style="button" label="Button style uploader" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              {colors.map((color) => (
                <Upload
                  style="button"
                  color={color}
                  label={`${color} uploader`}
                  icon={<FiUpload />}
                  onChange={(file) =>
                    setColorFiles(Array.isArray(file) ? file : [file])
                  }
                />
              ))}
            </div>
            <FileList
              files={colorFiles()}
              onRemove={(i) =>
                setColorFiles((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }
            />
          </div>
          <CodeBlock
            code={`// Color variations (with button style)
<Upload style="button" color="primary" label="Primary uploader" />
<Upload style="button" color="success" label="Success uploader" />
<Upload style="button" color="info" label="Info uploader" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="space-y-4">
            {sizes.map((size) => (
              <Upload
                size={size}
                label={`${size.toUpperCase()} size`}
                icon={<FiUpload />}
                onChange={(file) =>
                  setSizeFiles(Array.isArray(file) ? file : [file])
                }
              />
            ))}
            <FileList
              files={sizeFiles()}
              onRemove={(i) =>
                setSizeFiles((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }
            />
          </div>
          <CodeBlock
            code={`// Size variations
<Upload size="sm" label="Small size" />
<Upload size="md" label="Medium size" />
<Upload size="lg" label="Large size" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="features" title="Features">
          <div class="space-y-4">
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-secondary)/1)]">
                Multiple Files
              </h3>
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
            </div>

            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-secondary)/1)]">
                Drag and Drop
              </h3>
              <Upload
                label="Drop files here or click to upload"
                icon={<FiUpload />}
                dragDrop
                onChange={(file) =>
                  setDragFiles(Array.isArray(file) ? file : [file])
                }
              />
              <FileList
                files={dragFiles()}
                onRemove={(i) =>
                  setDragFiles((prev) => [
                    ...prev.slice(0, i),
                    ...prev.slice(i + 1),
                  ])
                }
              />
            </div>

            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[hsl(var(--color-fg-secondary)/1)]">
                File Type Filter
              </h3>
              <Upload
                label="Images only (.jpg, .png)"
                icon={<FiUpload />}
                accept=".jpg,.png"
              />
            </div>
          </div>
          <CodeBlock
            code={`// Multiple file upload
<Upload
  multiple
  label="Upload multiple files"
  onChange={(files) => handleFiles(files)}
/>

// Drag and drop
<Upload
  dragDrop
  label="Drop files here"
  onChange={(files) => handleFiles(files)}
/>

// File type filter
<Upload
  accept=".jpg,.png"
  label="Images only"
  onChange={(files) => handleFiles(files)}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="space-y-4">
            <Upload label="Normal state" icon={<FiUpload />} />
            <Upload label="Disabled state" disabled icon={<FiUpload />} />
          </div>
          <CodeBlock
            code={`<Upload label="Normal state" />
<Upload label="Disabled state" disabled />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
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
              type="info"
              size="normal"
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
