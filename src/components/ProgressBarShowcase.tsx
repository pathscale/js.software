import { Flex, ProgressBar } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ProgressBarShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="progress-bar" title="Progress Bar">
        <Flex direction="col" gap="lg">
          <ProgressBar value={24} />
          <ProgressBar value={58} />
          <ProgressBar value={86} />
          <CodeBlock code={`<ProgressBar value={58} />`} />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
