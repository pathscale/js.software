import ShowcaseLayout from "./ShowcaseLayout";
import { Avatar } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function AvatarShowcase() {
  const variants = ["filled", "outlined", "ghost"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const shapes = ["circle", "rounded"] as const;

  // Sample avatar images and texts for demonstration
  const sampleImages = [
    "https://i.pravatar.cc/300?img=1",
    "https://i.pravatar.cc/300?img=2",
    "https://i.pravatar.cc/300?img=3",
  ];

  const sampleTexts = ["JD", "AB", "YZ"];

  const sections = [
    { id: "variants", title: "Variants" },
    { id: "sizes", title: "Sizes" },
    { id: "shapes", title: "Shapes" },
    { id: "fallbacks", title: "Text Fallbacks" },
    { id: "props", title: "Props" },
  ] as const;

  const avatarProps = [
    {
      name: "variant",
      type: '"filled" | "outlined" | "ghost"',
      default: '"filled"',
      description: "The visual style variant of the avatar",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the avatar",
    },
    {
      name: "shape",
      type: '"circle" | "rounded"',
      default: '"circle"',
      description: "The shape of the avatar",
    },
    {
      name: "src",
      type: "string",
      description: "The URL of the avatar image",
    },
    {
      name: "dataSrc",
      type: "string",
      description: "The data-src attribute for lazy loading",
    },
    {
      name: "alt",
      type: "string",
      default: '"User Avatar"',
      description: "Alt text for the avatar image and used for text fallback",
    },
    {
      name: "text",
      type: "string",
      description: "Custom text to display when no image is available",
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
                class="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="variants" title="Variants">
          <div class="space-y-4">
            {variants.map((variant) => (
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {variant}
                </h3>
                <div class="flex flex-wrap gap-4 items-center">
                  <Avatar
                    variant={variant}
                    src={sampleImages[0]}
                    alt="John Doe"
                  />
                </div>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`// Avatar variants
<Avatar variant="filled" src="user-1.jpg" alt="John Doe" />
<Avatar variant="outlined" src="user-2.jpg" alt="Jane Smith" />
<Avatar variant="ghost" src="user-3.jpg" alt="Alex Brown" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <div class="flex flex-wrap gap-4 items-end">
            {sizes.map((size) => (
              <Avatar size={size} src={sampleImages[1]} alt={`Size ${size}`} />
            ))}
          </div>
          <CodeBlock
            code={`// Avatar sizes
<Avatar size="sm" src="user.jpg" alt="Small Avatar" />
<Avatar size="md" src="user.jpg" alt="Medium Avatar" />
<Avatar size="lg" src="user.jpg" alt="Large Avatar" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="shapes" title="Shapes">
          <div class="flex flex-wrap gap-4">
            {shapes.map((shape) => (
              <Avatar
                shape={shape}
                src={sampleImages[2]}
                alt={`Shape ${shape}`}
              />
            ))}
          </div>
          <CodeBlock
            code={`// Avatar shapes
<Avatar shape="circle" src="user.jpg" alt="Circle Avatar" />
<Avatar shape="rounded" src="user.jpg" alt="Rounded Avatar" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="fallbacks" title="Text Fallbacks">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              {sampleTexts.map((text) => (
                <Avatar text={text} alt={text} />
              ))}
            </div>
            <div class="flex flex-wrap gap-4">
              <Avatar alt="John Doe" />
              <Avatar alt="Jane Smith" variant="outlined" />
              <Avatar alt="Alex Brown" variant="ghost" />
            </div>
          </div>
          <CodeBlock
            code={`// Text fallbacks
<Avatar text="JD" alt="John Doe" />
<Avatar alt="Jane Smith" /> {/* Will show "JS" */}
<Avatar alt="Alex Brown" variant="ghost" /> {/* Will show "AB" */}`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={avatarProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
