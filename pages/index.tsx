import Dashboard from "../components/Dashboard";
import { prisma } from "../db";

export const getStaticProps = async () => {
  const categories = await prisma.categories.findMany();

  return {
    props: { categories },
  };
};

function App({ categories }) {
  return <Dashboard categories={categories} />;
}

export default App;
