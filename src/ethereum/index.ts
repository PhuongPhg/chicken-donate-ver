import { ethers, utils } from "ethers";
import { IDonationsEthers } from "types/organisation";
import organizationJson from "./contracts/Organization.json";
import factoryJson from "./contracts/OrganizationFactory.json";

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export async function ConnectWallet() {
  const { ethereum } = window;
  if (!ethereum) {
    alert("please install metamask");
    return;
  }
  try {
    await provider.send("eth_requestAccounts", []);
  } catch (error) {
    console.log(error);
    return;
  }
}
export function getFactoryContract() {
  return new ethers.Contract(
    contractAddress as string,
    factoryJson.abi,
    signer
  );
}
export async function getOrganizationContractAddress(address: string) {
  try {
    const factoryContract = await getFactoryContract();
    return await factoryContract.getContractOfOrganization(address);
  } catch (error) {
    console.log("getOrganizationContractAddress err", error);
  }
}
export async function getOrganizationContract(organizationContract: string) {
  const organizationContractAddress = await getOrganizationContractAddress(
    organizationContract
  );
  return new ethers.Contract(
    organizationContractAddress as string,
    organizationJson.abi,
    signer
  );
}
export async function geOverridesOption(value = "0.0") {
  try {
    const signerAddress = await signer.getAddress();
    return { from: signerAddress, value: utils.parseEther(value) };
  } catch (error) {
    console.log("error in getSignerAddress", error);
  }
}
export async function getAllOrganizations() {
  try {
    const factoryContract = getFactoryContract();
    return await factoryContract.allOrganizations();
  } catch (error) {
    console.log("getAllOrganizations err", error);
  }
}
export async function createOrganization(name: string) {
  try {
    const factoryContract = getFactoryContract();
    const signerAddress = await signer.getAddress();
    const overrides = await geOverridesOption();
    const res = await factoryContract.createOrganization(name, overrides);
    const organizationContractAddress = await getOrganizationContractAddress(
      signerAddress
    );
    return { ...res, contractAddress: organizationContractAddress };
  } catch (error) {
    console.log("createOrganization err", error);
  }
}
export async function donate(address: string, amount: number) {
  try {
    const contract = await getOrganizationContract(address);
    const overrides = await geOverridesOption(amount.toString());
    return await contract.donate(overrides?.value._hex, overrides);
  } catch (error) {
    console.log("donate err", error);
  }
}
export async function getOrganizationBalance(address: string) {
  try {
    const contract = await getOrganizationContract(address);
    const value = await contract.getBalance();
    return utils.formatEther(value);
  } catch (error) {
    console.log("getOrganizationBalance err", error);
  }
}
// only owner of organization can with draw
export async function withdraw(address: string) {
  try {
    const contract = await getOrganizationContract(address);
    return await contract.withdraw();
  } catch (error) {
    console.log("withdraw err", error);
  }
}
export async function getDonations(address: string) {
  try {
    const contract = await getOrganizationContract(address);
    const res = await contract.getDonations();
    return (res || []).map((o: IDonationsEthers) => ({
      amount: utils.formatEther(o?.amount),
      donorId: o.donorId,
      time: Number(o.time),
    }));
  } catch (error) {
    console.log("getDonations err", error);
  }
}
export async function getWithdrawTransaction(address: string) {
  try {
    const contract = await getOrganizationContract(address);
    return await contract.getWithdrawTransaction();
  } catch (error) {
    console.log("getWithdrawTransaction err", error);
  }
}
