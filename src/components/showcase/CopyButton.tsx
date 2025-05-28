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
    <></>
  );
};
