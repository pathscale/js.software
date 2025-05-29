import { ShowcaseSection as UIShowcaseSection } from "@pathscale/ui";
import type { ParentComponent } from "solid-js";

interface ShowcaseSectionProps {
  id: string;
  title: string;
  class?: string;
}

export const ShowcaseSection: ParentComponent<ShowcaseSectionProps> = (
  props
) => {
  return (
    <UIShowcaseSection
      id={props.id}
      title={props.title}
      class={props.class}
    >
      {props.children}
    </UIShowcaseSection>
  );
};
