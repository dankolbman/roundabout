import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Map from "../../components/map";

const TRIP_QUERY = gql`
  query Trip($tripId: ID!) {
    trip(id: $tripId) {
      id
      name
      createdAt
      description
      geoJSON {
        type
        geometry {
          type
          coordinates
        }
      }
    }
  }
`;

export async function getStaticPaths() {
  return {
    paths: [
      "/trips/VHJpcE5vZGU6Mg==",
      "/trips/VHJpcE5vZGU6Mw==",
      "/trips/VHJpcE5vZGU6MQ==",
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  const { data, errors } = await client
    .query({
      query: TRIP_QUERY,
      variables: { tripId: slug },
    })
    .catch((err) => {
      console.log(err.networkError);
      return { data: { trip: { name: "" } } };
    });

  return {
    props: {
      name: data.trip.name,
      description: data.trip.description,
      year: new Date(data.trip.createdAt).getFullYear(),
      geoJSON: data.trip.geoJSON,
    },
  };
}

const Trip = ({ name, description, year, geoJSON }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(TRIP_QUERY);

  const images = {
    2015: "/vietnam.jpg",
    2017: "/south_africa.jpg",
    2019: "/rickshaw_run.jpg",
    2021: "/monument_valley.jpg",
  };

  return (
    <Layout>
      <Map geoJSON={geoJSON} />
      <img
        className="h-64 min-w-full object-cover object-center"
        src={images[year]}
      />
      <div className="relative bg-stone-50/80 -top-24 mx-6 py-6 px-2 sm:px-6 lg:px-8">
        <Header title={name} year={year} />
        <div className="max-w-prose pt-4">{description}</div>
      </div>
    </Layout>
  );
};

export default Trip;
