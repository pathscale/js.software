import { Route, Router } from "@solidjs/router";
import { Footer } from "./components/Footer";
import { routes } from "./routes";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div class="relative min-h-screen bg-base-100 text-base-content">
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
