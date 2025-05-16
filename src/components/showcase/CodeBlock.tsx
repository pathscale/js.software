import { onMount } from "solid-js";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

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
    <div class="relative rounded-lg bg-gray-900 p-4 overflow-x-auto">
      <pre class="text-sm">
        <code ref={codeRef} class={`language-${props.language || "tsx"}`}>
          {props.code.trim()}
        </code>
      </pre>
    </div>
  );
}
