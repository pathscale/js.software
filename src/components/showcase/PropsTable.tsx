import { For } from "solid-js";

interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable(props: PropsTableProps) {
  return (
    <div class="overflow-x-auto">
      <table class="w-full text-left w-full text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.props}>
            {(p) => (
              <tr>
                <td class="font-mono">
                  {p.name}
                  {p.required ? <span class="text-error"> *</span> : null}
                </td>
                <td class="font-mono text-xs">{p.type}</td>
                <td class="font-mono text-xs">{p.default ?? "-"}</td>
                <td>{p.description ?? ""}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
