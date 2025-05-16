import { Accordion } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function AccordionShowcase() {
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
      <ShowcaseSection id="basic" title="Basic Expandable Accordion">
        <Accordion
          headerIsTrigger={true}
          header={
            <div class="px-3 py-2 font-medium text-red-600">Click me</div>
          }
          content={<div class="px-3 py-2">This accordion can be toggled.</div>}
        />
        <CodeBlock
          code={`<Accordion
  headerIsTrigger
  header={<div class="px-3 py-2 font-medium text-red-600">Click me</div>}
  content={<div class="px-3 py-2">This accordion can be toggled.</div>}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="expanded" title="Expanded by Default">
        <Accordion
          expanded
          headerIsTrigger
          header={
            <div class="px-3 py-2 font-medium text-blue-600">
              Expanded by default
            </div>
          }
          content={<div class="px-3 py-2">This one starts open.</div>}
        />
        <CodeBlock
          code={`<Accordion
  expanded
  headerIsTrigger
  header={<div class="px-3 py-2 font-medium text-blue-600">Expanded by default</div>}
  content={<div class="px-3 py-2">This one starts open.</div>}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="disabled" title="Disabled Accordion">
        <Accordion
          disabled
          headerIsTrigger
          header={<div class="px-3 py-2 text-gray-500">Disabled Accordion</div>}
          content={<div class="px-3 py-2">You can't open or close this.</div>}
        />
        <CodeBlock
          code={`<Accordion
  disabled
  headerIsTrigger
  header={<div class="px-3 py-2 text-gray-500">Disabled Accordion</div>}
  content={<div class="px-3 py-2">You can't open or close this.</div>}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="static" title="Static Header (non-trigger)">
        <Accordion
          headerIsTrigger={false}
          expanded
          header={<div class="px-3 py-2 font-semibold">Not interactive</div>}
          content={
            <div class="px-3 py-2">
              Only shown if expanded programmatically.
            </div>
          }
        />
        <CodeBlock
          code={`<Accordion
  headerIsTrigger={false}
  expanded
  header={<div class="px-3 py-2 font-semibold">Not interactive</div>}
  content={<div class="px-3 py-2">Only shown if expanded programmatically.</div>}
/>`}
        />
      </ShowcaseSection>

      <ShowcaseSection id="props" title="Props">
        <PropsTable props={props} />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
