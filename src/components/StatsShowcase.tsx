import ShowcaseLayout from "./ShowcaseLayout";
import { Stats, Avatar, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function StatsShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "icons-or-image", title: "Icons or Image" },
    { id: "centered-items", title: "Centered Items" },
    { id: "vertical", title: "Vertical" },
    { id: "responsive", title: "Responsive" },
    { id: "custom-colors", title: "Custom Colors and Button" },
    { id: "props", title: "Props" },
  ] as const;

  const statsProps = [
    {
      name: "direction",
      type: '"horizontal" | "vertical"',
      default: "horizontal",
      description: "The direction of the stats layout",
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
            <Flex align="start" justify="start">
              <Stats class="shadow">
                <Stats.Stat>
                  <Stats.Stat.Title>Total Page Views</Stats.Stat.Title>
                  <Stats.Stat.Value>89,400</Stats.Stat.Value>
                  <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
                </Stats.Stat>
              </Stats>
            </Flex>
            <CodeBlock
              code={`<Stats class="shadow">
  <Stats.Stat>
    <Stats.Stat.Title>Total Page Views</Stats.Stat.Title>
    <Stats.Stat.Value>89,400</Stats.Stat.Value>
    <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="icons-or-image" title="Icons or Image">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Stats class="shadow font-sans">
                <Stats.Stat>
                  <Stats.Stat.Figure class="text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Stats.Stat.Figure>
                  <Stats.Stat.Title>Total Likes</Stats.Stat.Title>
                  <Stats.Stat.Value class="text-primary">
                    25.6K
                  </Stats.Stat.Value>
                  <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Figure class="text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </Stats.Stat.Figure>
                  <Stats.Stat.Title>Page Views</Stats.Stat.Title>
                  <Stats.Stat.Value class="text-secondary">
                    2.6M
                  </Stats.Stat.Value>
                  <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Figure class="text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Stats.Stat.Figure>
                  <Stats.Stat.Figure class="text-secondary">
                    <Avatar
                      size="sm"
                      online={true}
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      shape="circle"
                    />
                  </Stats.Stat.Figure>
                  <Stats.Stat.Value>86%</Stats.Stat.Value>
                  <Stats.Stat.Title>Tasks done</Stats.Stat.Title>
                  <Stats.Stat.Desc class="text-secondary">
                    31 tasks remaining
                  </Stats.Stat.Desc>
                </Stats.Stat>
              </Stats>
            </Flex>

            <CodeBlock
              code={`<Stats class="shadow font-sans">
  <Stats.Stat>
    <Stats.Stat.Figure class="text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </Stats.Stat.Figure>
    <Stats.Stat.Title>Total Likes</Stats.Stat.Title>
    <Stats.Stat.Value class="text-primary">25.6K</Stats.Stat.Value>
    <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Figure class="text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </Stats.Stat.Figure>
    <Stats.Stat.Title>Page Views</Stats.Stat.Title>
    <Stats.Stat.Value class="text-secondary">2.6M</Stats.Stat.Value>
    <Stats.Stat.Desc>21% more than last month</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Figure class="text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </Stats.Stat.Figure>
    <Stats.Stat.Figure class="text-secondary">
      <Avatar
        size="sm"
        online={true}
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        shape="circle"
      />
    </Stats.Stat.Figure>
    <Stats.Stat.Value>86%</Stats.Stat.Value>
    <Stats.Stat.Title>Tasks done</Stats.Stat.Title>
    <Stats.Stat.Desc class="text-secondary">31 tasks remaining</Stats.Stat.Desc>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="centered-items" title="Centered Items">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Stats class="shadow font-sans">
                <Stats.Stat class="place-items-center">
                  <Stats.Stat.Title>Downloads</Stats.Stat.Title>
                  <Stats.Stat.Value>31K</Stats.Stat.Value>
                  <Stats.Stat.Desc>
                    From January 1st to February 1st
                  </Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat class="place-items-center">
                  <Stats.Stat.Title>Users</Stats.Stat.Title>
                  <Stats.Stat.Value class="text-secondary">
                    4,200
                  </Stats.Stat.Value>
                  <Stats.Stat.Desc class="text-secondary">
                    ↗︎ 40 (2%)
                  </Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat class="place-items-center">
                  <Stats.Stat.Title>New Registers</Stats.Stat.Title>
                  <Stats.Stat.Value>1,200</Stats.Stat.Value>
                  <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
                </Stats.Stat>
              </Stats>
            </Flex>

            <CodeBlock
              code={`<Stats class="shadow font-sans">
  <Stats.Stat class="place-items-center">
    <Stats.Stat.Title>Downloads</Stats.Stat.Title>
    <Stats.Stat.Value>31K</Stats.Stat.Value>
    <Stats.Stat.Desc>From January 1st to February 1st</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat class="place-items-center">
    <Stats.Stat.Title>Users</Stats.Stat.Title>
    <Stats.Stat.Value class="text-secondary">4,200</Stats.Stat.Value>
    <Stats.Stat.Desc class="text-secondary">↗︎ 40 (2%)</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat class="place-items-center">
    <Stats.Stat.Title>New Registers</Stats.Stat.Title>
    <Stats.Stat.Value>1,200</Stats.Stat.Value>
    <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="vertical" title="Vertical">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Stats direction="vertical" class="shadow font-sans">
                <Stats.Stat>
                  <Stats.Stat.Title>Downloads</Stats.Stat.Title>
                  <Stats.Stat.Value>31K</Stats.Stat.Value>
                  <Stats.Stat.Desc>Jan 1st - Feb 1st</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Title>New Users</Stats.Stat.Title>
                  <Stats.Stat.Value>4,200</Stats.Stat.Value>
                  <Stats.Stat.Desc>↗︎ 400 (22%)</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Title>New Registers</Stats.Stat.Title>
                  <Stats.Stat.Value>1,200</Stats.Stat.Value>
                  <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
                </Stats.Stat>
              </Stats>
            </Flex>

            <CodeBlock
              code={`<Stats direction="vertical" class="shadow font-sans">
  <Stats.Stat>
    <Stats.Stat.Title>Downloads</Stats.Stat.Title>
    <Stats.Stat.Value>31K</Stats.Stat.Value>
    <Stats.Stat.Desc>Jan 1st - Feb 1st</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Title>New Users</Stats.Stat.Title>
    <Stats.Stat.Value>4,200</Stats.Stat.Value>
    <Stats.Stat.Desc>↗︎ 400 (22%)</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Title>New Registers</Stats.Stat.Title>
    <Stats.Stat.Value>1,200</Stats.Stat.Value>
    <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Stats class="lg:stats-horizontal shadow">
                <Stats.Stat>
                  <Stats.Stat.Title>Downloads</Stats.Stat.Title>
                  <Stats.Stat.Value>31K</Stats.Stat.Value>
                  <Stats.Stat.Desc>Jan 1st - Feb 1st</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Title>New Users</Stats.Stat.Title>
                  <Stats.Stat.Value>4,200</Stats.Stat.Value>
                  <Stats.Stat.Desc>↗︎ 400 (22%)</Stats.Stat.Desc>
                </Stats.Stat>

                <Stats.Stat>
                  <Stats.Stat.Title>New Registers</Stats.Stat.Title>
                  <Stats.Stat.Value>1,200</Stats.Stat.Value>
                  <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
                </Stats.Stat>
              </Stats>
            </Flex>

            <CodeBlock
              code={`<Stats class="lg:stats-horizontal shadow">
  <Stats.Stat>
    <Stats.Stat.Title>Downloads</Stats.Stat.Title>
    <Stats.Stat.Value>31K</Stats.Stat.Value>
    <Stats.Stat.Desc>Jan 1st - Feb 1st</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Title>New Users</Stats.Stat.Title>
    <Stats.Stat.Value>4,200</Stats.Stat.Value>
    <Stats.Stat.Desc>↗︎ 400 (22%)</Stats.Stat.Desc>
  </Stats.Stat>

  <Stats.Stat>
    <Stats.Stat.Title>New Registers</Stats.Stat.Title>
    <Stats.Stat.Value>1,200</Stats.Stat.Value>
    <Stats.Stat.Desc>↘︎ 90 (14%)</Stats.Stat.Desc>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-colors" title="Custom Colors and Button">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Stats class="font-sans bg-primary text-primary-content">
                <Stats.Stat>
                  <Stats.Stat.Title>Account balance</Stats.Stat.Title>
                  <Stats.Stat.Value>$89,400</Stats.Stat.Value>
                  <Stats.Stat.Actions>
                    <Button size="sm" color="success">
                      Add funds
                    </Button>
                  </Stats.Stat.Actions>
                </Stats.Stat>
                <Stats.Stat>
                  <Stats.Stat.Title>Current balance</Stats.Stat.Title>
                  <Stats.Stat.Value>$89,400</Stats.Stat.Value>
                  <Stats.Stat.Actions class="gap-1 flex">
                    <Button size="sm">Withdrawal</Button>
                    <Button size="sm">deposit</Button>
                  </Stats.Stat.Actions>
                </Stats.Stat>
              </Stats>
            </Flex>

            <CodeBlock
              code={`<Stats class="font-sans bg-primary text-primary-content">
  <Stats.Stat>
    <Stats.Stat.Title>Account balance</Stats.Stat.Title>
    <Stats.Stat.Value>$89,400</Stats.Stat.Value>
    <Stats.Stat.Actions>
      <Button size="sm" color="success">Add funds</Button>
    </Stats.Stat.Actions>
  </Stats.Stat>
  <Stats.Stat>
    <Stats.Stat.Title>Current balance</Stats.Stat.Title>
    <Stats.Stat.Value>$89,400</Stats.Stat.Value>
    <Stats.Stat.Actions class="gap-1 flex">
      <Button size="sm">Withdrawal</Button>
      <Button size="sm">deposit</Button>
    </Stats.Stat.Actions>
  </Stats.Stat>
</Stats>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={statsProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
