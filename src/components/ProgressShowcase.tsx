import { Flex, Progress } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ProgressShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="progress-bar" title="Progress">
        <Flex direction="col" gap="lg">
          <Progress value={24} />
          <Progress value={58} />
          <Progress value={86} />
          <CodeBlock code={`<Progress value={58} />`} />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
