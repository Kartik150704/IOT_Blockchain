const sss = require('shamirs-secret-sharing')
const secret = Buffer.from('kusadfdsklfgsdkufgdsfklusd')
const shares = sss.split(secret, { shares: 2, threshold: 2 })
// console.log(shares)
const recovered = sss.combine(shares)
console.log(recovered.toString()) 
