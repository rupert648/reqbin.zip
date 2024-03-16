import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Form, Formik } from "formik";

import { api } from "~/utils/api";
import { Title } from "../components/Title";
import { OptionsModal } from "../components/OptionsModal";
import { LoadingIcon } from "../components/icons/LoadingIcon";
import { TopIcons } from "~/components/TopIcons";
import { PasteField } from "~/components/PasteField";
import { timeoutValues } from "~/constants/timeout-values";
import { calculateTimeoutDate } from "~/utils/timeout";

const Home: NextPage = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();
  const { mutate, isLoading } = api.paste.createPasteObject.useMutation({
    onSuccess: (data) => {
      push(`${data.pasteObjectId}`);
    },
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setShowOptionsModal(!showOptionsModal);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowOptionsModal(false);
      }
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        document.getElementById("submitPasteBin")?.click();
      }

      if (showOptionsModal) {
        e.preventDefault();
        switch (e.key) {
          case "1":
            document.getElementById("copyLinkToClipboard")?.click();
            break;
          case "2":
            document.getElementById("isEditable")?.click();
            break;
          case "3":
            document.getElementById("hasTimeeout")?.click();
          default:
            break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showOptionsModal]);

  return (
    <>
      <Head>
        <title>ReqBin.zip</title>
        <meta
          name="description"
          content="ReqBin.zip - developer friendly paste bin."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b ">
        <Title />
        <Formik
          initialValues={{
            pasteContents: "",
            isEditable: true,
            copyLinkToClipboard: true,
            hasTimeout: false,
            timeout: timeoutValues[0]?.value ?? 60,
          }}
          onSubmit={(values) => {
            const timeoutDate = calculateTimeoutDate(values.timeout);

            mutate({
              pasteContents: values.pasteContents,
              isEditable: values.isEditable,
              ...(values.hasTimeout ? { timeoutDate: timeoutDate } : {}),
            });
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.pasteContents) {
              errors.pasteContents = "You can't submit any empty ";
            }
            return errors;
          }}
        >
          {({ values }) => (
            <Form className="w-11/12 md:w-3/4">
              <TopIcons />
              <PasteField
                isEditable={true}
                placeholder="Paste your sh*t here"
              />
              <div className="flex items-center">
                <button
                  className="m-4 flex max-w-xs flex-col gap-4 rounded-lg border border-gray-300 p-4 text-black hover:bg-black/5"
                  onClick={() => setShowOptionsModal(true)}
                  type="button"
                  disabled={isLoading}
                >
                  <h3 className="md:text-1xl text-xs font-bold">
                    Options{" "}
                    <span className="hidden text-orange-400 md:inline">
                      (⌘K)
                    </span>
                  </h3>
                </button>
                <button
                  className="flex max-w-xs flex-col gap-4 rounded-lg border border-gray-300 p-4 text-black hover:bg-black/5"
                  type="submit"
                  id="submitPasteBin"
                  disabled={isLoading}
                >
                  <h3 className="md:text-1xl text-xs font-bold">
                    Create your Paste bin{" "}
                    <span className="hidden text-orange-400 md:inline">
                      (⇧+Enter)
                    </span>
                  </h3>
                </button>
                <div className="mx-auto mr-0">
                  {isLoading && <LoadingIcon />}
                </div>
              </div>

              {showOptionsModal && (
                <OptionsModal
                  hasTimeout={values.hasTimeout}
                  setShowOptionsModal={setShowOptionsModal}
                />
              )}
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
};

export default Home;
export const runtime = "experimental-edge";
