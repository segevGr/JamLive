import { test, expect } from "@playwright/test";

test("Frontend ↔ Backend basic login flow works", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[name="userName"]', "fake-user");
  await page.fill('input[name="password"]', "wrong-password");

  const [request] = await Promise.all([
    page.waitForRequest(
      (req) => req.method() === "POST" && req.url().includes("/auth/login")
    ),
    page.click('button[type="submit"]'),
  ]);

  const response = await request.response();
  expect(response?.status()).toBe(401);
});
