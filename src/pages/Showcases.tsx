import { Component, For } from "solid-js";
import { ContentContainer } from "../components/content/ContentContainer";
import { Button, Card, Chip, Flex, Grid } from "@pathscale/ui";
import { routes } from "../routes";
import { ROUTES } from "../config/routes";

const Showcases: Component = () => {
  const showcaseRoutes = routes.filter(
    (route) =>
      route.path !== ROUTES.HOME &&
      route.path !== ROUTES.DOCS &&
      route.path !== ROUTES.THEMING &&
      !route.path.startsWith("/docs/")
  );

  const featuredComponents = [
    "Button",
    "Card",
    "Input",
    "Dialog",
    "Navbar",
    "Alert",
    "Grid",
    "Flex",
  ];

  const featuredRoutes = showcaseRoutes.filter((route) =>
    featuredComponents.some((comp) =>
      route.name.toLowerCase().includes(comp.toLowerCase())
    )
  );

  const otherRoutes = showcaseRoutes.filter(
    (route) =>
      !featuredComponents.some((comp) =>
        route.name.toLowerCase().includes(comp.toLowerCase())
      )
  );

  return (
    <ContentContainer maxWidth="2xl" prose={false}>
      <Card material="glass" padding="lg" flavor="secondary">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">Component Showcases</h1>
          <p class="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            {showcaseRoutes.length} focused family demonstrations plus a complete
            coverage lab for the current @pathscale/ui 2.x public surface.
          </p>

          <Flex gap="md" justify="center" wrap="wrap" class="mb-8">
            <Chip class="px-4 py-2">
              {showcaseRoutes.length} Interactive Demos
            </Chip>
            <Chip class="px-4 py-2">
              Live Code Examples
            </Chip>
            <Chip class="px-4 py-2">
              Copy & Paste Ready
            </Chip>
          </Flex>
        </div>
      </Card>

      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-6">Featured Components</h2>
        <p class="text-lg text-base-content/70 mb-8">
          Start with these essential components that form the foundation of most
          applications.
        </p>

        <Grid cols={{ base: "1", sm: "2", md: "3", lg: "4" }} gap="lg">
          <For each={featuredRoutes}>
            {(route) => (
              <a href={route.path} class="block">
                <Card material="glass" padding="md" flavor="secondary" isInteractive>
                  <div>
                    <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {route.name}
                    </h3>
                    <p class="text-base-content/70 text-sm leading-relaxed mb-4">
                      {route.description}
                    </p>
                    <span class="inline-flex items-center text-primary group-hover:text-primary/80 font-medium text-sm">
                      View Demo →
                    </span>
                  </div>
                </Card>
              </a>
            )}
          </For>
        </Grid>
      </div>

      <div>
        <h2 class="text-3xl font-bold mb-6">All Components</h2>
        <p class="text-lg text-base-content/70 mb-8">
          Browse the complete collection of components available in
          @pathscale/ui.
        </p>

        <Grid cols={{ base: "1", sm: "2", md: "3" }} gap="lg">
          <For each={otherRoutes}>
            {(route) => (
              <a href={route.path} class="block">
                <Card material="glass" padding="md" flavor="secondary" isInteractive>
                  <div>
                    <h3 class="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {route.name}
                    </h3>
                    <p class="text-base-content/70 text-sm leading-relaxed mb-3">
                      {route.description}
                    </p>
                    <span class="inline-flex items-center text-primary group-hover:text-primary/80 font-medium text-sm">
                      Explore →
                    </span>
                  </div>
                </Card>
              </a>
            )}
          </For>
        </Grid>
      </div>

      <div class="mt-16 p-8 bg-base-200 rounded-xl">
        <h3 class="text-2xl font-bold mb-4">Quick Links</h3>
        <Flex gap="lg" wrap="wrap">
          <Button href={ROUTES.DOCS} flavor="primary">
            Documentation
          </Button>
          <Button href={ROUTES.DOCS_INSTALLATION} variant="outline">
            Get Started
          </Button>
          <Button href={ROUTES.THEMING} variant="outline">
            Theme Customization
          </Button>
        </Flex>
      </div>
    </ContentContainer>
  );
};

export default Showcases;
