import { Icon, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

const props = [
  {
    name: "name",
    type: "string",
    required: true,
    description: "The icon name from the Iconify set, e.g. icon-[mdi--home].",
  },
  {
    name: "width",
    type: "number",
    default: "24",
    description: "Width in pixels.",
  },
  {
    name: "height",
    type: "number",
    default: "24",
    description: "Height in pixels.",
  },
  {
    name: "data-theme",
    type: "string",
    description: "Optional theme for the icon (e.g. light or dark).",
  },
  {
    name: "class / className",
    type: "string",
    description: "Optional Tailwind or custom class names.",
  },
];

export default function IconShowcase() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="default" title="Default Icon">
        <Flex direction="col" gap="md">
          <Flex gap="md">
            <Icon name="icon-[mdi-light--home]" />
          </Flex>
          <CodeBlock code={`<Icon name="icon-[mdi-light--home]" />`} />
        </Flex>
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
