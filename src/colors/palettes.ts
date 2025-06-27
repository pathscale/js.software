/**
 * Color palette configurations and utilities
 */

import { ColorPair, ColorGroup, BrandColorWeights } from '../types/theme';

/**
 * DaisyUI color pairs - background and their corresponding content colors
 */
export const COLOR_PAIRS: ColorPair[] = [
  { background: "--color-base-100", content: "--color-base-content" },
  { background: "--color-base-200", content: "--color-base-content" },
  { background: "--color-base-300", content: "--color-base-content" },
  { background: "--color-primary", content: "--color-primary-content" },
  { background: "--color-secondary", content: "--color-secondary-content" },
  { background: "--color-accent", content: "--color-accent-content" },
  { background: "--color-neutral", content: "--color-neutral-content" },
  { background: "--color-info", content: "--color-info-content" },
  { background: "--color-success", content: "--color-success-content" },
  { background: "--color-warning", content: "--color-warning-content" },
  { background: "--color-error", content: "--color-error-content" },
];

/**
 * Color groups for theme organization
 */
export const COLOR_GROUPS: ColorGroup[] = [
  {
    name: "base",
    colors: [
      "--color-base-100",
      "--color-base-200", 
      "--color-base-300",
      "--color-base-content",
    ],
  },
  { 
    name: "primary", 
    colors: ["--color-primary", "--color-primary-content"] 
  },
  {
    name: "secondary",
    colors: ["--color-secondary", "--color-secondary-content"],
  },
  { 
    name: "accent", 
    colors: ["--color-accent", "--color-accent-content"] 
  },
  { 
    name: "neutral", 
    colors: ["--color-neutral", "--color-neutral-content"] 
  },
  { 
    name: "info", 
    colors: ["--color-info", "--color-info-content"] 
  },
  { 
    name: "success", 
    colors: ["--color-success", "--color-success-content"] 
  },
  { 
    name: "warning", 
    colors: ["--color-warning", "--color-warning-content"] 
  },
  { 
    name: "error", 
    colors: ["--color-error", "--color-error-content"] 
  },
];

/**
 * Default brand color weights for theme generation
 * Higher numbers = more likely to be selected
 */
export const DEFAULT_BRAND_COLOR_WEIGHTS: BrandColorWeights = {
  // Highly professional and versatile
  "deep-purple": 4,
  "blue": 4,
  "indigo": 4,
  
  // Good balance of professional and friendly
  "light-blue": 3,
  "teal": 3,
  "green": 3,
  "light-green": 3,
  "blue-gray": 3,
  
  // Warm and approachable
  "amber": 3,
  "orange": 3,
  "red": 3,
  "pink": 3,
  "purple": 3,
  "violet": 3,
  "cyan": 2,
  
  // More specialized use cases
  "deep-orange": 2,
  "brown": 2,
  "lime": 2,
  "yellow": 2,
  
  // Neutral (lower weight as they're handled separately for base colors)
  "gray": 1,
};

/**
 * Shade preferences for different color types
 */
export const SHADE_PREFERENCES = {
  // Light theme shades
  light: {
    base: ["50", "100", "200"],
    brand: ["400", "500", "600"],
    semantic: ["400", "500", "600"],
    neutral: ["600", "700", "800"]
  },
  
  // Dark theme shades  
  dark: {
    base: ["700", "800", "900"],
    brand: ["400", "500", "600"],
    semantic: ["400", "500", "600"], 
    neutral: ["300", "400", "500"]
  }
} as const;

/**
 * Base color family preferences
 * First array has higher probability of selection
 */
export const BASE_COLOR_FAMILIES = [
  // Neutral families (70% probability)
  ["gray", "blue-gray"],
  
  // Colorful families (30% probability)
  [
    "red", "pink", "purple", "deep-purple", "indigo", "blue", 
    "light-blue", "cyan", "teal", "green", "light-green", 
    "lime", "yellow", "amber", "orange", "deep-orange", "brown"
  ]
] as const;

/**
 * Radius values for theme generation
 */
export const RADIUS_VALUES = ["0rem", "0.25rem", "0.5rem", "1rem", "2rem"];

/**
 * Border values for theme generation
 */
export const BORDER_VALUES = ["1px", "1px", "1px", "1px", "1px", "1px", "1px", "1px", "1.5px", "2px"];

/**
 * Other theme property values
 */
export const THEME_PROPERTY_VALUES = {
  depth: ["0", "1"],
  noise: ["0", "1"], 
  size: ["0.25rem"],
} as const;