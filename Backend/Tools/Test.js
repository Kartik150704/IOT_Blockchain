const sss = require('shamirs-secret-sharing')
const secret = Buffer.from(({name:"1234"}).toString())
const shares = sss.split(secret, { shares: 2, threshold: 2 })
// console.log(shares)
const recovered = sss.combine(shares)

const {giveJSON,giveString}=require('../Tools/StringEncoder')

const check=async ()=>
{
    let a=Buffer.from("CAETKA1bsiJB2VRX8vIguU7vRG5DhKyseMxyk9Nfa7arvw==",'base64')
    let b=Buffer.from("CAImUBq2eUSCr6iu+flAbJxEiLqGRkUj8MvkXbsn1hdL7g==",'base64')
    let p=[]
    p.push(a)
    p.push(b)
    let data=sss.combine(p)
    console.log(await giveJSON(data))

}

check()

