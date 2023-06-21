import { Field } from "formik";

interface PasteFieldProps {
  isEditable: boolean;
  placeholder: string;
}

export const PasteField = ({ isEditable, placeholder }: PasteFieldProps) => {
  return (
    <Field
      placeholder={placeholder}
      id="pasteContents"
      name="pasteContents"
      as="textarea"
      className="m-4 h-[80vh] w-full cursor-text resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
      disabled={!isEditable}
      title={isEditable ? "" : "Not editable"}
    />
  );
};
