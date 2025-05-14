export default function Home() {
  return (
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-6">Welcome to UI Components</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
        This is a showcase of our UI component library built with SolidJS and
        TailwindCSS. Browse through the components using the sidebar navigation.
      </p>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-2">Modern Design</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Clean, minimal, and responsive components built for modern web
            applications.
          </p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-2">Customizable</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Easily customize components using TailwindCSS utility classes and
            themes.
          </p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-2">TypeScript Ready</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Built with TypeScript for better development experience and type
            safety.
          </p>
        </div>
      </div>
    </div>
  );
}
