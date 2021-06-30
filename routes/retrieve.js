// Imports


// Files

const routers = require('./routers');
const filesRouter = routers.filesRouter;
const {getFile, getFileData, updateDownloadCount} = require('../utils/getFile');
const {deleteFile} = require('../utils/deleteFile');

// Code
module.exports = function (app) {

    filesRouter.get('/:uuid', async function (req, res) {

        const fileData = await getFile(req.params.uuid);

        if (!fileData) {
            return res.status(404).json({success: false, message: "file not found"});
        };

        if (req.query && req.query.data === 'true') {
            const filedata = await getFileData(req.params.uuid);
            res.type('binary');
            await updateDownloadCount(req.params.uuid);
            var downloadCount = fileData.downloads + 1;

            if (fileData.settings.deleteOnOpen === "true") {
                await deleteFile(fileData.deletionUuid);
            }

            return res.send(filedata);
        }

        res.json({success: true, message: "file metadata retrieved", data: fileData})
    });
}