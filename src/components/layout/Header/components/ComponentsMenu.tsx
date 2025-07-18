import { Component, For } from "solid-js";
import { Button, Flex, Navbar } from "@pathscale/ui";
import { navigationItems } from "../navigationData";
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

  const selectedSubcategory = getSelectedSubcategory();

  return (
    <>
      <Navbar.Row class="hidden lg:block bg-base-200 border-t border-base-300 px-4 py-2">
        <Flex wrap="wrap" gap="sm" align="center">
          <For each={componentsItem?.subcategories || []}>
            {(subcategory) => (
              <Button
                color="ghost"
                size="sm"
                onClick={() => {
                  setActiveCategory(subcategory.title);
                }}
                class={clsx(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  activeCategory() === subcategory.title ||
                  (activeCategory() === "Components" && subcategory === componentsItem?.subcategories?.[0])
                    ? "bg-primary text-white"
                    : "hover:bg-base-300"
                )}
              >
                {subcategory.title}
              </Button>
            )}
          </For>
        </Flex>
      </Navbar.Row>
      
      <Navbar.Row class="hidden lg:block bg-base-100 border-t border-base-300 px-4 py-2">
        <Flex wrap="wrap" gap="sm" align="center">
          <For each={selectedSubcategory?.items || []}>
            {(item) => (
              <a
                href={item.href}
                class={clsx(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  isActive(item.href) ? "bg-primary text-white" : "hover:bg-base-300"
                )}
              >
                {item.title}
              </a>
            )}
          </For>
        </Flex>
      </Navbar.Row>
    </>
  );
};