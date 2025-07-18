import { Component } from "solid-js";
import { Card, Flex } from "@pathscale/ui";
import { ContentContainer } from "../../components/content/ContentContainer";
import { CodeBlock } from "../../components/showcase/CodeBlock";
import { Callout } from "../../components/content/Callout";
import { ROUTES, EXTERNAL_ROUTES } from "../../config/routes";

const DocsIndex: Component = () => {
  return (
    <ContentContainer maxWidth="2xl" prose={false}>
      <div class="mb-12">
        <h1 id="introduction" class="text-5xl font-bold mb-6 ">
          JS.Software UI
        </h1>
        <p class="text-xl text-base-content/70 leading-relaxed">
          A modern, type-safe UI component library crafted with SolidJS and
          TailwindCSS. Build exceptional user interfaces with our meticulously
          designed components that prioritize developer experience,
          accessibility, and performance.
        </p>
      </div>

      <section class="mb-16">
        <h2 id="quick-start" class="text-3xl font-semibold mb-6 ">
          Quick Start
        </h2>
        <p class="text-base-content/70 mb-6 leading-relaxed">
          Start building beautiful applications with JS.Software UI in minutes.
          Our components are designed to work seamlessly together, providing a
          consistent and delightful development experience.
        </p>

        <Callout type="info" title="Prerequisites" className="mb-6">
          Before getting started, ensure you have a SolidJS project with
          TailwindCSS configured. New to the setup? Check out our{" "}
          <a
            href={ROUTES.DOCS_INSTALLATION}
            class="text-primary hover:underline"
          >
            comprehensive installation guide
          </a>{" "}
          for detailed instructions.
        </Callout>
      </section>

      <section class="mb-16">
        <h2 id="installation" class="text-3xl font-semibold mb-6 ">
          Installation
        </h2>
        <p class="text-base-content/70 mb-6 leading-relaxed">
          Get started quickly with a simple npm install:
        </p>

        <CodeBlock code="npm install @pathscale/ui" language="bash" copyable={true} className="mb-6" />
        
        <Callout type="info" title="Complete Setup Guide" className="mb-6">
          For detailed installation instructions, prerequisites, and configuration steps, 
          check out our comprehensive{" "}
          <a
            href={ROUTES.DOCS_INSTALLATION}
            class="text-primary hover:underline font-medium"
          >
            installation guide
          </a>
          .
        </Callout>
      </section>

      <section class="mb-16">
        <h2 id="usage" class="text-3xl font-semibold mb-6 ">
          Basic Usage
        </h2>
        <p class="text-base-content/70 mb-6 leading-relaxed">
          Import and use components in your SolidJS application:
        </p>

        <CodeBlock
          code={`import { Button, Card, Flex } from "@pathscale/ui";

function App() {
  return (
    <div class="p-8">
      <Card class="max-w-md mx-auto">
        <Card.Body>
          <h2 class="text-2xl font-bold mb-4">Welcome to @pathscale/ui</h2>
          <p class="text-base-content/70 mb-6">
            Start building beautiful interfaces with our component library.
          </p>
          <Flex gap="md">
            <Button color="primary">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </Flex>
        </Card.Body>
      </Card>
    </div>
  );
}`}
          language="tsx"
        />

        <Callout type="success" title="That's it!" className="mb-6">
          You're now ready to build amazing UIs with @pathscale/ui. The
          components come with built-in styling, accessibility features, and
          TypeScript support.
        </Callout>
      </section>

      <section class="mb-16">
        <h2 id="examples" class="text-3xl font-semibold mb-6 ">
          Examples
        </h2>
        <p class="text-base-content/70 mb-8 leading-relaxed">
          Here are some common patterns and examples to get you started:
        </p>

        <div class="grid gap-8 md:grid-cols-2">
          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4 ">Navigation Bar</h3>
              <p class="text-base-content/70 mb-4">
                Create responsive navigation with our Navbar component
              </p>
              <a
                href={ROUTES.NAVBAR}
                class="text-primary hover:underline font-medium"
              >
                View Navbar docs →
              </a>
            </Card.Body>
          </Card>

          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4 ">Form Controls</h3>
              <p class="text-base-content/70 mb-4">
                Build accessible forms with our input and form components
              </p>
              <a
                href={ROUTES.FORM}
                class="text-primary hover:underline font-medium"
              >
                View Form docs →
              </a>
            </Card.Body>
          </Card>

          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4 ">Layout System</h3>
              <p class="text-base-content/70 mb-4">
                Create responsive layouts with Flex, Grid, and Stack components
              </p>
              <a
                href={ROUTES.FLEX}
                class="text-primary hover:underline font-medium"
              >
                View Layout docs →
              </a>
            </Card.Body>
          </Card>

          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4 ">Theming</h3>
              <p class="text-base-content/70 mb-4">
                Customize colors, fonts, and design tokens for your brand
              </p>
              <a
                href={ROUTES.THEMING}
                class="text-primary hover:underline font-medium"
              >
                View Theming docs →
              </a>
            </Card.Body>
          </Card>
        </div>
      </section>

      <section class="mb-16">
        <h2 id="next-steps" class="text-3xl font-semibold mb-6 ">
          Next Steps
        </h2>
        <p class="text-base-content/70 mb-8 leading-relaxed">
          Now that you have @pathscale/ui set up, here are some recommended next
          steps:
        </p>

        <div class="space-y-6">
          <Callout type="note" title="Explore Components">
            Browse our comprehensive{" "}
            <a href={ROUTES.SHOWCASES} class="text-primary hover:underline">
              component library
            </a>{" "}
            to see all available components and their props.
          </Callout>

          <Callout type="info" title="Learn Theming">
            Customize the look and feel with our{" "}
            <a href={ROUTES.THEMING} class="text-primary hover:underline">
              theming system
            </a>{" "}
            to match your brand.
          </Callout>

          <Callout type="success" title="Join the Community">
            Get help and share your creations in our{" "}
            <a
              href={EXTERNAL_ROUTES.GITHUB_DISCUSSIONS}
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
            >
              GitHub Discussions
            </a>{" "}
            or{" "}
            <a
              href={EXTERNAL_ROUTES.DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
            >
              Discord server
            </a>
            .
          </Callout>
        </div>
      </section>

      <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center border border-base-300">
        <h3 class="text-2xl font-bold mb-4 ">
          Ready to build something amazing?
        </h3>
        <p class="text-base-content/70 mb-6">
          Start exploring our components and create beautiful UIs in minutes.
        </p>
        <Flex gap="md" justify="center" wrap="wrap">
          <a
            href={ROUTES.SHOWCASES}
            class="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-all inline-block"
          >
            Browse Components
          </a>
          <a
            href="/docs/examples"
            class="border border-base-300 hover:bg-base-200 px-6 py-3 rounded-lg transition-all inline-block"
          >
            View Examples
          </a>
        </Flex>
      </div>
    </ContentContainer>
  );
};

export default DocsIndex;
