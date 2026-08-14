import { Component } from "solid-js";
import { Card, Chip, Flex } from "@pathscale/ui";
import { ContentContainer } from "../components/content/ContentContainer";
import {
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineHeart,
} from "solid-icons/hi";
import { ROUTES } from "../config/routes";

const Home: Component = () => {
  return (
    <div>
      <div class="min-h-[80vh] bg-gradient-to-br from-primary to-base-200 flex items-center justify-center">
        <div class="w-full">
          <ContentContainer maxWidth="xl" prose={false} class="text-center">
            <Card material="glass" padding="lg" flavor="secondary">
              <div class="mb-8">
                <Chip class="mb-6 px-4 py-2">
                  <HiOutlineShieldCheck class="w-4 h-4 mr-2" />
                  SolidJS components powered by Solid Layouts
                </Chip>
              </div>

              <h1 class="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                Build Exceptional UIs with{" "}
                <span class="text-primary">JS.Software UI</span>
              </h1>

              <p class="text-xl lg:text-2xl text-base-content/70 mb-12 max-w-4xl mx-auto leading-relaxed">
                A type-safe component library that keeps reusable presentation in
                recipes, exposes semantic parameters at the call site, and compiles
                to fast, ordinary SolidJS.
              </p>

              <Flex gap="lg" justify="center" wrap="wrap" class="mb-16">
                <a href={ROUTES.DOCS_INSTALLATION} class="btn btn-primary btn-lg">
                  Start Building Today
                </a>
                <a href={ROUTES.SHOWCASES} class="btn btn-outline btn-lg">
                  Explore Components
                </a>
                <a href={ROUTES.DOCS_USAGE} class="btn btn-ghost btn-lg">
                  Usage Cheatsheet
                </a>
                <a href={ROUTES.DOCS_LAYOUTS} class="btn btn-ghost btn-lg">
                  How Layouts work
                </a>
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
                  <div class="text-lg font-bold text-base-content/70">DaisyUI</div>
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
          <Card material="glass" padding="lg" flavor="secondary" isInteractive>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineBolt class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p class="text-base-content/70 leading-relaxed">
                Powered by SolidJS's fine-grained reactivity for exceptional
                performance. Enjoy minimal bundle sizes and instant updates
                without virtual DOM overhead.
              </p>
            </div>
          </Card>

          <Card material="glass" padding="lg" flavor="secondary" isInteractive>
            <div class="text-center">
              <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineCheckCircle class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Type-Safe by Design</h3>
              <p class="text-base-content/70 leading-relaxed">
                Built from the ground up with TypeScript for rock-solid
                reliability. Catch errors early with comprehensive type
                definitions and intelligent autocompletion.
              </p>
            </div>
          </Card>

          <Card material="glass" padding="lg" flavor="secondary" isInteractive>
            <div class="text-center">
              <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineHeart class="w-8 h-8 text-white" />
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
            <Card material="glass" padding="md" flavor="secondary" isInteractive>
              <h3 class="font-bold text-lg mb-3 text-primary">
                Visual Testing
              </h3>
              <p class="text-base-content/70">
                Consistent design tokens and theming system across all
                components
              </p>
            </Card>
            <Card material="glass" padding="md" flavor="secondary" isInteractive>
              <h3 class="font-bold text-lg mb-3 text-secondary">
                Accessibility
              </h3>
              <p class="text-base-content/70">
                WCAG compliant components with keyboard navigation and screen
                reader support
              </p>
            </Card>
            <Card material="glass" padding="md" flavor="secondary" isInteractive>
              <h3 class="font-bold text-lg mb-3 text-accent">Interactive</h3>
              <p class="text-base-content/70">
                Rich interactions and animations built-in, no external
                dependencies
              </p>
            </Card>
          </div>

          <a href={ROUTES.SHOWCASES} class="btn btn-primary btn-lg">
            Explore all components
          </a>
        </div>

        <Card material="glass" padding="lg" flavor="secondary">
          <div class="text-center py-16">
            <h2 class="text-4xl lg:text-5xl font-bold mb-6">
              Start building amazing UIs today
            </h2>
            <p class="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
              Join thousands of developers who trust @pathscale/ui for their
              projects. Get started in minutes, not hours.
            </p>
            <Flex gap="lg" justify="center" wrap="wrap">
              <a href={ROUTES.DOCS_INSTALLATION} class="btn btn-primary btn-lg">
                Get started for free
              </a>
              <a href={ROUTES.DOCS} class="btn btn-outline btn-lg">
                View documentation
              </a>
            </Flex>
          </div>
        </Card>
      </ContentContainer>
    </div>
  );
};

export default Home;
