// TODO[ui-1.2.2]: Sidenav family (Sidenav, SidenavMenu, SidenavItem, SidenavGroup, SidenavLink) is no longer exported from @pathscale/ui (component removed)
import type { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const SidenavShowcase: Component = () => {
  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="removed" title="Removed in ui 1.2.2">
          <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
            The Sidenav family was removed from @pathscale/ui in 1.2.2. Build a sidebar using
            Navbar primitives or a custom List + Link composition.
          </p>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default SidenavShowcase;
