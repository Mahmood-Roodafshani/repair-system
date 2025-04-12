/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_WORK_WITH_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 