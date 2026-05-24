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
    <div class="space-y-3">
      <div>
        <h3 class="text-lg font-medium">{props.title}</h3>
        <Show when={props.description}>
          <p class="text-sm text-base-content/70">{props.description}</p>
        </Show>
      </div>
      <div>{props.children}</div>
      <Show when={props.code}>
        <div class="pt-4">
          <CodeBlock code={props.code!} />
        </div>
      </Show>
    </div>
  );
};

export default ShowcaseBlock;
