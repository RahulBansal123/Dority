import { useRouter } from 'next/router';
import { useState } from 'react';
import web3 from 'web3';

import { store } from '../../utils';

const Create = ({ account, contract }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buttonTxt, setButtonTxt] = useState('Add');

  const addOrganisation = async () => {
    try {
      setLoading(true);
      setButtonTxt('Uploading to IPFS...');
      const res = await store(title, description, file);

      setButtonTxt('Storing in contract...');

      const tx = await contract.methods
        .createOrganisation(res, web3.utils.toWei(amount, 'ether'))
        .send({ from: account });

      router.push('/home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setButtonTxt('Add');
    }
  };

  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <div className="w-11/12 md:w-9/12 p-4 mx-auto border rounded-xl flex flex-col justify-center">
        <input
          className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full py-1 px-2 border rounded-xl my-4 outline-none"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="my-3"
          type="file"
        />

        {file && (
          <div className="mt-2">
            <img src={URL.createObjectURL(file)} alt="preview" />
          </div>
        )}

        <div className="flex items-center">
          <input
            className="w-full py-1 px-2 border rounded-l-xl my-4 outline-none"
            type="text"
            placeholder="Amount to be Raised"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="py-1 px-2 border rounded-r-xl">MATIC</div>
        </div>
        <button
          className="w-1/4 px-4 py-2 border rounded-xl my-4 mx-auto bg-[#2568ab] text-white hover:shadow-md hover:bg-[#2568abe7] transition-all disabled:bg-[#2568abe7] disabled:cursor-not-allowed"
          disabled={loading}
          onClick={addOrganisation}
        >
          {buttonTxt}
        </button>
      </div>
    </main>
  );
};

export default Create;
