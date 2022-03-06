import { useRouter } from "next/router";
import Image from "next/Image";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Map from "../../components/map";
import Memory from "../../components/memory";

const TRIP_QUERY = gql`
  query Trip($tripId: ID!) {
    trip(id: $tripId) {
      id
      name
      createdAt
      description
      location
      tripTime
      geoJSON {
        type
        geometry {
          type
          coordinates
        }
      }
      memories(orderBy: "time") {
        edges {
          node {
            id
            time
            title
            location
            description
            image
          }
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
      "/trips/VHJpcE5vZGU6NQ==",
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
      description: data.trip.description || null,
      year: data.trip.tripTime || null,
      location: data.trip.location || null,
      memories: data.trip.memories || null,
      geoJSON: data.trip.geoJSON || null,
    },
  };
}

const Trip = ({ name, description, year, location, geoJSON, memories }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(TRIP_QUERY);

  const images = {
    2015: "/vietnam.jpg",
    2017: "/south_africa.jpg",
    2019: "/rickshaw_run.jpg",
    2021: "/cathedral_valley.jpg",
  };

  return (
    <Layout>
      <Map geoJSON={geoJSON} />
      <img
        className="h-64 min-w-full object-cover object-center"
        src={images[year]}
      />
      <div className="relative bg-stone-50/80 -top-24 mx-6 py-6 px-2 sm:px-6 lg:px-8">
        <Header title={name} year={year} location={location} />
        <div className="max-w-prose py-4 text-lg">{description}</div>
        <ul className="space-y-8">
          {memories &&
            memories.edges.map(({ node }) => (
              <Memory key={node.id} memory={node} />
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Trip;
