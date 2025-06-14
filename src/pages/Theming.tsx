import { createEffect, createSignal, onMount, For, Show } from "solid-js";
import { theme } from "../lib/theme";

// Theme data structures adapted from daisyui
const TAILWIND_COLORS = {
  "slate-50": "oklch(98% 0.003 247.858)",
  "slate-100": "oklch(96% 0.007 247.896)",
  "slate-200": "oklch(92% 0.013 255.508)",
  "slate-300": "oklch(86% 0.022 252.894)",
  "slate-400": "oklch(70% 0.04 256.788)",
  "slate-500": "oklch(55% 0.046 257.417)",
  "slate-600": "oklch(44% 0.043 257.281)",
  "slate-700": "oklch(37% 0.044 257.287)",
  "slate-800": "oklch(27% 0.041 260.031)",
  "slate-900": "oklch(20% 0.042 265.755)",
  "gray-50": "oklch(98% 0.002 247.839)",
  "gray-100": "oklch(96% 0.003 264.542)",
  "gray-200": "oklch(92% 0.006 264.531)",
  "gray-300": "oklch(87% 0.01 258.338)",
  "gray-400": "oklch(70% 0.022 261.325)",
  "gray-500": "oklch(55% 0.027 264.364)",
  "blue-50": "oklch(97% 0.014 254.604)",
  "blue-100": "oklch(93% 0.032 255.585)",
  "blue-200": "oklch(88% 0.059 254.128)",
  "blue-300": "oklch(80% 0.105 251.813)",
  "blue-400": "oklch(70% 0.165 254.624)",
  "blue-500": "oklch(62% 0.214 259.815)",
  "blue-600": "oklch(54% 0.245 262.881)",
  "blue-700": "oklch(48% 0.243 264.376)",
  "blue-800": "oklch(42% 0.199 265.638)",
  "blue-900": "oklch(37% 0.146 265.522)",
  "emerald-50": "oklch(97% 0.021 166.113)",
  "emerald-100": "oklch(95% 0.052 163.051)",
  "emerald-200": "oklch(90% 0.093 164.15)",
  "emerald-300": "oklch(84% 0.143 164.978)",
  "emerald-400": "oklch(76% 0.177 163.223)",
  "emerald-500": "oklch(69% 0.17 162.48)",
  "emerald-600": "oklch(59% 0.145 163.225)",
  "red-50": "oklch(97% 0.013 17.38)",
  "red-100": "oklch(93% 0.032 17.717)",
  "red-200": "oklch(88% 0.062 18.334)",
  "red-300": "oklch(80% 0.114 19.571)",
  "red-400": "oklch(70% 0.191 22.216)",
  "red-500": "oklch(63% 0.237 25.331)",
  "red-600": "oklch(57% 0.245 27.325)",
  "orange-50": "oklch(98% 0.016 73.684)",
  "orange-100": "oklch(95% 0.038 75.164)",
  "orange-200": "oklch(90% 0.076 70.697)",
  "orange-300": "oklch(83% 0.128 66.29)",
  "orange-400": "oklch(75% 0.183 55.934)",
  "orange-500": "oklch(70% 0.213 47.604)",
  "purple-50": "oklch(97% 0.014 308.299)",
  "purple-100": "oklch(94% 0.033 307.174)",
  "purple-200": "oklch(90% 0.063 306.703)",
  "purple-300": "oklch(82% 0.119 306.383)",
  "purple-400": "oklch(71% 0.203 305.504)",
  "purple-500": "oklch(62% 0.265 303.9)",
  "purple-600": "oklch(55% 0.288 302.321)",
  "white": "oklch(100% 0 0)",
  "black": "oklch(0% 0 0)"
};

const COLOR_GROUPS = [
  { name: "base", colors: ["--color-base-100", "--color-base-200", "--color-base-300", "--color-base-content"] },
  { name: "primary", colors: ["--color-primary", "--color-primary-content"] },
  { name: "secondary", colors: ["--color-secondary", "--color-secondary-content"] },
  { name: "accent", colors: ["--color-accent", "--color-accent-content"] },
  { name: "neutral", colors: ["--color-neutral", "--color-neutral-content"] },
  { name: "info", colors: ["--color-info", "--color-info-content"] },
  { name: "success", colors: ["--color-success", "--color-success-content"] },
  { name: "warning", colors: ["--color-warning", "--color-warning-content"] },
  { name: "error", colors: ["--color-error", "--color-error-content"] },
];



// Calculate contrast color based on main color lightness
const getContrastColor = (baseColor: string): string => {
  // Extract lightness from OKLCH color
  const oklchMatch = baseColor.match(/oklch\((\d+(?:\.\d+)?)%/);
  if (!oklchMatch) return "oklch(100% 0 0)"; // default to white
  
  const lightness = parseFloat(oklchMatch[1]);
  
  // If the base color is light (> 50%), use dark content
  // If the base color is dark (≤ 50%), use light content
  if (lightness > 50) {
    return "oklch(20% 0.01 0)"; // dark content
  } else {
    return "oklch(98% 0.01 0)"; // light content
  }
};

// Get a smart content color that provides good contrast
const getSmartContentColor = (colorName: string, baseColor: string): string => {
  // Special cases for specific color names
  if (colorName.includes("base")) {
    return theme() === "dark" ? "oklch(87% 0.01 258.338)" : "oklch(21% 0.034 264.665)";
  }
  
  return getContrastColor(baseColor);
};

const generateRandomTheme = () => {
  const colorKeys = Object.keys(TAILWIND_COLORS);
  const getRandomColor = () => TAILWIND_COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  
  const baseTheme = {
    name: `theme-${Date.now()}`,
    "--color-base-100": theme() === "dark" ? "oklch(13% 0.028 261.692)" : "oklch(100% 0 0)",
    "--color-base-200": theme() === "dark" ? "oklch(21% 0.034 264.665)" : "oklch(96% 0.003 264.542)",
    "--color-base-300": theme() === "dark" ? "oklch(27% 0.033 256.848)" : "oklch(87% 0.01 258.338)",
    "--color-base-content": theme() === "dark" ? "oklch(87% 0.01 258.338)" : "oklch(21% 0.034 264.665)",
    "--color-primary": getRandomColor(),
    "--color-secondary": getRandomColor(),
    "--color-accent": getRandomColor(),
    "--color-neutral": getRandomColor(),
    "--color-info": getRandomColor(),
    "--color-success": getRandomColor(),
    "--color-warning": getRandomColor(),
    "--color-error": getRandomColor(),
  };
  
  // Calculate content colors automatically
  const themeWithContent = { ...baseTheme };
  
  // For each color, calculate its content color
  Object.keys(baseTheme).forEach(key => {
    if (!key.includes("-content") && key !== "--color-base-content") {
      const contentKey = key + "-content";
      const baseColor = baseTheme[key];
      if (baseColor && typeof baseColor === 'string') {
        themeWithContent[contentKey] = getSmartContentColor(key, baseColor);
      }
    }
  });
  
  return themeWithContent;
};

export default function Theming() {
  const [currentTheme, setCurrentTheme] = createSignal(generateRandomTheme());
  const [customThemes, setCustomThemes] = createSignal([generateRandomTheme()]);
  const [showColorPicker, setShowColorPicker] = createSignal(false);
  const [selectedColorKey, setSelectedColorKey] = createSignal("");
  const [dockActiveItem] = createSignal("editor");

  const applyThemeVars = () => {
    // Apply theme colors
    const themeData = currentTheme();
    Object.entries(themeData).forEach(([key, value]) => {
      if (key.startsWith('--color-')) {
        document.documentElement.style.setProperty(key, value);
      }
    });
  };
  
  const randomizeTheme = () => {
    const newTheme = generateRandomTheme();
    setCurrentTheme(newTheme);
    
    // Update the theme in the custom themes list too
    setCustomThemes(prev => prev.map(theme => 
      theme.name === currentTheme().name ? newTheme : theme
    ));
  };
  
  const createNewTheme = () => {
    const newTheme = generateRandomTheme();
    setCustomThemes(prev => [newTheme, ...prev]);
    setCurrentTheme(newTheme);
  };
  
  const loadTheme = (theme: any) => {
    setCurrentTheme(theme);
  };
  
  const removeTheme = (themeToRemove: any) => {
    setCustomThemes(prev => prev.filter(t => t.name !== themeToRemove.name));
    if (currentTheme().name === themeToRemove.name) {
      const remaining = customThemes().filter(t => t.name !== themeToRemove.name);
      setCurrentTheme(remaining.length > 0 ? remaining[0] : generateRandomTheme());
    }
  };
  
  const openColorPicker = (colorKey: string) => {
    setSelectedColorKey(colorKey);
    setShowColorPicker(true);
  };
  
  const selectColor = (colorValue: string) => {
    const key = selectedColorKey();
    if (key) {
      setCurrentTheme(prev => {
        const newTheme = { ...prev, [key]: colorValue };
        
        // If we're setting a main color, automatically update its content color
        if (!key.includes("-content")) {
          const contentKey = key + "-content";
          newTheme[contentKey] = getSmartContentColor(key, colorValue);
        }
        
        return newTheme;
      });
      
      // Also update the custom themes list
      setCustomThemes(prev => prev.map(theme => 
        theme.name === currentTheme().name 
          ? { ...theme, [key]: colorValue, ...(key.includes("-content") ? {} : { [key + "-content"]: getSmartContentColor(key, colorValue) }) }
          : theme
      ));
    }
    setShowColorPicker(false);
  };

  createEffect(() => {
    // Apply theme when it changes
    applyThemeVars();
  });

  onMount(() => {
    applyThemeVars();
  });

  return (
    <div class="relative grid md:grid-cols-[14rem_17rem_1fr]">
      {/* Themes List - Left Column */}
      <div
        class="border-base-200 bg-base-100 w-full shrink-0 overflow-x-hidden border-e border-dashed p-4 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-scroll"
        classList={{ "max-md:hidden": dockActiveItem() !== "themes" }}
      >
        <div class="mb-4 flex items-center justify-between gap-2">
          <h2 class="font-title ms-2 font-semibold">Themes</h2>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-square btn-sm m-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 border-base-300 rounded-box z-1 w-48 border p-2 shadow-xl">
              <li class="menu-title">Options</li>
              <li>
                <button class="text-xs" onClick={() => setCustomThemes([])}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-error size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Remove my themes
                </button>
              </li>
            </ul>
          </div>
        </div>

        <ul class="menu w-full min-w-40 p-0">
          <li>
            <button class="btn group theme-generator-btn bg-auto px-2" onClick={createNewTheme}>
              <svg class="size-5 origin-[40%_60%] [transition:rotate_.2s_ease] group-hover:-rotate-12" width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.1005 8.1005L24.3431 12.3431M30 4V10V4ZM39.8995 8.1005L35.6569 12.3431L39.8995 8.1005ZM44 18H38H44ZM39.8995 27.8995L35.6569 23.6569L39.8995 27.8995ZM30 32V26V32ZM20.1005 27.8995L24.3431 23.6569L20.1005 27.8995ZM16 18H22H16Z" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path>
                <path d="M29.5856 18.4143L5.54395 42.4559" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path>
              </svg>
              <span class="font-normal">Add new theme</span>
            </button>
          </li>
          <li class="menu-title mt-6">My themes</li>
          <For each={customThemes()}>
            {(themeItem) => (
              <li>
                <div 
                  class="flex items-center justify-between cursor-pointer hover:bg-base-200 rounded p-2" 
                  classList={{ "bg-base-200": currentTheme().name === themeItem.name }}
                  onClick={() => loadTheme(themeItem)}
                >
                  <span class="flex-1 text-left truncate">{themeItem.name}</span>
                  <button 
                    class="btn btn-ghost btn-xs text-error"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTheme(themeItem);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>

      {/* Editor - Middle Column */}
      <div
        class="bg-base-100 flex w-full shrink-0 flex-col items-center gap-4 p-6 pb-20 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:items-start md:overflow-y-scroll lg:items-stretch"
        classList={{ "max-md:hidden": dockActiveItem() !== "editor" }}
      >
        {/* Theme Name Input */}
        <label class="input input-ghost input-sm flex w-full shrink-0 items-center gap-2 font-semibold">
          <span class="shrink-0 text-xs opacity-60 select-none">Name</span>
          <input
            class="w-full shrink"
            type="text"
            value={currentTheme().name}
            onInput={(e) => {
              const newName = e.currentTarget.value;
              const oldName = currentTheme().name;
              setCurrentTheme(prev => ({ ...prev, name: newName }));
              setCustomThemes(prev => prev.map(theme => 
                theme.name === oldName ? { ...theme, name: newName } : theme
              ));
            }}
            placeholder="mytheme"
          />
          <svg class="justify-self-end opacity-40" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </label>

        {/* Action Buttons */}
        <div class="grid w-full grid-cols-2 gap-2">
          <button class="btn group" onClick={randomizeTheme}>
            <svg class="shrink-0 group-active:scale-95" fill="currentColor" width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path d="M192,28H64A36.04061,36.04061,0,0,0,28,64V192a36.04061,36.04061,0,0,0,36,36H192a36.04061,36.04061,0,0,0,36-36V64A36.04061,36.04061,0,0,0,192,28Zm12,164a12.01312,12.01312,0,0,1-12,12H64a12.01312,12.01312,0,0,1-12-12V64A12.01312,12.01312,0,0,1,64,52H192a12.01312,12.01312,0,0,1,12,12ZM104,88A16,16,0,1,1,88,72,16.01833,16.01833,0,0,1,104,88Zm80,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,184,88Zm-80,80a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,104,168Zm80,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,184,168Zm-40-40a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,144,128Z" />
            </svg>
            Random
          </button>
          <button class="btn btn-neutral">
            <svg class="shrink-0" fill="currentColor" width="16px" height="16px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path d="M54.79785,119.48535A34.95033,34.95033,0,0,1,49.05078,128a34.95033,34.95033,0,0,1,5.74707,8.51465C60,147.24414,60,159.8291,60,172c0,25.93652,1.84424,32,20,32a12,12,0,0,1,0,24c-19.14453,0-32.19775-6.90234-38.79785-20.51465C36,196.75586,36,184.1709,36,172c0-25.93652-1.84424-32-20-32a12,12,0,0,1,0-24c18.15576,0,20-6.06348,20-32,0-12.1709,0-24.75586,5.20215-35.48535C47.80225,34.90234,60.85547,28,80,28a12,12,0,0,1,0,24c-18.15576,0-20,6.06348-20,32C60,96.1709,60,108.75586,54.79785,119.48535ZM240,116c-18.15576,0-20-6.06348-20-32,0-12.1709,0-24.75586-5.20215-35.48535C208.19775,34.90234,195.14453,28,176,28a12,12,0,0,0,0,24c18.15576,0,20,6.06348,20,32,0,12.1709,0,24.75586,5.20215,35.48535A34.95033,34.95033,0,0,0,206.94922,128a34.95033,34.95033,0,0,0-5.74707,8.51465C196,147.24414,196,159.8291,196,172c0,25.93652-1.84424,32-20,32a12,12,0,0,0,0,24c19.14453,0,32.19775-6.90234,38.79785-20.51465C220,196.75586,220,184.1709,220,172c0-25.93652,1.84424-32,20-32a12,12,0,0,0,0-24Z" />
            </svg>
            CSS
          </button>
        </div>

        {/* Change Colors Section */}
        <h3 class="divider divider-start text-xs">
          <span class="flex gap-1.5">
            <svg class="opacity-40" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M37 37C39.2091 37 41 35.2091 41 33C41 31.5272 39.6667 29.5272 37 27C34.3333 29.5272 33 31.5272 33 33C33 35.2091 34.7909 37 37 37Z" fill="currentColor" />
              <path d="M20.8535 5.50439L24.389 9.03993" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              <path d="M23.6818 8.33281L8.12549 23.8892L19.4392 35.2029L34.9955 19.6465L23.6818 8.33281Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
              <path d="M12 20.0732L28.961 25.6496" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            </svg>
            Change Colors
          </span>
        </h3>
        <div class="grid w-fit grid-cols-4 gap-4">
          <For each={COLOR_GROUPS}>
            {(group) => (
              <div class="flex flex-col gap-1" classList={{ "col-span-4": group.name === "base", "col-span-2": group.name !== "base" }}>
                <div class="flex gap-4">
                  <For each={group.colors}>
                    {(colorKey) => {
                      const isContentColor = colorKey.endsWith("-content");
                      
                      // FUNCIONES REACTIVAS - se recalculan cuando currentTheme() cambia
                      const backgroundColor = () => {
                        if (group.name === "base") {
                          if (isContentColor) {
                            // base-content box: fondo base-100
                            return currentTheme()["--color-base-100"] || "oklch(100% 0 0)";
                          } else {
                            // base-100, base-200, base-300: fondo propio
                            return currentTheme()[colorKey] || "oklch(50% 0.1 180)";
                          }
                        } else {
                          // Para otros colores (primary, secondary, etc.)
                          const mainColorKey = isContentColor ? colorKey.replace("-content", "") : colorKey;
                          return currentTheme()[mainColorKey] || "oklch(50% 0.1 180)";
                        }
                      };
                      
                      const textColor = () => {
                        if (group.name === "base") {
                          return currentTheme()["--color-base-content"] || "oklch(0% 0 0)";
                        } else {
                          const mainColorKey = isContentColor ? colorKey.replace("-content", "") : colorKey;
                          const contentColorKey = mainColorKey + "-content";
                          return currentTheme()[contentColorKey] || "oklch(100% 0 0)";
                        }
                      };
                      
                      const getLabel = (key: string) => {
                        if (key.endsWith("-content")) {
                          return "A";
                        }
                        if (/\d/.test(key)) {
                          return key.replace(`--color-${group.name}-`, "");
                        }
                        return "";
                      };
                      const label = getLabel(colorKey);
                      
                      return (
                        <button
                          onClick={() => openColorPicker(colorKey)}
                          class="w-8 h-8 rounded border border-gray-300 hover:border-gray-400 transition-colors relative group flex items-center justify-center"
                          style={{ "background": backgroundColor() }}
                          title={colorKey}
                        >
                          <div class="absolute inset-0 opacity-0 group-hover:opacity-10 rounded transition-opacity" style="background-color: rgba(0,0,0,0.1)" />
                          <span 
                            class="text-xs font-semibold relative z-10"
                            style={{ "color": textColor() }}
                          >
                            {label}
                          </span>
                        </button>
                      );
                    }}
                  </For>
                </div>
                <div class="text-base-content/60 text-xs">{group.name}</div>
              </div>
            )}
          </For>
        </div>

        {/* Placeholder Sections */}
        <h3 class="divider divider-start text-xs">📐 Radius</h3>
        <div class="text-sm opacity-60 italic">Coming soon...</div>

        <h3 class="divider divider-start text-xs">✨ Effects</h3>
        <div class="text-sm opacity-60 italic">Coming soon...</div>

        <h3 class="divider divider-start text-xs">📏 Sizes</h3>
        <div class="text-sm opacity-60 italic">Coming soon...</div>

        <h3 class="divider divider-start text-xs">⚙️ Options</h3>
        <div class="text-sm opacity-60 italic">Coming soon...</div>
      </div>

      {/* Preview - Right Column */}
      <div class="overflow-x-hidden">
        <div class="border-base-300 overflow-hidden border-s border-t md:rounded-ss-xl">
          <div style={`${Object.entries(currentTheme()).filter(([key]) => key.startsWith('--color-')).map(([key, value]) => `${key}:${value}`).join(';')}`}>
            <div classList={{ "max-md:hidden": dockActiveItem() !== "preview" }}>
              <div class="p-8 space-y-4">
                <h3 class="text-lg font-semibold">Preview</h3>
                <div class="grid gap-4">
                  <button class="btn btn-primary">Primary Button</button>
                  <button class="btn btn-secondary">Secondary Button</button>
                  <button class="btn btn-accent">Accent Button</button>
                  <div class="alert alert-info">
                    <span>Info alert with current theme colors</span>
                  </div>
                  <div class="card bg-base-200 p-4">
                    <h4 class="font-semibold">Theme Preview Card</h4>
                    <p class="text-base-content/70">This shows how your theme looks in practice.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      <Show when={showColorPicker()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowColorPicker(false)}>
          <div class="bg-base-100 border rounded-lg p-6 max-w-lg w-full m-4" onClick={(e) => e.stopPropagation()}>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">Select Color</h3>
              <button onClick={() => setShowColorPicker(false)} class="btn btn-ghost btn-sm">✕</button>
            </div>
            <div class="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
              <For each={Object.entries(TAILWIND_COLORS)}>
                {([colorName, colorValue]) => (
                  <button
                    onClick={() => selectColor(colorValue)}
                    class="w-8 h-8 rounded border border-gray-300 hover:border-gray-500 transition-colors relative group"
                    style={{ "background": colorValue }}
                    title={`${colorName}: ${colorValue}`}
                  >
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-10 rounded transition-opacity" style="background-color: rgba(0,0,0,0.1)" />
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
// import { createSignal, onMount, createEffect } from "solid-js";
// import ShowcaseLayout from "../components/ShowcaseLayout";
// import { theme, setTheme } from "../lib/theme";

// export default function Theming() {
//   const [hue, setHue] = createSignal(210);
//   const [saturation, setSaturation] = createSignal(60);

//   onMount(() => {
//     const storedHue = localStorage.getItem("theme-hue");
//     const storedSaturation = localStorage.getItem("theme-saturation");

//     if (storedHue) setHue(+storedHue);
//     if (storedSaturation) setSaturation(+storedSaturation);
//   });

//   createEffect(() => {
//     const h = hue();
//     const s = saturation();

//     document.documentElement.style.setProperty("--hue", h.toString());
//     document.documentElement.style.setProperty("--saturation", `${s}%`);

//     localStorage.setItem("theme-hue", h.toString());
//     localStorage.setItem("theme-saturation", s.toString());
//   });

//   return (
//     <ShowcaseLayout>
//       <div class="grid gap-6 md:grid-cols-3 mt-4">
//         <div>
//           <label class="block mb-1 text-sm font-medium text-[hsl(var(--color-fg-body))]">
//             Hue
//           </label>
//           <div class="flex items-center gap-2">
//             <input
//               type="range"
//               min="0"
//               max="360"
//               value={hue()}
//               onInput={(e) => setHue(+e.currentTarget.value)}
//               class="w-full"
//             />
//             <div class="text-sm mt-1 text-[hsl(var(--color-fg-secondary))]">
//               {hue()}
//             </div>
//           </div>
//         </div>

//         <div>
//           <label class="block mb-1 text-sm font-medium text-[hsl(var(--color-fg-body))]">
//             Saturation
//           </label>
//           <div class="flex items-center gap-2">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={saturation()}
//               onInput={(e) => setSaturation(+e.currentTarget.value)}
//               class="w-full"
//             />
//             <div class="text-sm mt-1 text-[hsl(var(--color-fg-secondary))]">
//               {saturation()}%
//             </div>
//           </div>
//         </div>

//         <div>
//           <button
//             onClick={() => {
//               const next = theme() === "light" ? "dark" : "light";
//               setTheme(next);
//               document.documentElement.dataset.theme = next;
//               localStorage.setItem("theme", next);
//             }}
//             class="inline-flex items-center px-4 py-2 rounded border font-medium text-sm bg-[hsl(var(--color-bg-secondary))] text-[hsl(var(--color-fg-body))]"
//           >
//             {theme() === "light" ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//       </div>
//     </ShowcaseLayout>
//   );
// }

