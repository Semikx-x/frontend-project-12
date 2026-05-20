import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:5000' 
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:5000',
  },
})