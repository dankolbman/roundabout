import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";

const navigation = [
  {
    year: 2015,
    name: "The Vietnamese Frontier",
    href: "/trips/VHJpcE5vZGU6MQ==",
    image: "/vietnam.jpg",
    place: "Vietnam",
  },
  {
    year: 2017,
    name: "Zuma and The Guptas",
    href: "/trips/VHJpcE5vZGU6Mg==",
    image: "/south_africa.jpg",
    place: "South Africa",
  },
  {
    year: 2019,
    name: "Rickshaw Run",
    href: "/trips/VHJpcE5vZGU6Mw==",
    image: "/rickshaw_run.jpg",
    place: "India",
  },
  {
    year: 2021,
    name: "Monument Valley",
    href: "/trips/VHJpcE5vZGU6NQ==",
    image: "/cathedral_valley.jpg",
    place: "Utah",
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ben and Dan Biannual Adventures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-4">
        <h1 className="text-4xl font-semibold text-stone-900">About</h1>
        <p>
          Ben and Dan go on the occassional crazy adventure. Checkout the trips
          thus far below.
        </p>
        <h1 className="text-4xl font-semibold text-stone-900">
          Past Trip Reports
        </h1>
        <div className="flex flex-col space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative hover:outline hover:outline-offset-2 hover:outline-2"
            >
              <div className="flex place-items-end justify-between absolute bottom-4 h-full w-full">
                <h2 className="bg-stone-50/90 h-min py-4 px-8 text-stone-900 text-2xl font-semibold">
                  {item.name}
                </h2>
                <span className="bg-stone-50/90 h-min w-min py-2 px-6 text-stone-900 text-xl w-full text-right whitespace-nowrap">
                  {item.place}, {item.year}
                </span>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="h-64 min-w-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
