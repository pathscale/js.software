import { Button, Card, Flex } from "@pathscale/ui";
import { ContentContainer } from "../../components/content/ContentContainer";
import { Callout } from "../../components/content/Callout";
import { CodeBlock } from "../../components/showcase/CodeBlock";
import { ROUTES } from "../../config/routes";
import { ActionStatus, createActionStatus } from "../../components/showcase/ActionStatus";

export default function Layouts() {
  const actions = createActionStatus("Choose how to continue the Layouts example.");
  return (
    <ContentContainer maxWidth="2xl" prose={false}>
      <Flex id="layouts-documentation" direction="col" gap="xl">
        <header>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Solid Layouts
          </p>
          <h1 class="mt-3 text-5xl font-bold">Presentation compiled into the component</h1>
          <p class="mt-5 max-w-3xl text-xl leading-relaxed text-base-content/70">
            PathScale UI uses Solid Layouts to keep component recipes in the library and
            presentation choices at the call site. Your application receives ordinary SolidJS
            output before the normal Solid compiler runs.
          </p>
        </header>

        <Card material="glass" flavor="secondary">
          <Flex direction="col" gap="md">
            <h2 class="text-2xl font-semibold">The two compiler passes</h2>
            <CodeBlock
              language="text"
              code={`A = authored UI/ Layout templates
B = Solid Layouts library compiler
C = published @pathscale/ui Layout bundle
D = application code using Layout components
E = Solid Layouts application compiler
F = executable JavaScript and assets

A + B -> C
C + D + E -> F`}
            />
            <p class="text-base-content/70">
              The library compiler creates C once. Application teams install C from npm and run
              E in their build. Applications do not compile PathScale UI source themselves.
            </p>
          </Flex>
        </Card>

        <section>
          <h2 class="text-3xl font-semibold">Install</h2>
          <p class="mt-3 text-base-content/70">
            Install the UI bundle and the small shared runtime, then add the compiler integration
            as a development dependency.
          </p>
          <CodeBlock
            language="bash"
            code={`bun add @pathscale/ui solid-layouts
bun add -d rsbuild-plugin-solid-layouts`}
          />
        </section>

        <section>
          <h2 class="text-3xl font-semibold">Configure Rsbuild</h2>
          <p class="mt-3 text-base-content/70">
            The Layouts application pass must run before Babel compiles Solid JSX.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolidLayoutsApplication } from "rsbuild-plugin-solid-layouts";

export default defineConfig({
  plugins: [
    pluginSolidLayoutsApplication({ layouts: ["@pathscale/ui"] }),
    pluginBabel({
      include: /\\.(?:jsx|tsx)$/,
      babelLoaderOptions: { presets: ["babel-preset-solid"] },
    }),
  ],
});`}
          />
        </section>

        <section>
          <h2 class="text-3xl font-semibold">Use recipe parameters at the Layout point</h2>
          <p class="mt-3 text-base-content/70">
            Prefer semantic parameters over recreating a component with utility classes. The
            compiler resolves the exact Button recipe from the published UI bundle.
          </p>
          <CodeBlock
            language="tsx"
            code={`import { Button, Flex } from "@pathscale/ui";
import "@pathscale/ui/index.css";

export function Actions() {
  return (
    <Flex gap="md" align="center">
      <Button flavor="primary" size="lg">Continue</Button>
      <Button variant="outline" size="lg">Cancel</Button>
    </Flex>
  );
}`}
          />
          <Flex gap="md" align="center" wrap="wrap">
            <Button id="layouts-example-continue" flavor="primary" size="lg" onClick={actions.handler("Layouts example continued")}>Continue</Button>
            <Button id="layouts-example-cancel" variant="outline" size="lg" onClick={actions.handler("Layouts example cancelled")}>Cancel</Button>
          </Flex>
          <ActionStatus message={actions.message()} />
        </section>

        <Callout type="warning" title="Component names are case-sensitive">
          <code>&lt;button&gt;</code> is a native HTML element. <code>&lt;Button&gt;</code> resolves
          the exported PathScale UI Layout. A misspelled or mismatched configured Layout export
          is a compiler error. There is no unstyled fallback.
        </Callout>

        <section>
          <h2 class="text-3xl font-semibold">Local complex components stay local</h2>
          <p class="mt-3 text-base-content/70">
            Application components can compose state, data, and multiple UI primitives normally.
            Only imports from configured Layout libraries require a published recipe. Local
            components and Solid control-flow primitives remain ordinary SolidJS.
          </p>
          <CodeBlock
            language="tsx"
            code={`const SaveActions = () => (
  <Flex gap="sm" justify="end">
    <Button variant="ghost">Cancel</Button>
    <Button flavor="primary">Save</Button>
  </Flex>
);

export const SettingsPanel = () => <SaveActions />;`}
          />
        </section>

        <Flex gap="md" wrap="wrap">
          <Button id="layouts-installation" href={ROUTES.DOCS_INSTALLATION} flavor="primary">Installation</Button>
          <Button id="layouts-usage" href={ROUTES.DOCS_USAGE} variant="outline">Usage cheatsheet</Button>
          <Button id="layouts-showcases" href={ROUTES.SHOWCASES} variant="outline">Component showcases</Button>
        </Flex>
      </Flex>
    </ContentContainer>
  );
}
