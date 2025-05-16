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
      class={`inline-flex items-center justify-center p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors ${
        props.class ?? ""
      }`}
    >
      {copied() ? <TbCheck size={16} /> : <TbCopy size={16} />}
    </button>
  );
}
