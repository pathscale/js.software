import type { Theme } from "../types/theme";

const STORAGE_KEY = "js-software-theme-editor";
const appliedProperties = new Set<string>();

export interface PersistedThemeEditorState {
  currentTheme: Theme;
  themes: Theme[];
  applyToWholeSite: boolean;
}

const isTheme = (value: unknown): value is Theme => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    Object.keys(candidate).some(
      (key) => key.startsWith("--") && typeof candidate[key] === "string",
    )
  );
};

export const readThemeEditorState = (): PersistedThemeEditorState | null => {
  if (typeof window === "undefined") return null;

  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as {
      currentTheme?: unknown;
      themes?: unknown;
      applyToWholeSite?: unknown;
    } | null;

    if (!value || !isTheme(value.currentTheme)) return null;
    const themes = Array.isArray(value.themes)
      ? value.themes.filter(isTheme)
      : [];

    return {
      currentTheme: value.currentTheme,
      themes,
      applyToWholeSite: value.applyToWholeSite === true,
    };
  } catch {
    return null;
  }
};

export const writeThemeEditorState = (state: PersistedThemeEditorState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const clearThemeEditorState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

export const applyThemeToDocument = (theme: Theme | null) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  for (const property of appliedProperties) root.style.removeProperty(property);
  appliedProperties.clear();

  if (!theme) return;
  for (const [property, value] of Object.entries(theme)) {
    if (property.startsWith("--")) {
      root.style.setProperty(property, value);
      appliedProperties.add(property);
    }
  }
};

export const restoreAppliedTheme = () => {
  const state = readThemeEditorState();
  if (state?.applyToWholeSite) applyThemeToDocument(state.currentTheme);
};
