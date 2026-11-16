import { createRouter, useLocation, useNavigate } from "@solidjs/router";
import { ParentComponent, createEffect, onCleanup } from "solid-js";
import { routes } from "./routes";

import { MarketingHeader } from "./components/layout/Header/MarketingHeader";
import { BaseLayout } from "./layouts/BaseLayout";

const Layout: ParentComponent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeInternalLink = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = event
      .composedPath()
      .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    if (!anchor || anchor.hasAttribute("download")) return;
    if (anchor.target && anchor.target !== "_self") return;

    const rawHref = anchor.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#")) return;

    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash
    ) {
      return;
    }

    event.preventDefault();
    navigate(`${destination.pathname}${destination.search}${destination.hash}`);
  };

  // Anchors rendered outside the router's own delegated handler (overlays,
  // portals, search results) would otherwise trigger a full page load and drop
  // running state. Skipped when the event is already default-prevented, so
  // links the router handles are not navigated twice. The app is served from
  // the site root, so the pathname is passed through unchanged.
  document.addEventListener("click", routeInternalLink);
  onCleanup(() => document.removeEventListener("click", routeInternalLink));

  createEffect(
    () => location.pathname,
    () => {
      // Chrome 152 returns a Promise from scrollTo(). Solid 2 treats an
      // effect return value as cleanup, so return nothing explicitly.
      window.scrollTo(0, 0);
    },
  );

  return (
    <BaseLayout header={MarketingHeader} class="min-h-screen">
      {props.children}
    </BaseLayout>
  );
};

const Routes = createRouter({
  routes: [
    {
      component: Layout,
      children: routes.map(({ path, component }) => ({ path, component })),
    },
  ],
});

export default function App() {
  return <Routes />;
}
