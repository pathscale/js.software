import { CopyButton as UICopyButton } from "@pathscale/ui";
import { TbCheck, TbCopy } from "solid-icons/tb";
import { createSignal, type Component } from "solid-js";

interface CopyButtonProps {
  text: string;
  class?: string;
  title?: string;
}

export const CopyButton: Component<CopyButtonProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UICopyButton
      text={props.text}
      title={props.title}
      class={props.class}
      onCopy={handleCopy}
    >
      {copied() ? <TbCheck size={16} /> : <TbCopy size={16} />}
    </UICopyButton>
  );
};
