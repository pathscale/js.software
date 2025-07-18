import { Component, For } from "solid-js";
import { ContentContainer } from "../components/content/ContentContainer";
import { Card, Grid, Badge, Flex, Hero } from "@pathscale/ui";
import { routes } from "../routes";

const Showcases: Component = () => {
  // Filter out non-showcase routes (keep only component showcases)
  const showcaseRoutes = routes.filter(
    (route) =>
      route.path !== "/" &&
      route.path !== "/docs" &&
      route.path !== "/theming" &&
      !route.path.startsWith("/docs/")
  );

  // Featured showcases (most commonly used components)
  const featuredComponents = [
    "Button",
    "Card",
    "Input",
    "Modal",
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
      {/* Hero Section */}
      <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl py-20 mb-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">Component Showcases</h1>
          <p class="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Interactive demonstrations of all {showcaseRoutes.length} components
            in @pathscale/ui. Explore real examples, copy code snippets, and see
            components in action.
          </p>

          <Flex gap="md" justify="center" wrap="wrap" class="mb-8">
            <Badge color="primary" class="px-4 py-2">
              {showcaseRoutes.length} Interactive Demos
            </Badge>
            <Badge color="secondary" class="px-4 py-2">
              Live Code Examples
            </Badge>
            <Badge color="accent" class="px-4 py-2">
              Copy & Paste Ready
            </Badge>
          </Flex>
        </div>
      </div>

      {/* Featured Components */}
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
                <Card class="hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <Card.Body class="p-6">
                    <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {route.name}
                    </h3>
                    <p class="text-base-content/70 text-sm leading-relaxed mb-4">
                      {route.description}
                    </p>
                    <span class="inline-flex items-center text-primary group-hover:text-primary/80 font-medium text-sm">
                      View Demo →
                    </span>
                  </Card.Body>
                </Card>
              </a>
            )}
          </For>
        </Grid>
      </div>

      {/* All Components */}
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
                <Card class="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                  <Card.Body class="p-6">
                    <h3 class="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {route.name}
                    </h3>
                    <p class="text-base-content/70 text-sm leading-relaxed mb-3">
                      {route.description}
                    </p>
                    <span class="inline-flex items-center text-primary group-hover:text-primary/80 font-medium text-sm">
                      Explore →
                    </span>
                  </Card.Body>
                </Card>
              </a>
            )}
          </For>
        </Grid>
      </div>

      {/* Quick Links */}
      <div class="mt-16 p-8 bg-base-200 rounded-xl">
        <h3 class="text-2xl font-bold mb-4">Quick Links</h3>
        <Flex gap="lg" wrap="wrap">
          <a href="/docs" class="btn btn-primary">
            Documentation
          </a>
          <a href="/docs/installation" class="btn btn-outline">
            Get Started
          </a>
          <a href="/theming" class="btn btn-outline">
            Theme Customization
          </a>
        </Flex>
      </div>
    </ContentContainer>
  );
};

export default Showcases;
