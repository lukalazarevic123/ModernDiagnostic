const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();

const MNEMONIC = process.env["MNEMONIC"];
const KEY = process.env["ENDPOINT_KEY"];

module.exports = {
    networks: {
        rinkeby: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: {
                        phrase: MNEMONIC
                    },
                    providerOrUrl: "wss://rinkeby.infura.io/ws/v3/" + KEY,
                    numberOfAddresses: 1,
                    shareNonce: true
                }),
                network_id: '4'
        }
    },
    contracts_directory: './contracts/',
    contracts_build_directory: './abis/',
    compilers: {
        solc: {
            version: '>= 0.6.0 <= 0.8.0',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}