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
  ColorPicker,
  ColorArea,
  ColorField,
  ColorSlider,
  ComboBox,
  DatePicker,
  DateRangePicker,
  RangeCalendar,
  Header,
  Toolbar,
  LanguageSwitcher,
  LiveChatBubble,
  ThemeColorPicker,
  Kbd,
  createI18n,
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
  {
    // Kbd itself is shown on its own page, but its Abbr is used nowhere: it
    // renders a glyph for a named key and titles itself with that key's name.
    name: "Kbd.Abbr",
    render: () => (
      <Kbd>
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
    ),
  },
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

/**
 * The components that need more than a tag to render: a provider, a data
 * source, or both.
 *
 * Three of these were assumed to need a provider and do not — LanguageSwitcher,
 * ThemeColorPicker and LiveChat are used bare in nofilter.io and honey.id. The
 * assumption is what kept them uncovered, which is the same mistake as deriving
 * an API from a recipe instead of from a call site.
 */
const COMPOSED: Example[] = [
  {
    name: "ColorPicker",
    render: () => (
      <ColorPicker value="#6366f1">
        <ColorPicker.Area />
        <ColorPicker.Slider />
        <ColorPicker.Field />
      </ColorPicker>
    ),
  },
  {
    name: "ColorArea",
    render: () => <ColorArea value={{ h: 250, s: 0.7, v: 0.9 }} />,
  },
  { name: "ColorField", render: () => <ColorField value="#6366f1" /> },
  { name: "ColorSlider", render: () => <ColorSlider value={250} type="hue" /> },
  {
    name: "ComboBox",
    render: () => (
      <ComboBox
        items={[
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta" },
        ]}
      >
        <ComboBox.InputGroup>
          <ComboBox.Input />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
      </ComboBox>
    ),
  },
  { name: "DatePicker", render: () => <DatePicker value={new Date()} /> },
  {
    name: "DateRangePicker",
    render: () => <DateRangePicker value={{ start: new Date(), end: new Date() }} />,
  },
  {
    name: "RangeCalendar",
    render: () => <RangeCalendar value={{ start: new Date(), end: new Date() }} />,
  },
  { name: "Header", render: () => <Header>Header content</Header> },
  { name: "Toolbar", render: () => <Toolbar>Toolbar content</Toolbar> },
  {
    // Needs an i18n store. The library exports the factory for it, so the
    // example builds one rather than faking the shape.
    name: "LanguageSwitcher",
    render: () => (
      <LanguageSwitcher
        i18n={createI18n({
          languages: [
            { code: "en", name: "English" },
            { code: "es", name: "Espanol" },
          ],
          storageKey: "coverage-locale",
        })}
      />
    ),
  },
  { name: "ThemeColorPicker", render: () => <ThemeColorPicker /> },
  {
    // There is no `LiveChat` export — the tracker names components after their
    // recipe file, and this one ships as a bubble and a panel.
    name: "LiveChatBubble",
    render: () => <LiveChatBubble />,
  },
];

export default function CoverageShowcase() {
  return (
    <ShowcaseLayout>
      <Flex direction="col" gap="lg" id="gallery">
        <For each={[...EXAMPLES, ...COMPOSED]}>
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
