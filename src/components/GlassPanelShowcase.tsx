import { GlassPanel, Flex } from "@pathscale/ui";
import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function GlassPanelShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "blur-levels", title: "With Blur Levels" },
    { id: "collapsible", title: "Collapsible" },
    { id: "accent-border", title: "With Accent Border" },
    { id: "transparent", title: "Transparent Variant" },
    { id: "glow", title: "With Glow Effect" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    { name: "blur", type: '"none" | "sm" | "md" | "lg" | "xl" | "2xl"', description: "Backdrop blur intensity (default: none)" },
    { name: "collapsible", type: "boolean", description: "Whether the panel can be collapsed" },
    { name: "open", type: "boolean", description: "Controlled open state for collapsible panels" },
    { name: "defaultOpen", type: "boolean", description: "Initial open state for uncontrolled collapsible panels (default: true)" },
    { name: "onToggle", type: "(open: boolean) => void", description: "Callback when collapsible panel is toggled" },
    { name: "title", type: "string", description: "Header title text (required for collapsible)" },
    { name: "icon", type: "JSX.Element", description: "Icon displayed next to the title" },
    { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', description: "Content padding size (default: md)" },
    { name: "transparent", type: "boolean", description: "Removes background and border, making the panel fully transparent" },
    { name: "glow", type: "boolean", description: "Adds a subtle inner glow effect" },
    { name: "accent", type: "ComponentColor", description: "Adds a colored left border accent (primary, secondary, accent, info, success, warning, error, neutral, ghost)" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const SettingsIcon = () => (
    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const InfoIcon = () => (
    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );

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
            <GlassPanel>
              <p>This is a basic glass panel with default settings. It provides a subtle frosted-glass container for your content.</p>
            </GlassPanel>
            <CodeBlock code={`<GlassPanel>\n  <p>Your content here</p>\n</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="blur-levels" title="With Blur Levels">
          <Flex direction="col" gap="md">
            <div
              class="relative rounded-xl p-4 space-y-4"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              {(["sm", "md", "lg", "xl"] as const).map((level) => (
                <GlassPanel blur={level}>
                  <p class="text-sm font-medium">Blur: {level}</p>
                </GlassPanel>
              ))}
            </div>
            <CodeBlock code={`<GlassPanel blur="sm">...</GlassPanel>\n<GlassPanel blur="md">...</GlassPanel>\n<GlassPanel blur="lg">...</GlassPanel>\n<GlassPanel blur="xl">...</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="collapsible" title="Collapsible">
          <Flex direction="col" gap="md">
            {(() => {
              const [open, setOpen] = createSignal(true);
              return (
                <>
                  <GlassPanel
                    collapsible
                    title="Settings"
                    icon={<SettingsIcon />}
                    open={open()}
                    onToggle={setOpen}
                    blur="sm"
                  >
                    <p class="text-sm">This panel can be expanded and collapsed by clicking the header. It uses a controlled open state.</p>
                  </GlassPanel>
                  <GlassPanel
                    collapsible
                    title="Additional Information"
                    icon={<InfoIcon />}
                    defaultOpen={false}
                    blur="sm"
                  >
                    <p class="text-sm">This panel starts collapsed and uses uncontrolled state with defaultOpen set to false.</p>
                  </GlassPanel>
                </>
              );
            })()}
            <CodeBlock code={`<GlassPanel collapsible title="Settings" icon={<Icon />} open={open()} onToggle={setOpen}>\n  <p>Collapsible content</p>\n</GlassPanel>\n\n<GlassPanel collapsible title="Info" defaultOpen={false}>\n  <p>Starts collapsed</p>\n</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="accent-border" title="With Accent Border">
          <Flex direction="col" gap="md">
            <GlassPanel accent="primary" blur="sm">
              <p class="text-sm font-medium">Primary accent</p>
              <p class="text-sm opacity-70">Panel with a primary-colored left border.</p>
            </GlassPanel>
            <GlassPanel accent="error" blur="sm">
              <p class="text-sm font-medium">Error accent</p>
              <p class="text-sm opacity-70">Panel with an error-colored left border for warnings or alerts.</p>
            </GlassPanel>
            <GlassPanel accent="success" blur="sm">
              <p class="text-sm font-medium">Success accent</p>
              <p class="text-sm opacity-70">Panel with a success-colored left border for positive states.</p>
            </GlassPanel>
            <CodeBlock code={`<GlassPanel accent="primary">...</GlassPanel>\n<GlassPanel accent="error">...</GlassPanel>\n<GlassPanel accent="success">...</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="transparent" title="Transparent Variant">
          <Flex direction="col" gap="md">
            <div
              class="relative rounded-xl p-4"
              style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
            >
              <GlassPanel transparent>
                <p class="text-sm font-medium">Transparent panel</p>
                <p class="text-sm opacity-70">No background or border, just the content with padding.</p>
              </GlassPanel>
            </div>
            <CodeBlock code={`<GlassPanel transparent>\n  <p>Fully transparent panel</p>\n</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="glow" title="With Glow Effect">
          <Flex direction="col" gap="md">
            <GlassPanel glow blur="md">
              <p class="text-sm font-medium">Glow panel</p>
              <p class="text-sm opacity-70">This panel has a subtle inner glow effect along the top edge, adding depth to the glass appearance.</p>
            </GlassPanel>
            <GlassPanel glow blur="lg" accent="primary">
              <p class="text-sm font-medium">Glow with accent</p>
              <p class="text-sm opacity-70">Combining glow effect with an accent border for a more pronounced look.</p>
            </GlassPanel>
            <CodeBlock code={`<GlassPanel glow blur="md">...</GlassPanel>\n<GlassPanel glow blur="lg" accent="primary">...</GlassPanel>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
