import { useEffect, useState } from 'react';
import Card from '../../components/home/card';

const Home = ({ contract }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const totalOrganisations = await contract.methods
        .totalOrganisations()
        .call();

      const data = [];

      for (let i = 1; i <= totalOrganisations; i++) {
        const group = await contract.methods.organisations(i).call();
        data.push(group);
      }
      setData(data);
    };
    if (contract) getData();
  }, [contract]);

  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <div className="w-full grid grid-cols-2 px-4 py-5 rounded-xl">
        {data.map((item, index) => (
          <Card key={index} data={item} contract={contract} />
        ))}
      </div>
    </main>
  );
};

export default Home;
