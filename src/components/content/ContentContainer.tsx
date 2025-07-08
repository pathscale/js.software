import { Component, createMemo } from "solid-js";

interface ContentContainerProps {
  children: any;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  prose?: boolean;
  className?: string;
}

export const ContentContainer: Component<ContentContainerProps> = (props) => {
  const isProse = createMemo(() => props.prose !== false);

  const maxWidthClass = createMemo(() => {
    switch (props.maxWidth) {
      case "sm":
        return "max-w-screen-sm";
      case "md":
        return "max-w-screen-md";
      case "lg":
        return "max-w-screen-lg";
      case "xl":
        return "max-w-screen-xl";
      case "2xl":
        return "max-w-screen-2xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-screen-lg";
    }
  });

  return (
    <div
      class={`mx-auto px-4 sm:px-6 lg:px-8 mt-16 ${maxWidthClass()} ${
        isProse() ? "prose prose-lg max-w-none" : ""
      } ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
};

export default ContentContainer;
