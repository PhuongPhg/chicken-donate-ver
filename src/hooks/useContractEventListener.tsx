import { EContractEvents } from 'enums/contract';
import { getOrganizationContract } from 'ethereum';
import { Contract } from 'ethers';
import { useEffect } from 'react';

export const useContractEventListener = (
  addressId: string,
  onDonationCreated: () => void,
  onWithdrawSuccess: () => void,
) => {
  useEffect(() => {
    let contract: Contract;
    (async () => {
      contract = await getOrganizationContract(addressId);
      contract.on(EContractEvents.DONATION_CREATED, onDonationCreated);
      contract.on(EContractEvents.WITHDRAW_SUCCESS, onWithdrawSuccess);
    })();

    return () => {
      contract?.off(EContractEvents.DONATION_CREATED, onDonationCreated);
      contract?.off(EContractEvents.WITHDRAW_SUCCESS, onWithdrawSuccess);
    };
  }, [addressId, onDonationCreated, onWithdrawSuccess]);
};
