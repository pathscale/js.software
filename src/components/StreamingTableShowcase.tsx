import { Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

// TODO[ui-1.2.2]: StreamingTable and StreamingColumnDef were removed from @pathscale/ui in 1.2.2.
// This showcase is stubbed until a replacement API ships.
export default function StreamingTableShowcase() {
  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="removed" title="StreamingTable">
          <Flex direction="col" gap="md">
            <p class="text-sm">
              Component removed in @pathscale/ui 1.2.2. Showcase pending replacement API.
            </p>
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
