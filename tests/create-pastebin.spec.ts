import { test, expect } from "@playwright/test";
import { selectOption } from "./util/select-option";
import { selectors } from "./selectors";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("creating a reqbin", () => {
  test("should be able to create a standard reqbin", async ({ page }) => {
    await selectors.pasteContentsTextArea(page).fill("Hello, world!");
    const createPasteBinButton = selectors.createPasteBinButton(page);
    await createPasteBinButton.click();
    await expect(selectors.pasteObjectIDString(page)).toBeVisible();
    expect(page.getByText("Hello, world!")).toBeDefined();
  });

  test.describe("options", () => {
    test("default options", async ({ page }) => {
      await selectors.pasteContentsTextArea(page).fill("Hello, world!");
      const optionsSelector = selectors.optionsButton(page);
      await optionsSelector.click();
      const editableOption = page.getByLabel("(2)Editable");
      const hasTimeoutOption = page.getByLabel("(3)Has Timeout?");
      const copyLinkToClipboardOption = page.getByLabel(
        "(1)Copy Link to Clipboard"
      );

      expect(editableOption).toBeDefined();
      expect(hasTimeoutOption).toBeDefined();
      expect(copyLinkToClipboardOption).toBeDefined();

      await expect(editableOption).not.toBeChecked();
      await expect(hasTimeoutOption).not.toBeChecked();
      await expect(copyLinkToClipboardOption).toBeChecked();
    });

    test("should not be able to edit the paste bin once its created by default", async ({
      page,
    }) => {
      await selectors.pasteContentsTextArea(page).fill("Hello, world!");
      const createPasteBinButton = selectors.createPasteBinButton(page);
      await createPasteBinButton.click();

      await expect(selectors.pasteObjectIDString(page)).toBeVisible();
      const inputBox = page.getByText("Hello, world!");
      expect(inputBox).toBeDefined();
      await expect(inputBox).toBeDisabled();
      await expect(selectors.saveContentsButton(page)).toBeDisabled();
    });

    test('should be able to edit the paste bin if the "editable" option is set', async ({
      page,
    }) => {
      await selectors.pasteContentsTextArea(page).fill("Hello, world!");
      const createPasteBinButton = selectors.createPasteBinButton(page);
      await selectOption(page, { selection: "editable" });
      await createPasteBinButton.click();

      await expect(selectors.pasteObjectIDString(page)).toBeVisible();
      const inputBox = page.getByText("Hello, world!");
      expect(inputBox).toBeDefined();
      await expect(inputBox).toBeEnabled();

      await inputBox.fill("Hello, world! Edited");

      await selectors.saveContentsButton(page).click();
      await page.reload();
      await expect(selectors.pasteObjectIDString(page)).toBeVisible();
      const newInputBox = page.getByText("Hello, world! Edited");
      expect(newInputBox).toBeDefined();
      await expect(newInputBox).toBeEnabled();
    });
  });
});
