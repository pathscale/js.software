import { Component, For } from "solid-js";
import { ContentContainer } from "../../components/content/ContentContainer";
import { Card, Grid, Flex } from "@pathscale/ui";
import { routes } from "../../routes";
import { ROUTES } from "../../config/routes";

const Components: Component = () => {
  // Filter out non-component routes
  const componentRoutes = routes.filter(
    (route) =>
      route.path !== ROUTES.HOME &&
      route.path !== ROUTES.DOCS &&
      route.path !== ROUTES.THEMING &&
      !route.path.startsWith("/docs/")
  );

  // Group components by category
  const categories = {
    Layout: ["Grid", "Flex", "Stack", "Divider"],
    Navigation: [
      "Navbar",
      "Breadcrumb",
      "Sidenav",
      "Steps",
      "Tabs",
      "Menu",
      "Pagination",
    ],
    "Data Display": [
      "Card",
      "Table",
      "Stats",
      "Timeline",
      "Badge",
      "Avatar",
      "Indicator",
    ],
    Feedback: [
      "Alert",
      "Loading",
      "Progress",
      "Radial Progress",
      "Toast",
      "Skeleton",
    ],
    "Forms & Inputs": [
      "Button",
      "Input",
      "Textarea",
      "Select",
      "Checkbox",
      "Radio",
      "Range",
      "Toggle",
      "File Input",
      "Rating",
    ],
    "Overlays & Popups": ["Modal", "Dropdown", "Tooltip", "Drawer"],
    "Media & Display": [
      "Carousel",
      "Artboard",
      "Browser Mockup",
      "Phone Mockup",
      "Window Mockup",
      "Code Mockup",
      "Mask",
    ],
    "Utilities & Helpers": [
      "Kbd",
      "Join",
      "Collapse",
      "Accordion",
      "Swap",
      "Countdown",
      "Diff",
      "Copy Button",
    ],
  };

  const categoryDescriptions = {
    Layout:
      "Core components for structuring your application's layout with flexible grids and spacing utilities.",
    Navigation:
      "Components for building intuitive navigation systems and user flows.",
    "Data Display":
      "Elements for presenting data and information in clear, organized formats.",
    Feedback:
      "Interactive components that provide visual feedback and status updates to users.",
    "Forms & Inputs":
      "Form components designed for optimal user input and data collection.",
    "Overlays & Popups":
      "Modal and overlay components for additional content and interactions.",
    "Media & Display":
      "Components for showcasing media content and creating visual mockups.",
    "Utilities & Helpers":
      "Utility components that enhance functionality and user experience.",
  };

  const getComponentsByCategory = (category: string) => {
    return componentRoutes.filter((route) =>
      categories[category as keyof typeof categories]?.some((comp) =>
        route.name.toLowerCase().includes(comp.toLowerCase())
      )
    );
  };

  return (
    <ContentContainer maxWidth="2xl">
      <div class="mb-12">
        <h1 class="text-4xl font-bold mb-6">Component Library</h1>
        <p class="text-xl text-base-content/70 leading-relaxed">
          Explore our extensive collection of UI components, thoughtfully
          organized by category. Each component is designed with accessibility,
          performance, and developer experience in mind.
        </p>
      </div>

      <div class="space-y-16">
        <For each={Object.keys(categories)}>
          {(category) => {
            const components = getComponentsByCategory(category);
            return (
              <section>
                <h2 class="text-2xl font-semibold mb-4">{category}</h2>
                <p class="text-base-content/70 mb-6">
                  {
                    categoryDescriptions[
                      category as keyof typeof categoryDescriptions
                    ]
                  }
                </p>
                <Grid cols={{ base: "1", sm: "2", md: "3" }} gap="lg">
                  <For each={components}>
                    {(component) => (
                      <a href={component.path}>
                        <Card class="hover:shadow-lg transition-shadow">
                          <Card.Body>
                            <h3 class="text-lg font-semibold mb-2">
                              {component.name}
                            </h3>
                            <p class="text-base-content/70 text-sm">
                              {component.description}
                            </p>
                          </Card.Body>
                        </Card>
                      </a>
                    )}
                  </For>
                </Grid>
              </section>
            );
          }}
        </For>
      </div>
    </ContentContainer>
  );
};

export default Components;
