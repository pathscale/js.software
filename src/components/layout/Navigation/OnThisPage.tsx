import {
  Component,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
} from "solid-js";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface OnThisPageProps {
  className?: string;
  items?: TOCItem[];
}

export const OnThisPage: Component<OnThisPageProps> = (props) => {
  const [activeId, setActiveId] = createSignal<string>("");
  const [tocItems, setTocItems] = createSignal<TOCItem[]>([]);

  // Auto-generate TOC from page headings if not provided
  const generateTOC = () => {
    if (props.items) {
      setTocItems(props.items);
      return;
    }

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items: TOCItem[] = [];

    headings.forEach((heading) => {
      const id =
        heading.id ||
        heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
        "";
      if (!heading.id && id) {
        heading.id = id;
      }

      const level = parseInt(heading.tagName.charAt(1));
      items.push({
        id,
        title: heading.textContent || "",
        level,
      });
    });

    setTocItems(items);
  };

  // Intersection Observer for active section tracking
  let observer: IntersectionObserver;

  const setupIntersectionObserver = () => {
    const headingElements = tocItems()
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (headingElements.length === 0) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  onMount(() => {
    // Wait for content to load then generate TOC
    setTimeout(() => {
      generateTOC();
    }, 100);
  });

  createEffect(() => {
    if (tocItems().length > 0) {
      setupIntersectionObserver();
    }
  });

  onCleanup(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return (
    <div class={`sticky top-24 ${props.className || ""}`}>
      <div class="text-sm p-4">
        <h3 class="font-semibold mb-4">On this page</h3>

        <nav>
          <ul class="space-y-2">
            <For each={tocItems()}>
              {(item) => (
                <li
                  class={`${item.level > 2 ? "ml-4" : ""} ${
                    item.level > 3 ? "ml-8" : ""
                  }`}
                >
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    class={`block w-full text-left py-1 px-2 rounded text-sm transition-colors
                      ${
                        activeId() === item.id
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-base-content/70 hover:bg-base-200"
                      }`}
                  >
                    {item.title}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </nav>

        {/* Quick actions */}
        <div class="mt-8 pt-6 border-t border-base-300">
          <h4 class="font-medium mb-3 text-sm">Quick actions</h4>
          <div class="space-y-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              class="block w-full text-left py-1 px-2 text-xs text-base-content/70 hover:bg-base-200 rounded transition-colors"
            >
              Back to top
            </button>
            <a
              href="https://github.com/pathscale/ui/edit/main/docs"
              target="_blank"
              rel="noopener noreferrer"
              class="block py-1 px-2 text-xs text-base-content/70 hover:bg-base-200 rounded transition-colors"
            >
              Edit this page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnThisPage;
