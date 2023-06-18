import { type ChangeEventHandler } from "react";

type CurlInputProps = {
  placeholder: string;
  curlRequest: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const CurlInput = ({
  placeholder,
  curlRequest,
  onChange,
}: CurlInputProps) => {
  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      value={curlRequest}
      className="m-4 h-[80vh] w-10/12 resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
