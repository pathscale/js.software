import { Route, Router } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { useLocation } from "@solidjs/router";
import { routes } from "./routes";

// Import all the layout components I created
import { BaseLayout } from "./layouts/BaseLayout";
import { MarketingHeader } from "./components/layout/Header/MarketingHeader";
import { SideNavigation } from "./components/layout/Navigation/SideNavigation";
import { OnThisPage } from "./components/layout/Navigation/OnThisPage";

// Layout wrapper that uses ALL the components I built
const Layout: ParentComponent = (props) => {
  const location = useLocation();
  const isHomePage = () => location.pathname === "/";
  
  return (
    <BaseLayout
      header={MarketingHeader}
      sidebar={isHomePage() ? undefined : SideNavigation}
      toc={isHomePage() ? undefined : OnThisPage}
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
