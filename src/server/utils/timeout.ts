export const hasTimedOut = (timeoutDate: Date | null): boolean => {
  if (!timeoutDate) {
    return false;
  }

  const now = new Date();
  return now > timeoutDate;
};
