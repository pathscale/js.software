# js.software Review: full

**Date:** 2026-07-27
**Scope:** whole repo. `src/**` (155 files, 130 `.tsx`), `docs/**`, `.github/workflows/**`, `src-tauri/**`, `package.json`, `bun.lock`, `rsbuild.config.ts`, `cleanup.js`, `compress.js`, `AGENTS.md`, `CLAUDE.md`, `README.md`. Cross-checked against the installed `@pathscale/ui@1.2.4` type surface in `node_modules/@pathscale/ui/dist/`.
**Commit:** `81fc483` (working tree has one uncommitted edit: `AGENTS.md`)
**Reviewer slice:** full (sole reviewer for this repo)

## Summary

- **The showcase is 36% tombstones and the site does not admit it.** 31 of 82 showcase pages render a single line, `Component no longer in @pathscale/ui. TODO[ui-1.2.2]: re-evaluate.` **28 of the 77 header-nav links point at one of them.** Meanwhile `Showcases.tsx:46` tells visitors these are "Interactive demonstrations of all 82 components in @pathscale/ui". This is the headline: the public documentation site for the library is more than a third dead links, and two of those tombstones (`EmptyState`, `Join`) are for components that **still exist** in 1.2.4 and were deleted by mistake during the 1.2.2 migration.
- **Coverage against the library is much worse than the route count suggests.** `@pathscale/ui@1.2.4` ships 102 component families. There are 56 live showcase pages. **59 families have no live showcase**, including everything shipped since 1.2.x: the whole `auth-*` family (8), the whole colour-picker family (`color-area`, `color-field`, `color-slider`, `color-swatch`, `color-swatch-picker`, `color-wheel-flower`), `combo-box`, `date-picker`, `date-range-picker`, `input-otp`, `list-box`, `number-field`, `password-field`, `popover`, `search-field`, `time-field`, `toolbar`.
- **41.4% of the showcase code is scaffolding or content that could be derived** (4,208 of 10,165 lines): 506 lines of a byte-identical "Contents" nav block repeated in 42 files, 364 lines of `sections[]` arrays that only exist to feed it, 1,941 lines of hand-typed prop tables that duplicate the library's own `.d.ts`, and 1,397 lines of hand-written code snippets maintained in parallel with the live demos they claim to show. Adding one component today touches **five** files across three drift-prone registries.
- **The showcase actively teaches a wrong API.** `<Button color="primary">` appears 26 times including in both onboarding docs pages, but `Button` has no `color` prop in 1.2.4. It typechecks only because `JSX.ButtonHTMLAttributes` carries a legacy `color?: string` HTML attribute, so the value is silently emitted to the DOM and does nothing. Same for `Checkbox` (16 sites) and `Radio` (14 sites), which have no `color` prop at all. `CheckboxShowcase.tsx:110-117` renders eight visually identical checkboxes under the heading "Colors" and hands the reader a copy-paste snippet for an API that does not exist.
- **The two automated gates named in `AGENTS.md` are one real and one fake.** `bun run typecheck` passes cleanly (verified). `bun run lint` runs a package literally named `biome` at version `0.3.3`, which is a 2016 environment-variable manager, not `@biomejs/biome`. `npx biome check .` exits 0 with no output. The husky `pre-commit` hook runs the same no-op.
- **Top 3 things to do:** (1) run a coverage script against the library's exports and either restore or delete the 31 tombstones plus their nav entries; (2) collapse the five registries into one and generate prop tables from `.d.ts` so the Checkbox/Button lies become structurally impossible; (3) replace `biome` with `@biomejs/biome` so the lint gate is real.
- **Security is genuinely clean** for what this is. No secrets, no `encodePassword`, no localStorage authorization, no logging sinks, no `@pathscale/secure-local-storage-aes-siv`, and the deploy job does use `bun install --frozen`. Details in the cross-repo section below.

## Findings

### [SEV-1] 28 of 77 header-nav links lead to a "component no longer exists" tombstone

- **ID:** `jssoftware-full-01`
- **Severity:** High
- **Category:** Correctness / Docs
- **Confidence:** High
- **Location:** `src/components/StatusShowcase.tsx:1-5` and 30 sibling files; nav table `src/components/layout/Header/navigationData.ts:4-135`; claim at `src/pages/Showcases.tsx:44-49`
- **What:** 31 showcase files were reduced to a single `<div>Component no longer in @pathscale/ui. TODO[ui-1.2.2]: re-evaluate.</div>` during the 1.2.2 migration (commit `50166ac`), but their entries were left in `routes.ts`, `config/routes.ts`, `navigationData.ts` and the `/showcases` card grid. Counted mechanically: 28 of the 77 `ROUTES.*` references in `navigationData.ts` resolve to a tombstone. The dead entries are `SvgBackground, Swap, FormActions, Carousel, Countdown, EmptyState, Diff, Stats, Code Mockup, Rating, Dock, Steps, Progress, Radial Progress, FileInput, Range, Join, SwitchField, DropdownSelect, Divider, Mask, Stack, Background, Artboard, Browser Mockup, Phonemockup, Window Mockup`. `StreamingTableShowcase.tsx` is a 20-line variant of the same tombstone.
- **Why it matters:** This site is the library's public documentation. A visitor clicking "Progress" or "Divider" in the top nav gets a bare sentence with an internal TODO marker in it. `Showcases.tsx:46` simultaneously advertises "all 82 components". Two of the tombstones are wrong on their own terms: `EmptyState` is exported at `node_modules/@pathscale/ui/dist/index.d.ts:54` and `Join` at `:97`, so those pages were deleted for components that still ship.
- **Fix:** Three separate actions, in order.
  1. Restore `EmptyStateShowcase` and `JoinShowcase` (components still exist).
  2. For components that were renamed rather than removed, retarget the page: `Progress` to `ProgressBar` (`index.d.ts:129`), `Radial Progress` to `ProgressCircle` (`:131`), `Divider` to `Separator` (`:142`), `Range`/`SliderField` to `Slider` (`:144`), `SwitchField` to `Toggle` (`:177`), `DropdownSelect` to `ComboBox`/`Select`. The rename map already exists in the library repo's `docs/ui-usage.md` and is even linked from `src/pages/docs/Usage.tsx:203-204`.
  3. For the genuinely removed ones (`Artboard`, `Background`, `BrowserMockup`, `CodeMockup`, `Phonemockup`, `WindowMockup`, `SvgBackground`, `Carousel`, `Countdown`, `Diff`, `Mask`, `Stack`, `Stats`, `StatCard`, `Status`, `Steps`, `Swap`, `Rating`, `FileInput`, `Dock`, `FormActions`, `SkipLink`, `StreamingTable`), delete the file, the `ROUTES` constant, the `routes.ts` entry and the `navigationData.ts` entry together. Mechanical once the registry consolidation in `jssoftware-full-04` lands, because then it is one line per component.
- **Effort:** M (a few hours, mostly mechanical deletion; restoring EmptyState/Join is the only authoring work)
- **Blast radius:** `src/routes.ts`, `src/config/routes.ts`, `src/components/layout/Header/navigationData.ts`, `src/pages/docs/Components.tsx`, 31 showcase files. No API surface, no consumer breakage.

---

### [SEV-2] The showcase documents `color` props that do not exist on Button, Checkbox and Radio

- **ID:** `jssoftware-full-02`
- **Severity:** High
- **Category:** Correctness / Docs
- **Confidence:** High
- **Location:** `src/components/CheckboxShowcase.tsx:110-128`, `src/components/RadioShowcase.tsx` (14 sites), `src/pages/docs/Installation.tsx:123`, `src/pages/docs/Usage.tsx:168`, plus 22 further `<Button color=...>` sites
- **What:** In 1.2.4, `ButtonProps` is `Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & { variant, size, isIconOnly, fullWidth, isDisabled, isPending, startIcon, endIcon, className }` (`dist/components/button/Button.d.ts`). There is no `color`. `CheckboxProps` (`dist/components/checkbox/Checkbox.d.ts:5`) has `variant?: "primary" | "secondary"` and no `color`. `RadioProps` (`dist/components/radio/Radio.d.ts:4`) has no colour prop of any kind. Yet the repo passes `color=` to `Button` 26 times, `Checkbox` 16 times and `Radio` 14 times. It compiles because Solid's `HTMLAttributes` declares the legacy presentational `color?: string | undefined` (`node_modules/solid-js/types/jsx.d.ts:1060`), which `Button`/`Checkbox`/`Radio` do not `Omit`. The value is forwarded to the DOM as a dead attribute.
- **Why it matters:** `CheckboxShowcase.tsx:110-117` renders eight checkboxes labelled `primary secondary accent neutral success warning info error` that all look identical, then hands the reader that exact block as a copy-paste snippet at `:121-128`. `Installation.tsx:123` is the *first* code sample a new user sees, and it is wrong. This is a documentation site publishing an API the library removed two minor versions ago, with a green typecheck.
- **Fix:** Two halves, and both are needed.
  - In this repo: migrate the three showcases. `Checkbox` should demo `variant="primary" | "secondary"`; `Radio` has no colour axis so the section should be deleted rather than restyled; `Button` should demo `variant` (`primary | secondary | tertiary | outline | ghost | danger | danger-soft`). Note `LoadingShowcase.tsx` was migrated correctly (it uses `current | accent | success | warning | danger`, matching `SpinnerColor`), which proves this is per-file drift rather than a systemic miss.
  - In `@pathscale/ui` (see the library-feedback section): make the escape impossible by omitting `color` the way `Badge` and `Toggle` already do.
- **Effort:** S for the three showcases; S for the library change
- **Blast radius:** 3 showcase files plus 2 docs pages here. The library-side `Omit` is a *breaking* type change that will surface exactly these 56 call sites, which is the point.

---

### [SEV-3] The usage cheatsheet states a colour and size vocabulary the library does not have, and an import that fails

- **ID:** `jssoftware-full-03`
- **Severity:** High
- **Category:** Docs
- **Confidence:** High
- **Location:** `src/pages/docs/Usage.tsx:121-128`, `:289`, `:315-319`
- **What:** This is the newest page in the repo (commit `e5a5d94`) and it is the one users are told to trust.
  - `:124-127` states colours are `neutral | primary | secondary | accent | info | success | warning | error | ghost`. The actual 1.2.4 palette is `default | accent | success | warning | danger` (`BadgeColor` at `dist/components/badge/Badge.d.ts:8`, `AvatarColor` at `avatar/Avatar.d.ts:5`, `ToggleColor` at `toggle/Toggle.d.ts`) and `current | accent | success | warning | danger` for `Spinner` (`spinner/Spinner.d.ts`). None of `neutral`, `primary`, `secondary`, `info`, `error` or `ghost` is a valid colour value anywhere. The list shown is the pre-1.2.2 daisyUI palette.
  - `:121-122` states sizes are `xs | sm | md | lg | xl`. `ButtonSize`, `BadgeSize` and `ToggleSize` are all `sm | md | lg`; only `SpinnerSize` has the full five.
  - `:168` demos `<Button color="primary" size="md">`, the dead prop from `jssoftware-full-02`.
  - `:289` gives `import { useTableModel, useTableSorting, useTablePagination, TableRoot, TableContent } from "@pathscale/ui"`. `useTableModel`/`useTableSorting`/`useTablePagination` are exported from the barrel (`index.d.ts:152`), but `TableRoot` and `TableContent` are **not** (`index.d.ts:149-151` re-exports only `Table`, `TableSortIcon`, `TableExpandToggle`, `TableVirtualSpacerRow`, `TableMobileListView`, `TableInlineConfirm`). This import yields `undefined` at runtime. The parts list at `:315-319` repeats the error for `ScrollContainer`, `Content`, `Header`, `Column`, `Body`, `Row`, `Cell`, `ExpandedRow`, `Footer`, `PageSize`, `ResizableContainer`, `ColumnResizer`, `LoadMore`.
- **Why it matters:** This page opens by declaring itself a mirror of the library's canonical `docs/ui-usage.md` (`:21-35`), so a reader has no reason to doubt it. Everything above is copy-paste-able and every item is wrong. The Table import in particular fails silently: `TableRoot` is `undefined`, and rendering `<undefined>` in Solid throws a non-obvious error far from the import.
- **Fix:** Correct `:121-128` to the real vocabulary, drop `color` from `:168`, and change `:289`/`:315-319` to either `Table.Root`/`Table.Content` (the dot-notation namespace does exist, `dist/components/table/Table.d.ts:76-91`) or the subpath import `from "@pathscale/ui/components/table"` (`dist/components/table/Table.d.ts:75` exports them from there). Because this page claims to mirror the library doc, verify against that file rather than against this repo. Mechanical, but needs someone who can check the library doc is not itself the source of the error.
- **Effort:** S
- **Blast radius:** One file. Note that commit `97b90ce` ("fix: correct install steps that point at non-existent exports") already went hunting for exactly this class of bug and missed these.

---

### [SEV-4] Adding one component means editing five files; 41% of showcase code is derivable scaffolding

- **ID:** `jssoftware-full-04`
- **Severity:** High
- **Category:** Design / Maintainability
- **Confidence:** High
- **Location:** `src/routes.ts` (639 lines), `src/config/routes.ts` (105), `src/components/layout/Header/navigationData.ts` (135), `src/pages/Showcases.tsx:8-37`, `src/pages/docs/Components.tsx:18-60`; template repeated across `src/components/*Showcase.tsx`
- **What:** Two separate multiplications of work.

  **(a) Five registries.** To add `FooShowcase` you must touch: `config/routes.ts` (add `FOO: "/foo"`), `routes.ts` (add an import *and* a `{name, path, component, description}` entry), `navigationData.ts` (add `{title, href}` under the right subcategory), and optionally `pages/docs/Components.tsx:18-60` (a hand-written category map keyed by display *string*). Miss one and you get a silent hole: **6 live showcases are currently unreachable from the header nav** (`Fieldset`, `FloatingDock`, `GlassPanel`, `ConnectionStatus`, `VideoPreview`, `NoiseBackground`), and `src/pages/docs/Components.tsx` is not imported by anything at all, so its whole category table is dead weight that still looks authoritative.

  **(b) Per-page boilerplate.** Measured over the 82 `*Showcase.tsx` files (10,165 lines total):

  | shape | lines | note |
  |---|---|---|
  | `<ShowcaseSection id="contents">` nav block | 506 | byte-identical in 42 files |
  | `const sections = [...]` arrays | 364 | exists only to feed that nav |
  | hand-typed `PropDefinition[]` arrays | 1,941 | duplicates the library `.d.ts` |
  | hand-written `code={\`…\`}` snippets | 1,397 | maintained in parallel with the demo |
  | **total** | **4,208** | **41.4% of all showcase code** |

  There are 310 `<ShowcaseSection>` instances, 236 `<CodeBlock>` and 58 `<PropsTable>`.

- **Why it matters:** Every one of these is a drift surface, and the drift is already measurable. A mechanical check of `sections[]` against the actually-rendered `<ShowcaseSection id=…>` finds **5 of the 42 files inconsistent**: `ButtonShowcase.tsx` links to `#outline-buttons` which does not exist; `ModalShowcase.tsx` links to `#clicked-outside` while the section is `id="outside-click"`; `NavbarShowcase.tsx` has **10** nav entries and **zero** matching sections; `CheckboxShowcase.tsx` and `TableShowcase.tsx` have sections missing from their nav. The hand-typed prop tables are how `jssoftware-full-02` survived: `ButtonShowcase.tsx:35-88` documents `variant`/`size`/`isIconOnly`/… correctly while the demos below it still pass `color`, because nothing connects the table to the code.

- **Fix:** Three moves, independently landable, in increasing payoff.

  **1. One registry (S).** Replace the five with `src/showcases/registry.ts`:

  ```ts
  export const showcases = [
    { id: "button", name: "Button", category: "Actions",
      description: "…", load: () => import("./pages/Button") },
    …
  ] as const;
  ```

  `routes.ts`, `navigationData.ts`, `Showcases.tsx`, `Components.tsx` and the `Search` index all derive from this array. Adding a component becomes one line plus one file. `ROUTES` can stay as a generated `const` for typed links, or `path` can just be `` `/${id}` ``.

  **2. A page descriptor that derives the contents nav (S).** The nav and the sections come from the same array, so a mismatch stops being expressible:

  ```tsx
  // before, per file, ~20 lines of scaffolding
  const sections = [{ id: "default", title: "Default" }, …] as const;
  return (
    <ShowcaseLayout>
      <ShowcaseSection id="contents" title="Contents">
        <nav class="space-y-1">
          {sections.map(s => <a href={`#${s.id}`} class="block text-sm …">{s.title}</a>)}
        </nav>
      </ShowcaseSection>
      <ShowcaseSection id="default" title="Default">
        <Flex direction="col" gap="md">
          <Button>Button</Button>
          <CodeBlock code={`<Button>Button</Button>`} />
        </Flex>
      </ShowcaseSection>
      …
    </ShowcaseLayout>
  );

  // after
  export default defineShowcase({
    component: "Button",
    examples: [
      ex("default", "Default", () => <Button>Button</Button>),
      ex("sizes",   "Sizes",   () => <><Button size="sm"/><Button size="md"/><Button size="lg"/></>),
    ],
  });
  ```

  `defineShowcase` renders `ShowcaseLayout`, builds the contents nav from `examples`, wraps each in a `ShowcaseSection`, and appends the props section. That alone deletes the 870 lines of nav plus `sections[]` and makes all 5 current mismatches unrepresentable.

  **3. Derive the snippet and the props table (M, highest payoff).**
  - *Snippet:* a ~60-line Babel plugin (the build already runs `@rsbuild/plugin-babel`) that rewrites `ex(id, title, () => <JSX/>)` into `ex(id, title, () => <JSX/>, "<source text>")`, taking the code string from the actual AST. Demo and snippet can then never disagree, and 1,397 hand-maintained lines disappear.
  - *Props table:* a `bun run gen:props` step that walks `node_modules/@pathscale/ui/dist/**/*.d.ts` with `ts-morph` into `src/generated/props.json`, so `<PropsTable component="Button" />` reads the library's real types. 1,941 lines gone, and `jssoftware-full-02` becomes impossible: a prop the library does not have cannot appear in the table.

  **4. A coverage gate (S).** With the registry in place, `bun run check:coverage` diffs `Object.keys(registry)` against the barrel's exports and fails on either direction. Wire it into `pipeline.yml`. That is the only thing that will stop `jssoftware-full-01` recurring on the next library bump. The check I ran ad hoc for this review is about 20 lines of Node.

- **Effort:** L overall (1 registry: S; descriptor: S; codegen: M; gate: S). Land 1, 2 and 4 first; 3 can follow.
- **Blast radius:** Every showcase file, but each conversion is independent and the old and new shapes can coexist during migration. No consumer-facing API.

---

### [SEV-5] Every route is eagerly imported into a single 998 KB chunk

- **ID:** `jssoftware-full-05`
- **Severity:** Medium
- **Category:** Performance
- **Confidence:** High
- **Location:** `src/routes.ts:4-100` (88 static imports), `src/App.tsx:20-24`, `rsbuild.config.ts:26-31`
- **What:** `routes.ts` statically imports all 88 route components; `App.tsx` maps them into `<Route>` with no `lazy()` anywhere in `src` (grep for `lazy(` returns zero hits). `rsbuild.config.ts:27-30` then sets `splitChunks: false` and `runtimeChunk: false`, so the output is exactly one JS file and one CSS file. Measured from the committed `dist/`: **998,660 bytes of JS** (198 KB after brotli-11) and **693,198 bytes of CSS** (56 KB brotli). All 75 `@pathscale/ui` imports go through the root barrel; there are zero subpath imports, so nothing constrains what the bundler pulls in.
- **Why it matters:** Loading `/button` downloads all 88 showcases, Prism plus three language grammars, chroma-js and the entire theme generator. The single-chunk decision is deliberate and reasonable for a small site, but the site is no longer small and the payload is now roughly a megabyte of JS parsed on first paint for a page that needs one component. The CSS is worse in relative terms: 693 KB, because `src/index.css:6` does `@source "../node_modules/@pathscale/ui/"`, telling Tailwind to scan and retain classes for all 102 component families whether or not any page uses them.
- **Fix:** With the registry from `jssoftware-full-04` in place this is nearly free: change `component: ButtonShowcase` to `load: () => import("./pages/Button")` and wrap with `lazy()`, then remove `splitChunks: false`. Keep one shared vendor chunk so navigation stays instant. Before changing anything, confirm the CDN story still holds: `cleanup.js:11-19` renames `*.br` over the plain filenames and only works because BunnyCDN is configured to serve those exact paths with `Content-Encoding: br`. Multiple chunks means multiple generated filenames, so `cleanup.js` must be generalised (it already globs `dist/static/**/*.br`, so it likely survives, but the `?v=` rewriting at `cleanup.js:33-40` hard-codes `/static/js/app.mjs` and `/static/css/app.css`).
- **Effort:** M
- **Blast radius:** `routes.ts`, `App.tsx`, `rsbuild.config.ts`, `cleanup.js`, and the BunnyCDN configuration. Deployment-affecting: verify on a preview zone before pushing to master, since `pipeline.yml` deploys on every push.

---

### [SEV-6] `bun run lint` and the pre-commit hook are silent no-ops (wrong package installed)

- **ID:** `jssoftware-full-06`
- **Severity:** Medium
- **Category:** Maintainability
- **Confidence:** High
- **Location:** `package.json:19` (`"lint": "biome check ."`), `package.json:35` (`"biome": "^0.3.3"`), `package.json:23-27` (lint-staged runs `biome check --apply`), `AGENTS.md:29`, `docs/frontend-conventions.md:45`
- **What:** The installed `biome` package is `biome@0.3.3`, described in its own `package.json` as "A simple way to manage environment variables on a per-project basis". `@biomejs/biome` is not installed at all (`node_modules/@biomejs` does not exist). Running `npx biome check .` in this repo produces no output and exits 0. `biome.json` is written against Biome 1.5.x schema and is never read by anything.
- **Why it matters:** `AGENTS.md:27` and `docs/frontend-conventions.md:44` both instruct every agent and human to run `bun run lint` as a gate. It always passes. The husky `pre-commit` hook runs `lint-staged`, which runs `biome check --apply` on staged files, which also does nothing, so the repo has believed it had formatting enforcement since the hook was added. This is very likely why the style inconsistencies in the AI-smell section survived. Note `bun run typecheck` is real and does pass (verified: `tsc --noEmit` exits 0).
- **Fix:** `bun remove biome && bun add -d @biomejs/biome`, then run `biome check .` once and expect a large first-pass diff. Confirm `biome.json` (currently 1.5.x-shaped) matches the installed major, since Biome 2.x changed the config schema. Do the reformat as its own commit so it does not pollute review of anything else.
- **Effort:** S to fix the dependency, M to absorb the first real lint run
- **Blast radius:** Potentially every source file on the first format pass. No runtime effect.

---

### [SEV-7] `CopyButton` renders nothing, so no code block on the site is copyable

- **ID:** `jssoftware-full-07`
- **Severity:** Medium
- **Category:** Correctness / AI-smell
- **Confidence:** High
- **Location:** `src/components/showcase/CopyButton.tsx:1-20`
- **What:** The component builds a `copied` signal and a `handleCopy` callback and then returns `<></>`. `handleCopy` is never referenced, and it would not copy anything anyway: it sets `copied` to true and back after 2s without ever touching the clipboard. `CodeBlock.tsx:31-36` renders it above all 236 `<CodeBlock>` instances.
- **Why it matters:** `Showcases.tsx` advertises "Copy & Paste Ready" as one of three headline badges. Every code sample on a documentation site whose entire job is code samples has an invisible, non-functional copy button. The shape (state and handler present, render body emptied) reads like a half-finished edit that was never noticed, precisely because the lint gate in `jssoftware-full-06` is fake.
- **Fix:** Implement it, roughly 15 lines. `ThemeCSSModal.tsx:115-121` already has a working `navigator.clipboard.writeText` with a pressed state and a `.catch`, so copy that pattern rather than inventing a second one.
- **Effort:** S
- **Blast radius:** One file, affects all 236 code blocks positively.

---

### [SEV-8] The global light/dark theme system is unreachable dead code; the site is pinned to light

- **ID:** `jssoftware-full-08`
- **Severity:** Medium
- **Category:** Correctness / AI-smell
- **Confidence:** High
- **Location:** `src/lib/theme.ts:1-27`, `src/ThemeToggle.tsx`, `index.html:2`, `src/styles/themes/generated.css:91-93`
- **What:** A reachability walk from `src/index.tsx` over all imports shows `src/lib/theme.ts` and `src/ThemeToggle.tsx` are not reachable. Nothing else in the app calls `setAttribute("data-theme", …)`: the only other occurrence is inside a docs code *string* at `src/pages/docs/Usage.tsx:80`. `index.html:2` hard-codes `<html lang="en" data-theme="light">`, so the attribute never changes. Separately, `generated.css:91-93` declares the `dark` theme with `default: true`, which would make dark the daisyUI default were the attribute not pinned, and `generated.css:180` declares a third theme `retro` that no code path can select.
- **Why it matters:** A component library showcase that cannot demonstrate its own dark theme is missing its most-requested feature, and 90 lines of `generated.css` plus a whole `lib/theme.ts` module are carried as if the feature worked. The `default: true` on `dark` is a latent trap: the moment someone removes the hard-coded attribute from `index.html` the entire site flips to dark, which will read as a regression rather than the intended fix.
- **Fix:** Decide whether the toggle is wanted. If yes, mount `ThemeToggle` in `MarketingHeader`, drop `data-theme` from `index.html:2` (let `lib/theme.ts`'s `createEffect` own it), and set `default: true` on `light` rather than `dark` so first paint before hydration matches. If no, delete `lib/theme.ts`, `ThemeToggle.tsx`, and the `retro` block. Needs a product call, not just a code change.
- **Effort:** S either way
- **Blast radius:** `index.html`, `src/lib/theme.ts`, `src/ThemeToggle.tsx`, `src/components/layout/Header/MarketingHeader.tsx`, `src/styles/themes/generated.css`.

---

### [SEV-9] Two toggles in the theme editor are wired to signals nothing reads

- **ID:** `jssoftware-full-09`
- **Severity:** Medium
- **Category:** Correctness / AI-smell
- **Confidence:** High
- **Location:** `src/components/theming/ThemeEditor.tsx:23-24` and `:44-59`
- **What:** `applyToWholeSite` and `rememberTheme` are created with `createSignal(false)`, rendered as user-facing `<Toggle>` controls labelled "Apply to whole site" and "Remember this theme", and read by nothing except their own `checked` binding. The theme is applied as inline CSS variables on a preview wrapper only, and nothing writes it to `localStorage`. Flipping either switch does nothing at all. By contrast the three toggles below (`isDefault`, `isPrefersDark`, `colorScheme`) are genuinely consumed, by `props.onExportCSS(...)` at `:35`.
- **Why it matters:** These are the two most valuable-sounding features in the theming playground and both are lies to the user's face. This is the classic generated-UI failure mode: the control exists, the state exists, the wire does not.
- **Fix:** Either implement (apply the generated variables to `document.documentElement.style` and persist to `localStorage`, which pairs naturally with fixing `jssoftware-full-08`) or delete both toggles. Do not leave them.
- **Effort:** S to delete, M to implement
- **Blast radius:** One file.
- **Related nit in the same file:** `dockActiveItem` (`src/pages/Theming.tsx:81`) is created with `createSignal("editor")` and no setter, threaded through `ThemeEditorProps` (`:16`) purely to be compared at `:29`. It is always `"editor"`, so the `max-md:hidden` branch is unreachable. Over-parameterisation with a single frozen caller.

---

### [SEV-10] `compress.js` is dead and would crash if run; `cleanup.js` depends on an undeclared package

- **ID:** `jssoftware-full-10`
- **Severity:** Low
- **Category:** Maintainability / Supply chain
- **Confidence:** High
- **Location:** `compress.js:1-22`, `cleanup.js:8`, `package.json:14`
- **What:** `compress.js` is referenced by nothing (grep across the repo excluding `node_modules` returns zero hits) and duplicates what the `CompressionPlugin` in `rsbuild.config.ts:37-45` already does. It is also broken: `package.json` declares `"type": "module"`, but `compress.js:12` calls `require("zlib")`, which is a `ReferenceError` in an ES module. Separately, both `cleanup.js:8` and `compress.js:2` do `import { glob } from "glob"`, and `glob` is not in `dependencies` or `devDependencies`. It resolves today only because `commitizen@4.3.1` pulls in `glob@7.2.3` transitively (`bun.lock:554`).
- **Why it matters:** `cleanup.js` is the last step of `bun run build` and therefore of the production deploy in `pipeline.yml:33`. If `commitizen` ever drops or bumps `glob`, the deploy breaks with a module-resolution error at the very end of a green build. `compress.js` is a loaded gun: it looks like the compression step, so someone debugging the brotli pipeline will reach for it and get a confusing crash.
- **Fix:** Delete `compress.js`. Add `glob` to `devDependencies` explicitly.
- **Effort:** S
- **Blast radius:** Two root files, one `package.json` line.

---

### [SEV-11] Site search indexes 8 of 88 pages, two of which do not exist, and hard-navigates

- **ID:** `jssoftware-full-11`
- **Severity:** Low
- **Category:** Correctness / Performance
- **Confidence:** High
- **Location:** `src/components/content/Search.tsx:34-84`, `:176`
- **What:** The search index is a hard-coded 8-entry array against 88 routes. Two entries point at paths that are not in `ROUTES` and have no `<Route>`: `/docs/theming/dark-mode` (`:64`) and `/docs/theming/design-tokens` (`:70`). The Installation entry's excerpt reads "Install @pathscale/ui in your React, Vue, or Solid project" (`:77`), which is wrong: the library is SolidJS-only. Selecting a result does `window.location.href = result.href` (`:176`), a full document navigation inside a SPA.
- **Why it matters:** The two dead entries land on a route with no match. The full reload throws away and re-downloads the ~1 MB bundle from `jssoftware-full-05`, so every search result costs a cold start. The "React, Vue, or Solid" line is the kind of claim that costs a support conversation.
- **Fix:** Derive `searchData` from the registry in `jssoftware-full-04` so it covers every page and cannot reference a dead path. Replace `:176` with the router's `useNavigate()`. Fix or delete the React/Vue claim.
- **Effort:** S (trivial once the registry exists)
- **Blast radius:** One file.

---

### [SEV-12] Mobile setup docs reference workflow files that do not exist

- **ID:** `jssoftware-full-12`
- **Severity:** Low
- **Category:** Docs
- **Confidence:** High
- **Location:** `docs/android-setup-guide.md:342`, `:355`, `:536`, `:576`; `docs/ios-setup-guide.md:462`
- **What:** The Android guide instructs the reader four times to run `build-android-release.yml`; the iOS guide once names `build-ios-distribution-clean.yml`. Neither file exists. `.github/workflows/` actually contains `android-build.yml`, `android-firebase.yml`, `build-android.yml`, `build-android-distribution.yml`, `build-ios-device-solidjs.yml`, `build-ios-distribution.yml`, `build-ios-distribution-tf.yml`, `tauri-build.yml`, `pipeline.yml`. `docs/android-setup-guide.md:355` even gives a `cp .github/workflows/build-android-release.yml …` command that will fail.
- **Why it matters:** These two guides are 1,174 lines of the repo's 1,806 doc lines, they are the entry point for anyone setting up mobile signing, and the very first actionable instruction names a nonexistent file. `AGENTS.md:19` states "Docs describe what is true now", so this is a stated invariant being violated.
- **Fix:** Map each reference to the real workflow. Given nine workflows with overlapping names, this needs someone who knows which is canonical, not a blind rename.
- **Effort:** S
- **Blast radius:** Two doc files.
- **Related, same class:** `docs/android-setup-guide.md:175` and `:235` use `com.jssoftware.ui` as the example package name while `src-tauri/tauri.conf.json:5` is `software.js.ui` and `:51`/`:238` of the same doc use the correct one. Since `:240` warns the keystore name "must match" the identifier, an inconsistent example in a signing guide is worth fixing.

---

### [SEV-13] `frontend-conventions.md` contradicts itself and the codebase it governs

- **ID:** `jssoftware-full-13`
- **Severity:** Low
- **Category:** Docs
- **Confidence:** High
- **Location:** `docs/frontend-conventions.md:11`, `:30-31` vs `:62`
- **What:** Two defects in a 62-line file that `AGENTS.md:12` makes mandatory reading.
  - `:30-31` states "This repo has no backend services contract, there is no services JSON to consult. Don't look for one." `:62` states "Until they exist, this file plus the services JSON is the reference." Same file, direct contradiction, and it is specifically an instruction about whether to go looking for a file.
  - `:11` mandates `class=` "not `className=`". `className=` appears 16 times, including `src/App.tsx:12` (`<BaseLayout … className="min-h-screen">`), `src/layouts/BaseLayout.tsx`, `src/pages/Home.tsx`, `src/pages/docs/Index.tsx` and `src/pages/docs/Usage.tsx`. `@pathscale/ui` accepts both (`ButtonProps` declares `className?: string` explicitly), so this is a convention nobody enforces, which is a fair thing to have but not to state as a non-negotiable.
- **Why it matters:** A conventions file that contradicts itself trains readers to skim it, which defeats the point of the `AGENTS.md:12` mandate.
- **Fix:** Delete the `:62` reference to the services JSON, keeping `:30-31`. For `className`, either fix the 16 sites or soften `:11` to "prefer `class=`".
- **Effort:** S
- **Blast radius:** One doc, optionally 7 source files.

---

## Library feedback for the @pathscale/ui team

These are the places where the showcase had to work around, reimplement, or silently mis-use the library. Ordered by how much pain each one causes downstream.

1. **`Button`, `Checkbox` and `Radio` do not `Omit<…, "color">`, so a removed prop typechecks and silently no-ops.** `Badge` gets this right (`dist/components/badge/Badge.d.ts:12`: `Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color">`) and so does `Toggle` (`dist/components/toggle/Toggle.d.ts`: `Omit<…, "type" | "children" | "color">`). `Button`, `Checkbox` and `Radio` do not, so Solid's legacy `color?: string` (`solid-js/types/jsx.d.ts:1060`) leaks through and 56 dead call sites in this repo compile clean. **This is the single highest-value fix on the list:** applying `Omit<…, "color">` to the remaining three turns 56 silent bugs into 56 compiler errors across every consumer. Breaking, and that is the point. Consider auditing every component for the same gap.

2. **`TableRoot` / `TableContent` and the other Table parts are missing from the root barrel.** `dist/index.d.ts:149-151` exports only `Table`, `TableSortIcon`, `TableExpandToggle`, `TableVirtualSpacerRow`, `TableMobileListView`, `TableInlineConfirm`. The parts exist and are exported from `dist/components/table/Table.d.ts:75` (`TableRoot`, `TableScrollContainer`, `TableContent`, `TableHeader`, `TableColumn`, `TableBody`, `TableRow`, `TableCell`, `TableExpandedRow`, `TableFooter`, `TablePageSize`, `TableResizableContainer`, `TableColumnResizer`, `TableLoadMore`, `TableLoadMoreContent`), but not re-exported upward. Every other compound component is flattened (`ModalRoot`, `DrawerBody`, `AccordionTrigger`, `TooltipArrow` are all in the barrel), so Table is the sole exception and it caught the docs author out (`src/pages/docs/Usage.tsx:289`, `:315-319`). Add the flat re-exports for consistency.

3. **The 1.2.2 rename wave shipped without a codemod or a deprecation window.** `Loading` still exists but only as an alias (`dist/index.d.ts:109`: `export { Spinner as Loading }`), while `Progress` became `ProgressBar`, `RadialProgress` became `ProgressCircle`, `Divider` became `Separator`, `Range`/`SliderField` became `Slider`, `SwitchField` became `Toggle`, `DropdownSelect` became `ComboBox`/`Select`, and `Artboard`, `Carousel`, `Countdown`, `Diff`, `Mask`, `Stack`, `Stats`, `StatCard`, `Status`, `Steps`, `Swap`, `Rating`, `FileInput`, `SkipLink`, `StreamingTable`, `Sidenav` and the four `*Mockup` components were removed outright. The consuming repo's response was to tombstone 31 pages and scatter 97 `TODO[ui-1.2.2]` markers (16 in `ButtonShowcase.tsx` alone), and eight months later they are still there. If a rename map exists (`src/pages/docs/Usage.tsx:203-204` says it lives in `docs/ui-usage.md`), shipping it as a runnable `jscodeshift`/`ast-grep` codemod alongside the release would have cost the library team an afternoon and saved every consumer the same migration.

4. **A removed component leaves no compile-time trace when it was only used via a CSS import.** `src/index.css:9` still carries `/* TODO[ui-1.2.2]: sidenav component removed upstream, was @pathscale/ui/dist/sidenav/Sidenav.css */` because the removal only surfaced as a build failure on a missing file (commit `91b7fa4`). Component CSS being separately importable means removals are not caught by the type system. Consider folding per-component CSS into `dist/index.css` (which already exists and is the documented import) and dropping the per-component CSS paths from the exports map.

5. **`Toggle`'s `onChange` is uncomfortable enough that callers reach for `any`.** `src/components/theming/ThemeEditor.tsx:47`, `:55`, `:112`, `:120`, `:128` all write `onChange={(e: any) => setX(e.currentTarget.checked)}`. `src/pages/docs/Usage.tsx:144` documents the library convention as "Event callbacks pass values, not events", but `ToggleProps` inherits `onChange` from `JSX.InputHTMLAttributes<HTMLInputElement>`, so it passes an event. Either add a value-shaped `onCheckedChange?: (checked: boolean) => void` or narrow `onChange`. Confidence Medium on the exact cause of the `any` casts: I did not reproduce the type error, only observed that five sibling call sites in one file all cast.

6. **59 of 102 component families have no live showcase, so the library is shipping undocumented surface.** Full list in `jssoftware-full-14` below. The `auth-*` family (8 components), the colour-picker family (6), `combo-box`, `date-picker`, `date-range-picker`, `input-otp`, `list-box`, `number-field`, `password-field`, `popover`, `search-field`, `time-field` and `toolbar` have no rendered example anywhere. If the library team wants the showcase to keep up, the coverage gate in `jssoftware-full-04` should live in the *library's* release checklist, not just this repo's CI.

7. **Minor: `Badge` is exported as `BadgeRootProps as BadgeProps` but the barrel names the value `Badge`** (`dist/components/badge/index.d.ts:9`). Works, but the props type name not matching the value name makes `import type { BadgeProps }` a guess. Nit-level.

---

### [SEV-14] Explicit coverage delta: 59 library families with no live showcase

- **ID:** `jssoftware-full-14`
- **Severity:** Medium
- **Category:** Docs
- **Confidence:** High
- **Location:** derived from `node_modules/@pathscale/ui/dist/components/` (102 dirs) vs `src/routes.ts` (56 live pages)
- **What:** The two directions of the delta, computed mechanically.

  **Library families with no live showcase page (59).** Two of these, `empty-state` and `join`, have a showcase file that was wrongly tombstoned; the rest have never had one:

  `auth-card`, `auth-error-message`, `auth-field-group`, `auth-footer-links`, `auth-form`, `auth-powered-by`, `auth-submit-button`, `auth-success-message`, `button-group`, `checkbox-group`, `chip`, `close-button`, `color-area`, `color-field`, `color-slider`, `color-swatch`, `color-swatch-picker`, `color-wheel-flower`, `combo-box`, `date-field`, `date-picker`, `date-range-picker`, `description`, `disclosure`, `disclosure-group`, **`empty-state`**, `error-message`, `field-error`, `header`, `immersive-landing`, `input-group`, `input-otp`, **`join`**, `label`, `language-switcher`, `list-box`, `live-chat`, `meter`, `number-field`, `password-field`, `password-requirements`, `password-rules`, `popover`, `progress-bar`, `progress-circle`, `range-calendar`, `scroll-shadow`, `search-field`, `separator`, `size-picker`, `slider`, `surface`, `tag`, `tag-group`, `text`, `text-field`, `theme-color-picker`, `time-field`, `toolbar`

  Note `progress-bar`, `progress-circle`, `separator` and `slider` appear here only because their showcases were tombstoned under the old names (`Progress`, `Radial Progress`, `Divider`, `Range`/`SliderField`), so these are retargets rather than new pages.

  **Showcase pages for components the library no longer exports (23).** `Artboard`, `Background`, `BrowserMockup`, `CodeMockup`, `Phonemockup`, `WindowMockup`, `SvgBackground`, `Carousel`, `Countdown`, `Diff`, `Mask`, `Stack`, `Stats`, `StatCard`, `Status`, `Steps`, `Swap`, `Rating`, `FileInput`, `Dock`, `FormActions`, `SkipLink`, `StreamingTable`. All are already tombstoned, all are still routed, and 21 of them are still in the header nav.

  **Also worth noting:** `Sidenav` is routed and tombstoned, and its CSS import is commented out at `src/index.css:9`.

- **Why it matters:** 56 live pages against 102 families means the site documents 55% of the library, while telling visitors it documents "all 82 components" (`src/pages/Showcases.tsx:46`). The 8-component `auth-*` family in particular is the kind of thing consumers will not discover exists.
- **Fix:** The coverage gate in `jssoftware-full-04` step 4. Generating this delta is ~20 lines of Node against `dist/index.d.ts` and the registry; running it in CI is what keeps this list from being re-derived by hand at the next review.
- **Effort:** S for the gate, XL to actually author 59 showcases
- **Blast radius:** New files only.

---

## Security and supply chain

Brief, because the slice is genuinely clean. Explicit results against the cross-repo pattern list:

| # | Pattern | Result |
|---|---|---|
| 1 | `encodePassword` in `src/utils/encoders.ts` | **Absent.** No `src/utils/encoders.ts`, no `encodePassword`, no base32/base64 password path. This repo has no auth of any kind. |
| 2 | Role from `localStorage` used by a route guard | **Absent.** No `ProtectedRoute`, no `RoleSelector`, no role read. `localStorage` is used in exactly two places, both cosmetic: `src/lib/theme.ts:8`/`:23` (dead code, see `jssoftware-full-08`) and `src/lib/theme-colors.ts:5-7` (dead code). |
| 3 | Secrets or credentials reaching logs; third-party log sinks | **Absent.** No HyperDX, Sentry, Datadog or any ingest endpoint. 12 `console.*` calls total, all demo handlers (`MenuShowcase.tsx:333`, `CardShowcase.tsx:251`, `FormShowcase.tsx:58`/`:223`) or genuine error paths. No credentials exist to leak. |
| 4 | Encryption key beside the ciphertext | **Absent.** `@pathscale/secure-local-storage-aes-siv` is not a dependency; no crypto in this repo. |
| 5 | Anonymous-reachable endpoints leaking operator fields | **N/A.** Static site, no backend, no fetch to any API. |
| 6 | CI deploying without a frozen lockfile | **Clean.** `.github/workflows/pipeline.yml:23` uses `bun install --frozen`, and the same job runs `bun run build`, which begins with `tsc --noEmit` (`package.json:18`). There is no separate test job to diverge from. |

Other supply-chain observations:

- **Install scripts:** only two across 581 installed packages, `@tailwindcss/oxide@4.1.7` (native binary download) and `core-js@3.42.0` (the standard ad banner). Both are expected. `package.json` has no `trustedDependencies`, so Bun does not run them at all by default.
- **No git-ref or `file:` dependencies.** All deps are registry versions with caret ranges, backed by a committed `bun.lock` (182 KB).
- **No committed secrets.** Scanned `src`, `scripts`, `.github`, `src-tauri`, `public` for API-key/private-key shapes: zero hits. `pipeline.yml:40-44` reads all four BunnyCDN credentials from GitHub secrets.
- **XSS:** one `innerHTML` at `src/components/content/MDXRenderer.tsx:188`, taking `props.content` directly. The file is unreachable from `src/index.tsx` and has zero importers, so it is not exploitable today. It should be deleted rather than left as a loaded primitive for a future author to wire up.
- **Tauri CSP is disabled** (`src-tauri/tauri.conf.json:23`: `"csp": null`). Low risk for a bundled static showcase with no remote content and only the log plugin registered, but it is a default worth setting rather than nulling.
- **Third-party runtime dependencies in the page:** `src/index.css:2` blocking-imports Nunito Sans from `fonts.googleapis.com`, and 26 demo images load from `img.daisyui.com` (`ChatBubbleShowcase.tsx`, `TableShowcase.tsx`, `CardShowcase.tsx`). Both are availability and privacy dependencies on hosts nobody here controls. Self-hosting the font would also remove a render-blocking round trip.
- **Deploy sharp edge (documented, not a defect):** `cleanup.js:11-19` deletes the uncompressed bundles and renames the brotli files over the plain names, so `dist/static/js/app.mjs` contains raw brotli bytes. This only works because BunnyCDN is configured to serve them with `Content-Encoding: br`. Anyone serving `dist/` any other way gets binary garbage. The `.scss` extension on the CSS (`cleanup.js:24`) is a cache-busting disguise, not SCSS. Worth a comment at the top of `cleanup.js`.
- **Four disagreeing version schemes:** `package.json:4` is `0.0.1`, `src-tauri/tauri.conf.json:4` is `0.1.20`, `src-tauri/Cargo.toml:3` is `0.1.0`, and `pipeline.yml:27` sed-rewrites `package.json` to `1.0.<run#>` at deploy time. Since `cleanup.js:31` reads `packageJson.version` to build the `?v=` cache-bust query, a local `bun run build` always emits `?v=0.0.1`, so local artefacts and CI artefacts are cache-indistinguishable from each other but not from themselves.

---

## AI smell inventory

- **97 `TODO[ui-1.2.2]` markers across 58 files**, added in one migration commit (`50166ac`) and untouched since. Concentration: `ButtonShowcase.tsx` 16, `ComponentsDemo.tsx` 10, `navbar-showcase/BasicSections.tsx` 7, `AvatarShowcase.tsx` 4. Most are of the form "`color` prop removed; semantic palette collapsed into `variant`" sitting directly above code that still passes `color`, so the file documents its own bug and leaves it.
- **75-line banner comment stack in `src/pages/Theming.tsx:1-50` and `:83-107`.** A 50-line file-header docstring describing the algorithm, then a second 25-line docstring inside `randomizeTheme` (a 9-line function) restating the same six numbered points. The content also over-claims: point 5 promises "DUAL ACCESSIBILITY VALIDATION, WCAG 2.1 and APCA (WCAG 3)", but the APCA implementation in `src/utils/theme/contrastCalculation.ts` is a homemade luminance-delta approximation, not APCA. Documentation of an aspiration presented as an implementation detail.
- **`src/utils/themeUtils.ts` is a 77-line compatibility shim over `src/lib/themeIndex.ts` with name collisions.** It does `export * from "../lib/themeIndex"` at `:6` and then re-exports several of the same names locally, so which binding wins is decided by ES-module local-export precedence rather than by anyone's intent. Every theming component imports through this shim rather than the real module. The header comment says "maintaining legacy API", but nothing outside this repo consumes it, so there is no legacy to maintain.
- **13 files unreachable from `src/index.tsx`** (full import-graph walk): `src/SidenavWrapper.tsx`, `src/ThemeToggle.tsx`, `src/components/content/MDXRenderer.tsx`, `src/components/layout/Navigation/Breadcrumbs.tsx`, `src/components/layout/Navigation/CompactNavigation.tsx`, `src/components/showcase/ShowcaseBlock.tsx`, `src/layouts/DocsLayout.tsx`, `src/layouts/ShowcaseLayout.tsx` (a second, unused ShowcaseLayout distinct from `src/components/ShowcaseLayout.tsx`), `src/lib/theme-colors.ts`, `src/lib/theme.ts`, `src/pages/docs/Components.tsx`, `src/utils/validateThemeGeneration.ts`, `src/vite-env.d.ts`. Two of these are actively confusing: the duplicate `ShowcaseLayout` (a reader grepping the name finds two), and `pages/docs/Components.tsx` which contains a plausible-looking category taxonomy that is a fourth copy of the nav data and is rendered nowhere.
- **`src/vite-env.d.ts` is a Vite leftover** in an Rsbuild project. It exists solely for `declare module 'prismjs'` (`:3`), which silently types all of Prism as `any`. Rename and add `@types/prismjs`.
- **Unused runtime dependencies:** `cmdk-solid`, `solid-sonner` and `embla-carousel-solid` are all in `devDependencies` and imported nowhere. Search is hand-rolled (`src/components/content/Search.tsx`), toasts come from `@pathscale/ui`, and the Carousel showcase is a tombstone. `daisyui` and `tailwindcss-animate`/`tw-animate-css` are used via CSS plugins, so keep those.
- **Copy-paste that drifted:** `CheckboxShowcase.tsx:110-117` and `RadioShowcase.tsx` share the same eight-colour block; `LoadingShowcase.tsx` has the same shape but was correctly migrated to `SpinnerColor`. Same origin, three different states of correctness. Similarly `Showcases.tsx:39-90` and `docs/Components.tsx:18-60` are two divergent hand-written category taxonomies over the same route list.
- **Substring matching used as categorisation:** `src/pages/Showcases.tsx:16-37` builds the "featured" list with `route.name.toLowerCase().includes(comp.toLowerCase())` over `["Button","Card","Input","Modal","Navbar","Alert","Grid","Flex"]`. So `Card` captures `StatCard` and `GlowCard`, `Input` captures `FileInput`, and `Button` captures `CopyButton`. Two of those captured entries (`StatCard`, `FileInput`) are tombstones, so the "featured components" grid on the landing page promotes dead pages.
- **`src/components/ComponentsDemo.tsx` is 797 lines** and reachable only through `Preview.tsx:52` behind `selectedKey() === "demo"`, itself only used by the theming playground. It is the largest file in the repo and carries 10 of the `TODO[ui-1.2.2]` markers. Splitting it is less useful than asking whether the theming preview needs a 797-line kitchen sink at all, given the site already has 56 showcase pages.
- **`index.html:7-12` sets `Cache-Control: no-cache, no-store, must-revalidate`, `Pragma: no-cache` and `Expires: 0` as `<meta http-equiv>` tags** while `cleanup.js:33-40` separately appends `?v=<version>` query strings for cache busting. Two cache strategies that contradict each other, and `<meta http-equiv>` cache directives are ignored by browsers for the document itself anyway. The `?v=` approach is the one that works; the meta tags are cargo.

---

## Cross-cutting recommendations

1. **Consolidate the five registries into one, then derive everything.** (`jssoftware-full-04` step 1, plus `-01`, `-11`, `-14`.) One `src/showcases/registry.ts` with `{ id, name, category, description, load }` feeding `routes.ts`, `navigationData.ts`, `Showcases.tsx`, `Components.tsx` and `Search.tsx`. *Why:* every drift finding in this review traces back to the same fact being written in four to five places. *Plan:* build the registry from the existing `routes.ts` entries mechanically, then rewrite the four consumers as derivations, then delete the old sources one at a time. *What breaks:* nothing at runtime if `path` values are preserved exactly; the risk is silently changing a URL, so diff the generated route list against the current one before merging.

2. **Add `bun run check:coverage` and put it in CI.** (`jssoftware-full-14`.) Diff the registry against `@pathscale/ui`'s barrel exports in both directions and fail on either. *Why:* this is the only mechanism that stops the 1.2.2 situation recurring on the 1.3 bump, and the next bump is the moment it matters. *Plan:* ~20 lines of Node parsing `dist/index.d.ts`, wired as a step before `bun run build` in `pipeline.yml`. *What breaks:* CI goes red immediately with 59 missing and 23 stale, so land it with an explicit allowlist that shrinks over time rather than as a hard gate on day one.

3. **Generate prop tables from the library's `.d.ts`.** (`jssoftware-full-04` step 3, plus `-02`.) *Why:* it deletes 1,941 hand-maintained lines and makes the Checkbox/Radio/Button `color` lie structurally impossible, which is a stronger guarantee than any amount of review. *Plan:* a `gen:props` script using `ts-morph` emitting `src/generated/props.json`, run in `prebuild`; `PropsTable` takes a component name instead of an array. *What breaks:* prop *descriptions* are not in the `.d.ts`, so keep a small hand-written `descriptions.ts` keyed by `component.prop` and let the generator warn on keys that no longer resolve. That warning is itself a useful drift signal.

4. **Make the lint gate real, then reformat once.** (`jssoftware-full-06`.) *Why:* two documents instruct everyone to run a command that has never checked anything, and the style inconsistencies in the AI-smell section are the visible cost. *Plan:* swap `biome` for `@biomejs/biome`, reconcile `biome.json` with the installed major, run `biome check --write` as a single isolated commit. *What breaks:* one enormous formatting diff. Do it on a quiet branch and rebase in-flight work over it, per the merge ban in `AGENTS.md`.

5. **Split the bundle once the registry exists.** (`jssoftware-full-05`.) *Why:* 998 KB of JS and 693 KB of CSS on first paint for a site whose job is to make the library look good. *Plan:* `lazy()` around `registry[].load`, drop `splitChunks: false`, generalise `cleanup.js`'s `?v=` rewriting to handle multiple emitted filenames. *What breaks:* the BunnyCDN `Content-Encoding: br` arrangement is filename-sensitive. Test against a preview zone before touching master, since `pipeline.yml` deploys on every push with no manual gate.

6. **Decide what the theming playground is for, and delete the rest.** (`jssoftware-full-08`, `-09`.) *Why:* the site cannot demonstrate dark mode, two prominent toggles do nothing, `src/utils/themeUtils.ts` shadows its own re-exports, and `ComponentsDemo.tsx` is 797 lines serving only this page. That is the single densest concentration of dead and misleading code in the repo. *Plan:* pick one owner for "apply a theme" (either `lib/theme.ts` or the playground's inline variables, not both), wire `applyToWholeSite`/`rememberTheme` to it, delete `theme-colors.ts`, `validateThemeGeneration.ts` and the `themeUtils.ts` shim. *What breaks:* the playground's preview isolation, if applying globally is chosen. Worth a design conversation before code.

---

## What I did not cover

- **Runtime behaviour.** I did not start the dev server or open a browser. Every finding is from source, types and the committed `dist/`. In particular the claims about what a page *renders* (eight identical checkboxes, invisible copy button, dead nav links) are inferred from the code and the library's type surface, not observed. They are high-confidence but unverified visually.
- **The `@pathscale/ui` source.** I read only the published `.d.ts` files in `node_modules/@pathscale/ui@1.2.4/dist/`. I did not open `/Users/revenge/code/UI`. Where I say a component "has no `color` prop" I mean its published types do not declare one; if the implementation reads `props.color` anyway, that is a separate defect I would not have seen.
- **The nine mobile workflows.** I verified that two workflow filenames referenced in the docs do not exist and spot-checked the bundle-id references. I did not audit the signing, Firebase App Distribution, Diawi, or App Store Connect JWT logic in `build-ios-distribution-tf.yml` and friends. Given that those files handle signing credentials, they deserve their own pass.
- **The theme generator's colour maths.** I read the structure of `src/utils/theme/*` and `src/lib/glassFormulas.ts` but did not verify the OKLCH conversions, the contrast calculations, or the reported disagreement between `GLASS_THEME_DEFAULTS` and the formula output. The prior analysis at `/Users/revenge/code/js.software-analysis.md` flags the latter; I neither confirmed nor refuted it.
- **Accessibility.** No keyboard-navigation, focus-order, contrast or screen-reader audit. For a component showcase this is arguably the most important missing lens.
- **`bun run build`.** Not run (it deploys nothing locally, but I avoided mutating `dist/`). `tsc --noEmit` was run and passes.
- **`bun.lock` transitive audit.** I enumerated install scripts across all 581 installed packages and checked for git-ref dependencies, but did not run a vulnerability scan.

## Quick-start for the follow-up agent

Read in this order:

1. `src/routes.ts` (639 lines) then `src/config/routes.ts` and `src/components/layout/Header/navigationData.ts`. These three plus `src/pages/Showcases.tsx` and `src/pages/docs/Components.tsx` are the five registries that must be collapsed first. Everything else depends on that move.
2. `src/components/ButtonShowcase.tsx` (553 lines). The canonical page template, and the clearest single illustration of the boilerplate and of the stale-`color` problem living next to a TODO that names it.
3. `src/components/showcase/` (5 files, 157 lines total). `ShowcaseSection`, `CodeBlock`, `PropsTable` are the primitives you will be extending; `CopyButton.tsx` is the stub; `ShowcaseBlock.tsx` is dead.
4. `node_modules/@pathscale/ui/dist/index.d.ts` (185 lines). The whole public API in one file. Read it before believing any prop table in this repo.
5. `src/pages/docs/Usage.tsx` (436 lines). The newest doc and the one with the most wrong claims per line.
6. `rsbuild.config.ts` then `cleanup.js` then `.github/workflows/pipeline.yml`. Read all three before changing anything about the build. The brotli-bytes-under-plain-filenames arrangement is not obvious and is not commented.

Verification commands:

```bash
bun install                 # bun only; AGENTS.md:17 forbids a second lockfile
bun run typecheck           # real gate, currently passes
bun run lint                # currently a NO-OP, see jssoftware-full-06
bun run dev                 # rsbuild dev server on :3000
bun run build               # typecheck + rsbuild + cleanup.js (mutates dist/)
```

Regenerate this review's coverage numbers:

```bash
# library families vs live showcase pages
node -e '
const fs=require("fs");
const dirs=fs.readdirSync("node_modules/@pathscale/ui/dist/components")
  .filter(d=>fs.statSync("node_modules/@pathscale/ui/dist/components/"+d).isDirectory()&&d!=="_shared");
const tomb=fs.readdirSync("src/components")
  .filter(f=>/Showcase\.tsx$/.test(f)&&/Component no longer in|Component removed in/
    .test(fs.readFileSync("src/components/"+f,"utf8")));
console.log("library families:",dirs.length,"tombstoned showcases:",tomb.length);
'
```

Surprising things about this repo:

- **The bundler is Rsbuild (Rspack), not Vite**, despite `src/vite-env.d.ts` surviving in the tree. Do not reach for Vite plugins or `import.meta.glob`.
- **`src/styles/themes/generated.css` is hand-authored** despite the name. No build step produces it. Editing it by hand is correct.
- **There are two files named `ShowcaseLayout.tsx`.** `src/components/ShowcaseLayout.tsx` is the live one (51 importers); `src/layouts/ShowcaseLayout.tsx` is dead. Check the import path, not the name.
- **All theming code imports through `src/utils/themeUtils.ts`**, a shim that shadows several of its own `export *` names. The real implementations are under `src/lib/` and `src/utils/theme/`.
- **`AGENTS.md` bans merge commits outright** (`AGENTS.md:82`) and bans AI attribution in commits, PRs and comments. Rebase only. `CLAUDE.md` is a four-line pointer at `AGENTS.md`; do not duplicate rules into it.
- **`AGENTS.md` currently has uncommitted changes** in the working tree. Do not stash or check out over them.
