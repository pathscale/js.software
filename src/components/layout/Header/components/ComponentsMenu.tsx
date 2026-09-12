import { Component, For, createMemo } from "solid-js";
import { Button, Flex, Link, Navbar } from "@pathscale/ui";
import {
  DEFAULT_COMPONENT_CATEGORY,
  navigationItems,
} from "../navigationData";
import { useNavigation } from "../hooks/useNavigation";
import clsx from "clsx";

interface ComponentsMenuProps {
  navigation: ReturnType<typeof useNavigation>;
}

export const ComponentsMenu: Component<ComponentsMenuProps> = (props) => {
  const { activeCategory, setActiveCategory, isActive, getSelectedSubcategory } = props.navigation;

  const componentsItem = navigationItems.find(
    (item) => item.title === "Components"
  );

  const selectedSubcategory = createMemo(() => getSelectedSubcategory());

  return (
    <>
      <Navbar.Row class="hidden lg:block bg-base-200 px-4 py-2">
        <Flex wrap="wrap" gap="sm" align="center">
          <For each={componentsItem?.subcategories || []}>
            {(subcategory) => (
              <Button
                id={`component-category-${subcategory.title.toLowerCase().replace(/\s+/g, "-")}`}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setActiveCategory(subcategory.title);
                }}
                class={clsx(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  activeCategory() === subcategory.title ||
                  (activeCategory() === "Components" &&
                    subcategory.title === DEFAULT_COMPONENT_CATEGORY)
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                )}
              >
                {subcategory.title}
              </Button>
            )}
          </For>
        </Flex>
      </Navbar.Row>
      
      <Navbar.Row class="hidden lg:block bg-base-100 px-4 py-2">
        <Flex wrap="wrap" gap="sm" align="center">
          <For each={selectedSubcategory()?.items || []}>
            {(item) => (
              <Link
                href={item.href}
                class={clsx(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                )}
              >
                {item.title}
              </Link>
            )}
          </For>
        </Flex>
      </Navbar.Row>
    </>
  );
};
