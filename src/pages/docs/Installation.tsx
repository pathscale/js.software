import { Component } from "solid-js";
import { ContentContainer } from "../../components/content/ContentContainer";
import { CodeBlock } from "../../components/showcase/CodeBlock";
import { Flex } from "@pathscale/ui";
import { Callout } from "../../components/content/Callout";
import { ROUTES } from "../../config/routes";

const Installation: Component = () => {
  return (
    <ContentContainer maxWidth="2xl" prose={false}>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Installation</h1>
        <p class="text-xl text-base-content/70 leading-relaxed max-w-3xl">
          Get started with JS.Software UI to create stunning, accessible, and
          performant user interfaces. This guide will walk you through the setup
          process and essential configuration steps.
        </p>
      </div>

      <section class="mb-8">
        <h2 class="text-3xl font-semibold mb-4">Prerequisites</h2>
        <Callout type="info" title="Required Dependencies">
          <p class="mb-4">
            To ensure optimal compatibility and performance, please verify you
            have these core dependencies installed:
          </p>
          <ul class="space-y-2 pl-4">
            <li>• SolidJS ^1.8.0 - Our reactive foundation</li>
            <li>• TailwindCSS ^3.0.0 - For utility-first styling</li>
            <li>
              • TypeScript (recommended) - For enhanced type safety and
              developer experience
            </li>
          </ul>
        </Callout>
      </section>

      <section class="mb-8">
        <h2 class="text-3xl font-semibold mb-4">Installation</h2>
        <p class="text-lg text-base-content/70 mb-6 max-w-3xl">
          Choose your preferred package manager to install JS.Software UI. We
          support all major package managers for your convenience:
        </p>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-medium mb-3">Using NPM</h3>
            <CodeBlock language="bash" code="npm install @pathscale/ui" />
          </div>

          <div>
            <h3 class="text-xl font-medium mb-3">Using Yarn</h3>
            <CodeBlock language="bash" code="yarn add @pathscale/ui" />
          </div>

          <div>
            <h3 class="text-xl font-medium mb-3">Using PNPM</h3>
            <CodeBlock language="bash" code="pnpm add @pathscale/ui" />
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6">Setup</h2>

        <div class="mb-8">
          <h3 class="text-xl font-medium mb-3">1. Import Styles</h3>
          <p class="text-base-content/70 mb-4">
            Import the required styles in your main entry file (e.g., main.tsx
            or App.tsx):
          </p>
          <CodeBlock
            language="typescript"
            code={`import "@pathscale/ui/styles.css";`}
          />
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-medium mb-3">2. Configure TailwindCSS</h3>
          <p class="text-base-content/70 mb-4">
            Add our preset to your tailwind.config.js:
          </p>
          <CodeBlock
            language="javascript"
            code={`module.exports = {
  presets: [require("@pathscale/ui/tailwind")],
  // ... your config
};`}
          />
        </div>

        <div>
          <h3 class="text-xl font-medium mb-3">3. Start Using Components</h3>
          <p class="text-base-content/70 mb-4">
            Import and use components in your application:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Button, Card } from "@pathscale/ui";

function App() {
  return (
    <Card>
      <Card.Body>
        <h2>Welcome!</h2>
        <Button color="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}`}
          />
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-6">Next Steps</h2>
        <Flex gap="lg" wrap="wrap">
          <a href={ROUTES.SHOWCASES} class="btn btn-primary">
            Explore Components
          </a>
          <a href={ROUTES.THEMING} class="btn btn-outline">
            Customize Theme
          </a>
          <a href={ROUTES.DOCS} class="btn btn-outline">
            View Documentation
          </a>
        </Flex>
      </section>
    </ContentContainer>
  );
};

export default Installation;
