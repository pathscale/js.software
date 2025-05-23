import ShowcaseLayout from "./ShowcaseLayout";

export default function SliderShowcase() {
  return (
    <ShowcaseLayout>
      <div class="p-6 rounded-lg shadow-sm bg-[hsl(var(--color-bg-primary)/1)]">
        <h2 class="text-xl font-semibold mb-4">Coming Soon</h2>
        <p class="text-[hsl(var(--color-fg-secondary)/1)]">
          This showcase will include:
        </p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-[hsl(var(--color-fg-secondary)/1)]">
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
