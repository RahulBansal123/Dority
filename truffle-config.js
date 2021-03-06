const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const secret = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          secret,
          'https://polygon-mumbai.infura.io/v3/2aa085cd9f914c45942447d6774404db'
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_directory: './contracts',
  contracts_build_directory: './abis',
  compilers: {
    solc: {
      version: '^0.8.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  db: {
    enabled: false,
  },
};
