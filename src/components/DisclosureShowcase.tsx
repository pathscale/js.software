import { Disclosure, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function DisclosureShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="disclosure" title="Disclosure">
        <Flex direction="col" gap="md">
          <Disclosure>
            <Disclosure.Trigger>What does Solid Layouts compile?</Disclosure.Trigger>
            <Disclosure.Content>
              It combines the published component recipe with the semantic parameters at this
              call site before the normal SolidJS compilation runs.
            </Disclosure.Content>
          </Disclosure>
          <CodeBlock
            code={`<Disclosure>
  <Disclosure.Trigger>Show details</Disclosure.Trigger>
  <Disclosure.Content>Details</Disclosure.Content>
</Disclosure>`}
          />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
