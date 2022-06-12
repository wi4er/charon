const WrongRefError = require("../exception/WrongRefError");

module.exports = {
    md5: require("./toMd5"),
    sha256: require("./toSha256"),
    encrypt: function (payload, salt, algorithm) {
        WrongRefError.assert(this[algorithm], "Wrong encode algorithm");

        return this[algorithm](payload, salt);
    }
}
