import { Component, For } from "solid-js";
import { Button } from "@pathscale/ui";
import { navigationItems } from "../navigationData";
import { useNavigation } from "../hooks/useNavigation";
import Search from "../../../content/Search";

interface MobileSidebarProps {
  navigation: ReturnType<typeof useNavigation>;
}

export const MobileSidebar: Component<MobileSidebarProps> = (props) => {
  const { setIsOpen, isActive } = props.navigation;

  const CloseIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );

  return (
    <div class="lg:hidden fixed inset-0 z-50">
      <div
        class="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      <div class="fixed top-0 left-0 h-screen w-80 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-screen">
          <div class="flex items-center justify-between p-4 border-b border-base-300">
            <span class="text-xl font-bold">UI</span>
            <Button
              color="ghost"
              size="sm"
              shape="circle"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </Button>
          </div>

          <div class="p-4 border-b border-base-300">
            <Search />
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div class="space-y-6">
              <For each={navigationItems}>
                {(item) => (
                  <div>
                    {item.href ? (
                      <a
                        href={item.href}
                        class={`block px-3 py-2 rounded-lg transition-colors font-semibold ${
                          isActive(item.href)
                            ? "bg-primary text-white"
                            : "text-base-content hover:bg-base-200"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <>
                        <div class="font-semibold text-base-content mb-3">
                          {item.title}
                        </div>
                        <div class="space-y-4">
                          <For each={item.subcategories}>
                            {(subcategory) => (
                              <div class="pl-4">
                                <div class="font-medium text-sm text-base-content/80 mb-2">
                                  {subcategory.title}
                                </div>
                                <div class="space-y-1">
                                  <For each={subcategory.items}>
                                    {(component) => (
                                      <a
                                        href={component.href}
                                        class={`block px-3 py-1 rounded-md text-sm transition-colors ${
                                          isActive(component.href)
                                            ? "bg-primary text-white"
                                            : "text-base-content/70 hover:bg-base-200"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {component.title}
                                      </a>
                                    )}
                                  </For>
                                </div>
                              </div>
                            )}
                          </For>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="p-4 border-t border-base-300">
            <a
              href="/docs/installation"
              class="block w-full bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-center transition-all whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};