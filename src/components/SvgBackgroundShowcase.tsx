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
						<div>
							<div class="mb-2 text-center">
								<h3 class="text-fg-body text-xl font-semibold mb-2">Default SVG Background</h3>
								<p class="text-fg-body/80">Green to blue gradient with default settings</p>
							</div>
							<SvgBackground blurIntensity={15} class="h-48 rounded-lg" />
						</div>
						<CodeBlock
							code={`<SvgBackground class="h-48 rounded-lg" />`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="custom-colors" title="Custom Colors">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<h4 class="font-semibold mb-2 text-center">🌊 Ocean</h4>
								<SvgBackground
									colorStart="#33bbff"
									colorEnd="#0000cc"
									blurIntensity={15}
									class="h-32 rounded-lg"
								/>
							</div>

							<div>
								<h4 class="font-semibold mb-2 text-center">🌅 Sunset</h4>
								<SvgBackground
									colorStart="#ff9933"
									colorEnd="#ff002b"
									blurIntensity={15}
									class="h-32 rounded-lg"
								/>
							</div>

							<div>
								<h4 class="font-semibold mb-2 text-center">🌲 Forest</h4>
								<SvgBackground
									colorStart="#14b814"
									colorEnd="#375c12"
									blurIntensity={15}
									class="h-32 rounded-lg"
								/>
							</div>
						</div>
						<CodeBlock
							code={`<SvgBackground
	colorStart="#33bbff"
	colorEnd="#0000cc"
	class="h-32 rounded-lg"
/>

<SvgBackground
	colorStart="#ff9933"
	colorEnd="#ff002b"
	class="h-32 rounded-lg"
/>`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="opacity-variations" title="Opacity Variations">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div>
								<span class="text-sm font-medium mb-2 block text-center">30% Opacity</span>
								<SvgBackground opacity={0.3} blurIntensity={15} class="h-24 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">50% Opacity</span>
								<SvgBackground opacity={0.5} blurIntensity={15} class="h-24 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">80% Opacity</span>
								<SvgBackground opacity={0.8} blurIntensity={15} class="h-24 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">100% Opacity</span>
								<SvgBackground opacity={1} blurIntensity={15} class="h-24 rounded-lg" />
							</div>
						</div>
						<CodeBlock
							code={`<SvgBackground opacity={0.3} blurIntensity={15} class="h-24 rounded-lg" />
<SvgBackground opacity={0.8} blurIntensity={15} class="h-24 rounded-lg" />
<SvgBackground opacity={1} blurIntensity={15} class="h-24 rounded-lg" />`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="blur-intensity" title="Blur Intensity">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<h4 class="font-semibold mb-2 text-center">No Blur (0)</h4>
								<SvgBackground blurIntensity={0} class="h-32 rounded-lg" />
							</div>
							<div>
								<h4 class="font-semibold mb-2 text-center">Medium Blur (36)</h4>
								<SvgBackground blurIntensity={5} class="h-32 rounded-lg" />
							</div>
							<div>
								<h4 class="font-semibold mb-2 text-center">High Blur (60)</h4>
								<SvgBackground blurIntensity={14} class="h-32 rounded-lg" />
							</div>
						</div>
						<CodeBlock
							code={`<SvgBackground blurIntensity={0} class="h-32 rounded-lg" />
<SvgBackground blurIntensity={36} class="h-32 rounded-lg" />
<SvgBackground blurIntensity={60} class="h-32 rounded-lg" />`}
						/>
					</Flex>
				</ShowcaseSection>

				<ShowcaseSection id="darkness-overlay" title="Darkness Overlay">
					<Flex direction="col" gap="md">
						<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div>
								<span class="text-sm font-medium mb-2 block text-center">No darkness</span>
								<SvgBackground darkness={0} blurIntensity={15} class="h-28 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">30% dark</span>
								<SvgBackground darkness={0.3} blurIntensity={15} class="h-28 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">60% dark</span>
								<SvgBackground darkness={0.6} blurIntensity={15} class="h-28 rounded-lg" />
							</div>
							<div>
								<span class="text-sm font-medium mb-2 block text-center">90% dark</span>
								<SvgBackground darkness={0.9} blurIntensity={15} class="h-28 rounded-lg" />
							</div>
						</div>
						<CodeBlock
							code={`<SvgBackground darkness={0} blurIntensity={15} class="h-28 rounded-lg" />
<SvgBackground darkness={0.3} blurIntensity={15} class="h-28 rounded-lg" />
<SvgBackground darkness={0.6} blurIntensity={15} class="h-28 rounded-lg" />
<SvgBackground darkness={0.9} blurIntensity={15} class="h-28 rounded-lg" />`}
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
	class="min-h-screen w-full"
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