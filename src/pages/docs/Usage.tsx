import { Component } from "solid-js";
import { Card, Flex } from "@pathscale/ui";
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

      <Callout type="info" title="Source of truth" className="mb-12">
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
          Peer dependencies: solid-js ^1.9, @solid-primitives/*,
          @tanstack/solid-form and @tanstack/solid-table, plus popmotion and
          @standard-schema/spec (both optional).
        </p>
        <CodeBlock language="bash" code="bun add @pathscale/ui" className="mb-6" />
        <p class="text-base-content/70 mb-4 max-w-3xl">
          Everything is exported from the root barrel, and one stylesheet brings
          in tokens, themes, base styles and icons:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { Button, Flex, Modal, toast } from "@pathscale/ui";
import "@pathscale/ui/index.css";`}
          className="mb-6"
        />
        <p class="text-base-content/70 max-w-3xl">
          Subpath exports also exist if you need them:{" "}
          <code class="text-sm">./components/*</code>,{" "}
          <code class="text-sm">./primitives/*</code>,{" "}
          <code class="text-sm">./hooks/*</code>,{" "}
          <code class="text-sm">./motion</code>,{" "}
          <code class="text-sm">./styles/*</code>.
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
          className="mb-6"
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
            • <strong>Booleans read as questions.</strong> HeroUI-style{" "}
            <code class="text-sm">is*</code> props:{" "}
            <code class="text-sm">isDisabled</code>,{" "}
            <code class="text-sm">isOpen</code>,{" "}
            <code class="text-sm">isInvalid</code>,{" "}
            <code class="text-sm">isPending</code>,{" "}
            <code class="text-sm">isIconOnly</code>,{" "}
            <code class="text-sm">isHoverable</code>,{" "}
            <code class="text-sm">isPressable</code>. Native{" "}
            <code class="text-sm">disabled</code> is honored too.
          </li>
          <li>
            • <strong>Sizes</strong> are{" "}
            <code class="text-sm">xs | sm | md | lg | xl</code>, and{" "}
            <strong>colors</strong> are{" "}
            <code class="text-sm">
              neutral | primary | secondary | accent | info | success | warning
              | error | ghost
            </code>
            .
          </li>
          <li>
            • <strong>
              Both <code class="text-sm">class</code> and{" "}
              <code class="text-sm">className</code> are accepted
            </strong>{" "}
            everywhere, and your classes win — they are merged last via twMerge.
          </li>
          <li>
            • <strong>Controlled/uncontrolled comes in triples:</strong>{" "}
            <code class="text-sm">isOpen/defaultOpen/onOpenChange</code>,{" "}
            <code class="text-sm">value/defaultValue/onChange</code>,{" "}
            <code class="text-sm">
              selectedKey/defaultSelectedKey/onSelectionChange
            </code>
            . Event callbacks pass <strong>values, not events</strong>.
          </li>
          <li>
            • <strong>Compound components</strong> —{" "}
            <code class="text-sm">Modal.Trigger</code>,{" "}
            <code class="text-sm">Tabs.List</code>,{" "}
            <code class="text-sm">Select.Option</code> — are also exported flat
            (<code class="text-sm">AccordionRoot</code>,{" "}
            <code class="text-sm">AlertTitle</code>, …). Parts are styleable and
            testable through <code class="text-sm">data-slot="…"</code> and
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
  <Button color="primary" size="md" isPending={saving()}>Save</Button>
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
                (Loading→Spinner, DropdownSelect→Select, and the rest).
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
          Built on TanStack Form, validated by any Standard Schema — Zod v4,
          Valibot or ArkType all work unchanged.
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
          className="mb-6"
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
            • Escape hatch: <code class="text-sm">form._tsForm</code> is the raw
            TanStack API, typed <code class="text-sm">any</code> on purpose.
          </li>
        </ul>
        <Callout type="warning" title="Errors are touch-gated">
          <code class="text-sm">error()</code> stays{" "}
          <code class="text-sm">undefined</code> until the field blurs, but{" "}
          <code class="text-sm">FormSubmitButton</code> disables on{" "}
          <code class="text-sm">!canSubmit</code>, which is not touch-gated. The
          practical consequence: the submit button can sit disabled with no
          visible error anywhere on the form.
        </Callout>
      </section>

      <section class="mb-12">
        <h2 id="table" class="text-3xl font-semibold mb-4">
          Table
        </h2>
        <p class="text-base-content/70 mb-6 max-w-3xl">
          Table is headless and assembled from parts — you compose the model
          hooks with the render pieces rather than passing a config object to
          one component.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useTableModel, useTableSorting, useTablePagination, TableRoot, TableContent } from "@pathscale/ui";

const sorting = useTableSorting();
const pagination = useTablePagination();          // default page sizes [10,25,50,100]
const table = useTableModel({
  data: () => rows(), columns,
  sorting: sorting.sorting, setSorting: sorting.setSorting,
  pagination: pagination.pagination, setPagination: pagination.setPagination,
  enableSorting: true, enablePagination: true,
});

// render table.getHeaderGroups() / getRowModel().rows into:
// <TableContent sortDescriptor={sorting.sortDescriptor()} onSortChange={sorting.setSortDescriptor}>…`}
          className="mb-6"
        />
        <ul class="space-y-3 text-base-content/70 mb-6 max-w-3xl">
          <li>
            • <strong>State-slice hooks</strong>, all controlled-or-uncontrolled:{" "}
            <code class="text-sm">useTableSorting</code>,{" "}
            <code class="text-sm">useTableSelection</code>,{" "}
            <code class="text-sm">useTableFiltering</code> (per-column popovers
            plus <code class="text-sm">getColumnFilterProps</code>),{" "}
            <code class="text-sm">useTablePagination</code>,{" "}
            <code class="text-sm">useTableExpansion</code>.
          </li>
          <li>
            • <strong>Parts:</strong> TableRoot, ScrollContainer, Content,
            Header, Column, Body, Row, Cell, ExpandedRow, Footer, PageSize,
            ResizableContainer, ColumnResizer, LoadMore(+Content), plus
            SortIcon, ExpandToggle, InlineConfirm, MobileListView (a responsive
            card fallback) and VirtualSpacerRow.
          </li>
        </ul>
        <Flex direction="col" gap="md">
          <Callout type="warning" title="Pagination needs a max page index">
            <code class="text-sm">nextPage(max)</code> and{" "}
            <code class="text-sm">lastPage(max)</code> take the maximum page
            index from the caller — they don't derive it themselves.
          </Callout>
          <Callout type="warning" title="Virtualization is not built in">
            Combine <code class="text-sm">useVirtualRows</code> (a wrapper over
            @tanstack/solid-virtual) with{" "}
            <code class="text-sm">VirtualSpacerRow</code> yourself. The library
            playground has working examples under{" "}
            <code class="text-sm">playground/src/examples/Table*.tsx</code>.
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
          code={`<Icon name="icon-[mdi--close]" />
<span class="icon-[lucide--search]" />`}
          className="mb-6"
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
          <a href={ROUTES.CALENDAR} class="btn btn-outline btn-sm">
            Calendar showcase
          </a>
        </Flex>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-6">Keep going</h2>
        <Flex gap="lg" wrap="wrap">
          <a href={ROUTES.SHOWCASES} class="btn btn-primary">
            Explore Components
          </a>
          <a href={ROUTES.DOCS_INSTALLATION} class="btn btn-outline">
            Installation Guide
          </a>
          <a
            href={EXTERNAL_ROUTES.UI_USAGE_DOC}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline"
          >
            Full reference on GitHub
          </a>
        </Flex>
      </section>
    </ContentContainer>
  );
};

export default Usage;
