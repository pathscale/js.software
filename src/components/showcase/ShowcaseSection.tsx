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
    <section id={props.id} class={props.class}>
      <h2 class="text-2xl font-semibold mb-4">{props.title}</h2>
      <div class="space-y-4">{props.children}</div>
    </section>
  );
};
