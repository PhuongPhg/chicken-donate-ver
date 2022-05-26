import { ethers } from "ethers";
import donationJSON from "./DonationChain.json";

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export async function ConnectWallet() {
  const { ethereum } = window;
  if (!ethereum) {
    alert("please install metamask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    await provider.send("eth_requestAccounts", []);
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getBalanceOfOrganisation(address: string) {
  const contract = new ethers.Contract(
    contractAddress,
    donationJSON.abi,
    signer
  );
  try {
    const balance = await contract.getBalanceOfOrganisation(address);
    const balanceFormatted = ethers.utils.formatEther(balance);
    return balanceFormatted;
  } catch (error) {
    console.log(error);
  }
}

export async function donationForOrganization(
  amount: number,
  addressTo: string,
  donorName: string
) {
  const Contract = new ethers.Contract(
    contractAddress,
    donationJSON.abi,
    signer
  );
  try {
    await Contract.donationForOrganization(amount, addressTo, donorName);
  } catch (error) {
    console.log(error);
  }
}
