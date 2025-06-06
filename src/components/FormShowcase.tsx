import {
  Form,
  Input,
  Button,
  Flex,
  Grid,
  useFormValidation,
} from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { Show } from "solid-js";
import { z } from "zod";

export default function FormShowcase() {
  const sections = [
    { id: "basic", title: "Basic Form" },
    { id: "inline", title: "Inline Form" },
    { id: "grid", title: "Two-Column Layout" },
    { id: "validation", title: "With Validation Styles" },
    { id: "props", title: "Props" },
  ];

  const formProps = [
    { name: "class", type: "string", description: "Custom classes" },
    { name: "className", type: "string", description: "Alias for class" },
    { name: "dataTheme", type: "string", description: "Theme identifier" },
    { name: "children", type: "JSX.Element", description: "Form content" },
  ];

  const labelProps = [
    { name: "title", type: "string", description: "Text label" },
    { name: "class", type: "string", description: "Custom classes" },
    { name: "className", type: "string", description: "Alias for class" },
    { name: "dataTheme", type: "string", description: "Theme identifier" },
    { name: "children", type: "JSX.Element", description: "Input/control" },
  ];

  function UsernameField() {
    const { errors, touched } = useFormValidation();
    return (
      <Flex direction="col" gap="sm">
        <Form.Label title="Username" />
        <Input name="username" class="input-bordered w-full" />
        <Show when={touched("username") && errors("username")}>
          <span class="text-error text-sm">{errors("username")}</span>
        </Show>
      </Flex>
    );
  }

  function EmailField() {
    const { errors, touched } = useFormValidation();
    return (
      <Flex direction="col" gap="sm">
        <Form.Label title="Email" />
        <Input name="email" type="email" class="input-bordered w-full" />
        <Show when={touched("email") && errors("email")}>
          <span class="text-error text-sm">{errors("email")}</span>
        </Show>
      </Flex>
    );
  }

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
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

        <ShowcaseSection id="basic" title="Basic Form">
          <Flex direction="col" gap="md">
            <Form class="bg-base-100 p-6 rounded-lg shadow-md max-w-md w-full mx-auto">
              <Flex direction="col" gap="md">
                <Flex direction="col" gap="sm">
                  <Form.Label title="Email" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    class="input-bordered w-full"
                  />
                </Flex>
                <Flex direction="col" gap="sm">
                  <Form.Label title="Password" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    class="input-bordered w-full"
                  />
                </Flex>
                <Button color="primary" class="w-full" type="submit">
                  Submit
                </Button>
              </Flex>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Flex direction="col" gap="md">
    <Flex direction="col" gap="sm">
      <Form.Label title="Email" />
      <Input type="email" class="input-bordered w-full" />
    </Flex>
    <Flex direction="col" gap="sm">
      <Form.Label title="Password" />
      <Input type="password" class="input-bordered w-full" />
    </Flex>
    <Button class="w-full">Submit</Button>
  </Flex>
</Form>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="inline" title="Inline Form">
          <Flex direction="col" gap="md">
            <Form class="bg-base-100 p-4 rounded-md shadow-md w-full max-w-xl mx-auto">
              <Flex direction="row" gap="md" align="end">
                <Flex direction="col" gap="sm" class="w-full">
                  <Form.Label title="Email" />
                  <Input
                    type="email"
                    placeholder="email"
                    class="input-bordered w-full"
                  />
                </Flex>
                <Button type="submit" color="primary">
                  Subscribe
                </Button>
              </Flex>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Flex direction="row" gap="md" align="end">
    <Flex direction="col" gap="sm" class="w-full">
      <Form.Label title="Email" />
      <Input type="email" class="input-bordered w-full" />
    </Flex>
    <Button>Subscribe</Button>
  </Flex>
</Form>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="grid" title="Two-Column Layout">
          <Flex direction="col" gap="md">
            <Form class="bg-base-100 p-6 rounded-lg shadow-md max-w-2xl w-full mx-auto space-y-4">
              <Grid cols="2" gap="md">
                <Flex direction="col" gap="sm">
                  <Form.Label title="First Name" />
                  <Input type="text" class="input-bordered w-full" />
                </Flex>
                <Flex direction="col" gap="sm">
                  <Form.Label title="Last Name" />
                  <Input type="text" class="input-bordered w-full" />
                </Flex>
                <Flex direction="col" gap="sm" class="col-span-2">
                  <Form.Label title="Email" />
                  <Input type="email" class="input-bordered w-full" />
                </Flex>
                <Flex direction="col" gap="sm" class="col-span-2">
                  <Form.Label title="Phone" />
                  <Input type="tel" class="input-bordered w-full" />
                </Flex>
              </Grid>
              <Button type="submit" color="primary" class="w-full">
                Continue
              </Button>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Grid cols="2" gap="md">
    <Flex direction="col" gap="sm">
      <Form.Label title="First Name" />
      <Input class="input-bordered w-full" />
    </Flex>
    <Flex direction="col" gap="sm">
      <Form.Label title="Last Name" />
      <Input class="input-bordered w-full" />
    </Flex>
    <Flex direction="col" gap="sm" class="col-span-2">
      <Form.Label title="Email" />
      <Input class="input-bordered w-full" />
    </Flex>
    <Flex direction="col" gap="sm" class="col-span-2">
      <Form.Label title="Phone" />
      <Input class="input-bordered w-full" />
    </Flex>
  </Grid>
  <Button class="w-full">Continue</Button>
</Form>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="validation"
          title="Validated Form using Felte and Zod"
        >
          <Flex direction="col" gap="md">
            <Form.Validated
              class="bg-base-100 p-6 rounded-lg shadow-md max-w-md w-full mx-auto space-y-4"
              schema={z.object({
                username: z.string().min(1, "Username is required"),
                email: z.string().email("Invalid email"),
              })}
              onSubmit={(values) => {
                console.log("Submitted:", values);
              }}
            >
              <UsernameField />
              <EmailField />
              <Button type="submit" class="w-full" color="primary">
                Submit
              </Button>
            </Form.Validated>

            <CodeBlock
              code={`<Form.Validated
  schema={z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
  })}
  class="bg-base-100 p-6 rounded-lg shadow-md max-w-md w-full mx-auto space-y-4"
>
  <Flex direction="col" gap="sm">
    <Form.Label title="Username" />
    <Input name="username" class="input-bordered w-full" />
    <Show when={useFormValidation().touched("username") && useFormValidation().errors("username")}>
      <span class="text-error text-sm">
        {useFormValidation().errors("username")}
      </span>
    </Show>
  </Flex>

  <Flex direction="col" gap="sm">
    <Form.Label title="Email" />
    <Input name="email" type="email" class="input-bordered w-full" />
    <Show when={useFormValidation().touched("email") && useFormValidation().errors("email")}>
      <span class="text-error text-sm">
        {useFormValidation().errors("email")}
      </span>
    </Show>
  </Flex>

  <Button type="submit" class="w-full">
    Submit
  </Button>
</Form.Validated>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Form</h3>
            <PropsTable props={formProps} />

            <h3 class="text-lg font-semibold mt-4">Form.Label</h3>
            <PropsTable props={labelProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
