import { Button, Icon } from "@pathscale/ui";
import { For, Show } from "solid-js";
import type { Theme } from "../../utils/themeUtils";

interface ThemeListProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
  onThemeRemove: (theme: Theme) => void;
  onCreateNewTheme: () => void;
  onClearAllThemes: () => void;
}

const themeIdentity = (theme: Theme) => theme._id || theme.name;

export default function ThemeList(props: ThemeListProps) {
  return (
    <aside class="bg-base-100 border-base-300 flex min-w-0 flex-col gap-3 border-b p-3 md:border-b-0 md:border-e">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-sm font-semibold">My themes</h2>
        <Button
          size="sm"
          flavor="secondary"
          onClick={props.onCreateNewTheme}
          aria-label="Add new theme"
        >
          <Icon src="mdi--plus" width={16} height={16} />
          Add
        </Button>
      </div>

      <div class="flex flex-col gap-1" aria-label="Saved themes">
        <For each={props.themes}>
          {(theme) => {
            const selected = () =>
              themeIdentity(theme) === themeIdentity(props.currentTheme);
            return (
              <div class="flex min-w-0 items-center gap-1">
                <Button
                  class="min-w-0 flex-1 justify-start"
                  size="sm"
                  flavor={selected() ? "primary" : "secondary"}
                  aria-pressed={selected() ? "true" : "false"}
                  onClick={() => props.onThemeSelect(theme)}
                >
                  <span class="truncate">{theme.name}</span>
                </Button>
                <Button
                  size="sm"
                  flavor="secondary"
                  aria-label={`Delete theme ${theme.name}`}
                  onClick={() => props.onThemeRemove(theme)}
                >
                  Delete
                </Button>
              </div>
            );
          }}
        </For>
      </div>

      <Show when={props.themes.length > 1}>
        <Button
          class="justify-start"
          size="sm"
          flavor="secondary"
          onClick={props.onClearAllThemes}
        >
          Clear saved themes
        </Button>
      </Show>
    </aside>
  );
}
