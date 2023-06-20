import { Field } from "formik";

export const OptionsModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10">
      {}
      <div className="rounded-xl bg-white p-4">
        <h3 className="text-1xl font-bold">Options</h3>
        <div className="flex flex-col gap-2">
          <label className="flex text-black">
            <Field
              type="checkbox"
              name="copyLinkToClipboard"
              id="copyLinkToClipboard"
              className="mr-2"
            />
            Copy Link to clipboard
            <span className="ml-5 font-extralight">(1)</span>
          </label>
          <label className="flex text-black">
            <Field
              type="checkbox"
              name="isEditable"
              id="isEditable"
              className="mr-2"
            />
            Editable
            <span className="ml-auto font-extralight">(2)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
