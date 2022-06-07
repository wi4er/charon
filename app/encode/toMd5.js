const crypto = require("crypto");

module.exports = function toMd5(pwd, salt) {
    if (!salt) {
        salt = Math.random().toString(32).replace(/\W/g, "").slice(1, 8);
    }

    return salt + crypto
        .createHash('md5')
        .update(salt + pwd)
        .digest('hex');
}
