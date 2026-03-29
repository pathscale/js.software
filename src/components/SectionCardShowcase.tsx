import ShowcaseLayout from "./ShowcaseLayout";
import { SectionCard, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function SectionCardShowcase() {
  const sections = [
    { id: "default", title: "Default with Title" },
    { id: "with-actions", title: "With Actions" },
    { id: "tight", title: "Tight Padding" },
    { id: "no-title", title: "No Title" },
    { id: "props", title: "Props" },
  ] as const;

  const sectionCardProps = [
    {
      name: "title",
      type: "string",
      description: "Optional title displayed in the card header",
    },
    {
      name: "actions",
      type: "JSX.Element",
      description: "Optional actions slot displayed to the right of the title",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Card body content",
    },
    {
      name: "padding",
      type: '"default" | "tight" | "none"',
      default: '"default"',
      description: "Padding size for the card",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default with Title">
          <Flex direction="col" gap="md">
            <SectionCard title="Account Settings">
              <p class="text-sm opacity-70">
                Manage your account preferences, notifications, and security settings.
              </p>
            </SectionCard>
            <CodeBlock
              code={`<SectionCard title="Account Settings">
  <p class="text-sm opacity-70">
    Manage your account preferences, notifications, and security settings.
  </p>
</SectionCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-actions" title="With Actions">
          <Flex direction="col" gap="md">
            <SectionCard
              title="Team Members"
              actions={
                <Button color="primary" size="sm">
                  Invite
                </Button>
              }
            >
              <p class="text-sm opacity-70">
                You have 5 team members. Invite more to collaborate.
              </p>
            </SectionCard>
            <CodeBlock
              code={`<SectionCard
  title="Team Members"
  actions={
    <Button color="primary" size="sm">
      Invite
    </Button>
  }
>
  <p class="text-sm opacity-70">
    You have 5 team members. Invite more to collaborate.
  </p>
</SectionCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="tight" title="Tight Padding">
          <Flex direction="col" gap="md">
            <SectionCard title="Compact Section" padding="tight">
              <p class="text-sm opacity-70">
                This card uses tight padding for more compact layouts.
              </p>
            </SectionCard>
            <CodeBlock
              code={`<SectionCard title="Compact Section" padding="tight">
  <p class="text-sm opacity-70">
    This card uses tight padding for more compact layouts.
  </p>
</SectionCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="no-title" title="No Title">
          <Flex direction="col" gap="md">
            <SectionCard>
              <div class="text-center py-4">
                <p class="text-lg font-semibold">Welcome back!</p>
                <p class="text-sm opacity-70 mt-1">
                  Your dashboard is ready. Pick up where you left off.
                </p>
              </div>
            </SectionCard>
            <CodeBlock
              code={`<SectionCard>
  <div class="text-center py-4">
    <p class="text-lg font-semibold">Welcome back!</p>
    <p class="text-sm opacity-70 mt-1">
      Your dashboard is ready. Pick up where you left off.
    </p>
  </div>
</SectionCard>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={sectionCardProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
