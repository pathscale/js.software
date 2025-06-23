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
  Textarea,
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
} from "@pathscale/ui";

interface PreviewProps {
  currentTheme: Record<string, string>;
}

export default function Preview(props: PreviewProps) {
  const [previewtabs, setPreviewtabs] = createSignal("Components Demo");

  return (
    <div
      class={`text-base-content pt-6 transition-colors duration-500 ${
        previewtabs() === "Components Demo" ? "bg-base-200" : "bg-base-100"
      }`}
    >
      <div class="flex items-center justify-between gap-4 px-8 ps-10">
        <h2 class="font-title text-lg md:max-lg:hidden">{previewtabs()}</h2>
        <div class="tabs tabs-box tabs-sm bg-base-300 inline-flex">
          <label class="tab" title="Components Demo">
            <input
              aria-label="Components Demo"
              name="previewtabs"
              type="radio"
              value="Components Demo"
              checked={previewtabs() === "Components Demo"}
              onChange={() => setPreviewtabs("Components Demo")}
            />
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </g>
            </svg>
          </label>
          <label class="tab" title="Component Variants">
            <input
              aria-label="Component Variants"
              name="previewtabs"
              type="radio"
              value="Component Variants"
              checked={previewtabs() === "Component Variants"}
              onChange={() => setPreviewtabs("Component Variants")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="size-4"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 6l5.5 0"></path>
                <path d="M4 10l5.5 0"></path>
                <path d="M4 14l5.5 0"></path>
                <path d="M4 18l5.5 0"></path>
                <path d="M14.5 6l5.5 0"></path>
                <path d="M14.5 10l5.5 0"></path>
                <path d="M14.5 14l5.5 0"></path>
                <path d="M14.5 18l5.5 0"></path>
              </g>
            </svg>
          </label>
          <label class="tab" title="Color Palette">
            <input
              aria-label="Color Palette"
              name="previewtabs"
              type="radio"
              value="Color Palette"
              checked={previewtabs() === "Color Palette"}
              onChange={() => setPreviewtabs("Color Palette")}
            />
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"></path>
                <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"></path>
                <path d="M 7 17h.01"></path>
                <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"></path>
              </g>
            </svg>
          </label>
        </div>
      </div>
      <div class="px-8 py-6">
        {previewtabs() === "Components Demo" && (
          <div class="text-base-content mx-auto grid gap-6 pb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Column 1 */}
            <Flex direction="col" gap="md">
              {/* Filters Card */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex justify="between" align="center">
                    <Flex align="center" gap="sm">
                      <i class="icon-[mdi--filter-variant] w-4 h-4" />
                      <span class="font-semibold">Filters</span>
                    </Flex>
                    <Button variant="link" size="xs">
                      more
                    </Button>
                  </Flex>
                  <Flex gap="sm" class="mt-3 flex-wrap">
                    <Badge color="primary">
                      Shoes
                      <Button variant="link" size="xs" class="ml-1 p-0 h-auto">
                        <i class="icon-[mdi--close] w-3 h-3" />
                      </Button>
                    </Badge>
                    <Badge color="secondary">
                      Bags
                      <Button variant="link" size="xs" class="ml-1 p-0 h-auto">
                        <i class="icon-[mdi--close] w-3 h-3" />
                      </Button>
                    </Badge>
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
                        <Checkbox size="sm" checked />
                        <span class="text-sm">Shoes</span>
                      </Flex>
                      <Badge size="sm" variant="outline">
                        0
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

              {/* Calendar Card */}
              <Card variant="border" size="sm">
                <Card.Body>
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
                      leftIcon={<i class="icon-[mdi--magnify] w-4 h-4" />}
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

              {/* Tabs Component */}
              <Card variant="border" size="sm">
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

              {/* Price Range Card */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex align="center" gap="sm" class="mb-2">
                    <i class="icon-[mdi--currency-usd] w-4 h-4" />
                    <span class="font-semibold">Price Range</span>
                  </Flex>
                  <Range
                    min={0}
                    max={100}
                    value="25"
                    class="range range-primary range-sm"
                    step="25"
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
                      <Input placeholder="Min" size="sm" class="max-w-20" />
                      <span class="text-sm opacity-60">to</span>
                      <Input placeholder="Max" size="sm" class="max-w-20" />
                    </Flex>
                    <Button size="sm" color="primary" fullWidth>
                      Apply
                    </Button>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Stats Component */}
              <Card variant="border" size="sm">
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
                          <i class="icon-[mdi--shield-check] text-success w-4 h-4" />
                          All good
                        </Flex>
                      </Stats.Stat.Desc>
                    </Stats.Stat>
                  </Stats>
                </Card.Body>
              </Card>

              {/* Recent Orders */}
              <Card variant="border" size="sm">
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

              {/* Revenue Stats */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex align="center" gap="sm" class="mb-2">
                    <span class="text-sm font-medium">Monthly Revenue</span>
                    <i class="icon-[mdi--trending-up] text-success w-4 h-4" />
                  </Flex>
                  <Flex direction="col">
                    <span class="text-2xl font-bold">$12,450</span>
                    <span class="text-xs opacity-60">+15% from last month</span>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Loading States */}
              <Card variant="border" size="sm">
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

            {/* Column 2 */}
            <Flex direction="col" gap="md">
              {/* Product Card */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex align="center" gap="sm" class="mb-3">
                    <Avatar
                      size="sm"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                    <Flex direction="col">
                      <span class="font-medium text-sm">Premium Product</span>
                      <span class="text-xs opacity-60">In Stock</span>
                    </Flex>
                  </Flex>
                  <Progress value={75} class="progress-primary" />
                  <Flex justify="between" align="center" class="mt-2">
                    <span class="text-xs">75% sold</span>
                    <span class="font-bold text-primary">$99.99</span>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Alerts */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex direction="col" gap="sm">
                    <Alert
                      status="info"
                      icon={<i class="icon-[mdi--information] w-5 h-5" />}
                    >
                      <span class="text-xs">New software update available</span>
                    </Alert>
                    <Alert
                      status="success"
                      variant="outline"
                      icon={<i class="icon-[mdi--check-circle] w-5 h-5" />}
                    >
                      <span class="text-xs">Verification completed</span>
                    </Alert>
                    <Alert
                      status="warning"
                      variant="dash"
                      icon={<i class="icon-[mdi--alert] w-5 h-5" />}
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
                      icon={<i class="icon-[mdi--close-circle] w-5 h-5" />}
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

              {/* Timeline */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Timeline vertical class="mt-3">
                    <TimelineItem connect="both">
                      <TimelineStart box>9:00</TimelineStart>
                      <TimelineMiddle class="text-success">
                        <i class="icon-[mdi--check-circle] w-4 h-4" />
                      </TimelineMiddle>
                      <TimelineEnd>
                        <Flex direction="col">
                          <span class="text-sm font-medium">
                            Project Started
                          </span>
                          <span class="text-xs opacity-60">
                            Initial setup completed
                          </span>
                        </Flex>
                      </TimelineEnd>
                    </TimelineItem>
                    <TimelineItem connect="both">
                      <TimelineStart box>11:00</TimelineStart>
                      <TimelineMiddle class="text-success">
                        <i class="icon-[mdi--check-circle] w-4 h-4" />
                      </TimelineMiddle>
                      <TimelineEnd>
                        <Flex direction="col">
                          <span class="text-sm font-medium">
                            Development Phase
                          </span>
                          <span class="text-xs opacity-60">
                            Core features implemented
                          </span>
                        </Flex>
                      </TimelineEnd>
                    </TimelineItem>
                    <TimelineItem connect="start">
                      <TimelineStart box>15:00</TimelineStart>
                      <TimelineMiddle class="text-warning">
                        <i class="icon-[mdi--clock-outline] w-4 h-4" />
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

              {/* Pricing Card */}
              <Card variant="border" size="sm">
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
                        <i class="icon-[mdi--check] text-success w-4 h-4" />
                        <span class="text-sm">Unlimited projects</span>
                      </Flex>
                      <Flex align="center" gap="sm">
                        <i class="icon-[mdi--check] text-success w-4 h-4" />
                        <span class="text-sm">Priority support</span>
                      </Flex>
                      <Flex align="center" gap="sm">
                        <i class="icon-[mdi--close] text-error w-4 h-4" />
                        <span class="text-sm opacity-50">
                          Advanced analytics
                        </span>
                      </Flex>
                    </Flex>
                    <Button color="primary" fullWidth class="mt-4">
                      Choose Plan
                    </Button>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Table Component */}
              <Card variant="border" size="sm">
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
                              <Avatar size="xs" src="" />
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
                              <Avatar size="xs" src="" />
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

              {/* Modal Example */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex direction="col" gap="sm">
                    {(() => {
                      const [modalOpen, setModalOpen] = createSignal(false);
                      return (
                        <>
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
                            <Modal.Header class="font-bold">
                              Confirmation
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to continue?
                            </Modal.Body>
                            <Modal.Actions>
                              <Button onClick={() => setModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => setModalOpen(false)}
                              >
                                Confirm
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </>
                      );
                    })()}
                  </Flex>
                </Card.Body>
              </Card>

              {/* Interactive Elements */}
              <Card variant="border" size="sm">
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
                          <i class="icon-[mdi--bell] w-4 h-4" />
                        </Button>
                      </Indicator>
                    </Flex>
                    <Flex gap="sm">
                      <Swap>
                        <div>☀️</div>
                        <div>🌙</div>
                      </Swap>
                      <span class="text-sm">Theme Toggle</span>
                    </Flex>
                  </Flex>
                </Card.Body>
              </Card>
            </Flex>

            {/* Column 3 */}
            <Flex direction="col" gap="md">
              {/* Chat */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex direction="col" gap="sm">
                    <ChatBubble>
                      <ChatBubble.Header>
                        John Doe
                        <ChatBubble.Time>12:45</ChatBubble.Time>
                      </ChatBubble.Header>
                      <ChatBubble.Avatar src="" />
                      <ChatBubble.Message>
                        Hey! How are you doing?
                      </ChatBubble.Message>
                    </ChatBubble>
                    <ChatBubble end>
                      <ChatBubble.Header>
                        You
                        <ChatBubble.Time>12:46</ChatBubble.Time>
                      </ChatBubble.Header>
                      <ChatBubble.Avatar src="" />
                      <ChatBubble.Message color="primary">
                        I'm doing great! Thanks for asking.
                      </ChatBubble.Message>
                    </ChatBubble>
                  </Flex>
                  <Flex gap="sm" class="mt-4 justify-center">
                    <Button size="sm" variant="outline" shape="circle">
                      <i class="icon-[mdi--phone] w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" shape="circle">
                      <i class="icon-[mdi--message] w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" shape="circle">
                      <i class="icon-[mdi--cog] w-4 h-4" />
                    </Button>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Admin Menu */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Menu>
                    <Menu.Item>
                      <Flex justify="between" align="center" class="w-full">
                        <Flex align="center" gap="sm">
                          <i class="icon-[mdi--database] w-4 h-4" />
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
                          <i class="icon-[mdi--package-variant] w-4 h-4" />
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
                          <i class="icon-[mdi--message-text] w-4 h-4" />
                          <span>Messages</span>
                        </Flex>
                        <Badge size="xs" color="warning">
                          5
                        </Badge>
                      </Flex>
                    </Menu.Item>
                    <Menu.Item>
                      <Flex align="center" gap="sm">
                        <i class="icon-[mdi--key] w-4 h-4" />
                        <span>Access Tokens</span>
                      </Flex>
                    </Menu.Item>
                    <Menu.Item>
                      <Flex align="center" gap="sm">
                        <i class="icon-[mdi--account-group] w-4 h-4" />
                        <span>Users</span>
                      </Flex>
                    </Menu.Item>
                    <Menu.Item>
                      <Flex align="center" gap="sm">
                        <i class="icon-[mdi--cog] w-4 h-4" />
                        <span>Settings</span>
                      </Flex>
                    </Menu.Item>
                  </Menu>
                </Card.Body>
              </Card>

              {/* Music Player */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Flex direction="col" gap="sm">
                    <Flex justify="between" align="center">
                      <Flex align="center" gap="sm">
                        <Button size="sm" shape="circle">
                          <i class="icon-[mdi--skip-previous] w-4 h-4" />
                        </Button>
                        <Button size="sm" shape="circle" color="primary">
                          <i class="icon-[mdi--play] w-4 h-4" />
                        </Button>
                        <Button size="sm" shape="circle">
                          <i class="icon-[mdi--skip-next] w-4 h-4" />
                        </Button>
                      </Flex>
                      <Button size="sm" variant="outline">
                        <i class="icon-[mdi--volume-high] w-4 h-4" />
                      </Button>
                    </Flex>
                    <Flex direction="col">
                      <span class="font-medium text-sm">Bohemian Rhapsody</span>
                      <span class="text-xs opacity-60">Queen</span>
                    </Flex>
                    <Progress value={45} class="mt-2" />
                    <Flex justify="between" class="text-xs opacity-60">
                      <span>2:34</span>
                      <span>5:55</span>
                    </Flex>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Code Mockup */}
              <Card variant="border" size="sm">
                <Card.Body class="p-0">
                  <CodeMockup>
                    <CodeMockupLine prefix="$">
                      npm install daisyui
                    </CodeMockupLine>
                    <CodeMockupLine prefix=">">installing...</CodeMockupLine>
                    <CodeMockupLine prefix=">">Done!</CodeMockupLine>
                  </CodeMockup>
                </Card.Body>
              </Card>

              {/* Navbar Example */}
              <Card variant="border" size="sm">
                <Card.Body class="p-0">
                  <Navbar class="bg-base-200 px-4">
                    <Navbar.Start>
                      <Dropdown>
                        <Button color="ghost" shape="circle" size="sm">
                          <i class="icon-[mdi--menu] w-4 h-4" />
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
                        <i class="icon-[mdi--account] w-4 h-4" />
                      </Button>
                    </Navbar.End>
                  </Navbar>
                </Card.Body>
              </Card>

              {/* Steps Component */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Steps vertical>
                    <Steps.Step color="primary">Account Created</Steps.Step>
                    <Steps.Step color="primary">Email Verified</Steps.Step>
                    <Steps.Step color="warning">Profile Setup</Steps.Step>
                    <Steps.Step>Payment Added</Steps.Step>
                  </Steps>
                </Card.Body>
              </Card>

              {/* Join Components */}
              <Card variant="border" size="sm">
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
                        <i class="icon-[mdi--magnify] w-4 h-4" />
                      </Button>
                    </Join>
                  </Flex>
                </Card.Body>
              </Card>

              {/* Form Survey */}
              <Card variant="border" size="sm">
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

              {/* Navigation */}
              <Card variant="border" size="sm">
                <Card.Body>
                  <Breadcrumbs>
                    <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
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
        )}

        {previewtabs() === "Component Variants" && (
          <Flex direction="col" gap="lg">
            <Card variant="border" size="sm">
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

            <Card variant="border" size="sm">
              <Card.Body>
                <Card.Title tag="h5">Inputs</Card.Title>
                <Flex gap="sm" class="flex-wrap">
                  <Input placeholder="Input" class="max-w-32" />
                  <Input
                    placeholder="Primary"
                    color="danger"
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
                  <Input placeholder="Error" color="danger" class="max-w-32" />
                </Flex>
              </Card.Body>
            </Card>
          </Flex>
        )}

        {previewtabs() === "Color Palette" && (
          <div class="lg:border-base-content/5 mb-16 rounded-2xl lg:border lg:p-4">
            <div class="border-base-content/10 overflow-hidden rounded-lg border-[0.5px]">
              <div class="grid grid-cols-1">
                <div class="bg-primary text-primary-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Primary
                  </div>
                  <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
                    {props.currentTheme["--color-primary"]}
                  </div>
                </div>
                <div class="bg-secondary text-secondary-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Secondary
                  </div>
                  <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
                    {props.currentTheme["--color-secondary"]}
                  </div>
                </div>
                <div class="bg-accent text-accent-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Accent
                  </div>
                  <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
                    {props.currentTheme["--color-accent"]}
                  </div>
                </div>
                <div class="bg-neutral text-neutral-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Neutral
                  </div>
                  <div class="font-mono text-[0.625rem] tracking-widest tabular-nums">
                    {props.currentTheme["--color-neutral"]}
                  </div>
                </div>
              </div>
            </div>
            <div class="border-base-content/10 mt-4 overflow-hidden rounded-lg border-[0.5px]">
              <div class="grid xl:grid-cols-3">
                <div class="bg-base-100 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Base 100
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-base-100"]}
                  </div>
                </div>
                <div class="bg-base-200 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Base 200
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-base-200"]}
                  </div>
                </div>
                <div class="bg-base-300 text-base-content group border-base-content/10 grid h-36 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Base 300
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-base-300"]}
                  </div>
                </div>
              </div>
            </div>
            <div class="border-base-content/10 mt-4 overflow-hidden rounded-lg border-[0.5px]">
              <div class="grid xl:grid-cols-4">
                <div class="bg-info text-info-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Info
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-info"]}
                  </div>
                </div>
                <div class="bg-success text-success-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Success
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-success"]}
                  </div>
                </div>
                <div class="bg-warning text-warning-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Warning
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-warning"]}
                  </div>
                </div>
                <div class="bg-error text-error-content group border-base-content/10 grid h-24 place-content-end gap-1 p-6 text-end">
                  <div class="font-title translate-y-1 text-sm font-semibold tracking-widest opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Error
                  </div>
                  <div class="truncate font-mono text-[0.625rem] tabular-nums">
                    {props.currentTheme["--color-error"]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
