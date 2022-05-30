import Head from 'next/head';

import HomeContainer from '../containers/Home';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

function Home(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Dority</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomeContainer account={props.account} contract={props.contract} />
      <Footer />
    </div>
  );
}
export default Home;
