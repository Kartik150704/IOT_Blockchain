const Web3 = require('web3');
const fs = require('fs');

async function getContractInstance(contractAddress, abiFilePath, web3Provider) {
    const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider)); // Replace with your Ethereum provider

    const abi = JSON.parse(fs.readFileSync(abiFilePath, 'utf-8')); // Load the ABI from a file
    const contract = new web3.eth.Contract(abi, contractAddress);

    return contract;
}

module.exports=getContractInstance