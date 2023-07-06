import { Field } from "formik";
import { TimeoutDropdown } from "./TimeoutDropdown";
interface OptionsModalProps {
  hasTimeout: boolean;
}

export const OptionsModal = ({ hasTimeout }: OptionsModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 drop-shadow-xl">
      <div className="rounded-xl bg-white p-4">
        <h3 className="mb-1 text-2xl font-bold">Options</h3>
        <hr className="mb-2 border-orange-400" />
        <div className="flex flex-col gap-2">
          <label className="flex text-black">
            <span className="mr-2 font-extralight">(1)</span>
            <span className="mr-5">Copy Link to Clipboard</span>
            <Field
              type="checkbox"
              name="copyLinkToClipboard"
              id="copyLinkToClipboard"
              className="ml-auto"
            />
          </label>
          <label className="flex text-black">
            <span className="mr-2 font-extralight">(2)</span>
            Editable
            <Field
              type="checkbox"
              name="isEditable"
              id="isEditable"
              className="ml-auto"
            />
          </label>
          <label className="flex text-black">
            <span className="mr-2 font-extralight">(3)</span>
            Has Timeout?
            <Field
              type="checkbox"
              name="hasTimeout"
              id="hasTimeeout"
              className="ml-auto"
            />
          </label>
          <TimeoutDropdown hasTimeout={hasTimeout} />
        </div>
      </div>
    </div>
  );
};
