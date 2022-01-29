import { useRouter } from "next/router";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Map from "../../components/map";

const Trip = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <Map />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <Header title="The Vietnamese Frontier" />

        <div>
          Ben and Dan traverse the landscape on some well-traveled motorbikes.
        </div>
      </div>
    </Layout>
  );
};

export default Trip;
