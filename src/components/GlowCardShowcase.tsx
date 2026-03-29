import ShowcaseLayout from "./ShowcaseLayout";
import { GlowCard, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function GlowCardShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "custom", title: "Custom Styling" },
    { id: "grid", title: "Grid of Cards" },
    { id: "props", title: "Props" },
  ] as const;

  const glowCardProps = [
    {
      name: "children",
      type: "JSX.Element",
      description: "Content rendered inside the glow card",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
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
            <GlowCard>
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-2">Glow Card</h3>
                <p class="text-sm opacity-70">
                  Hover over this card to see the glow effect follow your cursor.
                </p>
              </div>
            </GlowCard>
            <CodeBlock
              code={`<GlowCard>
  <div class="p-6">
    <h3 class="text-lg font-semibold mb-2">Glow Card</h3>
    <p class="text-sm opacity-70">
      Hover over this card to see the glow effect follow your cursor.
    </p>
  </div>
</GlowCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom" title="Custom Styling">
          <Flex direction="col" gap="md">
            <GlowCard class="max-w-sm">
              <div class="p-8 text-center">
                <div class="text-4xl mb-4">&#x2728;</div>
                <h3 class="text-xl font-bold mb-2">Premium Plan</h3>
                <p class="text-3xl font-bold mb-4">$29/mo</p>
                <p class="text-sm opacity-70">Everything you need to get started.</p>
              </div>
            </GlowCard>
            <CodeBlock
              code={`<GlowCard class="max-w-sm">
  <div class="p-8 text-center">
    <div class="text-4xl mb-4">&#x2728;</div>
    <h3 class="text-xl font-bold mb-2">Premium Plan</h3>
    <p class="text-3xl font-bold mb-4">$29/mo</p>
    <p class="text-sm opacity-70">Everything you need to get started.</p>
  </div>
</GlowCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="grid" title="Grid of Cards">
          <Flex direction="col" gap="md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlowCard>
                <div class="p-6">
                  <h4 class="font-semibold mb-1">Analytics</h4>
                  <p class="text-sm opacity-70">Track your performance metrics.</p>
                </div>
              </GlowCard>
              <GlowCard>
                <div class="p-6">
                  <h4 class="font-semibold mb-1">Reports</h4>
                  <p class="text-sm opacity-70">Generate detailed reports.</p>
                </div>
              </GlowCard>
              <GlowCard>
                <div class="p-6">
                  <h4 class="font-semibold mb-1">Settings</h4>
                  <p class="text-sm opacity-70">Configure your preferences.</p>
                </div>
              </GlowCard>
            </div>
            <CodeBlock
              code={`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <GlowCard>
    <div class="p-6">
      <h4 class="font-semibold mb-1">Analytics</h4>
      <p class="text-sm opacity-70">Track your performance metrics.</p>
    </div>
  </GlowCard>
  <GlowCard>
    <div class="p-6">
      <h4 class="font-semibold mb-1">Reports</h4>
      <p class="text-sm opacity-70">Generate detailed reports.</p>
    </div>
  </GlowCard>
  <GlowCard>
    <div class="p-6">
      <h4 class="font-semibold mb-1">Settings</h4>
      <p class="text-sm opacity-70">Configure your preferences.</p>
    </div>
  </GlowCard>
</div>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={glowCardProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
