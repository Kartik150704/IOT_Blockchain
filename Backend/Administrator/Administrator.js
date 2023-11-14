const express = require('express');
const fs = require('fs')
const Web3=require('web3')
const router = express();

const compile_deploy = require('../Tools/compile_deploy');
const getContractInstance = require('../Tools/getInstance')
const web3Provider = "https://sepolia.infura.io/v3/223458eb1e534a6e9f3ca05bb3658cd3"

async function addPrivacyPolicy(contract, collectedData) {

    if (!contract || !contract.methods.addPrivacyPolicy) {
        throw new Error('Contract or addPrivacyPolicy method is undefined');
    }
    const encodedABI = contract.methods.addPrivacyPolicy(collectedData).encodeABI();
    const gasEstimate = await contract.methods.addPrivacyPolicy(collectedData).estimateGas();
    const tx = {
        gas: gasEstimate + 1000000, // Add some extra gas to cover potential cost changes
        data: encodedABI
    };
    const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));
    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.SIGNER_PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Privacy Policy added. Transaction hash:', receipt.transactionHash)
}

// Function to add device to the contract
async function addDevice(contract, deviceData) {

    if (!contract || !contract.methods.addDevice) {
        throw new Error('Contract or addDevice method is undefined');
    }
    const { deviceId, deviceName, deviceType, deviceManufacturer, manufacturerUrl, policies } = deviceData;

    // Adding privacy policies to the contract
    for (const policy of policies) {
        await addPrivacyPolicy(contract, policy.policyPoints);
    }

    // Get policy IDs after adding them to the contract
    const policyIds = await Promise.all(policies.map(async (policy) => {
        const policyIds = await contract.methods.getDevicePrivacyPolicies(policy.policyName).call();
        return policyIds.map(policy => policy.policyId);
    }));


    
    // Add device information along with policy IDs to the contract
    const encodedABI = contract.methods.addDevice(deviceId, deviceName, deviceType, deviceManufacturer, manufacturerUrl, policyIds).encodeABI();
    const gasEstimate = await contract.methods.addDevice(deviceId, deviceName, deviceType, deviceManufacturer, manufacturerUrl, policyIds).estimateGas();
    const tx = {
        gas: gasEstimate + 100000, // Add some extra gas to cover potential cost changes
        data: encodedABI
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Device added. Transaction hash:', receipt.transactionHash);
}

router.get('/initialize', async (req, resp) => {
    const deployAddress = await compile_deploy("Administrator", './Administrator/contracts/Administrator.sol')
    const data = { address: deployAddress.deployAddress, abi: deployAddress.abi };

    fs.writeFileSync('./Administrator/AdministratorData.json', JSON.stringify(data, null, 2));
    resp.send(`Contract deployed at ${deployAddress}`);

})

router.post('/savedeviceinfo', async (req, resp) => {
    const data = require('./AdministratorData.json')

    const contract =await getContractInstance(data.address, data.abi, web3Provider)
    console.log(req.body)
    await addDevice(contract, req.body)
    resp.send(true)

})

module.exports = router