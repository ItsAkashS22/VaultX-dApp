const VaultXTreasuryLedger = artifacts.require("VaultXTreasuryLedger");

module.exports = async function (deployer) {
  await deployer.deploy(VaultXTreasuryLedger);
};
