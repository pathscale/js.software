import { Button, Fieldset } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function FormActionsShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="form-actions" title="Fieldset Actions">
        <Fieldset>
          <Fieldset.Legend>Profile</Fieldset.Legend>
          <Fieldset.Actions>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save changes</Button>
          </Fieldset.Actions>
        </Fieldset>
        <CodeBlock
          code={`<Fieldset>
  <Fieldset.Legend>Profile</Fieldset.Legend>
  <Fieldset.Actions>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save changes</Button>
  </Fieldset.Actions>
</Fieldset>`}
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
