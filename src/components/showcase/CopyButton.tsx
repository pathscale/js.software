import { TbCheck, TbCopy } from "solid-icons/tb";
import { createSignal } from "solid-js";

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
        text-[oklch(var(--color-base-content)/0.7)]
        hover:text-[oklch(var(--color-base-content)/1)]
        bg-[oklch(var(--color-base-200)/1)]
        hover:bg-[oklch(var(--color-base-200)/0.85)]
        transition-colors ${props.class ?? ""}`}
    >
      {copied() ? <TbCheck size={16} /> : <TbCopy size={16} />}
    </button>
  );
}
