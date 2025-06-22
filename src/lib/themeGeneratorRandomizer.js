
const radiusValues = ["0rem", "0.25rem", "0.5rem", "1rem", "2rem"];
const borderValues = ["1px", "1px", "1px", "1px", "1px", "1px", "1px", "1px", "1.5px", "2px"];
const depthValues = ["0", "1"];
const noiseValues = ["0", "1"];
const sizeValues = ["0.25rem"];

const colorPairs = [
  ["--color-base-100", "--color-base-content"],
  ["--color-base-200", "--color-base-content"],
  ["--color-base-300", "--color-base-content"],
  ["--color-primary", "--color-primary-content"],
  ["--color-secondary", "--color-secondary-content"],
  ["--color-accent", "--color-accent-content"],
  ["--color-neutral", "--color-neutral-content"],
  ["--color-info", "--color-info-content"],
  ["--color-success", "--color-success-content"],
  ["--color-warning", "--color-warning-content"],
  ["--color-error", "--color-error-content"],
];

function parseOKLCH(oklchString) {
  const match = oklchString.match(/oklch\((\d+(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\)/);
  if (match) {
    return {
      l: parseFloat(match[1]),
      c: parseFloat(match[2]),
      h: parseFloat(match[3])
    };
  }
  return { l: 50, c: 0.1, h: 0 }; // fallback
}

function generateContrastColor(backgroundOKLCH) {
  const parsed = parseOKLCH(backgroundOKLCH);
  if (!parsed) return "oklch(0% 0 0)"; // fallback to black
  
  const { l, h } = parsed;
  
  // If background is light (L > 50%), use dark text
  if (l > 50) {
    return `oklch(20% 0.02 ${h || 0})`;
  } else {
    return `oklch(95% 0.02 ${h || 0})`;
  }
}

function selectRandomColor(tailwindcolors) {
  const colorKeys = Object.keys(tailwindcolors);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return tailwindcolors[randomKey];
}

function selectColorFromFamily(tailwindcolors, colorNames, shades) {
  const validColors = Object.entries(tailwindcolors).filter(([name, _]) => {
    const [colorName, shade] = name.split("-");
    return (
      (colorNames.includes(colorName) && shades.includes(shade)) ||
      colorNames.includes(name)
    );
  });
  if (validColors.length === 0) return "oklch(50% 0.1 180)"; // fallback
  return validColors[Math.floor(Math.random() * validColors.length)][1];
}

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomArray(arrays, probability = 0.3) {
  const randomNumber = Math.random();
  if (randomNumber < probability) {
    return arrays[1];
  }
  return arrays[0];
}

function generateWeightedArray(weights) {
  return Object.entries(weights).reduce((arr, [color, weight]) => {
    for (let i = 0; i < weight; i++) {
      arr.push(color);
    }
    return arr;
  }, []);
}

export function randomizeThemeColors(tailwindcolors, colorPairs) {
  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Initialize theme colors object
  const newColors = {
    name: `theme-${Date.now()}`,
  };

  // Determine theme type (light/dark)
  const isDarkTheme = Math.random() > 0.5;

  // Generate colors using the color pairs approach
  for (const [backgroundColorKey, contentColorKey] of colorPairs) {
    if (!newColors[backgroundColorKey]) {
      let selectedColor;

      // Handle base colors specially - they should be from the same family
      if (
        backgroundColorKey.startsWith("--color-base") &&
        !backgroundColorKey.endsWith("-content")
      ) {
        // Get or create the base color family
        let baseColorName = null;

        // Try to find existing base color family from already generated base colors
        for (const [key, value] of Object.entries(newColors)) {
          if (key.startsWith("--color-base-") && !key.endsWith("-content")) {
            const foundEntry = Object.entries(tailwindcolors).find(
              ([_, v]) => v === value
            );
            if (foundEntry) {
              baseColorName = foundEntry[0].split("-")[0];
              break;
            }
          }
        }

        // If no base color family found, select one
        if (!baseColorName) {
          const baseColorFamilies = [
            ["slate", "gray", "zinc", "neutral", "stone"],
            [
              "red",
              "orange",
              "amber",
              "yellow",
              "lime",
              "green",
              "emerald",
              "teal",
              "cyan",
              "sky",
              "blue",
              "indigo",
              "violet",
              "purple",
              "fuchsia",
              "pink",
              "rose",
            ],
          ];
          const baseColorNames = getRandomArray(baseColorFamilies, 0.2); // 80% chance of neutral colors
          baseColorName =
            baseColorNames[Math.floor(Math.random() * baseColorNames.length)];
        }

        // Generate the appropriate base color based on theme and position
        if (isDarkTheme) {
          // Dark theme: darker base colors
          if (backgroundColorKey === "--color-base-100") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["950"]
            );
          } else if (backgroundColorKey === "--color-base-200") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["900"]
            );
          } else if (backgroundColorKey === "--color-base-300") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["800"]
            );
          }
        } else {
          // Light theme: lighter base colors
          if (backgroundColorKey === "--color-base-100") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["50"]
            );
          } else if (backgroundColorKey === "--color-base-200") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["100"]
            );
          } else if (backgroundColorKey === "--color-base-300") {
            selectedColor = selectColorFromFamily(
              tailwindcolors,
              [baseColorName],
              ["200"]
            );
          }
        }
      }
      // Handle semantic colors with appropriate color families
      else if (backgroundColorKey === "--color-info") {
        const semanticShade = randomFrom(["400", "500", "600"]);
        selectedColor = selectColorFromFamily(
          tailwindcolors,
          ["cyan", "sky", "blue"],
          [semanticShade]
        );
      } else if (backgroundColorKey === "--color-success") {
        const semanticShade = randomFrom(["400", "500", "600"]);
        selectedColor = selectColorFromFamily(
          tailwindcolors,
          ["lime", "green", "emerald", "teal"],
          [semanticShade]
        );
      } else if (backgroundColorKey === "--color-warning") {
        const semanticShade = randomFrom(["400", "500", "600"]);
        selectedColor = selectColorFromFamily(
          tailwindcolors,
          ["yellow", "amber", "orange"],
          [semanticShade]
        );
      } else if (backgroundColorKey === "--color-error") {
        const semanticShade = randomFrom(["400", "500", "600"]);
        selectedColor = selectColorFromFamily(
          tailwindcolors,
          ["red", "pink", "rose"],
          [semanticShade]
        );
      }
      // Handle brand colors (primary, secondary, accent, neutral)
      else if (
        backgroundColorKey.match(/^--color-(primary|secondary|accent|neutral)$/)
      ) {
        const brandShades = randomFrom(["300", "400", "500", "600"]);
        const brandColorWeights = {
          amber: 3,
          black: 5,
          blue: 4,
          cyan: 2,
          emerald: 3,
          fuchsia: 1,
          gray: 1,
          green: 3,
          indigo: 4,
          lime: 3,
          neutral: 1,
          orange: 3,
          pink: 3,
          purple: 3,
          red: 3,
          rose: 1,
          sky: 2,
          slate: 1,
          stone: 1,
          teal: 3,
          violet: 3,
          yellow: 3,
          zinc: 1,
        };

        if (backgroundColorKey === "--color-neutral") {
          // Neutral should match base color family but in middle range
          const baseColorName =
            Object.entries(tailwindcolors)
              .find(
                ([_, value]) =>
                  value === newColors["--color-base-100"] ||
                  value === newColors["--color-base-200"] ||
                  value === newColors["--color-base-300"]
              )?.[0]
              ?.split("-")[0] || "gray";
          selectedColor = selectColorFromFamily(
            tailwindcolors,
            [baseColorName],
            ["600", "700", "800"]
          );
        } else {
          const availableColors = generateWeightedArray(brandColorWeights);
          const shuffledColors = shuffle(availableColors);
          const colorName = shuffledColors[0];
          selectedColor = selectColorFromFamily(
            tailwindcolors,
            [colorName],
            [brandShades]
          );
        }
      } else {
        // Fallback: select any random color
        selectedColor = selectRandomColor(tailwindcolors);
      }

      newColors[backgroundColorKey] = selectedColor;
    }

    // Generate content color only if not already set
    if (!newColors[contentColorKey]) {
      // Special handling for base-content: it should contrast with base-100 (primary background)
      if (contentColorKey === "--color-base-content") {
        const base100Color =
          newColors["--color-base-100"] || newColors[backgroundColorKey];
        newColors[contentColorKey] = generateContrastColor(base100Color);
      } else {
        newColors[contentColorKey] = generateContrastColor(
          newColors[backgroundColorKey]
        );
      }
    }
  }

  newColors["--radius-selector"] = randomFrom(radiusValues);
  newColors["--radius-field"] = randomFrom(radiusValues);
  newColors["--radius-box"] = randomFrom(radiusValues);
  newColors["--size-selector"] = randomFrom(sizeValues);
  newColors["--size-field"] = randomFrom(sizeValues);
  newColors["--border"] = randomFrom(borderValues);
  newColors["--depth"] = randomFrom(depthValues);
  newColors["--noise"] = randomFrom(noiseValues);

  return newColors;
}