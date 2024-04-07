import { type TimeoutValuesValues } from "~/constants/timeout-values";

export const calculateTimeoutDate = (timeout: TimeoutValuesValues) => {
  const now = new Date();
  return new Date(now.getTime() + timeout * 1000);
};
