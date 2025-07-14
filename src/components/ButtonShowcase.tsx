import ShowcaseLayout from "./ShowcaseLayout";
import { Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ButtonShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "brand-colors", title: "Brand Colors" },
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
      type: '"soft" | "dash" | "outline" | "link"',
      default: "undefined",
      description: "The visual style variant of the button",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost"',
      default: "undefined",
      description: "The color scheme of the button",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: "undefined",
      description: "The size of the button",
    },
    {
      name: "shape",
      type: '"circle" | "square"',
      default: "undefined",
      description: "The shape of the button",
    },
    {
      name: "glass",
      type: "boolean",
      default: "false",
      description: "Whether to apply a glass effect to the button",
    },
    {
      name: "wide",
      type: "boolean",
      default: "false",
      description: "Whether the button should be wider than normal",
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      description: "Whether the button should take up the full width",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description:
        "Whether the button should be responsive (changes size based on screen size)",
    },
    {
      name: "animation",
      type: "boolean",
      default: "true",
      description: "Whether to show click animations",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Whether the button is in a loading state",
    },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether the button is in an active state",
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
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the button is disabled",
    },
    {
      name: "as",
      type: "ElementType",
      default: '"button"',
      description: "The HTML element to render as",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
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

        <ShowcaseSection id="brand-colors" title="Brand Colors">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button>Default</Button>
              <Button color="neutral">Neutral</Button>
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="accent">Accent</Button>
              <Button color="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </Flex>
            <CodeBlock
              code={`<Button>Default</Button>
<Button color="neutral">Neutral</Button>
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="accent">Accent</Button>
<Button color="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="soft-style" title="Soft Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="soft">Default</Button>
              <Button variant="soft" color="primary">
                Primary
              </Button>
              <Button variant="soft" color="secondary">
                Secondary
              </Button>
              <Button variant="soft" color="accent">
                Accent
              </Button>
              <Button variant="soft" color="info">
                Info
              </Button>
              <Button variant="soft" color="success">
                Success
              </Button>
              <Button variant="soft" color="warning">
                Warning
              </Button>
              <Button variant="soft" color="error">
                Error
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="soft">Default</Button>
<Button variant="soft" color="primary">Primary</Button>
<Button variant="soft" color="secondary">Secondary</Button>
<Button variant="soft" color="accent">Accent</Button>
<Button variant="soft" color="info">Info</Button>
<Button variant="soft" color="success">Success</Button>
<Button variant="soft" color="warning">Warning</Button>
<Button variant="soft" color="error">Error</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="outline-style" title="Outline Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="outline">Default</Button>
              <Button variant="outline" color="primary">
                Primary
              </Button>
              <Button variant="outline" color="secondary">
                Secondary
              </Button>
              <Button variant="outline" color="accent">
                Accent
              </Button>
              <Button variant="outline" color="info">
                Info
              </Button>
              <Button variant="outline" color="success">
                Success
              </Button>
              <Button variant="outline" color="warning">
                Warning
              </Button>
              <Button variant="outline" color="error">
                Error
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="outline">Default</Button>
<Button variant="outline" color="primary">Primary</Button>
<Button variant="outline" color="secondary">Secondary</Button>
<Button variant="outline" color="accent">Accent</Button>
<Button variant="outline" color="info">Info</Button>
<Button variant="outline" color="success">Success</Button>
<Button variant="outline" color="warning">Warning</Button>
<Button variant="outline" color="error">Error</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="dash-style" title="Dash Style">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button variant="dash">Default</Button>
              <Button variant="dash" color="primary">
                Primary
              </Button>
              <Button variant="dash" color="secondary">
                Secondary
              </Button>
              <Button variant="dash" color="accent">
                Accent
              </Button>
              <Button variant="dash" color="info">
                Info
              </Button>
              <Button variant="dash" color="success">
                Success
              </Button>
              <Button variant="dash" color="warning">
                Warning
              </Button>
              <Button variant="dash" color="error">
                Error
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button variant="dash">Default</Button>
<Button variant="dash" color="primary">Primary</Button>
<Button variant="dash" color="secondary">Secondary</Button>
<Button variant="dash" color="accent">Accent</Button>
<Button variant="dash" color="info">Info</Button>
<Button variant="dash" color="success">Success</Button>
<Button variant="dash" color="warning">Warning</Button>
<Button variant="dash" color="error">Error</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="active-buttons" title="Active Buttons">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button active>Default</Button>
              <Button active color="neutral">
                Neutral
              </Button>
              <Button active color="primary">
                Primary
              </Button>
              <Button active color="secondary">
                Secondary
              </Button>
              <Button active color="accent">
                Accent
              </Button>
              <Button active color="ghost">
                Ghost
              </Button>
              <Button active variant="link">
                Link
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button active>Default</Button>
<Button active color="neutral">Neutral</Button>
<Button active color="primary">Primary</Button>
<Button active color="secondary">Secondary</Button>
<Button active color="accent">Accent</Button>
<Button active color="ghost">Ghost</Button>
<Button active variant="link">Link</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="state-colors" title="State Colors">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button color="info">Info</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="error">Error</Button>
            </Flex>
            <CodeBlock
              code={`<Button color="info">Info</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="button-sizes" title="Button Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button size="lg">Large</Button>
              <Button>Normal</Button>
              <Button size="sm">Small</Button>
              <Button size="xs">Tiny</Button>
            </Flex>
            <CodeBlock
              code={`<Button size="lg">Large</Button>
<Button>Normal</Button>
<Button size="sm">Small</Button>
<Button size="xs">Tiny</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button responsive>Responsive</Button>
            </Flex>
            <CodeBlock code={`<Button responsive>Responsive</Button>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="wide" title="Wide">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button wide>Wide</Button>
            </Flex>
            <CodeBlock code={`<Button wide>Wide</Button>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="glass" title="Glass">
          <Flex direction="col" gap="md">
            <div
              style={{
                "background-image":
                  "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              }}
            >
              <Flex justify="start" align="start">
                <Button glass>Glass button</Button>
              </Flex>
            </div>
            <CodeBlock code={`<Button glass>Glass button</Button>`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="html-tags" title="Different HTML Tags">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button as="a" role="button">
                Link
              </Button>
              <Button type="submit">Button</Button>
              <Button as="input" type="button" value="Input" />
              <Button as="input" type="submit" value="Submit" />
              <Button as="button" type="button" aria-label="Radio" />
              <Button as="button" type="button" aria-label="Checkbox" />
              <Button as="input" type="reset" value="Reset" />
            </Flex>
            <CodeBlock
              code={`<Button as="a" role="button">Link</Button>
<Button type="submit">Button</Button>
<Button as="input" type="button" value="Input" />
<Button as="input" type="submit" value="Submit" />
<Button as="button" type="button" aria-label="Radio" />
<Button as="button" type="button" aria-label="Checkbox" />
<Button as="input" type="reset" value="Reset" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button disabled>Disabled using attribute</Button>
              <Button
                class="btn btn-disabled"
                tabIndex={-1}
                role="button"
                aria-disabled="true"
              >
                Disabled using class name
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button disabled>Disabled using attribute</Button>
<Button
  class="btn btn-disabled"
  tabIndex={-1}
  role="button"
  aria-disabled="true"
>
  Disabled using class name
</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="square" title="Square Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button shape="square">
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
              <Button shape="square" variant="outline">
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
              code={`<Button shape="square">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</Button>
<Button shape="square" variant="outline">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="circle" title="Circle Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button shape="circle">
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
              <Button shape="circle" variant="outline">
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
              code={`<Button shape="circle">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</Button>
<Button shape="circle" variant="outline">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
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
              code={`<Button
  startIcon={
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  }
>
  Button
</Button>`}
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
            <CodeBlock
              code={`<Button
  endIcon={
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  }
>
  Button
</Button>`}
            />
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

        <ShowcaseSection id="loading" title="Loading States">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button loading shape="square" />
              <Button loading>loading</Button>
            </Flex>
            <CodeBlock
              code={`<Button loading shape="square" />
<Button loading>loading</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="no-animation" title="Without Animation">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Button animation={false}>I don't have click animation</Button>
            </Flex>
            <CodeBlock
              code={`<Button animation={false}>I don't have click animation</Button>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="link" title="Link Button">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Button<"a">
                as="a"
                target="_blank"
                rel="noopener"
                href="https://daisyui.com/"
              >
                Link
              </Button>
            </Flex>
            <CodeBlock
              code={`<Button<"a"> as="a" target="_blank" rel="noopener" href="https://daisyui.com/">
    Link
  </Button>`}
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
