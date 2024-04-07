import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("index page", () => {
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/ReqBin\.zip/);
  });
});
