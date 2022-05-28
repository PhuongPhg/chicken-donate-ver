const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

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
            phrase: keys.MNEMONIC,
          },
          providerOrUrl: `wss://ropsten.infura.io/ws/v3/7416a706afed4bb28ed6b2c242a0d764`,
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 6821975, // Gas Limit, How much gas we are willing to spent
      gasPrice: 1243627854, // how much we are willing to spent for unit of gas
      // gasPrice: 200000000000, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 400, // number of blocks before deployment times out
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
  },
};