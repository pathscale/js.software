import ShowcaseLayout from "./ShowcaseLayout";
import { Avatar, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function AvatarShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "sizes", title: "Sizes" },
    { id: "variant", title: "Variant" },
    { id: "fallback", title: "Fallback" },
    { id: "colors", title: "Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the avatar",
    },
    {
      name: "color",
      type: '"default" | "accent" | "success" | "warning" | "danger"',
      default: '"default"',
      description: "Background color for the fallback slot",
    },
    {
      name: "variant",
      type: '"default" | "soft"',
      default: '"default"',
      description: "Visual variant of the avatar",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for `class`, useful in JSX environments",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Avatar.Image and/or Avatar.Fallback",
    },
  ];

  const sampleImage =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

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
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar>
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar>
  <Avatar.Image src="user-image.jpg" alt="User avatar" />
  <Avatar.Fallback>U</Avatar.Fallback>
</Avatar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar size="lg">
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
              <Avatar size="md">
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
              <Avatar size="sm">
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar size="lg">…</Avatar>
<Avatar size="md">…</Avatar>
<Avatar size="sm">…</Avatar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="variant" title="Variant">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar variant="default">
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
              <Avatar variant="soft">
                <Avatar.Image src={sampleImage} alt="User avatar" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar variant="default">…</Avatar>
<Avatar variant="soft">…</Avatar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="fallback" title="Fallback">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar size="lg">
                <Avatar.Fallback>K</Avatar.Fallback>
              </Avatar>
              <Avatar size="md">
                <Avatar.Fallback>JO</Avatar.Fallback>
              </Avatar>
              <Avatar size="sm">
                <Avatar.Fallback>MX</Avatar.Fallback>
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar size="lg">
  <Avatar.Fallback>K</Avatar.Fallback>
</Avatar>
<Avatar size="md">
  <Avatar.Fallback>JO</Avatar.Fallback>
</Avatar>
<Avatar size="sm">
  <Avatar.Fallback>MX</Avatar.Fallback>
</Avatar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar flavor="neutral">
                <Avatar.Fallback>D</Avatar.Fallback>
              </Avatar>
              <Avatar flavor="accent">
                <Avatar.Fallback>A</Avatar.Fallback>
              </Avatar>
              <Avatar flavor="success">
                <Avatar.Fallback>S</Avatar.Fallback>
              </Avatar>
              <Avatar flavor="warning">
                <Avatar.Fallback>W</Avatar.Fallback>
              </Avatar>
              <Avatar flavor="destructive">
                <Avatar.Fallback>D</Avatar.Fallback>
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar flavor="neutral"><Avatar.Fallback>D</Avatar.Fallback></Avatar>
<Avatar flavor="accent"><Avatar.Fallback>A</Avatar.Fallback></Avatar>
<Avatar flavor="success"><Avatar.Fallback>S</Avatar.Fallback></Avatar>
<Avatar flavor="warning"><Avatar.Fallback>W</Avatar.Fallback></Avatar>
<Avatar flavor="destructive"><Avatar.Fallback>D</Avatar.Fallback></Avatar>`}
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
