import { Calendar, Flex } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CalendarShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "as-input", title: "As Input" },
    { id: "sizes", title: "Sizes" },
    { id: "controlled", title: "Controlled Value" },
    { id: "disabled", title: "Disabled" },
    { id: "custom-content", title: "Custom Content" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "value",
      type: "string",
      description: "Initial calendar value in ISO format (`yyyy-mm-dd`).",
    },
    {
      name: "onDateSelect",
      type: "(value: string) => void",
      description: "Callback triggered when a date is selected.",
    },
    {
      name: "asInput",
      type: "boolean",
      default: "false",
      description: "If true, the calendar behaves like a dropdown input.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Text to display when no date is selected.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables calendar interaction if true.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      default: "md",
      description: "Controls calendar sizing — font, spacing, and width.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme name applied to the calendar (`data-theme`).",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the calendar.",
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
            <Calendar />
            <CodeBlock code={`<Calendar />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="as-input" title="As Input">
          <Flex direction="col" gap="md">
            <Calendar
              asInput
              placeholder="Select a date"
              onDateSelect={(value) => console.log("Selected date:", value)}
            />
            <CodeBlock
              code={`<Calendar
  asInput
  placeholder="Select a date"
  onDateSelect={(value) => console.log("Selected date:", value)}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex direction="col" gap="md">
              <Calendar asInput size="xs" placeholder="XS" />
              <Calendar asInput size="sm" placeholder="SM" />
              <Calendar asInput size="md" placeholder="MD" />
              <Calendar asInput size="lg" placeholder="LG" />
            </Flex>
            <CodeBlock
              code={`<Calendar asInput size="xs" placeholder="XS" />
<Calendar asInput size="sm" placeholder="SM" />
<Calendar asInput size="md" placeholder="MD" />
<Calendar asInput size="lg" placeholder="LG" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled Value">
          <Flex direction="col" gap="md">
            <Calendar
              asInput
              value="2025-06-15"
              onDateSelect={(val) => console.log("Controlled:", val)}
            />
            <CodeBlock
              code={`<Calendar
  asInput
  value="2025-06-15"
  onDateSelect={(val) => console.log("Controlled:", val)}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Calendar asInput placeholder="Disabled input" disabled />
            <Calendar disabled />
            <CodeBlock
              code={`<Calendar asInput placeholder="Disabled input" disabled />
<Calendar disabled />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-content" title="Custom Content">
          <Flex direction="col" gap="md">
            <Calendar asInput placeholder="Select a date">
              <div class="mt-2 text-sm text-center text-base-content/60">
                You can add custom content here.
              </div>
            </Calendar>
            <CodeBlock
              code={`<Calendar asInput placeholder="Select a date">
  <div class="mt-2 text-sm text-center text-base-content/60">
    You can add custom content here.
  </div>
</Calendar>`}
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
