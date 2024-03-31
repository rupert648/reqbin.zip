import type { Page } from "playwright";
import type { TimeoutValuesLabels } from "~/constants/timeout-values";

type SelectOptionArgs =
  | {
    selection: "editable" | "copyLinkToClipboard";
  }
  | {
    selection: "hasTimeout";
    timeoutDuration: TimeoutValuesLabels;
  };

export const selectOption = async (page: Page, option: SelectOptionArgs) => {
  const optionsSelector = page.getByRole("button", { name: "Options (⌘K)" });
  await optionsSelector.click();
  switch (option.selection) {
    case "editable":
      const editableOption = page.getByLabel("(2)Editable");
      await editableOption.check();
      break;
    case "hasTimeout":
      const hasTimeoutOption = page.getByLabel("(3)Has Timeout?");
      await hasTimeoutOption.check();
      break;
    case "copyLinkToClipboard":
      const copyLinkToClipboardOption = page.getByLabel(
        "(1)Copy Link to Clipboard"
      );
      await copyLinkToClipboardOption.check();
      break;
  }
  await page.getByTestId("close-options-modal").click();
};
