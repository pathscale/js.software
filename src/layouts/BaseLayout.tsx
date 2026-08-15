import { ParentComponent, Component } from "solid-js";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Footer } from "../components/Footer";

export interface BaseLayoutProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  class?: string;
}

/**
 * The page is the page.
 *
 * This wrapped every route in `NoiseBackground` with an animated three-colour
 * gradient, which put a 4px rainbow strip across the top of the document and a
 * moving wash behind everything. The strip sat under the glass nav, so the
 * chrome picked it up and the top of the site read as a colour bar rather than
 * as glass over a dark page.
 */
export const BaseLayout: ParentComponent<BaseLayoutProps> = (props) => {
  return (
    <div class="min-h-screen">
      <LayoutGrid
        header={props.header}
        sidebar={props.sidebar}
        toc={props.toc}
        footer={Footer}
        class={props.class}
      >
        {props.children}
      </LayoutGrid>
    </div>
  );
};

export default BaseLayout;
