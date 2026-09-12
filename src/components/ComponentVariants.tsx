import { Button, Card, Flex, Input } from "@pathscale/ui";
import { ActionStatus, createActionStatus } from "./showcase/ActionStatus";

export default function ComponentVariants() {
  const actionStatus = createActionStatus("Choose a button variant");
  const variants = [
    ["Button", {}],
    ["Primary", { flavor: "primary" }],
    ["Secondary", { flavor: "secondary" }],
    ["Accent", { flavor: "accent" }],
    ["Outline", { variant: "outline" }],
    ["Ghost", { variant: "ghost" }],
    ["Danger", { flavor: "destructive" }],
    ["Danger Soft", { flavor: "destructive", variant: "soft" }],
  ] as const;

  return (
    <Flex direction="col" gap="lg">
      <ActionStatus message={actionStatus.message()} />
      <Card class="bg-base-100">
        <Card.Body>
          <h5 class="text-lg font-semibold mb-2">Buttons</h5>
          <Flex gap="sm" class="flex-wrap">
            {variants.map(([label, props]) => (
              <Button
                {...props}
                onClick={actionStatus.handler(`${label} variant activated`)}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Card.Body>
      </Card>

      <Card class="bg-base-100">
        <Card.Body>
          <h5 class="text-lg font-semibold mb-2">Inputs</h5>
          <Flex gap="sm" class="flex-wrap">
            <Input placeholder="Input" class="max-w-32" />
            <Input placeholder="Invalid" state="invalid" class="max-w-32" />
            <Input placeholder="Disabled" state="disabled" class="max-w-32" />
            <Input placeholder="Small" size="sm" class="max-w-32" />
            <Input placeholder="Medium" size="md" class="max-w-32" />
            <Input placeholder="Large" size="lg" class="max-w-32" />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  );
}
