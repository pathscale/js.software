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
      <h2 class="text-2xl font-semibold mb-1">{props.title}</h2>
      <div class="accent-rule h-px w-24 mb-4" aria-hidden="true" />
      <div class="space-y-4">{props.children}</div>
    </section>
  );
};
