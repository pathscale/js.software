import { useLocation } from "@solidjs/router";
import { routes } from "../routes";
import type { JSX } from "solid-js";

interface ShowcaseLayoutProps {
  children: JSX.Element;
}

export default function ShowcaseLayout(props: ShowcaseLayoutProps) {
  const location = useLocation();
  const current = () => routes.find((r) => r.path === location.pathname);

  return (
    <div class="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{current()?.name}</h1>
        <p class="text-gray-600 dark:text-gray-400">{current()?.description}</p>
      </div>
      {props.children}
    </div>
  );
}
