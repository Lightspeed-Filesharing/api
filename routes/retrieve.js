// Imports

// const express = require('express')

// Files

const routers = require('./routers');
const filesRouter = routers.filesRouter;
const {getFile} = require('../utils/getFile');

// Code
module.exports = function (app) {

    filesRouter.get('/:uuid', async function (req, res) {

        const fileData = await getFile(req.params.uuid);

        if (!fileData) {
            return res.status(404).json({success: false, message: "file not found"});
        };

        res.json({success: true, message: "file retrieved", data: fileData})
    })
}