import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback } from 'react';
import { PrimaryButton } from './Buttons';

type Props = {
  roleNameRequired: string;
};

export const NotAuthorized = ({ roleNameRequired }: Props) => {
  const { connectedWallet } = useSlashAuth();

  const handleMintClick = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    console.log('do the mint!');
  }, [connectedWallet]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="font-[24px] font-semibold text-center text-primary mb-1">
        This page is only viewable to those with {roleNameRequired} privileges.
      </h2>
      <p className="font-[16px] text-center text-secondary mb-6">
        Mint a free NFT to get the {roleNameRequired} role.
      </p>
      <PrimaryButton onClick={handleMintClick}>
        Mint {roleNameRequired} NFT
      </PrimaryButton>
    </div>
  );
};
