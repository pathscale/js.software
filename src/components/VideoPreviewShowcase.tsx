import { createSignal, onCleanup } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { VideoPreview, Button, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function VideoPreviewShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "mirror", title: "Mirror Mode" },
    { id: "props", title: "Props" },
  ] as const;

  const [stream, setStream] = createSignal<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (err) {
      console.error("Failed to access camera:", err);
    }
  };

  const stopCamera = () => {
    const s = stream();
    if (s) {
      for (const track of s.getTracks()) {
        track.stop();
      }
      setStream(null);
    }
  };

  onCleanup(() => {
    stopCamera();
  });

  const videoPreviewProps = [
    {
      name: "stream",
      type: "Accessor<MediaStream | null>",
      description: "Reactive accessor for the MediaStream to display",
    },
    {
      name: "muted",
      type: "boolean",
      default: "true",
      description: "Whether the video should be muted",
    },
    {
      name: "mirror",
      type: "boolean",
      default: "false",
      description: "Whether to mirror the video (applies scaleX(-1))",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "style",
      type: "string | JSX.CSSProperties",
      description: "Inline styles to apply to the video element",
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

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg">
              {stream() ? (
                <Button color="error" onClick={stopCamera}>
                  Stop Camera
                </Button>
              ) : (
                <Button color="primary" onClick={startCamera}>
                  Start Camera
                </Button>
              )}
            </Flex>
            <VideoPreview
              stream={stream}
              class="w-80 rounded-lg bg-black"
            />
            <CodeBlock
              code={`const [stream, setStream] = createSignal<MediaStream | null>(null);

const startCamera = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
  setStream(mediaStream);
};

<Button onClick={startCamera}>Start Camera</Button>
<VideoPreview stream={stream} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="mirror" title="Mirror Mode">
          <Flex direction="col" gap="md">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Enable mirror mode to flip the video horizontally, useful for self-view camera previews.
            </p>
            <Flex align="start" justify="start" gap="lg">
              {!stream() && (
                <Button color="primary" onClick={startCamera}>
                  Start Camera
                </Button>
              )}
            </Flex>
            <Flex wrap="wrap" align="start" justify="start" gap="lg">
              <div>
                <p class="text-xs text-gray-500 mb-1">Normal</p>
                <VideoPreview
                  stream={stream}
                  class="w-60 rounded-lg bg-black"
                />
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Mirrored</p>
                <VideoPreview
                  stream={stream}
                  mirror
                  class="w-60 rounded-lg bg-black"
                />
              </div>
            </Flex>
            <CodeBlock
              code={`<VideoPreview stream={stream} />
<VideoPreview stream={stream} mirror />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={videoPreviewProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
