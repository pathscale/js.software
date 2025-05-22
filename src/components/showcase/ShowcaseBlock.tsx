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
      <div class="p-6 bg-[hsl(var(--color-bg-secondary)/1)] rounded-lg shadow-sm">
        <h3 class="text-xl font-semibold mb-2 text-fg-primary">
          {props.title}
        </h3>
        <Show when={props.description}>
          <p class="text-fg-secondary mb-4">{props.description}</p>
        </Show>
        <div
          class={
            props.preview
              ? "p-8 border border-[hsl(var(--color-border, var(--color-fg-body))/0.15)] rounded-lg bg-[hsl(var(--color-bg-body)/1)]"
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
