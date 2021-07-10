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
        message: metadataDoc.settings.message,
        settings: metadataDoc.settings,
        deletionUuid: metadataDoc.deletionUuid,
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
    const metadataDoc = await metadataModel.findOne({deletionUuid: uuid});

    if (!metadataDoc) {
        return false;
    }

    return metadataDoc.deletionUuid;

}

const updateDownloadCount = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({uuid: uuid});

    await metadataModel.updateOne({uuid: uuid}, {$set: {downloads: metadataDoc.downloads + 1}});
}

module.exports = {
    getFile: getFile,
    getFileDeletionUuid: getFileDeletionUuid,
    getFileData: getFileData,
    updateDownloadCount: updateDownloadCount,
}