import type { JSX } from "@solidjs/web";
import { createErrorBoundary, createSignal, For, onCleanup, Show } from "solid-js";
import {
  Accordion,
  Address,
  AuthCard,
  AuthFieldGroup,
  AuthFooterLinks,
  AuthMessage,
  AuthPoweredBy,
  AuthSubmitButton,
  Button,
  Card,
  Checkbox,
  Chip,
  Collapsible,
  ColorSwatch,
  ColorWheel,
  ComplexColorWheel,
  Composer,
  ConnectionSettings,
  CookieConsent,
  createConnectionSettings,
  createI18n,
  Empty,
  FieldGroup,
  FirefoxPWABanner,
  Flex,
  FlexGrid,
  Header,
  ImmersiveLanding,
  InlineEdit,
  Input,
  InputOTP,
  Label,
  LanguageSwitcher,
  ListBox,
  LiveChatBubble,
  LiveChatPanel,
  MetalBorder,
  PanelToggle,
  PasswordField,
  PasswordRequirements,
  Popover,
  Progress,
  PWAInstallPrompt,
  ScrollArea,
  Separator,
  Slider,
  Spinner,
  Text,
  Textarea,
  ThemeColorPicker,
  type ComponentFamilyId,
} from "@pathscale/ui";
import CloseButton from "@pathscale/ui/components/close-button";
import { ButtonGroup, CheckboxGroup, Meter, RadialProgress, SizePicker, TimeField, DateField, ColorPicker, ColorArea, ColorField, ColorSlider, ColorSwatchPicker, ColorWheelFlower, ComboBox, DatePicker, DateRangePicker, RangeCalendar, Toolbar, Kbd } from "@pathscale/ui/lab";
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

function CloseButtonExample() {
  const [closed, setClosed] = createSignal(false);
  return (
    <>
      <CloseButton
        id="coverage-close-button"
        aria-label="Dismiss coverage notice"
        state={closed() ? "disabled" : "default"}
        onClick={() => setClosed(true)}
      />
      <p role="status">{closed() ? "Dismissed" : "Coverage notice open"}</p>
    </>
  );
}

const [activeFullscreenExample, setActiveFullscreenExample] = createSignal<string | null>(null);

const savedDocumentStyle: Record<string, string> = {};

function openFullscreenExample(name: string) {
  const root = document.documentElement.style;
  const body = document.body.style;
  for (const [key, value] of [
    ["rootHeight", root.height],
    ["rootMinHeight", root.minHeight],
    ["rootOverflow", root.overflow],
    ["bodyHeight", body.height],
    ["bodyMinHeight", body.minHeight],
    ["bodyOverflow", body.overflow],
  ]) savedDocumentStyle[key] = value;
  root.height = "100vh";
  root.minHeight = "0";
  root.overflow = "hidden";
  body.height = "100vh";
  body.minHeight = "0";
  body.overflow = "hidden";
  window.scrollTo({ top: 0, behavior: "instant" });
  setActiveFullscreenExample(name);
}

function closeFullscreenExample() {
  setActiveFullscreenExample(null);
  const root = document.documentElement.style;
  const body = document.body.style;
  root.height = savedDocumentStyle.rootHeight ?? "";
  root.minHeight = savedDocumentStyle.rootMinHeight ?? "";
  root.overflow = savedDocumentStyle.rootOverflow ?? "";
  body.height = savedDocumentStyle.bodyHeight ?? "";
  body.minHeight = savedDocumentStyle.bodyMinHeight ?? "";
  body.overflow = savedDocumentStyle.bodyOverflow ?? "";
}

function DeferredExample(props: { name: string; render: () => JSX.Element }) {
  return (
    <>
      {activeFullscreenExample() === props.name
        ? props.render()
        : <Button
            id={`coverage-load-${props.name.toLowerCase()}`}
            type="button"
            onClick={() => openFullscreenExample(props.name)}
          >
            Load {props.name}
          </Button>}
    </>
  );
}

function AddressExample() {
  const [copied, setCopied] = createSignal("Nothing copied");
  return (
    <>
      <Address id="coverage-address" value="0x1234567890abcdef" onCopy={(value) => setCopied(`Copied ${value}`)} />
      <p role="status">{copied()}</p>
    </>
  );
}

function AuthActionsExample() {
  const [result, setResult] = createSignal("No auth action yet");
  return (
    <AuthCard title="Sign in" description="Use the account attached to this showcase.">
      <AuthFieldGroup>
        <Label for="coverage-email">Email</Label>
        <Input id="coverage-email" type="email" />
        <AuthMessage flavor="info" message="This is a complete auth composition." />
        <AuthSubmitButton id="coverage-auth-submit" type="button" onClick={() => setResult("Sign in submitted")}>Sign in</AuthSubmitButton>
      </AuthFieldGroup>
      <AuthFooterLinks
        id="coverage-auth-footer-links"
        items={[
          { key: "privacy", label: "Privacy", onClick: () => setResult("Privacy opened") },
          { key: "help", label: "Help", onClick: () => setResult("Help opened") },
        ]}
      />
      <AuthPoweredBy id="coverage-auth-powered-by" href="#coverage-honey" />
      <p role="status">{result()}</p>
    </AuthCard>
  );
}

function ComposerExample() {
  const [value, setValue] = createSignal("");
  const [sent, setSent] = createSignal("Nothing sent");
  return (
    <>
      <Composer
        id="coverage-composer"
        value={value()}
        placeholder="Write a showcase message"
        onChange={setValue}
        onSubmit={(message) => setSent(`Sent ${message}`)}
      />
      <p role="status">{sent()}</p>
    </>
  );
}

function ConnectionSettingsExample() {
  const [result, setResult] = createSignal("Default backend active");
  const store = createConnectionSettings({
    storageKey: "js-software-coverage-connection",
    endpoints: [{ name: "api", fallback: "https://api.example.com" }],
    onApply: ({ urls }) => {
      setResult(`Connected to ${urls.api}`);
    },
  });
  return (
    <>
      <ConnectionSettings
        id="coverage-connection-settings"
        store={store}
        endpoints={[{ name: "api", label: "API URL" }]}
        labels={{ useCustom: "Use custom backend", save: "Save connection", reset: "Reset connection" }}
        onSaved={() => { setResult(`Saved ${store.urls.api}`); }}
        onResetDone={() => { setResult("Default backend restored"); }}
      />
      <p role="status">{result()}</p>
    </>
  );
}

function InlineEditExample() {
  const [value, setValue] = createSignal("Showcase title");
  return (
    <>
      <InlineEdit id="coverage-inline-edit" value={value()} label="Edit showcase title" onCommit={setValue} />
      <p role="status">Saved title: {value()}</p>
    </>
  );
}

function PanelToggleExample() {
  const [expanded, setExpanded] = createSignal(true);
  return (
    <div class="relative min-h-24 pl-8">
      <PanelToggle
        id="coverage-panel-toggle"
        expanded={expanded()}
        aria-controls="coverage-panel"
        aria-label={expanded() ? "Hide coverage panel" : "Show coverage panel"}
        side="left"
        onClick={() => setExpanded((value) => !value)}
      />
      <Show when={expanded()}><aside id="coverage-panel">Coverage panel content</aside></Show>
    </div>
  );
}

function PasswordFieldExample() {
  const [value, setValue] = createSignal("");
  return (
    <>
      <PasswordField
        id="coverage-password"
        label="Coverage password"
        showLabel="Show password"
        hideLabel="Hide password"
        value={value()}
        onChange={setValue}
      />
      <PasswordRequirements
        title="Password progress"
        results={[
          { key: "length", message: "At least eight characters", passed: value().length >= 8 },
          { key: "number", message: "Contains a number", passed: /\d/.test(value()) },
        ]}
      />
    </>
  );
}

function LiveChatPanelExample() {
  const [sent, setSent] = createSignal("Nothing sent");
  const [closed, setClosed] = createSignal(false);
  return (
    <Show when={!closed()} fallback={<p role="status">Chat closed</p>}>
      <LiveChatPanel
        title="Component support"
        sendLabel="Send chat message"
        onClose={() => setClosed(true)}
        onSendMessage={async ({ message }) => {
          setSent(`Sent ${message}`);
          return { messageId: "coverage-message", timestamp: Date.now() };
        }}
      />
      <p role="status">{sent()}</p>
    </Show>
  );
}

function ImmersiveLandingExample() {
  const [page, setPage] = createSignal("intro");
  return (
    <>
      <ImmersiveLanding
        pages={["intro", "details"]}
        initialPage="intro"
        transitionDuration={0}
        onNavigate={(_from, to) => setPage(to)}
      >
        <ImmersiveLanding.Page id="intro"><h3>Introduction</h3></ImmersiveLanding.Page>
        <ImmersiveLanding.Page id="details"><h3>Details</h3></ImmersiveLanding.Page>
      </ImmersiveLanding>
      <p role="status">Landing page: {page()}</p>
    </>
  );
}

function PWAExamples() {
  const [result, setResult] = createSignal("No install choice");
  setTimeout(() => {
    const installEvent = new Event("beforeinstallprompt", { cancelable: true });
    Object.defineProperties(installEvent, {
      prompt: { value: () => undefined },
      userChoice: { value: Promise.resolve({ outcome: "accepted", platform: "web" }) },
    });
    window.dispatchEvent(installEvent);
  }, 0);
  return (
    <>
      <PWAInstallPrompt
        storageKey="js-software-coverage-pwa"
        texts={{ installButton: "Install showcase", notNowButton: "Install later", closeLabel: "Close install prompt" }}
        onInstall={() => setResult("Install accepted")}
        onDismiss={() => setResult("Install dismissed")}
      />
      <p role="status">{result()}</p>
    </>
  );
}

function FirefoxPWAExample() {
  const [result, setResult] = createSignal("Firefox prompt open");
  const descriptor = Object.getOwnPropertyDescriptor(navigator, "userAgent");
  Object.defineProperty(navigator, "userAgent", {
    configurable: true,
    value: "Mozilla/5.0 Firefox/130.0",
  });
  const originalOpen = globalThis.open;
  globalThis.open = (() => null) as typeof globalThis.open;
  onCleanup(() => {
    if (descriptor) Object.defineProperty(navigator, "userAgent", descriptor);
    globalThis.open = originalOpen;
  });
  return (
    <>
      <FirefoxPWABanner
        storageKey="js-software-coverage-firefox"
        showDelayMs={0}
        texts={{ installButton: "Install Firefox extension", dismissButton: "Maybe later", closeLabel: "Close Firefox prompt" }}
        onInstall={() => setResult("Firefox install opened")}
        onDismiss={() => setResult("Firefox prompt dismissed")}
      />
      <p role="status">{result()}</p>
    </>
  );
}

function CookieConsentExample() {
  const [result, setResult] = createSignal("No cookie choice");
  return (
    <>
      <CookieConsent
        storageKeys={{
          consentKey: "js-software-coverage-cookie",
          analyticsKey: "js-software-coverage-analytics",
          marketingKey: "js-software-coverage-marketing",
        }}
        texts={{
          acceptAll: "Accept all coverage cookies",
          decline: "Decline coverage cookies",
          manage: "Manage coverage cookies",
          manageTitle: "Manage coverage cookie preferences",
          marketing: "Coverage marketing cookies",
          save: "Save coverage cookie preferences",
        }}
        onConsentChange={({ type }) => setResult(`Cookie consent ${type}`)}
      />
      <p role="status">{result()}</p>
    </>
  );
}

function LanguageSwitcherExample() {
  const [result, setResult] = createSignal("No language selected");
  const i18n = createI18n({
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Espanol" },
    ],
    storageKey: "coverage-locale",
  });
  return (
    <>
      <LanguageSwitcher
        id="coverage-language-switcher"
        i18n={i18n}
        onLanguageChange={(code) => setResult(`Language selected ${code}`)}
      />
      <p role="status">{result()}</p>
    </>
  );
}

const EXAMPLES: Example[] = [
  { name: "Address", render: () => <AddressExample /> },
  { name: "Auth composition", render: () => <AuthActionsExample /> },
  {
    name: "FieldGroup",
    render: () => (
      <FieldGroup>
        <Label for="coverage-field-group">Grouped field</Label>
        <Input id="coverage-field-group" />
      </FieldGroup>
    ),
  },
  { name: "Composer", render: () => <ComposerExample /> },
  { name: "ConnectionSettings", render: () => <ConnectionSettingsExample /> },
  {
    name: "ColorSwatch",
    render: () => {
      const [selected, setSelected] = createSignal("No swatch selected");
      return (
        <>
          <ColorSwatch id="coverage-indigo-swatch" color="#6366f1" colorName="Indigo swatch" onSelect={(value) => setSelected(`Selected ${value}`)} />
          <p role="status">{selected()}</p>
        </>
      );
    },
  },
  {
    name: "ColorSwatchPicker",
    render: () => {
      const [value, setValue] = createSignal("#ef4444");
      return (
        <ColorSwatchPicker value={value()} onChange={setValue}>
          <ColorSwatch id="coverage-red-swatch" color="#ef4444" colorName="Red swatch" />
          <ColorSwatch id="coverage-blue-swatch" color="#3b82f6" colorName="Blue swatch" />
        </ColorSwatchPicker>
      );
    },
  },
  {
    name: "ColorWheel",
    render: () => {
      const [value, setValue] = createSignal("#6366f1");
      return <ColorWheel id="coverage-color-wheel" aria-label="Coverage color wheel" value={value()} onChange={setValue} />;
    },
  },
  {
    name: "ColorWheelFlower",
    render: () => {
      const [value, setValue] = createSignal("#6366f1");
      return <ColorWheelFlower id="coverage-standalone-color-wheel-flower" color={value()} onChange={(next) => setValue(next.hex)} />;
    },
  },
  {
    name: "ComplexColorWheel",
    render: () => {
      const [value, setValue] = createSignal("#6366f1");
      const [strength, setStrength] = createSignal(10);
      return (
        <ComplexColorWheel
          id="coverage-complex-color-wheel"
          aria-label="Coverage complex color wheel"
          value={value()}
          onChange={setValue}
          adjustments={[{ id: "strength", label: "Strength", get value() { return strength(); }, stops: [10, 20], onChange: setStrength }]}
        />
      );
    },
  },
  { name: "InlineEdit", render: () => <InlineEditExample /> },
  { name: "PanelToggle", render: () => <PanelToggleExample /> },
  { name: "PasswordField and PasswordRequirements", render: () => <PasswordFieldExample /> },
  {
    name: "FlexGrid",
    render: () => (
      <FlexGrid
        rows={["Alpha", "Beta", "Gamma"]}
        pageSize={2}
        autoLoad={false}
        more={({ count, reveal }) => <Button id="coverage-flex-grid-more" onClick={reveal}>Show {count} more</Button>}
      >
        {(row) => <div>{String(row)}</div>}
      </FlexGrid>
    ),
  },
  { name: "LiveChatPanel", render: () => <DeferredExample name="LiveChatPanel" render={() => <LiveChatPanelExample />} /> },
  { name: "ImmersiveLanding", render: () => <DeferredExample name="ImmersiveLanding" render={() => <ImmersiveLandingExample />} /> },
  { name: "CookieConsent", render: () => <DeferredExample name="CookieConsent" render={() => <CookieConsentExample />} /> },
  { name: "PWAInstallPrompt", render: () => <DeferredExample name="PWAInstallPrompt" render={() => <PWAExamples />} /> },
  { name: "FirefoxPWABanner", render: () => <DeferredExample name="FirefoxPWABanner" render={() => <FirefoxPWAExample />} /> },
  {
    name: "ButtonGroup",
    render: () => {
      const [selected, setSelected] = createSignal("");
      return (
        <>
          <ButtonGroup>
            <Button id="coverage-button-group-one" aria-pressed={selected() === "One" ? "true" : "false"} onClick={() => setSelected("One")}>One</Button>
            <Button id="coverage-button-group-two" aria-pressed={selected() === "Two" ? "true" : "false"} onClick={() => setSelected("Two")}>Two</Button>
          </ButtonGroup>
          <p role="status">{selected() ? `Selected ${selected()}` : "No button selected"}</p>
        </>
      );
    },
  },
  {
    name: "CheckboxGroup",
    render: () => (
      <CheckboxGroup>
        <Checkbox id="coverage-checkbox-first">First</Checkbox>
        <Checkbox id="coverage-checkbox-second">Second</Checkbox>
      </CheckboxGroup>
    ),
  },
  {
    name: "CloseButton",
    render: () => <CloseButtonExample />,
  },
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
  { name: "Input (placeholder)", render: () => <Input id="coverage-helper-input" aria-label="Coverage helper input" placeholder="Helper text." /> },
  {
    name: "Collapsible",
    render: () => (
      <Collapsible id="coverage-collapsible">
        <Collapsible.Trigger id="coverage-collapsible-trigger">More</Collapsible.Trigger>
        <Collapsible.Content>Hidden until opened.</Collapsible.Content>
      </Collapsible>
    ),
  },
  {
    name: "Accordion",
    render: () => (
      <Accordion id="coverage-accordion">
        <Collapsible id="coverage-accordion-first">
          <Collapsible.Trigger id="coverage-accordion-first-trigger">First</Collapsible.Trigger>
          <Collapsible.Content>One.</Collapsible.Content>
        </Collapsible>
      </Accordion>
    ),
  },
  {
    name: "Empty",
    render: () => (
      <Empty>
        <Empty.Title>Nothing here</Empty.Title>
        <Empty.Description>Add something to begin.</Empty.Description>
      </Empty>
    ),
  },
  { name: "Input (issues)", render: () => <Input id="coverage-issues-input" aria-label="Coverage input with issues" issues={[{ code: "required", message: "Required." }]} /> },
  { name: "Input (invalid)", render: () => <Input id="coverage-invalid-input" aria-label="Coverage invalid input" state="invalid" /> },
  {
    name: "Input (grouped)",
    render: () => {
      const [value, setValue] = createSignal("");
      const [submitted, setSubmitted] = createSignal("Nothing submitted");
      let submissions = 0;
      return (
        <>
          <Flex gap="sm">
            <Input
              id="coverage-grouped-input"
              type="text"
              aria-label="Grouped input"
              value={value()}
              onInput={(event) => setValue(event.currentTarget.value)}
            />
            <Button id="coverage-grouped-submit" onClick={() => setSubmitted(`Submitted ${value() || "empty value"} · ${++submissions}`)}>Go</Button>
          </Flex>
          <p role="status">{submitted()}</p>
        </>
      );
    },
  },
  { name: "InputOTP", render: () => <InputOTP id="coverage-verification-code" aria-label="Coverage verification code" /> },
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
  { name: "Input (number)", render: () => <Input id="coverage-number-input" aria-label="Coverage number input" type="number" /> },
  {
    name: "Popover",
    render: () => (
      <Popover id="coverage-popover">
        <Popover.Trigger id="coverage-popover-trigger">Open</Popover.Trigger>
        <Popover.Content>Content.</Popover.Content>
      </Popover>
    ),
  },
  { name: "Progress", render: () => <Progress value={40} /> },
  { name: "RadialProgress", render: () => <RadialProgress value={40} /> },
  {
    name: "ScrollArea",
    render: () => (
      <ScrollArea class="max-h-24">
        <div class="h-40">Tall content that scrolls.</div>
      </ScrollArea>
    ),
  },
  { name: "Input (search)", render: () => <Input id="coverage-search-input" aria-label="Coverage search input" type="search" /> },
  { name: "Separator", render: () => <Separator /> },
  { name: "SizePicker", render: () => <SizePicker id="coverage-size-picker" /> },
  {
    name: "Slider",
    render: () => {
      const [value, setValue] = createSignal(40);
      return <Slider id="coverage-volume" label="Volume" value={value()} onChange={setValue} />;
    },
  },
  { name: "Spinner", render: () => <Spinner /> },
  { name: "Card (surface)", render: () => <Card>On a surface.</Card> },
  { name: "Tag", render: () => <Chip>Tagged</Chip> },
  {
    name: "Chip (grouped)",
    render: () => (
      <Flex gap="sm">
        <Chip>One</Chip>
        <Chip>Two</Chip>
      </Flex>
    ),
  },
  { name: "Text", render: () => <Text>Body text.</Text> },
  { name: "Textarea", render: () => <Textarea id="coverage-textarea" aria-label="Coverage textarea" /> },
  { name: "Input (text)", render: () => <Input id="coverage-text-input" aria-label="Coverage text input" type="text" /> },
  {
    name: "TimeField",
    render: () => {
      const [value, setValue] = createSignal("");
      return <TimeField value={value()} onChange={setValue}><TimeField.Group><TimeField.Input id="coverage-time" aria-label="Coverage time" /></TimeField.Group></TimeField>;
    },
  },
  {
    name: "DateField",
    render: () => {
      const [value, setValue] = createSignal("");
      return <DateField value={value()} onChange={setValue}><DateField.Group><DateField.Input id="coverage-date" aria-label="Coverage date" /></DateField.Group></DateField>;
    },
  },
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
    render: () => {
      const [value, setValue] = createSignal("#6366f1");
      return (
        <ColorPicker id="coverage-color-picker" value={value()} onChange={setValue}>
          <ColorPicker.Area id="coverage-color-picker-area" aria-label="Coverage color area" />
          <ColorPicker.Slider id="coverage-color-picker-hue" aria-label="Coverage color hue" />
          <ColorPicker.Field id="coverage-color-picker-value" aria-label="Coverage color value" />
        </ColorPicker>
      );
    },
  },
  {
    name: "ColorArea",
    render: () => {
      const [value, setValue] = createSignal({ h: 250, s: 0.7, v: 0.9 });
      return <ColorArea id="coverage-standalone-color-area" aria-label="Standalone color area" value={value()} onChange={setValue} />;
    },
  },
  {
    name: "ColorField",
    render: () => {
      const [value, setValue] = createSignal("#6366f1");
      return <ColorField id="coverage-standalone-color-value" aria-label="Standalone color value" value={value()} onChange={setValue} />;
    },
  },
  {
    name: "ColorSlider",
    render: () => {
      const [value, setValue] = createSignal(250);
      return (
        <ColorSlider
          id="coverage-standalone-hue"
          aria-label="Standalone hue"
          value={value()}
          type="hue"
          onChange={setValue}
        />
      );
    },
  },
  {
    name: "ComboBox",
    render: () => {
      const [selected, setSelected] = createSignal<string | null>(null);
      return (
        <ComboBox
          id="coverage-combo-box"
          items={[
            { id: "a", label: "Alpha" },
            { id: "b", label: "Beta" },
          ]}
          selectedKey={selected()}
          onSelectionChange={setSelected}
        >
          <ComboBox.InputGroup>
            <ComboBox.Input id="coverage-combo-box-input" aria-label="Coverage combo box" />
            <ComboBox.Trigger id="coverage-combo-box-trigger" />
          </ComboBox.InputGroup>
          <ComboBox.Popover><ComboBox.List /></ComboBox.Popover>
        </ComboBox>
      );
    },
  },
  {
    name: "DatePicker",
    render: () => {
      const [value, setValue] = createSignal(new Date());
      return <DatePicker id="coverage-date-picker" value={value()} onChange={setValue} />;
    },
  },
  {
    name: "DateRangePicker",
    render: () => {
      const [value, setValue] = createSignal({ start: new Date(), end: new Date() });
      return <DateRangePicker id="coverage-date-range-picker" value={value()} onChange={setValue} />;
    },
  },
  {
    name: "RangeCalendar",
    render: () => {
      const [value, setValue] = createSignal({ start: new Date(), end: new Date() });
      return <RangeCalendar id="coverage-range-calendar" value={value()} onChange={setValue} />;
    },
  },
  { name: "Header", render: () => <Header>Header content</Header> },
  {
    name: "Toolbar",
    render: () => {
      const [result, setResult] = createSignal("No coverage tool selected");
      return (
        <>
          <Toolbar id="coverage-toolbar" aria-label="Coverage tools">
            <Button id="coverage-toolbar-first" onClick={() => setResult("First coverage tool selected")}>First coverage tool</Button>
            <Button id="coverage-toolbar-second" onClick={() => setResult("Second coverage tool selected")}>Second coverage tool</Button>
          </Toolbar>
          <p role="status">{result()}</p>
        </>
      );
    },
  },
  {
    // Needs an i18n store. The library exports the factory for it, so the
    // example builds one rather than faking the shape.
    name: "LanguageSwitcher",
    render: () => <LanguageSwitcherExample />,
  },
  { name: "ThemeColorPicker", render: () => <ThemeColorPicker id="coverage-theme-color-picker" aria-label="Change coverage theme color" storagePrefix="js-software-coverage" /> },
  {
    // There is no `LiveChat` export — the tracker names components after their
    // recipe file, and this one ships as a bubble and a panel.
    name: "LiveChatBubble",
    render: () => <DeferredExample name="LiveChatBubble" render={() => {
      const [opened, setOpened] = createSignal(false);
      return (
        <>
          <LiveChatBubble onOpen={() => setOpened(true)} />
          <p role="status">{opened() ? "Chat bubble opened" : "Chat bubble closed"}</p>
        </>
      );
    }} />,
  },
];

const familyIdsByExampleName = {
  Address: ["address"],
  "Auth composition": ["auth-card", "auth-field-group", "auth-footer-links", "auth-message", "auth-powered-by", "auth-submit-button", "label"],
  FieldGroup: ["field-group"],
  Composer: ["composer"],
  ConnectionSettings: ["connection-settings"],
  ColorSwatch: ["color-swatch"],
  ColorSwatchPicker: ["color-swatch-picker"],
  ColorWheel: ["color-wheel"],
  ColorWheelFlower: ["color-wheel-flower"],
  ComplexColorWheel: ["complex-color-wheel"],
  InlineEdit: ["inline-edit"],
  PanelToggle: ["panel-toggle"],
  "PasswordField and PasswordRequirements": ["password-field", "password-requirements"],
  FlexGrid: ["flex-grid"],
  LiveChatPanel: ["live-chat-panel"],
  ImmersiveLanding: ["immersive-landing"],
  CookieConsent: ["cookie-consent"],
  PWAInstallPrompt: ["pwa-install-prompt"],
  FirefoxPWABanner: ["firefox-pwa-banner"],
  ButtonGroup: ["button-group"],
  CheckboxGroup: ["checkbox-group"],
  CloseButton: ["close-button"],
  "Kbd.Abbr": ["kbd"],
  "Input (placeholder)": ["input"],
  Collapsible: ["collapsible"],
  Accordion: ["accordion"],
  Empty: ["empty"],
  "Input (issues)": ["input"],
  "Input (invalid)": ["input"],
  "Input (grouped)": ["input"],
  InputOTP: ["input-otp"],
  ListBox: ["list-box"],
  MetalBorder: ["metal-border"],
  Meter: ["meter"],
  "Input (number)": ["input"],
  Popover: ["popover"],
  Progress: ["progress"],
  RadialProgress: ["radial-progress"],
  ScrollArea: ["scroll-area"],
  "Input (search)": ["input"],
  Separator: ["separator"],
  SizePicker: ["size-picker"],
  Slider: ["slider"],
  Spinner: ["spinner"],
  "Card (surface)": ["card"],
  Tag: ["chip"],
  "Chip (grouped)": ["chip"],
  Text: ["text"],
  Textarea: ["textarea"],
  "Input (text)": ["input"],
  TimeField: ["time-field"],
  DateField: ["date-field"],
  ColorPicker: ["color-picker"],
  ColorArea: ["color-area"],
  ColorField: ["color-field"],
  ColorSlider: ["color-slider"],
  ComboBox: ["combo-box"],
  DatePicker: ["date-picker"],
  DateRangePicker: ["date-range-picker"],
  RangeCalendar: ["range-calendar"],
  Header: ["header"],
  Toolbar: ["toolbar"],
  LanguageSwitcher: ["language-switcher"],
  ThemeColorPicker: ["theme-color-picker"],
  LiveChatBubble: ["live-chat-bubble"],
} as const satisfies Record<string, readonly ComponentFamilyId[]>;

const examples = [...EXAMPLES, ...COMPOSED];
const exampleNames = new Set(examples.map((example) => example.name));
const staleMappings = Object.keys(familyIdsByExampleName).filter((name) => !exampleNames.has(name));
const unmappedExamples = examples.filter((example) => !(example.name in familyIdsByExampleName));
if (staleMappings.length > 0 || unmappedExamples.length > 0) {
  throw new Error(
    `coverage example registry differs; stale mappings: ${staleMappings.join(", ") || "none"}; unmapped examples: ${unmappedExamples.map((example) => example.name).join(", ") || "none"}`,
  );
}

export const coverageFamilyIds = [
  ...new Set(Object.values(familyIdsByExampleName).flat()),
] as ComponentFamilyId[];

export default function CoverageShowcase() {
  onCleanup(() => {
    if (activeFullscreenExample()) closeFullscreenExample();
  });
  const activeExample = () => examples.find((example) => example.name === activeFullscreenExample());
  return (
    <ShowcaseLayout>
      <Show
        when={activeExample()}
        fallback={
          <Flex direction="col" gap="lg" id="gallery">
            <For each={examples}>
              {(example) => (
                <div
                  data-coverage={example.name}
                  data-families={familyIdsByExampleName[example.name as keyof typeof familyIdsByExampleName]?.join(" ")}
                  class="border border-[hsl(var(--color-border)/1)] rounded-lg p-4"
                >
                  <div class="text-xs uppercase tracking-wide opacity-60 mb-3">
                    {example.name}
                  </div>
                  {createErrorBoundary(
                    () => example.render(),
                    (error) => (
                        <div data-coverage-error={example.name} class="text-sm">
                          {String((error() as Error)?.message ?? error())}
                        </div>
                    ),
                  )()}
                </div>
              )}
            </For>
          </Flex>
        }
      >
        {(example) => (
          <div data-fullscreen-example={example().name}>
            <Button
              type="button"
              class="fixed top-4 left-4 z-[100]"
              onClick={closeFullscreenExample}
            >
              Return to coverage
            </Button>
            {example().render()}
          </div>
        )}
      </Show>
    </ShowcaseLayout>
  );
}
