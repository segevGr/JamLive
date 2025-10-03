import { test, expect } from "@playwright/test";

test("Frontend ↔ Backend basic login flow works", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[name="userName"]', "fake-user");
  await page.fill('input[name="password"]', "wrong-password");

  const response = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("/auth/login") && res.request().method() === "POST"
    ),
    page.click('button[type="submit"]'),
  ]).then(([res]) => res);

  expect(response.status()).toBe(401);
});
