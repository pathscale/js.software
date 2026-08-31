import { Button, createForm, Flex, Form, FormField, FormSubmitButton, Grid, Input, Label } from "@pathscale/ui";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { z } from "zod";

export default function FormShowcase() {
  const sections = [
    { id: "basic", title: "Basic Form" },
    { id: "inline", title: "Inline Form" },
    { id: "grid", title: "Two-Column Layout" },
    { id: "validation", title: "Validated Form" },
    { id: "props", title: "Props" },
  ];

  const formProps = [
    { name: "class", type: "string", description: "Custom classes" },
    { name: "class", type: "string", description: "Extra classes, merged into the root. There is no className." },
    { name: "dataTheme", type: "string", description: "Theme identifier" },
    { name: "children", type: "JSX.Element", description: "Form content" },
    {
      name: "form",
      type: "FormApi (from createForm())",
      description: "When provided, switches to context mode: registers the form for FormField/FormSubmitButton",
    },
  ];

  const labelProps = [
    { name: "for", type: "string", description: "Associated input id" },
    { name: "htmlFor", type: "string", description: "Alias for for" },
    { name: "required", type: "boolean", description: "Marks the label as required." },
    { name: "state", type: "State", description: 'Pass state="disabled". One axis, so it cannot disagree with itself.' },
    { name: "issues", type: "Issue[]", description: "Validity is derived from the issues, not asserted." },
    { name: "class", type: "string", description: "Custom classes" },
    { name: "children", type: "JSX.Element", description: "Label content" },
  ];

  const validationSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
  });

  const validatedForm = createForm({
    defaultValues: { username: "", email: "" },
    schema: validationSchema,
    onSubmit: (value) => {
      console.log("Submitted:", value);
    },
  });

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-base-content/60 hover:text-primary transition-colors"
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
                  <Label for="basic-email">Email</Label>
                  <Input
                    id="basic-email"
                    type="email"
                    placeholder="Enter your email"
                    class="w-full"
                  />
                </Flex>
                <Flex direction="col" gap="sm">
                  <Label for="basic-password">Password</Label>
                  <Input
                    id="basic-password"
                    type="password"
                    placeholder="Enter your password"
                    class="w-full"
                  />
                </Flex>
                <Button flavor="primary" class="w-full" type="submit">
                  Submit
                </Button>
              </Flex>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Flex direction="col" gap="md">
    <Flex direction="col" gap="sm">
      <Label for="email">Email</Label>
      <Input id="email" type="email" class="w-full" />
    </Flex>
    <Flex direction="col" gap="sm">
      <Label for="password">Password</Label>
      <Input id="password" type="password" class="w-full" />
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
                <Flex direction="col" gap="sm" class="w-full component-preview">
                  <Label for="inline-email">Email</Label>
                  <Input
                    id="inline-email"
                    type="email"
                    placeholder="email"
                    class="w-full"
                  />
                </Flex>
                <Button type="submit" flavor="primary">
                  Subscribe
                </Button>
              </Flex>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Flex direction="row" gap="md" align="end">
    <Flex direction="col" gap="sm" class="w-full component-preview">
      <Label for="email">Email</Label>
      <Input id="email" type="email" class="w-full" />
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
                  <Label for="grid-first">First Name</Label>
                  <Input id="grid-first" type="text" class="w-full" />
                </Flex>
                <Flex direction="col" gap="sm">
                  <Label for="grid-last">Last Name</Label>
                  <Input id="grid-last" type="text" class="w-full" />
                </Flex>
                <Flex direction="col" gap="sm" class="col-span-2">
                  <Label for="grid-email">Email</Label>
                  <Input id="grid-email" type="email" class="w-full" />
                </Flex>
                <Flex direction="col" gap="sm" class="col-span-2">
                  <Label for="grid-phone">Phone</Label>
                  <Input id="grid-phone" type="tel" class="w-full" />
                </Flex>
              </Grid>
              <Button type="submit" flavor="primary" class="w-full">
                Continue
              </Button>
            </Form>

            <CodeBlock
              code={`<Form class="...">
  <Grid cols="2" gap="md">
    <Flex direction="col" gap="sm">
      <Label for="first">First Name</Label>
      <Input id="first" class="w-full" />
    </Flex>
    ...
  </Grid>
  <Button class="w-full">Continue</Button>
</Form>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="validation" title="Validated Form (createForm + Zod)">
          <Flex direction="col" gap="md">
            <Form
              form={validatedForm}
              class="bg-base-100 p-6 rounded-lg shadow-md max-w-md w-full mx-auto space-y-4"
            >
              <FormField name="username" label="Username" />
              <FormField
                name="email"
                label="Email"
                inputProps={{ type: "email" }}
              />
              <FormSubmitButton class="w-full" flavor="primary">
                Submit
              </FormSubmitButton>
            </Form>

            <CodeBlock
              code={`const form = createForm({
  defaultValues: { username: "", email: "" },
  schema: z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
  }),
  onSubmit: (value) => {
    console.log("Submitted:", value);
  },
});

<Form form={form} class="space-y-4">
  <FormField name="username" label="Username" />
  <FormField name="email" label="Email" inputProps={{ type: "email" }} />
  <FormSubmitButton class="w-full">Submit</FormSubmitButton>
</Form>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <Flex direction="col" gap="md">
            <h3 class="text-lg font-semibold">Form</h3>
            <PropsTable props={formProps} />

            <h3 class="text-lg font-semibold mt-4">Label</h3>
            <PropsTable props={labelProps} />
          </Flex>
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
