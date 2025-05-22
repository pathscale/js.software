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
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-[hsl(var(--color-border, var(--color-fg-body))/0.15)]">
            <th class="py-2 px-3 text-sm font-semibold text-[hsl(var(--color-fg-body)/1)]">
              Prop
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-[hsl(var(--color-fg-body)/1)]">
              Type
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-[hsl(var(--color-fg-body)/1)]">
              Default
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-[hsl(var(--color-fg-body)/1)]">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.props.map((prop) => (
            <tr class="border-b border-[hsl(var(--color-border, var(--color-fg-body))/0.15)] hover:bg-[hsl(var(--color-bg-secondary)/0.25)]">
              <td class="py-2 px-3 align-top">
                <code class="text-sm font-mono font-medium text-[hsl(var(--color-fg-body)/1)]">
                  {prop.name}
                  {prop.required && (
                    <span class="text-[hsl(var(--color-destructive, 0 100% 50%)/1)]">
                      *
                    </span>
                  )}
                </code>
              </td>
              <td class="py-2 px-3 align-top">
                <code class="text-sm font-mono text-[hsl(var(--tw-color-primary)/1)]">
                  {prop.type}
                </code>
              </td>
              <td class="py-2 px-3 align-top">
                {prop.default && (
                  <code class="text-sm font-mono text-[hsl(var(--color-fg-secondary)/1)]">
                    {prop.default}
                  </code>
                )}
              </td>
              <td class="py-2 px-3 text-sm text-[hsl(var(--color-fg-secondary)/1)] align-top">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
