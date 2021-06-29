const fs = require('fs');
const path = require('path');

const {metadataModel} = require( '../database/schemas');

const deleteFile = async (uuid) => {
    const metadataDoc = await metadataModel.findOne({deletionUuid: uuid});
    
    await metadataModel.deleteOne({deletionUuid: uuid});

    fs.unlinkSync(path.resolve(`data/${metadataDoc.uuid}`));
}

module.exports = {
    deleteFile: deleteFile
}