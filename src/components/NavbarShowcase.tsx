import { Component } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import {
  DefaultSection,
  TitleAndIconSection,
  IconStartEndSection,
  MenuSubmenuSection,
  SearchInputSection,
  IconIndicatorSection,
  DropdownCenterSection,
  ResponsiveSection,
  ColorsSection,
} from "./navbar-showcase/BasicSections";
import { MultilevelSection } from "./navbar-showcase/MultilevelSection";

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
    { id: "multilevel", title: "Multilevel" },
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

        <DefaultSection />
        <TitleAndIconSection />
        <IconStartEndSection />
        <MenuSubmenuSection />
        <SearchInputSection />
        <IconIndicatorSection />
        <DropdownCenterSection />
        <ResponsiveSection />
        <ColorsSection />
        <MultilevelSection />

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={navbarProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default NavbarShowcase;
