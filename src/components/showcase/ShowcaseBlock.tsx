import { ParentComponent, Show } from "solid-js";
import { CodeBlock } from "./CodeBlock";

interface ShowcaseBlockProps {
  title: string;
  description?: string;
  code?: string;
  preview?: boolean;
}

const ShowcaseBlock: ParentComponent<ShowcaseBlockProps> = (props) => {
  return (
    <div class="space-y-4">
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 class="text-xl font-semibold mb-2 text-fg-primary">
          {props.title}
        </h3>
        <Show when={props.description}>
          <p class="text-fg-secondary mb-4">{props.description}</p>
        </Show>
        <div
          class={
            props.preview
              ? "p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
              : ""
          }
        >
          {props.children}
        </div>
      </div>
      <Show when={props.code}>
        <CodeBlock code={props.code!} />
      </Show>
    </div>
  );
};

export default ShowcaseBlock;
