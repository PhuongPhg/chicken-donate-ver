import { ethers } from "ethers";

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

export async function ConnectWallet() {
  const { ethereum } = window;
  if (!ethereum) {
    alert("please install metamask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return {
      signer,
      provider,
    };
  } catch (error) {
    console.log(error);
    return;
  }
}
