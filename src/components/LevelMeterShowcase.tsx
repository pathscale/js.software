import { createSignal, onCleanup } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { LevelMeter, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function LevelMeterShowcase() {
  const sections = [
    { id: "default", title: "Default (Vertical)" },
    { id: "horizontal", title: "Horizontal" },
    { id: "colors", title: "Colors" },
    { id: "animated", title: "Animated Demo" },
    { id: "props", title: "Props" },
  ] as const;

  const levelMeterProps = [
    {
      name: "level",
      type: "number",
      description: "Level value between 0 and 1",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      default: '"primary"',
      description: "Color of the meter fill",
    },
    {
      name: "direction",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Direction of the meter",
    },
  ];

  const [animLevel, setAnimLevel] = createSignal(0.5);
  const interval = setInterval(() => {
    setAnimLevel(Math.random());
  }, 800);
  onCleanup(() => clearInterval(interval));

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

        <ShowcaseSection id="default" title="Default (Vertical)">
          <Flex direction="col" gap="md">
            <Flex align="end" justify="start" gap="lg" style={{ height: "120px" }}>
              <LevelMeter level={0.3} />
              <LevelMeter level={0.6} />
              <LevelMeter level={0.9} />
            </Flex>
            <CodeBlock
              code={`<LevelMeter level={0.3} />
<LevelMeter level={0.6} />
<LevelMeter level={0.9} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="horizontal" title="Horizontal">
          <Flex direction="col" gap="md">
            <div class="space-y-3 w-64">
              <LevelMeter level={0.3} direction="horizontal" />
              <LevelMeter level={0.6} direction="horizontal" />
              <LevelMeter level={0.9} direction="horizontal" />
            </div>
            <CodeBlock
              code={`<LevelMeter level={0.3} direction="horizontal" />
<LevelMeter level={0.6} direction="horizontal" />
<LevelMeter level={0.9} direction="horizontal" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="end" justify="start" gap="lg" style={{ height: "120px" }}>
              <LevelMeter level={0.7} color="primary" />
              <LevelMeter level={0.7} color="secondary" />
              <LevelMeter level={0.7} color="accent" />
              <LevelMeter level={0.7} color="info" />
              <LevelMeter level={0.7} color="success" />
              <LevelMeter level={0.7} color="warning" />
              <LevelMeter level={0.7} color="error" />
            </Flex>
            <CodeBlock
              code={`<LevelMeter level={0.7} color="primary" />
<LevelMeter level={0.7} color="secondary" />
<LevelMeter level={0.7} color="accent" />
<LevelMeter level={0.7} color="info" />
<LevelMeter level={0.7} color="success" />
<LevelMeter level={0.7} color="warning" />
<LevelMeter level={0.7} color="error" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="animated" title="Animated Demo">
          <Flex direction="col" gap="md">
            <Flex align="end" justify="start" gap="lg" style={{ height: "120px" }}>
              <LevelMeter level={animLevel()} color="success" />
              <LevelMeter level={animLevel()} color="warning" />
              <LevelMeter level={animLevel()} color="error" />
            </Flex>
            <CodeBlock
              code={`const [level, setLevel] = createSignal(0.5);
const interval = setInterval(() => {
  setLevel(Math.random());
}, 800);
onCleanup(() => clearInterval(interval));

<LevelMeter level={level()} color="success" />
<LevelMeter level={level()} color="warning" />
<LevelMeter level={level()} color="error" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={levelMeterProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
