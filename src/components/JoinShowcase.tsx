import { Button } from "@pathscale/ui";
import { Join } from "@pathscale/ui/lab";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function JoinShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="join" title="Join">
        <Join>
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Current</Button>
          <Button variant="outline">Next</Button>
        </Join>
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
