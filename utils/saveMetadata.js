const {metadataModel} = require("../database/schemas");
const {hashText} = require("./hashing");

const saveMetadata = async (filename, nonce, type, ip, uuid, deletionUuid, settings) => {
    const metadataDoc = new metadataModel({
        hashedIP: hashText(ip),
        name: filename,
        type: type,
        nonce: nonce,
        timestamp: new Date(),
        uuid: uuid, 
        deletionUuid: deletionUuid,
        settings: settings
    });

    metadataDoc.save();
}

module.exports = {
    saveMetadata: saveMetadata
}
