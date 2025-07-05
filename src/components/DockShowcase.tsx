import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Dock, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const DockShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "props", title: "Props" },
  ] as const;

  const dockProps = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      description: "The size of the dock component",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "children",
      type: "JSX.Element",
      description:
        "Child elements to render inside the dock (typically DockItem components)",
    },
  ];
  const itemProps = [
    {
      name: "children",
      type: "JSX.Element",
      description: "Child elements to render inside the dock item",
    },
    {
      name: "active",
      type: "boolean",
      description: "Whether the dock item is in an active state",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "color",
      type: "string",
      description: "Color theme or variant for the dock item",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the dock item is disabled",
    },
  ];

  const labelProps = [
    {
      name: "children",
      type: "JSX.Element",
      description: "Child elements to render inside the label",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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
            <Flex class="w-full" align="start" justify="start" gap="sm">
              <Dock class="relative">
                <Dock.Item active>
                  <svg
                    class="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      stroke-linejoin="miter"
                      stroke-linecap="butt"
                    >
                      <polyline
                        points="1 11 12 2 23 11"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <path
                        d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="12"
                        y1="22"
                        x2="12"
                        y2="18"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  <Dock.Label>Home</Dock.Label>
                </Dock.Item>
                <Dock.Item active>
                  <svg
                    class="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      stroke-linejoin="miter"
                      stroke-linecap="butt"
                    >
                      <polyline
                        points="3 14 9 14 9 17 15 17 15 14 21 14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  <Dock.Label>Inbox</Dock.Label>
                </Dock.Item>
                <Dock.Item>
                  <svg
                    class="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      stroke-linejoin="miter"
                      stroke-linecap="butt"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <path
                        d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318 1.768,1.768 2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954 1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  <Dock.Label>Settings</Dock.Label>
                </Dock.Item>
              </Dock>
            </Flex>
            <CodeBlock
              code={`<Flex class="w-full" align="start" justify="start" gap="sm">
  <Dock class="relative">
    <Dock.Item active>
      <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
          <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" stroke-width="2" />
        </g>
      </svg>
      <Dock.Label>Home</Dock.Label>
    </Dock.Item>
    <Dock.Item active>
      <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
          <polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" stroke-width="2" />
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2" />
        </g>
      </svg>
      <Dock.Label>Inbox</Dock.Label>
    </Dock.Item>
    <Dock.Item>
      <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" />
          <path
            d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318 1.768,1.768 2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954 1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </g>
      </svg>
      <Dock.Label>Settings</Dock.Label>
    </Dock.Item>
  </Dock>
</Flex>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <h3 class="text-lg font-medium mb-4">Dock Props</h3>
          <PropsTable props={dockProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">Dock.Item</h3>
          <PropsTable props={itemProps} />

          <h3 class="text-lg font-medium mt-8 mb-4">Dock.Label</h3>
          <PropsTable props={labelProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default DockShowcase;
