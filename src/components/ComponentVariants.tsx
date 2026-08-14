import { Button, Card, Input, Flex } from "@pathscale/ui";

export default function ComponentVariants() {
  return (
    <Flex direction="col" gap="lg">
      <Card class="bg-base-100">
        <Card.Body>
          <h5 class="text-lg font-semibold mb-2">Buttons</h5>
          <Flex gap="sm" class="flex-wrap">
            <Button>Button</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-soft">Danger Soft</Button>
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
