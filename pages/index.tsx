import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>my app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="font-sans">Welcome to my homepage!</h1>
      </div>
    </div>
  );
};

export default Home;
