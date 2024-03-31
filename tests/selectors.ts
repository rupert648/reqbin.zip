import type { Page } from "playwright";
export const selectors = {
  createPasteBinButton: (page: Page) =>
    page.getByTestId("create-paste-bin-button"),
  pasteObjectIDString: (page: Page) =>
    page.getByTestId("paste-object-id-string"),
  optionsButton: (page: Page) => page.getByTestId("options-button"),
  pasteContentsTextArea: (page: Page) =>
    page.getByTestId("paste-contents-textarea"),
  saveContentsButton: (page: Page) =>
    page.getByTestId("save-paste-contents-button"),
  optionsTimeoutDropdown: (page: Page) => page.getByTestId("timeout-dropdown"),
  timerTimeoutString: (page: Page) => page.getByTestId("timer-timeout-string"),
  _404PageText: (page: Page) => page.getByText("Paste Bin Not found 🧐"),
};
