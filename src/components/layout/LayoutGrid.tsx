import { Dynamic } from "@solidjs/web";
import { Component, createSignal, onCleanup, onSettled } from "solid-js";

export const [isNavbarExpanded, setIsNavbarExpanded] = createSignal(false);

interface LayoutGridProps {
  header?: Component;
  sidebar?: Component;
  toc?: Component;
  footer?: Component;
  children: any;
  class?: string;
}

export const LayoutGrid: Component<LayoutGridProps> = (props) => {
  const [isDesktop, setIsDesktop] = createSignal(window.innerWidth >= 768);
  const [isXl, setIsXl] = createSignal(window.innerWidth >= 1280);

  // Nothing reactive here -- this only wires a listener once, which is what
  // onSettled is for. It was never an effect.
  onSettled(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      setIsXl(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const hasAnySidebar = () => props.sidebar || props.toc;

  return (
    <div class="min-h-screen">
      <div class="fixed top-0 left-0 right-0 z-50">
        {props.header && <Dynamic component={props.header} />}
      </div>

      <div class={isNavbarExpanded() ? "pt-32" : "pt-16"}>
        <div class={hasAnySidebar() ? "container mx-auto" : "w-full"}>
          <div class="relative flex">
            {(isDesktop() || isXl()) && props.sidebar && (
              <div class={`w-[280px] fixed ${isNavbarExpanded() ? "top-32" : "top-16"} bottom-0`}>
                <div class="h-full overflow-auto py-6">
                  <Dynamic component={props.sidebar} />
                </div>
              </div>
            )}

            <div
              class={`flex-1 min-w-0 ${
                hasAnySidebar() && (isDesktop() || isXl()) ? "ml-[280px]" : ""
              } ${hasAnySidebar() && isXl() ? "mr-[280px]" : ""}`}
            >
              {props.children}
            </div>

            {isXl() && props.toc && (
              <div class={`w-[280px] fixed ${isNavbarExpanded() ? "top-32" : "top-16"} bottom-0 right-0`}>
                <div class="h-full overflow-auto py-6">
                  <Dynamic component={props.toc} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {props.footer && (
        <div class={`${hasAnySidebar() ? "container mx-auto" : "w-full"}`}>
          <div
            class={`${
              hasAnySidebar() && (isDesktop() || isXl()) ? "ml-[280px]" : ""
            } ${hasAnySidebar() && isXl() ? "mr-[280px]" : ""}`}
          >
            <Dynamic component={props.footer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutGrid;
