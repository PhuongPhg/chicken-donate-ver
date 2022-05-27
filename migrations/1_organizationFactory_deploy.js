const OrganizationFactory = artifacts.require("OrganizationFactory");

module.exports = function (deployer) {
  deployer.deploy(OrganizationFactory);
};
