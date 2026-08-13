import { createSignal } from "solid-js";
import { Flex, Slider } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SliderShowcase() {
  const [value, setValue] = createSignal(42);

  return (
    <ShowcaseLayout>
      <ShowcaseSection id="slider" title="Slider">
        <Flex direction="col" gap="lg">
          <Slider label="Volume" value={value()} onChange={setValue} />
          <p>Current value: {value()}</p>
          <CodeBlock
            code={`const [value, setValue] = createSignal(42);

<Slider label="Volume" value={value()} onChange={setValue} />`}
          />
        </Flex>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
