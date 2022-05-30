import GroupContainer from '../containers/group';
import Header from '../components/layout/header';
import Head from 'next/head';
import Footer from '../components/layout/footer';

function Group(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Dority</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <GroupContainer contract={props.contract} />
      <Footer />
    </div>
  );
}
export default Group;
