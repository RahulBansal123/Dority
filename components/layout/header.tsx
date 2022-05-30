import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const Header = () => {
  const router = useRouter();
  const { account } = useWeb3React();

  return (
    <div className="w-full border bg-[#2568ab] text-white rounded-b-3xl">
      <div className="flex mx-auto flex-col md:flex-row items-center md:justify-between py-5 px-10">
        <div className="flex flex-row space-x-2 items-center">
          <p
            className="text-3xl tracking-wide font-bold cursor-pointer"
            onClick={() => router.push('/')}
          >
            Dority
          </p>
        </div>
        <div className="flex flex-row space-x-2 items-center cursor-pointer mt-2 md:mt-0">
          <span className="overflow-ellipsis overflow-hidden">
            {account?.slice(0, 12)}...
          </span>
          {account && (
            <p
              className="border px-4 py-1 rounded-xl hover:text-[#2568ab] hover:bg-white hover:shadow-md transition-all"
              onClick={() => router.push('/create')}
            >
              Create
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
