import { Flex } from "@pathscale/ui";
import { RadialProgress } from "@pathscale/ui/lab";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ProgressCircleShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="progress-circle" title="Progress Circle">
        <Flex gap="lg" align="center" wrap="wrap">
          <RadialProgress value={24} />
          <RadialProgress value={58} />
          <RadialProgress value={86} />
        </Flex>
        <CodeBlock code={`<RadialProgress value={58} />`} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
