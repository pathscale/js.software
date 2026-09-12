import { AuthPoweredBy, Flex, Icon, Link } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const sections = [
  { id: "default", title: "Default Honey attribution" },
  { id: "variants", title: "Variants" },
  { id: "alignment", title: "Alignment" },
  { id: "custom", title: "Custom content" },
  { id: "props", title: "Props" },
] as const;

const props = [
  {
    name: "label",
    type: "string",
    default: '"Secure Auth by Honey"',
    description: "Accessible attribution text shown beside the provider mark.",
  },
  {
    name: "href",
    type: "string",
    default: '"https://honey.id/"',
    description: "Provider destination opened in a separate browser tab.",
  },
  {
    name: "variant",
    type: '"subtle" | "card" | "inline"',
    default: '"subtle"',
    description: "Visual treatment for the attribution.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description: "Horizontal placement inside the component root.",
  },
  {
    name: "logo",
    type: "JSX.Element",
    description: "Optional provider mark rendered before the label.",
  },
  {
    name: "id",
    type: "string",
    description: "Stable root identity; the link receives an --link suffix.",
  },
];

export default function AuthPoweredByShowcase() {
  return (
    <ShowcaseLayout>
      <Flex direction="col" gap="lg">
        <ShowcaseSection id="contents" title="Contents">
          <Flex as="nav" direction="col" gap="sm">
            {sections.map((section) => (
              <Link href={`#${section.id}`} underline="hover">
                {section.title}
              </Link>
            ))}
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default Honey attribution">
          <Flex direction="col" gap="md">
            <AuthPoweredBy id="honey-default" />
            <CodeBlock code={`<AuthPoweredBy />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <AuthPoweredBy
              id="honey-subtle"
              href="#honey-subtle"
              label="Honey subtle attribution"
              variant="subtle"
            />
            <AuthPoweredBy
              id="honey-card"
              href="#honey-card"
              label="Honey card attribution"
              variant="card"
            />
            <AuthPoweredBy
              id="honey-inline"
              href="#honey-inline"
              label="Honey inline attribution"
              variant="inline"
            />
            <CodeBlock
              code={`<AuthPoweredBy variant="subtle" />
<AuthPoweredBy variant="card" />
<AuthPoweredBy variant="inline" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="alignment" title="Alignment">
          <Flex direction="col" gap="md">
            <AuthPoweredBy
              id="honey-left"
              href="#honey-left"
              label="Honey attribution aligned left"
              align="left"
              variant="card"
            />
            <AuthPoweredBy
              id="honey-center"
              href="#honey-center"
              label="Honey attribution aligned center"
              align="center"
              variant="card"
            />
            <AuthPoweredBy
              id="honey-right"
              href="#honey-right"
              label="Honey attribution aligned right"
              align="right"
              variant="card"
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom" title="Custom content">
          <Flex direction="col" gap="md">
            <AuthPoweredBy
              id="honey-custom"
              href="#honey-custom"
              label="Identity secured by Honey"
              variant="card"
              logo={<Icon src="icon-[lucide--shield-check]" width={18} height={18} />}
            />
            <CodeBlock
              code={`<AuthPoweredBy
  label="Identity secured by Honey"
  logo={<Icon src="icon-[lucide--shield-check]" />}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </Flex>
    </ShowcaseLayout>
  );
}
