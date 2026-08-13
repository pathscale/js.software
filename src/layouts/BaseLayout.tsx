import { ParentComponent, Component } from "solid-js";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Footer } from "../components/Footer";
import { NoiseBackground } from "@pathscale/ui";

export interface BaseLayoutProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  className?: string;
}

export const BaseLayout: ParentComponent<BaseLayoutProps> = (props) => {
  return (
    <NoiseBackground
      gradientColors={["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"]}
      noiseIntensity={0.08}
      speed={0.04}
      borderRadius="0"
      containerClass="min-h-screen"
    >
      <LayoutGrid
        header={props.header}
        sidebar={props.sidebar}
        toc={props.toc}
        footer={Footer}
        className={props.className}
      >
        {props.children}
      </LayoutGrid>
    </NoiseBackground>
  );
};

export default BaseLayout;
