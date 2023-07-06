import { Field } from "formik";
import { useEffect } from "react";

interface PasteFieldProps {
  isEditable: boolean;
  placeholder: string;
}

export const PasteField = ({ isEditable, placeholder }: PasteFieldProps) => {
  useEffect(() => {
    document.getElementById("pasteContents")?.focus();
  }, []);

  return (
    <Field
      placeholder={placeholder}
      id="pasteContents"
      name="pasteContents"
      as="textarea"
      className="mt-4 h-[70vh] w-full cursor-text resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-400 md:m-4 md:h-[80vh]"
      disabled={!isEditable}
      title={isEditable ? "" : "Not editable"}
    />
  );
};
