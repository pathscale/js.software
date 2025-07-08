import { Component, createSignal } from "solid-js";
import { CopyButton } from "../showcase/CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  copyable?: boolean;
  title?: string;
  className?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class={`relative ${props.className || ""}`}>
      {props.title && <div class="text-sm font-medium mb-2">{props.title}</div>}
      <pre class="mockup-code bg-base-300 text-base-content rounded-lg overflow-x-auto">
        <code class={`language-${props.language || "typescript"}`}>
          {props.code}
        </code>
      </pre>
      {(props.showCopy || props.copyable) && (
        <div class="absolute top-2 right-2">
          <CopyButton text={props.code} title="Copy code" />
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
