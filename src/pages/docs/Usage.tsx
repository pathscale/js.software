import { Component } from "solid-js";
import { Button, Card, Flex } from "@pathscale/ui";
import { ContentContainer } from "../../components/content/ContentContainer";
import { CodeBlock } from "../../components/showcase/CodeBlock";
import { Callout } from "../../components/content/Callout";
import { ROUTES, EXTERNAL_ROUTES } from "../../config/routes";

const Usage: Component = () => {
  return (
    <ContentContainer maxWidth="2xl" prose={false}>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Usage Cheatsheet</h1>
        <p class="text-xl text-base-content/70 leading-relaxed max-w-3xl">
          The conventions that hold across every @pathscale/ui component — prop
          naming, controlled/uncontrolled patterns, forms, tables, toasts, icons
          and dates. Written for looking things up while you work, rather than
          reading once.
        </p>
      </div>

      <Callout type="info" title="Source of truth" class="mb-12">
        This page mirrors{" "}
        <a
          href={EXTERNAL_ROUTES.UI_USAGE_DOC}
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline font-medium"
        >
          docs/ui-usage.md
        </a>{" "}
        in the library repository, which is the canonical reference for every
        consuming app. Where the two ever disagree, the markdown wins — and the
        fast-moving parts (theme tokens, the component inventory) are
        deliberately left there rather than copied here.
      </Callout>

      <section class="mb-12">
        <h2 id="install" class="text-3xl font-semibold mb-4">
          Install &amp; setup
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Peer dependencies: solid-js 2.0, @solidjs/web and solid-layouts, plus
          popmotion and @standard-schema/spec (both optional). Forms and the grid
          model are provided by the library.
        </p>
        <CodeBlock
          language="bash"
          code={`bun add @pathscale/ui solid-layouts
bun add -d rsbuild-plugin-solid-layouts`}
          class="mb-6"
        />
        <p class="text-base-content/70 mb-4 max-w-3xl">
          Everything is exported from the root barrel, and one stylesheet brings
          in tokens, themes, base styles and icons:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { Button, Flex, Dialog, toast } from "@pathscale/ui";
import "@pathscale/ui/index.css";

// rsbuild.config.ts
pluginSolid2LayoutsApplication({ layouts: ["@pathscale/ui"] })`}
          class="mb-6"
        />
        <p class="text-base-content/70 max-w-3xl">
          Subpath exports also exist if you need them:{" "}
          <code class="text-sm">./components/*</code>,{" "}
          <code class="text-sm">./primitives/*</code>,{" "}
          <code class="text-sm">./hooks/*</code>,{" "}
          <code class="text-sm">./motion</code>,{" "}
          <code class="text-sm">./styles/*</code>. There is also{" "}
          <code class="text-sm">./lab</code>, where components with no adopted
          call site across the fleet are parked. Nothing there is deprecated;
          it is off the main surface so the main surface says what is in use.
        </p>
      </section>

      <section class="mb-12">
        <h2 id="theming" class="text-3xl font-semibold mb-4">
          Theming
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Two themes ship with the library — <code class="text-sm">light</code>{" "}
          (the default when no attribute is set) and{" "}
          <code class="text-sm">dark</code>. Switch globally by setting the
          attribute on the document, or scope a subtree by passing{" "}
          <code class="text-sm">dataTheme</code> to any component.
        </p>
        <CodeBlock
          language="typescript"
          code={`document.documentElement.setAttribute("data-theme", "dark");`}
          class="mb-6"
        />
        <Callout type="note" title="Tokens are not duplicated here">
          The full list of CSS custom properties — colors, surfaces, radii, and
          the glass set — changes whenever the library does, so it lives in one
          place only:{" "}
          <a
            href={EXTERNAL_ROUTES.UI_USAGE_DOC}
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline font-medium"
          >
            the Theming section of ui-usage.md
          </a>
          . To see the tokens applied live, use the{" "}
          <a href={ROUTES.THEMING} class="text-primary hover:underline">
            theming playground
          </a>
          .
        </Callout>
      </section>

      <section class="mb-12">
        <h2 id="conventions" class="text-3xl font-semibold mb-4">
          Component conventions
        </h2>
        <ul class="space-y-3 text-base-content/70 mb-6 max-w-3xl">
          <li>
            • <strong>One state axis, not a bag of booleans.</strong> The
            HeroUI-style <code class="text-sm">is*</code> props are gone.{" "}
            <code class="text-sm">state</code> holds one of{" "}
            <code class="text-sm">
              default | loading | error | invalid | disabled | hidden
            </code>
            , so <code class="text-sm">isDisabled</code>,{" "}
            <code class="text-sm">isLoading</code> and{" "}
            <code class="text-sm">isInvalid</code> can no longer disagree with
            each other. <code class="text-sm">isRequired</code> is the platform{" "}
            <code class="text-sm">required</code>,{" "}
            <code class="text-sm">isOpen</code> is{" "}
            <code class="text-sm">open</code>, and native{" "}
            <code class="text-sm">disabled</code> is still honored.
          </li>
          <li>
            • <strong>Validity is derived, not asserted.</strong> Pass{" "}
            <code class="text-sm">issues</code> (an{" "}
            <code class="text-sm">Issue[]</code>) and the component works out
            whether it is invalid. <code class="text-sm">state="invalid"</code>{" "}
            forces it when you have no issue list to hand.
          </li>
          <li>
            • <strong>Sizes</strong> are{" "}
            <code class="text-sm">xs | sm | md | lg | xl</code>, and the colour
            axis is <code class="text-sm">flavor</code>, not{" "}
            <code class="text-sm">color</code>:{" "}
            <code class="text-sm">
              neutral | primary | secondary | accent | destructive | success |
              warning | info
            </code>
            . It is deliberately open, so a theme can define its own{" "}
            <code class="text-sm">flavor="hip"</code> and style{" "}
            <code class="text-sm">[data-flavor="hip"]</code> with no library
            change. <strong>Shape</strong> is a separate axis,{" "}
            <code class="text-sm">variant</code>:{" "}
            <code class="text-sm">solid | soft | outline | ghost | plain</code>.
          </li>
          <li>
            • <strong>
              Only <code class="text-sm">class</code> is accepted.
            </strong>{" "}
            <code class="text-sm">className</code> was removed with{" "}
            <code class="text-sm">IComponentBaseProps</code>; components take{" "}
            <code class="text-sm">UIBaseProps</code> now, which carries{" "}
            <code class="text-sm">class</code> alone. A stray{" "}
            <code class="text-sm">className</code> is an unknown prop and is
            silently dropped. Your classes still win — they are merged last via
            twMerge.
          </li>
          <li>
            • <strong>Controlled/uncontrolled comes in triples:</strong>{" "}
            <code class="text-sm">open/defaultOpen/onOpenChange</code>,{" "}
            <code class="text-sm">value/defaultValue/onChange</code>,{" "}
            <code class="text-sm">
              selectedKey/defaultSelectedKey/onSelectionChange
            </code>
            . Event callbacks pass <strong>values, not events</strong> —
            including on <code class="text-sm">Switch</code>,{" "}
            <code class="text-sm">Checkbox</code> and{" "}
            <code class="text-sm">Radio</code>, which used to hand over the
            native event. The event is still available as{" "}
            <code class="text-sm">onNativeChange</code>, and that is where{" "}
            <code class="text-sm">preventDefault()</code> belongs.
          </li>
          <li>
            • <strong>Compound components</strong> —{" "}
            <code class="text-sm">Dialog.Trigger</code>,{" "}
            <code class="text-sm">Table.Content</code>,{" "}
            <code class="text-sm">Input.Field</code> — and their parts are also
            exported flat (<code class="text-sm">DialogBody</code>,{" "}
            <code class="text-sm">AccordionItem</code>,{" "}
            <code class="text-sm">BreadcrumbItem</code>, …). Parts are styleable
            and testable through <code class="text-sm">data-slot="…"</code> and
            state attributes like <code class="text-sm">data-open</code>,{" "}
            <code class="text-sm">data-selected</code>,{" "}
            <code class="text-sm">data-invalid</code>.
          </li>
          <li>
            •{" "}
            <strong>
              There is no polymorphic <code class="text-sm">as</code> prop.
            </strong>
          </li>
        </ul>
        <CodeBlock
          language="tsx"
          code={`<Flex direction="col" gap="sm">
  <Button flavor="primary" size="md" state={saving() ? "loading" : "default"}>Save</Button>
</Flex>`}
        />
      </section>

      <section class="mb-12">
        <h2 id="inventory" class="text-3xl font-semibold mb-4">
          Component inventory
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Roughly 104 components, grouped by family. The list moves every time a
          component lands, so rather than keeping a copy that quietly goes
          stale, here are the two places that stay current:
        </p>
        <div class="grid gap-6 md:grid-cols-2">
          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4">Browse them live</h3>
              <p class="text-base-content/70 mb-4">
                Every showcase in this site, with rendered examples and props
                you can poke at.
              </p>
              <a
                href={ROUTES.SHOWCASES}
                class="text-primary hover:underline font-medium"
              >
                Explore components →
              </a>
            </Card.Body>
          </Card>

          <Card class="bg-base-100 border border-base-300">
            <Card.Body>
              <h3 class="text-xl font-semibold mb-4">Read the inventory</h3>
              <p class="text-base-content/70 mb-4">
                The by-family list, plus the rename map from older versions
                (Spinner→Spinner, Select→Select, and the rest).
              </p>
              <a
                href={EXTERNAL_ROUTES.UI_USAGE_DOC}
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline font-medium"
              >
                ui-usage.md →
              </a>
            </Card.Body>
          </Card>
        </div>
      </section>

      <section class="mb-12">
        <h2 id="forms" class="text-3xl font-semibold mb-4">
          Forms
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          The form engine is the library's own, validated by any Standard Schema
          — Zod v4, Valibot or ArkType all work unchanged. It was TanStack Form
          until 4.0; that dependency peer-pinned Solid 1 and was one of three
          packages standing between the library and Solid 2.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { createForm, Form, FormField, FormSubmitButton } from "@pathscale/ui";

const form = createForm({
  defaultValues: { email: "", password: "" },
  schema: loginSchema,
  onSubmit: async (values) => { await login(values); },
});

<Form form={form} class="space-y-4">
  <FormField name="email" label="Email" />
  <FormField name="password" label="Password" inputProps={{ type: "password" }} />
  <FormSubmitButton>Log in</FormSubmitButton>
</Form>`}
          class="mb-6"
        />
        <ul class="space-y-3 text-base-content/70 mb-6 max-w-3xl">
          <li>
            • <code class="text-sm">Form</code> without a{" "}
            <code class="text-sm">form</code> prop is just a styled{" "}
            <code class="text-sm">&lt;form&gt;</code>. With one, it is a context
            provider with submit wired up.
          </li>
          <li>
            • Inside a <code class="text-sm">&lt;Form&gt;</code>,{" "}
            <code class="text-sm">useField(name)</code> gives you{" "}
            <code class="text-sm">
              {"{value, error, touched, invalid, handleChange, handleBlur}"}
            </code>
            .
          </li>
          <li>
            • Validation runs on change, blur and submit; a blur error clears as
            soon as the field becomes valid again.
          </li>
          <li>
            • The form object itself is the escape hatch:{" "}
            <code class="text-sm">values()</code>,{" "}
            <code class="text-sm">getFieldValue</code>,{" "}
            <code class="text-sm">getFieldMeta</code>,{" "}
            <code class="text-sm">setFieldValue</code>,{" "}
            <code class="text-sm">validateField</code>,{" "}
            <code class="text-sm">submit()</code>,{" "}
            <code class="text-sm">isSubmitting()</code> and{" "}
            <code class="text-sm">isValid()</code>. The old{" "}
            <code class="text-sm">form._tsForm</code> is gone with TanStack, and
            with it the twelve erased generics it leaked into the public type.
          </li>
        </ul>
        <Callout type="warning" title="Errors are touch-gated">
          <code class="text-sm">error()</code> stays{" "}
          <code class="text-sm">undefined</code> until the field blurs, but{" "}
          <code class="text-sm">FormSubmitButton</code> takes{" "}
          <code class="text-sm">state="disabled"</code> whenever{" "}
          <code class="text-sm">form.isValid()</code> is false, which is not
          touch-gated. The practical consequence: the submit button can sit
          disabled with no visible error anywhere on the form.
        </Callout>
      </section>

      <section class="mb-12">
        <h2 id="table" class="text-3xl font-semibold mb-4">
          Table
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Table is the presentational compound: you own the markup and it owns
          the styling. It carries no data model, so there is nothing to
          configure and nothing to keep in sync.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Table } from "@pathscale/ui";

<Table>
  <Table.ScrollContainer>
    <Table.Content>
      <Table.Header>
        <Table.Row><Table.Column id="name">Name</Table.Column></Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row><Table.Cell>Ada Byron</Table.Cell></Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>`}
          class="mb-6"
        />
        <ul class="space-y-3 text-base-content/70 mb-6 max-w-3xl">
          <li>
            • <strong>Parts:</strong> Table.Root, Table.ScrollContainer,
            Table.Content, Header, Column, Body, Row, Cell, ExpandedRow, Footer,
            PageSize, ResizableContainer, ColumnResizer, LoadMore(+Content), plus
            TableSortIcon, TableExpandToggle, TableInlineConfirm,
            TableMobileListView (a responsive card fallback) and
            TableVirtualSpacerRow.
          </li>
          <li>
            • <strong>
              Sorting, paging, selection and grouping live in{" "}
              <code class="text-sm">DataGrid</code>
            </strong>
            , built from a <code class="text-sm">createDataGrid</code> model.
            Reach for Table when you are laying out rows you already have, and
            for DataGrid when something has to sort or page them.
          </li>
        </ul>
        <Flex direction="col" gap="md">
          <Callout type="warning" title="The useTable* hooks are gone">
            <code class="text-sm">useTableModel</code>,{" "}
            <code class="text-sm">useTableSorting</code>,{" "}
            <code class="text-sm">useTableSelection</code>,{" "}
            <code class="text-sm">useTableFiltering</code>,{" "}
            <code class="text-sm">useTablePagination</code> and{" "}
            <code class="text-sm">useTableExpansion</code> were the TanStack-era
            model layer and no longer ship. Their replacement is{" "}
            <code class="text-sm">createDataGrid</code>, which is the library's
            own and is not a TanStack wrapper. Only{" "}
            <code class="text-sm">useAnchoredOverlayPosition</code> survives
            from that group.
          </Callout>
        </Flex>
      </section>

      <section class="mb-12">
        <h2 id="toast" class="text-3xl font-semibold mb-4">
          Toast
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Toast is an imperative singleton. Mount the provider once, then call
          it from anywhere — no context plumbing, no per-call hook.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { toast, ToastProvider } from "@pathscale/ui";

// mount <ToastProvider /> once, then anywhere:
toast.success("Saved");
toast.danger("Failed");
toast.promise(p, { loading, success, error });`}
        />
      </section>

      <section class="mb-12">
        <h2 id="icons" class="text-3xl font-semibold mb-4">
          Icons
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Icons are Iconify classes — use the{" "}
          <code class="text-sm">Icon</code> component, or put the class on any
          element directly.
        </p>
        <CodeBlock
          language="tsx"
          code={`<Icon src="mdi--close" />
<span class="icon-[lucide--search]" />`}
          class="mb-6"
        />
        <p class="text-base-content/70 max-w-3xl">
          In the library repository, icons are baked at build time into{" "}
          <code class="text-sm">src/styles/icons/generated-icons.css</code>, so
          only the icons actually used get emitted. A consuming app on Tailwind
          v4 can pull in arbitrary icons with{" "}
          <code class="text-sm">@plugin "@iconify/tailwind4"</code>.
        </p>
      </section>

      <section class="mb-12">
        <h2 id="dates" class="text-3xl font-semibold mb-4">
          Dates
        </h2>
        <p class="text-base-content/70 mb-4 max-w-3xl">
          Calendar, DatePicker, RangeCalendar and DateRangePicker run on an
          internal engine built from native <code class="text-sm">Date</code>{" "}
          and <code class="text-sm">Intl</code> — there is no date library to
          install or configure.
        </p>
        <ul class="space-y-3 text-base-content/70 mb-6 max-w-3xl">
          <li>
            • Values are <code class="text-sm">Date</code> objects; ranges are{" "}
            <code class="text-sm">{"{ start: Date, end: Date }"}</code>.
          </li>
          <li>
            • Controlled through the usual{" "}
            <code class="text-sm">value / defaultValue / onChange</code> triple.
          </li>
          <li>
            • <code class="text-sm">DateField</code> and{" "}
            <code class="text-sm">TimeField</code> are separate segmented text
            editors — they are not calendar-backed.
          </li>
        </ul>
        <Flex gap="md" wrap="wrap">
          <Button href={ROUTES.CALENDAR} variant="outline" size="sm">
            Calendar showcase
          </Button>
        </Flex>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-6">Keep going</h2>
        <Flex gap="lg" wrap="wrap">
          <Button href={ROUTES.SHOWCASES} flavor="primary">
            Explore Components
          </Button>
          <Button href={ROUTES.DOCS_INSTALLATION} variant="outline">
            Installation Guide
          </Button>
          <Button href={EXTERNAL_ROUTES.UI_USAGE_DOC} target="_blank" rel="noopener noreferrer" variant="outline">
            Full reference on GitHub
          </Button>
        </Flex>
      </section>
    </ContentContainer>
  );
};

export default Usage;
