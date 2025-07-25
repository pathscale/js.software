import { createSignal } from "solid-js";
import {
  Button,
  Card,
  Alert,
  Input,
  Flex,
  Checkbox,
  Badge,
  Avatar,
  Stats,
  Progress,
  RadialProgress,
  Rating,
  Menu,
  Tabs,
  Toggle,
  Range,
  ChatBubble,
  CodeMockup,
  CodeMockupLine,
  Timeline,
  TimelineItem,
  TimelineStart,
  TimelineMiddle,
  TimelineEnd,
  Table,
  Navbar,
  Breadcrumbs,
  BreadcrumbsItem,
  Collapse,
  Drawer,
  Modal,
  Pagination,
  Steps,
  Tooltip,
  Select,
  Dropdown,
  Loading,
  Skeleton,
  Form,
  Join,
  Divider,
  Indicator,
  Swap,
  Radio,
  Icon,
} from "@pathscale/ui";
import { ROUTES } from "../config/routes";

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = createSignal(false);

  return (
    <div class="text-base-content mx-auto grid gap-6 pb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Flex direction="col" gap="md">
        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex justify="between" align="center">
              <Flex align="center" gap="sm">
                <Icon name="icon-[mdi-light--filter-variant]" width={16} height={16} />
                <span class="font-semibold">Filters</span>
              </Flex>
              <Button variant="link" size="xs">
                more
              </Button>
            </Flex>
            <Flex gap="sm" class="mt-3 flex-wrap">
              <Badge color="primary">Shoes</Badge>
              <Badge color="secondary">Bags</Badge>
            </Flex>
            <Flex direction="col" gap="sm" class="mt-4">
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox size="sm" />
                  <span class="text-sm">Hoodies</span>
                </Flex>
                <Badge size="sm" variant="outline">
                  25
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox size="sm" checked />
                  <span class="text-sm">Bags</span>
                </Flex>
                <Badge size="sm" variant="outline" color="primary">
                  3
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox size="sm" />
                  <span class="text-sm">Shoes</span>
                </Flex>
                <Badge size="sm" variant="outline">
                  12
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Checkbox size="sm" />
                  <span class="text-sm">Accessories</span>
                </Flex>
                <Badge size="sm" variant="outline">
                  4
                </Badge>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-3">
              <Icon name="icon-[mdi-light--calendar]" width={16} height={16} />
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
                <Button size="xs" variant="outline" class="p-2">
                  1
                </Button>
                <Button size="xs" variant="outline" class="p-2">
                  2
                </Button>
                <Button size="xs" variant="outline" class="p-2">
                  3
                </Button>
                <Button size="xs" variant="outline" class="p-2">
                  4
                </Button>
                <Button size="xs" color="primary" class="p-2">
                  5
                </Button>
                <Button size="xs" variant="outline" class="p-2">
                  6
                </Button>
                <Button size="xs" variant="outline" class="p-2">
                  7
                </Button>
              </Flex>
              <Input
                placeholder="Search events..."
                leftIcon={<Icon name="icon-[mdi-light--magnify]" width={16} height={16} />}
                size="sm"
              />
              <Flex justify="between" align="center">
                <span class="text-sm">Show all day events</span>
                <Toggle size="sm" />
              </Flex>
              <Card size="sm" class="mt-2">
                <Card.Body class="p-2">
                  <Flex justify="between" align="center">
                    <span class="text-sm font-medium">Team meeting</span>
                    <Badge size="xs" color="info">
                      2h
                    </Badge>
                  </Flex>
                </Card.Body>
              </Card>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Tabs>
              <Tabs.Tab active>Tab 1</Tabs.Tab>
              <Tabs.Tab>Tab 2</Tabs.Tab>
              <Tabs.Tab>Tab 3</Tabs.Tab>
            </Tabs>
            <div class="mt-4 p-4 bg-base-200 rounded">
              <p class="text-sm">
                Content for tab 1. This is where the tab content would be
                displayed.
              </p>
            </div>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-2">
              <Icon name="icon-[mdi-light--currency-usd]" width={16} height={16} />
              <span class="font-semibold">Price Range</span>
            </Flex>
            <Range
              min={0}
              max={100}
              value={25}
              color="primary"
              size="sm"
              step={25}
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
              <Button size="sm" color="primary" fullWidth>
                Apply
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Stats>
              <Stats.Stat>
                <Stats.Stat.Figure>
                  <RadialProgress value={91} size="3rem" color="primary">
                    91
                  </RadialProgress>
                </Stats.Stat.Figure>
                <Stats.Stat.Title>Page Score</Stats.Stat.Title>
                <Stats.Stat.Value>
                  91<span class="text-sm">/100</span>
                </Stats.Stat.Value>
                <Stats.Stat.Desc>
                  <Flex align="center" gap="sm">
                    <Icon name="icon-[mdi-light--shield-check]" width={16} height={16} class="text-success" />
                    All good
                  </Flex>
                </Stats.Stat.Desc>
              </Stats.Stat>
            </Stats>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1234</span>
                <Badge color="info" size="sm">
                  Sent
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1235</span>
                <Badge color="error" size="sm">
                  Failed
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1236</span>
                <Badge color="warning" size="sm">
                  In progress
                </Badge>
              </Flex>
              <Flex justify="between" align="center">
                <span class="text-sm">Order #1237</span>
                <Badge color="success" size="sm">
                  Completed
                </Badge>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-2">
              <span class="text-sm font-medium">Monthly Revenue</span>
              <Icon name="icon-[mdi-light--trending-up]" width={16} height={16} class="text-success" />
            </Flex>
            <Flex direction="col">
              <span class="text-2xl font-bold">$12,450</span>
              <span class="text-xs opacity-60">+15% from last month</span>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex align="center" gap="sm">
                <Loading size="sm" />
                <span class="text-sm">Processing...</span>
              </Flex>
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-4 w-1/2" />
              <Button size="sm" loading>
                Submitting
              </Button>
            </Flex>
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction="col" gap="md">
        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex align="center" gap="sm" class="mb-3">
              <Avatar size="sm" color="primary" shape="circle">
                <Icon name="icon-[mdi-light--package-variant]" width={16} height={16} />
              </Avatar>
              <Flex direction="col">
                <span class="font-medium text-sm">Premium Product</span>
                <span class="text-xs opacity-60">In Stock</span>
              </Flex>
            </Flex>
            <Progress value={75} color="primary" />
            <Flex justify="between" align="center" class="mt-2">
              <span class="text-xs">75% sold</span>
              <span class="font-bold text-primary">$99.99</span>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Alert
                status="info"
                icon={<Icon name="icon-[mdi-light--information]" width={20} height={20} />}
              >
                <span class="text-xs">New software update available</span>
              </Alert>
              <Alert
                status="success"
                variant="outline"
                icon={<Icon name="icon-[mdi-light--check-circle]" width={20} height={20} />}
              >
                <span class="text-xs">Verification completed</span>
              </Alert>
              <Alert
                status="warning"
                variant="dash"
                icon={<Icon name="icon-[mdi-light--alert]" width={20} height={20} />}
              >
                <span class="text-xs">
                  <Button variant="link" size="xs" class="p-0 h-auto">
                    Click
                  </Button>{" "}
                  to verify email
                </span>
              </Alert>
              <Alert
                status="error"
                variant="soft"
                icon={<Icon name="icon-[mdi-light--close-circle]" width={20} height={20} />}
              >
                <Flex justify="between" align="center" class="w-full">
                  <span class="text-xs">Access denied</span>
                  <Button color="ghost" size="xs">
                    Support
                  </Button>
                </Flex>
              </Alert>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Timeline vertical class="mt-3">
              <TimelineItem connect="both">
                <TimelineStart box>9:00</TimelineStart>
                <TimelineMiddle class="text-success">
                  <Icon name="icon-[mdi-light--check-circle]" width={16} height={16} />
                </TimelineMiddle>
                <TimelineEnd>
                  <Flex direction="col">
                    <span class="text-sm font-medium">Project Started</span>
                    <span class="text-xs opacity-60">
                      Initial setup completed
                    </span>
                  </Flex>
                </TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="both">
                <TimelineStart box>11:00</TimelineStart>
                <TimelineMiddle class="text-success">
                  <Icon name="icon-[mdi-light--check-circle]" width={16} height={16} />
                </TimelineMiddle>
                <TimelineEnd>
                  <Flex direction="col">
                    <span class="text-sm font-medium">Development Phase</span>
                    <span class="text-xs opacity-60">
                      Core features implemented
                    </span>
                  </Flex>
                </TimelineEnd>
              </TimelineItem>
              <TimelineItem connect="start">
                <TimelineStart box>15:00</TimelineStart>
                <TimelineMiddle class="text-warning">
                  <Icon name="icon-[mdi-light--clock-outline]" width={16} height={16} />
                </TimelineMiddle>
                <TimelineEnd>
                  <Flex direction="col">
                    <span class="text-sm font-medium">Testing Phase</span>
                    <span class="text-xs opacity-60">In progress...</span>
                  </Flex>
                </TimelineEnd>
              </TimelineItem>
            </Timeline>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Tabs>
              <Tabs.Tab active>Monthly</Tabs.Tab>
              <Tabs.Tab>
                Yearly
                <Badge size="xs" color="error" class="ml-1">
                  SALE
                </Badge>
              </Tabs.Tab>
            </Tabs>
            <Flex direction="col" class="mt-4">
              <Flex class="text-3xl font-bold">
                $9<span class="text-sm font-normal">/month</span>
              </Flex>
              <Flex direction="col" gap="sm" class="mt-3">
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--check]" width={16} height={16} class="text-success" />
                  <span class="text-sm">Unlimited projects</span>
                </Flex>
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--check]" width={16} height={16} class="text-success" />
                  <span class="text-sm">Priority support</span>
                </Flex>
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--close]" width={16} height={16} class="text-error" />
                  <span class="text-sm opacity-50">Advanced analytics</span>
                </Flex>
              </Flex>
              <Button color="primary" fullWidth class="mt-4">
                Choose Plan
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <div class="overflow-x-auto">
              <Table size="sm">
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Flex align="center" gap="sm">
                        <Avatar size="xs" letters="JD" color="primary" />
                        <span class="text-sm">John Doe</span>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge size="sm" color="primary">
                        Admin
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge size="sm" color="success">
                        Active
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Flex align="center" gap="sm">
                        <Avatar size="xs" letters="JS" color="secondary" />
                        <span class="text-sm">Jane Smith</span>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge size="sm" color="secondary">
                        Editor
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge size="sm" color="warning">
                        Away
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Button size="sm" onClick={() => setModalOpen(true)}>
                Open Dialog
              </Button>
              <Modal
                open={modalOpen()}
                onClose={() => setModalOpen(false)}
                backdrop
                position="middle"
                closeOnEsc
                closeOnOutsideClick
              >
                <Modal.Header class="font-bold">Confirmation</Modal.Header>
                <Modal.Body>Are you sure you want to continue?</Modal.Body>
                <Modal.Actions>
                  <Flex gap="sm" class="mt-2">
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button color="primary" onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </Flex>
                </Modal.Actions>
              </Modal>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex align="center" gap="sm">
                <Tooltip message="Click to expand" position="top">
                  <Button size="sm" variant="outline">
                    Hover me
                  </Button>
                </Tooltip>
                <Indicator>
                  <Badge size="xs" color="error" class="indicator-item">
                    3
                  </Badge>
                  <Button size="sm" variant="outline" shape="circle">
                    <Icon name="icon-[mdi-light--bell]" width={16} height={16} />
                  </Button>
                </Indicator>
              </Flex>
              <Flex gap="sm">
                <Swap onElement={<div>☀️</div>} offElement={<div>🌙</div>} />
                <span class="text-sm">Theme Toggle</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction="col" gap="md">
        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <ChatBubble>
                <ChatBubble.Header>
                  John Doe
                  <ChatBubble.Time>12:45</ChatBubble.Time>
                </ChatBubble.Header>
                <ChatBubble.Avatar>
                  <Avatar size="xs" letters="JD" color="primary" />
                </ChatBubble.Avatar>
                <ChatBubble.Message>Hey! How are you doing?</ChatBubble.Message>
              </ChatBubble>
              <ChatBubble end>
                <ChatBubble.Header>
                  You
                  <ChatBubble.Time>12:46</ChatBubble.Time>
                </ChatBubble.Header>
                <ChatBubble.Avatar>
                  <Avatar size="xs" letters="ME" color="accent" />
                </ChatBubble.Avatar>
                <ChatBubble.Message color="primary">
                  I'm doing great! Thanks for asking.
                </ChatBubble.Message>
              </ChatBubble>
            </Flex>
            <Flex gap="sm" class="mt-4 justify-center">
              <Button size="sm" variant="outline" shape="circle">
                <Icon name="icon-[mdi-light--phone]" width={16} height={16} />
              </Button>
              <Button size="sm" variant="outline" shape="circle">
                <Icon name="icon-[mdi-light--message]" width={16} height={16} />
              </Button>
              <Button size="sm" variant="outline" shape="circle">
                <Icon name="icon-[mdi-light--cog]" width={16} height={16} />
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Menu>
              <Menu.Item>
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon name="icon-[mdi-light--database]" width={16} height={16} />
                    <span>Database</span>
                  </Flex>
                  <Badge size="xs" color="primary">
                    2
                  </Badge>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon name="icon-[mdi-light--package-variant]" width={16} height={16} />
                    <span>Products</span>
                  </Flex>
                  <Badge size="xs" color="success">
                    12
                  </Badge>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex justify="between" align="center" class="w-full">
                  <Flex align="center" gap="sm">
                    <Icon name="icon-[mdi-light--message-text]" width={16} height={16} />
                    <span>Messages</span>
                  </Flex>
                  <Badge size="xs" color="warning">
                    5
                  </Badge>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--key]" width={16} height={16} />
                  <span>Access Tokens</span>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--account-group]" width={16} height={16} />
                  <span>Users</span>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex align="center" gap="sm">
                  <Icon name="icon-[mdi-light--cog]" width={16} height={16} />
                  <span>Settings</span>
                </Flex>
              </Menu.Item>
            </Menu>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Flex justify="between" align="center">
                <Flex align="center" gap="sm">
                  <Button size="sm" shape="circle">
                    <Icon name="icon-[mdi-light--skip-previous]" width={16} height={16} />
                  </Button>
                  <Button size="sm" shape="circle" color="primary">
                    <Icon name="icon-[mdi-light--play]" width={16} height={16} />
                  </Button>
                  <Button size="sm" shape="circle">
                    <Icon name="icon-[mdi-light--skip-next]" width={16} height={16} />
                  </Button>
                </Flex>
                <Button size="sm" variant="outline">
                  <Icon name="icon-[mdi-light--volume-high]" width={16} height={16} />
                </Button>
              </Flex>
              <Flex direction="col">
                <span class="font-medium text-sm">Song Title</span>
                <span class="text-xs opacity-60">Artist Name</span>
              </Flex>
              <Progress value={45} class="mt-2" />
              <Flex justify="between" class="text-xs opacity-60">
                <span>2:34</span>
                <span>5:55</span>
              </Flex>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body class="p-0">
            <CodeMockup>
              <CodeMockupLine prefix="$">npm install daisyui</CodeMockupLine>
              <CodeMockupLine prefix=">">installing...</CodeMockupLine>
              <CodeMockupLine prefix=">">Done!</CodeMockupLine>
            </CodeMockup>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body class="p-0">
            <Navbar class="bg-base-200 px-4">
              <Navbar.Start>
                <Dropdown>
                  <Button color="ghost" shape="circle" size="sm">
                    <Icon name="icon-[mdi-light--menu]" width={16} height={16} />
                  </Button>
                  <Dropdown.Menu class="w-52 menu-sm mt-3 z-[1]">
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
                <Button color="ghost" shape="circle" size="sm">
                  <Icon name="icon-[mdi-light--account]" width={16} height={16} />
                </Button>
              </Navbar.End>
            </Navbar>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Steps vertical>
              <Steps.Step color="primary">Account Created</Steps.Step>
              <Steps.Step color="primary">Email Verified</Steps.Step>
              <Steps.Step color="warning">Profile Setup</Steps.Step>
              <Steps.Step>Payment Added</Steps.Step>
            </Steps>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Join>
                <Button class="join-item" size="sm">
                  Button 1
                </Button>
                <Button class="join-item" size="sm" active>
                  Button 2
                </Button>
                <Button class="join-item" size="sm">
                  Button 3
                </Button>
              </Join>
              <Join>
                <Input
                  placeholder="Search..."
                  class="join-item flex-1"
                  size="sm"
                />
                <Button class="join-item" size="sm" color="primary">
                  <Icon name="icon-[mdi-light--magnify]" width={16} height={16} />
                </Button>
              </Join>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Flex direction="col" gap="sm">
              <Form>
                <Form.Label title="How did you hear about us?" />
                <Select class="w-full" size="sm">
                  <option>Search Engine</option>
                  <option>Social Media</option>
                  <option>Friend</option>
                  <option>Advertisement</option>
                </Select>
              </Form>
              <Form>
                <Form.Label title="Rate your experience" />
                <Rating value={4} />
              </Form>
              <Flex gap="sm" class="mt-2">
                <Radio size="sm" name="recommend" checked />
                <span class="text-sm">Would recommend</span>
              </Flex>
              <Button size="sm" color="primary">
                Submit
              </Button>
            </Flex>
          </Card.Body>
        </Card>

        <Card size="sm" class="bg-base-100">
          <Card.Body>
            <Breadcrumbs>
              <BreadcrumbsItem href={ROUTES.HOME}>Home</BreadcrumbsItem>
              <BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
              <BreadcrumbsItem>Details</BreadcrumbsItem>
            </Breadcrumbs>
            <Divider />
            <Pagination>
              <Button size="xs" class="join-item">
                1
              </Button>
              <Button size="xs" class="join-item" active>
                2
              </Button>
              <Button size="xs" class="join-item">
                3
              </Button>
            </Pagination>
          </Card.Body>
        </Card>
      </Flex>
    </div>
  );
}
