import { test, expect } from "@playwright/test";
import { selectors } from "./selectors";
import { selectOption } from "./util/select-option";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("timeout", () => {
  test("should be able to set a timeout for the paste bin", async ({
    page,
  }) => {
    await selectors.pasteContentsTextArea(page).fill("Hello, world!");
    const createPasteBinButton = selectors.createPasteBinButton(page);
    await selectOption(page, {
      selection: "hasTimeout",
      timeoutDuration: "10 seconds",
    });
    await createPasteBinButton.click();

    await expect(selectors.pasteObjectIDString(page)).toBeVisible();
    await expect(selectors.timerTimeoutString(page)).toBeVisible();
    await page.waitForTimeout(11000);
    await page.reload();
    await expect(selectors.pasteObjectIDString(page)).not.toBeVisible();
    await expect(selectors.timerTimeoutString(page)).not.toBeVisible();
    await expect(selectors._404PageText(page)).toBeVisible();
  });
});
