import { useRouter } from "next/router";

export const Title = () => {
  const { push } = useRouter();
  return (
    <h1
      className="-mx-48 rotate-[270deg] cursor-pointer text-9xl font-extrabold"
      onClick={() => {
        void push("/");
      }}
    >
      ReqBin
      <span className=" leading-none text-orange-500">.zip</span>
    </h1>
  );
};
