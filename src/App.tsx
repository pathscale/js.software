import { Route, Router } from "@solidjs/router";
import { onMount } from "solid-js";
import { Footer } from "./components/Footer";
import { onThemeChange } from "./lib/theme";
import {
  bgBody,
  bgCode,
  bgSecondary,
  fgBody,
  fgSecondary,
  primary,
  primaryFg,
} from "./lib/theme-colors";
import { routes } from "./routes";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const applyThemeVars = () => {
    document.documentElement.style.setProperty("--color-bg-body", bgBody());
    document.documentElement.style.setProperty("--color-fg-body", fgBody());
    document.documentElement.style.setProperty(
      "--color-bg-secondary",
      bgSecondary()
    );
    document.documentElement.style.setProperty(
      "--color-fg-secondary",
      fgSecondary()
    );
    document.documentElement.style.setProperty("--color-bg-code", bgCode());
    document.documentElement.style.setProperty("--tw-color-primary", primary());
    document.documentElement.style.setProperty(
      "--tw-color-primary-foreground",
      primaryFg()
    );
  };

  onMount(() => {
    applyThemeVars();
    onThemeChange(applyThemeVars);
  });

  return (
    <div class="relative min-h-screen bg-[hsl(var(--color-bg-body)/1)] text-[hsl(var(--color-fg-body)/1)]">
      <Sidebar />
      <main class="lg:ml-64 min-h-screen">
        <div class="container mx-auto px-4 py-6 sm:py-8">{props.children}</div>
      </main>
      <Footer />
    </div>
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
