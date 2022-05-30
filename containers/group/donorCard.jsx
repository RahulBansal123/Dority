import Identicon from 'react-identicons';

const DonorCard = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-5 border p-2 rounded-xl my-2">
      <Identicon string={data.donor} size={40} />
      <h3 className="truncate col-span-2 text-center">{data.donor}</h3>
      <h3 className="truncate text-center">{data.amount} MATIC</h3>
      <h3 className="truncate text-center">
        {new Date(data.timestamp * 1000).toLocaleDateString()}
      </h3>
    </div>
  );
};

export default DonorCard;
