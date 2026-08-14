import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Link, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const LinkShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "with-href", title: "With Href" },
    { id: "external", title: "External" },
    { id: "underline", title: "Underline" },
    { id: "disabled", title: "Disabled" },
    { id: "with-icon", title: "With Icon" },
    { id: "props", title: "Props" },
  ] as const;

  const linkProps = [
    {
      name: "variant",
      type: '"default"',
      default: '"default"',
      description: "The visual variant of the link",
    },
    {
      name: "underline",
      type: '"always" | "hover" | "none"',
      default: '"always"',
      description: "Controls the underline behavior",
    },
    {
      name: "isExternal",
      type: "boolean",
      default: "false",
      description: 'Mark as external link (sets target="_blank" and rel attributes)',
    },
    {
      name: "state",
      type: `"default" | "loading" | "error" | "invalid" | "disabled" | "hidden"`,
      default: "false",
      description: "What is happening to the component. Replaces isDisabled, isLoading and isInvalid, which could disagree.",
    },
    {
      name: "href",
      type: "string",
      description: "The URL the link points to",
    },
    {
      name: "target",
      type: "string",
      description: "The target attribute for the link",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Link>It's just a simple link</Link>
            </Flex>
            <CodeBlock code={`<Link>It's just a simple link</Link>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-href" title="With Href">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Link href="https://google.com" target="_blank">
                Take me to Google!
              </Link>
            </Flex>
            <CodeBlock
              code={`<Link href="https://google.com" target="_blank">
  Take me to Google!
</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="external" title="External">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <Link href="https://google.com" isExternal>
                External link
              </Link>
              <Link href="https://google.com" isExternal>
                <Link.Icon />
                With icon
              </Link>
            </Flex>
            <CodeBlock
              code={`<Link href="https://google.com" isExternal>External link</Link>
<Link href="https://google.com" isExternal>
  <Link.Icon />
  With icon
</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="underline" title="Underline">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <Link underline="always">Always</Link>
              <Link underline="hover">On hover</Link>
              <Link underline="none">None</Link>
            </Flex>
            <CodeBlock
              code={`<Link underline="always">Always</Link>
<Link underline="hover">On hover</Link>
<Link underline="none">None</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <Link href="https://google.com" state="disabled">
                Disabled link
              </Link>
            </Flex>
            <CodeBlock
              code={`<Link href="https://google.com" state="disabled">Disabled link</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-icon" title="With Icon">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg">
              <Link href="https://google.com">
                Default icon
                <Link.Icon />
              </Link>
            </Flex>
            <CodeBlock
              code={`<Link href="https://google.com">
  Default icon
  <Link.Icon />
</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={linkProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default LinkShowcase;
