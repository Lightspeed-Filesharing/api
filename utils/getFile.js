const fs = require('fs');
const path = require('path');

const {metadataModel} = require( '../database/schemas');

const getFile = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({uuid: uuid});

    if (!metadataDoc) {
        return false;
    }

    const data = fs.readFileSync(path.resolve(`data/${metadataDoc.uuid}`), 'utf8');
    return {
        filename: metadataDoc.name,
        nonce: metadataDoc.nonce,
        timestamp: metadataDoc.timestamp,
        data: data
    }
}

module.exports = {
    getFile: getFile
}