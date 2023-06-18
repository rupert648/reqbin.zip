import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { Title } from "./components/Title";

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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "s" && e.metaKey) {
        e.preventDefault();
        document.getElementById("saveCurlRequest")?.click();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      <Title />
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
            <div className="flex">
              <p className="mx-5 -mb-2 text-xs font-extralight tracking-widest">
                Built by{" "}
                <a
                  href="https://www.github.com/rupert648"
                  target="_blank"
                  className="underline"
                >
                  Rupert Carr
                </a>
              </p>
              <p className="m-auto mr-0 text-xs font-extralight tracking-widest">
                <a
                  href="https://www.twitter.com/rupert648"
                  target="_blank"
                  className="hover:underline"
                >
                  #️⃣ twitter
                </a>{" "}
                <a
                  href="https://www.buymeacoffee.com/rupertcarr"
                  target="_blank"
                  className="hover:underline"
                >
                  ☕ buy me a coffee
                </a>
                <a
                  href="https://www.github.com/rupert648"
                  target="_blank"
                  className="ml-1 hover:underline"
                >
                  🧑‍💻 github
                </a>
              </p>
            </div>
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
                className="m-4 flex max-w-xs flex-col gap-4 rounded-lg border border-gray-300 p-4 text-black hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
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
                id="saveCurlRequest"
              >
                <h3 className="text-1xl font-bold">
                  Save <span className="text-orange-400">(⌘S)</span>
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
