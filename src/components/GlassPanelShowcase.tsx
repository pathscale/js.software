import { Card, Collapsible, Flex } from "@pathscale/ui";
import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function GlassPanelShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "theme-tuning", title: "Theme Tuning" },
    { id: "collapsible", title: "Collapsible" },
    { id: "transparent", title: "Transparent Variant" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    { name: "collapsible", type: "boolean", description: "Whether the panel can be collapsed" },
    { name: "open", type: "boolean", description: "Controlled open state for collapsible panels" },
    { name: "defaultOpen", type: "boolean", description: "Initial open state for uncontrolled collapsible panels (default: true)" },
    { name: "onToggle", type: "(open: boolean) => void", description: "Callback when collapsible panel is toggled" },
    { name: "title", type: "string", description: "Header title text (required for collapsible)" },
    { name: "icon", type: "JSX.Element", description: "Icon displayed next to the title" },
    { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', description: "Content padding size (default: md)" },
    { name: "transparent", type: "boolean", description: "Removes background, border, blur, and decorative chrome — renders as a plain container" },
    { name: "paddingX", type: "string", description: "Custom horizontal padding utility class (overrides size)" },
    { name: "paddingY", type: "string", description: "Custom vertical padding utility class (overrides size)" },
    { name: "class", type: "string", description: "Additional CSS classes" },
  ];

  const themeVars = [
    { name: "--glass-blur", type: "length", description: "Backdrop blur radius (e.g. 11px, 20px, 50px)" },
    { name: "--glass-saturation", type: "number", description: "Backdrop saturate filter (e.g. 1.2)" },
    { name: "--glass-brightness", type: "number", description: "Backdrop brightness filter (e.g. 1)" },
    { name: "--glass-background-color", type: "color", description: "Panel background tint (default: white)" },
    { name: "--glass-background-opacity", type: "percent", description: "Panel background opacity (e.g. 38%)" },
    { name: "--glass-border-color", type: "color", description: "Panel border tint (default: white)" },
    { name: "--glass-border-opacity", type: "percent", description: "Panel border opacity (e.g. 30%)" },
    { name: "--glass-border-radius", type: "length", description: "Panel corner radius (default: 20px)" },
    { name: "--glass-shadow-depth", type: "shadow", description: "Outer shadow layer (default: 0 8px 32px rgb(0 0 0 / 10%))" },
    { name: "--glass-highlight-color", type: "color", description: "Color of inner highlights and sheen" },
    { name: "--glass-highlight-opacity", type: "percent", description: "Strength of the top inset highlight" },
    { name: "--glass-rim-start-opacity", type: "percent", description: "Opacity of the rim gradient start" },
    { name: "--glass-rim-end-opacity", type: "percent", description: "Opacity of the rim gradient end" },
    { name: "--glass-depth-sheen-opacity", type: "percent", description: "Strength of the diagonal sheen overlay" },
    { name: "--glass-inner-glow-alpha", type: "number", description: "Alpha of the inner depth glow" },
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
            <Card material="glass">
              <p>This is a basic glass panel. Blur, saturation, opacity, and colors all come from the theme via CSS variables.</p>
            </Card>
            <CodeBlock code={`<Card material="glass">\n  <p>Your content here</p>\n</Card>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="theme-tuning" title="Theme Tuning">
          <Flex direction="col" gap="md">
            <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)]">
              Adjust glass per-panel or globally by setting CSS variables. The base panel reads <code>--glass-blur</code>, <code>--glass-saturation</code>, <code>--glass-background-opacity</code>, <code>--glass-border-opacity</code>, etc. from the cascade — set them on the panel, a parent, or <code>:root</code> in your theme.
            </p>
            <div
              class="relative rounded-xl p-4 space-y-4"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <Card material="glass" style={{ "--glass-blur": "4px" } as Record<string, string>}>
                <p class="text-sm font-medium">--glass-blur: 4px</p>
              </Card>
              <Card material="glass" style={{ "--glass-blur": "16px" } as Record<string, string>}>
                <p class="text-sm font-medium">--glass-blur: 16px</p>
              </Card>
              <Card material="glass" style={{ "--glass-blur": "40px" } as Record<string, string>}>
                <p class="text-sm font-medium">--glass-blur: 40px</p>
              </Card>
              <Card material="glass"
                style={{
                  "--glass-blur": "20px",
                  "--glass-background-opacity": "15%",
                  "--glass-border-opacity": "30%",
                } as Record<string, string>}
              >
                <p class="text-sm font-medium">Hype4 reference defaults</p>
                <p class="text-sm opacity-70">blur 20px, bg 15%, border 30%</p>
              </Card>
            </div>
            <CodeBlock
              code={`<Card material="glass" style={{ "--glass-blur": "4px" }}>...</Card>\n<Card material="glass" style={{ "--glass-blur": "16px" }}>...</Card>\n<Card material="glass" style={{ "--glass-blur": "40px" }}>...</Card>\n\n// Global tuning via theme\n:root {\n  --glass-blur: 20px;\n  --glass-background-opacity: 15%;\n  --glass-border-opacity: 30%;\n}`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="collapsible" title="Collapsible">
          <Flex direction="col" gap="md">
            {(() => {
              const [open, setOpen] = createSignal(true);
              return (
                <>
                  <Card material="glass">
                    <Collapsible open={open()} onOpenChange={setOpen} title="Settings">
                      <p class="text-sm">This panel can be expanded and collapsed by clicking the header. It uses a controlled open state.</p>
                    </Collapsible>
                  </Card>
                  <Card material="glass">
                    <Collapsible defaultOpen={false} title="Additional Information">
                      <p class="text-sm">This panel starts collapsed and uses uncontrolled state with defaultOpen set to false.</p>
                    </Collapsible>
                  </Card>
                </>
              );
            })()}
            <CodeBlock code={`<Card material="glass" collapsible title="Settings" icon={<Icon />} open={open()} onToggle={setOpen}>\n  <p>Collapsible content</p>\n</Card>\n\n<Card material="glass" collapsible title="Info" defaultOpen={false}>\n  <p>Starts collapsed</p>\n</Card>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="transparent" title="Transparent Variant">
          <Flex direction="col" gap="md">
            <div
              class="relative rounded-xl p-4"
              style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
            >
              <Card variant="plain" padding="md">
                <p class="text-sm font-medium">Transparent panel</p>
                <p class="text-sm opacity-70">Removes background, border, blur, and decorative chrome — renders as a plain padded container.</p>
              </Card>
            </div>
            <CodeBlock code={`<Card variant="plain" padding="md">\n  <p>Bare container, no glass chrome</p>\n</Card>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
          <div class="mt-6">
            <h3 class="text-sm font-semibold mb-2">Theme CSS Variables</h3>
            <p class="text-sm text-[hsl(var(--color-fg-secondary)/1)] mb-3">
              Glass appearance is driven entirely by these CSS variables. Set them on <code>:root</code>, a theme selector, a parent, or per-panel via inline style.
            </p>
            <PropsTable props={themeVars} />
          </div>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
