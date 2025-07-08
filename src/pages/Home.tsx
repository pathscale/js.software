import { Component } from "solid-js";
import { Hero, Card, Flex, Badge } from "@pathscale/ui";
import { ContentContainer } from "../components/content/ContentContainer";
import {
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineHeart,
} from "solid-icons/hi";

const Home: Component = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero class="min-h-[80vh] bg-gradient-to-br from-primary to-base-200">
        <Hero.Content center>
          <ContentContainer maxWidth="xl" prose={false} className="text-center">
            <div class="mb-8">
              <Badge color="primary" class="mb-6 px-4 py-2">
                <HiOutlineShieldCheck class="w-4 h-4 mr-2" />
                Crafted with SolidJS & Modern Web Standards
              </Badge>
            </div>

            <h1 class="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Build Exceptional UIs with{" "}
              <span class="text-primary">JS.Software UI</span>
            </h1>

            <p class="text-xl lg:text-2xl text-base-content/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              A meticulously crafted UI component library that combines the
              power of SolidJS with the flexibility of TailwindCSS. Create
              stunning, accessible, and high-performance interfaces with
              components designed for the modern web.
            </p>

            <Flex gap="lg" justify="center" wrap="wrap" class="mb-16">
              <a href="/docs/installation" class="btn btn-primary btn-lg">
                Start Building Today
              </a>
              <a href="/docs/components" class="btn btn-outline btn-lg">
                Explore Components
              </a>
            </Flex>

            {/* Trust indicators */}
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
                <div class="text-lg font-bold text-base-content/70">
                  SolidJS
                </div>
                <div class="text-lg font-bold text-base-content/70">
                  TailwindCSS
                </div>
                <div class="text-lg font-bold text-base-content/70">
                  TypeScript
                </div>
                <div class="text-lg font-bold text-base-content/70">
                  DaisyUI
                </div>
                <div class="text-lg font-bold text-base-content/70">Vite</div>
              </Flex>
            </div>
          </ContentContainer>
        </Hero.Content>
      </Hero>

      {/* Features Section */}
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
          <Card class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <Card.Body class="text-center p-8">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineBolt class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p class="text-base-content/70 leading-relaxed">
                Powered by SolidJS's fine-grained reactivity for exceptional
                performance. Enjoy minimal bundle sizes and instant updates
                without virtual DOM overhead.
              </p>
            </Card.Body>
          </Card>

          <Card class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <Card.Body class="text-center p-8">
              <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineCheckCircle class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Type-Safe by Design</h3>
              <p class="text-base-content/70 leading-relaxed">
                Built from the ground up with TypeScript for rock-solid
                reliability. Catch errors early with comprehensive type
                definitions and intelligent autocompletion.
              </p>
            </Card.Body>
          </Card>

          <Card class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <Card.Body class="text-center p-8">
              <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineHeart class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">Developer Friendly</h3>
              <p class="text-base-content/70 leading-relaxed">
                Intuitive API design with comprehensive documentation and
                examples. Built by developers, for developers.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Component Preview Section */}
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-8">See it in action</h2>
          <p class="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
            Every component in @pathscale/ui is battle-tested and ready for
            production. Explore our comprehensive showcase to see what's
            possible.
          </p>

          <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
            <div class="card bg-base-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="font-bold text-lg mb-3 text-primary">
                Visual Testing
              </h3>
              <p class="text-base-content/70">
                Consistent design tokens and theming system across all
                components
              </p>
            </div>
            <div class="card bg-base-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="font-bold text-lg mb-3 text-secondary">
                Accessibility
              </h3>
              <p class="text-base-content/70">
                WCAG compliant components with keyboard navigation and screen
                reader support
              </p>
            </div>
            <div class="card bg-base-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="font-bold text-lg mb-3 text-accent">Interactive</h3>
              <p class="text-base-content/70">
                Rich interactions and animations built-in, no external
                dependencies
              </p>
            </div>
          </div>

          <a href="/docs/components" class="btn btn-primary btn-lg">
            Explore all components
          </a>
        </div>

        {/* CTA Section */}
        <div class="text-center py-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl card">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            Start building amazing UIs today
          </h2>
          <p class="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
            Join thousands of developers who trust @pathscale/ui for their
            projects. Get started in minutes, not hours.
          </p>
          <Flex gap="lg" justify="center" wrap="wrap">
            <a href="/docs/installation" class="btn btn-primary btn-lg">
              Get started for free
            </a>
            <a href="/docs" class="btn btn-outline btn-lg">
              View documentation
            </a>
          </Flex>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Home;
