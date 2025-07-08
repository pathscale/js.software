import {
  Component,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";

export interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  category: string;
}

export interface SearchProps {
  className?: string;
  placeholder?: string;
  maxResults?: number;
}

export const Search: Component<SearchProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [results, setResults] = createStore<SearchResult[]>([]);

  let searchRef: HTMLInputElement | undefined;
  let modalRef: HTMLDivElement | undefined;

  // Mock search data - in production this would come from your content index
  const searchData: SearchResult[] = [
    {
      title: "Getting Started",
      href: "/docs",
      excerpt:
        "Learn how to install and use @pathscale/ui components in your project",
      category: "Overview",
    },
    {
      title: "Button Component",
      href: "/docs/components/button",
      excerpt: "Interactive button component with multiple variants and states",
      category: "Components",
    },
    {
      title: "Card Component",
      href: "/docs/components/card",
      excerpt:
        "Flexible card component for displaying content in a card layout",
      category: "Components",
    },
    {
      title: "Navbar Component",
      href: "/docs/components/navbar",
      excerpt: "Navigation bar component for website headers and navigation",
      category: "Components",
    },
    {
      title: "Dark Mode",
      href: "/docs/theming/dark-mode",
      excerpt: "How to implement and customize dark mode in your application",
      category: "Theming",
    },
    {
      title: "Design Tokens",
      href: "/docs/theming/design-tokens",
      excerpt: "Understanding and using design tokens for consistent styling",
      category: "Theming",
    },
    {
      title: "Installation",
      href: "/docs/installation",
      excerpt: "Install @pathscale/ui in your React, Vue, or Solid project",
      category: "Overview",
    },
    {
      title: "Best Practices",
      href: "/docs/guides/best-practices",
      excerpt: "Best practices for using @pathscale/ui components effectively",
      category: "Guides",
    },
  ];

  // Search function with fuzzy matching
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
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

    setResults(filtered);
    setSelectedIndex(0);
  };

  // Keyboard shortcuts
  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    // Cmd+K or Ctrl+K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }

    // Escape to close
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
    setIsOpen(true);
    setTimeout(() => searchRef?.focus(), 100);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(0);
  };

  const navigateToResult = (result: SearchResult) => {
    window.location.href = result.href;
    closeSearch();
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark class="bg-yellow-200 text-yellow-900">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Handle clicks outside modal
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef && !modalRef.contains(e.target as Node)) {
      closeSearch();
    }
  };

  createEffect(() => {
    performSearch(query());
  });

  onMount(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("click", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleGlobalKeyDown);
    document.removeEventListener("click", handleClickOutside);
  });

  const SearchIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={openSearch}
        class={`flex items-center gap-2 px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-lg hover:bg-base-200 transition-colors ${
          props.className || ""
        }`}
      >
        <SearchIcon />
        <span class="text-base-content/70">
          {props.placeholder || "Search docs..."}
        </span>
        <kbd class="hidden sm:flex items-center gap-1 ml-auto text-xs text-base-content/70">
          <span class="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      <Show when={isOpen()}>
        <div class="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[10vh] px-4">
          <div
            ref={modalRef}
            class="w-full max-w-2xl bg-base-100 rounded-lg shadow-2xl border border-base-300"
          >
            {/* Search Input */}
            <div class="flex items-center px-4 py-3 border-b border-base-300">
              <SearchIcon />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search documentation..."
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={handleSearchKeyDown}
                class="flex-1 ml-3 bg-transparent placeholder-base-content/70 outline-none"
              />
              <kbd class="text-xs text-base-content/70">ESC</kbd>
            </div>

            {/* Search Results */}
            <div class="max-h-96 overflow-y-auto">
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
                    <button
                      class={`w-full text-left p-4 hover:bg-base-200 transition-colors border-b border-base-300 last:border-b-0 ${
                        index() === selectedIndex() ? "bg-base-200" : ""
                      }`}
                      onClick={() => navigateToResult(result)}
                    >
                      <div class="flex items-start gap-3">
                        <div class="flex-1 min-w-0">
                          <div class="font-medium  mb-1">
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
                    </button>
                  )}
                </For>
              </Show>
            </div>

            {/* Footer */}
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
    </>
  );
};

export default Search;
