const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicKeys = process.env.REACT_APP_SC_MNEMONIC;

module.exports = {
  contracts_build_directory: "./src/ethereum/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicKeys,
          },
          providerOrUrl: `wss://ropsten.infura.io/ws/v3/7416a706afed4bb28ed6b2c242a0d764`,
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 5500000, // Gas Limit, How much gas we are willing to spent
      // gasPrice: 43162694779, // how much we are willing to spent for unit of gas
      gasPrice: 124362785416, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 400, // number of blocks before deployment times out
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
};