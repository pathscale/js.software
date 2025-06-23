import { Button, Card, Flex, Form, Hero, Input, Link } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function HeroShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "figure", title: "With Figure" },
    { id: "form", title: "With Form" },
    { id: "overlay", title: "With Overlay" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for `class`, useful in JSX environments",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "minHeight",
      type: "string",
      description:
        "Custom min-height for the hero container (e.g., `30rem`, `100vh`)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles for the container",
    },
  ];

  const contentProps = [
    {
      name: "center",
      type: "boolean",
      default: "false",
      description: "Center content horizontally with `text-center`",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  const overlayProps = [
    {
      name: "bgOpacity",
      type: "string",
      description:
        "Sets background overlay opacity (0 to 1 as string, e.g., '0.6')",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Hero class="bg-base-200 min-h-[30rem]">
              <Hero.Content center>
                <div class="max-w-md">
                  <h1 class="text-5xl font-bold">Hello there</h1>
                  <p class="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <Button color="primary">Get Started</Button>
                </div>
              </Hero.Content>
            </Hero>
            <CodeBlock
              code={`<Hero class="bg-base-200 min-h-[30rem]">
  <Hero.Content center>
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">...</p>
      <Button color="primary">Get Started</Button>
    </div>
  </Hero.Content>
</Hero>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="figure" title="With Figure">
          <Flex direction="col" gap="md">
            <Hero class="bg-base-200 min-h-[30rem]">
              <Hero.Content>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  class="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                  <h1 class="text-5xl font-bold">Box Office News!</h1>
                  <p class="py-6">...</p>
                  <Button color="primary">Get Started</Button>
                </div>
              </Hero.Content>
            </Hero>
            <CodeBlock
              code={`<Hero class="bg-base-200 min-h-[30rem]">
  <Hero.Content>
    <img src="..." class="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-5xl font-bold">Box Office News!</h1>
      <p class="py-6">...</p>
      <Button color="primary">Get Started</Button>
    </div>
  </Hero.Content>
</Hero>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="form" title="With Form">
          <Flex direction="col" gap="md">
            <Hero class="bg-base-200 min-h-[30rem]">
              <Hero.Content class="flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold">Login now!</h1>
                  <p class="py-6">...</p>
                </div>
                <Card class="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <Card.Body>
                    <Form>
                      <Form.Label title="Email" />
                      <Input
                        type="text"
                        placeholder="email"
                        class="input-bordered"
                      />
                    </Form>
                    <Form>
                      <Form.Label title="Password" />
                      <Input
                        type="text"
                        placeholder="password"
                        class="input-bordered"
                      />
                      <label class="label">
                        <Link href="#" class="label-text-alt" hover>
                          Forgot password?
                        </Link>
                      </label>
                    </Form>
                    <Form class="mt-6">
                      <Button>Login</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Hero.Content>
            </Hero>
            <CodeBlock
              code={`<Hero class="bg-base-200 min-h-[30rem]">
  <Hero.Content class="flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">...</p>
    </div>
    <Card class="...">
      <Card.Body>
        <Form>...</Form>
      </Card.Body>
    </Card>
  </Hero.Content>
</Hero>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="overlay" title="With Overlay">
          <Flex direction="col" gap="md">
            <Hero
              class="min-h-[30rem]"
              style={{
                "background-image":
                  "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              }}
            >
              <Hero.Overlay bgOpacity="0.6" />
              <Hero.Content center>
                <div class="max-w-md">
                  <h1 class="text-5xl font-bold">Hello there</h1>
                  <p class="py-6">...</p>
                  <Button color="primary">Get Started</Button>
                </div>
              </Hero.Content>
            </Hero>
            <CodeBlock
              code={`<Hero
  class="min-h-[30rem]"
  style={{ "background-image": "url(...)" }}
>
  <Hero.Overlay bgOpacity="0.6" />
  <Hero.Content center>
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">...</p>
      <Button color="primary">Get Started</Button>
    </div>
  </Hero.Content>
</Hero>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-semibold mb-2">Hero</h3>
          <PropsTable props={props} />

          <h3 class="text-lg font-semibold mt-6 mb-2">Hero.Content</h3>
          <PropsTable props={contentProps} />

          <h3 class="text-lg font-semibold mt-6 mb-2">Hero.Overlay</h3>
          <PropsTable props={overlayProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
