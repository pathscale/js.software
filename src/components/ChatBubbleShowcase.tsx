import ShowcaseLayout from "./ShowcaseLayout";
import { ChatBubble, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function ChatBubbleShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "side", title: "Side" },
    { id: "with-image", title: "With Image" },
    { id: "with-header", title: "With Header" },
    { id: "with-footer", title: "With Footer" },
    { id: "with-header-footer", title: "With Header and Footer" },
    { id: "colors", title: "Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const chatBubbleProps = [
    {
      name: "end",
      type: "boolean",
      default: "false",
      description: "Whether to align the chat bubble to the end",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes (alias for class)",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
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
            <Flex justify="start" align="start">
              <ChatBubble>
                <ChatBubble.Header>
                  Obi-Wan Kenobi <ChatBubble.Time>2 hours ago</ChatBubble.Time>
                </ChatBubble.Header>
                <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                <ChatBubble.Message>
                  You were my brother, Anakin.
                </ChatBubble.Message>
                <ChatBubble.Footer>Seen</ChatBubble.Footer>
              </ChatBubble>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Header>
    Obi-Wan Kenobi <ChatBubble.Time>2 hours ago</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>You were my brother, Anakin.</ChatBubble.Message>
  <ChatBubble.Footer>Seen</ChatBubble.Footer>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="side" title="Side">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Message>
                    It's over Anakin, <br />I have the high ground.
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Message>
                    You underestimate my power!
                  </ChatBubble.Message>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Message>
    It's over Anakin, <br />I have the high ground.
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Message>You underestimate my power!</ChatBubble.Message>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-image" title="With Image">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>
                    It was said that you would, destroy the Sith, not join them.
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>
                    It was you who would bring balance to the Force
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>
                    Not leave it in Darkness
                  </ChatBubble.Message>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>
    It was said that you would, destroy the Sith, not join them.
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>
    It was you who would bring balance to the Force
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>Not leave it in Darkness</ChatBubble.Message>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-header" title="With Header">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Header>
                    Obi-Wan Kenobi <ChatBubble.Time>12:45</ChatBubble.Time>
                  </ChatBubble.Header>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>
                    You were the Chosen One!
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Header>
                    Anakin <ChatBubble.Time>12:46</ChatBubble.Time>
                  </ChatBubble.Header>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>I hate you!</ChatBubble.Message>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Header>
    Obi-Wan Kenobi <ChatBubble.Time>12:45</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>You were the Chosen One!</ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Header>
    Anakin <ChatBubble.Time>12:46</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>I hate you!</ChatBubble.Message>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-footer" title="With Footer">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>
                    You were the Chosen One!
                  </ChatBubble.Message>
                  <ChatBubble.Footer>Delivered</ChatBubble.Footer>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  <ChatBubble.Message>I hate you!</ChatBubble.Message>
                  <ChatBubble.Footer>Seen at 12:46</ChatBubble.Footer>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>You were the Chosen One!</ChatBubble.Message>
  <ChatBubble.Footer>Delivered</ChatBubble.Footer>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  <ChatBubble.Message>I hate you!</ChatBubble.Message>
  <ChatBubble.Footer>Seen at 12:46</ChatBubble.Footer>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-header-footer" title="With Header and Footer">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Header>
                    Obi-Wan Kenobi <ChatBubble.Time>12:45</ChatBubble.Time>
                  </ChatBubble.Header>
                  <ChatBubble.Message>
                    You were the Chosen One!
                  </ChatBubble.Message>
                  <ChatBubble.Footer>Delivered</ChatBubble.Footer>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Header>
                    Anakin <ChatBubble.Time>12:46</ChatBubble.Time>
                  </ChatBubble.Header>
                  <ChatBubble.Message>I hate you!</ChatBubble.Message>
                  <ChatBubble.Footer>Seen at 12:46</ChatBubble.Footer>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Header>
    Obi-Wan Kenobi <ChatBubble.Time>12:45</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Message>You were the Chosen One!</ChatBubble.Message>
  <ChatBubble.Footer>Delivered</ChatBubble.Footer>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Header>
    Anakin <ChatBubble.Time>12:46</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Message>I hate you!</ChatBubble.Message>
  <ChatBubble.Footer>Seen at 12:46</ChatBubble.Footer>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start">
              <Flex direction="col" gap="lg">
                <ChatBubble>
                  <ChatBubble.Message color="primary">
                    What kind of nonsense is this
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble>
                  <ChatBubble.Message color="secondary">
                    Put me on the Council and not make me a Master!??
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble>
                  <ChatBubble.Message color="accent">
                    That's never been done in the history of the Jedi. It's
                    insulting!
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Message color="info">
                    Calm down, Anakin.
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Message color="success">
                    You have been given a great honor.
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Message color="warning">
                    To be on the Council at your age.
                  </ChatBubble.Message>
                </ChatBubble>

                <ChatBubble end>
                  <ChatBubble.Message color="error">
                    It's never happened before.
                  </ChatBubble.Message>
                </ChatBubble>
              </Flex>
            </Flex>
            <CodeBlock
              code={`<ChatBubble>
  <ChatBubble.Message color="primary">
    What kind of nonsense is this
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble>
  <ChatBubble.Message color="secondary">
    Put me on the Council and not make me a Master!??
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble>
  <ChatBubble.Message color="accent">
    That's never been done in the history of the Jedi. It's insulting!
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Message color="info">
    Calm down, Anakin.
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Message color="success">
    You have been given a great honor.
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Message color="warning">
    To be on the Council at your age.
  </ChatBubble.Message>
</ChatBubble>

<ChatBubble end>
  <ChatBubble.Message color="error">
    It's never happened before.
  </ChatBubble.Message>
</ChatBubble>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={chatBubbleProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
