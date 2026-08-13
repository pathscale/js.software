import { Button, EmptyState } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function EmptyStateShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="empty-state" title="Empty State">
        <EmptyState>
          <EmptyState.Title>No projects yet</EmptyState.Title>
          <EmptyState.Description>Create a project to start building.</EmptyState.Description>
          <EmptyState.Actions>
            <Button variant="primary">Create project</Button>
          </EmptyState.Actions>
        </EmptyState>
        <CodeBlock
          code={`<EmptyState>
  <EmptyState.Title>No projects yet</EmptyState.Title>
  <EmptyState.Description>Create a project to start building.</EmptyState.Description>
  <EmptyState.Actions><Button variant="primary">Create project</Button></EmptyState.Actions>
</EmptyState>`}
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
