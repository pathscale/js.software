import { Component } from "solid-js";
import { config } from "../config";

export const Footer: Component = () => {
  return (
    <footer class="fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>Version {config.version}</p>
    </footer>
  );
};
