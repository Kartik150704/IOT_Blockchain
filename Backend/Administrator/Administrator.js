const express = require('express');
const fs = require('fs')
const Web3=require('web3')
const router = express();

const compile_deploy = require('../Tools/compile_deploy');
const getContractInstance=require('../Tools/getInstance')
const web3Provider="https://sepolia.infura.io/v3/223458eb1e534a6e9f3ca05bb3658cd3"
router.get('/administrator/initialize', async (req, resp) => {
    const deployAddress = await compile_deploy("Administrator", './Administrator/contracts/Administrator.sol')
    const data = { address: deployAddress.deployAddress, abi: deployAddress.abi };

    fs.writeFileSync('./Administrator/AdministratorData.json', JSON.stringify(data, null, 2));
    resp.send(`Contract deployed at ${deployAddress}`);

})

router.post('/administrator/savedevice',async (req,resp)=>
{
    const data=require('./AdministratorData.json')
    const contract=getContractInstance(data.address,data.abi,web3Provider)
    console.log(req.body)
    await addDevice(contract, req.body)
    resp.send(true)

})

module.exports = router