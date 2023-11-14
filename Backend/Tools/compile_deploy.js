const fs = require("fs").promises;
const solc = require("solc");
const Web3 = require("web3");
require("dotenv").config();



async function compile_deploy(contractName, filePath) {
  const sourceCode = await fs.readFile(filePath, "utf8");
  const { abi, bytecode } = compile(sourceCode, contractName);


  const contractInterface = {
    name: contractName,
    sourceCode: sourceCode,
    abi: abi,
    bytecode: bytecode,
  };


  const artifact = JSON.stringify(contractInterface, null, 2);

  await fs.writeFile(`${contractName}.json`, artifact);

  console.log(`Compiled Successfully !!!`);

  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
  );
 
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

 
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      
    });
 
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  
  return deployedContract.options.address
  



}
function compile(sourceCode, contractName) {

  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };

  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

