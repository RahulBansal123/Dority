import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import web3 from 'web3';

import { get } from '../../utils';
import DonorCard from './donorCard';

const Group = ({ contract }) => {
  const { account } = useWeb3React();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    id: 0,
    owner: '',
    raised: 0,
    needed: 0,
    isFullfilled: false,
    timestamp: 0,
    ipfsHash: null,
  });
  const [details, setDetails] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [value, setValue] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [donors, setDonors] = useState([]);

  const getData = useCallback(async () => {
    const group = await contract.methods.organisations(id).call();
    if (group.ipfsHash) {
      const res = await get(group.ipfsHash);
      setDetails(res);
    }
    const allDonors = await contract.methods.getDonors(id).call();
    setDonors(allDonors);
    setData(group);
  }, []);

  useEffect(() => {
    if (contract) getData();
  }, [contract]);

  const donate = async () => {
    try {
      const res = await contract.methods.donate(data.id).send({
        from: account,
        value: web3.utils.toWei(value.toString(), 'ether'),
        gasLimit: 100000,
      });
      setShowInput(false);
      await getData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <div className="w-3/4 border mx-auto px-4 py-5 rounded-xl">
        <div className="grid grid-cols-3">
          <div className="col-span-1 flex items-center">
            <img
              src={details.image ?? '/assets/images/placeholder.jpeg'}
              className="w-full h-48 rounded-xl"
            />
          </div>
          <div className="col-span-2 px-3 flex flex-col">
            <h1 className="text-2xl font-semibold text-center">
              {details.name}
            </h1>
            <p className="text-gray-500 text-lg text-center my-3 flex-1">
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
                className="bg-[#f6f5f3] flex-1 py-2 px-5 text-center rounded-xl text-black shadow hover:shadow-md hover:bg-[#ebebeb] transition-all mx-3"
                onClick={showInput ? donate : () => setShowInput(true)}
              >
                Donate
              </button>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 my-10">
          <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
            <span className="font-bold">Created:</span>{' '}
            {new Date(data.timestamp * 1000).toLocaleDateString()}
          </p>
          <a
            href={`https://mumbai.polygonscan.com/address/${data.owner}`}
            target="_blank"
            className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2 truncate"
          >
            <span className="font-bold">Owner:</span> {data.owner}
          </a>
          <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
            <span className="font-bold">Total Raised:</span>{' '}
            {web3.utils.fromWei(data.raised.toString(), 'ether')} MATIC
          </p>
          <p className="text-center text-xs bg-[#f6f5f3] p-2 rounded-xl my-1 md:my-0 md:mx-2">
            <span className="font-bold">Total Needed:</span>{' '}
            {web3.utils.fromWei(data.needed.toString(), 'ether')} MATIC
          </p>
        </div>

        <div className="w-full mt-16">
          <h1 className="text-center border-2 border-[#2a5298] p-2 rounded-xl text-[#2a5298] text-xl">
            DONORS
          </h1>
          <div className="my-3">
            {donors.map((donor) => (
              <DonorCard data={donor} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Group;
