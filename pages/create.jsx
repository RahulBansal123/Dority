import Head from 'next/head';

import CreateContainer from '../containers/create';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

function Create(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Dority | Add</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <CreateContainer account={props.account} contract={props.contract} />

      <Footer />
    </div>
  );
}
export default Create;
