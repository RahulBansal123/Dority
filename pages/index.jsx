import MainContainer from '../containers/main';
import Header from '../components/layout/header';
import Head from 'next/head';
import Footer from '../components/layout/footer';

function Main(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Dority</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <MainContainer account={props.account} />

      <Footer />
    </div>
  );
}
export default Main;
