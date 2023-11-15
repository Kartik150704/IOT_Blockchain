const express = require('express');
const fs = require('fs')
const Web3 = require('web3')
const router = express();
require('dotenv').config();

const compile_deploy = require('../Tools/compile_deploy');
const getContractInstance = require('../Tools/getInstance');

const { giveJSON, giveString } = require('../Tools/StringEncoder')

const web3Node = "https://sepolia.infura.io/v3/0c117b89c85e48e8a892b2a6dd280a97"
const privateKey = process.env.SIGNER_PRIVATE_KEY;
router.get('/initialize', async (req, resp) => {
    const deployAddress = await compile_deploy("Administrator", './Administrator/contracts/Administrator.sol')
    const data = { address: deployAddress.deployAddress, abi: deployAddress.abi };

    fs.writeFileSync('./Administrator/AdministratorData.json', JSON.stringify(data, null, 2));
    resp.send(`Contract deployed at ${deployAddress}`);

})

router.post('/savedevice', async (req, resp) => {

    const privateKey = process.env.SIGNER_PRIVATE_KEY;
    const key = req.body.deviceHash;
    let value = req.body.deviceInfo
    value = await giveString(value)
    const contractData = require('./AdministratorData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);


    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);
    console.log(contract)
    let response = await contract.methods.storeValue(key, value)
        .send({
            from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
            gas: 20000000
        })
    let response1 = await contract.methods.addDevice(key)
        .send({
            from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
            gas: 20000000
        })
    resp.send({
        ok: true,
        details: { response, response1 }
    })

})

router.post('/getdeviceinfo', async (req, resp) => {
    const privateKey = process.env.SIGNER_PRIVATE_KEY;
    const key = req.body.deviceHash;

    const contractData = require('./AdministratorData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);


    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);
    let response = await contract.methods.retrieveValue(key).call()
    response = await giveJSON(response);
    console.log(response);
    resp.send(response)
})

router.post('/getalldevices', async (req, resp) => {
    const privateKey = process.env.SIGNER_PRIVATE_KEY;


    const contractData = require('./AdministratorData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);


    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);
    let response = await contract.methods.getDevices().call()
    resp.send(response)
})

router.post('/getuserdata', async (req, resp) => {
    const contractData = require('./AdministratorData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);
    let userId = req.body.userId;

    let policies = req.body.policies
    let userData = []
    for (let i = 0; i < policies.length; i++) {
        let policy = policies[i];
        let policyId = policy.id;
        let userpolicy = userId + policyId
        let response = await contract.methods.getUserPrivacyPolicy(userpolicy).call();
        userData.push(response);
    }
    resp.send(userData);

})
module.exports = router