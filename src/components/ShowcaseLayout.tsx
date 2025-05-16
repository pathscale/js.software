import { useLocation } from "@solidjs/router";
import { routes } from "../routes";
import type { JSX, ParentComponent } from "solid-js";
import { onMount } from "solid-js";

interface ShowcaseLayoutProps {
  children: JSX.Element;
}

const ShowcaseLayout: ParentComponent = (props) => {
  const location = useLocation();
  const current = () => routes.find((r) => r.path === location.pathname);

  onMount(() => {
    // Handle initial hash scroll
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  return (
    <main class="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div class="mx-auto max-w-5xl">
        <div class="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 class="text-3xl font-bold mb-2">{current()?.name}</h1>
            <p class="text-gray-600 dark:text-gray-400">
              {current()?.description}
            </p>
          </div>
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default ShowcaseLayout;
