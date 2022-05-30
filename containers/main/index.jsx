import Features from '../../components/main/features';
import HomeTop from '../../components/main/top';

const Main = ({ account }) => {
  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <main className="flex-grow">
        <HomeTop />
        <Features />
      </main>
    </main>
  );
};

export default Main;
