import { Button, Fieldset } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { ActionStatus, createActionStatus } from "./showcase/ActionStatus";

export default function FormActionsShowcase() {
  const actions = createActionStatus();
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="form-actions" title="Fieldset Actions">
        <Fieldset>
          <Fieldset.Legend>Profile</Fieldset.Legend>
          <Fieldset.Actions>
            <Button variant="ghost" onClick={actions.handler("Profile changes cancelled")}>Cancel</Button>
            <Button flavor="primary" onClick={actions.handler("Profile changes saved")}>Save changes</Button>
          </Fieldset.Actions>
        </Fieldset>
        <ActionStatus message={actions.message()} />
        <CodeBlock
          code={`<Fieldset>
  <Fieldset.Legend>Profile</Fieldset.Legend>
  <Fieldset.Actions>
    <Button variant="ghost">Cancel</Button>
    <Button flavor="primary">Save changes</Button>
  </Fieldset.Actions>
</Fieldset>`}
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
