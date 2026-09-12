import { useLocation } from "@solidjs/router";
import { routes } from "../routes";
import type { JSX } from "@solidjs/web";
import type { ParentComponent } from "solid-js";
import { Flex, Link } from "@pathscale/ui";
import { ROUTES } from "../config/routes";

interface ShowcaseLayoutProps {
  children: JSX.Element;
}

const ShowcaseLayout: ParentComponent = (props) => {
  const location = useLocation();
  const current = () => routes.find((r) => r.path === location.pathname);

  const jumpToSection: JSX.EventHandler<HTMLElement, MouseEvent> = (event) => {
    const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]');
    if (!anchor) return;

    event.preventDefault();
    const sectionId = anchor.getAttribute("href")?.slice(1);
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    }
  };

  return (
    <main
      class="min-h-screen w-full p-4 md:p-6 lg:p-8"
      onClick={jumpToSection}
    >
      <div class="mx-auto max-w-5xl">
        <Flex direction="col" gap="lg" class="max-w-4xl mx-auto">
          <div>
            <Link
              id="showcase-all-components"
              href={ROUTES.SHOWCASES}
              underline="hover"
              class="mb-3"
            >
              All components
            </Link>
            <h1 class="text-3xl font-bold mb-2">{current()?.name}</h1>
            <p class="text-base-content/70">
              {current()?.description}
            </p>
          </div>
          {props.children}
        </Flex>
      </div>
    </main>
  );
};

export default ShowcaseLayout;
