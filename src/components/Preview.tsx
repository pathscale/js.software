import { createSignal } from "solid-js";

interface PreviewProps {
  currentTheme: Record<string, string>;
}

export default function Preview(props: PreviewProps) {
  const [previewtabs, setPreviewtabs] = createSignal("Components Demo");
  const [sliderValue, setSliderValue] = createSignal(50);

  return (
    <div
      class={`text-base-content pt-6 transition-colors duration-500 ${
        previewtabs() === "Components Demo" ? "bg-base-200" : "bg-base-100"
      }`}
    >
      <div class="flex items-center justify-between gap-4 px-8 ps-10">
        <h2 class="font-title text-lg md:max-lg:hidden">{previewtabs()}</h2>
        <div class="tabs tabs-box tabs-sm bg-base-300 inline-flex">
          <label class="tab" title="Components Demo">
            <input
              aria-label="Components Demo"
              name="previewtabs"
              type="radio"
              value="Components Demo"
              checked={previewtabs() === "Components Demo"}
              onChange={() => setPreviewtabs("Components Demo")}
            />
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </g>
            </svg>
          </label>
          <label class="tab" title="Component Variants">
            <input
              aria-label="Component Variants"
              name="previewtabs"
              type="radio"
              value="Component Variants"
              checked={previewtabs() === "Component Variants"}
              onChange={() => setPreviewtabs("Component Variants")}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 6l5.5 0"></path>
                <path d="M4 10l5.5 0"></path>
                <path d="M4 14l5.5 0"></path>
                <path d="M4 18l5.5 0"></path>
                <path d="M14.5 6l5.5 0"></path>
                <path d="M14.5 10l5.5 0"></path>
                <path d="M14.5 14l5.5 0"></path>
                <path d="M14.5 18l5.5 0"></path>
              </g>
            </svg>
          </label>
          <label class="tab" title="Color Palette">
            <input
              aria-label="Color Palette"
              name="previewtabs"
              type="radio"
              value="Color Palette"
              checked={previewtabs() === "Color Palette"}
              onChange={() => setPreviewtabs("Color Palette")}
            />
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"></path>
                <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"></path>
                <path d="M 7 17h.01"></path>
                <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"></path>
              </g>
            </svg>
          </label>
        </div>
      </div>
      <div class="px-8 py-6">
        {previewtabs() === "Components Demo" && (
          <div class="text-base-content mx-auto grid gap-6 pb-20 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <div class="flex flex-col gap-4">

              {/* Registration form */}
              <div class="card bg-base-100 card-border border-base-300 card-sm">
                <div class="card-body gap-4">
                  <h2 class="font-semibold">Register</h2>
                  <div class="flex flex-col gap-1">
                    <label class="input input-border flex max-w-none items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input type="text" class="grow" placeholder="Username" />
                    </label>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="input input-border flex max-w-none items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
                        <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
                      </svg>
                      <input type="password" class="grow" placeholder="password" />
                    </label>
                    <span class="text-base-content/60 flex items-center gap-2 px-1 text-[0.6875rem]">
                      <span class="status status-error inline-block"></span>
                      Password must be 8+ characters
                    </span>
                  </div>
                  <label class="text-base-content/60 flex items-center gap-2 text-xs">
                    <input type="checkbox" class="toggle toggle-xs" />
                    Accept terms without reading
                  </label>
                  <label class="text-base-content/60 flex items-center gap-2 text-xs">
                    <input type="checkbox" class="toggle toggle-xs" />
                    Subscribe to spam emails
                  </label>
                  <div class="card-actions items-center gap-6">
                    <button class="btn btn-primary">Register</button>
                    <button class="link">Or login</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              {/* Chart */}
              <div class="card bg-base-100 card-border border-base-300 card-sm">
                <div class="card-body gap-4">
                  <div class="*:bg-base-content mt-4 flex h-24 items-end gap-2 *:w-full *:rounded-sm">
                    <div style="height: 10%"></div>
                    <div style="height: 20%"></div>
                    <div style="height: 10%"></div>
                    <div style="height: 25%"></div>
                    <div style="height: 22%"></div>
                    <div style="height: 15%"></div>
                    <div style="height: 20%"></div>
                    <div style="height: 35%"></div>
                    <div style="height: 40%"></div>
                    <div style="height: 45%"></div>
                    <div style="height: 30%"></div>
                    <div style="height: 35%"></div>
                    <div style="height: 60%"></div>
                    <div style="height: 65%"></div>
                    <div style="height: 80%"></div>
                    <div style="height: 90%"></div>
                  </div>
                  <p class="py-3 text-xs">
                    Sales volume reached $12,450 this week, showing a 15% increase from the previous period.
                  </p>
                  <div class="grid grid-cols-2 gap-2">
                    <button class="btn">Charts</button>
                    <button class="btn btn-neutral">Details</button>
                  </div>
                </div>
              </div>

              {/* Stat */}
              <div class="card bg-base-100 card-border border-base-300 w-full">
                <div class="stats bg-base-100 w-full overflow-hidden shadow-[0_.1rem_.5rem_-.3rem_#0003]">
                  <div class="stat">
                    <div class="stat-figure">
                      <div class="radial-progress" style="--value:91;--size:3rem;" role="progressbar">
                        91
                      </div>
                    </div>
                    <div class="stat-title">Page Score</div>
                    <div class="stat-value">91<span class="text-sm">/100</span></div>
                    <div class="stat-desc flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="text-success size-4">
                        <path fill-rule="evenodd" d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z" clip-rule="evenodd" />
                      </svg>
                      All good
                    </div>
                  </div>
                </div>
              </div>

              {/* Button showcase */}
              <div class="card bg-base-100 card-border border-base-300 card-sm">
                <div class="card-body gap-4">
                  <h2 class="font-semibold">Buttons</h2>
                  <div class="flex flex-wrap gap-2">
                    <button class="btn btn-primary">Primary</button>
                    <button class="btn btn-secondary">Secondary</button>
                    <button class="btn btn-accent">Accent</button>
                    <button class="btn btn-info">Info</button>
                    <button class="btn btn-success">Success</button>
                    <button class="btn btn-warning">Warning</button>
                    <button class="btn btn-error">Error</button>
                    <button class="btn btn-ghost">Ghost</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              {/* Alerts */}
              <div class="card bg-base-100 card-border border-base-300 card-sm">
                <div class="card-body gap-4">
                  <h2 class="font-semibold">Alerts</h2>
                  <div class="alert alert-info text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    There are 9 new messages
                  </div>
                  <div class="alert alert-success text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    Verification process completed
                  </div>
                  <div class="alert alert-warning text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                    <span><span class="link">Click</span> to verify your email</span>
                  </div>
                  <div class="alert alert-error text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Access denied
                    <button class="btn btn-xs btn-ghost">Support</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {previewtabs() === "Component Variants" && (
          <div class="space-y-6">
            <h5 class="mt-10 px-3 py-2 font-semibold">Buttons</h5>
            <div class="my-6 flex flex-wrap gap-3">
              <button class="btn">Button</button>
              <button class="btn btn-primary">Primary</button>
              <button class="btn btn-secondary">Secondary</button>
              <button class="btn btn-accent">Accent</button>
              <button class="btn btn-info">Info</button>
              <button class="btn btn-success">Success</button>
              <button class="btn btn-warning">Warning</button>
              <button class="btn btn-error">Error</button>
              <button class="btn btn-ghost">Ghost</button>
            </div>
            
            <h5 class="mt-10 px-3 py-2 font-semibold">Inputs</h5>
            <div class="my-6 flex flex-wrap gap-3">
              <input type="text" placeholder="Input" class="input input-bordered max-w-32" />
              <input type="text" placeholder="Primary" class="input input-bordered input-primary max-w-32" />
              <input type="text" placeholder="Secondary" class="input input-bordered input-secondary max-w-32" />
              <input type="text" placeholder="Accent" class="input input-bordered input-accent max-w-32" />
              <input type="text" placeholder="Info" class="input input-bordered input-info max-w-32" />
              <input type="text" placeholder="Success" class="input input-bordered input-success max-w-32" />
              <input type="text" placeholder="Warning" class="input input-bordered input-warning max-w-32" />
              <input type="text" placeholder="Error" class="input input-bordered input-error max-w-32" />
            </div>
          </div>
        )}

        {previewtabs() === "Color Palette" && (
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
        )}
      </div>
    </div>
  );
}