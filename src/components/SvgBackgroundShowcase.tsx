import { Flex, SvgBackground } from "@pathscale/ui";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import ShowcaseLayout from "./ShowcaseLayout";

export default function SvgBackgroundShowcase() {
	const sections = [
		{ id: "default", title: "Default" },
		{ id: "custom-colors", title: "Custom Colors" },
		{ id: "opacity-variations", title: "Opacity Variations" },
		{ id: "blur-intensity", title: "Blur Intensity" },
		{ id: "turbulence-effects", title: "Turbulence Effects" },
		{ id: "animated", title: "Animated Backgrounds" },
		{ id: "darkness-overlay", title: "Darkness Overlay" },
		{ id: "preset-themes", title: "Preset Themes" },
		{ id: "full-screen", title: "Full Screen Usage" },
		{ id: "props", title: "Props" },
	] as const;

	const svgBackgroundProps = [
		{
			name: "colorStart",
			type: "string",
			default: '"hsl(129, 100%, 72%)"',
			description: "Primary gradient color (CSS color value)",
		},
		{
			name: "colorEnd",
			type: "string",
			default: '"hsl(227, 100%, 50%)"',
			description: "Secondary gradient color (CSS color value)",
		},
		{
			name: "opacity",
			type: "number",
			default: "1",
			description: "Background opacity (0-1)",
		},
		{
			name: "blurIntensity",
			type: "number",
			default: "36",
			description: "Blur intensity (0-100)",
		},
		{
			name: "turbulenceFrequency",
			type: "number",
			default: "0.007",
			description: "Turbulence frequency for noise effect",
		},
		{
			name: "animated",
			type: "boolean",
			default: "false",
			description: "Enable smooth lava lamp-like animation",
		},
		{
			name: "animationSpeed",
			type: "number",
			default: "1",
			description: "Animation speed multiplier",
		},
		{
			name: "darkness",
			type: "number",
			default: "0",
			description: "Darkness overlay (0 = fully light, 1 = fully dark)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "style",
			type: "JSX.CSSProperties",
			description: "Additional inline styles",
		},
		{
			name: "children",
			type: "JSX.Element",
			description: "Children to render on top of background",
		},
	];

	return (
		<ShowcaseLayout>
			<div class="space-y-4">
				<ShowcaseSection id="contents" title="Contents">
					<nav class="space-y-1">
						{sections.map((section) => (
							<a
								href={`#${section.id}`}
								class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
							>
								{section.title}
							</a>
						))}
					</nav>
				</ShowcaseSection>

				<ShowcaseSection id="default" title="Default">
					<Flex direction="col" gap="md">
						<SvgBackground class="h-48 rounded-lg">
							<div class="p-6 text-center">
								<h3 class="text-fg-body text-xl font-semibold mb-2">Default SVG Background</h3>
								<p class="text-fg-body/80">Green to blue gradient with default settings</p>
							</div>
						</SvgBackground>
						<CodeBlock
							code={`<SvgBackground class="h-48 rounded-lg">
	<div class="p-6 text-center">
		<h3 class="text-fg-body text-xl font-semibold">Content</h3>
	</div>
</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="custom-colors" title="Custom Colors">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<SvgBackground
								colorStart="hsl(200, 100%, 60%)"
								colorEnd="hsl(240, 100%, 40%)"
								class="h-32 rounded-lg"
							>
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">🌊 Ocean</h4>
								</div>
							</SvgBackground>

							<SvgBackground
								colorStart="hsl(30, 100%, 60%)"
								colorEnd="hsl(350, 100%, 50%)"
								class="h-32 rounded-lg"
							>
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">🌅 Sunset</h4>
								</div>
							</SvgBackground>

							<SvgBackground
								colorStart="hsl(120, 80%, 40%)"
								colorEnd="hsl(90, 60%, 30%)"
								class="h-32 rounded-lg"
							>
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">🌲 Forest</h4>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground
	colorStart="hsl(200, 100%, 60%)"
	colorEnd="hsl(240, 100%, 40%)"
>
	<div class="p-4 text-center text-fg-body">Ocean Theme</div>
</SvgBackground>

<SvgBackground
	colorStart="hsl(30, 100%, 60%)"
	colorEnd="hsl(350, 100%, 50%)"
>
	<div class="p-4 text-center text-fg-body">Sunset Theme</div>
</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="opacity-variations" title="Opacity Variations">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
							<SvgBackground opacity={0.3} class="h-24 rounded-lg">
								<div class="p-3 text-center">
									<span class="text-sm font-medium">30%</span>
								</div>
							</SvgBackground>
							<SvgBackground opacity={0.5} class="h-24 rounded-lg">
								<div class="p-3 text-center">
									<span class="text-sm font-medium text-fg-body">50%</span>
								</div>
							</SvgBackground>
							<SvgBackground opacity={0.8} class="h-24 rounded-lg">
								<div class="p-3 text-center">
									<span class="text-sm font-medium text-fg-body">80%</span>
								</div>
							</SvgBackground>
							<SvgBackground opacity={1} class="h-24 rounded-lg">
								<div class="p-3 text-center">
									<span class="text-sm font-medium text-fg-body">100%</span>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground opacity={0.3}>Low opacity</SvgBackground>
<SvgBackground opacity={0.8}>High opacity</SvgBackground>
<SvgBackground opacity={1}>Full opacity</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="blur-intensity" title="Blur Intensity">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<SvgBackground blurIntensity={10} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">Low Blur (10)</h4>
								</div>
							</SvgBackground>
							<SvgBackground blurIntensity={36} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">Medium Blur (36)</h4>
								</div>
							</SvgBackground>
							<SvgBackground blurIntensity={60} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">High Blur (60)</h4>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground blurIntensity={10}>Low blur</SvgBackground>
<SvgBackground blurIntensity={36}>Medium blur</SvgBackground>
<SvgBackground blurIntensity={60}>High blur</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="turbulence-effects" title="Turbulence Effects">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<SvgBackground turbulenceFrequency={0.003} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">Smooth (0.003)</h4>
								</div>
							</SvgBackground>
							<SvgBackground turbulenceFrequency={0.007} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">Normal (0.007)</h4>
								</div>
							</SvgBackground>
							<SvgBackground turbulenceFrequency={0.015} class="h-32 rounded-lg">
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">Intense (0.015)</h4>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground turbulenceFrequency={0.003}>Smooth</SvgBackground>
<SvgBackground turbulenceFrequency={0.007}>Normal</SvgBackground>
<SvgBackground turbulenceFrequency={0.015}>Intense</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="animated" title="Animated Backgrounds">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<SvgBackground
								animated={true}
								animationSpeed={9}
								colorStart="hsl(200, 100%, 60%)"
								colorEnd="hsl(240, 100%, 40%)"
								class="h-40 rounded-lg"
							>
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">🌊 Animated Ocean</h4>
									<p class="text-sm opacity-80">Smooth flowing animation</p>
								</div>
							</SvgBackground>

							<SvgBackground
								animated={true}
								animationSpeed={9}
								colorStart="hsl(280, 100%, 70%)"
								colorEnd="hsl(180, 100%, 60%)"
								class="h-40 rounded-lg"
							>
								<div class="p-4 text-center text-fg-body">
									<h4 class="font-semibold">🌌 Aurora</h4>
									<p class="text-sm opacity-80">Mystical color shifts</p>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground
	animated={true}
	animationSpeed={9}
	colorStart="hsl(200, 100%, 60%)"
	colorEnd="hsl(240, 100%, 40%)"
>
	<div class="text-fg-body">Animated content</div>
</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="darkness-overlay" title="Darkness Overlay">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
							<SvgBackground darkness={0} class="h-28 rounded-lg">
								<div class="p-3 text-center text-fg-body">
									<span class="text-sm font-medium">No darkness</span>
								</div>
							</SvgBackground>
							<SvgBackground darkness={0.3} class="h-28 rounded-lg">
								<div class="p-3 text-center text-fg-body">
									<span class="text-sm font-medium">30% dark</span>
								</div>
							</SvgBackground>
							<SvgBackground darkness={0.6} class="h-28 rounded-lg">
								<div class="p-3 text-center text-fg-body">
									<span class="text-sm font-medium">60% dark</span>
								</div>
							</SvgBackground>
							<SvgBackground darkness={0.9} class="h-28 rounded-lg">
								<div class="p-3 text-center text-fg-body">
									<span class="text-sm font-medium">90% dark</span>
								</div>
							</SvgBackground>
						</div>
						<CodeBlock
							code={`<SvgBackground darkness={0}>No darkness</SvgBackground>
<SvgBackground darkness={0.3}>Light overlay</SvgBackground>
<SvgBackground darkness={0.6}>Medium overlay</SvgBackground>
<SvgBackground darkness={0.9}>Dark overlay</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="full-screen" title="Full Screen Usage">
					<Flex direction="col" gap="md">
						<div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
							<p>For full-screen backgrounds, use min-h-screen class and place your entire app content inside:</p>
						</div>
						<CodeBlock
							code={`<SvgBackground
	class="min-h-screen"
	animated={true}
	darkness={0.3}
	colorStart="hsl(240, 100%, 60%)"
	colorEnd="hsl(280, 100%, 50%)"
>
	<div class="container mx-auto p-8">
		<header>Your Header</header>
		<main>Your Main Content</main>
		<footer>Your Footer</footer>
	</div>
</SvgBackground>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="props" title="Props">
					<PropsTable props={svgBackgroundProps} />
				</ShowcaseSection>
			</div>
		</ShowcaseLayout>
	);
} 