import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>my app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1>Hello</h1>
        List the trips here!
      </div>
    </Layout>
  );
};

export default Home;
