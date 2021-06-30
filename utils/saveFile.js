const fs = require('fs');

const saveFile = (uuid, data) => {
    try {
        fs.writeFileSync(`./data/${uuid}`, data, 'binary');
    } catch(err) {
        console.log(err);
        return false;
    }

    return true;
}

module.exports = {
    saveFile: saveFile
}