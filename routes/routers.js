const express = require('express');

const uploadRouter = express.Router();
const filesRouter = express.Router();
const deleteRouter = express.Router();

module.exports = {
    uploadRouter: uploadRouter,
    filesRouter: filesRouter,
    deleteRouter: deleteRouter,
}