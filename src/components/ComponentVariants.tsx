import {
  Button,
  Card,
  Input,
  Flex,
} from "@pathscale/ui";

export default function ComponentVariants() {
  return (
    <Flex direction="col" gap="lg">
      <Card size="sm" class="bg-base-100">
        <Card.Body>
          <Card.Title tag="h5">Buttons</Card.Title>
          <Flex gap="sm" class="flex-wrap">
            <Button>Button</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="accent">Accent</Button>
            <Button color="info">Info</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
            <Button color="ghost">Ghost</Button>
          </Flex>
        </Card.Body>
      </Card>

      <Card size="sm" class="bg-base-100">
        <Card.Body>
          <Card.Title tag="h5">Inputs</Card.Title>
          <Flex gap="sm" class="flex-wrap">
            <Input placeholder="Input" class="max-w-32" />
            <Input
              placeholder="Primary"
              color="error"
              class="max-w-32"
            />
            <Input placeholder="Secondary" class="max-w-32" />
            <Input placeholder="Accent" class="max-w-32" />
            <Input placeholder="Info" class="max-w-32" />
            <Input
              placeholder="Success"
              color="success"
              class="max-w-32"
            />
            <Input
              placeholder="Warning"
              color="warning"
              class="max-w-32"
            />
            <Input placeholder="Error" color="error" class="max-w-32" />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  );
}