import { test, expect } from "@playwright/test";

test("Backend health check", async ({ request }) => {
  const res = await request.get("http://localhost:8000/users");
  expect(res.status()).toBe(401);
});
