import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";
import { createEffect } from "solid-js";
import { CopyButton } from "./CopyButton";
import { cn } from "../../lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  copyable?: boolean;
  className?: string;
}

export function CodeBlock(props: CodeBlockProps) {
  let codeRef: HTMLElement | undefined;

  createEffect(() => {
    if (codeRef && props.code) {
      requestAnimationFrame(() => {
        Prism.highlightElement(codeRef);
      });
    }
  });

  return (
    <div class={cn("relative group", props.className)}>
      {props.copyable !== false && (
        <CopyButton
          text={props.code}
          title="Copy code"
          class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
        />
      )}
      <pre class="!m-0 rounded-md p-4 bg-[hsl(var(--color-bg-code, var(--color-bg-secondary))/1)]">
        <code ref={codeRef} class={`language-${props.language ?? "tsx"}`}>
          {props.code}
        </code>
      </pre>
    </div>
  );
}
