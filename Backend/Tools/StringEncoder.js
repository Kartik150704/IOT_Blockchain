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
function encodeArrayToString(arr) {
    const encodedString = Buffer.from(JSON.stringify(arr)).toString('base64');
    return encodedString;
  }
  
  // Function to decode a smaller string back to an array using Base64 decoding
  function decodeStringToArray(str) {
    const decodedString = Buffer.from(str, 'base64').toString('utf-8');
    return JSON.parse(decodedString);
  }
module.exports={giveJSON,giveString,encodeArrayToString,decodeStringToArray};
