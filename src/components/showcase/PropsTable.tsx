import { PropsTable as UIPropsTable } from "@pathscale/ui";

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
    <UIPropsTable props={props.props} />
  );
}
