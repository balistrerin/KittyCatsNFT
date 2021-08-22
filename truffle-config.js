require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "gorilla ability smart charge capital say work marine main unknown move piano";


module.exports = {
  networks: {
  development: {
   host: "127.0.0.1",
   port: 7545,
   network_id: "*"
  },
  rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b1c9161c95b44a0b86be6c26c453a539");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
 },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.5.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
