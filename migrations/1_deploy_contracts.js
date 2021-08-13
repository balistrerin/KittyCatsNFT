const KittyCat = artifacts.require("KittyCat");

module.exports = function(deployer) {
  deployer.deploy(KittyCat);
};