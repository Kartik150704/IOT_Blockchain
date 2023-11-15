const sss = require('shamirs-secret-sharing')

const {giveJSON,giveString}=require('../Tools/StringEncoder')
// console.log(shares)


async function divideData(secret)
{

    secret=await giveString(secret)
    console.log(secret)
    secret=Buffer.from(secret,'base64')
    const shares = sss.split(secret, { shares: 2, threshold: 2 })
    return shares
}

function combineData(shares)
{
    const recovered = sss.combine(shares)
    return recovered
}

module.exports={divideData,combineData}