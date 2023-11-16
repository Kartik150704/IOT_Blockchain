const sss = require('shamirs-secret-sharing')
const secret = Buffer.from("My name is Kartik")
const shares = sss.split(secret, { shares: 2, threshold: 2 })
console.log(shares[0].toString())
console.log(shares[0].toString())
const recovered = sss.combine(shares)
console.log(recovered.toString())



