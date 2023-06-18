import { useRouter } from "next/router";
import { CurlInput } from "./components/CurlInput";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { useState } from "react";
import { CurlOutput } from "./components/CurlOutput";

export default function CurlRequestPage() {
  const [curlRequestState, setCurlRequestState] =
    useState<RouterOutputs["curl"]["getCurl"]>();

  const utils = api.useContext();
  const router = useRouter();
  const { curlRequestId } = router.query;
  const { data, isLoading, error } = api.curl.getCurl.useQuery(
    {
      curlRequestId: curlRequestId as string,
    },
    {
      onSuccess: (data) => {
        // copy resulting value into state
        setCurlRequestState(data);
      },
      staleTime: Infinity,
    }
  );
  const { mutate: updateCurl } = api.curl.updateCurl.useMutation({
    onSuccess(data) {
      void utils.curl.getCurl.invalidate({ curlRequestId: data.curlId });
    },
  });

  const saveCurl = () => {
    updateCurl({
      curlRequestId: curlRequestId as string,
      curlRequest: curlRequestState?.curlRequest ?? "",
    });
  };

  if (typeof curlRequestId !== "string") {
    // TODO: 404 page
    return <p>404</p>;
  }

  if (error) {
    // TODO: error page
    return <p>There was an error</p>;
  }

  const curlInputOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurlRequestState({
      isEditable: curlRequestState?.isEditable ?? false,
      curlRequest: event.target.value,
    });
  };
  console.log({ isEditable: data?.isEditable });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex  justify-center ">
        <div className=" w-1/3">
          <CurlInput
            placeholder={isLoading ? "Loading..." : ""}
            curlRequest={curlRequestState?.curlRequest ?? ""}
            onChange={curlInputOnChange}
          />
          <div className="flex">
            <button className="ml-3 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              send
            </button>
            <button
              onClick={saveCurl}
              className="ml-3 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                curlRequestState?.curlRequest === data?.curlRequest ||
                !curlRequestState?.isEditable
              }
              title={
                curlRequestState?.curlRequest === data?.curlRequest
                  ? "No changes"
                  : !curlRequestState?.isEditable
                  ? "Not editable"
                  : ""
              }
            >
              save
            </button>
          </div>
        </div>
        <div className="w-1/3">
          <CurlOutput placeholder="loading..." curlRequestOutput="something" />
        </div>
      </div>
      {/* <div>{count}</div> */}
    </main>
  );
}
