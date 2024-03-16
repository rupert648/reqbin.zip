import { Title } from "~/components/Title";
import { TopIcons } from "~/components/TopIcons";

export default function Custom404() {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b ">
        <Title />
        <h3>Paste Bin Not found 🧐</h3>
      </div>
      <div className="mx-5 -mt-10">
        <TopIcons />
      </div>
    </main>
  );
}

export const runtime = "edge";
