// Imports

const mongoose = require('mongoose');

// Files

const metadataSchema = new mongoose.Schema({
    hashedIP: String,
    name: String,
    nonce: String,
    type: String,
    timestamp: Object,
    uuid: String,
    deletionUuid: String,
    settings: Object,
    downloads: Number,
}, {collection: 'metadata'});

const metadataModel = new mongoose.model('FileMetadata', metadataSchema);

// Module exports

module.exports = {
    metadataModel: metadataModel
}