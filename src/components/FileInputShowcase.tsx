import { Flex, Input, Label } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function FileInputShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="file-input" title="File Input">
        <Flex direction="col" gap="sm">
          <Label for="attachment">Attachment</Label>
          <Input id="attachment" type="file" />
          <CodeBlock code={`<Label for="attachment">Attachment</Label>
<Input id="attachment" type="file" />`} />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
