import { Router, Route } from "@solidjs/router";
import { routes } from "./routes";
import Sidebar from "./Sidebar";
import { Footer } from "./components/Footer";

const Layout = (props) => {
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
