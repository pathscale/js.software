import { For } from "solid-js";
import { Button, Dropdown, Icon } from "@pathscale/ui";
import { Theme } from "../../utils/themeUtils";

interface ThemeListProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
  onThemeRemove: (theme: Theme) => void;
  onCreateNewTheme: () => void;
  onClearAllThemes: () => void;
  dockActiveItem: string;
}

export default function ThemeList(props: ThemeListProps) {
  return (
    <div
      class="border-base-200 bg-base-100 w-full shrink-0 overflow-x-hidden border-e border-dashed p-4 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-scroll"
      classList={{ "max-md:hidden": props.dockActiveItem !== "themes" }}
    >
      <div class="mb-4 flex items-center justify-between gap-2">
        <h2 class="font-title ms-2 font-semibold">Themes</h2>
        <Dropdown end>
          <Dropdown.Toggle>
            <Icon name="icon-[mdi-light--menu]" width={20} height={20} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Options</Dropdown.Item>
            <Dropdown.Item>
              <Button class="text-xs" onClick={props.onClearAllThemes}>
                <Icon name="icon-[mdi-light--delete]" width={16} height={16} class="text-error" />
                Remove my themes
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ul class="menu w-full min-w-40 p-0">
        <li>
          <Button
            onClick={props.onCreateNewTheme}
            class="theme-generator-btn bg-auto px-2"
          >
            <Icon name="icon-[mdi-light--plus]" width={18} height={18} class="group-hover:-rotate-12 transition-transform" />
            <span class="font-normal">Add new theme</span>
          </Button>
        </li>
        <li class="menu-title mt-6">My themes</li>
        <For each={props.themes}>
          {(themeItem) => (
            <li>
              <div
                class="flex items-center justify-between cursor-pointer hover:bg-base-200 rounded p-2"
                classList={{
                  "bg-base-200": props.currentTheme.name === themeItem.name,
                }}
                onClick={() => props.onThemeSelect(themeItem)}
              >
                <span class="flex-1 text-left truncate">
                  {themeItem.name}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  color="error"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    props.onThemeRemove(themeItem);
                  }}
                >
                  ✕
                </Button>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}