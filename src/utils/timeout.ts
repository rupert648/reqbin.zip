import { type TimeoutValue } from "~/constants/timeout-values";

export const calculateTimeoutDate = (timeout: TimeoutValue["value"]) => {
  const now = new Date();
  return new Date(now.getTime() + timeout * 1000);
};
