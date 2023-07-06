import { useRouter } from "next/router";

export const MobileTitle = () => {
  const { push } = useRouter();
  return (
    <h1
      className="mb-5 cursor-pointer text-4xl font-extrabold md:mx-5 lg:hidden"
      onClick={() => {
        void push("/");
      }}
    >
      ReqBin
      <span className=" leading-none text-orange-500">.zip</span>
    </h1>
  );
};
