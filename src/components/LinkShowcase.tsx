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
    { id: "colors", title: "Colors" },
    { id: "hover", title: "Hover Effect" },
    { id: "props", title: "Props" },
  ] as const;

  const linkProps = [
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      default: "undefined",
      description: "The color scheme of the link",
    },
    {
      name: "hover",
      type: "boolean",
      default: "true",
      description: "Whether to show hover effect",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
              <Link>It's just a simple link</Link>
            </Flex>
            <CodeBlock code={`<Link>It's just a simple link</Link>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-href" title="With Href">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left">
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

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Link>Default</Link>
              <Link color="neutral">Neutral</Link>
              <Link color="primary">Primary</Link>
              <Link color="secondary">Secondary</Link>
              <Link color="accent">Accent</Link>
              <Link color="info">Info</Link>
              <Link color="success">Success</Link>
              <Link color="warning">Warning</Link>
              <Link color="error">Error</Link>
            </Flex>
            <CodeBlock
              code={`<Link>Default</Link>
<Link color="neutral">Neutral</Link>
<Link color="primary">Primary</Link>
<Link color="secondary">Secondary</Link>
<Link color="accent">Accent</Link>
<Link color="info">Info</Link>
<Link color="success">Success</Link>
<Link color="warning">Warning</Link>
<Link color="error">Error</Link>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hover" title="Hover Effect">
          <Flex direction="col" gap="md">
            <Flex justify="left" align="left" gap="lg">
              <Link hover>With hover effect (default)</Link>
              <Link hover={false}>Without hover effect</Link>
            </Flex>
            <CodeBlock
              code={`<Link hover>With hover effect (default)</Link>
<Link hover={false}>Without hover effect</Link>`}
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
