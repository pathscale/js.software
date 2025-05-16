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
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="py-2 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Prop
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Type
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Default
            </th>
            <th class="py-2 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.props.map((prop) => (
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="py-2 px-3 align-top">
                <code class="text-sm font-mono font-medium text-gray-900 dark:text-gray-100">
                  {prop.name}
                  {prop.required && (
                    <span class="text-red-500 dark:text-red-400">*</span>
                  )}
                </code>
              </td>
              <td class="py-2 px-3 align-top">
                <code class="text-sm font-mono text-blue-600 dark:text-blue-400">
                  {prop.type}
                </code>
              </td>
              <td class="py-2 px-3 align-top">
                {prop.default && (
                  <code class="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {prop.default}
                  </code>
                )}
              </td>
              <td class="py-2 px-3 text-sm text-gray-700 dark:text-gray-300 align-top">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
