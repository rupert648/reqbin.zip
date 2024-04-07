import { Field } from "formik";
import { timeoutValues } from "~/constants/timeout-values";

interface TimeoutDropdownProps {
  hasTimeout: boolean;
}

export const TimeoutDropdown = ({ hasTimeout }: TimeoutDropdownProps) => {
  if (!hasTimeout) {
    return null;
  }
  return (
    <Field
      className="text-blac rounded-lg border border-gray-300 bg-white p-2 hover:bg-black/5"
      name="timeout"
      as="select"
      data-testid="timeout-dropdown"
    >
      {timeoutValues.map((timeoutValue) => (
        <option key={timeoutValue.value} value={timeoutValue.value}>
          {timeoutValue.label}
        </option>
      ))}
    </Field>
  );
};
