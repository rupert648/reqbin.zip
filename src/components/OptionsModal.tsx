import { Field } from "formik";
import { TimeoutDropdown } from "./TimeoutDropdown";
import { CrossIcon } from "./icons/CrossIcon";
import { type Dispatch, type SetStateAction } from "react";
interface OptionsModalProps {
  hasTimeout: boolean;
  setShowOptionsModal: Dispatch<SetStateAction<boolean>>;
}

export const OptionsModal = ({
  hasTimeout,
  setShowOptionsModal,
}: OptionsModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 drop-shadow-xl">
      <div className="rounded-xl bg-white p-4">
        <div className="flex">
          <h3 className="mb-1 text-2xl font-bold">Options</h3>
          <button
            onClick={() => setShowOptionsModal(false)}
            className="ml-auto mr-0"
            data-testid="close-options-modal"
          >
            <CrossIcon
              className=" cursor-pointer rounded-full border-gray-400 hover:bg-gray-200"
              height={25}
            />
          </button>
        </div>
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
