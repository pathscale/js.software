import { onMount } from "solid-js";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock(props: CodeBlockProps) {
  let codeRef: HTMLElement | undefined;

  onMount(() => {
    if (codeRef) {
      Prism.highlightElement(codeRef);
    }
  });

  return (
    <div class="relative group">
      <CopyButton
        text={props.code}
        title="Copy code"
        class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
      />
      <pre class="!m-0 rounded-md bg-gray-900 p-4 dark:bg-gray-950">
        <code ref={codeRef} class={`language-${props.language ?? "tsx"}`}>
          {props.code}
        </code>
      </pre>
    </div>
  );
}
