import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [count, setCount] = useState(0);

  // setTimeout(() => setCount((c) => c + 1), 1000);
  // console.count("rC");
  console.log(1);

  useEffect(() => {
    console.log("component mount");
    console.log("component did update");
    return () => {
      console.log("component did unmount");
    };
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((c) => c + 1);
  //     console.count("!23");
  //   }, 1000);
  // }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#02096d] to-[#15262c]">
        <div className="text-white">{count}</div>
        <button
          onClick={() => {
            setCount((c) => c + 1);
          }}
          className="text-white"
        >
          btn
        </button>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
