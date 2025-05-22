import { Router, Route } from "@solidjs/router";
import { routes } from "./routes";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div class="min-h-screen text-gray-900 dark:text-gray-100 bg-[hsl(var(--color-bg)/1)] transition-colors duration-300">
      <Sidebar />
      <main class="lg:ml-64 min-h-screen">
        <div class="container mx-auto px-4 py-8">{props.children}</div>
      </main>
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
