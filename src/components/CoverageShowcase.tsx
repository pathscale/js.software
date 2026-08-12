import { ErrorBoundary, For, type JSX } from "solid-js";
import {
  ButtonGroup,
  Button,
  CheckboxGroup,
  Checkbox,
  CloseButton,
  Description,
  Disclosure,
  DisclosureGroup,
  EmptyState,
  ErrorMessage,
  FieldError,
  Flex,
  InputGroup,
  InputOTP,
  ListBox,
  MetalBorder,
  Meter,
  NumberField,
  ProgressBar,
  ProgressCircle,
  ScrollShadow,
  SearchField,
  Separator,
  SizePicker,
  Slider,
  Spinner,
  Surface,
  Tag,
  TagGroup,
  Text,
  TextArea,
  TextField,
  TimeField,
  DateField,
  Popover,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";

/**
 * Every component the rest of the site never renders.
 *
 * The Layouts port is verified by opening a component's page and reading the
 * DOM it produced. Forty-four of the eighty-nine components had no page, so a
 * port of those could be typechecked and nothing more. This is their consumer.
 *
 * Each example is deliberately minimal — the point is that the component
 * mounts and produces its classes, not that it is shown off well. Each one is
 * wrapped so that a component that cannot stand alone reports why instead of
 * blanking the page, which is itself worth knowing before porting it.
 */

type Example = {
  name: string;
  render: () => JSX.Element;
};

const EXAMPLES: Example[] = [
  {
    name: "ButtonGroup",
    render: () => (
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    ),
  },
  {
    name: "CheckboxGroup",
    render: () => (
      <CheckboxGroup>
        <Checkbox>First</Checkbox>
        <Checkbox>Second</Checkbox>
      </CheckboxGroup>
    ),
  },
  { name: "CloseButton", render: () => <CloseButton /> },
  { name: "Description", render: () => <Description>Helper text.</Description> },
  {
    name: "Disclosure",
    render: () => (
      <Disclosure>
        <Disclosure.Trigger>More</Disclosure.Trigger>
        <Disclosure.Content>Hidden until opened.</Disclosure.Content>
      </Disclosure>
    ),
  },
  {
    name: "DisclosureGroup",
    render: () => (
      <DisclosureGroup>
        <Disclosure>
          <Disclosure.Trigger>First</Disclosure.Trigger>
          <Disclosure.Content>One.</Disclosure.Content>
        </Disclosure>
      </DisclosureGroup>
    ),
  },
  {
    name: "EmptyState",
    render: () => (
      <EmptyState>
        <EmptyState.Title>Nothing here</EmptyState.Title>
        <EmptyState.Description>Add something to begin.</EmptyState.Description>
      </EmptyState>
    ),
  },
  { name: "ErrorMessage", render: () => <ErrorMessage>Required.</ErrorMessage> },
  { name: "FieldError", render: () => <FieldError>Required.</FieldError> },
  {
    name: "InputGroup",
    render: () => (
      <InputGroup>
        <TextField />
      </InputGroup>
    ),
  },
  { name: "InputOTP", render: () => <InputOTP /> },
  {
    name: "ListBox",
    render: () => (
      <ListBox items={[{ id: "a", label: "Alpha" }, { id: "b", label: "Beta" }]} />
    ),
  },
  {
    name: "MetalBorder",
    render: () => <MetalBorder>Bordered</MetalBorder>,
  },
  { name: "Meter", render: () => <Meter value={60} /> },
  { name: "NumberField", render: () => <NumberField /> },
  {
    name: "Popover",
    render: () => (
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content.</Popover.Content>
      </Popover>
    ),
  },
  { name: "ProgressBar", render: () => <ProgressBar value={40} /> },
  { name: "ProgressCircle", render: () => <ProgressCircle value={40} /> },
  {
    name: "ScrollShadow",
    render: () => (
      <ScrollShadow class="max-h-24">
        <div class="h-40">Tall content that scrolls.</div>
      </ScrollShadow>
    ),
  },
  { name: "SearchField", render: () => <SearchField /> },
  { name: "Separator", render: () => <Separator /> },
  { name: "SizePicker", render: () => <SizePicker /> },
  {
    name: "Slider",
    render: () => <Slider label="Volume" value={40} onChange={() => {}} />,
  },
  { name: "Spinner", render: () => <Spinner /> },
  { name: "Surface", render: () => <Surface>On a surface.</Surface> },
  { name: "Tag", render: () => <Tag>Tagged</Tag> },
  {
    name: "TagGroup",
    render: () => (
      <TagGroup>
        <Tag>One</Tag>
        <Tag>Two</Tag>
      </TagGroup>
    ),
  },
  { name: "Text", render: () => <Text>Body text.</Text> },
  { name: "TextArea", render: () => <TextArea /> },
  { name: "TextField", render: () => <TextField /> },
  { name: "TimeField", render: () => <TimeField /> },
  { name: "DateField", render: () => <DateField /> },
];

export default function CoverageShowcase() {
  return (
    <ShowcaseLayout>
      <Flex direction="col" gap="lg" id="gallery">
        <For each={EXAMPLES}>
          {(example) => (
            <div
              data-coverage={example.name}
              class="border border-[hsl(var(--color-border)/1)] rounded-lg p-4"
            >
              <div class="text-xs uppercase tracking-wide opacity-60 mb-3">
                {example.name}
              </div>
              <ErrorBoundary
                fallback={(error: Error) => (
                  <div data-coverage-error={example.name} class="text-sm">
                    {String(error?.message ?? error)}
                  </div>
                )}
              >
                {example.render()}
              </ErrorBoundary>
            </div>
          )}
        </For>
      </Flex>
    </ShowcaseLayout>
  );
}
