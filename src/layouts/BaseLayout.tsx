import { ParentComponent, Component } from "solid-js";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Footer } from "../components/Footer";

export interface BaseLayoutProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  className?: string;
}

export const BaseLayout: ParentComponent<BaseLayoutProps> = (props) => {
  return (
    <LayoutGrid
      header={props.header}
      sidebar={props.sidebar}
      toc={props.toc}
      footer={Footer}
      className={props.className}
    >
      {props.children}
    </LayoutGrid>
  );
};

export default BaseLayout;
