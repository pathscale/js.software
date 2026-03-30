import ShowcaseLayout from "./ShowcaseLayout";
import { Status, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function StatusShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "colors", title: "Colors" },
    { id: "sizes", title: "Sizes" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost"',
      description: "Color of the status indicator",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: "Size of the status indicator",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
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
            <Flex align="center" justify="start" gap="md">
              <Status />
            </Flex>
            <CodeBlock code={`<Status />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="start" gap="lg" wrap="wrap">
              <Flex align="center" gap="sm">
                <Status color="primary" />
                <span class="text-sm">primary</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="success" />
                <span class="text-sm">success</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="warning" />
                <span class="text-sm">warning</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="error" />
                <span class="text-sm">error</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="info" />
                <span class="text-sm">info</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="secondary" />
                <span class="text-sm">secondary</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="accent" />
                <span class="text-sm">accent</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="neutral" />
                <span class="text-sm">neutral</span>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Status color="primary" />
<Status color="success" />
<Status color="warning" />
<Status color="error" />
<Status color="info" />
<Status color="secondary" />
<Status color="accent" />
<Status color="neutral" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex align="center" justify="start" gap="lg" wrap="wrap">
              <Flex align="center" gap="sm">
                <Status color="primary" size="xs" />
                <span class="text-sm">xs</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="primary" size="sm" />
                <span class="text-sm">sm</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="primary" size="md" />
                <span class="text-sm">md</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="primary" size="lg" />
                <span class="text-sm">lg</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Status color="primary" size="xl" />
                <span class="text-sm">xl</span>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<Status color="primary" size="xs" />
<Status color="primary" size="sm" />
<Status color="primary" size="md" />
<Status color="primary" size="lg" />
<Status color="primary" size="xl" />`}
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
