import { defineConfig } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  testDir: path.join(__dirname, "tests"),
  outputDir: path.join(__dirname, "test-results"),
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: "http://localhost",
    headless: true,
  },
});
