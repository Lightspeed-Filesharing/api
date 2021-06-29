const { metadataModel } = require("../database/schemas");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv1234567890";

const generateUuid = async (length = 18) => {
    if (typeof length != Number) {
        length = Number(length);
    }

    // Generates a uuid
    
    var unique;

    while (unique !== true) {
        uuidList = new Array;
    
        for (let x = 0; x < length; x++) {
            var randomLetter = letters[Math.floor(Math.random() * letters.length)];
            uuidList.push(randomLetter)
        }

        concatUuid = uuidList.join('');
        // console.log(concatUuid);
        
        unique = await isUnique(concatUuid);
    }
    return concatUuid;

}

const isUnique = async (uuid) => {
    const unique = await metadataModel.findOne({uuid: uuid});

    if (unique !== null) {
        return false;
    }

    return true;
}

module.exports = {
    generateUuid: generateUuid
}