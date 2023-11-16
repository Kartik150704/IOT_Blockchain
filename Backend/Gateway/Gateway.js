const express = require('express');
const fs = require('fs')
const Web3 = require('web3')
const router = express();
const compile_deploy = require('../Tools/compile_deploy');
const { generateKeys } = require('../Tools/GenerateKeys');
const { resolvePtr } = require('dns');
const { giveString, encodeArrayToString, decodeStringToArray, giveJSON } = require('../Tools/StringEncoder')
const web3Node = "https://sepolia.infura.io/v3/0c117b89c85e48e8a892b2a6dd280a97"
const privateKey = process.env.SIGNER_PRIVATE_KEY;

router.get('/initialize', async (req, resp) => {
    const deployAddress = await compile_deploy("Gateway", './Gateway/contracts/Gateway.sol')
    const data = { address: deployAddress.deployAddress, abi: deployAddress.abi };

    fs.writeFileSync('./Gateway/GatewayData.json', JSON.stringify(data, null, 2));
    resp.send(`Contract deployed at ${deployAddress}`);
})
router.post('/savedevice', async (req, resp) => {

    console.log(req.body)
    let user1 = req.body.user
    let device1 = req.body.device
    let user = await giveString(user1)
    let device = await giveString(device1)
    const contractData = require('./GatewayData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);

    let devices = await contract.methods.getDeviceByUser(user).call()
    if (devices.length == 0) {
        devices = []
        devices.push(device1)
    }
    else {
        devices = decodeStringToArray(devices)
        devices.push(device1)

    }

    devices = encodeArrayToString(devices)
    console.log(devices)
    let response = await contract.methods.insertUserToDevice(user, devices).send(
        {
            from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
            gas: 20000000
        }
    )

    let users = await contract.methods.getUserByDevice(device).call()
    if (users.length == 0) {
        users = []
        users.push(user1)
    }
    else {
        users = decodeStringToArray(users)
        users.push(user1)
    }
    users = encodeArrayToString(users)
    let response1 = await contract.methods.insertDeviceToUser(device, users).send(
        {
            from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
            gas: 20000000
        }
    )

    console.log(response, response1)
    resp.send({ response, response1 });



})

router.post('/user/getdevices', async (req, resp) => {
    let user = req.body.user
    let device = req.body.device
    user = await giveString(user)
    const contractData = require('./GatewayData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);

    let devices = await contract.methods.getDeviceByUser(user).call()
    if (devices.length == 0) {
        devices = []
    }
    else {

        devices = decodeStringToArray(devices)
    }
    const contractData1 = require('../Administrator/AdministratorData.json')
    const web3WithPrivateKey1 = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount1 = web3WithPrivateKey1.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey1.eth.accounts.wallet.add(yourAccount1);


    const contract1 = new web3WithPrivateKey.eth.Contract(contractData1.abi, contractData1.address);
    for (let i = 0; i < devices.length; i++) {
        let deviceId = devices[i];
        let data = await contract1.methods.retrieveValue(deviceId).call()
        devices[i] = await giveJSON(data)
    }
    resp.send(devices)



})

router.post('/admin/getusers', async (req, resp) => {
    let user = req.body.user
    let device1 = req.body.device
    user = await giveString(user)
    let device = await giveString(device1)
    const contractData = require('./GatewayData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);

    let users = await contract.methods.getUserByDevice(device).call()
    if (users.length == 0) {
        users = []

    }
    else {
        users = decodeStringToArray(users)

    }



    resp.send(users)



})



router.post('/deviceinfo', async (req, resp) => {
    resp.send(true)
})


router.post('/saveuserdata', async (req, resp) => {

    const contractData = require('./GatewayData.json')
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);

    const contractData1 = require('../Administrator/AdministratorData.json')
    const web3WithPrivateKey1 = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount1 = web3WithPrivateKey1.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey1.eth.accounts.wallet.add(yourAccount1);
    const contract1 = new web3WithPrivateKey1.eth.Contract(contractData1.abi, contractData1.address);
    const { divideData, combineData } = require('../Tools/DataHandling')
    let userId = req.body.userId
    let policies = req.body.policies

    let response1 = ""
    let response2 = "";

    for (let i = 0; i < policies.length; i++) {

        let policy = policies[i]
        let shares = await divideData(policy.data)

        let a = shares[0].toString('base64')
        let b = shares[1].toString('base64')


        let userpolicy = userId + policy.id;
        if (policy.status) {
            response1 = await contract.methods.storeUserPrivacyPolicy(userpolicy, a).send({
                from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
                gas: 20000000
            })
            response2 = await contract1.methods.storeUserPrivacyPolicy(userpolicy, b).send({
                from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
                gas: 20000000
            })
        }
        else {
            response1 = await contract.methods.storeUserPrivacyPolicy(userpolicy, b).send({
                from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
                gas: 20000000
            })
            response2 = await contract1.methods.storeUserPrivacyPolicy(userpolicy, b).send({
                from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
                gas: 20000000
            })
        }

        console.log(response1)


    };

    resp.send("Done")
})

router.post('/getuserdata', async (req, resp) => {
    const contractData = require('./GatewayData.json')
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

router.post('/checkuserdata', async (req, resp) => {
    const contractData = require('./GatewayData.json');
    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);
    const contract = new web3WithPrivateKey.eth.Contract(contractData.abi, contractData.address);

    const contractData1 = require('../Administrator/AdministratorData.json')
    const web3WithPrivateKey1 = new Web3(new Web3.providers.HttpProvider(web3Node));
    const yourAccount1 = web3WithPrivateKey1.eth.accounts.privateKeyToAccount(privateKey);
    web3WithPrivateKey1.eth.accounts.wallet.add(yourAccount1);
    const contract1 = new web3WithPrivateKey1.eth.Contract(contractData1.abi, contractData1.address);
    const { divideData, combineData } = require('../Tools/DataHandling')
    let userId = req.body.userId
    let policiesId = req.body.policiesId
    console.log(policiesId)
    for (let i = 0; i < policiesId.length; i++) {
        let policyId = policiesId[i].id
        let userpolicy = userId + policyId
        let response1 = await contract.methods.getUserPrivacyPolicy(userpolicy).call();
        let response2 = await contract1.methods.getUserPrivacyPolicy(userpolicy).call();
        let p = []
        p.push(Buffer.from(response1, 'base64'))
        p.push(Buffer.from(response2, 'base64'))
        let data
        try {
            data = await giveJSON(combineData(p));
        } catch (error) {
            
            data = null; // Store null if an error occurs during the function call
        }

        if (data) {
            console.log(data)
            resp.send(data)
        }

    }

})
router.get('/generatekeys', async (req, resp) => {
    const data = await generateKeys()
    resp.send(data)
})

module.exports = router