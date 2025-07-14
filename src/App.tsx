import { Route, Router } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { routes } from "./routes";

import { BaseLayout } from "./layouts/BaseLayout";
import { MarketingHeader } from "./components/layout/Header/MarketingHeader";

const Layout: ParentComponent = (props) => {
  return (
    <BaseLayout
      header={MarketingHeader}
      className="min-h-screen"
    >
      {props.children}
    </BaseLayout>
  );
};

export default function App() {
  return (
    <Router root={Layout}>
      {routes.map(({ path, component: Component }) => (
        <Route path={path} component={Component} />
      ))}
    </Router>
  );
}
