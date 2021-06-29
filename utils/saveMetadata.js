const {metadataModel} = require("../database/schemas");
const {hashText} = require("./hashing");

const saveMetadata = async (filename, nonce, ip, uuid, deletionUuid) => {
    const metadataDoc = new metadataModel({
        hashedIP: hashText(ip),
        name: filename,
        nonce: nonce,
        timestamp: new Date(),
        uuid: uuid, 
        deletionUuid: deletionUuid
    });

    metadataDoc.save();
}

module.exports = {
    saveMetadata: saveMetadata
}
