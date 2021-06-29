// Imports

const express = require('express')
const fileupload = require('express-fileupload');

// Files

const routers = require('./routers');
const uploadRouter = routers.uploadRouter;
const { saveMetadata } = require('../utils/saveMetadata');
const {generateUuid, generateDeletionUuid} = require('../utils/generateUuid');
const {saveFile} = require('../utils/saveFile');

// Code
module.exports = function (app) {

    uploadRouter.use(express.json())
    uploadRouter.use(fileUpload());
      
    uploadRouter.post('/', async function (req, res) {
        const body = req.files;
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

        if (!body || !body.filename || !body.nonce || !body.data) {
            return res.status(406).json({success: false, message: "invalid fields"});
        };

        const filename = body.filename;
        const nonce = body.nonce;
        const data = body.data;

        const uuid = await generateUuid(process.env.UUID_LENGTH);
        const deletionUuid = await generateDeletionUuid();

        await saveMetadata(filename, nonce, ip, uuid, deletionUuid);

        if (saveFile(uuid, Buffer.from(data))) {
            return res.json({success: true, message: "file saved", data: {
                fileUuid: uuid,
                deletionUuid: deletionUuid
            }});
        } else {
            return res.status(500).json({success: false, message: "internal error"});
        }

    })
}