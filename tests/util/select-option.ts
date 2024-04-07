import type { Page } from "playwright";
import { selectors } from "tests/selectors";
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
  const optionsSelector = selectors.optionsButton(page);
  await optionsSelector.click();
  switch (option.selection) {
    case "editable":
      const editableOption = page.getByLabel("(2)Editable");
      await editableOption.check();
      break;
    case "hasTimeout":
      const hasTimeoutOption = page.getByLabel("(3)Has Timeout?");
      await hasTimeoutOption.check();
      const timeoutDropdown = selectors.optionsTimeoutDropdown(page);
      await timeoutDropdown.selectOption({ label: option.timeoutDuration });
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
