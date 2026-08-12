import { Checkbox, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CheckboxShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "indeterminate", title: "Indeterminate" },
    { id: "form-control", title: "Form Control" },
    { id: "variants", title: "Variants" },
    { id: "disabled", title: "Disabled States" },
  ] as const;

  const props = [
    {
      name: "checked",
      type: "boolean",
      description: "Controls the checked state",
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description: "Shows an indeterminate state",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the checkbox",
    },
    {
      name: "variant",
      type: '"primary" | "secondary"',
      default: '"primary"',
      description: "Visual variant of the checkbox",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Checkbox />
            </Flex>
            <CodeBlock code={`<Checkbox />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="indeterminate" title="Indeterminate">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Checkbox indeterminate />
            </Flex>
            <CodeBlock code={`<Checkbox indeterminate />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="form-control" title="Form Control">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <Checkbox />
                  <span class="label-text">Remember me</span>
                </label>
              </div>
            </Flex>

            <CodeBlock
              code={`<div class="shadow bg-base-200 w-64 rounded-lg p-4">
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Remember me</span>
      <Checkbox />
    </label>
  </div>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <Checkbox checked variant="primary" />
              <Checkbox checked variant="secondary" />
            </Flex>
            <CodeBlock
              code={`<div class="flex flex-row items-center gap-2">
  <Checkbox checked variant="primary" />
  <Checkbox checked variant="secondary" />
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled States">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <div>
                <h3 class="text-sm mb-2">Disabled</h3>
                <Checkbox disabled />
              </div>
              <div>
                <h3 class="text-sm mb-2">Disabled Checked</h3>
                <Checkbox checked disabled />
              </div>
            </Flex>
            <CodeBlock
              code={`<Checkbox disabled />
<Checkbox checked disabled />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
