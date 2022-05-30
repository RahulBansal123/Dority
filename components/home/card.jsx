import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import web3 from 'web3';

import { get } from '../../utils';

const Card = ({ data, contract }) => {
  const router = useRouter();
  const { account } = useWeb3React();
  const [value, setValue] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await get(data.ipfsHash);
      setDetails(res);
    };
    if (data.ipfsHash) fetchData();
  }, []);

  const donate = async () => {
    try {
      const res = await contract.methods.donate(data.id).send({
        from: account,
        value: web3.utils.toWei(value.toString(), 'ether'),
      });
      setShowInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-3 border mx-4 p-2 rounded-xl shadow-md overflow-hidden">
      <div className="col-span-3 md:col-span-1 h-full flex items-center">
        <img
          src={details.url ?? '/assets/images/placeholder.jpeg'}
          className="w-full h-52 rounded-xl"
        />
      </div>
      <div className="col-span-3 md:col-span-2 px-3 flex flex-col h-full">
        <h1 className="text-xl text-center">{details.name}</h1>
        <p className="text-gray-500 text-center my-3 flex-1 break-all whitespace-normal">
          {details.description}
        </p>
        {showInput && (
          <div className="flex items-center">
            <input
              className="w-full py-1 px-2 border rounded-l-xl my-4 outline-none"
              type="text"
              placeholder="Amount to donate"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="py-1 px-2 border rounded-r-xl">MATIC</div>
          </div>
        )}
        <div className="flex">
          <button
            className="bg-gradient-to-r from-[#16558f] to-[#0583d2] flex-1 py-2 px-5 text-center rounded-xl text-white hover:shadow-md hover:bg-[#0583d2] transition-all mx-3"
            onClick={() => router.push('/1')}
          >
            View
          </button>
          <button
            className="bg-[#f6f5f3] flex-1 py-2 px-5 text-center rounded-xl text-black hover:shadow-md hover:bg-[#ebebeb] transition-all mx-3"
            onClick={showInput ? donate : () => setShowInput(true)}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
