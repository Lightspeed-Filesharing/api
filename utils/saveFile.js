const fs = require('fs');

const saveFile = (uuid, data) => {
    try {
        fs.writeFileSync(`./data/${uuid}`, data);
    } catch(err) {
        return false;
    }

    return true;
}

module.exports = {
    saveFile: saveFile
}