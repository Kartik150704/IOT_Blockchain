const express = require('express');
const fs = require('fs')
const Web3=require('web3')
const router = express();


router.post('/savedevice',async (req,resp)=>
{
    let deviceHash=req.body.deviceHash;
    
})


router.post('/deviceinfo',async (req,resp)=>
{
    resp.send(true)
})


router.post('/userdata',async (req,resp)=>
{
    
    resp.send(true)
})


module.exports = router