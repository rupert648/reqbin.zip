import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function CurlRequestPage() {
  const utils = api.useContext();
  const router = useRouter();
  const { curlRequestId } = router.query;
  const { data, error } = api.curl.getCurl.useQuery({
    curlRequestId: curlRequestId as string,
  });
  const { mutate: updateCurl } = api.curl.updateCurl.useMutation({
    onSuccess(data) {
      void utils.curl.getCurl.invalidate({ curlRequestId: data.curlId });
    },
  });

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
        }}
        onSubmit={(values) => {
          if (!values.curlRequest) {
            return;
          }

          updateCurl({
            curlRequestId: curlRequestId,
            curlRequest: values.curlRequest,
          });
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
                className="ml-3 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  values?.curlRequest === data?.curlRequest || !data?.isEditable
                }
                title={
                  values?.curlRequest === values.curlRequest
                    ? "No changes"
                    : !data?.isEditable
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
    </main>
  );
}
