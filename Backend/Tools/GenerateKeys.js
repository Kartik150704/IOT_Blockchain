const crypto = require('crypto')

async function generateKeys()
{
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // You can adjust the key size as needed
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    return {privateKey,publicKey}

}

module.exports={generateKeys}