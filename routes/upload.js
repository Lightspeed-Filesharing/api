// Imports

const multer = require('multer');
const upload = multer({limits: { fieldSize: 50 * 1024 * 1024 }})

// const formData = require("express-fileupload");
// Files

const routers = require('./routers');
const uploadRouter = routers.uploadRouter;
const { saveMetadata } = require('../utils/saveMetadata');
const {generateUuid, generateDeletionUuid} = require('../utils/generateUuid');
const {saveFile} = require('../utils/saveFile');

// Code
module.exports = function (app) {
    
    uploadRouter.use(upload.array('data'));

    uploadRouter.post('/', async function (req, res) {
        const files = req.files;
        console.log(files)
        const body = req.body;
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

        if (!body || !body.filename || !body.nonce || !files || !body.longLink || !body.deleteOnOpen || !body.limitDownloads || !body.message) {
            return res.status(406).json({success: false, message: "invalid fields"});
        };

        const filename = body.filename;
        const nonce = body.nonce;
        const data = Buffer.from(files[0].buffer);
        console.log(data)
        // console.log(typeof data)
        // console.log(data.length)
        // var blob = new Blob([encryp], {type: "text/plain;charset=utf-8"});
        const settings = {
            longLink: body.longLink,
            deleteOnOpen: body.deleteOnOpen,
            limitDownloads: body.limitDownloads,
            message: body.message
        }
        const uuid = await generateUuid(process.env.UUID_LENGTH);
        const deletionUuid = await generateDeletionUuid();

        await saveMetadata(filename, nonce, ip, uuid, deletionUuid, settings);

        if (saveFile(uuid, data)) {
            return res.json({success: true, message: "file saved", data: {
                fileUuid: uuid,
                deletionUuid: deletionUuid
            }});
        } else {
            return res.status(500).json({success: false, message: "internal error"});
        }

    })
}