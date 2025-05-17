import { toast, Toaster } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function ToastShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "types", title: "Types" },
    { id: "duration", title: "Duration" },
    { id: "dismissible", title: "Dismissible" },
    { id: "custom", title: "Custom Options" },
    { id: "api", title: "API Reference" },
  ] as const;

  const toastProps = [
    {
      name: "message",
      type: "string",
      description: "The text content of the toast notification",
    },
    {
      name: "type",
      type: '"success" | "error" | "info" | "warning" | "default"',
      default: '"default"',
      description: "The visual style and color scheme of the toast",
    },
    {
      name: "duration",
      type: "number | false",
      default: "4000",
      description:
        "Duration in milliseconds before auto-dismissal, false to persist",
    },
    {
      name: "dismissible",
      type: "boolean",
      default: "true",
      description: "Whether the toast can be dismissed by clicking",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback function called when the toast is dismissed",
    },
  ];

  const toastApi = [
    {
      name: "toast.show(message, options?)",
      type: "function",
      description: "Show a default toast with optional custom options",
    },
    {
      name: "toast.success(message, options?)",
      type: "function",
      description: "Show a success toast with green styling",
    },
    {
      name: "toast.error(message, options?)",
      type: "function",
      description: "Show an error toast with red styling",
    },
    {
      name: "toast.info(message, options?)",
      type: "function",
      description: "Show an info toast with blue styling",
    },
    {
      name: "toast.warning(message, options?)",
      type: "function",
      description: "Show a warning toast with yellow styling",
    },
    {
      name: "toast.clear()",
      type: "function",
      description: "Remove all currently visible toasts",
    },
  ];

  return (
    <ShowcaseLayout>
      <Toaster />
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
            <button
              class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
              onClick={() => toast.show("This is a basic toast notification")}
            >
              Show Basic Toast
            </button>
            <CodeBlock
              code={`// Basic toast usage
toast.show("This is a basic toast notification");`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="types" title="Types">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <button
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.success("Operation completed successfully!")
                }
              >
                Success Toast
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => toast.error("An error occurred")}
              >
                Error Toast
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => toast.info("Here's some information")}
              >
                Info Toast
              </button>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                onClick={() => toast.warning("Please be careful")}
              >
                Warning Toast
              </button>
            </div>
            <CodeBlock
              code={`// Different toast types
toast.success("Operation completed successfully!");
toast.error("An error occurred");
toast.info("Here's some information");
toast.warning("Please be careful");`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="duration" title="Duration">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.show("Quick toast (2s)", { duration: 2000 })
                }
              >
                2s Duration
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.show("Long toast (8s)", { duration: 8000 })
                }
              >
                8s Duration
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.show("Persistent toast (click to dismiss)", {
                    duration: false,
                    dismissible: true,
                  })
                }
              >
                Persistent Toast
              </button>
            </div>
            <CodeBlock
              code={`// Custom durations
toast.show("Quick toast", { duration: 2000 });
toast.show("Long toast", { duration: 8000 });
toast.show("Persistent toast", { duration: false });`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="dismissible" title="Dismissible">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.show("Click me to dismiss", { dismissible: true })
                }
              >
                Dismissible Toast
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.show("Cannot be dismissed by clicking", {
                    dismissible: false,
                  })
                }
              >
                Non-dismissible Toast
              </button>
            </div>
            <CodeBlock
              code={`// Dismissible options
toast.show("Click me to dismiss", { dismissible: true });
toast.show("Cannot be dismissed", { dismissible: false });`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="custom" title="Custom Options">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() =>
                  toast.success("Custom success toast", {
                    duration: 6000,
                    dismissible: true,
                    onClose: () => console.log("Toast closed"),
                  })
                }
              >
                Combined Options
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                onClick={() => toast.clear()}
              >
                Clear All Toasts
              </button>
            </div>
            <CodeBlock
              code={`// Combining multiple options
toast.success("Custom success toast", {
  duration: 6000,
  dismissible: true,
  onClose: () => console.log("Toast closed"),
});

// Clear all toasts
toast.clear();`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="api" title="API Reference">
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium mb-4">Component Props</h3>
              <PropsTable props={toastProps} />
            </div>

            <div>
              <h3 class="text-lg font-medium mb-4">Toast API Methods</h3>
              <PropsTable props={toastApi} />
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
