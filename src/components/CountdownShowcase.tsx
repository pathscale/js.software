import ShowcaseLayout from "./ShowcaseLayout";
import { Countdown } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { createSignal, createEffect, onCleanup } from "solid-js";

export default function CountdownShowcase() {
  const sections = [
    { id: "default", title: "Default" },
    { id: "clock", title: "Clock" },
    { id: "with-labels", title: "With Labels" },
    { id: "with-boxes", title: "With Boxes" },
    { id: "props", title: "Props" },
  ] as const;

  const countdownProps = [
    {
      name: "value",
      type: "number",
      description: "The countdown value",
      required: true,
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
  ];

  const [defaultValue, setDefaultValue] = createSignal(50);
  const [clockValue, setClockValue] = createSignal(34);
  const [labelsValue, setLabelsValue] = createSignal(37);
  const [boxesValue, setBoxesValue] = createSignal(26);

  // Default timer
  createEffect(() => {
    const timer = setInterval(() => {
      setDefaultValue((v) => (v <= 0 ? 50 : v - 1));
    }, 1000);

    onCleanup(() => clearInterval(timer));
  });

  // Clock timer
  createEffect(() => {
    const timer = setInterval(() => {
      setClockValue((v) => (v <= 0 ? 34 : v - 1));
    }, 1000);

    onCleanup(() => clearInterval(timer));
  });

  // Labels timer
  createEffect(() => {
    const timer = setInterval(() => {
      setLabelsValue((v) => (v <= 0 ? 37 : v - 1));
    }, 1000);

    onCleanup(() => clearInterval(timer));
  });

  // Boxes timer
  createEffect(() => {
    const timer = setInterval(() => {
      setBoxesValue((v) => (v <= 0 ? 26 : v - 1));
    }, 1000);

    onCleanup(() => clearInterval(timer));
  });

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Countdown class="text-2xl" value={defaultValue()} />
          <CodeBlock code={`<Countdown class="text-2xl" value={50} />`} />
        </ShowcaseSection>

        <ShowcaseSection id="clock" title="Clock">
          <span class="font-mono text-2xl">
            <Countdown value={10} />:
            <Countdown value={24} />:
            <Countdown value={clockValue()} />
          </span>
          <CodeBlock
            code={`<span class="font-mono text-2xl">
  <Countdown value={10} />:
  <Countdown value={24} />:
  <Countdown value={34} />
</span>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-labels" title="With Labels">
          <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col">
              <Countdown class="font-mono text-5xl" value={15} />
              days
            </div>
            <div class="flex flex-col">
              <Countdown class="font-mono text-5xl" value={10} />
              hours
            </div>
            <div class="flex flex-col">
              <Countdown class="font-mono text-5xl" value={24} />
              min
            </div>
            <div class="flex flex-col">
              <Countdown class="font-mono text-5xl" value={labelsValue()} />
              sec
            </div>
          </div>
          <CodeBlock
            code={`<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div class="flex flex-col">
    <Countdown class="font-mono text-5xl" value={15} />
    days
  </div>
  <div class="flex flex-col">
    <Countdown class="font-mono text-5xl" value={10} />
    hours
  </div>
  <div class="flex flex-col">
    <Countdown class="font-mono text-5xl" value={24} />
    min
  </div>
  <div class="flex flex-col">
    <Countdown class="font-mono text-5xl" value={37} />
    sec
  </div>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="with-boxes" title="With Boxes">
          <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <Countdown class="font-mono text-5xl" value={15} />
              days
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <Countdown class="font-mono text-5xl" value={10} />
              hours
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <Countdown class="font-mono text-5xl" value={24} />
              min
            </div>
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <Countdown class="font-mono text-5xl" value={boxesValue()} />
              sec
            </div>
          </div>
          <CodeBlock
            code={`<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <Countdown class="font-mono text-5xl" value={15} />
    days
  </div>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <Countdown class="font-mono text-5xl" value={10} />
    hours
  </div>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <Countdown class="font-mono text-5xl" value={24} />
    min
  </div>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <Countdown class="font-mono text-5xl" value={26} />
    sec
  </div>
</div>`}
          />
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={countdownProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
