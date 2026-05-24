// TODO[ui-1.2.2]: Indicator is no longer exported from @pathscale/ui (component removed)
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function IndicatorShowcase() {
  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="removed" title="Removed in ui 1.2.2">
          <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
            The Indicator component was removed from @pathscale/ui in 1.2.2. Use a relatively
            positioned wrapper with an absolutely positioned Badge or Chip.
          </p>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
