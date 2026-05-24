// TODO[ui-1.2.2]: ConfirmDialog is no longer exported from @pathscale/ui (component removed)
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ConfirmDialogShowcase() {
  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="removed" title="Removed in ui 1.2.2">
          <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
            The ConfirmDialog component was removed from @pathscale/ui in 1.2.2. Compose a Modal
            with two Button actions instead.
          </p>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
