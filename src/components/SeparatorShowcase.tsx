import { Flex, Separator } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SeparatorShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="separator" title="Separator">
        <Flex direction="col" gap="md">
          <p>Content above</p>
          <Separator />
          <p>Content below</p>
          <CodeBlock code={`<Separator />`} />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
