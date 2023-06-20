import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Field, Form, Formik } from "formik";

import { api } from "~/utils/api";
import { Title } from "../components/Title";
import { OptionsModal } from "../components/OptionsModal";
import { MobileTitle } from "../components/MobileTitle";
import { LoadingIcon } from "../components/LoadingIcon";

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
          default:
            break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showOptionsModal]);

  return (
    <>
      <Head>
        <title>ReqBin</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b ">
        <Title />
        <Formik
          initialValues={{
            pasteContents: "",
            isEditable: true,
            copyLinkToClipboard: true,
          }}
          onSubmit={(values) => {
            mutate({
              pasteContents: values.pasteContents,
              isEditable: values.isEditable,
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
          <Form className="w-3/4">
            <MobileTitle />
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
              placeholder="Paste your sh*t here"
              id="pasteContents"
              name="pasteContents"
              as="textarea"
              className="m-4 h-[80vh] w-full resize-none rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                  <span className="hidden text-orange-400 md:inline">(⌘K)</span>
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
              <div className="mx-auto mr-0">{isLoading && <LoadingIcon />}</div>
            </div>

            {showOptionsModal && <OptionsModal />}
          </Form>
        </Formik>
      </main>
    </>
  );
};

export default Home;
