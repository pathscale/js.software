import { Button, Empty } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function EmptyStateShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="empty-state" title="Empty State">
        <Empty>
          <Empty.Title>No projects yet</Empty.Title>
          <Empty.Description>Create a project to start building.</Empty.Description>
          <Empty.Actions>
            <Button flavor="primary">Create project</Button>
          </Empty.Actions>
        </Empty>
        <CodeBlock
          code={`<Empty>
  <Empty.Title>No projects yet</Empty.Title>
  <Empty.Description>Create a project to start building.</Empty.Description>
  <Empty.Actions><Button flavor="primary">Create project</Button></Empty.Actions>
</Empty>`}
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
