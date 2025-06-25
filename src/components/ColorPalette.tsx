interface ColorPaletteProps {
  currentTheme: Record<string, string>;
}

export default function ColorPalette(props: ColorPaletteProps) {
  return (
    <div class="lg:border-base-content/5 mb-16 rounded-2xl lg:border lg:p-4">
      <div class="border-base-content/10 overflow-hidden rounded-lg border-[0.5px]">
        <div class="grid grid-cols-1">
          <div class="bg-primary text-primary-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Primary
            </div>
            <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
              {props.currentTheme["--color-primary"]}
            </div>
          </div>
          <div class="bg-secondary text-secondary-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Secondary
            </div>
            <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
              {props.currentTheme["--color-secondary"]}
            </div>
          </div>
          <div class="bg-accent text-accent-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Accent
            </div>
            <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
              {props.currentTheme["--color-accent"]}
            </div>
          </div>
          <div class="bg-neutral text-neutral-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Neutral
            </div>
            <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
              {props.currentTheme["--color-neutral"]}
            </div>
          </div>
        </div>
      </div>
      <div class="border-base-content/10 mt-4 overflow-hidden rounded-lg border-[0.5px]">
        <div class="grid xl:grid-cols-3">
          <div class="bg-base-100 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Base 100
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-base-100"]}
            </div>
          </div>
          <div class="bg-base-200 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Base 200
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-base-200"]}
            </div>
          </div>
          <div class="bg-base-300 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Base 300
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-base-300"]}
            </div>
          </div>
        </div>
      </div>
      <div class="border-base-content/10 mt-4 overflow-hidden rounded-lg border-[0.5px]">
        <div class="grid xl:grid-cols-4">
          <div class="bg-info text-info-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Info
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-info"]}
            </div>
          </div>
          <div class="bg-success text-success-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Success
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-success"]}
            </div>
          </div>
          <div class="bg-warning text-warning-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Warning
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-warning"]}
            </div>
          </div>
          <div class="bg-error text-error-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
            <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Error
            </div>
            <div class="truncate font-mono text-[0.625rem] tabular-nums">
              {props.currentTheme["--color-error"]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}