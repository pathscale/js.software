import {
  Timeline,
  TimelineItem,
  TimelineStart,
  TimelineMiddle,
  TimelineEnd,
  Flex,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function TimelineShowcase() {
  const sections = [
    { id: "default", title: "Basic Vertical" },
    { id: "top-only", title: "Top Side Only" },
    { id: "bottom-only", title: "Bottom Side Only" },
    { id: "different-sides", title: "Different Sides" },
    { id: "colorful", title: "Colorful Lines" },
    { id: "without-icons", title: "Without Icons" },
    { id: "responsive", title: "Responsive" },
    { id: "snap", title: "Snap Icon to Start" },
    { id: "props", title: "Props" },
  ];

  const props = [
    { name: "vertical", type: "boolean", description: "Vertical layout" },
    { name: "horizontal", type: "boolean", description: "Horizontal layout" },
    {
      name: "responsive",
      type: "boolean",
      description: "Responsive: vertical by default, horizontal on lg+",
    },
    {
      name: "snap",
      type: "boolean",
      description: "Snap icon to content start",
    },
    {
      name: "compact",
      type: "boolean",
      description: "Reduced spacing between items",
    },
    { name: "class", type: "string", description: "Tailwind classes" },
    { name: "dataTheme", type: "string", description: "Theme attribute" },
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

        <ShowcaseSection id="default" title="Basic Vertical">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="both">
                <TimelineStart>1984</TimelineStart>
                <TimelineMiddle />
                <TimelineEnd>First Macintosh computer</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineStart>1998</TimelineStart>
                <TimelineMiddle />
                <TimelineEnd>iMac</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart>2015</TimelineStart>
                <TimelineMiddle />
                <TimelineEnd>Apple Watch</TimelineEnd>
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<Timeline vertical>
  <TimelineItem connect="both">
    <TimelineStart>1984</TimelineStart>
    <TimelineMiddle />
    <TimelineEnd>First Macintosh computer</TimelineEnd>
  </TimelineItem>
</Timeline>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="top-only" title="Top Side Only">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="end">
                <TimelineStart box>1984</TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineStart box>1998</TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart box>2015</TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<TimelineItem connect="end">
  <TimelineStart box>1984</TimelineStart>
  <TimelineMiddle />
</TimelineItem>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="bottom-only" title="Bottom Side Only">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="end">
                <TimelineMiddle />
                <TimelineEnd>First Macintosh computer</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineMiddle />
                <TimelineEnd>iMac</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineMiddle />
                <TimelineEnd>Apple Watch</TimelineEnd>
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<TimelineItem connect="end">
  <TimelineMiddle />
  <TimelineEnd>First Macintosh computer</TimelineEnd>
</TimelineItem>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="different-sides" title="Different Sides">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="end">
                <TimelineStart box>Macintosh</TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineMiddle />
                <TimelineEnd>iMac</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineStart box>iPod</TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineMiddle />
                <TimelineEnd>iPhone</TimelineEnd>
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<TimelineItem connect="end">
  <TimelineStart box>Macintosh</TimelineStart>
  <TimelineMiddle />
</TimelineItem>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colorful" title="Colorful Lines">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="end" endClassName="bg-primary">
                <TimelineStart box>Macintosh</TimelineStart>
                <TimelineMiddle class="text-primary" />
              </TimelineItem>
              <TimelineItem
                connect="both"
                startClassName="bg-primary"
                endClassName="bg-primary"
              >
                <TimelineMiddle class="text-primary" />
                <TimelineEnd>iMac</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start" startClassName="bg-primary">
                <TimelineStart box>iPod</TimelineStart>
                <TimelineMiddle class="text-primary" />
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<TimelineItem connect="end" endClassName="bg-primary">
  <TimelineStart box>Macintosh</TimelineStart>
  <TimelineMiddle class="text-primary" />
</TimelineItem>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="without-icons" title="Without Icons">
          <Flex direction="col" gap="md">
            <Timeline vertical>
              <TimelineItem connect="end">
                <TimelineStart box>Macintosh</TimelineStart>
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineEnd>iMac</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart box>Apple Watch</TimelineStart>
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<TimelineItem connect="end">
  <TimelineStart box>Macintosh</TimelineStart>
</TimelineItem>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Timeline responsive>
              <TimelineItem connect="both">
                <TimelineStart>1984</TimelineStart>
                <TimelineMiddle />
                <TimelineEnd>Macintosh</TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart>2015</TimelineStart>
                <TimelineMiddle />
                <TimelineEnd>Apple Watch</TimelineEnd>
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<Timeline responsive>
  <TimelineItem connect="both">
    <TimelineStart>1984</TimelineStart>
    <TimelineMiddle />
    <TimelineEnd>Macintosh</TimelineEnd>
  </TimelineItem>
</Timeline>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="snap" title="Snap Icon to Start">
          <Flex direction="col" gap="md">
            <Timeline vertical snap>
              <TimelineItem connect="both">
                <TimelineStart class="md:text-end mb-10">
                  <strong>1984</strong>
                  <p>First Macintosh computer</p>
                </TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineMiddle />
                <TimelineEnd class="mb-10">
                  <strong>1998</strong>
                  <p>iMac</p>
                </TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart class="md:text-end mb-10">
                  <strong>2015</strong>
                  <p>Apple Watch</p>
                </TimelineStart>
                <TimelineMiddle />
              </TimelineItem>
            </Timeline>
            <CodeBlock
              code={`<Timeline vertical snap>
  <TimelineItem connect="both">
    <TimelineStart class="md:text-end mb-10">
      <strong>1984</strong>
      <p>First Macintosh</p>
    </TimelineStart>
    <TimelineMiddle />
  </TimelineItem>
</Timeline>`}
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
