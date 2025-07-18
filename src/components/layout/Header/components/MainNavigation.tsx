import { Component, For } from "solid-js";
import { Button, Flex } from "@pathscale/ui";
import { navigationItems } from "../navigationData";
import { useNavigation } from "../hooks/useNavigation";

interface MainNavigationProps {
  navigation: ReturnType<typeof useNavigation>;
}

export const MainNavigation: Component<MainNavigationProps> = (props) => {
  const { activeCategory, setActiveCategory, isActive } = props.navigation;

  return (
    <Flex gap="md" align="center">
      <For each={navigationItems}>
        {(item) => (
          <>
            {item.href ? (
              <a
                href={item.href}
                class={`px-3 py-2 rounded-lg transition-colors font-medium text-base ${
                  isActive(item.href)
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                {item.title}
              </a>
            ) : (
              <Button
                color="ghost"
                size="lg"
                onClick={() => {
                  setActiveCategory(
                    activeCategory() === item.title ? null : item.title
                  );
                }}
                class={`px-3 py-2 rounded-lg transition-colors font-medium text-base ${
                  activeCategory() === item.title
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-base-200"
                }`}
              >
                {item.title}
              </Button>
            )}
          </>
        )}
      </For>
    </Flex>
  );
};