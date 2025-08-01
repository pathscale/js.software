import ShowcaseLayout from "./ShowcaseLayout";
import { Avatar, Mask, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function AvatarShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "custom-size", title: "Custom Size" },
    { id: "sizes", title: "Sizes" },
    { id: "rounded", title: "Rounded" },
    { id: "with-mask", title: "With Mask" },
    { id: "group", title: "Group" },
    { id: "group-counter", title: "Group with Counter" },
    { id: "group-spacing", title: "Group Spacing" },
    { id: "ring", title: "Ring" },
    { id: "presence", title: "Presence Indicator" },
    { id: "placeholder", title: "Placeholder" },
    { id: "with-svg", title: "With SVG" },
    { id: "colors", title: "Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "src",
      type: "string",
      description: "URL of the avatar image",
    },
    {
      name: "letters",
      type: "string",
      description: "Letters to show when no image is available",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | number',
      default: '"md"',
      description:
        "Size of the avatar, can be predefined or custom number in pixels",
    },
    {
      name: "shape",
      type: '"circle" | "square"',
      default: '"square"',
      description: "Shape of the avatar",
    },
    {
      name: "color",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Background color for placeholder avatars",
    },
    {
      name: "border",
      type: "boolean",
      default: "false",
      description: "Whether to show a border ring",
    },
    {
      name: "borderColor",
      type: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"',
      description: "Color of the border ring",
    },
    {
      name: "online",
      type: "boolean",
      default: "false",
      description: "Shows online presence indicator",
    },
    {
      name: "offline",
      type: "boolean",
      default: "false",
      description: "Shows offline presence indicator",
    },
    {
      name: "innerClass",
      type: "string",
      description: "Class applied to the inner element",
    },
    {
      name: "as",
      type: "string",
      description: "HTML element or component to render as",
    },
    {
      name: "className",
      type: "string",
      description: "Alias for `class`, useful in JSX environments",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Child elements or content to render inside the avatar",
    },
  ];

  const sampleImage =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const reactLogoSvg = (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="600px"
      height="600px"
      viewBox="0 0 600 600"
      enable-background="new 0 0 600 600"
    >
      <g id="Layer_2">
        <path
          fill="none"
          stroke="#E91E63"
          stroke-width="24"
          stroke-miterlimit="10"
          d="M371.987,227.641
          c47.628,47.628,85.039,98.708,106.914,143.552c26.358,54.033,30.096,99.722,11.103,118.714
          c-19.793,19.793-68.267,15.884-125.731-12.979c-43.445-21.821-92.031-59.119-137.242-104.331
          c-46.354-46.354-84.95-95.545-106.667-139.816c-27.48-56.023-30.057-103.743-10.643-123.157
          c18.838-18.839,63.248-16.056,116.694,9.757C271.574,141.193,323.895,179.548,371.987,227.641z"
        />
        <path
          fill="none"
          stroke="#E91E63"
          stroke-width="24"
          stroke-miterlimit="10"
          d="M272.931,201.125
          c65.052-17.465,127.989-24.354,177.767-20.902c59.974,4.16,101.42,23.747,108.385,49.688
          c7.259,27.033-20.345,67.073-74.054,102.434c-40.608,26.733-97.189,50.188-158.941,66.769
          c-63.312,16.998-125.207,25.858-174.408,22.553c-62.26-4.181-104.884-25.789-112.004-52.306
          c-6.907-25.731,17.688-62.811,66.75-96.214C147.879,244.923,207.243,218.761,272.931,201.125z"
        />
        <path
          fill="none"
          stroke="#E91E63"
          stroke-width="24"
          stroke-miterlimit="10"
          d="M200.469,273.707
          c17.357-65.081,42.82-123.05,70.671-164.45c33.556-49.882,71.225-76.008,97.178-69.086c27.045,7.212,47.949,51.123,51.76,115.315
          c2.883,48.533-5.055,109.266-21.531,171.046c-16.892,63.341-40.126,121.389-67.562,162.365
          c-34.716,51.852-74.723,77.988-101.252,70.913c-25.743-6.865-45.584-46.692-50.021-105.881
          C175.963,403.92,182.944,339.424,200.469,273.707z"
        />
      </g>
      <g id="Layer_3">
        <path
          fill="#E91E63"
          d="M300,349.369c-1.019,0-1.881-0.353-2.586-1.058l-36.679-35.386c-0.392-0.313-0.931-0.822-1.617-1.528
          c-0.686-0.705-1.773-1.988-3.262-3.851c-1.489-1.86-2.822-3.771-3.997-5.73s-2.224-4.33-3.145-7.112
          c-0.92-2.782-1.381-5.486-1.381-8.111c0-8.621,2.488-15.361,7.465-20.221c4.977-4.859,11.854-7.289,20.631-7.289
          c2.43,0,4.909,0.421,7.436,1.264c2.527,0.843,4.879,1.979,7.054,3.41c2.174,1.43,4.046,2.772,5.613,4.026s3.057,2.586,4.467,3.997
          c1.411-1.411,2.899-2.743,4.467-3.997c1.568-1.254,3.438-2.596,5.614-4.026c2.175-1.431,4.525-2.567,7.054-3.41
          c2.527-0.842,5.006-1.264,7.435-1.264c8.778,0,15.655,2.43,20.632,7.289c4.978,4.859,7.466,11.6,7.466,20.221
          c0,8.66-4.487,17.477-13.461,26.451l-36.619,35.268C301.881,349.017,301.019,349.369,300,349.369z"
        />
      </g>
    </svg>
  );

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar src={sampleImage} innerClass="rounded" size="sm" />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" innerClass="rounded" size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-size" title="Custom Size">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar src={sampleImage} shape="circle" size={30} />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" shape="circle" size={30} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="sizes" title="Sizes">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar src={sampleImage} size="lg" />
              <Avatar src={sampleImage} size="md" />
              <Avatar src={sampleImage} size={80} />
              <Avatar src={sampleImage} size={64} />
              <Avatar src={sampleImage} size="sm" />
              <Avatar src={sampleImage} size="xs" />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" size="lg" />
<Avatar src="user-image.jpg" size="md" />
<Avatar src="user-image.jpg" size={80} />
<Avatar src="user-image.jpg" size={64} />
<Avatar src="user-image.jpg" size="sm" />
<Avatar src="user-image.jpg" size="xs" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="rounded" title="Rounded">
          <Flex direction="col" gap="md">
            <Flex justify="start" align="start" gap="lg" wrap="wrap">
              <Avatar src={sampleImage} innerClass="rounded-xl" size="sm" />
              <Avatar src={sampleImage} shape="circle" size="sm" />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" innerClass="rounded-xl" size="sm" />
<Avatar src="user-image.jpg" shape="circle" size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-mask" title="With Mask">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar
                src={sampleImage}
                innerClass={Mask.className({ variant: "squircle" })}
                size="sm"
              />
              <Avatar
                src={sampleImage}
                innerClass={Mask.className({ variant: "hexagon" })}
                size="sm"
              />
              <Avatar
                src={sampleImage}
                innerClass={Mask.className({ variant: "triangle" })}
                size="sm"
              />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" innerClass={Mask.className({ variant: "squircle" })} size="sm" />
<Avatar src="user-image.jpg" innerClass={Mask.className({ variant: "hexagon" })} size="sm" />
<Avatar src="user-image.jpg" innerClass={Mask.className({ variant: "triangle" })} size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="group" title="Group">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar.Group>
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
              </Avatar.Group>
            </Flex>
            <CodeBlock
              code={`<Avatar.Group>
  <Avatar src="user-1.jpg" size="sm" />
  <Avatar src="user-2.jpg" size="sm" />
  <Avatar src="user-3.jpg" size="sm" />
  <Avatar src="user-4.jpg" size="sm" />
</Avatar.Group>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="group-counter" title="Group with Counter">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar.Group>
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar letters="+99" size="sm" />
              </Avatar.Group>
            </Flex>
            <CodeBlock
              code={`<Avatar.Group>
  <Avatar src="user-1.jpg" size="sm" />
  <Avatar src="user-2.jpg" size="sm" />
  <Avatar src="user-3.jpg" size="sm" />
  <Avatar letters="+99" size="sm" />
</Avatar.Group>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="group-spacing" title="Group Spacing">
          <Flex direction="col" gap="md">
            <Flex direction="col" align="start" justify="start" gapY="sm">
              <Avatar.Group class="space-x-4">
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar letters="+99" size="sm" />
              </Avatar.Group>
              <Avatar.Group class="space-x-0">
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar letters="+99" size="sm" />
              </Avatar.Group>
              <Avatar.Group class="-space-x-4">
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar letters="+99" size="sm" />
              </Avatar.Group>
              <Avatar.Group class="-space-x-8">
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar src={sampleImage} size="sm" />
                <Avatar letters="+99" size="sm" />
              </Avatar.Group>
            </Flex>
            <CodeBlock
              code={`<Avatar.Group class="space-x-4">
  {/* Spaced avatars */}
</Avatar.Group>
<Avatar.Group class="space-x-0">
  {/* No spacing */}
</Avatar.Group>
<Avatar.Group class="-space-x-4">
  {/* Overlapping */}
</Avatar.Group>
<Avatar.Group class="-space-x-8">
  {/* More overlapping */}
</Avatar.Group>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="ring" title="Ring">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Avatar
                src={sampleImage}
                border
                borderColor="primary"
                shape="circle"
                size="sm"
              />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" border borderColor="primary" shape="circle" size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="presence" title="Presence Indicator">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar src={sampleImage} shape="circle" online size="sm" />
              <Avatar src={sampleImage} shape="circle" offline size="sm" />
            </Flex>
            <CodeBlock
              code={`<Avatar src="user-image.jpg" shape="circle" online size="sm" />
  <Avatar src="user-image.jpg" shape="circle" offline size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="placeholder" title="Placeholder">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar letters="K" size="lg" shape="circle" />
              <Avatar letters="JO" size="md" shape="circle" online />
              <Avatar letters="MX" size="sm" shape="circle" />
              <Avatar letters="AA" size="xs" shape="circle" />
            </Flex>
            <CodeBlock
              code={`<Avatar letters="K" size="lg" shape="circle" />
<Avatar letters="JO" size="md" shape="circle" online />
<Avatar letters="MX" size="sm" shape="circle" />
<Avatar letters="AA" size="xs" shape="circle" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="with-svg" title="With SVG">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Avatar shape="circle" border size="sm">
                {reactLogoSvg}
              </Avatar>
            </Flex>
            <CodeBlock
              code={`<Avatar shape="circle" border size="sm">
  {/* SVG content */}
</Avatar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar
                src={sampleImage}
                border
                borderColor="neutral"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="primary"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="secondary"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="accent"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="info"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="success"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="warning"
                shape="circle"
                size="sm"
              />
              <Avatar
                src={sampleImage}
                border
                borderColor="error"
                shape="circle"
                size="sm"
              />
            </Flex>
            <Flex align="start" justify="start" gap="lg" wrap="wrap">
              <Avatar
                letters="Y"
                border
                borderColor="neutral"
                color="neutral"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="primary"
                color="primary"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="secondary"
                color="secondary"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="accent"
                color="accent"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="info"
                color="info"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="success"
                color="success"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="warning"
                color="warning"
                shape="circle"
                size="sm"
              />
              <Avatar
                letters="Y"
                border
                borderColor="error"
                color="error"
                shape="circle"
                size="sm"
              />
            </Flex>
            <CodeBlock
              code={`// With image
<Avatar src="user.jpg" border borderColor="primary" shape="circle" size="sm" />

// With letters and color
<Avatar letters="Y" border borderColor="primary" color="primary" shape="circle" size="sm" />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
