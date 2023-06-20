import { useRouter } from "next/router";

export const MobileTitle = () => {
  const { push } = useRouter();
  return (
    <h1
      className="mx-5 mb-5 cursor-pointer text-6xl font-extrabold lg:hidden"
      onClick={() => {
        void push("/");
      }}
    >
      ReqBin
      <span className=" leading-none text-orange-500">.zip</span>
    </h1>
  );
};
