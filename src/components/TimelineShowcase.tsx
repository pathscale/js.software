// TODO[ui-1.2.2]: Timeline (and Item/Start/Middle/End) is no longer exported from @pathscale/ui (component removed)
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TimelineShowcase() {
  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="removed" title="Removed in ui 1.2.2">
          <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
            The Timeline component family was removed from @pathscale/ui in 1.2.2. Compose a
            timeline manually with a List and CSS pseudo-element rails.
          </p>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
