import { type ChangeEventHandler } from "react";

type PasteInputProps = {
  placeholder: string;
  pasteContents: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const PasteInput = ({
  placeholder,
  pasteContents,
  onChange,
}: PasteInputProps) => {
  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      value={pasteContents}
      className="m-4 h-[80vh] w-10/12 resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
