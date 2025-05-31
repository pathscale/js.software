import { Footer, Flex } from "@pathscale/ui";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

export default function FooterShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "horizontal", title: "Horizontal Layout" },
    { id: "vertical", title: "Vertical Layout" },
    { id: "centered", title: "Centered Layout" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "center",
      type: "boolean",
      description: "Center the footer content",
    },
    { name: "horizontal", type: "boolean", description: "Horizontal layout" },
    { name: "vertical", type: "boolean", description: "Vertical layout" },
  ];

  const titleProps = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for `class`, useful in JSX environments",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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

        <ShowcaseSection id="basic" title="Basic Usage">
          <Flex direction="col" gap="md">
            <Footer>
              <Footer.Title>Company</Footer.Title>
              <a class="link link-hover">About us</a>
              <a class="link link-hover">Contact</a>
            </Footer>
            <CodeBlock
              code={`<Footer>
  <Footer.Title>Company</Footer.Title>
  <a class="link link-hover">About us</a>
  <a class="link link-hover">Contact</a>
</Footer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="horizontal" title="Horizontal Layout">
          <Flex direction="col" gap="md">
            <Footer horizontal>
              <Footer.Title>Links</Footer.Title>
              <a class="link link-hover">Docs</a>
              <a class="link link-hover">API</a>
            </Footer>
            <CodeBlock
              code={`<Footer horizontal>
  <Footer.Title>Links</Footer.Title>
  <a class="link link-hover">Docs</a>
  <a class="link link-hover">API</a>
</Footer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="vertical" title="Vertical Layout">
          <Flex direction="col" gap="md">
            <Footer vertical>
              <Footer.Title>Company</Footer.Title>
              <a class="link link-hover">About</a>
              <a class="link link-hover">Careers</a>
            </Footer>
            <CodeBlock
              code={`<Footer vertical>
  <Footer.Title>Company</Footer.Title>
  <a class="link link-hover">About</a>
  <a class="link link-hover">Careers</a>
</Footer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="centered" title="Centered Layout">
          <Flex direction="col" gap="md">
            <Footer center>
              <Footer.Title>Legal</Footer.Title>
              <a class="link link-hover">Terms</a>
              <a class="link link-hover">Privacy</a>
            </Footer>
            <CodeBlock
              code={`<Footer center>
  <Footer.Title>Legal</Footer.Title>
  <a class="link link-hover">Terms</a>
  <a class="link link-hover">Privacy</a>
</Footer>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-semibold mb-2">Footer</h3>
          <PropsTable props={props} />

          <h3 class="text-lg font-semibold mt-6 mb-2">Footer.Title</h3>
          <PropsTable props={titleProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
