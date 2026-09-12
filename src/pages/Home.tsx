import { Component } from "solid-js";
import { Button, Card, Chip, Flex, Icon, Text } from "@pathscale/ui";
import { ContentContainer } from "../components/content/ContentContainer";
import { ROUTES } from "../config/routes";

const Home: Component = () => {
  return (
    <div>
      {/* 24x.ai's hero is the page itself: flat `base-100`, no wash, and the
          accent reserved for the things you can act on. A `from-primary`
          gradient across 80vh spends the accent on the background, which is
          exactly the budget the rest of the page needs to have any contrast
          left. */}
      <div class="min-h-[80vh] bg-base-100 flex items-center justify-center">
        <div class="w-full">
          <ContentContainer maxWidth="xl" prose={false} class="text-center">
            <Card variant="plain" padding="lg" class="border-0 bg-transparent">
              <div class="mb-8">
                <Chip class="mb-6 px-4 py-2">
                  <Icon src="icon-[lucide--shield-check]" class="w-4 h-4 mr-2" />
                  SolidJS components powered by Solid Layouts
                </Chip>
              </div>

              <Text as="h1" class="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                Build Exceptional UI/
              </Text>

              <p class="text-xl lg:text-2xl text-base-content/70 mb-12 max-w-4xl mx-auto leading-relaxed">
                A type-safe component library that keeps reusable presentation in
                recipes, exposes semantic parameters at the call site, and compiles
                to fast, ordinary SolidJS.
              </p>

              <Flex gap="lg" justify="center" wrap="wrap" class="mb-16">
                <Button href={ROUTES.DOCS_INSTALLATION} flavor="primary" size="lg">
                  Start Building Today
                </Button>
                <Button href={ROUTES.SHOWCASES} variant="outline" size="lg">
                  Explore Components
                </Button>
                <Button href={ROUTES.DOCS_USAGE} variant="ghost" size="lg">
                  Usage Cheatsheet
                </Button>
                <Button href={ROUTES.DOCS_LAYOUTS} variant="ghost" size="lg">
                  How Layouts work
                </Button>
              </Flex>

              <div class="text-center">
                <p class="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">
                  TRUSTED BY DEVELOPERS EVERYWHERE
                </p>
                <Flex
                  justify="center"
                  align="center"
                  gap="xl"
                  wrap="wrap"
                  class="opacity-60"
                >
                  <div class="text-lg font-bold text-base-content/70">SolidJS</div>
                  <div class="text-lg font-bold text-base-content/70">
                    Solid Layouts
                  </div>
                  <div class="text-lg font-bold text-base-content/70">TypeScript</div>
                  <div class="text-lg font-bold text-base-content/70">Rsbuild</div>
                </Flex>
              </div>
            </Card>
          </ContentContainer>
        </div>
      </div>

      <ContentContainer maxWidth="xl" prose={false}>
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            Modern Components for Modern Development
          </h2>
          <p class="text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
            Elevate your development workflow with our comprehensive suite of
            components. Each element is thoughtfully designed, rigorously
            tested, and built with accessibility and performance in mind.
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3 mb-24">
          <Card variant="plain" padding="lg" isInteractive>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon src="icon-[lucide--zap]" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p class="text-base-content/70 leading-relaxed">
                Powered by SolidJS's fine-grained reactivity for exceptional
                performance. Enjoy minimal bundle sizes and instant updates
                without virtual DOM overhead.
              </p>
            </div>
          </Card>

          <Card variant="plain" padding="lg" isInteractive>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon src="icon-[lucide--circle-check]" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Type-Safe by Design</h3>
              <p class="text-base-content/70 leading-relaxed">
                Built from the ground up with TypeScript for rock-solid
                reliability. Catch errors early with comprehensive type
                definitions and intelligent autocompletion.
              </p>
            </div>
          </Card>

          <Card variant="plain" padding="lg" role="article" aria-label="Developer Friendly">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon src="icon-[lucide--heart]" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Developer Friendly</h3>
              <p class="text-base-content/70 leading-relaxed">
                Intuitive API design with comprehensive documentation and
                examples. Built by developers, for developers.
              </p>
            </div>
          </Card>
        </div>

        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-8">See it in action</h2>
          <p class="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
            Every component in @pathscale/ui is battle-tested and ready for
            production. Explore our comprehensive showcase to see what's
            possible.
          </p>

          <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
            <Card variant="plain" padding="md" isInteractive>
              <h3 class="font-bold text-lg mb-3 text-primary">
                Visual Testing
              </h3>
              <p class="text-base-content/70">
                Consistent design tokens and theming system across all
                components
              </p>
            </Card>
            <Card variant="plain" padding="md" role="article" aria-label="Accessibility">
              <h3 class="font-bold text-lg mb-3 text-secondary">
                Accessibility
              </h3>
              <p class="text-base-content/70">
                WCAG compliant components with keyboard navigation and screen
                reader support
              </p>
            </Card>
            <Card variant="plain" padding="md" isInteractive>
              <h3 class="font-bold text-lg mb-3 text-accent">Interactive</h3>
              <p class="text-base-content/70">
                Rich interactions and animations built-in, no external
                dependencies
              </p>
            </Card>
          </div>

          <Button href={ROUTES.SHOWCASES} flavor="primary" size="lg">
            Explore all components
          </Button>
        </div>

        <Card variant="plain" padding="lg" class="border-0 bg-transparent">
          <div class="text-center py-16">
            <h2 class="text-4xl lg:text-5xl font-bold mb-6">
              Start building amazing UIs today
            </h2>
            <p class="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
              Join thousands of developers who trust @pathscale/ui for their
              projects. Get started in minutes, not hours.
            </p>
            <Flex gap="lg" justify="center" wrap="wrap">
              <Button href={ROUTES.DOCS_INSTALLATION} flavor="primary" size="lg">
                Get started for free
              </Button>
              <Button href={ROUTES.DOCS} variant="outline" size="lg">
                View documentation
              </Button>
            </Flex>
          </div>
        </Card>
      </ContentContainer>
    </div>
  );
};

export default Home;
