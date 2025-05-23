import type { JSX, ParentComponent } from "solid-js";
import { CopyButton } from "./CopyButton";

interface ShowcaseSectionProps {
  id: string;
  title: string;
  class?: string;
}

export const ShowcaseSection: ParentComponent<ShowcaseSectionProps> = (
  props
) => {
  const getSectionUrl = () => {
    const url = new URL(window.location.href);
    url.hash = props.id;
    return url.toString();
  };

  return (
    <div
      id={props.id}
      class={`p-3 bg-[hsl(var(--color-bg-secondary, var(--color-bg-body))/1)] rounded-lg shadow-sm scroll-mt-6 ${
        props.class ?? ""
      }`}
    >
      <div class="flex items-center justify-between gap-2 mb-2">
        <h2 class="text-xl font-semibold group/title">
          <a
            href={`#${props.id}`}
            class="text-inherit hover:text-[hsl(var(--color-fg-secondary))/1] flex items-center gap-2"
          >
            {props.title}
            <span class="opacity-0 group-hover/title:opacity-100 text-[hsl(var(--color-fg-tertiary))/1] transition-opacity">
              #
            </span>
          </a>
        </h2>
        <CopyButton
          text={getSectionUrl()}
          title="Copy link to section"
          class="opacity-0 group-hover:opacity-100 focus:opacity-100"
        />
      </div>
      <div class="space-y-3">{props.children}</div>
    </div>
  );
};
