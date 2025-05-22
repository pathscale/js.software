import { createSignal } from "solid-js";
import { TbCopy, TbCheck } from "solid-icons/tb";

interface CopyButtonProps {
  text: string;
  class?: string;
  title?: string;
}

export function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = createSignal(false);

  const copy = async () => {
    await navigator.clipboard.writeText(props.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={props.title}
      class={`inline-flex items-center justify-center p-1.5 rounded-md
        text-[hsl(var(--color-fg-secondary)/1)]
        hover:text-[hsl(var(--color-fg-body)/1)]
        bg-[hsl(var(--color-bg-secondary)/1)]
        hover:bg-[hsl(var(--color-bg-secondary)/0.85)]
        transition-colors ${props.class ?? ""}`}
    >
      {copied() ? <TbCheck size={16} /> : <TbCopy size={16} />}
    </button>
  );
}
