import { Badge, Button, Flex, Icon, Tag } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const badgeProps = [
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Indicator size." },
  { name: "color", type: '"default" | "accent" | "success" | "warning" | "danger"', default: '"default"', description: "Semantic indicator color." },
  { name: "variant", type: '"primary" | "secondary" | "soft"', default: '"primary"', description: "Indicator treatment." },
  { name: "placement", type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: "Position relative to Badge.Anchor." },
];

export default function BadgeShowcase() {
  return (
    <ShowcaseLayout>
      <Flex direction="col" gap="xl">
        <ShowcaseSection id="anchor" title="Anchored badge">
          <Flex gap="xl" align="center" wrap="wrap">
            <Badge.Anchor>
              <Button variant="outline" isIconOnly aria-label="Inbox">
                <Icon name="icon-[mdi--inbox]" width={20} height={20} />
              </Button>
              <Badge color="danger">3</Badge>
            </Badge.Anchor>
            <Badge.Anchor>
              <Button variant="outline">Messages</Button>
              <Badge color="accent" placement="bottom-right">12</Badge>
            </Badge.Anchor>
          </Flex>
          <CodeBlock code={`<Badge.Anchor>
  <Button isIconOnly aria-label="Inbox"><Icon name="icon-[mdi--inbox]" /></Button>
  <Badge color="danger">3</Badge>
</Badge.Anchor>`} />
        </ShowcaseSection>

        <ShowcaseSection id="placements" title="Placements">
          <Flex gap="xl" align="center" wrap="wrap">
            {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((placement) => (
              <Badge.Anchor>
                <Button variant="outline">{placement}</Button>
                <Badge placement={placement} color="accent" />
              </Badge.Anchor>
            ))}
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="labels" title="Standalone labels use Tag">
          <p class="mb-4 text-base-content/70">
            Badge is positioned relative to Badge.Anchor. Use Tag when the content is a standalone
            label rather than an indicator attached to another control.
          </p>
          <Flex gap="md" wrap="wrap">
            <Tag>Draft</Tag>
            <Tag variant="surface">In review</Tag>
          </Flex>
          <CodeBlock code={`<Tag>Draft</Tag>
<Tag variant="surface">In review</Tag>`} />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={badgeProps} />
        </ShowcaseSection>
      </Flex>
    </ShowcaseLayout>
  );
}
