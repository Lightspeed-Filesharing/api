const crypto = require('crypto');

const hashText = function (text) { // Create a SHA512 hash
    var hash = crypto.createHmac('sha512', process.env.HASH_SALT);
    hash.update(text);
    var value = hash.digest('hex');
    return value;
}

module.exports = {
    hashText: hashText
}