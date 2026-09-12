import {
  Component,
  createSignal,
  createEffect,
  onCleanup,
  For,
  Show,
} from "solid-js";
import { createStore } from "solid-js";
import { Portal } from "@solidjs/web";
import { useLocation } from "@solidjs/router";
import { Button, Icon, Input } from "@pathscale/ui";
import { ROUTES } from "../../config/routes";

export interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  category: string;
}

export interface SearchProps {
  class?: string;
  placeholder?: string;
  maxResults?: number;
  idPrefix?: string;
  globalShortcut?: boolean;
  onNavigate?: () => void;
}

export const Search: Component<SearchProps> = (props) => {
  const idPrefix = () => props.idPrefix || "site-search";
  const location = useLocation();
  let previousPathname = location.pathname;
  const [isOpen, setIsOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [results, setResults] = createStore<SearchResult[]>([]);

  let searchRef: HTMLInputElement | undefined;
  let dialogRef: HTMLDivElement | undefined;
  let triggerRef: HTMLButtonElement | undefined;
  let restoreFocusTo: HTMLElement | null = null;
  let focusTimer: ReturnType<typeof setTimeout> | undefined;

  const titleOverrides: Partial<Record<keyof typeof ROUTES, string>> = {
    HOME: "Home",
    DOCS: "Documentation",
    DOCS_INSTALLATION: "Installation",
    DOCS_LAYOUTS: "Solid Layouts",
    DOCS_USAGE: "Usage Cheatsheet",
    THEMING: "Theme Editor",
    SHOWCASES: "Component Showcases",
    CHAT_BUBBLE: "Chat Bubble",
    COLOR_PICKER: "Color Picker",
    FILE_INPUT: "File Input",
    FORM_ACTIONS: "Fieldset Actions",
    GLASS_PANEL: "Glass Panel",
    GLOW_CARD: "Glow Card",
    NOISE_BACKGROUND: "Noise Background",
    RADIAL_PROGRESS: "Radial Progress",
    RADIO_GROUP: "Radio Group",
    DATA_GRID: "Data Grid",
    VIDEO_PREVIEW: "Video Preview",
    COVERAGE: "Complete Coverage",
  };

  const searchData: SearchResult[] = Object.entries(ROUTES).map(([key, href]) => {
    const routeKey = key as keyof typeof ROUTES;
    const title =
      titleOverrides[routeKey] ??
      key
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    const category = href.startsWith("/docs")
      ? "Documentation"
      : href === ROUTES.THEMING
        ? "Theming"
        : href === ROUTES.HOME || href === ROUTES.SHOWCASES
          ? "Overview"
          : "Components";
    return {
      title,
      href,
      excerpt:
        category === "Components"
          ? `Interactive ${title} examples for @pathscale/ui`
          : category === "Theming"
            ? "Build, preview, save, and export an @pathscale/ui theme"
            : `Open the ${title} page`,
      category,
    };
  });

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(() => []);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = searchData
      .map((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const excerptMatch = item.excerpt.toLowerCase().includes(query);
        const categoryMatch = item.category.toLowerCase().includes(query);

        if (titleMatch || excerptMatch || categoryMatch) {
          return {
            ...item,
            relevance: titleMatch ? 3 : excerptMatch ? 2 : 1,
          };
        }
        return null;
      })
      .filter(
        (
          item
        ): item is {
          title: string;
          href: string;
          excerpt: string;
          category: string;
          relevance: number;
        } => item !== null
      )
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, props.maxResults || 8)
      .map(({ relevance, ...item }) => item);

    setResults(() => filtered);
    setSelectedIndex(0);
  };

  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (isOpen()) searchRef?.focus();
      else openSearch();
    }

    if (e.key === "Escape" && isOpen()) {
      closeSearch();
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex()]) {
          navigateToResult(results[selectedIndex()]);
        }
        break;
      case "Escape":
        closeSearch();
        break;
    }
  };

  const openSearch = () => {
    restoreFocusTo =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : triggerRef || null;
    setIsOpen(true);
    clearTimeout(focusTimer);
    focusTimer = setTimeout(() => searchRef?.focus(), 0);
  };

  const closeSearch = () => {
    const wasOpen = isOpen();
    clearTimeout(focusTimer);
    setIsOpen(false);
    setQuery("");
    setResults(() => []);
    setSelectedIndex(0);
    if (wasOpen) {
      const focusTarget = restoreFocusTo;
      restoreFocusTo = null;
      setTimeout(() => {
        if (focusTarget?.isConnected) focusTarget.focus();
      }, 0);
    }
  };

  const resultId = (href: string) =>
    `${idPrefix()}-result-${href === "/" ? "home" : href.slice(1).replaceAll("/", "-")}`;

  const navigateToResult = (result: SearchResult) => {
    document.getElementById(resultId(result.href))?.click();
  };

  const handleDialogKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key !== "Tab" || !dialogRef) return;

    const focusable = Array.from(
      dialogRef.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);
    if (focusable.length === 0) {
      event.preventDefault();
      dialogRef.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark class="bg-yellow-200 text-yellow-900">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Solid 2 splits an effect in two: the first function tracks and returns,
  // the second acts on that value. The one-argument form throws
  // MISSING_EFFECT_FN.
  createEffect(
    () => query(),
    (value) => performSearch(value),
  );

  createEffect(
    () => location.pathname,
    (pathname) => {
      if (pathname === previousPathname) return;
      previousPathname = pathname;
      closeSearch();
    },
  );

  if (props.globalShortcut !== false) {
    document.addEventListener("keydown", handleGlobalKeyDown);
  }
  onCleanup(() => {
    clearTimeout(focusTimer);
    if (props.globalShortcut !== false) {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    }
  });

  const SearchIcon = () => (
    <Icon src="icon-[lucide--search]" width={20} height={20} />
  );

  const trigger = (
    <Button
      id={`${idPrefix()}-open`}
      ref={triggerRef}
      onClick={() => (isOpen() ? closeSearch() : openSearch())}
      aria-controls={`${idPrefix()}-dialog`}
      aria-expanded={isOpen() ? "true" : "false"}
      aria-haspopup="dialog"
      variant="outline"
      flavor="neutral"
      radius="lg"
      class={`flex items-center gap-2 px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-lg hover:bg-base-200 transition-colors ${
        props.class || ""
      }`}
    >
      <SearchIcon />
      <span class="text-base-content/70">
        {props.placeholder || "Search docs..."}
      </span>
      <kbd class="hidden sm:flex items-center gap-1 ml-auto text-xs text-base-content/70">
        <span class="text-xs">⌘</span>K
      </kbd>
    </Button>
  );

  return (
    <>
      {trigger}

      <Portal mount={document.body}>
        <Show when={isOpen()}>
          <div
            id={`${idPrefix()}-dialog-layer`}
            class="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[10vh] px-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeSearch();
            }}
          >
            <div
              id={`${idPrefix()}-dialog`}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Search documentation"
              tabindex="-1"
              onKeyDown={handleDialogKeyDown}
              class="w-full max-w-2xl bg-base-100 rounded-lg shadow-2xl border border-base-300"
            >
              <div class="flex items-center px-4 py-3 border-b border-base-300">
                <SearchIcon />
                <Input
                  id={`${idPrefix()}-input`}
                  ref={searchRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query()}
                  onInput={(e) => setQuery(e.currentTarget.value)}
                  onKeyDown={handleSearchKeyDown}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded="true"
                  aria-controls={`${idPrefix()}-results`}
                  aria-activedescendant={
                    results[selectedIndex()]
                      ? resultId(results[selectedIndex()].href)
                      : undefined
                  }
                  class="flex-1 ml-3 bg-transparent placeholder-base-content/70 outline-none"
                />
                <kbd class="text-xs text-base-content/70">ESC</kbd>
              </div>

              <div
                id={`${idPrefix()}-results`}
                role="listbox"
                aria-label="Search results"
                class="max-h-96 overflow-y-auto"
              >
                <Show
                  when={results.length > 0}
                  fallback={
                    <div class="p-4 text-center text-base-content/70">
                      {query() ? "No results found" : "Start typing to search..."}
                    </div>
                  }
                >
                  <For each={results}>
                    {(result, index) => (
                      <Button
                        id={resultId(result.href)}
                        role="option"
                        aria-selected={index() === selectedIndex() ? "true" : "false"}
                        href={result.href}
                        onClick={() => {
                          closeSearch();
                          props.onNavigate?.();
                        }}
                        variant="plain"
                        flavor="neutral"
                        radius="none"
                        width="full"
                        class={`w-full justify-start text-left p-4 hover:bg-base-200 transition-colors border-b border-base-300 last:border-b-0 ${
                          index() === selectedIndex() ? "bg-base-200" : ""
                        }`}
                      >
                        <div class="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                          <div class="flex-1 min-w-0">
                            <div class="font-medium mb-1">
                              {highlightMatch(result.title, query())}
                            </div>
                            <div class="text-sm text-base-content/70 line-clamp-2">
                              {highlightMatch(result.excerpt, query())}
                            </div>
                          </div>
                          <div class="flex-shrink-0">
                            <span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                              {result.category}
                            </span>
                          </div>
                        </div>
                      </Button>
                    )}
                  </For>
                </Show>
              </div>

              <div class="flex items-center justify-between px-4 py-3 text-xs text-base-content/70 border-t border-base-300">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1">
                    <kbd>↑↓</kbd> to navigate
                  </span>
                  <span class="flex items-center gap-1">
                    <kbd>⏎</kbd> to select
                  </span>
                </div>
                <span>Search by @pathscale/ui</span>
              </div>
            </div>
          </div>
        </Show>
      </Portal>
    </>
  );
};

export default Search;
