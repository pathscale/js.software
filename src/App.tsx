import { createRouter, useLocation } from "@solidjs/router";
import { ParentComponent, createEffect } from "solid-js";
import { routes } from "./routes";

import { BaseLayout } from "./layouts/BaseLayout";
import { MarketingHeader } from "./components/layout/Header/MarketingHeader";

const Layout: ParentComponent = (props) => {
  const location = useLocation();

  createEffect(
    () => location.pathname,
    () => window.scrollTo(0, 0),
  );

  return (
    <BaseLayout
      header={MarketingHeader}
      class="min-h-screen"
    >
      {props.children}
    </BaseLayout>
  );
};

/*
 * Routes are configuration, not JSX children.
 *
 * `@solidjs/router` 2.x replaced <Router>/<Route> with a factory: the tree is
 * declared once as plain objects and `createRouter` returns the provider
 * component. The old `root` prop becomes the outermost route's `component`.
 */
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
