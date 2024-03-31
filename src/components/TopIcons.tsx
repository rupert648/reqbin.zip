import { MobileTitle } from "./MobileTitle";
import { TimeLeft } from "./TimeLeft";

type TopIconsProps = {
  pasteObjectId?: string;
  timeoutDate?: Date | null;
};

export const TopIcons = ({ pasteObjectId, timeoutDate }: TopIconsProps) => {
  return (
    <>
      <MobileTitle />
      <div className="flex">
        {pasteObjectId ? (
          <p
            className="mx-5 -mb-2 hidden border-b-2 border-orange-400 text-xs font-extralight tracking-widest md:block"
            data-testid="paste-object-id-string"
          >
            {pasteObjectId}
          </p>
        ) : null}
        {timeoutDate ? (
          <p
            data-testid="timer-timeout-string"
            className="mx-5 -mb-2 hidden border-b-2 border-orange-400 text-xs font-extralight tracking-widest md:block"
          >
            <TimeLeft timeoutDate={timeoutDate} />
          </p>
        ) : null}
        <p className="mr-0 text-xs font-extralight tracking-widest md:m-auto md:mr-0">
          Built by{" "}
          <a
            href="https://www.github.com/rupert648"
            target="_blank"
            className="mr-2 underline"
          >
            Rupert Carr
          </a>
          <a
            href="https://www.twitter.com/rupert648"
            target="_blank"
            className="hover:underline"
          >
            • #️⃣ twitter
          </a>{" "}
          <a
            href="https://www.buymeacoffee.com/rupertcarr"
            target="_blank"
            className="hover:underline"
          >
            • ☕ buy me a coffee
          </a>
          <a
            href="https://www.github.com/rupert648"
            target="_blank"
            className="ml-1 hover:underline"
          >
            • 🧑‍💻 github
          </a>
        </p>
      </div>
    </>
  );
};
