import { ConnectedAddressProvider } from "../context/ConnectedAddressContext";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { prisma } from "../config/db";
import { withSessionSsr } from "../lib/withSession";

export default function App({ categories, connectedAddress }) {
  return (
    <ConnectedAddressProvider initialState={connectedAddress}>
      <Layout>
        <Dashboard />
      </Layout>
    </ConnectedAddressProvider>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const connectedAddress = req.session.connectedAddress || null;

  return {
    props: { connectedAddress },
  };
});
