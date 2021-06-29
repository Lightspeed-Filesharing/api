const express = require('express');

const uploadRouter = express.Router();
const filesRouter = express.Router();

module.exports = {
    uploadRouter: uploadRouter,
    filesRouter: filesRouter
}