/**
 * Validation utilities to ensure theme generation follows Wildbit & chroma.js principles
 */

import { Theme } from "../types/theme";
import {
  validateThemeAccessibility,
  calculateAPCAContrast,
} from "./theme/contrastCalculation";
import { generateRandomMaterialTheme } from "../lib/themeIndex";

/**
 * Validate that a theme follows Wildbit's accessible palette principles
 */
export const validateWildbitPrinciples = (
  theme: Theme
): {
  isValid: boolean;
  violations: string[];
  apcaResults: Record<string, number>;
  recommendations: string[];
} => {
  const validation = validateThemeAccessibility(theme);
  const recommendations: string[] = [];

  // Check if any APCA scores are below Wildbit's recommended 60
  Object.entries(validation.apcaResults).forEach(([pair, score]) => {
    if (score < 60) {
      recommendations.push(
        `${pair}: APCA score ${score.toFixed(
          1
        )} below Wildbit recommendation (60+)`
      );
    }
  });

  // Verify no HSL usage (should all be OKLCH)
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "string" && value.includes("hsl(")) {
      recommendations.push(`${key} uses HSL instead of OKLCH: ${value}`);
    }
  });

  return {
    isValid: validation.isValid && recommendations.length === 0,
    violations: validation.violations,
    apcaResults: validation.apcaResults,
    recommendations,
  };
};

/**
 * Test theme generation compliance with Wildbit principles
 */
export const testThemeGenerationCompliance = (
  iterations = 10
): {
  passRate: number;
  averageAPCAScore: number;
  commonViolations: string[];
} => {
  let passCount = 0;
  let totalAPCAScore = 0;
  let totalAPCAMeasurements = 0;
  const violationCounts: Record<string, number> = {};

  for (let i = 0; i < iterations; i++) {
    const theme = generateRandomMaterialTheme();
    const validation = validateWildbitPrinciples(theme);

    if (validation.isValid) {
      passCount++;
    }

    // Collect APCA scores
    Object.values(validation.apcaResults).forEach((score) => {
      totalAPCAScore += score;
      totalAPCAMeasurements++;
    });

    // Count violations
    validation.violations.forEach((violation) => {
      violationCounts[violation] = (violationCounts[violation] || 0) + 1;
    });
  }

  const commonViolations = Object.entries(violationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([violation]) => violation);

  return {
    passRate: (passCount / iterations) * 100,
    averageAPCAScore: totalAPCAScore / totalAPCAMeasurements,
    commonViolations,
  };
};

/**
 * Generate and validate a theme that strictly follows Wildbit principles
 */
export const generateValidatedTheme = (maxAttempts = 10): Theme | null => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const theme = generateRandomMaterialTheme();
    const validation = validateWildbitPrinciples(theme);

    if (validation.isValid) {
      return theme;
    }
  }

  console.warn(`Could not generate valid theme after ${maxAttempts} attempts`);
  return null;
};
