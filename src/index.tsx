// Applies `data-theme` on the document. Imported for the effect: nothing
// else mounted it, so the site was rendering with no theme attribute at all
// and falling through to whatever `:root` happened to declare.
import "./lib/theme";
/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";

import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <App />, root!);
