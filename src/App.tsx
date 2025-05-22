import { Router, Route } from "@solidjs/router";
import { routes } from "./routes";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div class="min-h-screen bg-[hsl(var(--color-bg-body)/1)] text-[hsl(var(--color-fg-body)/1)] transition-colors duration-300">
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
