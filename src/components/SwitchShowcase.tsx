import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Flex, Switch } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SwitchShowcase() {
  const [notify, setNotify] = createSignal(false);

  const sections = [
    { id: "default", title: "Default" },
    { id: "controlled", title: "Controlled" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "disabled", title: "Disabled" },
    { id: "props", title: "Props" },
  ] as const;

  const toggleProps = [
    {
      name: "flavor",
      type: `Flavor`,
      default: '"default"',
      description: "What the thing is. Open: your own name yields a class you can style.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the toggle",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Whether the toggle is checked",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the toggle is disabled",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description:
        "Reports the new checked state. It is the value, not the event: every control in the library reports its own value under this name.",
    },
    {
      name: "onNativeChange",
      type: "JSX.EventHandlerUnion<HTMLInputElement, Event>",
      description:
        "The underlying input event, and still where preventDefault() belongs. Vetoing here also suppresses onChange.",
    },
    {
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
    },
    {
      name: "ref",
      type: "Ref<HTMLInputElement>",
      description: "Forward ref to the input element",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: `string`,
      description: "Extra classes, merged into the root. There is no className.",
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
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Switch />
              <Switch checked />
            </Flex>
            <CodeBlock
              code={`<Switch />
<Switch checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="start" gap="lg">
              <Switch checked={notify()} onChange={setNotify} />
              <span class="text-sm text-base-content/70">
                Notifications are {notify() ? "on" : "off"}
              </span>
            </Flex>
            <p class="text-sm text-base-content/60">
              onChange hands over the new checked state. Reach for onNativeChange
              when you need the event itself, such as to call preventDefault.
            </p>
            <CodeBlock
              code={`const [notify, setNotify] = createSignal(false);

<Switch checked={notify()} onChange={setNotify} />
<Switch onNativeChange={(e) => e.preventDefault()} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <Switch flavor="neutral" checked />
              <Switch flavor="accent" checked />
              <Switch flavor="success" checked />
              <Switch flavor="warning" checked />
              <Switch flavor="destructive" checked />
            </Flex>
            <CodeBlock
              code={`<Switch flavor="neutral" checked />
<Switch flavor="accent" checked />
<Switch flavor="success" checked />
<Switch flavor="warning" checked />
<Switch flavor="destructive" checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Switch size="sm" />
              <Switch size="md" />
              <Switch size="lg" />
            </Flex>
            <CodeBlock
              code={`<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              <Switch disabled />
              <Switch disabled checked />
            </Flex>
            <CodeBlock
              code={`<Switch disabled />
<Switch disabled checked />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={toggleProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
