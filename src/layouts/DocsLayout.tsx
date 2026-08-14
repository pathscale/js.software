import { ParentComponent, Component } from "solid-js";
import { BaseLayout } from "./BaseLayout";

export interface DocsLayoutProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  class?: string;
}

export const DocsLayout: ParentComponent<DocsLayoutProps> = (props) => {
  return (
    <BaseLayout
      header={props.header}
      sidebar={props.sidebar}
      toc={props.toc}
      class={`docs-layout ${props.class || ""}`}
    >
      <div class="page-container">
        <article class="prose prose-lg max-w-none">{props.children}</article>
      </div>
    </BaseLayout>
  );
};

export default DocsLayout;
