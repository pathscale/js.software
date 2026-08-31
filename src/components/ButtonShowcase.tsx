import { Button, Flex, Icon } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const buttonProps = [
  { name: "variant", type: '"primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft"', default: '"primary"', description: "Semantic visual treatment." },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control size." },
  { name: "width", type: 'Width | "square"', default: "—", description: "square is icon-only: as wide as it is tall, at whatever size it is." },
  { name: "variant", type: "Variant", default: '"solid"', description: "Shape: solid, soft, outline, ghost, plain. Not a colour." },
  { name: "state", type: "State", default: '"default"', description: "What is happening: loading, disabled, invalid. Spinner implies disabled." },
  { name: "isPending", type: "boolean", default: "false", description: "Show pending state and block interaction." },
  { name: "startIcon", type: "JSX.Element", description: "Icon before the label." },
  { name: "endIcon", type: "JSX.Element", description: "Icon after the label." },
];

export default function ButtonShowcase() {
  const startIcon = <Icon src="mdi--arrow-left" width={18} height={18} />;
  const endIcon = <Icon src="mdi--arrow-right" width={18} height={18} />;

  return (
    <ShowcaseLayout>
      <Flex direction="col" gap="xl">
        <ShowcaseSection id="variants" title="Variants">
          <Flex gap="md" wrap="wrap">
            <Button flavor="primary">Primary</Button>
            <Button flavor="secondary">Secondary</Button>
            <Button flavor="tertiary">Tertiary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button flavor="destructive">Danger</Button>
            <Button flavor="destructive" variant="soft">Danger soft</Button>
          </Flex>
          <CodeBlock code={`<Button flavor="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button flavor="destructive" variant="soft">Delete</Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex gap="md" align="center" wrap="wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Flex>
          <CodeBlock code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="Icons">
          <Flex gap="md" align="center" wrap="wrap">
            <Button variant="outline" startIcon={startIcon}>Previous</Button>
            <Button flavor="primary" endIcon={endIcon}>Continue</Button>
            <Button variant="ghost" width="square" aria-label="Settings">
              <Icon src="mdi--cog" width={20} height={20} />
            </Button>
          </Flex>
          <CodeBlock code={`<Button startIcon={<Icon src="mdi--arrow-left" />}>Previous</Button>
<Button endIcon={<Icon src="mdi--arrow-right" />}>Continue</Button>
<Button width="square" aria-label="Settings"><Icon src="mdi--cog" /></Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <Flex gap="md" align="center" wrap="wrap">
            <Button state="loading">Saving</Button>
            <Button state="disabled">Unavailable</Button>
            <Button variant="outline" aria-pressed="true">Pressed</Button>
          </Flex>
          <CodeBlock code={`<Button state="loading">Saving</Button>
<Button state="disabled">Unavailable</Button>
<Button variant="outline" aria-pressed={selected() ? "true" : "false"}>Selected</Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="width" title="Full width">
          <Button width="full" flavor="primary">Continue</Button>
          <CodeBlock code={`<Button width="full" flavor="primary">Continue</Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="native-link" title="Navigation styled as an action">
          <p class="mb-4 text-base-content/70">
            Button deliberately renders a button. Use a native anchor or the Link component for
            navigation so browser and accessibility semantics remain correct.
          </p>
          <Button href="/docs/layouts" flavor="primary">Read about Solid Layouts</Button>
          <CodeBlock code={`<Button href="/docs/layouts" flavor="primary">Read about Solid Layouts</Button>`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={buttonProps} />
        </ShowcaseSection>
      </Flex>
    </ShowcaseLayout>
  );
}
