import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (!url.startsWith("http://localhost")) {
      const newUrl = url.replace(/^https:\/\/[^/]+/, "http://localhost:8000");
      route.fallback({ url: newUrl });
    } else {
      route.fallback();
    }
  });
});

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
