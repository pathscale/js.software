import { createSignal, type Component } from "solid-js";

export function createActionStatus(initial = "Ready") {
  const [message, setMessage] = createSignal(initial);
  let sequence = 0;

  const announce = (next: string) => {
    sequence += 1;
    setMessage(`${next} · action ${sequence}`);
  };

  return {
    message,
    announce,
    handler: (next: string) => () => announce(next),
  };
}

export const ActionStatus: Component<{ message: string }> = (props) => (
  <p
    role="status"
    aria-live="polite"
    class="mt-3 min-h-6 text-sm text-base-content/70"
  >
    {props.message}
  </p>
);
