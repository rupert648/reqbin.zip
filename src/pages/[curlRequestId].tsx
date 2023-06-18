import { useRouter } from "next/router";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function CurlRequestPage() {
  const [curlRequestState, setCurlRequestState] =
    useState<RouterOutputs["curl"]["getCurl"]>();

  const utils = api.useContext();
  const router = useRouter();
  const { curlRequestId } = router.query;
  const { data, error } = api.curl.getCurl.useQuery(
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b ">
      <h1 className="rotate-[270deg] text-3xl font-extrabold">
        ReqBin<span className="text-orange-500">.zip</span>
      </h1>

      <Formik
        enableReinitialize={true}
        initialValues={{
          curlRequest: data?.curlRequest,
          isEditable: true,
          copyLinkToClipboard: true,
        }}
        onSubmit={(values) => {
          console.log("submitted");
        }}
      >
        {({ values }) => (
          <Form className="w-10/12">
            <Field
              placeholder="loading..."
              id="curlRequest"
              name="curlRequest"
              as="textarea"
              className="m-4 h-[80vh] w-full resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <ErrorMessage name="curlRequest" />
            <div className="flex items-center">
              <button
                onClick={saveCurl}
                className="ml-3 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  curlRequestState?.curlRequest === data?.curlRequest ||
                  !curlRequestState?.isEditable
                }
                title={
                  curlRequestState?.curlRequest === values.curlRequest
                    ? "No changes"
                    : !curlRequestState?.isEditable
                    ? "Not editable"
                    : ""
                }
              >
                save
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <div className="flex justify-center ">
        <div className=" w-10/12">
          <CurlInput
            placeholder={isLoading ? "Loading..." : ""}
            curlRequest={curlRequestState?.curlRequest ?? ""}
            onChange={curlInputOnChange}
          />
          <div className="flex">
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
      </div> */}
    </main>
  );
}
