import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { TopIcons } from "~/components/TopIcons";
import { PasteField } from "~/components/PasteField";
import Custom404 from "./404";
import { CopiedToClipboardPopup } from "~/components/[pasteObjectId].tsx/CopiedToClipboardPopup";

export default function CurlRequestPage() {
  const [showPopup, setShowPopup] = useState(false);

  const utils = api.useContext();
  const router = useRouter();
  const { pasteObjectId } = router.query;
  const { data, error, isLoading } = api.paste.getPasteObject.useQuery({
    pasteObjectId: pasteObjectId as string,
  });
  const { mutate: updateCurl } = api.paste.updatePasteObject.useMutation({
    onSuccess(data) {
      void utils.paste.getPasteObject.invalidate({
        pasteObjectId: data.pasteObjectId,
      });
    },
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "s" && e.metaKey) {
        e.preventDefault();
        document.getElementById("savePasteContents")?.click();
      } else if (e.key === "c" && e.metaKey && e.shiftKey) {
        e.preventDefault();
        document.getElementById("copyPasteContents")?.click();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const copyPasteContents = async (pasteContents?: string) => {
    if (!pasteContents) {
      return;
    }
    await navigator.clipboard.writeText(pasteContents);

    setShowPopup(true);
  };

  if (typeof pasteObjectId !== "string" || error) {
    return <Custom404 />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b ">
      <Title />
      <Formik
        enableReinitialize={true}
        initialValues={{
          pasteContents: data?.pasteContents,
        }}
        onSubmit={(values) => {
          if (!values.pasteContents) {
            return;
          }

          updateCurl({
            pasteObjectId: pasteObjectId,
            pasteContents: values.pasteContents,
          });
        }}
      >
        {({ values }) => (
          <Form className="w-3/4">
            <TopIcons />
            <PasteField
              isEditable={data?.isEditable ?? false}
              placeholder={isLoading ? "Loading..." : ""}
            />
            <ErrorMessage name="pasteContents" />
            <div className="flex items-center">
              <button
                className="m-4 flex max-w-xs flex-col gap-4 rounded-lg border border-gray-300 p-4 text-black hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  values?.pasteContents === data?.pasteContents ||
                  !data?.isEditable
                }
                title={
                  values?.pasteContents === values.pasteContents
                    ? "No changes"
                    : !data?.isEditable
                      ? "Not editable"
                      : ""
                }
                id="savePasteContents"
                type="submit"
              >
                <h3 className="md:text-1xl text-xs font-bold">
                  Save{" "}
                  <span className="hidden text-orange-400 md:inline">(⌘S)</span>
                </h3>
              </button>
              <button
                className="m-4 flex max-w-xs flex-col gap-4 rounded-lg border border-gray-300 p-4 text-black hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                id="copyPasteContents"
                type="button"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => copyPasteContents(values.pasteContents)}
              >
                <h3 className="md:text-1xl text-xs font-bold">
                  Copy Contents{" "}
                  <span className="hidden text-orange-400 md:inline">
                    (⌘+⇧+C)
                  </span>
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <CopiedToClipboardPopup
        duration={3000}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </main>
  );
}
