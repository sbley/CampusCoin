var CampusCoin = artifacts.require("CampusCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(CampusCoin);
};
