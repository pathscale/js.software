import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";

export interface MDXRendererProps {
  content: string;
  className?: string;
  components?: Record<string, Component<any>>;
}

export const MDXRenderer: Component<MDXRendererProps> = (props) => {
  // Default MDX component mappings
  const defaultComponents = {
    // Code blocks
    code: (codeProps: any) => {
      // Inline code
      if (!codeProps.className) {
        return (
          <code class="px-1 py-0.5 bg-base-200 text-primary rounded text-sm font-mono">
            {codeProps.children}
          </code>
        );
      }

      // Code blocks
      const language = codeProps.className?.replace("language-", "") || "";
      return (
        <CodeBlock
          code={codeProps.children}
          language={language}
          copyable={true}
        />
      );
    },

    pre: (preProps: any) => {
      // Extract code from pre > code structure
      const codeElement = preProps.children;
      if (codeElement?.type === "code") {
        const language =
          codeElement.props.className?.replace("language-", "") || "";
        return (
          <CodeBlock
            code={codeElement.props.children}
            language={language}
            copyable={true}
          />
        );
      }
      return (
        <pre class="bg-base-200 p-4 rounded-lg overflow-x-auto">
          {preProps.children}
        </pre>
      );
    },

    // Headings with anchor links
    h1: (headingProps: any) => (
      <h1 class="text-4xl font-bold  mb-6 mt-8 first:mt-0" {...headingProps}>
        {headingProps.children}
      </h1>
    ),
    h2: (headingProps: any) => (
      <h2
        class="text-3xl font-semibold  mb-4 mt-8 first:mt-0"
        {...headingProps}
      >
        {headingProps.children}
      </h2>
    ),
    h3: (headingProps: any) => (
      <h3
        class="text-2xl font-semibold  mb-3 mt-6 first:mt-0"
        {...headingProps}
      >
        {headingProps.children}
      </h3>
    ),
    h4: (headingProps: any) => (
      <h4 class="text-xl font-medium  mb-2 mt-4 first:mt-0" {...headingProps}>
        {headingProps.children}
      </h4>
    ),

    // Paragraphs
    p: (pProps: any) => (
      <p class=" leading-7 mb-4" {...pProps}>
        {pProps.children}
      </p>
    ),

    // Links
    a: (linkProps: any) => (
      <a
        class="text-primary hover:text-primary/80 underline font-medium transition-colors"
        {...linkProps}
      >
        {linkProps.children}
      </a>
    ),

    // Lists
    ul: (listProps: any) => (
      <ul class="list-disc list-inside mb-4 space-y-2 " {...listProps}>
        {listProps.children}
      </ul>
    ),
    ol: (listProps: any) => (
      <ol class="list-decimal list-inside mb-4 space-y-2 " {...listProps}>
        {listProps.children}
      </ol>
    ),
    li: (itemProps: any) => (
      <li class="leading-7" {...itemProps}>
        {itemProps.children}
      </li>
    ),

    // Blockquotes
    blockquote: (quoteProps: any) => (
      <blockquote
        class="border-l-4 border-primary pl-4 py-2 my-4 italic text-base-content/70 bg-base-100"
        {...quoteProps}
      >
        {quoteProps.children}
      </blockquote>
    ),

    // Tables
    table: (tableProps: any) => (
      <div class="overflow-x-auto mb-4">
        <table
          class="min-w-full border-collapse border border-base-300"
          {...tableProps}
        >
          {tableProps.children}
        </table>
      </div>
    ),
    th: (thProps: any) => (
      <th
        class="border border-base-300 bg-base-200 px-4 py-2 text-left font-semibold "
        {...thProps}
      >
        {thProps.children}
      </th>
    ),
    td: (tdProps: any) => (
      <td class="border border-base-300 px-4 py-2 " {...tdProps}>
        {tdProps.children}
      </td>
    ),

    // Custom components
    Callout: Callout,
    CodeBlock: CodeBlock,

    // Horizontal rule
    hr: () => <hr class="my-8 border-base-300" />,

    // Strong and emphasis
    strong: (strongProps: any) => (
      <strong class="font-semibold " {...strongProps}>
        {strongProps.children}
      </strong>
    ),
    em: (emProps: any) => (
      <em class="italic " {...emProps}>
        {emProps.children}
      </em>
    ),
  };

  // Merge default components with custom ones
  const components = () => ({
    ...defaultComponents,
    ...props.components,
  });

  // Simple markdown-to-JSX renderer
  // In a real implementation, you would use a proper MDX processor
  const renderContent = () => {
    // For now, render as HTML with proper styling
    // In a production app, you'd use @mdx-js/solid or similar
    return (
      <div
        class={`mdx-content ${props.className || ""}`}
        innerHTML={props.content}
      />
    );
  };

  return renderContent();
};

export default MDXRenderer;
