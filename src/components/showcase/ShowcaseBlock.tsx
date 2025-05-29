import { ParentComponent, Show } from "solid-js";
import { CodeBlock } from "./CodeBlock";
import { ShowcaseBlock as UIShowcaseBlock } from "@pathscale/ui";

interface ShowcaseBlockProps {
  title: string;
  description?: string;
  code?: string;
  preview?: boolean;
}

const ShowcaseBlock: ParentComponent<ShowcaseBlockProps> = (props) => {
  return (
    <UIShowcaseBlock
      title={props.title}
      description={props.description}
      preview={props.preview}
    >
      {props.children}
      <Show when={props.code}>
        <div class="pt-4">
          <CodeBlock code={props.code!} />
        </div>
      </Show>
    </UIShowcaseBlock>
  );
};

export default ShowcaseBlock;
