import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import {
  Navbar,
  Button,
  Menu,
  Dropdown,
  Input,
  Badge,
  Card,
  Indicator,
  Flex,
} from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const NavbarShowcase: Component = () => {
  const sections = [
    { id: "default", title: "Default" },
    { id: "title-and-icon", title: "Title and Icon" },
    { id: "icon-at-start-and-end", title: "Icon at Start and End" },
    { id: "menu-and-submenu", title: "Menu and Submenu" },
    { id: "search-input-and-dropdown", title: "Search Input and Dropdown" },
    { id: "icon-indicator-and-dropdown", title: "Icon Indicator and Dropdown" },
    {
      id: "dropdown-center-logo-and-icon",
      title: "Dropdown Center Logo and Icon",
    },
    { id: "responsive", title: "Responsive" },
    { id: "colors", title: "Colors" },
    { id: "props", title: "Props" },
  ] as const;

  const navbarProps = [
    {
      name: "as",
      type: "keyof JSX.IntrinsicElements",
      default: '"div"',
      description: "The HTML element to render as",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "style",
      type: "JSX.CSSProperties",
      description: "Inline styles to apply",
    },
  ];

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );

  const DotsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const CartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const BellIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 shadow-xl rounded-box">
              <Button as="a" class="text-xl normal-case" color="ghost">
                daisyUI
              </Button>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <Button as="a" class="text-xl normal-case" color="ghost">
    daisyUI
  </Button>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="title-and-icon" title="Title and Icon">
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 shadow-xl rounded-box">
              <Flex grow>
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Flex>
              <Flex shrink={false}>
                <Button shape="square" color="ghost">
                  <DotsIcon />
                </Button>
              </Flex>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <Flex grow>
    <Button as="a" class="text-xl normal-case" color="ghost">
      daisyUI
    </Button>
  </Flex>
  <Flex shrink={false}>
    <Button shape="square" color="ghost">
      <DotsIcon />
    </Button>
  </Flex>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="icon-at-start-and-end"
          title="Icon at Start and End"
        >
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 shadow-xl rounded-box">
              <Flex shrink={false}>
                <Button shape="square" color="ghost">
                  <MenuIcon />
                </Button>
              </Flex>
              <Flex grow>
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Flex>
              <Flex shrink={false}>
                <Button shape="square" color="ghost">
                  <DotsIcon />
                </Button>
              </Flex>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 shadow-xl rounded-box">
  <Flex shrink={false}>
    <Button shape="square" color="ghost">
      <MenuIcon />
    </Button>
  </Flex>
  <Flex grow>
    <Button as="a" class="text-xl normal-case" color="ghost">
      daisyUI
    </Button>
  </Flex>
  <Flex shrink={false}>
    <Button shape="square" color="ghost">
      <DotsIcon />
    </Button>
  </Flex>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="menu-and-submenu" title="Menu and Submenu">
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
              <Flex grow>
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Flex>
              <Flex shrink={false}>
                <Menu horizontal class="px-1">
                  <Menu.Item>
                    <a>Link</a>
                  </Menu.Item>
                  <Menu.Item>
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
                  </Menu.Item>
                </Menu>
              </Flex>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
  <Flex grow>
    <Button as="a" class="text-xl normal-case" color="ghost">
      daisyUI
    </Button>
  </Flex>
  <Flex shrink={false}>
    <Menu horizontal class="px-1">
      <Menu.Item>
        <a>Link</a>
      </Menu.Item>
      <Menu.Item>
        <details>
          <summary>Parent</summary>
          <ul class="p-2 bg-base-100">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </Menu.Item>
    </Menu>
  </Flex>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="search-input-and-dropdown"
          title="Search Input and Dropdown"
        >
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
              <Flex grow>
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Flex>
              <Flex shrink={false} gap="md">
                <Input placeholder="Search" class="w-24 md:w-auto" />
                <Dropdown end>
                  <Button color="ghost" class="avatar" shape="circle">
                    <div class="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </Button>
                  <Dropdown.Menu class="w-52 menu-sm mt-3 z-[1] p-2">
                    <li>
                      <a class="justify-between">
                        Profile
                        <Badge>New</Badge>
                      </a>
                    </li>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Flex>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 mb-32 shadow-xl rounded-box">
  <Flex grow>
    <Button as="a" class="text-xl normal-case" color="ghost">
      daisyUI
    </Button>
  </Flex>
  <Flex shrink={false} gap="md">
    <Input placeholder="Search" class="w-24 md:w-auto" />
    <Dropdown end>
      <Button color="ghost" class="avatar" shape="circle">
        <div class="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </Button>
      <Dropdown.Menu class="w-52 menu-sm mt-3 z-[1] p-2">
        <li>
          <a class="justify-between">
            Profile
            <Badge>New</Badge>
          </a>
        </li>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Flex>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="icon-indicator-and-dropdown"
          title="Icon Indicator and Dropdown"
        >
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
              <Flex grow>
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Flex>
              <Flex shrink={false} gap="md">
                <Dropdown end>
                  <Button color="ghost" shape="circle">
                    <Indicator>
                      <Badge size="sm" class="indicator-item">
                        8
                      </Badge>
                      <CartIcon />
                    </Indicator>
                  </Button>
                  <Dropdown.Menu class="mt-3 z-[1] card card-compact w-52 !p-0">
                    <Card.Body>
                      <span class="font-bold text-lg">8 Items</span>
                      <span class="text-info">Subtotal: $999</span>
                      <Card.Actions>
                        <Button color="primary" fullWidth>
                          View cart
                        </Button>
                      </Card.Actions>
                    </Card.Body>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown end>
                  <Button color="ghost" class="avatar" shape="circle">
                    <div class="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </Button>
                  <Dropdown.Menu class="mt-3 z-[1] w-52 menu-sm">
                    <li>
                      <a class="justify-between">
                        Profile
                        <Badge>New</Badge>
                      </a>
                    </li>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Flex>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
  <Flex grow>
    <Button as="a" class="text-xl normal-case" color="ghost">
      daisyUI
    </Button>
  </Flex>
  <Flex shrink={false} gap="md">
    <Dropdown end>
      <Button color="ghost" shape="circle">
        <Indicator>
          <Badge size="sm" class="indicator-item">
            8
          </Badge>
          <CartIcon />
        </Indicator>
      </Button>
      <Dropdown.Menu class="mt-3 z-[1] card card-compact w-52 !p-0">
        <Card.Body>
          <span class="font-bold text-lg">8 Items</span>
          <span class="text-info">Subtotal: $999</span>
          <Card.Actions>
            <Button color="primary" fullWidth>View cart</Button>
          </Card.Actions>
        </Card.Body>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown end>
      <Button color="ghost" class="avatar" shape="circle">
        <div class="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </Button>
      <Dropdown.Menu class="mt-3 z-[1] w-52 menu-sm">
        <li>
          <a class="justify-between">
            Profile
            <Badge>New</Badge>
          </a>
        </li>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Flex>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="dropdown-center-logo-and-icon"
          title="Dropdown Center Logo and Icon"
        >
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
              <Navbar.Start>
                <Dropdown>
                  <Button color="ghost" shape="circle">
                    <MenuIcon />
                  </Button>
                  <Dropdown.Menu class="menu-sm w-52 mt-3 z-[1]">
                    <Dropdown.Item>Homepage</Dropdown.Item>
                    <Dropdown.Item>Portfolio</Dropdown.Item>
                    <Dropdown.Item>About</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Start>
              <Navbar.Center>
                <Button as="a" color="ghost" class="normal-case text-xl">
                  daisyUI
                </Button>
              </Navbar.Center>
              <Navbar.End>
                <Button color="ghost" shape="circle">
                  <SearchIcon />
                </Button>
                <Button color="ghost" shape="circle">
                  <Indicator>
                    <Badge size="xs" color="primary" class="indicator-item" />
                    <BellIcon />
                  </Indicator>
                </Button>
              </Navbar.End>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 mb-40 shadow-xl rounded-box">
  <Navbar.Start>
    <Dropdown>
      <Button color="ghost" shape="circle">
        <MenuIcon />
      </Button>
      <Dropdown.Menu class="menu-sm w-52 mt-3 z-[1]">
        <Dropdown.Item>Homepage</Dropdown.Item>
        <Dropdown.Item>Portfolio</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Navbar.Start>
  <Navbar.Center>
    <Button as="a" color="ghost" class="normal-case text-xl">
      daisyUI
    </Button>
  </Navbar.Center>
  <Navbar.End>
    <Button color="ghost" shape="circle">
      <SearchIcon />
    </Button>
    <Button color="ghost" shape="circle">
      <Indicator>
        <Badge size="xs" color="primary" class="indicator-item" />
        <BellIcon />
      </Indicator>
    </Button>
  </Navbar.End>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="responsive" title="Responsive">
          <Flex direction="col" gap="md">
            <Navbar class="bg-base-100 mb-48 shadow-xl rounded-box">
              <Navbar.Start>
                <Dropdown>
                  <Button color="ghost" class="lg:hidden">
                    <MenuIcon />
                  </Button>
                  <Dropdown.Menu class="w-52 menu-sm mt-3 z-[1]">
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <li>
                      <a>Parent</a>
                      <ul class="p-2">
                        <li>
                          <a>Submenu 1</a>
                        </li>
                        <li>
                          <a>Submenu 2</a>
                        </li>
                      </ul>
                    </li>
                    <Dropdown.Item>Item 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button as="a" color="ghost" class="normal-case text-xl">
                  daisyUI
                </Button>
              </Navbar.Start>
              <Navbar.Center class="hidden lg:flex">
                <Menu horizontal class="px-1">
                  <Menu.Item>
                    <a>Item 1</a>
                  </Menu.Item>
                  <Menu.Item>
                    <details>
                      <summary>Parent</summary>
                      <ul class="p-2">
                        <Menu.Item>
                          <a>Submenu 1</a>
                        </Menu.Item>
                        <Menu.Item>
                          <a>Submenu 2</a>
                        </Menu.Item>
                      </ul>
                    </details>
                  </Menu.Item>
                  <Menu.Item>
                    <a>Item 3</a>
                  </Menu.Item>
                </Menu>
              </Navbar.Center>
              <Navbar.End>
                <Button>Button</Button>
              </Navbar.End>
            </Navbar>
            <CodeBlock
              code={`<Navbar class="bg-base-100 mb-48 shadow-xl rounded-box">
  <Navbar.Start>
    <Dropdown>
      <Button color="ghost" class="lg:hidden">
        <MenuIcon />
      </Button>
      <Dropdown.Menu class="w-52 menu-sm mt-3 z-[1]">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <li>
          <a>Parent</a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Button as="a" color="ghost" class="normal-case text-xl">
      daisyUI
    </Button>
  </Navbar.Start>
  <Navbar.Center class="hidden lg:flex">
    <Menu horizontal class="px-1">
      <Menu.Item>
        <a>Item 1</a>
      </Menu.Item>
      <Menu.Item>
        <details>
          <summary>Parent</summary>
          <ul class="p-2">
            <Menu.Item><a>Submenu 1</a></Menu.Item>
            <Menu.Item><a>Submenu 2</a></Menu.Item>
          </ul>
        </details>
      </Menu.Item>
      <Menu.Item>
        <a>Item 3</a>
      </Menu.Item>
    </Menu>
  </Navbar.Center>
  <Navbar.End>
    <Button>Button</Button>
  </Navbar.End>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="colors" title="Colors">
          <Flex direction="col" gap="md">
            <div class="space-y-4">
              <Navbar class="rounded-box bg-neutral text-neutral-content">
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Navbar>
              <Navbar class="rounded-box bg-base-300">
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Navbar>
              <Navbar class="rounded-box bg-primary text-primary-content">
                <Button as="a" class="text-xl normal-case" color="ghost">
                  daisyUI
                </Button>
              </Navbar>
            </div>
            <CodeBlock
              code={`<Navbar class="rounded-box bg-neutral text-neutral-content">
  <Button as="a" class="text-xl normal-case" color="ghost">
    daisyUI
  </Button>
</Navbar>

<Navbar class="rounded-box bg-base-300">
  <Button as="a" class="text-xl normal-case" color="ghost">
    daisyUI
  </Button>
</Navbar>

<Navbar class="rounded-box bg-primary text-primary-content">
  <Button as="a" class="text-xl normal-case" color="ghost">
    daisyUI
  </Button>
</Navbar>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={navbarProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default NavbarShowcase;
