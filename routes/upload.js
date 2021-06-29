// Imports

const express = require('express')

// Files

const routers = require('./routers');
const uploadRouter = routers.uploadRouter;
const { saveMetadata } = require('../utils/saveMetadata');
const {generateUuid} = require('../utils/generateUuid');
const {saveFile} = require('../utils/saveFile');

// Code
module.exports = function (app) {

    uploadRouter.use(express.json())

    uploadRouter.post('/', async function (req, res) {
        const body = req.body;
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

        if (!body || !body.filename || !body.nonce || !body.data) {
            return res.status(406).json({success: false, message: "invalid fields"});
        };

        const filename = body.filename;
        const nonce = body.nonce;
        const data = body.data;
        
        const uuid = await generateUuid(20)

        await saveMetadata(filename, nonce, ip, uuid);

        if (saveFile(uuid, data)) {
            return res.json({success: true, message: "file saved"})
        } else {
            return res.status(500).json({success: false, message: "internal error"})
        }

    })
}