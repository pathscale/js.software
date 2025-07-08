import { ParentComponent, Component } from "solid-js";
import { BaseLayout } from "./BaseLayout";

export interface ShowcaseLayoutProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  className?: string;
}

export const ShowcaseLayout: ParentComponent<ShowcaseLayoutProps> = (props) => {
  return (
    <BaseLayout
      header={props.header}
      sidebar={props.sidebar}
      toc={props.toc}
      className={`showcase-layout ${props.className || ""}`}
    >
      <div class="w-full px-6">
        <div class="max-w-7xl mx-auto">{props.children}</div>
      </div>
    </BaseLayout>
  );
};

export default ShowcaseLayout;
