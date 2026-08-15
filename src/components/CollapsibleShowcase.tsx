import { Collapsible, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function CollapsibleShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="collapsible" title="Collapsible">
        <Flex direction="col" gap="md">
          <Collapsible>
            <Collapsible.Trigger>What does Solid Layouts compile?</Collapsible.Trigger>
            <Collapsible.Content>
              It combines the published component recipe with the semantic parameters at this
              call site before the normal SolidJS compilation runs.
            </Collapsible.Content>
          </Collapsible>
          <CodeBlock
            code={`<Collapsible>
  <Collapsible.Trigger>Show details</Collapsible.Trigger>
  <Collapsible.Content>Details</Collapsible.Content>
</Collapsible>`}
          />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
