import { Flex, ProgressCircle } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ProgressCircleShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="progress-circle" title="Progress Circle">
        <Flex gap="lg" align="center" wrap="wrap">
          <ProgressCircle value={24} />
          <ProgressCircle value={58} />
          <ProgressCircle value={86} />
        </Flex>
        <CodeBlock code={`<ProgressCircle value={58} />`} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
