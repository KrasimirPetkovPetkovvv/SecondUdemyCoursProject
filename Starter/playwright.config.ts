import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [["html", { open: "always" }]],
  webServer: {
    command: "npm start",
    url: "http://localhost:5005/",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:5005/",
    headless: false,
  },
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'], },
  //     dependencies:[
  //       'auth-setup'
  //     ]
  //   },
  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //     dependencies:[
  //       'auth-setup'
  //     ]
  //   },
  //   {
  //     name: 'auth-setup',
  //     testMatch: 'tests/setup/Auth.setup.ts',
  //   }
  // ]
});
