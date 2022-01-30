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
      geoJSON: data.trip.geoJSON,
    },
  };
}

const Trip = ({ name, geoJSON }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(TRIP_QUERY);

  return (
    <Layout>
      <Map geoJSON={geoJSON} />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <Header title="The Vietnamese Frontier" />
        Trip: {name}
        <div>
          Ben and Dan traverse the landscape on some well-traveled motorbikes.
        </div>
      </div>
    </Layout>
  );
};

export default Trip;
