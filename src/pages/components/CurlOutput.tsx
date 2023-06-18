type CurlOutputProps = {
  placeholder: string;
  curlRequestOutput: string;
};

export const CurlOutput = ({
  placeholder,
  curlRequestOutput,
}: CurlOutputProps) => {
  return (
    <textarea
      placeholder={placeholder}
      value={curlRequestOutput}
      contentEditable={false}
      disabled={true}
      className="m-4 h-[80vh] w-10/12 resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
