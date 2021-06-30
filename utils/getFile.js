const fs = require('fs');
const path = require('path');

const {metadataModel} = require( '../database/schemas');

const getFile = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({uuid: uuid});

    if (!metadataDoc) {
        return false;
    }

    return {
        filename: metadataDoc.name,
        nonce: metadataDoc.nonce,
        timestamp: metadataDoc.timestamp,
        type: metadataDoc.type,
        message: metadataDoc.settings.message
    }
}

const getFileData = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({uuid: uuid});

    if (!metadataDoc) {
        return false;
    }

    const data = fs.readFileSync(path.resolve(`data/${metadataDoc.uuid}`), 'binary');
    return data;
}

const getFileDeletionUuid = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({uuid: uuid});

    if (!metadataDoc) {
        return false;
    }

    return metadataDoc.deletionUuid;

}

module.exports = {
    getFile: getFile,
    getFileDeletionUuid: getFileDeletionUuid,
    getFileData: getFileData
}