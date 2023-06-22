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
    <Field className="text-black" name="timeout" as="select">
      {timeoutValues.map((timeoutValue) => (
        <option key={timeoutValue.value} value={timeoutValue.value}>
          {timeoutValue.label}
        </option>
      ))}
    </Field>
  );
};
