import ConnectedAddressContext from "../context/ConnectedAddressContext";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { prisma } from "../config/db";
import { withSessionSsr } from "../lib/withSession";

export default function App({ categories, connectedAddress }) {
  return (
    <ConnectedAddressContext.Provider value={connectedAddress}>
      <Layout>
        <Dashboard categories={categories} />
      </Layout>
    </ConnectedAddressContext.Provider>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const connectedAddress = req.session.connectedAddress || null;
  const categories = await prisma.categories.findMany();

  return {
    props: { categories, connectedAddress },
  };
});
