import { Button } from "@pathscale/ui";
import { Join } from "@pathscale/ui/lab";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal } from "solid-js";
import { ActionStatus, createActionStatus } from "./showcase/ActionStatus";

export default function JoinShowcase() {
  const [page, setPage] = createSignal(2);
  const actions = createActionStatus();
  const choose = (next: number) => {
    setPage(next);
    actions.announce(`Page ${next} selected`);
  };
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="join" title="Join">
        <Join>
          <Button variant="outline" onClick={() => choose(Math.max(1, page() - 1))}>Previous</Button>
          <Button variant="outline" aria-label="Current" aria-pressed="true" onClick={() => choose(page())}>Current {page()}</Button>
          <Button variant="outline" onClick={() => choose(page() + 1)}>Next</Button>
        </Join>
        <ActionStatus message={actions.message()} />
        <CodeBlock
          code={`<Join>
  <Button variant="outline">Previous</Button>
  <Button variant="outline">Current</Button>
  <Button variant="outline">Next</Button>
</Join>`}
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
