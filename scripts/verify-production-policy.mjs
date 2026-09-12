const targetUrl = process.env.PRODUCTION_POLICY_URL || "https://js.software/theming";

const response = await fetch(targetUrl, {
  redirect: "follow",
  headers: { Accept: "text/html" },
});

if (!response.ok) {
  throw new Error(`Production policy check failed for ${targetUrl}: HTTP ${response.status}`);
}

const policy = response.headers.get("content-security-policy");
const html = await response.text();
const stylesheetUrls = [...html.matchAll(/<link\b[^>]*\brel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)]
  .map(([tag]) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
  .filter(Boolean)
  .map((href) => new URL(href, response.url).href);
const stylesheetBodies = await Promise.all(
  stylesheetUrls.map(async (url) => {
    const stylesheet = await fetch(url, { redirect: "follow" });
    if (!stylesheet.ok) {
      throw new Error(`Production stylesheet check failed for ${url}: HTTP ${stylesheet.status}`);
    }
    return stylesheet.text();
  }),
);
const productionSource = [html, ...stylesheetBodies].join("\n");

if (/fonts\.(googleapis|gstatic)\.com/i.test(productionSource)) {
  throw new Error("Production HTML or CSS still loads Google Fonts.");
}

if (!policy) {
  console.log(
    `Production policy has no enforced CSP and no Google Fonts source: ${targetUrl}`,
  );
  process.exit(0);
}

const directives = new Map(
  policy
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, ...sources] = entry.split(/\s+/);
      return [name.toLowerCase(), sources];
    }),
);

const allSources = [...directives.values()].flat();
const googleFontSources = allSources.filter((source) =>
  /(^|\.)fonts\.(googleapis|gstatic)\.com$/i.test(
    source.replace(/^https?:\/\//, ""),
  ),
);

if (googleFontSources.length > 0) {
  throw new Error(
    `Production CSP still allows Google Fonts: ${googleFontSources.join(", ")}`,
  );
}

const styleAttributeSources =
  directives.get("style-src-attr") ??
  directives.get("style-src") ??
  directives.get("default-src") ??
  [];

if (!styleAttributeSources.includes("'unsafe-inline'")) {
  throw new Error(
    "Production CSP blocks the dynamic style attributes used by UI sliders and the theme preview.",
  );
}

const styleElementSources =
  directives.get("style-src-elem") ??
  directives.get("style-src") ??
  directives.get("default-src") ??
  [];

if (!styleElementSources.includes("'unsafe-inline'")) {
  throw new Error(
    "Production CSP blocks the style elements used by the UI runtime.",
  );
}

console.log(
  `Production policy accepts runtime theme styles and has no Google Fonts source: ${targetUrl}`,
);
