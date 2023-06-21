import { MobileTitle } from "./MobileTitle";

export const TopIcons = () => {
  return (
    <>
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
    </>
  );
};
