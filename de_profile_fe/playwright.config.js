import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:5175',
  },
  webServer: {
    command: 'npm run dev:test',
    url: 'http://127.0.0.1:5175',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
