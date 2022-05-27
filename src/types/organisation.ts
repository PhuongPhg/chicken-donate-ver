import { BigNumber } from "ethers";

export interface IOrganisation {
  addressId: string;
  description: string;
  name: string;
  photoUrl: string;
  briefDes: string;
  type: string;
  contractAddress: string;
}
export interface IDonationsEthers {
  amount: BigNumber;
  donorId: string;
  time: BigNumber;
}