import {
  Join,
  Button,
  Flex,
  Select,
  Input,
  Badge,
  Indicator,
  Radio,
} from "@pathscale/ui";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import ShowcaseLayout from "./ShowcaseLayout";

export default function JoinShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "vertical", title: "Vertical" },
    { id: "extra-elements", title: "Extra Elements in the Group" },
    { id: "custom-radius", title: "Custom Border Radius" },
    { id: "radio-join", title: "Radio with Join" },
    { id: "props", title: "Props" },
  ];

  const props = [
    {
      name: "vertical",
      type: "boolean",
      description:
        "Apila los elementos hijos verticalmente (si `responsive` no está activo).",
    },
    {
      name: "horizontal",
      type: "boolean",
      description:
        "Coloca los elementos hijos en fila horizontal (si `responsive` no está activo).",
    },
    {
      name: "responsive",
      type: "boolean",
      description:
        "Activa disposición vertical en pantallas pequeñas y horizontal en pantallas grandes.",
    },
    {
      name: "class / className",
      type: "string",
      description: "Clases CSS personalizadas que se aplican al contenedor.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Tema a aplicar mediante el atributo `data-theme`.",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Estilos en línea aplicados al contenedor.",
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
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Join>
              <Button class="join-item">Button</Button>
              <Button class="join-item">Button</Button>
              <Button class="join-item">Button</Button>
            </Join>
            <CodeBlock
              code={`<Join>
  <Button class="join-item">Button</Button>
  <Button class="join-item">Button</Button>
  <Button class="join-item">Button</Button>
</Join>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="vertical" title="Vertical">
          <Flex direction="col" gap="md">
            <Join vertical>
              <Button class="join-item">Button</Button>
              <Button class="join-item">Button</Button>
              <Button class="join-item">Button</Button>
            </Join>
            <CodeBlock
              code={`<Join vertical>
  <Button class="join-item">Button</Button>
  <Button class="join-item">Button</Button>
  <Button class="join-item">Button</Button>
</Join>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="extra-elements"
          title="Extra Elements in the Group"
        >
          <Flex direction="col" gap="md">
            <Join>
              <div>
                <Input class="join-item" placeholder="Search..." />
              </div>
              <Select class="join-item">
                <option selected disabled>
                  Category
                </option>
                <option>Sci-fi</option>
                <option>Drama</option>
                <option>Action</option>
              </Select>
              <Indicator>
                <Indicator.Item horizontal="end" vertical="top">
                  <Badge color="secondary">new</Badge>
                </Indicator.Item>
                <Button class="join-item">Search</Button>
              </Indicator>
            </Join>
            <CodeBlock
              code={`<Join>
  <div>
    <Input class="join-item" placeholder="Search..." />
  </div>
  <Select class="join-item">
    <option selected disabled>Category</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </Select>
  <Indicator>
    <Indicator.Item horizontal="end" vertical="top">
      <Badge color="secondary">new</Badge>
    </Indicator.Item>
    <Button class="join-item">Search</Button>
  </Indicator>
</Join>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="custom-radius" title="Custom Border Radius">
          <Flex direction="col" gap="md">
            <Join>
              <Input class="join-item" placeholder="Email" />
              <Button color="primary" class="join-item rounded-r-full">
                Subscribe
              </Button>
            </Join>
            <CodeBlock
              code={`<Join>
  <Input class="join-item" placeholder="Email" />
  <Button color="primary" class="join-item rounded-r-full">Subscribe</Button>
</Join>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="radio-join" title="Radio with Join">
          <Flex direction="col" gap="md">
            <Join>
              <Flex
                as="label"
                class="cursor-pointer join-item px-4"
                align="center"
                gap="sm"
              >
                <Radio name="radio-join" checked />
                <span>Red Pill</span>
              </Flex>
              <Flex
                as="label"
                class="cursor-pointer join-item px-4"
                align="center"
                gap="sm"
              >
                <Radio name="radio-join" />
                <span>Blue Pill</span>
              </Flex>
            </Join>
            <CodeBlock
              code={`<Join>
  <Flex as="label" class="cursor-pointer join-item px-4" align="center" gap="sm">
    <Radio
      name="radio-join"
      class="checked:bg-red-500"
      checked
    />
    <span>Red Pill</span>
  </Flex>
  <Flex as="label" class="cursor-pointer join-item px-4" align="center" gap="sm">
    <Radio name="radio-join" class="checked:bg-blue-500" />
    <span>Blue Pill</span>
  </Flex>
</Join>`}
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
