import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Link } from "@pathscale/ui";
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
          <Link>It's just a simple link</Link>
          <CodeBlock code={`<Link>It's just a simple link</Link>`} />
        </ShowcaseSection>

        <ShowcaseSection id="with-href" title="With Href">
          <Link href="https://google.com" target="_blank">
            Take me to Google!
          </Link>
          <CodeBlock
            code={`<Link href="https://google.com" target="_blank">
  Take me to Google!
</Link>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <div class="flex flex-wrap items-center gap-4">
            <Link>Default</Link>
            <Link color="neutral">Neutral</Link>
            <Link color="primary">Primary</Link>
            <Link color="secondary">Secondary</Link>
            <Link color="accent">Accent</Link>
            <Link color="info">Info</Link>
            <Link color="success">Success</Link>
            <Link color="warning">Warning</Link>
            <Link color="error">Error</Link>
          </div>
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
        </ShowcaseSection>

        <ShowcaseSection id="hover" title="Hover Effect">
          <div class="flex items-center gap-4">
            <Link hover>With hover effect (default)</Link>
            <Link hover={false}>Without hover effect</Link>
          </div>
          <CodeBlock
            code={`<Link hover>With hover effect (default)</Link>
<Link hover={false}>Without hover effect</Link>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={linkProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default LinkShowcase;
