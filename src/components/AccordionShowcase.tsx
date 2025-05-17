import { Accordion } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function AccordionShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "basic", title: "Basic Usage" },
    { id: "variants", title: "Variants" },
    { id: "states", title: "States" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description: "Whether the accordion starts expanded",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the accordion interaction",
    },
    {
      name: "headerIsTrigger",
      type: "boolean",
      default: "true",
      description:
        "If true, clicking the header or pressing Enter/Space toggles the accordion",
    },
    {
      name: "header",
      type: "JSX.Element",
      required: true,
      description: "Content shown in the accordion header",
    },
    {
      name: "content",
      type: "JSX.Element",
      required: true,
      description: "Content shown inside the expanded accordion",
    },
    {
      name: "class",
      type: "string",
      description: "Custom class names for the root element",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="basic" title="Basic Usage">
          <div class="space-y-4">
            <Accordion
              headerIsTrigger
              header={<div class="px-3 py-2 font-medium">Basic Accordion</div>}
              content={
                <div class="px-3 py-2">
                  This is a basic accordion that can be toggled by clicking the
                  header.
                </div>
              }
            />
          </div>
          <CodeBlock
            code={`<Accordion
  headerIsTrigger
  header={<div class="px-3 py-2 font-medium">Basic Accordion</div>}
  content={<div class="px-3 py-2">
    This is a basic accordion that can be toggled by clicking the header.
  </div>}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="space-y-4">
            <Accordion
              expanded
              headerIsTrigger
              header={
                <div class="px-3 py-2 font-medium text-blue-600">
                  Expanded by default
                </div>
              }
              content={
                <div class="px-3 py-2">
                  This accordion starts in an expanded state.
                </div>
              }
            />

            <Accordion
              headerIsTrigger={false}
              header={
                <div class="px-3 py-2 font-medium text-gray-600">
                  Non-interactive header
                </div>
              }
              content={
                <div class="px-3 py-2">
                  This accordion's header is not clickable.
                </div>
              }
            />

            <Accordion
              headerIsTrigger
              header={
                <div class="px-3 py-2 font-medium text-green-600">
                  Custom styled header
                </div>
              }
              content={
                <div class="px-3 py-2 bg-green-50">
                  Content with custom background.
                </div>
              }
            />
          </div>
          <CodeBlock
            code={`// Expanded by default
<Accordion
  expanded
  headerIsTrigger
  header={<div class="px-3 py-2 font-medium text-blue-600">Expanded by default</div>}
  content={<div class="px-3 py-2">This accordion starts in an expanded state.</div>}
/>

// Non-interactive header
<Accordion
  headerIsTrigger={false}
  header={<div class="px-3 py-2 font-medium text-gray-600">Non-interactive header</div>}
  content={<div class="px-3 py-2">This accordion's header is not clickable.</div>}
/>

// Custom styled
<Accordion
  headerIsTrigger
  header={<div class="px-3 py-2 font-medium text-green-600">Custom styled header</div>}
  content={<div class="px-3 py-2 bg-green-50">Content with custom background.</div>}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="states" title="States">
          <div class="space-y-4">
            <Accordion
              disabled
              headerIsTrigger
              header={<div class="px-3 py-2 text-gray-500">Disabled State</div>}
              content={
                <div class="px-3 py-2">
                  This accordion cannot be interacted with.
                </div>
              }
            />
          </div>
          <CodeBlock
            code={`<Accordion
  disabled
  headerIsTrigger
  header={<div class="px-3 py-2 text-gray-500">Disabled State</div>}
  content={<div class="px-3 py-2">This accordion cannot be interacted with.</div>}
/>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
