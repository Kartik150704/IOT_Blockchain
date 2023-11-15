const sss = require('shamirs-secret-sharing')


// console.log(shares)


function divideData(secret)
{
    secret=Buffer.from(secret)
    const shares = sss.split(secret, { shares: 2, threshold: 2 })
    return shares
}

function combineData(shares)
{
    const recovered = sss.combine(shares)
    return recovered.toString()
}

module.exports={divideData,combineData}