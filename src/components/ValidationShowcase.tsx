import ShowcaseLayout from "./ShowcaseLayout";

export default function ValidationShowcase() {
  return (
    <ShowcaseLayout>
      <div class="p-6 bg-[hsl(var(--color-bg-surface)/1)] rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Coming Soon</h2>
        <p class="text-[hsl(var(--color-fg-muted)/1)]">
          This showcase will include:
        </p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-[hsl(var(--color-fg-muted)/1)]">
          <li>Multiple variants</li>
          <li>Size options</li>
          <li>Color schemes</li>
          <li>Interactive states (hover, focus, disabled, etc.)</li>
          <li>Usage examples</li>
          <li>API documentation</li>
        </ul>
      </div>
    </ShowcaseLayout>
  );
}
