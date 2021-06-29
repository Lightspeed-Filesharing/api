const { metadataModel } = require("../database/schemas")
const { hashText } = require("./hashing")

const saveMetadata = async (filename, nonce, ip, uuid) => {
    const metadataDoc = new metadataModel({
        hashedIP: hashText(ip),
        name: filename,
        nonce: nonce,
        timestamp: new Date(),
        uuid: uuid,
    });

    metadataDoc.save();
}

module.exports = {
    saveMetadata: saveMetadata
}