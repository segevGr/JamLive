import { test, expect } from "@playwright/test";

test("Frontend loads homepage", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle("Login - JamLive");
});
