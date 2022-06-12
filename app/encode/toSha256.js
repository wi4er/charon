const crypto = require("crypto");

module.exports = function toSha256(pwd) {
    return crypto
        .createHash('sha256')
        .update(pwd)
        .digest('hex');
}
