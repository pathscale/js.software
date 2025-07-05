/// <reference types="@rsbuild/core/types" />

declare module 'prismjs';

interface ImportMetaEnv {
  readonly VERSION: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}