async function giveString(a)
{
    const originalString=await JSON.stringify(a);
    const encodedString = Buffer.from(originalString, 'utf-8').toString('base64');
    return encodedString;
    
}

async function giveJSON(a)
{
    const decodedString = Buffer.from(a, 'base64').toString('utf-8');
    let b=await JSON.parse(decodedString);
    return b;
    
}

module.exports={giveJSON,giveString};
