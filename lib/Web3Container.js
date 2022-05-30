import { useLayoutEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import getContract from './getContract';
import Dority from '../abis/Dority.json';
import { useRouter } from 'next/router';

const Web3Container = (props) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const router = useRouter();
  const { account, library } = useWeb3React();

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(library.provider);
        const contract = await getContract(web3, Dority);
        setState({ web3, contract });
      } catch (error) {
        alert(`Failed to connect, Please try again.`);
        console.error(error);
      }
    };
    if (account) init();
  }, [account]);

  if (router.pathname === '/auth' || router.pathname === '/') {
    return props.render({ web3: null, account: null, contract: null });
  }

  if (!account) {
    router.push('/auth');
    return null;
  }

  return props.render({ web3: state.web3, account, contract: state.contract });
};

export default Web3Container;
