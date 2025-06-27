/**
 * Theme system type definitions
 */

export interface Theme {
  name: string;
  [key: string]: string;
}

export interface ColorPalette {
  [colorName: string]: string; // Color name -> OKLCH value
}

export interface ColorFamily {
  name: string;
  shades: string[];
}

export interface ColorPair {
  background: string; // CSS variable name like "--color-primary"
  content: string;    // CSS variable name like "--color-primary-content"
}

export interface ColorGroup {
  name: string;
  colors: string[];
}

export interface BrandColorWeights {
  [colorName: string]: number;
}

export interface ThemeGenerationOptions {
  forceDarkTheme?: boolean;
  forceLightTheme?: boolean;
  baseColorFamily?: string;
  brandColorWeights?: BrandColorWeights;
  preferredShades?: string[];
}

export interface AccessibilityOptions {
  minContrastRatio?: number; // Default: 4.5 (WCAG AA)
  maxAttempts?: number;      // Default: 10
}

export type ColorType = 
  | 'base'
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'neutral'
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error';

export type ThemeType = 'light' | 'dark';

export type ShadeLevel = 
  | '50' | '100' | '200' | '300' | '400' 
  | '500' | '600' | '700' | '800' | '900';