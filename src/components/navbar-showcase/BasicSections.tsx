import { Navbar, Button, Dropdown, Input, Badge, Card, Flex } from "@pathscale/ui";
import { CodeBlock } from "../showcase/CodeBlock";
import { ShowcaseSection } from "../showcase/ShowcaseSection";
import { MenuIcon, DotsIcon, SearchIcon, CartIcon, BellIcon } from "./icons";

export const DefaultSection = () => (
  <ShowcaseSection id="default" title="Default">
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 shadow-xl rounded-box">
        <a class="btn btn-ghost text-xl normal-case" href="#">
          daisyUI
        </a>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <a class="btn btn-ghost text-xl normal-case" href="#">
    daisyUI
  </a>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const TitleAndIconSection = () => (
  <ShowcaseSection id="title-and-icon" title="Title and Icon">
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 shadow-xl rounded-box">
        <Flex grow>
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Flex>
        <Flex shrink={false}>
          <Button variant="ghost" width="square">
            <DotsIcon />
          </Button>
        </Flex>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <Flex grow>
    <a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a>
  </Flex>
  <Flex shrink={false}>
    <Button variant="ghost" width="square">
      <DotsIcon />
    </Button>
  </Flex>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const IconStartEndSection = () => (
  <ShowcaseSection id="icon-at-start-and-end" title="Icon at Start and End">
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 shadow-xl rounded-box">
        <Flex shrink={false}>
          <Button variant="ghost" width="square">
            <MenuIcon />
          </Button>
        </Flex>
        <Flex grow>
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Flex>
        <Flex shrink={false}>
          <Button variant="ghost" width="square">
            <DotsIcon />
          </Button>
        </Flex>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <Flex shrink={false}><Button variant="ghost" width="square"><MenuIcon /></Button></Flex>
  <Flex grow><a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a></Flex>
  <Flex shrink={false}><Button variant="ghost" width="square"><DotsIcon /></Button></Flex>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const MenuSubmenuSection = () => (
  <ShowcaseSection id="menu-and-submenu" title="Menu and Submenu">
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
        <Flex grow>
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Flex>
        <Flex shrink={false}>
          <ul class="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul class="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </Flex>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
  <Flex grow>
    <a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a>
  </Flex>
  <Flex shrink={false}>
    <ul class="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li><details><summary>Parent</summary><ul class="p-2 bg-base-100">
        <li><a>Link 1</a></li><li><a>Link 2</a></li>
      </ul></details></li>
    </ul>
  </Flex>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const SearchInputSection = () => (
  <ShowcaseSection
    id="search-input-and-dropdown"
    title="Search Input and Dropdown"
  >
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
        <Flex grow>
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Flex>
        <Flex shrink={false} gap="md">
          <Input placeholder="Search" class="w-24 md:w-auto" />
          <Dropdown placement="bottom">
            <Dropdown.Trigger class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu align="end" class="w-52 mt-3 z-[1] p-2">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
  <Flex grow><a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a></Flex>
  <Flex shrink={false} gap="md">
    <Input placeholder="Search" class="w-24 md:w-auto" />
    <Dropdown placement="bottom">
      <Dropdown.Trigger class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full"><img src="..." /></div>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end" class="w-52 mt-3 z-[1] p-2">
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Flex>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const IconIndicatorSection = () => (
  <ShowcaseSection
    id="icon-indicator-and-dropdown"
    title="Icon Indicator and Dropdown"
  >
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
        <Flex grow>
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Flex>
        <Flex shrink={false} gap="md">
          <Dropdown placement="bottom">
            <Dropdown.Trigger class="btn btn-ghost btn-circle">
              <Badge.Anchor>
                <CartIcon />
                <Badge size="sm">8</Badge>
              </Badge.Anchor>
            </Dropdown.Trigger>
            <Dropdown.Menu
              align="end"
              class="mt-3 z-[1] card card-compact w-52 !p-0"
            >
              <Card.Body>
                <span class="font-bold text-lg">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <Flex justify="end" class="mt-2">
                  <Button flavor="primary" width="full">
                    View cart
                  </Button>
                </Flex>
              </Card.Body>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown placement="bottom">
            <Dropdown.Trigger class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu align="end" class="mt-3 z-[1] w-52">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
  <Flex grow><a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a></Flex>
  <Flex shrink={false} gap="md">
    <Dropdown placement="bottom">
      <Dropdown.Trigger class="btn btn-ghost btn-circle">
        <Badge.Anchor><CartIcon /><Badge size="sm">8</Badge></Badge.Anchor>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end" class="mt-3 z-[1] card card-compact w-52 !p-0">
        <Card.Body>
          <span class="font-bold text-lg">8 Items</span>
          <span class="text-info">Subtotal: $999</span>
          <Flex justify="end" class="mt-2">
            <Button flavor="primary" width="full">View cart</Button>
          </Flex>
        </Card.Body>
      </Dropdown.Menu>
    </Dropdown>
  </Flex>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const DropdownCenterSection = () => (
  <ShowcaseSection
    id="dropdown-center-logo-and-icon"
    title="Dropdown Center Logo and Icon"
  >
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
        <Navbar.Start>
          <Dropdown>
            <Dropdown.Trigger class="btn btn-ghost btn-circle">
              <MenuIcon />
            </Dropdown.Trigger>
            <Dropdown.Menu class="w-52 mt-3 z-[1]">
              <Dropdown.Item>Homepage</Dropdown.Item>
              <Dropdown.Item>Portfolio</Dropdown.Item>
              <Dropdown.Item>About</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Start>
        <Navbar.Center>
          <a class="btn btn-ghost normal-case text-xl" href="#">
            daisyUI
          </a>
        </Navbar.Center>
        <Navbar.End>
          <Button variant="ghost" width="square">
            <SearchIcon />
          </Button>
          <Badge.Anchor>
            <Button variant="ghost" width="square">
              <BellIcon />
            </Button>
            <Badge size="sm" flavor="accent" />
          </Badge.Anchor>
        </Navbar.End>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
  <Navbar.Start>
    <Dropdown>
      <Dropdown.Trigger class="btn btn-ghost btn-circle"><MenuIcon /></Dropdown.Trigger>
      <Dropdown.Menu class="w-52 mt-3 z-[1]">
        <Dropdown.Item>Homepage</Dropdown.Item>
        <Dropdown.Item>Portfolio</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Navbar.Start>
  <Navbar.Center>
    <a class="btn btn-ghost normal-case text-xl" href="#">daisyUI</a>
  </Navbar.Center>
  <Navbar.End>
    <Button variant="ghost" width="square"><SearchIcon /></Button>
    <Badge.Anchor>
      <Button variant="ghost" width="square"><BellIcon /></Button>
      <Badge size="sm" flavor="accent" />
    </Badge.Anchor>
  </Navbar.End>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const ResponsiveSection = () => (
  <ShowcaseSection id="responsive" title="Responsive">
    <Flex direction="col" gap="md">
      <Navbar class="bg-base-100 mb-48 shadow-xl rounded-box">
        <Navbar.Start>
          <Dropdown>
            <Dropdown.Trigger class="btn btn-ghost lg:hidden">
              <MenuIcon />
            </Dropdown.Trigger>
            <Dropdown.Menu class="w-52 mt-3 z-[1]">
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Parent</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <a class="btn btn-ghost normal-case text-xl" href="#">
            daisyUI
          </a>
        </Navbar.Start>
        <Navbar.Center class="hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul class="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </Navbar.Center>
        <Navbar.End>
          <Button>Button</Button>
        </Navbar.End>
      </Navbar>
      <CodeBlock
        code={`<Navbar class="bg-base-100 mb-48 shadow-xl rounded-box">
  <Navbar.Start>
    <Dropdown>
      <Dropdown.Trigger class="btn btn-ghost lg:hidden"><MenuIcon /></Dropdown.Trigger>
      <Dropdown.Menu class="w-52 mt-3 z-[1]">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Parent</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <a class="btn btn-ghost normal-case text-xl" href="#">daisyUI</a>
  </Navbar.Start>
  <Navbar.Center class="hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li><details><summary>Parent</summary><ul class="p-2">
        <li><a>Submenu 1</a></li><li><a>Submenu 2</a></li>
      </ul></details></li>
      <li><a>Item 3</a></li>
    </ul>
  </Navbar.Center>
  <Navbar.End><Button>Button</Button></Navbar.End>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);

export const ColorsSection = () => (
  <ShowcaseSection id="colors" title="Colors">
    <Flex direction="col" gap="md">
      <div class="space-y-4">
        <Navbar class="rounded-box bg-neutral text-neutral-content">
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Navbar>
        <Navbar class="rounded-box bg-base-300">
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Navbar>
        <Navbar class="rounded-box bg-primary text-primary-content">
          <a class="btn btn-ghost text-xl normal-case" href="#">
            daisyUI
          </a>
        </Navbar>
      </div>
      <CodeBlock
        code={`<Navbar class="rounded-box bg-neutral text-neutral-content">
  <a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a>
</Navbar>

<Navbar class="rounded-box bg-base-300">
  <a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a>
</Navbar>

<Navbar class="rounded-box bg-primary text-primary-content">
  <a class="btn btn-ghost text-xl normal-case" href="#">daisyUI</a>
</Navbar>`}
      />
    </Flex>
  </ShowcaseSection>
);
