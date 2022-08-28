import { BigNumber } from 'ethers';

export interface IOrganisation {
  addressId: string;
  description: string;
  name: string;
  photoUrl: string;
  briefDes: string;
  type: ECategoryTypes;
  contractAddress: string;
  slug?: string;
}
export interface IDonationsEthers {
  amount: BigNumber;
  donorId: string;
  time: BigNumber;
}

export interface IWithdrawTransaction {
  amount: BigNumber;
  time: BigNumber;
}
export enum ECategoryTypes {
  VIDEO_CREATORS = 'VIDEO_CREATORS',
  CHARITY = 'CHARITY',
  ARTIST = 'ARTIST',
  YOUTUBER = 'YOUTUBER',
  GAMING = 'GAMING',
  PODCASTERS = 'PODCASTERS',
}
