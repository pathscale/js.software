import ShowcaseLayout from "./ShowcaseLayout";
import { NoiseBackground, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function NoiseBackgroundShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "custom-gradient", title: "Custom gradient colors" },
    { id: "noise-intensity", title: "Noise intensity" },
    { id: "speed-variations", title: "Speed variations" },
    { id: "props", title: "Props" },
  ] as const;

  const noiseBackgroundProps = [
    {
      name: "children",
      type: "JSX.Element",
      description: "Content rendered inside the noise background container",
    },
    {
      name: "containerClass",
      type: "string",
      description: "Additional CSS classes for the outer container",
    },
    {
      name: "gradientColors",
      type: "string[]",
      description: "Gradient blob colors (provide 2-3)",
    },
    {
      name: "noiseIntensity",
      type: "number",
      description: "Noise texture opacity (0-1). Default: 0.2",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation velocity multiplier. Default: 0.1",
    },
    {
      name: "backdropBlur",
      type: "boolean",
      description: "Apply a backdrop-blur over the gradient layers. Default: false",
    },
    {
      name: "animating",
      type: "boolean",
      description: "Enable/disable the wandering animation. Default: true",
    },
    {
      name: "borderRadius",
      type: "string",
      description: 'CSS border-radius value. Default: "var(--radius-box, 1rem)"',
    },
    {
      name: "noiseSrc",
      type: "string",
      description: 'Path or URL to the noise texture image. Default: "/noise.webp"',
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles for the component",
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
            <NoiseBackground>
              <div class="p-8 text-center">
                <h3 class="text-lg font-semibold mb-2">Default Noise Background</h3>
                <p class="text-sm opacity-70">
                  Uses default gradient colors with subtle noise overlay and wandering animation.
                </p>
              </div>
            </NoiseBackground>
            <CodeBlock
              code={`<NoiseBackground>
  <div class="p-8 text-center">
    <h3 class="text-lg font-semibold mb-2">Default Noise Background</h3>
    <p class="text-sm opacity-70">
      Uses default gradient colors with subtle noise overlay and wandering animation.
    </p>
  </div>
</NoiseBackground>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-gradient" title="Custom gradient colors">
          <Flex direction="col" gap="md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NoiseBackground gradientColors={["#ff6b6b", "#feca57", "#48dbfb"]}>
                <div class="p-8 text-center">
                  <h4 class="font-semibold mb-1">Warm Sunset</h4>
                  <p class="text-sm opacity-70">Red, yellow, and sky blue blobs</p>
                </div>
              </NoiseBackground>
              <NoiseBackground gradientColors={["#a29bfe", "#6c5ce7"]}>
                <div class="p-8 text-center">
                  <h4 class="font-semibold mb-1">Purple Haze</h4>
                  <p class="text-sm opacity-70">Two-color purple gradient</p>
                </div>
              </NoiseBackground>
            </div>
            <CodeBlock
              code={`{/* Three colors */}
<NoiseBackground gradientColors={["#ff6b6b", "#feca57", "#48dbfb"]}>
  <div class="p-8 text-center">
    <h4 class="font-semibold mb-1">Warm Sunset</h4>
    <p class="text-sm opacity-70">Red, yellow, and sky blue blobs</p>
  </div>
</NoiseBackground>

{/* Two colors */}
<NoiseBackground gradientColors={["#a29bfe", "#6c5ce7"]}>
  <div class="p-8 text-center">
    <h4 class="font-semibold mb-1">Purple Haze</h4>
    <p class="text-sm opacity-70">Two-color purple gradient</p>
  </div>
</NoiseBackground>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="noise-intensity" title="Noise intensity">
          <Flex direction="col" gap="md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NoiseBackground noiseIntensity={0.05}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Subtle</h4>
                  <p class="text-sm opacity-70">noiseIntensity={"{0.05}"}</p>
                </div>
              </NoiseBackground>
              <NoiseBackground noiseIntensity={0.2}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Default</h4>
                  <p class="text-sm opacity-70">noiseIntensity={"{0.2}"}</p>
                </div>
              </NoiseBackground>
              <NoiseBackground noiseIntensity={0.6}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Heavy</h4>
                  <p class="text-sm opacity-70">noiseIntensity={"{0.6}"}</p>
                </div>
              </NoiseBackground>
            </div>
            <CodeBlock
              code={`{/* Subtle noise */}
<NoiseBackground noiseIntensity={0.05}>
  <div class="p-6 text-center">Subtle</div>
</NoiseBackground>

{/* Default noise */}
<NoiseBackground noiseIntensity={0.2}>
  <div class="p-6 text-center">Default</div>
</NoiseBackground>

{/* Heavy noise */}
<NoiseBackground noiseIntensity={0.6}>
  <div class="p-6 text-center">Heavy</div>
</NoiseBackground>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="speed-variations" title="Speed variations">
          <Flex direction="col" gap="md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NoiseBackground speed={0.02} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Slow</h4>
                  <p class="text-sm opacity-70">speed={"{0.02}"}</p>
                </div>
              </NoiseBackground>
              <NoiseBackground speed={0.1} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Default</h4>
                  <p class="text-sm opacity-70">speed={"{0.1}"}</p>
                </div>
              </NoiseBackground>
              <NoiseBackground speed={0.5} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
                <div class="p-6 text-center">
                  <h4 class="font-semibold mb-1">Fast</h4>
                  <p class="text-sm opacity-70">speed={"{0.5}"}</p>
                </div>
              </NoiseBackground>
            </div>
            <CodeBlock
              code={`{/* Slow animation */}
<NoiseBackground speed={0.02} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
  <div class="p-6 text-center">Slow</div>
</NoiseBackground>

{/* Default speed */}
<NoiseBackground speed={0.1} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
  <div class="p-6 text-center">Default</div>
</NoiseBackground>

{/* Fast animation */}
<NoiseBackground speed={0.5} gradientColors={["#00b894", "#00cec9", "#0984e3"]}>
  <div class="p-6 text-center">Fast</div>
</NoiseBackground>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={noiseBackgroundProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
