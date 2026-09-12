import { createSignal } from "solid-js";
import { Alert, Avatar, Breadcrumb, BreadcrumbItem, Button, Card, ChatBubble, Checkbox, Chip, Dialog, Drawer, Dropdown, Flex, Form, Icon, Input, Navbar, Pagination, Progress, Radio, Select, Skeleton, Slider, Spinner, Switch, Table, Tabs, Tooltip, TooltipContent, TooltipTrigger } from "@pathscale/ui";
import { Menu, Join } from "@pathscale/ui/lab";
import { ROUTES } from "../config/routes";

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [page, setPage] = createSignal(2);
  const [price, setPrice] = createSignal(25);

  return (
    <div class="text-base-content mx-auto grid gap-6 pb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Flex direction="col" gap="md">
        <Card class="bg-base-100">
          <Card.Body>
            <Flex justify="between" align="center">
              <Flex align="center" gap="sm">
                <Icon src="mdi--filter-variant" width={16} height={16} />
                <span class="font-semibold">Filters</span>
              </Flex>
              <Button variant="ghost" size="sm">
                more
              </Button>
            </Flex>
            <Flex gap="sm" class="mt-3 flex-wrap">
              <Chip>Shoes</Chip>
              <Chip>Bags</Chip>
            </Flex>
            <Flex direction="col" gap="sm" class="mt-4">
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox />
                  <span class="text-sm">Hoodies</span>
                </Flex>
                <Chip size="sm" variant="flat">
                  25
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox checked />
                  <span class="text-sm">Bags</span>
                </Flex>
                <Chip size="sm" variant="flat">
                  3
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox />
                  <span class="text-sm">Shoes</span>
                </Flex>
                <Chip size="sm" variant="flat">
                  12
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox />
                  <span class="text-sm">Accessories</span>
                </Flex>
                <Chip size="sm" variant="flat">
                  4
                </Chip>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-3">
              <Icon src="mdi--calendar" width={16} height={16} />
              <span class="font-semibold">Calendar</span>
            </Flex>
            <Flex direction="col" gap="md">
              <Flex class="grid grid-cols-7 gap-1 text-center text-xs">
                <Flex class="font-semibold opacity-60" justify="center">
                  M
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  T
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  W
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  T
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  F
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  S
                </Flex>
                <Flex class="font-semibold opacity-60" justify="center">
                  S
                </Flex>
                <Button size="sm" variant="outline" class="p-2">
                  1
                </Button>
                <Button size="sm" variant="outline" class="p-2">
                  2
                </Button>
                <Button size="sm" variant="outline" class="p-2">
                  3
                </Button>
                <Button size="sm" variant="outline" class="p-2">
                  4
                </Button>
                <Button size="sm" flavor="primary" class="p-2">
                  5
                </Button>
                <Button size="sm" variant="outline" class="p-2">
                  6
                </Button>
                <Button size="sm" variant="outline" class="p-2">
                  7
                </Button>
              </Flex>
              <Input
                placeholder="Search events..."
                startIcon={<Icon src="mdi--magnify" width={16} height={16} />}
                size="sm"
              />
              <Flex justify="between" align="center">
                <span class="text-sm">Show all day events</span>
                <Switch size="sm" />
              </Flex>
              <Card class="mt-2">
                <Card.Body class="p-2">
                  <Flex justify="between" align="center">
                    <span class="text-sm font-medium">Team meeting</span>
                    <Chip size="sm">
                      2h
                    </Chip>
                  </Flex>
                </Card.Body>
              </Card>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Tabs defaultSelectedKey="tab-1">
              <Tabs.List>
                <Tabs.Tab id="tab-1">Tab 1</Tabs.Tab>
                <Tabs.Tab id="tab-2">Tab 2</Tabs.Tab>
                <Tabs.Tab id="tab-3">Tab 3</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel id="tab-1">
                <div class="mt-4 p-4 bg-base-200 rounded">
                  <p class="text-sm">
                    Content for tab 1. This is where the tab content would be
                    displayed.
                  </p>
                </div>
              </Tabs.Panel>
            </Tabs>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-2">
              <Icon src="mdi--currency-usd" width={16} height={16} />
              <span class="font-semibold">Price Range</span>
            </Flex>
            <Slider
              label="Price range"
              value={price()}
              min={0}
              max={100}
              step={25}
              formatValue={(value) => `$${value}`}
              onChange={setPrice}
            />
            <Flex justify="between" class="w-full text-xs px-2">
              <span>$0</span>
              <span>$25</span>
              <span>$50</span>
              <span>$75</span>
              <span>$100</span>
            </Flex>
            <Flex direction="col" gap="sm" class="mt-4">
              <Flex justify="between" align="center">
                <Input placeholder="Min" size="sm" />
                <span class="text-sm opacity-60">to</span>
                <Input placeholder="Max" size="sm" />
              </Flex>
              <Button size="sm" flavor="primary" width="full">
                Apply
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <span class="text-sm opacity-60">Page Score</span>
              <span class="text-3xl font-bold">
                91<span class="text-sm">/100</span>
              </span>
              <Flex align="center" gap="sm">
                <Icon src="mdi--shield-check" width={16} height={16} class="text-success" />
                <span class="text-xs">All good</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1234</span>
                <Chip size="sm">
                  Sent
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1235</span>
                <Chip size="sm">
                  Failed
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1236</span>
                <Chip size="sm">
                  In progress
                </Chip>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1237</span>
                <Chip size="sm">
                  Completed
                </Chip>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-2">
              <span class="text-sm font-medium">Monthly Revenue</span>
              <Icon src="mdi--trending-up" width={16} height={16} class="text-success" />
            </Flex>
            <Flex direction="col">
              <span class="text-2xl font-bold">$12,450</span>
              <span class="text-xs opacity-60">+15% from last month</span>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex align="center" gap="sm">
                <Spinner size="sm" />
                <span class="text-sm">Processing...</span>
              </Flex>
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-4 w-1/2" />
              <Button size="sm" state="loading">
                Submitting
              </Button>
            </Flex>
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction="col" gap="md">
        <Card class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-3">
              <Avatar size="sm">
                <Icon src="mdi--package-variant" width={16} height={16} />
              </Avatar>
              <Flex direction="col">
                <span class="font-medium text-sm">Premium Product</span>
                <span class="text-xs opacity-60">In Stock</span>
              </Flex>
            </Flex>
            <Progress value={75} />
            <Flex justify="between" align="center" class="mt-2">
              <span class="text-xs">75% sold</span>
              <span class="font-bold text-primary">$99.99</span>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Alert flavor="neutral">
                <span class="text-xs">New software update available</span>
              </Alert>
              <Alert flavor="success">
                <span class="text-xs">Verification completed</span>
              </Alert>
              <Alert flavor="warning">
                <span class="text-xs">
                  <Button variant="ghost" size="sm" class="p-0 h-auto">
                    Click
                  </Button>{" "}
                  to verify email
                </span>
              </Alert>
              <Alert flavor="destructive">
                <Flex justify="between" align="center" class="w-full">
                  <span class="text-xs">Access denied</span>
                  <Button variant="ghost" size="sm">
                    Support
                  </Button>
                </Flex>
              </Alert>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm" class="mt-3">
              <Flex align="center" gap="sm">
                <Icon src="mdi--check-circle" width={16} height={16} class="text-success" />
                <Flex direction="col">
                  <span class="text-sm font-medium">9:00 — Project Started</span>
                  <span class="text-xs opacity-60">Initial setup completed</span>
                </Flex>
              </Flex>
              <Flex align="center" gap="sm">
                <Icon src="mdi--check-circle" width={16} height={16} class="text-success" />
                <Flex direction="col">
                  <span class="text-sm font-medium">11:00 — Development Phase</span>
                  <span class="text-xs opacity-60">Core features implemented</span>
                </Flex>
              </Flex>
              <Flex align="center" gap="sm">
                <Icon src="mdi--clock-outline" width={16} height={16} class="text-warning" />
                <Flex direction="col">
                  <span class="text-sm font-medium">15:00 — Testing Phase</span>
                  <span class="text-xs opacity-60">In progress...</span>
                </Flex>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Tabs defaultSelectedKey="monthly">
              <Tabs.List>
                <Tabs.Tab id="monthly">Monthly</Tabs.Tab>
                <Tabs.Tab id="yearly">
                  Yearly
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <Flex direction="col" class="mt-4">
              <Flex class="text-3xl font-bold">
                $9<span class="text-sm font-normal">/month</span>
              </Flex>
              <Flex direction="col" gap="sm" class="mt-3">
                <Flex align="center" gap="sm">
                  <Icon src="mdi--check" width={16} height={16} class="text-success" />
                  <span class="text-sm">Unlimited projects</span>
                </Flex>
                <Flex align="center" gap="sm">
                  <Icon src="mdi--check" width={16} height={16} class="text-success" />
                  <span class="text-sm">Priority support</span>
                </Flex>
                <Flex align="center" gap="sm">
                  <Icon src="mdi--close" width={16} height={16} class="text-error" />
                  <span class="text-sm opacity-50">Advanced analytics</span>
                </Flex>
              </Flex>
              <Button flavor="primary" width="full" class="mt-4">
                Choose Plan
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <div class="overflow-x-auto">
              <Table>
                <Table.Content>
                  <Table.Header>
                    <Table.Column id="name">Name</Table.Column>
                    <Table.Column id="role">Role</Table.Column>
                    <Table.Column id="status">Status</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Flex align="center" gap="sm">
                          <Avatar size="sm">
                            <span>JD</span>
                          </Avatar>
                          <span class="text-sm">John Doe</span>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm">
                          Admin
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm">
                          Active
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Flex align="center" gap="sm">
                          <Avatar size="sm">
                            <span>JS</span>
                          </Avatar>
                          <span class="text-sm">Jane Smith</span>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm">
                          Editor
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm">
                          Away
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Content>
              </Table>
            </div>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Button size="sm" onClick={() => setModalOpen(true)}>
                Open Dialog
              </Button>
              <Dialog
                open={modalOpen()}
                onOpenChange={setModalOpen}
                backdrop="opaque"
                placement="center"
                shouldCloseOnEsc
                shouldCloseOnBackdropClick
              >
                <Dialog.Content>
                  <Dialog.Header class="font-bold">Confirmation</Dialog.Header>
                  <Dialog.Body>Are you sure you want to continue?</Dialog.Body>
                  <Dialog.Footer>
                    <Flex gap="sm" class="mt-2">
                      <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button flavor="primary" onClick={() => setModalOpen(false)}>
                        Confirm
                      </Button>
                    </Flex>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex align="center" gap="sm">
                <Tooltip>
                  <TooltipTrigger>
                    <Button size="sm" variant="outline">
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Click to expand</TooltipContent>
                </Tooltip>
                <Flex align="center" gap="sm">
                  <Chip size="sm">
                    3
                  </Chip>
                  <Button size="sm" variant="outline" width="square">
                    <Icon src="mdi--bell" width={16} height={16} />
                  </Button>
                </Flex>
              </Flex>
              <Flex gap="sm">
                <Switch />
                <span class="text-sm">Theme Switch</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction="col" gap="md">
        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <ChatBubble>
                <ChatBubble.Header>
                  John Doe
                  <ChatBubble.Time>12:45</ChatBubble.Time>
                </ChatBubble.Header>
                <ChatBubble.Avatar fallback="JD" size="sm" />
                <ChatBubble.Message>Hey! How are you doing?</ChatBubble.Message>
              </ChatBubble>
              <ChatBubble end>
                <ChatBubble.Header>
                  You
                  <ChatBubble.Time>12:46</ChatBubble.Time>
                </ChatBubble.Header>
                <ChatBubble.Avatar fallback="ME" size="sm" />
                <ChatBubble.Message flavor="primary">
                  I'm doing great! Thanks for asking.
                </ChatBubble.Message>
              </ChatBubble>
            </Flex>
            <Flex gap="sm" class="mt-4 justify-center">
              <Button size="sm" variant="outline" width="square">
                <Icon src="mdi--phone" width={16} height={16} />
              </Button>
              <Button size="sm" variant="outline" width="square">
                <Icon src="mdi--message" width={16} height={16} />
              </Button>
              <Button size="sm" variant="outline" width="square">
                <Icon src="mdi--cog" width={16} height={16} />
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Menu>
              <Menu.Item id="database">
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon src="mdi--database" width={16} height={16} />
                    <span>Database</span>
                  </Flex>
                  <Chip size="sm">
                    2
                  </Chip>
                </Flex>
              </Menu.Item>
              <Menu.Item id="products">
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon src="mdi--package-variant" width={16} height={16} />
                    <span>Products</span>
                  </Flex>
                  <Chip size="sm">
                    12
                  </Chip>
                </Flex>
              </Menu.Item>
              <Menu.Item id="messages">
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon src="mdi--message-text" width={16} height={16} />
                    <span>Messages</span>
                  </Flex>
                  <Chip size="sm">
                    5
                  </Chip>
                </Flex>
              </Menu.Item>
              <Menu.Item id="tokens">
                <Flex align="center" gap="sm">
                  <Icon src="mdi--key" width={16} height={16} />
                  <span>Access Tokens</span>
                </Flex>
              </Menu.Item>
              <Menu.Item id="users">
                <Flex align="center" gap="sm">
                  <Icon src="mdi--account-group" width={16} height={16} />
                  <span>Users</span>
                </Flex>
              </Menu.Item>
              <Menu.Item id="settings">
                <Flex align="center" gap="sm">
                  <Icon src="mdi--cog" width={16} height={16} />
                  <span>Settings</span>
                </Flex>
              </Menu.Item>
            </Menu>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Button size="sm" width="square">
                    <Icon src="mdi--skip-previous" width={16} height={16} />
                  </Button>
                  <Button size="sm" width="square" flavor="primary">
                    <Icon src="mdi--play" width={16} height={16} />
                  </Button>
                  <Button size="sm" width="square">
                    <Icon src="mdi--skip-next" width={16} height={16} />
                  </Button>
                </Flex>
                <Button size="sm" variant="outline">
                  <Icon src="mdi--volume-high" width={16} height={16} />
                </Button>
              </Flex>
              <Flex direction="col">
                <span class="font-medium text-sm">Song Title</span>
                <span class="text-xs opacity-60">Artist Name</span>
              </Flex>
              <Progress value={45} />
              <Flex justify="between" class="text-xs opacity-60">
                <span>2:34</span>
                <span>5:55</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body class="p-0">
            <pre class="bg-base-200 p-4 text-xs font-mono rounded">
              <code>{`$ bun add @pathscale/ui\n> installing...\n> Done!`}</code>
            </pre>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body class="p-0">
            <Navbar class="bg-base-200 px-4">
              <Navbar.Start>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button variant="ghost" width="square" size="sm">
                      <Icon src="mdi--menu" width={16} height={16} />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu class="w-52 mt-3 z-[1]">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Start>
              <Navbar.Center>
                <span class="font-bold text-sm">Brand</span>
              </Navbar.Center>
              <Navbar.End>
                <Button variant="ghost" width="square" size="sm">
                  <Icon src="mdi--account" width={16} height={16} />
                </Button>
              </Navbar.End>
            </Navbar>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex align="center" gap="sm">
                <Icon src="mdi--check-circle" width={16} height={16} class="text-success" />
                <span class="text-sm">Account Created</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Icon src="mdi--check-circle" width={16} height={16} class="text-success" />
                <span class="text-sm">Email Verified</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Icon src="mdi--clock-outline" width={16} height={16} class="text-warning" />
                <span class="text-sm">Profile Setup</span>
              </Flex>
              <Flex align="center" gap="sm">
                <Icon src="mdi--circle-outline" width={16} height={16} class="opacity-60" />
                <span class="text-sm opacity-60">Payment Added</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Join>
                <Button size="sm">
                  Button 1
                </Button>
                <Button size="sm" flavor="primary">
                  Button 2
                </Button>
                <Button size="sm">
                  Button 3
                </Button>
              </Join>
              <Join>
                <Input
                  placeholder="Search..."
                  class="flex-1"
                  size="sm"
                />
                <Button size="sm" flavor="primary">
                  <Icon src="mdi--magnify" width={16} height={16} />
                </Button>
              </Join>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Form>
                <span class="text-sm font-medium">How did you hear about us?</span>
                <Select placeholder="Select an option">
                  <Select.Option value="search">Search Engine</Select.Option>
                  <Select.Option value="social">Social Media</Select.Option>
                  <Select.Option value="friend">Friend</Select.Option>
                  <Select.Option value="ad">Advertisement</Select.Option>
                </Select>
              </Form>
              <Form>
                <span class="text-sm font-medium">Rate your experience</span>
                <Flex gap="sm">
                  <Icon src="mdi--star" width={16} height={16} class="text-warning" />
                  <Icon src="mdi--star" width={16} height={16} class="text-warning" />
                  <Icon src="mdi--star" width={16} height={16} class="text-warning" />
                  <Icon src="mdi--star" width={16} height={16} class="text-warning" />
                  <Icon src="mdi--star-outline" width={16} height={16} />
                </Flex>
              </Form>
              <Flex gap="sm" class="mt-2">
                <Radio name="recommend" checked />
                <span class="text-sm">Would recommend</span>
              </Flex>
              <Button size="sm" flavor="primary">
                Submit
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card class="bg-base-100">
          <Card.Body>
            <Breadcrumb>
              <BreadcrumbItem href={ROUTES.HOME}>Home</BreadcrumbItem>
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Details</BreadcrumbItem>
            </Breadcrumb>
            <div class="my-3 border-t opacity-20" />
            <Pagination page={page()} total={3} onChange={setPage} />
          </Card.Body>
        </Card>
      </Flex>
    </div>
  );
}
