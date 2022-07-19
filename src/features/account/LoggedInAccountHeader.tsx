import { shortenAddress } from '../../util/address';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';

export const LoggedInAccountHeader = () => {
  const { connectedWallet } = useSlashAuth();

  return (
    <div className="flex items-center justify-start px-2 bg-white border border-gray-200 border-solid rounded-full dark:shadow-xl dark:border-pale-sky-300 dark:hover:bg-pale-sky-100">
      <div className="px-2 py-2 mr-3 text-gray-700 text-md dark:text-pale-sky-700">
        {shortenAddress(connectedWallet)}
      </div>
      <ChevronDownIcon className="w-5 h-5 text-gray-700 dark:text-pale-sky-700" />
    </div>
  );
};
