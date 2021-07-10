// Imports

// const express = require('express')

// Files

const routers = require('./routers');
const deleteRouter = routers.deleteRouter;
const {getFileDeletionUuid} = require('../utils/getFile');
const {deleteFile} = require('../utils/deleteFile');

// Code
module.exports = function (app) {

    deleteRouter.get('/:uuid', async function (req, res) {
        if (!req.params.uuid) {
            return res.status(404).json({success: false, message: "file not found"});
        }

        const fileData = await getFileDeletionUuid(req.params.uuid);

        if (!fileData) {
            return res.status(404).json({success: false, message: "file not found"});
        };

        await deleteFile(req.params.uuid);

        res.json({success: true, message: "file deleted"});
    });
}