import ShowcaseLayout from "./ShowcaseLayout";
import { Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ButtonShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "brand-colors", title: "Brand Variants" },
    { id: "soft-style", title: "Soft Style" },
    { id: "outline-style", title: "Outline Style" },
    { id: "dash-style", title: "Dash Style" },
    { id: "active-buttons", title: "Active Buttons" },
    { id: "state-colors", title: "State Colors" },
    { id: "outline-buttons", title: "Outline Buttons" },
    { id: "button-sizes", title: "Button Sizes" },
    { id: "responsive", title: "Responsive" },
    { id: "wide", title: "Wide" },
    { id: "glass", title: "Glass" },
    { id: "html-tags", title: "Different HTML Tags" },
    { id: "disabled", title: "Disabled" },
    { id: "square", title: "Square Button" },
    { id: "circle", title: "Circle Button" },
    { id: "icon-start", title: "Icon at Start" },
    { id: "icon-end", title: "Icon at End" },
    { id: "block", title: "Block Button" },
    { id: "loading", title: "Loading States" },
    { id: "no-animation", title: "Without Animation" },
    { id: "link", title: "Link Button" },
    { id: "props", title: "Props" },
  ] as const;

  const buttonProps = [
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft"',
      default: '"primary"',
      description: "The visual style variant of the button",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the button",
    },
    {
      name: "isIconOnly",
      type: "boolean",
      default: "false",
      description: "Whether the button only contains an icon (square shape)",
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      description: "Whether the button should take up the full width",
    },
    {
      name: "isDisabled",
      type: "boolean",
      default: "false",
      description: "Whether the button is disabled",
    },
    {
      name: "isPending",
      type: "boolean",
      default: "false",
      description: "Whether the button is in a loading/pending state",
    },
    {
      name: "startIcon",
      type: "JSX.Element",
      description: "Icon to show at the start of the button",
    },
    {
      name: "endIcon",
      type: "JSX.Element",
      description: "Icon to show at the end of the button",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class)",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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
            <Flex justify="start" align="start">
              <Button>Button</Button>
            </Flex>
            <CodeBlock code={`<Button>Button</Button>`} />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `color` prop removed; semantic palette collapsed into `variant`. info/success/warning have no direct equivalent. */}
        <ShowcaseSection id="brand-colors" title="Brand Variants">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger-soft">Danger Soft</Button>
            </Flex>
            <CodeBlock
              code={`<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-soft">Danger Soft</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `variant="soft"` removed; closest match is `secondary` / `danger-soft`. */}
        <ShowcaseSection id="soft-style" title="Soft Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="secondary">Secondary (soft)</Button>
              <Button variant="danger-soft">Danger Soft</Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="secondary">Secondary (soft)</Button>
<Button variant="danger-soft">Danger Soft</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outline-style" title="Outline Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="outline">Outline</Button>
            </Flex>
            <CodeBlock code={`<Button variant="outline">Outline</Button>`} />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `variant="dash"` removed; no replacement, falling back to outline. */}
        <ShowcaseSection id="dash-style" title="Dash Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="outline">Outline (replaces dash)</Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="outline">Outline (replaces dash)</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `active` prop removed; consumers should toggle classes/aria-pressed themselves. */}
        <ShowcaseSection id="active-buttons" title="Active Buttons">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button aria-pressed="true">Default</Button>
              <Button variant="primary" aria-pressed="true">
                Primary
              </Button>
              <Button variant="secondary" aria-pressed="true">
                Secondary
              </Button>
              <Button variant="ghost" aria-pressed="true">
                Ghost
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button aria-pressed="true">Default</Button>
<Button variant="primary" aria-pressed="true">Primary</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: info/success/warning colors removed; only danger remains as a semantic variant. */}
        <ShowcaseSection id="state-colors" title="State Colors">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="danger">Danger</Button>
              <Button variant="danger-soft">Danger Soft</Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="danger">Danger</Button>
<Button variant="danger-soft">Danger Soft</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `size="xs"` and `size="xl"` removed; only sm/md/lg supported. */}
        <ShowcaseSection id="button-sizes" title="Button Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button size="lg">Large</Button>
              <Button>Normal</Button>
              <Button size="sm">Small</Button>
            </Flex>
            <CodeBlock
              code={`<Button size="lg">Large</Button>
<Button>Normal</Button>
<Button size="sm">Small</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `responsive` prop removed; handle responsive sizing via class utilities. */}
        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button class="sm:text-xs md:text-sm lg:text-base">
                Responsive
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button class="sm:text-xs md:text-sm lg:text-base">Responsive</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `wide` prop removed; use a utility class for extra horizontal padding. */}
        <ShowcaseSection id="wide" title="Wide">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button class="px-16">Wide</Button>
            </Flex>
            <CodeBlock code={`<Button class="px-16">Wide</Button>`} />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `glass` prop removed; compose with the GlassPanel component or a custom backdrop-blur class. */}
        <ShowcaseSection id="glass" title="Glass">
          <Flex direction="col" gap="md">
            <div
              style={{
                "background-image":
                  "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              }}
            >
              <Flex justify="start" align="start">
                <Button class="bg-white/20 backdrop-blur-md border border-white/30">
                  Glass button
                </Button>
              </Flex>
            </div>
            <CodeBlock
              code={`<Button class="bg-white/20 backdrop-blur-md border border-white/30">Glass button</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `as` polymorphic prop removed; render the underlying element directly when you need <a> or <input>. */}
        <ShowcaseSection id="html-tags" title="Different HTML Tags">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <a class="button button--primary button--md" role="button" href="#">
                Link
              </a>
              <Button type="submit">Button</Button>
              <input
                class="button button--primary button--md"
                type="button"
                value="Input"
              />
              <input
                class="button button--primary button--md"
                type="submit"
                value="Submit"
              />
              <input
                class="button button--primary button--md"
                type="reset"
                value="Reset"
              />
            </Flex>
            <CodeBlock
              code={`<a class="button button--primary button--md" role="button" href="#">Link</a>
<Button type="submit">Button</Button>
<input class="button button--primary button--md" type="button" value="Input" />
<input class="button button--primary button--md" type="submit" value="Submit" />
<input class="button button--primary button--md" type="reset" value="Reset" />`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: native `disabled` removed from the Button type; use `isDisabled` instead. */}
        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button isDisabled>Disabled using prop</Button>
              <Button
                class="opacity-50 pointer-events-none"
                tabIndex={-1}
                aria-disabled="true"
              >
                Disabled using class name
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button isDisabled>Disabled using prop</Button>
<Button class="opacity-50 pointer-events-none" tabIndex={-1} aria-disabled="true">
  Disabled using class name
</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `shape="square"` removed; use `isIconOnly` for square icon buttons. */}
        <ShowcaseSection id="square" title="Square Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button isIconOnly>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
              <Button isIconOnly variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button isIconOnly>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</Button>
<Button isIconOnly variant="outline">
  {/* ... */}
</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `shape="circle"` removed; add `rounded-full` to an icon-only button. */}
        <ShowcaseSection id="circle" title="Circle Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button isIconOnly class="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
              <Button isIconOnly variant="outline" class="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button isIconOnly class="rounded-full">
  {/* ... */}
</Button>
<Button isIconOnly variant="outline" class="rounded-full">
  {/* ... */}
</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icon-start" title="Icon at Start">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
              >
                Button
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button startIcon={<svg .../>}>Button</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icon-end" title="Icon at End">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
              >
                Button
              </Button>
            </Flex>
            <CodeBlock code={`<Button endIcon={<svg .../>}>Button</Button>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="block" title="Block Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button fullWidth>Block</Button>
            </Flex>
            <CodeBlock code={`<Button fullWidth>Block</Button>`} />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `loading` prop renamed to `isPending`. */}
        <ShowcaseSection id="loading" title="Loading States">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button isPending isIconOnly />
              <Button isPending>loading</Button>
            </Flex>
            <CodeBlock
              code={`<Button isPending isIconOnly />
<Button isPending>loading</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `animation` prop removed; click animations are no longer toggleable per-button. */}
        <ShowcaseSection id="no-animation" title="Without Animation">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button class="transition-none active:scale-100">
                I don't have click animation
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button class="transition-none active:scale-100">I don't have click animation</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        {/* TODO[ui-1.2.2]: `Button<"a">` polymorphic generic removed; render an <a> with button classes instead. */}
        <ShowcaseSection id="link" title="Link Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <a
                class="button button--primary button--md"
                role="button"
                target="_blank"
                rel="noopener"
                href="https://daisyui.com/"
              >
                Link
              </a>
            </Flex>
            <CodeBlock
              code={`<a class="button button--primary button--md" role="button" target="_blank" rel="noopener" href="https://daisyui.com/">
  Link
</a>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={buttonProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
