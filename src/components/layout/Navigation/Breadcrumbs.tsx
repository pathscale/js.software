import { Component, createMemo, For } from "solid-js";
import { useLocation } from "@solidjs/router";
import { ROUTES } from "../../../config/routes";

export interface BreadcrumbItem {
  title: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  className?: string;
  items?: BreadcrumbItem[];
}

export const Breadcrumbs: Component<BreadcrumbsProps> = (props) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if not provided
  const breadcrumbItems = createMemo(() => {
    if (props.items) {
      return props.items;
    }

    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    const items: BreadcrumbItem[] = [{ title: "Home", href: ROUTES.HOME }];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Convert segment to readable title
      const title = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      items.push({
        title,
        href: isLast ? undefined : currentPath,
        isActive: isLast,
      });
    });

    return items;
  });

  const ChevronRightIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="text-chromatic-muted"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );

  return (
    <nav
      aria-label="Breadcrumb"
      class={`flex items-center space-x-2 text-sm ${props.className || ""}`}
    >
      <ol class="flex items-center space-x-2">
        <For each={breadcrumbItems()}>
          {(item, index) => (
            <>
              <li class="flex items-center">
                {item.href ? (
                  <a
                    href={item.href}
                    class="text-chromatic-muted hover:text-chromatic-primary transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span
                    class={`${
                      item.isActive ? " font-medium" : "text-chromatic-muted"
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </li>
              {index() < breadcrumbItems().length - 1 && (
                <li>
                  <ChevronRightIcon />
                </li>
              )}
            </>
          )}
        </For>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
