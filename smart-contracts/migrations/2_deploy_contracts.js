const MedicalResult = artifacts.require("MedicalResult");

module.exports = async function (deployer) {
    await deployer.deploy(MedicalResult);
}