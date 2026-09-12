import { createRouter, useLocation } from "@solidjs/router";
import { ParentComponent, createEffect } from "solid-js";
import { routes } from "./routes";

import { MarketingHeader } from "./components/layout/Header/MarketingHeader";
import { BaseLayout } from "./layouts/BaseLayout";

const Layout: ParentComponent = (props) => {
  const location = useLocation();

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
